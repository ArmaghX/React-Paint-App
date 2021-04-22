import React, {useState, useEffect, useRef} from 'react';

export default function Canvas(props) {
    const [drawing, setDrawing] = useState(false);

    const canvasRef = useRef();
    const contextRef = useRef();
    
    useEffect(() => {
        contextRef.current = canvasRef.current.getContext('2d')
    }, [])

    function handleMouseMove(e) {
        // actual coordinates
        const coords = [
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
        ];
        if (drawing) {
            contextRef.current.lineTo(...coords);
            contextRef.current.stroke();
        }
        if (props.handleMouseMove) {
            props.handleMouseMove(...coords);
        }
    }

    function startDrawing(e) {
        contextRef.current.lineJoin = 'round';
        contextRef.current.lineCap = 'round';
        contextRef.current.lineWidth = 10;
        contextRef.current.strokeStyle = props.color;
        contextRef.current.beginPath();
        // actual coordinates
        contextRef.current.moveTo(
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
        );
        setDrawing(true);
    }

    function stopDrawing() {
        contextRef.current.closePath();
        setDrawing(false);
    }

    return (
        <canvas 
            ref={canvasRef}
            width={props.width}
            height={props.height}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onMouseMove={handleMouseMove}
        />
    )
};