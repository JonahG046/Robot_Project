import "./Button.css"

const Button = ({ ...props }) => {
  const {
  //   height = "50px",
  //   padding = "10px",
  //   width = "150px",
  //   background = "purple",
  //   color = "white",
     background,
     //callback,
  } = props;

  return <button 
  className={
    `primary-color 
    ${background} 
    text-white 
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
  onClick={() => (console.log('hi'))}
  >Click Me</button>;
}


export default Button


