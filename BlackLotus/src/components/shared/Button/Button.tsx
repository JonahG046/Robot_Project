import "./Button.css"

const Button = ({ ...props }) => {
  const {
    height = "50px",
    padding = "10px",
    width = "150px",
    text,
    textColor = 'white', 
    background,
    callback = () => {},
  } = props;

  const clickHandler = () => {
    console.log("button clicked")
    callback("button clicked")
  } 

  return (
    <button 
    className={
    `primary-color 
    ${background} 
    text-${textColor} 

    bg-brand 
    box-border 
    border 
    border-transparent 
    hover:bg-brand-strong 
    focus:ring-4 
    focus:ring-brand-medium 
    shadow-xs 
    font-medium 
    leading-5 
    rounded-base 
    text-sm 
    px-4 
    py-2.5 
    focus:outline-none`}
    onClick={clickHandler}
    >{text}</button>
  )
}


export default Button


 