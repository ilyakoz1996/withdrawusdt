import Spinner from "./spinner";

export default function Button(props: {
  title: String,
  onClick?: () => void,
  submit?: boolean,
  style?: "outline",
  loading?: boolean
}): JSX.Element {

    const common = "bg-blue-500 hover:bg-blue-600 text-white "
    const outline = `bg-transparent ${props.loading && 'border-blue-300 text-blue-300'} hover:border-blue-300 hover:text-blue-300  border border-gray-300 hover:border-blue-300`

  return (
    <button
      onClick={props.onClick}
      disabled={props.loading}
      type={props.submit ? "submit" : "button"}
      className={`
      ${props.style === 'outline' ? outline : common} 
      flex space-x-2 items-center font-bold w-max rounded-md px-2 py-1 mt-4`}
    >
      {props.loading && <Spinner />}    
      <p>{props.title}</p>
    </button>
  );
}
