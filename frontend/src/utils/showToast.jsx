import { toast } from "react-toastify";
import Toast from "../components/atoms/toast/Toast.jsx"

// Remplace les appels toast.success('...')/toast.error('...') bruts par
// notre atome Toast (icône + message stylés à la charte). `icon: false`
// désactive l'icône par défaut de react-toastify.

function show(variant, message) {
    toast[variant](<Toast variant={variant} message={message} />, {icon: false});
}

export const showToast = {
    success: (message) => show('success', message),
    error: (message) => show('error', message),
    info: (message) => show('info', message),
    warning: (message) => show('warning', message),
}