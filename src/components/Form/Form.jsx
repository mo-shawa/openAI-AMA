import React from 'react'

export default function Form(props) {
    return (
        <>
            <form onSubmit={props.handleSubmit}>
                <textarea onChange={props.handleChange} value={props.prompt} name="prompt" id="text" cols="30" rows="10"></textarea>
                <button type="submit" >Submit</button>
            </form>
        </>


    )
}
