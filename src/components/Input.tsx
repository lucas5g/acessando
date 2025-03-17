interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }
export function Input(props: InputProps) {
  return (
    <div className="flex flex-col gap-1 hover:cursor-pointer">
      <label
        className="hover:cursor-pointer"
        htmlFor={props.name}>
        {props.placeholder}
      </label>
      <input
        {...props}
        id={props.name}
        className='bg-gray-800 h-12 rounded p-3 border border-gray-500  focus:outline-none focus:border hover:border '
      />
    </div>
  );
}