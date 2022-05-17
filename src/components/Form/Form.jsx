import React from 'react'

export default function Form(props) {
    return (
        <>
            <h1>Robot AMA</h1>
            <form onSubmit={props.handleSubmit}>
                <textarea placeholder='Write prompt here...' onChange={props.handleChange} value={props.prompt.prompt} name="prompt" id="text" cols="30" rows="4"></textarea>
                <details>
                    <summary>Super Secret Settings</summary>
                    <select onChange={props.handleChange} value={props.prompt.model} name="model" >
                        <option value=''>Pick an engine</option>
                        <option value='text-curie-001'>text-curie-001 (default)</option>
                        <option value='text-ada-001'>text-ada-001 (faster)</option>
                        <option value='text-davinci-002'>text-davinci-002 (more sophisticated)</option>
                    </select>

                    <label htmlFor="temperature">Temperature (creativity)</label>
                    <input onChange={props.handleChange} value={props.prompt.temperature} type="range" name="temperature" defaultValue={0.5} step={0.01} min={0} max={1} />
                    <div className="form-control">

                        <label htmlFor="maxTokens">Max tokens</label>
                        <input onChange={props.handleChange} value={props.prompt.maxTokens} type="range" defaultValue={50} name="max_tokens" min={20} max={200} />

                    </div>
                </details>
                <button type="submit" >Submit</button>
            </form>
        </>


    )
}
