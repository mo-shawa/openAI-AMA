import './App.css';
import Card from './components/Card/Card';
import Form from './components/Form/Form';
import LoadingIcon from './components/LoadingIcon/LoadingIcon';
import { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring'



function App() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [responses, setResponses] = useState(() => {
    const storage = JSON.parse(localStorage.getItem('responses'));
    return storage || [];
  });

  const transitionIcon = useTransition(isLoading, {
    from: { opacity: 0, position: 'absolute', top: '50%', left: '50%' },
    enter: { opacity: 1 },
    leave: { opacity: 0, position: 'absolute', top: '50%', left: '100%' },
  })

  const transitionCard = useTransition(!isLoading, {
    from: { opacity: 0, marginLeft: -100 },
    enter: { opacity: 1, marginLeft: 0 },
    leave: { opacity: 0, marginLeft: 100 },
    delay: 500,


  })

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
    setResponses([{ prompt: prompt, response: data.response.choices[0].text }, ...responses]);
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
        {!responses.length && !isLoading && <h1>Ask GPT3 anything!</h1>}
        {transitionIcon((style, loading) => (
          loading ? <animated.div style={style}>
            <LoadingIcon />
          </animated.div> : null
        ))}
        {transitionCard((style, loaded) => (
          loaded ? responses.map((response, index) => (
            <animated.div className='card' key={index} style={style}>
              <Card response={response} />
            </animated.div>
          ))
            : null))}
        {/* {isLoading ? '' : responses.map((response, index) => {
          return <Card key={index} response={response} />
        })
        } */}

      </div>
    </div>
  );
}

export default App;
