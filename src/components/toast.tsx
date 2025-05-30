import { useEffect } from "react";

type ToastProps = {
    message: string;
    onClose: () => void;
};

const Toast = ({ message, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // auto close after 3 sec
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed bottom-6 right-6 z-50 bg-white rounded-lg px-10 py-3 shadow-lg">
            {message}
        </div>
    );
};

export default Toast;
