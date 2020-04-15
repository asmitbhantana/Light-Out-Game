import React from 'react'
import './../css/Light.css'
function Light(props) {
    function handleClick(){
        props.clickHandle(props.rowIndex,props.colIndex)
    }
    return (
        <div className={`block ${props.itemVale?' light-block':''}`} onClick={handleClick} >
                    
        </div>
    )
}

export default Light
