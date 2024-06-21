import toast from "react-hot-toast"; 

export const notifySuccess = (id: string, message: string) => toast.success(message, {
    id,
    duration: 2000,
    position: 'top-center',

  });

  export const notifyError = (id: string, message: string) => toast.error(message, {
    id,
    duration: 4000,
    position: 'top-center',
  });