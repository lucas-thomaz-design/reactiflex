import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ArrowSelector from './components/ArrowSelector';
import ArrowSVG from './components/ArrowSVG';

function App() {
  const [isExerciseActive, setIsExerciseActive] = useState(false);
  const [selectedArrows, setSelectedArrows] = useState(['↑', '↓', '←', '→']);
  const [timeBetweenChanges, setTimeBetweenChanges] = useState(1000); // Em milissegundos
  const [isRandomInterval, setIsRandomInterval] = useState(false);
  const [exerciseDurationSeconds, setExerciseDurationSeconds] = useState(10); // Agora em segundos
  const [arrow, setArrow] = useState(null);
  const [countdown, setCountdown] = useState(3); // Para o countdown antes do exercício
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  const directions = ['↑', '↓', '←', '→'];
  const exerciseTimeout = useRef(null);
  const intervalTimeout = useRef(null);

/////
  const startCountdown = () => {
    setIsCountdownActive(true);
    let countdownValue = 3;
    setCountdown(countdownValue); // Mostra o valor inicial antes de iniciar o intervalo

    const countdownInterval = setInterval(() => {
      countdownValue--;
      if (countdownValue < 0) {
        clearInterval(countdownInterval);
        setIsCountdownActive(false);
        startExercise();
      } else {
        setCountdown(countdownValue); // Atualiza o valor após a primeira exibição
      }
    }, 1000);
  };





  ////

  const startExercise = () => {
    setIsExerciseActive(true);
    generateRandomArrow();
    const exerciseDurationMs = exerciseDurationSeconds * 1000; // Converter segundos para milissegundos
    exerciseTimeout.current = setTimeout(() => stopExercise(), exerciseDurationMs);
  };

  const stopExercise = () => {
    setIsExerciseActive(false);
    setArrow(null);
    clearTimeout(exerciseTimeout.current);
    clearTimeout(intervalTimeout.current);
  };

  const generateRandomArrow = () => {
    const randomArrow = selectedArrows[Math.floor(Math.random() * selectedArrows.length)];
    setArrow(randomArrow);

    const nextInterval = isRandomInterval
      ? Math.floor(Math.random() * (3000 - 500) + 500) // Intervalo aleatório entre 500ms e 3000ms
      : timeBetweenChanges;

    intervalTimeout.current = setTimeout(generateRandomArrow, nextInterval);
  };

  useEffect(() => {
    return () => {
      clearTimeout(exerciseTimeout.current);
      clearTimeout(intervalTimeout.current);
    };
  }, []);

  return (
    <div className="App">
      {isCountdownActive ? (
        <Countdown countdown={countdown} />
      ) : isExerciseActive ? (
        <Exercise arrow={arrow} stopExercise={stopExercise} exerciseDurationSeconds={exerciseDurationSeconds} />
      ) : (
        <Settings
          directions={directions}
          selectedArrows={selectedArrows}
          setSelectedArrows={setSelectedArrows}
          timeBetweenChanges={timeBetweenChanges}
          setTimeBetweenChanges={setTimeBetweenChanges}
          isRandomInterval={isRandomInterval}
          setIsRandomInterval={setIsRandomInterval}
          exerciseDurationSeconds={exerciseDurationSeconds}
          setExerciseDurationSeconds={setExerciseDurationSeconds}
          startCountdown={startCountdown}
        />
      )}
    </div>
  );
}

function Countdown({ countdown }) {
  return (
    <div className="countdown">
      <h1>Prepare-se!</h1>
      <div className="countdown-number">{countdown}</div>
    </div>
  );
}

function Settings({
  directions,
  selectedArrows,
  setSelectedArrows,
  timeBetweenChanges,
  setTimeBetweenChanges,
  isRandomInterval,
  setIsRandomInterval,
  exerciseDurationSeconds,
  setExerciseDurationSeconds,
  startCountdown,
}) {
  return (
    
    <div className="settings">
      <div className="title"> 
        <h1>ReactiFlex</h1>
        <p>Configure seu treino de reflexo e propriocepção!</p>

      </div>
      
      <div className="config-option">
        <p className='label'> Escolha as direções do treino:</p>
        <ArrowSelector
          directions={directions}
          selectedArrows={selectedArrows}
          setSelectedArrows={setSelectedArrows}
        />
      </div>

      <div className="config-option">
      <p className='label'>Tempo entre Mudanças de Seta (ms):</p>
      <div className="config-option-form">
        <input
          type="number"
          value={timeBetweenChanges}
          onChange={(e) => setTimeBetweenChanges(parseInt(e.target.value))}
          disabled={isRandomInterval}
          className="input-time"
        />
        <label>
          <input
            type="checkbox"
            checked={isRandomInterval}
            onChange={() => setIsRandomInterval(!isRandomInterval)}
          />
          Intervalo Aleatório
        </label>
        </div>
      </div>

      <div className="config-option">
      <p className='label'>Tempo Total do Exercício (segundos):</p>
        <input
          type="number"
          value={exerciseDurationSeconds}
          onChange={(e) => setExerciseDurationSeconds(parseInt(e.target.value))}
          className="input-time"
        />
      </div>

      <button className="start-btn" onClick={startCountdown}>
        Iniciar Exercício
      </button>
    </div>
  );
}

function Exercise({ arrow, stopExercise, exerciseDurationSeconds }) {
  return (
    <div className="exercise">
      <h1>Exercício em Andamento</h1>
      <div className="arrow-display">
        <ArrowSVG direction={arrow} />
      </div>
      <ProgressBar duration={exerciseDurationSeconds} />
      <button className="stop-btn" onClick={stopExercise}>
        Parar Exercício
      </button>
    </div>
  );
}

function ProgressBar({ duration }) {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{
          animation: `progress-animation ${duration}s linear forwards`,
        }}
      ></div>
    </div>
  );
}

export default App;
