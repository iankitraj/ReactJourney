import "./App.css";
import Card from "./components/Card";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  let myObj = {
    username: "Hilly",
    age: 24,
  };

  let newArr = [1, 2, 3, 4, 5];
  return (
    <>
      <h1 className="bg-green-300 text-black p-4 rounded-xl">Profile</h1>
      <br />
      <Card username="Hilly" btnText="click me" />
      <Card username="Sanaya" />
    </>
  );
}

export default App;
