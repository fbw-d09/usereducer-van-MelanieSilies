import React, { useState, useReducer } from "react";
import './App.css';
import Van from './assets/van.svg';


const initialGearState = { gear: 0 };
const initialSpeedState = { speed: 0 };
const initialEngineState = { isEngineOn: false };

const gearReducer = (state, action) => {
  switch (action.type) {
    case 'GEARUP':
      return { gear: state.gear < 4 ? state.gear + 1 : state.gear };
    case 'GEARDOWN':
      return { gear: state.gear > 0 ? state.gear - 1 : state.gear };
    default:
      throw new Error('Unknown Action');
  }
};

const speedReducer = (state, action) => {
  switch (action.type) {
    case 'SPEEDUP':
      return { speed: state.speed + 10 * action.gear };
    case 'SPEEDDOWN':
      return { speed: state.speed > 0 ? state.speed - 10 * action.gear : state.speed };
    default:
      throw new Error('Unknown Action');
  }
};

const engineReducer = (state, action) => {
  switch (action.type) {
    case 'STARTENGINE':
      return { isEngineOn: true };
    case 'STOPENGINE':
      return { isEngineOn: false };
    case 'RESETGEAR':
      return { isEngineOn: false, gear: 0 };
    default:
      throw new Error('Unknown Action');
  }
};

export default function App() {
  const [gearState, gearDispatch] = useReducer(gearReducer, initialGearState);
  const [speedState, speedDispatch] = useReducer(speedReducer, initialSpeedState);
  const [engineState, engineDispatch] = useReducer(engineReducer, initialEngineState);

  const handleStartEngine = () => {
    engineDispatch({ type: 'STARTENGINE' });
    setStatusText('ENGINE ON');
  };

  const handleGearUp = () => {
    if (engineState.isEngineOn) {
      gearDispatch({ type: 'GEARUP' });
    }
  };

  const handleGearDown = () => {
    if (engineState.isEngineOn) {
      gearDispatch({ type: 'GEARDOWN' });
    }
  };

  const handleSpeedup = () => {
    if (engineState.isEngineOn && gearState.gear > 0) {
      speedDispatch({ type: 'SPEEDUP', gear: gearState.gear });
    }
  };

  const handleStopEngine = () => {
    engineDispatch({ type: 'STOPENGINE' });
    setStatusText('');
  };

  const handleSpeeddown = () => {
    if (engineState.isEngineOn && gearState.gear > 0) {
      speedDispatch({ type: 'SPEEDDOWN', gear: gearState.gear });
    }
  };

  const engineButtonClassName = engineState.isEngineOn ? 'engineButton engineButtonOn' : 'engineButton';

  return (
    <div className="App">
      <section className="vanSection">
      <img id="van" src={Van} alt="Van" className={engineState.isEngineOn ? 'vanOn' : 'vanOff'} />
      </section>
      <div className="center">
        <button  className={engineButtonClassName}  onClick={engineState.isEngineOn ? handleStopEngine : handleStartEngine} >
          {engineState.isEngineOn ? 'Stop Engine' : 'Start Engine'}
        </button>
      </div>
      

      <section className="discription">
        <div className="gear">
          <p>The current gear is: <span className="span">{gearState.gear}</span></p>
          <button onClick={handleGearUp} disabled={!engineState.isEngineOn || gearState.gear === 4}>GEAR UP</button>
          <button onClick={handleGearDown} disabled={!engineState.isEngineOn || gearState.gear === 0}>GEAR DOWN</button>
        </div>
        <div className="speed">
          <p>The current speed is: <span className="span">{speedState.speed}</span></p>
          <button onClick={handleSpeedup} disabled={!engineState.isEngineOn || gearState.gear === 0}>SPEED UP</button>
          <button onClick={handleSpeeddown} disabled={!engineState.isEngineOn || gearState.gear === 0}>SPEED DOWN</button>
        </div>
       
      </section>
    </div>
  );
}
