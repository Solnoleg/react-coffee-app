import React from 'react'
import {Card, CardContent} from "@mui/material";

// eslint-disable-next-line
export default props => (
    <Card>
        <CardContent>
            <div style={{
                marginBottom: '10px',
                display: 'block',
                padding: '10px'
            }}>
                <h3>{props.name}</h3>
                <p>Distance: <strong>{props.distance}</strong></p>
            </div>
        </CardContent>
    </Card>
)
