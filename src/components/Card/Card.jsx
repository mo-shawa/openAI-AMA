import React from 'react'

export default function Card(props) {
    return (
        <div className='card'>
            <h3>Prompt: {props.response.prompt}</h3>
            <br />
            <br />
            <p>Response: {props.response.response}</p>
        </div>
    )
}
