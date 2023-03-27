import React, { useState } from "react";
import './Button.css'
function Button() {
  const [logs, setLogs] = useState([]);

  const handleClick = (buttonName) => {
    const now = new Date();
    const log = {
      name: buttonName,
      time: now.toLocaleTimeString(),
    };
    setLogs([...logs, log]);
  };

  return (
    <div className="cont">
     
      <table className="tab">
        <thead className="head" >
          <tr>
            <th>Button Name</th>
            <th>Click Time</th>
          </tr>
        </thead>
        <tbody className="body">
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.name}</td>
              <td>{log.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btn">
        <button onClick={() => handleClick("Button A")}>Button A</button>
        <button onClick={() => handleClick("Button B")}>Button B</button>
        <button onClick={() => handleClick("Button C")}>Button C</button>
        <button onClick={() => handleClick("Button D")}>Button D</button>
      </div>
    </div>
  );
}

export default Button;
