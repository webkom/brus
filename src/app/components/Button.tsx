const Button = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={"bg-gray-300 px-4 py-1 rounded-2xl " + className}
      {...props}
    ></button>
  );
};

export default Button;
