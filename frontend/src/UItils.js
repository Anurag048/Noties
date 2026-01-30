import { toast } from "react-toastify";

export const showSuccessToast = (message) => {
    toast.success(message, {
        position: 'top-right'
    });
}

export const showErrorToast = (message) => {
    toast.error(message, {
        position: 'top-right'
    });
}