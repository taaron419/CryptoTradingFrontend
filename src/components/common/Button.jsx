const Button = ({ children, className = "", variant = "primary", ...props }) => {
  const variants = {
    primary: "bg-[#0052ff] text-white hover:bg-[#0046d5] active:bg-[#003bb8]",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  };

  return (
    <button
      className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
