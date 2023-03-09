export function Square ({ children, isSelected, updateBoard, index }) {
  // el children es lo que hay dentro de cada cuadrado del tablero (X o O)
  // updateBoard es la forma que actualiza el tablero
  // index, para saber que indice ocupa cada cuadradito

  // cambiamos la clase para mostrar visualmente a quien le toca el turno
  const className = `square ${ isSelected ? 'is-selected' : '' }`

  const handleClick = () => {
    // desde el componente padre le pasamos la función updateBoard que la ejecutamos cuando hacemos click en el tablero
    // se le pasa el indice para saber en cual casillero ha hecho click
    updateBoard(index);
  }

  return (
    <div onClick={ handleClick } className={ className }>
      { children }
    </div>
  )
}
