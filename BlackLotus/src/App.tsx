import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link } from 'react-router-dom'

function LoginForm() {
  return(
    <h1>
      Hello World!
    </h1>
  )
}

function App() {
  



  return (
    <>
    <div className='App'>
      <h1>
        Hello World!
      </h1>
    </div>
    <div>
      <a href="https://youtube.com" target="_blank">
        <button>Go to YouTube</button>
      </a>
    </div>



    <LoginForm />

  </>
  )
  
  
  
  
  
  
  
  
  
  
  
  
  
  }


export default App
  
  
  
  
  
  
  // const [count, setCount] = useState(0)
  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Hello World!
  //       </p>
  //     </div>
  //     <div className="card">
  //       <Link to='https://www.youtube.com'>
  //       <button>
  //         Go to YouTube
  //       </button>
  //       </Link>
  //       <p>
          
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

