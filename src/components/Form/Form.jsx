import React, { useState, useRef } from 'react'
import { useTransition, animated } from 'react-spring'

export default function Form(props) {
    const [open, setOpen] = useState(false)
    const animateDetails = useTransition(open, {
        from: { opacity: 0, maxHeight: '0' },
        enter: { opacity: 1, maxHeight: '300px' },
        leave: { opacity: 0, maxHeight: '0' }
    })

    const handleSummaryOpen = (e) => {
        e.preventDefault()
        setOpen(!open)
    }

    const handleSetPrompt = (e) => {
        props.setPrompt(e.target.value)
    }

    const handleSetSettings = (e) => {
        props.setSettings(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    return (
        <>
            <h1>Ask GPT-3</h1>
            <form onSubmit={props.handleSubmit}>
                <textarea autoFocus placeholder='Write prompt here...' onChange={handleSetPrompt} value={props.prompt} name="prompt" id="text" cols="30" rows="4"></textarea>
                <details open>
                    <summary onClick={handleSummaryOpen} >{open ? "Model" : "Settings"}</summary>
                    {animateDetails((style, isOpen) => (
                        isOpen ? <animated.div style={style}>
                            <div className="detailsContent">

                                <select onChange={handleSetSettings} value={props.settings.model} name="model" >
                                    <option disabled selected hidden >Pick an engine..</option>
                                    <option value='text-curie-001'>text-curie-001 (default)</option>
                                    <option value='text-ada-001'>text-ada-001 (faster)</option>
                                    <option value='text-davinci-002'>text-davinci-002 (more sophisticated)</option>
                                </select>
                                <hr />

                                <label htmlFor="temperature">Temperature (creativity)</label>
                                <input onChange={handleSetSettings} value={props.settings.temperature} type="range" name="temperature" defaultValue={0.5} step={0.01} min={0} max={1} />
                                <hr />

                                <label htmlFor="maxTokens">Max tokens (response length)</label>
                                <input onChange={handleSetSettings} value={props.settings.maxTokens} type="range" name="max_tokens" min={20} max={200} />
                            </div>
                        </animated.div>
                            : null
                    ))}

                </details>
                <button onClick={() => setOpen(false)} type="submit" >Submit</button>
                {/* Focus textarea after submit */}
            </form>
        </>


    )
}
