"use client"
import React, { useState } from 'react';
import InputField from '../components/TextInput';
import GoogleAuthButton from '../components/GoogleAuthButton';
import Link from 'next/link';
import baseUrl from '../utils/baseUrl';
import showAlert from '../utils/showAlert';
import Loader from '../components/Loader';
import { useRouter } from 'next/navigation';




export default function LoginForm() {

  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' ,name:'',cPassword:''});
  const router =useRouter()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
    setLoading(true)
  let res = await fetch(`${baseUrl}/user/register`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  let data = await res.json();
  setLoading(false)
  if(res.status=="201"){
      showAlert("success",data.message,"success");
      router.push("/login")
  }
  else if(res.status=="500"){
    showAlert("Error","sorry, currently we are not able to process your request, please try after some time.","error")
  }
  else if(res.status=="409"){
    showAlert("Please Login",data.message,"warning")
    setTimeout(()=>{router.push("/login")},3000)
  }
  else {
    showAlert("",data.message,"warning")
  }
    } catch (error) {
      setLoading(false)
      showAlert("Error","sorry, currently we are not able to process your request, please try after some time.","error")

    }

    
  };

  return (
  <>
  {loading && <Loader/>}
  <form onSubmit={handleSubmit} className="max-w-mdw-full bg-white dark:bg-zinc-800 rounded-xl p-8  shadow-md">
  <h1   className="text-2xl font-bold text-center mb-4">Sign Up</h1>
      
      <GoogleAuthButton/>
      <p  className='text-center '>or</p>
      <InputField
        label="Full Name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        id="name"
        name="name"
      />
      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        id="email"
        name="email"
      />
      <InputField
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        id="password"
        name="password"
      />
      <InputField
        label="confirm password"
        type="password"
        value={formData.cPassword}
        onChange={handleChange}
        id="cPassword"
        name="cPassword"
      />
     
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        submit
      </button>
      <Link href="/login">
      <p className="text-blue-500 underline text-left text-xs mt-6 cursor-pointer">
         Already have an account? Please sign in.
      </p>

      </Link>
    </form>
    </>
  );
}
