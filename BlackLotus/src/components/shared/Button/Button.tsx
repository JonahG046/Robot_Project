const Button = ({ ...props }) => {

  const {
      height = "50px",
      padding = "10px",
      width = "150px",
      background = "purple",
      color = "white",
      mymessage = {props.message},
  } = props;

//   return (
//       <button className=""
//         style={{height,padding,width, background, color}} 
//             onClick={() => console.log('hi')}>Click Me</button>);
   return (
      <button className=""
        style={{height,padding,width, background, color}} 
            >Click Me</button>);

}

export default Button;