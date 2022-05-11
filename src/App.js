import './App.css';
import Card from './components/Card/Card';
import Form from './components/Form/Form';
import { useState } from 'react';


function App() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('submit');
  }

  const handleChange = (e) => {
    setPrompt(e.target.value);
  }

  return (
    <div className="App">
      <Form handleChange={handleChange} handleSubmit={handleSubmit} />
      <div className='responses'>
        {isLoading ? <h1>Loading...</h1> : responses.map((response, index) => {
          return <Card key={index} response={response} />
        })}
      </div>
    </div>
  );
}

export default App;
