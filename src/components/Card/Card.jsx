import React from 'react'

export default function Card(props) {
    return (
        <article>
            <h3>Prompt: {props.response.prompt}</h3>
            <br />
            <p>Response: {props.response.response}</p>

        </article>
    )
}
