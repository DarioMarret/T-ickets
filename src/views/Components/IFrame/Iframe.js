import React, { useEffect, useRef, useState } from 'react'

function Iframe(props) {
    const { url, setEstadoFrame } = props
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(1024)

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
        console.log('width', width)
        console.log('height', height)
    })
    useEffect(() => {
        renderWidth()
    }, [width, height])

    function renderWidth() {
        if (width < 460) {
            return "100%"
        }
        if (width > 768) {
            return "20%"
        }
        if (width > 1024) {
            return "30%"
        }
    }

    return (
        <>
            <div
                style={{
                    display: 'none',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: '1000'
                }}> <button
                style={{
                    backgroundColor: 'rgb(232, 232, 232, 0.5)',
                    border: 'none',
                    borderRadius: '50px',
                    width: '50px',
                    height: '50px',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '20px',
                    fontWeight: 'bold',
                }}
                onClick={() => setEstadoFrame(false)}
                >X</button>
                <iframe
                    src={url ? url : "https://pagourl.com/f/2y-13-car9uvqdnfak3rdv3qwqvon1wqcwj0mv8hyjoaojhlyv-v86jh-3"}
                    title="W3Schools Free Online Web Tutorials"
                    Width={renderWidth()}
                    height="70%"
                    style={{
                        border: 'none',
                        borderRadius: '10px',
                    }}
                ></iframe>
            </div>
        </>
    );
}

export default Iframe;