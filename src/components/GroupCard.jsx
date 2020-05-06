import React, { useState, useEffect } from 'react'
import { Anchor } from '/components/Anchor'
import { useFirestore } from '/hooks/use-firestore'

export const GroupCard = (props) => {
  const { group } = props
  const db = useFirestore()
  const [players, setPlayers] = useState([])
  const [game, setGame] = useState(null)

  useEffect(() => {
    const doc = db.doc(`/game-groups/${group.id}`)
    doc.collection(`players`).get().then(snapshot => {
      setPlayers(
        snapshot.docs
      )
    })

    doc.collection(`games`).orderBy('date').limitToLast(1).get().then(snapshot => {
      console.log("snapshot", snapshot.docs)
      setGame(
        snapshot.docs[0]
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
                  {/*<p>Played: {player.get('gamesPlayed')}</p>*/}
                  {/*<p>Wins: {player.get('wins')}</p>*/}
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}
