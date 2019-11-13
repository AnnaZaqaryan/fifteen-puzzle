import React from 'react'

export default function BlunkDiv(props) {

    return (
        <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.11)' }}>
            {props.children}
        </div>
    )
}
