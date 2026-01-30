

const Button = ({ ...props }) => {
  const {
    height,
    padding,
    width,
  } = props;

  return <button onClick={() => console.log('hi')}>Click Me</button>;
}

export default Button;