export default function Card({children, className, ...props}) {
  return (
    <div className={`gap-2 bg-white py-1 px-4 drop-shadow rounded-md ${className}`} {...props}>
      {children}
    </div>
  );
}
