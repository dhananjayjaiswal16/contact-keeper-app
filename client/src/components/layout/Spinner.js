import React from 'react'
import spinner from './spinner.gif'

const Spinner = () => {
    return (
        <>
            <img src={spinner} alt="Loading..." style={loadingStyle} />
        </>
    )
}
const loadingStyle = {
    display: 'block',
    margin: 'auto',
    width: '200px'
}



export default Spinner;