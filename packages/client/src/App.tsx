import { useEffect, useState } from 'react';
import './App.css';
import { Button } from '@base-ui/react/button';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('api/hello')
         .then(res => res.json())
         .then(data => setMessage(data.message));
   }, []);

   return (
      <div className="flex flex-col items-center justify-center h-screen">
         <h1 className="text-3xl font-bold">{message}</h1>
         <Button>Click Me</Button>
      </div>
   );
}

export default App;
