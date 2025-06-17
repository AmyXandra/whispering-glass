import React from "react";

const Button = ({ children }) => {
  return (
    <div className="Button" data-test="buttonComponent">
      {" "}
      {children}
    </div>
  );
};

Button.Primary = ({
  title,
  style,
  className = "",
  disabled,
  loading,
  type,
  form,
  onClick = () => {},
}) => {
  return (
    <button
      type={type}
      form={form}
      style={style}
      onClick={() => onClick()}
      disabled={disabled || loading}
      className={
        disabled || loading
          ? `bg-gray-400 p-2 rounded-md text-center text-white whitespace-nowrap cursor-not-allowed ${className} `
          : `bg-amber-900 px-3 py-2 rounded-md text-base text-center text-white whitespace-nowrap  ${className} `
      }
    >
      {title ?? "Title"}
      {/* {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />} */}
    </button>
  );
};

Button.Secondary = ({
  title,
  style,
  className,
  disabled,
  loading,
  onClick = () => {},
}) => {
  return (
    <button
      type={"button"}
      style={style}
      onClick={() => onClick()}
      disabled={disabled || loading}
      className={
        disabled || loading
          ? `bg-gray-400 p-2 rounded-md text-center text-white whitespace-nowrap cursor-not-allowed ${className} `
          : `bg-white dark:bg-transparent px-3 py-2 rounded-md text-base text-center font-medium border border-primary text-primary whitespace-nowrap  ${className}`
      }
    >
      {title ?? "Title"}
      {/* {loading && <RiLoader5Fill size={24} className="animate-spin ml-4" />} */}
    </button>
  );
};

export default Button;
