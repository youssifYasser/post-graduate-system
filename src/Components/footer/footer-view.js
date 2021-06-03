import React from 'react'

const Footer = () => {
    const myStyle = {
        backgroundColor: '#212529',
        padding: '10px',
        textAlign: 'center',
        fontSize: '15px',
        color: '#edf0f6',
        fontFamily: 'none',
        width: '100%',
        position: 'relative',
        left: '0',
        bottom: '0'
    }
    return (
        <footer className="footer" style={myStyle}>
            Copyrights &copy; Ain Shams University 2021 | Developed by YMA Team
        </footer>
    )
}

export default Footer