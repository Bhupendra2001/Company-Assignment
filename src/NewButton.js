import React, { useState } from 'react';
import './Collect.css'
function App() {
  const [inputs, setInputs] = useState(['']); // initial state with one input field

  const handleAddInput = () => {
    setInputs([...inputs, '']); // add a new empty input to the array of inputs
  };

  const handleInputChange = (e, index) => {
    const newInputs = [...inputs]; // create a copy of the array
    newInputs[index] = e.target.value; // update the value at the given index
    setInputs(newInputs); // update the state with the new array of inputs
  };

  return (
    <div className='cont'>
      
     <div className='btn'>
      {inputs.map((value, index) => (
        <input  key={index} value={value} onChange={(e) => handleInputChange(e, index)} />
      ))}
      <button  onClick={handleAddInput}>Add More</button>
     </div>

      <div className='data'>
        <h2>Collected Data:</h2>
        {inputs.map((value, index) => (
          <p key={index}>{value}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
