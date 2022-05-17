import './App.css';
import Card from './components/Card/Card';
import Form from './components/Form/Form';
import LoadingIcon from './components/LoadingIcon/LoadingIcon';
import { useState, useEffect } from 'react';



function App() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState(() => {
    const storage = JSON.parse(localStorage.getItem('responses'));
    return storage || [];
  });


  useEffect(() => {
    localStorage.setItem('responses', JSON.stringify(responses));
  }, [responses])


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
    setResponses([...responses, { prompt: prompt, response: data.response.choices[0].text }]);
    setIsLoading(false);
    setPrompt('');
  }

  const handleChange = (e) => {
    setPrompt(e.target.value);
  }

  return (
    <div className="App">
      <div className="form-container">
        <Form handleChange={handleChange} prompt={prompt} handleSubmit={handleSubmit} />
      </div>
      <div className='responses'>
        {/* <LoadingIcon /> */}
        {!responses.length && !isLoading && <h1>Ask GPT3 anything!</h1>}
        {isLoading ? <LoadingIcon /> : responses.map((response, index) => {
          return <Card key={index} response={response} />
        })}
      </div>
    </div>
  );
}

export default App;
