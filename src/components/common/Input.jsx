const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#0052ff] ${className}`}
      {...props}
    />
  );
};

export default Input;
