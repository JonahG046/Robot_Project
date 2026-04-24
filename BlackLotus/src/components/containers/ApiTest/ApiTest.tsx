import { use, useEffect } from "react"

const ApiTest = () => {

useEffect(() => {


const getapi = async () => {
    const response = await fetch("http://localhost:8000/users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": "*"
        }
    })
    const exampleHeader = response.headers.get('Content-Type');
    console.log("exampleHeader ", exampleHeader);
    response.headers.forEach((value, key) => {
        console.log(`${key} ==> ${value}`);
    });
    console.log(response)
    const data = await response.json()
    console.log(data)
}

getapi()
}, [])


return (
    <div>
        <h1>API Test Page</h1>
    </div>
    )
}

export default ApiTest
