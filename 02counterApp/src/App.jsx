import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(0);

  const addValue = () => {
    if (counter < 15) {
      setCounter(counter + 1);
      console.log("Add Value Clicked", counter + 1);
    } else {
      alert("Counter cannot exceed 15");
      return;
    }
  };

  const removeValue = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      console.log("Remove Value Clicked", counter - 1);
    } else {
      alert("Counter cannot be less than 0");
      return;
    }
  };
  return (
    <>
      <h1>Counter App!</h1>
      <h3>Counter Value: {counter}</h3>
      <button onClick={addValue}>Add Value</button>
      <br />
      <button onClick={removeValue}>Remove Value</button>
    </>
  );
}

export default App;
