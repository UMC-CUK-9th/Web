import { useEffect, useState } from 'react'
import './App.css'

interface User{
  id: number;
  name: string;
  email: string;
}


function App() {
  const [data,setData] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await response.json();
      setData(data);
    }
    fetchData();
  },[]);

  return(
    <>
      <h1> Tanstack Query </h1>
      {JSON.stringify(data)}
    </>
  );
}


export default App;
