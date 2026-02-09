import Button from '../Button'

function Grid() {
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
        <div className="bg-blue-500 
        text-white p-5">
            <Button message={"goodbye"}/>
        </div>
        <div className="bg-blue-500 
        text-white p-5">
            Grid Item 2
        </div>
        <div className="bg-blue-500 
        text-white p-5">
            Grid Item 3
        </div>
    </div>
   

  );
}

export default Grid;