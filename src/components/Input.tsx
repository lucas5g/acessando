interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showLabel?: boolean
}
export function Input({ showLabel = true, ...props }: Readonly<InputProps>) {
  return (
    <div className="flex flex-col gap-1 hover:cursor-pointer w-full">
      {showLabel &&
        <label
          className="hover:cursor-pointer"
          htmlFor={props.name}
        >
          {props.placeholder}
        </label>
      }
      <input
        {...props}
        id={props.name}
        className='bg-gray-800 h-12 rounded p-3 border border-gray-500  focus:outline-none focus:border hover:border '
        required={true}
      />
    </div>
  );
}