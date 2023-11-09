const { authenticateUser } = require("../middlewares/authenticate.middleware");
const PDFModel = require("../models/pdf.model");
const upload = require("../utils/upload");
const path = require('path');
const pdfRouter = require("express").Router();
const PDFDocument = require('pdf-lib').PDFDocument;
const fs = require('fs');
const mongoose = require("mongoose");
require("dotenv").config()
const { s3, bucketName } = require('../config/aws.config');
const { GetObjectCommand,PutObjectCommand ,DeleteObjectCommand} = require('@aws-sdk/client-s3');
const stream = require('stream');
const { Readable } = require('stream');





pdfRouter.get("/",async(req,res)=>{
    try {
        let data = await PDFModel.find();
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error",error})
    }
})

pdfRouter.post('/upload', authenticateUser, upload.single('pdf'), async (req, res) => {
  try {
    // The multer-s3 should attach the file information to the request object.
    // With AWS SDK v3, it might be under a different property, such as 'key' or you may need to construct the file URL manually.
    const { originalname, key } = req.file;
    // const location = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    const location = key;

    // Create a new PDF entry using your model, assuming your database model accepts these fields.
    const newPDF = await PDFModel.create({
      filePath: location, // This should be the URL where the file is accessible.
      originalName: originalname.slice(0,-4),
      userId: req.user._id, // This assumes that 'req.user' is populated by your authentication middleware.
    });

    // Respond with the newly created PDF entry.
    res.status(201).json(newPDF);
  } catch (error) {
    // If an error occurs, send an appropriate response.
    res.status(400).send({ error: error.message });
  }
});


  pdfRouter.get('/user-pdfs', authenticateUser, async (req, res) => {
    try {
      // Get page number and limit from query parameters
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 6; // Default limit is 6 if not specified
  
      // Calculate the 'skip' value
      const skip = (page - 1) * limit;
  
      // Query for getting the total count of documents
      const totalCount = await PDFModel.countDocuments({ userId: req.user._id });
  
      // Get paginated documents sorted by a 'createdAt' field in descending order
      // Make sure to replace 'createdAt' with the actual timestamp field from your schema
      const userPDFs = await PDFModel.find({ userId: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      // Return the paginated result and total pages
      res.json({
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit: limit,
        totalItems: totalCount,
        items: userPDFs
      });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  pdfRouter.get('/:pdfId', async (req, res) => {
    try {
      const pdfId = req.params.pdfId;
      const pdf = await PDFModel.findById(pdfId);
  
      if (!pdf) {
        return res.status(404).send({ message: 'PDF not found' });
      }
  
      // if (pdf.userId.toString() !== req.user._id.toString()) {
      //   return res.status(403).send({ message: 'You do not have permission to access this PDF' });
      // }
  
      // Extract the key from the full file path
      const key = pdf.filePath.split('/').pop();
  
      // Set the parameters for the GetObjectCommand
      const getParams = {
        Bucket: bucketName, // Make sure this is just the name of the bucket without any additional paths
        Key: key, // The key is just the filename part of the filePath
      };
  
      // Create a new GetObjectCommand with the parameters
      const command = new GetObjectCommand(getParams);
  
      // Send the command to the S3 client
      const { Body } = await s3.send(command);
  
      // Set the correct headers for the PDF file
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${pdf.originalName}"`);
  
      // Stream the S3 object body directly to the response
      Body.pipe(res);
    } catch (error) {
      console.error('Error retrieving the file:', error.message);
      res.status(500).send({ message: error.message });
    }
  });





  pdfRouter.post('/extract-pages', authenticateUser, async (req, res) => {
    try {
      const { pdfId, pages, newPdfName } = req.body;
  
      // Validate inputs (assuming you've got input validation here)
  
      // Find the original PDF in S3
      const originalPdf = await PDFModel.findById(pdfId);
      if (!originalPdf) return res.status(404).send('PDF not found');
  
      // Check user permission
      if (originalPdf.userId.toString() !== req.user._id.toString()) {
        return res.status(403).send('You do not have permission to modify this PDF');
      }
  
      // Get the PDF from S3
      const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: originalPdf.filePath.split('/').pop(),
    
      });
      const { Body: originalPdfStream } = await s3.send(getCommand);
  
      // Load the PDF
      const originalPdfBytes = await new Promise((resolve, reject) => {
        const chunks = [];
        originalPdfStream.on('data', chunk => chunks.push(chunk));
        originalPdfStream.once('end', () => resolve(Buffer.concat(chunks)));
        originalPdfStream.once('error', reject);
      });
      const pdfDoc = await PDFDocument.load(originalPdfBytes);
  
      // Extract the specified pages
      const newPdfDoc = await PDFDocument.create();
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, pages.map(p => p - 1));
      copiedPages.forEach(page => newPdfDoc.addPage(page));
  
      // Save the new PDF as a byte array
      const newPdfBytes = await newPdfDoc.save();
  
   // Upload the new PDF to S3
const newPdfKey = `${Date.now().toString()}-${newPdfName}.pdf`;
const putCommand = new PutObjectCommand({
  Bucket: bucketName,
  Key: newPdfKey,
  Body: newPdfBytes, // Pass the byte array directly
  ContentType: 'application/pdf',
});
await s3.send(putCommand);
  
      // Create a new PDF entry in MongoDB
      const newPdf = new PDFModel({
        filePath: newPdfKey,
        originalName: newPdfName,
        userId: req.user._id,
      });
      await newPdf.save();
  
      res.status(201).json({
        message: 'PDF extracted and saved successfully',
        newPdfId: newPdf._id,
        newPdfLocation: `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${newPdfKey}`
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: error.message });
    }
  });


  pdfRouter.get('/download/:pdfId', authenticateUser, async (req, res) => {
    try {
      const { pdfId } = req.params;
  
      if (!mongoose.isValidObjectId(pdfId)) {
        return res.status(400).json({ message: 'Invalid PDF ID' });
      }
  
      const pdf = await PDFModel.findById(pdfId);
  
      // ... Any authentication checks you need to perform ...
  
      // Create a GET Object command
      const getCommand = new GetObjectCommand({
        Bucket: bucketName,
        Key: pdf.filePath, // Your PDFModel should store the S3 key for the file
      });
  
      // Stream the S3 object to the response
      s3.send(getCommand).then((data) => {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(pdf.originalName)}"`);
  
        // Stream the file to the client
        data.Body.pipe(res);
      }).catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Error streaming file from S3' });
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });



pdfRouter.delete('/delete/:pdfId', authenticateUser, async (req, res) => {
  try {
    const pdfId = req.params.pdfId;
    const userId = req.user._id;

    // Find the PDF document in the database
    const pdf = await PDFModel.findById(pdfId);

    // Check if the PDF document was found
    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found' });
    }
    
    // Check if PDF belongs to the authenticated user
    if (pdf.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Create a DELETE Object command
    const deleteCommand = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: pdf.filePath, // The key of the file in S3
    });

    // Delete PDF file from S3
    await s3.send(deleteCommand);

    // Delete PDF document from MongoDB
    await PDFModel.findByIdAndDelete(pdfId);
    res.json({ message: "Document deleted successfully from S3 and database." });

  } catch (error) {
    console.error('Failed to delete PDF:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

pdfRouter.post("/rearrange-pdf/:pdfId", authenticateUser, async (req, res) => {
  try {
    const pdfId = req.params.pdfId;
    const pdfInfo = await PDFModel.findById(pdfId);
    if(!req.body.pageOrder) return res.status(400).json({ message: "Please specify the new order to pdf pages" });
    if (!pdfInfo) return res.status(404).json({ message: "PDF not found" });
    
    // Key for S3 object
    const key = pdfInfo.filePath.split('/').pop()
    // Get PDF from S3
    const getObjectCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const pdfStream = await s3.send(getObjectCommand);
    const existingPdfBytes = await new Promise((resolve, reject) => {
      const chunks = [];
      pdfStream.Body.on('data', (chunk) => chunks.push(chunk));
      pdfStream.Body.once('end', () => resolve(Buffer.concat(chunks)));
      pdfStream.Body.once('error', reject);
    });

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pageOrder = req.body.pageOrder;
    const numPages = pdfDoc.getPages().length;
    const isValidOrder = pageOrder.every(num => num > 0 && num <= numPages);
    if (!isValidOrder) {
      return res.status(400).json({ message: "Invalid page order" });
    }
    
    const rearrangedPdf = await PDFDocument.create();
    for (const pageIndex of pageOrder) {
      const [page] = await rearrangedPdf.copyPages(pdfDoc, [pageIndex - 1]);
      rearrangedPdf.addPage(page);
    }

    const rearrangedPdfBytes = await rearrangedPdf.save();

    // Upload rearranged PDF to S3
    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: key, // You can choose to save it as a new file or overwrite the old one
      Body: rearrangedPdfBytes,
      ContentType: 'application/pdf',
    });

    await s3.send(putObjectCommand);

    // Update document in MongoDB
    await PDFModel.findByIdAndUpdate(pdfId, { updatedAt: new Date() });

    res.json({ message: "PDF rearranged successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports={pdfRouter}