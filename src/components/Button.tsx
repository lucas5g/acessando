interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { }
export function Button(props: Props) {
  return (
    <button
      className='bg-gray-900  rounded w-24 h-12 border border-gray-500 hover:border hover:border-gray-100 hover:cursor-pointer hover:bg-gray-950   disabled:bg-red-200'
      // {...props}
      
    />
  );
}