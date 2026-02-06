import "./Input.css"

const Input = ({ ...props }) => {
    return (
        <div>
            <label htmlFor="first_name" className="block mb-2.5 text-sm font-medium text-heading">First name</label>
            <input type="text" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="John" required />
        </div>
    )
}
export default Input