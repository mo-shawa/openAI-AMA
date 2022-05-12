import './App.css';
import Card from './components/Card/Card';
import Form from './components/Form/Form';
import { useState } from 'react';



function App() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    })
    const data = await response.json();
    console.log(data)
    setIsLoading(false);
    setPrompt(data.body.prompt);
  }

  const handleChange = (e) => {
    setPrompt(e.target.value);
  }

  return (
    <div className="App">
      <Form handleChange={handleChange} prompt={prompt} handleSubmit={handleSubmit} />
      <div className='responses'>
        {isLoading ? <h1>Loading...</h1> : responses.map((response, index) => {
          return <Card key={index} response={response} />
        })}
      </div>
    </div>
  );
}

export default App;
