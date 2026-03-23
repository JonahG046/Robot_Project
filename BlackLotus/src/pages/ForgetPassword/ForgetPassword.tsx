import Button from "../../components/shared/Button"
import Input from "../../components/shared/Input"
import RouteLink from "../../components/shared/RouteLink"
import { useForm } from 'react-hook-form'

const emailAddress = "emailAddress"
const password = "password"
const defaultValues = {emailAddress, password}
const ForgetPassword = () => {

    const {
        setValue,
        getValues,
        // formState: { errors, isDirty, isSubmitting, isValid },
      } = useForm({ mode: 'onChange', defaultValues })

    const submitHandler = (event: any) => {
        console.log("form submitted", getValues());
    }

    const inputHandler = (data:any) => {
        return setValue(data.id, data.value)
    }

    


    return (
        
    <div className="bg-violet-200">
        <h1 className="p-8">
            Enter your email to reset your password
        </h1>

        
        <div className="p-12 shadow-md rounded-[4%] bg-violet-400">
            <form name="password"className="flex flex-col gap-4" onSubmit={submitHandler}>
                <Input id={emailAddress} label="Email Address" placeholder="jane.doe@mnsu.edu" type="email" callback={inputHandler} />

                <Button className="bg-violet-200 w-full" text="Send Email" type="submit" />
            </form>
        </div>

    </div>



    )



}
export default ForgetPassword