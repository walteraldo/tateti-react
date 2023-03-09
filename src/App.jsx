import confetti from 'canvas-confetti';
import { useState } from "react";
import { Square } from "./components/Square";
import { TURNS } from "./components/constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameToStorage, resetGameStorage } from './logic/storage';

function App () {

  // useState para actualizar el estado del tablero cuando se hace click
  const [ board, setBoard ] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
    // o lo que es lo msimo
      // if(boardFromStorage) return JSON.parse(boardFromStorage)
      // return Array(9).fill(null);
  });
  
  // useState para saber de quien es el turno
  // el callback dentro del useState es una funcion que tiene que devolver el valor con el que queremso incializar el estado
  const [ turn, setTurn ] = useState( () => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X; // retorna uno o otro
  });

  // useState para saber si hay un ganador // null no hay ganador - false es empate
  const [ winner, setWinner ] = useState(null);

  // reseteamos con el estado que querramos (sirve para un filtro, etc)
  const resetGame = () => {
    setBoard(Array(9).fill(null));              // tablero de 9 posiciones rellenado con null
    setTurn(TURNS.X);                           // se empieza por el turno en X
    setWinner(null);                            // no hay ganadores
    resetGameStorage();
  };

  const updateBoard = index => {
    // 3 - no actualizamos esta posición si ya tiene algo
    // por defecto todas las posiciones son null
    if(board[index] || winner) return; // si hay algo en esa posicion o hay un ganador, que no haga nada

    // 2 - cuando hace click le pasamos el indice para saber en cual hizo click 
    const newBoard = [...board]; // no mutamos el array => NO HACER board[index] = turn
    newBoard[index] = turn;
    // actualizamos el tablero
    setBoard(newBoard);
    
    // 1 - cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; // si el turno esta en X cambiamos a O sino a X
    // para poder actualizar el estado, actualizamos el turno
    setTurn(newTurn); 
    // guardar partida
    saveGameToStorage({ 
      board: newBoard, 
      turn: newTurn
     })
    
    // 4 - revisar si hay ganador 
    const newWinner = checkWinnerFrom(newBoard); // newBoard es el ultimo tablero actualizado
    if(newWinner) {
      confetti();
      setWinner(newWinner); // actualiza el estado de forma asíncrona
      // alert(`El ganador es ${newWinner}`) // podemos o no podemos tener el valor porque el setWinner es asíncrono
      // podriamos hacer un callback
      // si hay un newWinner => setWinner( prevWinner => { return newWinner })
    } else if(checkEndGame(newBoard)) { 
      // si chequeamos el tablero y no hay ningún ganador
      setWinner(false);
      // el esatdo será false = empate
    }
  };

  return (
    <main className="board">
      <h1>Ta Te Ti</h1>
      <button onClick={resetGame}>Reset del juego</button>

      {/* SECCION PARA EL JUEGO */}
      <section className="game">
        {
          board.map( (square, index) => { // map devuelve un array
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square >
            )
          })
        }
      </section>

      {/* SECCION PARA SABER DE QUIEN ES EL PROXIMO TURNO */}
      <section className="turn">
        <Square isSelected={turn === TURNS.X}> 
        {/* cuando el turno sea TURNS.X el seleccionado sea X  */}
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {/* cuando este seleccionado TURNS.O que muestre el O  */}
          {TURNS.O}
        </Square>
      </section>
      
      <WinnerModal resetGame={ resetGame } winner={ winner } />

    </main>
  )
}

export default App
