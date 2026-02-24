import Button from "../../components/shared/Button"
import Input from "../../components/shared/Input"
import RouteLink from "../../components/shared/RouteLink"

const Login = () => {
    const submitHandler = (event: any) => {
        console.log("form submitted", event.target);
    }

    const inputHandler = (data:any) => {
        return console.log("input", data)
    }

    return (
    <div className="bg-violet-200">
        <h1 className="p-8">
            Sign into your account
        </h1>

        <div className="p-12 shadow-md rounded-[4%] bg-violet-400">
            <form name="account"className="flex flex-col gap-4" onSubmit={submitHandler}>
                <Input id="email-address" label="Email Address" placeholder="jane.doe@mnsu.edu" type="email" callback={inputHandler} />
                <Input id="password" label="Password" type="password" callback={inputHandler} />
                <div className="w-1/2"/>
                <div className="w-1/2 text-right">
                    <RouteLink text="forgot password?" href="/home" />
                </div>
                <Button className="bg-violet-200 w-full" text="Log In" type="submit" />
            </form>
        </div>

    </div>



    )



}
export default Login