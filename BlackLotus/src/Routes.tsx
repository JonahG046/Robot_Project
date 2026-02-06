import {Switch, Route, Router} from "wouter"
import CreateAuth from "./pages/Auth"

const Routes = () => {
    return (
       <Router>
            <Switch>
                <Route path="/Create-Account" component={CreateAuth}/> 
            </Switch>
        </Router>

    )




}
export default Routes