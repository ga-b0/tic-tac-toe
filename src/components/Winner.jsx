import { Cell } from "./Cell";

export function Winner({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Ganó: ";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        <header>{winner && <Cell>{winner}</Cell>}</header>
        <footer>
          <button className="button" onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
