import { useEffect, useState } from "react";

const App = () => {
  const[stone, setStone] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/")
    .then((resp) => resp.json())
    .then((response) => {
      setStone(response);
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

console.log(stone);

  return <div>App</div>;
};

export default App;