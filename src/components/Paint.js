import React, { useState, useEffect, useCallback, useRef } from 'react';
import randomColor from 'randomcolor';

import Name from './Name';
import ColorPicker from './ColorPicker';
import RefreshButton from './RefreshButton';
import Canvas from './Canvas';

import useWindowSize from '../hooks/useWindowSize';

export default function Paint() {
    const [colors, setColors] = useState([]);
    const [activeColor, setActiveColor] = useState(null);
    const [visible, setVisible] = useState(false);

    let timeoutId = useRef()
    const [windowWidth, windowHeight] = useWindowSize(() => {
        setVisible(true)
        clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(() => setVisible(false), 500)
    });

    const getColors = useCallback(() => {
        const baseColor = randomColor().slice(1);
        fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
            .then(res => res.json())
            .then(res => {
                setColors(res.colors.map(color => color.hex.value));
                setActiveColor(res.colors[0].hex.value)
            })
            .catch(err => console.error(err))
    }, [])

    useEffect(getColors, [])

    return (
        <header style={{ borderTop: `10px solid ${activeColor}` }}>
            <div className="app">
                <Name />
            </div>
            <div style={{ marginTop: 10 }}>
                <ColorPicker
                    colors={colors}
                    activeColor={activeColor}
                    setActiveColor={setActiveColor}
                />
                <RefreshButton cb={getColors} />
            </div>
            {activeColor && (
                <Canvas
                    color={activeColor}
                    width={windowWidth}
                    height={windowHeight}
                />
            )}
            <div className={`window-size ${visible ? '' : 'hidden'}`}>
                {windowWidth} x {windowHeight}
            </div>
        </header>
    )
}