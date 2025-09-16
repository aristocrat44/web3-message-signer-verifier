interface CoreButtonProps {
  handleClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const CoreButton = ({
  children,
  handleClick,
  className = "",
  disabled = false,
}: CoreButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer disabled:cursor-auto disabled:bg-gray-500";

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`${baseStyles} ${className}`}
      disabled={disabled}
      data-testid="corebutton-testid"
    >
      {children}
    </button>
  );
};
