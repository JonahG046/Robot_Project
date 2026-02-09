// import { useState } from 'react'
// import reactLogo from '/assets/react.svg'
// import viteLogo from '/vite.svg'
//import React, { useState, useEffect } from "react";
import './App.css'
//import Button from './components/shared/Button'
import Grid from "./components/shared/Grid";


function App() {

// Find a way to tell button where to go
// Create containers for data
// Create nav

  return (
    <>
    
      <Grid />
      <div className='App'>
        <h1>
          Hello World!!!!!!!!!!!
        </h1>
      </div>
      <div>
        <a href="https://youtube.com" target="_blank">
          <button>Go to YouTube</button>
        </a>
      </div>

      <Grid />
    </>
  )


  }


// function App() {
//     // usestate for setting a javascript
//     // object for storing and using data
//     const [data, setdata] = useState({
//         id: 0,
//         sender: "",
//         recipient: "",
//         message: "",
//     });

//     // Using useEffect for single rendering
//     useEffect(() => {
//         // Using fetch to fetch the api from 
//         // flask server it will be redirected to proxy
//         fetch("http://127.0.0.1:5000/messages").then((res) =>
//             res.json().then((data) => {
//                 // Setting a data from api
//                 setdata({
//                     id: data.id,
//                     sender: data.sender,
//                     recipient: data.recipient,
//                     message: data.message,
//                 });
//             })
//         );
//     }, []);

//     return (
//         <div className="App">
//             <header className="App-header">
//                 <h1>React and flask</h1>
//                 {/* Calling a data from setdata for showing */}
//                 <p>{data.name}</p>
//                 <p>{data.age}</p>
//                 <p>{data.date}</p>
//                 <p>{data.programming}</p>

//             </header>
//         </div>
//     );
// }
// export default App


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

export default App