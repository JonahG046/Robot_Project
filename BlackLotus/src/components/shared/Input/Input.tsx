import "./Input.css"
import { useForm } from 'react-hook-form'

const Input = ({ ...props }) => {
    const {
        type = "text",
        placeholder,
        callback = () => {},
        id,
        label,
        required,
    } = props;

    const {
        register,
        
        // formState: { errors, isDirty, isSubmitting, isValid },
      } = useForm({ mode: 'onChange' })

      const handleChange = (data:any) => {
        return callback({
            id,
            value: data?.target?.value
        })
      } 


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
                className="bg-violet-100 border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder={placeholder}
                {...register(id,{required})}
                onChange={handleChange}
            />
        </div>
    )
}
export default Input