import * as React from "react";

const buttonStyles = {
  padding: "16px 24px",
  background: "whitesmoke",
  cursor: "pointer",
  border: "none",
  borderRadius: 3
};

const Button: React.FC<any> = ({ children, onClick }) => (
  <button onClick={onClick} style={{ ...buttonStyles }}>
    {children}
  </button>
);

export default Button;
