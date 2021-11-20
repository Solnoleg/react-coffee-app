import React from 'react'

// eslint-disable-next-line
export default props => (
    <div style={{
        marginBottom: '10px',
        display: 'block',
        padding: '10px'
    }}>
        <h3>{props.name}</h3>
        <p>Distance: <strong>{props.distance}</strong></p>
    </div>
)
