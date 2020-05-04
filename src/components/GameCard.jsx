import React from 'react'
import { Anchor } from '/components/Anchor'
import { Timestamp } from '/components/Timestamp'
import { HouseLabel } from '/components/HouseLabel'
import { firstBy } from 'thenby'

export const GameCard = (props) => {
  const { game, groupId } = props
  const players = game.results.map(result => result.player.name)
  console.log("results", game.results)
  const winner = game.results.slice().sort(
    firstBy('castles', 'desc')
      .thenBy('strongholds', 'desc')
      .thenBy('supply', 'desc')
      .thenBy('powerTokens', 'desc')
      .thenBy('ironThrone', 'desc')
  )[0]

  return (
    <div className='card'>
      <div className='card-header'>
        <p className='card-header-title'>
          <Anchor href={`/groups/${groupId}/games/${game.id}`}>{game.name}</Anchor>
        </p>
        <p className='card-date'>
          <Timestamp value={game.date.toDate()} />
        </p>
      </div>

      <div className='card-content'>
        <ul className='game-details-list'>
          <li>Players: {players.join(', ')}</li>
          {winner && <li>Winner: {winner.player.name} <HouseLabel name={winner.house} size='small' /></li>}
        </ul>
      </div>
    </div>
  )
}
