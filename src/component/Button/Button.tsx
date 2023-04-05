import React, { ButtonHTMLAttributes } from "react";
import "./Button.scss";

interface button extends ButtonHTMLAttributes<HTMLButtonElement> {
  varient: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
}
const Button: React.FC<button> = ({ varient, size, children, ...rest }) => {
  return (
    <div>
      <button className={`btn btn-${varient} ${size} `} {...rest}>
        {children}
      </button>
    </div>
  );
};
export default Button;
