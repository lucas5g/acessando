import {  CircleNotch } from "@phosphor-icons/react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { }
export function Button(props: Props) {
  return (
    <button
      className='bg-gray-900  rounded w-24 h-12 border flex items-center justify-center border-gray-500 hover:border hover:border-gray-100 hover:cursor-pointer hover:bg-gray-950   disabled:bg-gray-800'
      {...props}
    >
      {props.disabled ? <CircleNotch size={24} className="animate-spin" /> : props.children}
    </button>
  );
}