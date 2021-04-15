import React, { useState, useEffect } from 'react';
import randomColor from 'randomcolor';

export default function Playground() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(null);

  useEffect(() => {
    setColor(randomColor())
  }, [count])

  return (
    <div style={{ borderTop: `10px solid ${color}` }}>
      <p>{count}</p>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>
        -
      </button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        +
      </button>
    </div>
  );
}