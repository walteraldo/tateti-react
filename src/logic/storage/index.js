export const saveGameToStorage = ({ board, turn } ) => {
  // guardar partida en localstorage
  window.localStorage.setItem('board', JSON.stringify(board));
  window.localStorage.setItem('turn', turn);
}

export const resetGameStorage = () => {
  // reseteamos el board del localstorage
  window.localStorage.removeItem('board');
  // reseteamos el turno del localstorage
  window.localStorage.removeItem('turn');    
}