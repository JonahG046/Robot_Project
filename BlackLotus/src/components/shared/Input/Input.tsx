import "./Input.css"

const Input = ({ ...props }) => {
    const {
        type = "text",
        placeholder,
        width = "100%",
        callback = () => {},
        isRequired,
        id


    } = props;
    return (
        <div>
            <label 
                htmlFor={id} 
                className="block mb-2.5 text-sm font-medium text-heading"
            >
                First name
            </label>

            <input 
                type={type} 
                id={id} 
                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" 
                placeholder={placeholder} 
                required 
            />
        </div>
    )
}
export default Input