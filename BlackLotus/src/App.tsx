// import { useState } from 'react'
import './App.css'
import Nav from './components/shared/Nav'
import Routes from "./Routes"
import { useState } from 'react'
import {AuthContext} from "./state/context/authContext.ts"



function App() {
  
  const [currentUser, setCurrentUser] = useState({currentUser: null, setCurrentUser: () => {}});
  
  return (
    <AuthContext value={{currentUser, setCurrentUser}}>
      <Nav />
      <Routes />
      <div className='App'>
      </div>
    </AuthContext>
  )
}


export default App