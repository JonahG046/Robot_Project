import { use, useEffect } from "react"

const ApiTest = () => {

useEffect(() => {


const getapi = async () => {
    const response = await fetch("http://127.0.0.1:8000/", {
        method: "GET",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
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
