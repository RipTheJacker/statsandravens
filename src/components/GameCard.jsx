import React from 'react'
import { Anchor } from '/components/Anchor'
import { Timestamp } from '/components/Timestamp'

export const GameCard = (props) => {
  const { game } = props
  const players = game.players.map(player => player.name)
  const winner = game.players[0]

  return (
    <div className='card'>
      <div className='card-header'>
        <p className='card-header-title'>
          <Anchor href={`/games/${game.id}`}>{game.name}</Anchor>
        </p>
        <p className='card-date'>
          <Timestamp value={game.date.toDate()} />
        </p>
      </div>

      <div className='card-content'>
        <ul className='game-details-list'>
          <li>Players: {players.join(', ')}</li>
          <li>Winner: {winner.name} {winner.house}</li>
        </ul>
      </div>
    </div>
  )
}
