const Card = ({ children, className = "" }) => {
  return (
    <article className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </article>
  );
};

export default Card;
