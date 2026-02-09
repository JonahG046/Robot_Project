import {Switch, Route, Router} from "wouter"
import CreateAuth from "./pages/Auth"
import Home from "./pages/Home"
import About from "./pages/About"
import CurrentJobs from "./pages/CurrentJobs"

const Routes = () => {
    return (
       <Router>
            <Switch>
                <Route path="/Create-Account" component={CreateAuth}/> 
                <Route path="/Home" component={Home}/>
                <Route path="/About" component={About}/>
                <Route path="/Current-jobs" component={CurrentJobs}/>
            </Switch>
        </Router>

    )




}
export default Routes