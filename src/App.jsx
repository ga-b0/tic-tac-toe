import { useState } from "react"
import { Cell } from "./components/Cell"
import { TURNS, WINNER_COMBOS } from "./constants.js"
import { Winner } from "./components/Winner.jsx"
import confetti from 'canvas-confetti'



export function App(){

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]){
        return boardToCheck[a]
      }
    }
    return null
  }

  const updateBoard = (index) => {

    if(board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)

    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    }

  }

  return(
    <>
      <h1 className="title">Tic Tac Toe</h1>
      <button className="button" onClick={resetGame}>Reiniciar el juego</button>
      <main className="board">
        <section className="game">
          {
            board.map((_, index) => {
              return (
                <Cell updateBoard={updateBoard} key={index} index={index}>
                {board[index]}
                </Cell>
              )
            })
          }
        </section>
        <section className="turn">
          <Cell isSelected={turn === TURNS.X}>{TURNS.X}</Cell>
          <Cell isSelected={turn === TURNS.O}>{TURNS.O}</Cell>
        </section>
        <Winner resetGame={resetGame} winner={winner}></Winner>
      </main>
    </>
  )
}