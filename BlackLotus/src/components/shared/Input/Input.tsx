import "./Input.css"

const Input = ({ ...props }) => {
    const {
        type = "text",
        placeholder,
        width = "100%",
        callback = () => {},
        isRequired,
        id,
        label,
    } = props;

    return (
        <div className="flex flex-col items-start">
            <label
                htmlFor={id}
                className="block mb-2.5 text-sm font-medium text-heading text-white"
            >
                {label}
            </label>

            <input
                type={type}
                id={id}
                name={id}
                className="bg-white border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder={placeholder}
                required
            />
        </div>
    )
}
export default Input