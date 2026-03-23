import {Switch, Route, Router} from "wouter"
import CreateAuth from "./pages/Auth"
import Home from "./pages/Home"
import About from "./pages/About"
import CurrentJobs from "./pages/CurrentJobs"
import Login from "./pages/Login"
import SendMessage from "./pages/SendMessage"
import ForgetPassword from "./pages/ForgetPassword"

const Routes = () => {
    return (
       <Router>
            <Switch>
                <Route path="/Create-Account" component={CreateAuth}/> 
                <Route path="/Home" component={Home}/>
                <Route path="/About" component={About}/>
                <Route path="/Current-jobs" component={CurrentJobs}/>
                <Route path="/Login" component={Login}/>
                <Route path="/Send-Message" component={SendMessage}/>
                <Route path="/Forget-Password" component={ForgetPassword}/>
            </Switch>
        </Router>

    )




}
export default Routes