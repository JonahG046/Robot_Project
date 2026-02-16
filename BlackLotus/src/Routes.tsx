import {Switch, Route, Router} from "wouter"
import CreateAuth from "./pages/Auth"
import Home from "./pages/Home"
import About from "./pages/About"
import CurrentJobs from "./pages/CurrentJobs"
import Login from "./pages/Login"

const Routes = () => {
    return (
       <Router>
            <Switch>
                <Route path="/Create-Account" component={CreateAuth}/> 
                <Route path="/Home" component={Home}/>
                <Route path="/About" component={About}/>
                <Route path="/Current-jobs" component={CurrentJobs}/>
                <Route path="/Login" component={Login}/>
            </Switch>
        </Router>

    )




}
export default Routes