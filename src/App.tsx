import React, { useEffect, useRef } from 'react';
import './App.css';
import { GamePixi } from './Pixijs/GamePixi';

function App() {
  const myRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    myRef.current?.appendChild(new GamePixi().app.view)
  }, []);
  return (
    <div ref={myRef}></div>
  );
}

export default App;
