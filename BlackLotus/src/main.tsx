import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// const myButton = (
//   <button>
//     Don't press me!
//  </button>
// )

// const myTable = (
//   <table>
//       <tr>
//         <td>
//           Hello World!
//         </td>
//         <td>
//           Goodbye World!
//         </td>
//       </tr>
    
//     <tr>
//       <td>
//         Something
//       </td>
//       <td>
//         Something again 
//       </td>
//     </tr>
//   </table>


// );




createRoot(document.getElementById('root')!).render(
  
  
  <StrictMode>
    <App />
  </StrictMode>,
  
  
  // myTable,
 // myButton,
  
  

)
