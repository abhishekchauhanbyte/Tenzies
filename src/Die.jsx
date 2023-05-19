import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor : props.isHeld && "#59E391"
    }
    return (
        <div className ="die-face" style={styles} onClick={() => props.holdDice(props.id)}>  
            <span className={`dot ${props.value >= 1 ? 'show' : ''}`} />
            <span className={`dot ${props.value >= 2 ? 'show' : ''}`} />
            <span className={`dot ${props.value >= 3 ? 'show' : ''}`} />
            <span className={`dot ${props.value >= 4 ? 'show' : ''}`} />
            <span className={`dot ${props.value >= 5 ? 'show' : ''}`} />
            <span className={`dot ${props.value === 6 ? 'show' : ''}`} />
        </div>
    )
}