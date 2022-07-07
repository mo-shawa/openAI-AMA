import React from 'react'

export default function Card(props) {
    return (
        <article>
            <h3>{props.response.prompt ? `"${props.response.prompt}"` : "(no prompt)"}</h3>
            <br />
            <p>{props.response.response}</p>
        </article>
    )
}
