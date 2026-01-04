
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ children }) => {
    if (!children) {
        return null;
    }
    return (
        <p className="mt-2 flex items-center text-xs md:text-sm text-red-600">
            <AlertCircle className="mr-2 h-4 w-4" />
            {children}
        </p>
    );
};

export default ErrorMessage;