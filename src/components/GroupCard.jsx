import React, { useState, useEffect } from 'react'
import { Anchor } from '/components/Anchor'
import { useFirestore } from '/hooks/use-firestore'

export const GroupCard = (props) => {
  const { group } = props
  const db = useFirestore()
  const [players, setPlayers] = useState([])

  useEffect(() => {
    db.collection(`/game-groups/${group.id}/players`).get().then(snapshot => {
      setPlayers(
        snapshot.docs
      )
    })
  }, [])

  return (
    <div className='card'>
      <div className='card-header'>
        <p className='card-header-title'>
          <Anchor href={`/groups/${group.id}`}>{group.name}</Anchor>
        </p>
        <p className='card-date'>
          {/*<Timestamp value={game.date.toDate()} />*/}
        </p>
      </div>

      <div className='card-content'>
        <div className='columns is-variable is-1 is-multiline'>
          {players.map(player => (
              <div className='column is-one-quarter' key={player.id}>
                <div className='box'>
                  <p className='has-text-weight-bold'>{player.get('name')}</p>
                  <p>Played: {player.get('gamesPlayed')}</p>
                  <p>Wins: {player.get('wins')}</p>
                </div>
              </div>
          ))}
        </div>
        <ul className='game-details-list'>
          {/*<li>Winner: {winner.name} {winner.house}</li>*/}
        </ul>
      </div>
    </div>
  )
}
