import React from 'react'

export default function Form(props) {
    return (
        <>
            <h1>Robot AMA</h1>
            <form onSubmit={props.handleSubmit}>
                <textarea placeholder='Write prompt here...' onChange={props.handleChange} value={props.prompt} name="prompt" id="text" cols="30" rows="4"></textarea>
                <button type="submit" >Submit</button>
            </form>
        </>


    )
}
