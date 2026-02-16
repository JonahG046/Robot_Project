import Button from "../../components/shared/Button"
import Input from "../../components/shared/Input"

const CreateAuth = () => {
    const submitHandler = (event: any) => {
        console.log("form submitted", event.target);
    }

    return (
    <>
        <body className="bg-violet-200" />
        <h1 className="p-8">
            Create your Account
        </h1>

        <div className="p-12 shadow-md rounded-[4%] bg-violet-400">
            <form name="account"className="flex flex-col gap-4" onSubmit={submitHandler}>
                <Input id="full-name" label="Full Name" placeholder="Jane Doe" />
                <Input id="email-address" label="Email Address" placeholder="jane.doe@mnsu.edu" type="email" />
                <Input id="password" label="Password" type="password" />
                <Button className="bg-violet-200 w-full" text="Create Account" type="submit" />
            </form>
        </div>

    </>



    )



}
export default CreateAuth