import React from 'react'

export default function Card(props) {
    return (
        <div >
            <h3>Prompt: {props.response.prompt}</h3>
            <br />
            <p>Response: {props.response.response}</p>
        </div>
    )
}
