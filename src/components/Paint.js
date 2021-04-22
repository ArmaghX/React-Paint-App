import React, { useState, useEffect, useCallback } from 'react';
import randomColor from 'randomcolor';

import Name from './Name';
import ColorPicker from './ColorPicker';
import RefreshButton from './RefreshButton';
import WindowSize from './WindowSize';

export default function Paint() {
    const [colors, setColors] = useState([]);
    const [activeColor, setActiveColor] = useState(null);

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
                <WindowSize />
        </header>
    )
}