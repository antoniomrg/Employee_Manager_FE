import { toast, Bounce, ToastPosition } from "react-toastify";

export const showToast = (
  message: string,
  type: "success" | "error" | "info" | "warning"
) => {
  const successTopCenter = {
    position: "top-center" as ToastPosition,
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  };

  switch (type) {
    case "success":
      toast.success(message, successTopCenter);
      break;
    case "error":
      toast.error(message);
      break;
  }
};
