import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ContentLoader from 'react-content-loader'
import { useForm, Controller } from "react-hook-form"
import { useFirestore } from '/hooks/use-firestore'
import { Timestamp } from '/components/Timestamp'
import { PlayerForm } from '/components/PlayerForm'
import ContentEditable from 'react-contenteditable'

const Loading = () => (
  <ContentLoader>
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
  </ContentLoader>
)

const StatItem = ({ heading, data }) => (
  <div className='level-item has-text-centered'>
    <div>
      <p className='heading'>{heading}</p>
      <p className='title'>{data}</p>
    </div>
  </div>
)

export const GameStats = () => {
  const { id: gameId } = useParams()
  const db = useFirestore()
  const [game, setGame] = useState(null)

  const onAddPlayer = (data) => {
    console.log("data", data)
  }

  const updateField = (data) => {
    console.log("field updated", data)
  }

  useEffect(() => {

    return db.collection('games').doc(gameId)
      .onSnapshot((doc) => {
        setGame(doc.data())
      })
  }, [gameId])

  if (!game) return <Loading />

  const players = game.players.map(player => player.name)
  const winner = game.players[0]

  return (
    <article>
      <div className='container'>
        <h1 className='title'>{game.name}</h1>
        <Timestamp value={game.date.toDate()} />
        <ul className='game-details-list'>
          <li>Players: {players.join(', ')}</li>
          <li>Winner: {winner.name} {winner.house}</li>
        </ul>

        {game.players.map(player => (
          <div className='media' key={player.name}>
            <div className='media-content'>
              <nav className='level'>
                <div className='level-left'>
                  <div className='level-item'>
                    <div>
                      <p className='title'>{player.name}</p>
                    </div>
                  </div>
                </div>

                <div className='level-right'>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>House</p>
                      <p className='title'>
                        <span className='tag is-medium'>
                          {player.house}
                        </span>
                      </p>
                    </div>
                  </div>
                  <StatItem heading='Castles' data={player.castles} />
                  <StatItem heading='Strongholds' data={player.strongholds} />
                  <StatItem heading='Power Tokens' data={player.powerTokens} />
                  <StatItem heading='Supply' data={player.supply} />
                </div>
              </nav>
            </div>
          </div>
        ))}

        <div>
          <button className='button'>Add Player</button>
        </div>

        <div className='add-player'>
          <PlayerForm onAddPlayer={onAddPlayer} />
        </div>
      </div>
    </article>
  )
}
