import { WINNER_COMBOS } from "../components/constants";


export function checkWinnerFrom (boardToCheck) {
  // revisamos las combinaciones ganadoras
  // para ver si X o O ganó
  for(const combo of WINNER_COMBOS) {
    const [a,b,c] = combo; // recuperar las posiciones 0 1 2
    if(
      boardToCheck[a] &&                        // si en la posicion 0 existe algo
      boardToCheck[a] === boardToCheck[b] &&    // si en la pos 0 y 1 tienen lo mismo
      boardToCheck[a] === boardToCheck[c]       // si en la pos 0 y 3 tienen lo mismo 
    ) {
      return boardToCheck[a];                   // devolvemos el ganador
    }
  }
  return null;                                  // no devuelve nada si no hay ganador
}

export const checkEndGame = ( newBoard ) => {
  // el tablero es una Array de null, a medida que ocupamos las posiciones y todas son diferentes a null
  // si todas las pos son null => devuelve true
  return newBoard.every((square) => square !== null)
}