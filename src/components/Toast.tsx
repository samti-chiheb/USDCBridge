import { useState, useEffect } from "react";
import { ToastProps } from "../types/toastTypes";

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    setText(message);
    const timer = setTimeout(() => {
      setText("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  if (text === "") {
    return null;
  }

  if (text) {
    return (
      <div
        className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white
          ${type === "success" ? "bg-green-500" : ""}
          ${type === "error" ? "bg-red-500" : ""}
        `}
      >
        {text}
      </div>
    );
  }
};

export default Toast;
