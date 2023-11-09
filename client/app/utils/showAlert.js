import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const showAlert = (title,message,icon) => {
    let obj ={
      // title: '<strong>Your Title</strong>',
      // html: 'Your <b>HTML</b> content goes here.',
      // icon: 'success',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: 'okay',
      confirmButtonAriaLabel: 'okay',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
      customClass: {
        popup: 'max-w-sm w-full bg-zinc-800 rounded-xl p-8 shadow-md',
        title: 'text-2xl font-bold text-center mb-4 text-white',
        htmlContainer: 'text-white',
        confirmButton: 'w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition',
      },
      background: 'rgba(31, 41, 55, 0.8)',
      position: 'center',
      showConfirmButton: true,
      // timer: 3000
    }

    if(title){obj.title=`<strong>${title}</strong>`}
    if(message){obj.text=message}
    if(icon){obj.icon=icon}
    
    
    
    
    Swal.fire(obj);
      
      

}
export default showAlert;
