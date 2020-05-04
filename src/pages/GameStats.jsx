import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import ContentLoader from 'react-content-loader'
import { useForm, Controller } from "react-hook-form"
import { useFirestore, addArrayItem, removeArrayItem } from '/hooks/use-firestore'
import { Timestamp } from '/components/Timestamp'
import { Anchor } from '/components/Anchor'
import { PlayerStatForm } from '/components/PlayerStatForm'
import ContentEditable from 'react-contenteditable'
import { useModal } from '/hooks/use-modal'
import { ConfirmationDialog } from '/components/ConfirmationDialog'
import { firstBy } from "thenby"

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
  const { id: gameId, groupId } = useParams()
  const db = useFirestore()
  const gameName = useRef('')
  const [game, setGame] = useState(null)
  const [groupPlayers, setPlayers] = useState(null)
  const [resultToRemove, setResultToRemove] = useState(null)

  const [isActive, toggleModal] = useModal()

  const onAddResult = (data) => {
    db.doc(`/game-groups/${groupId}/games/${gameId}`)
      .update({
        results: addArrayItem( { ...data } )
      }).then(() => {
        toggleModal()
      })
  }

  const onRemoveResult = () => {

    db.doc(`/game-groups/${groupId}/games/${gameId}`)
      .update({
        results: removeArrayItem( resultToRemove )
      }).then(() => {
        setResultToRemove(null)
      }).catch((error) => {
        console.log("remove error", error)
      })
  }

  const trackName = (event) => {
    gameName.current = event.target.value
  }

  const updateField = () => {
    db.doc(`/game-groups/${groupId}/games/${gameId}`)
      .update({
        name: gameName.current
      })
  }

  useEffect(() => {
    const players$ = db.collection(`game-groups/${groupId}/players`)
      .onSnapshot((snapshot) => {
        setPlayers(snapshot.docs.map(doc => ({...doc.data(), id: doc.id })))
      })

    const game$ = db.doc(`game-groups/${groupId}/games/${gameId}`)
      .onSnapshot((doc) => {
        setGame(doc.data())
      })

    return () => {
      players$()
      game$()
    }
  }, [gameId])

  if (!game) return <Loading />

console.log("results", game.results)
  const sortedResults = game.results.sort(
    firstBy('castles', 'desc')
      .thenBy('strongholds', 'desc')
      .thenBy('supply', 'desc')
      .thenBy('powerTokens', 'desc')
      .thenBy('ironThrone', 'desc')
  )

  return (
    <article>
      <div className='container'>
        <div className='level'>
          <div className='level-left'>
            <div className='level-item'>
              <div>
                <nav className='breadcrumb has-dot-separator'>
                  <ul>
                    <li><Anchor href={`/groups/${groupId}`} className='is-size-5'>Group</Anchor></li>
                    <li>
                      <a href='#' className='is-active'>
                        <ContentEditable
                          html={game.name}
                          tagName='h1'
                          className='title is-5'
                          onBlur={() => updateField() }
                          onChange={trackName} />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div className='level-right'>
            <div className='level-item'>
              <div>
                <p className='heading'>Played On</p>
                <p className='title is-7'>
                  <Timestamp value={game.date.toDate()}/>
                </p>
              </div>
            </div>
            <div className='level-item'>
              <div>
                <p className='heading'>Rounds</p>
                <p className='title is-7'>{game.rounds}</p>
              </div>
            </div>
            <div className='level-item'>
              <div>
                <button className='button is-small' onClick={() => toggleModal('add-result')}>Add Result</button>
              </div>
            </div>
          </div>
        </div>

        <div className='media'>
          <div className='media-left'>
            <h4 className='subtitle'>Players</h4>
          </div>

          <div className='media-content'>
            {sortedResults.map(result => (
              <div className='level' key={result.playerId}>
                <div className='level-left'>
                  <div className='level-item'>
                    <div>
                      <p className='title'>{result.player.name}</p>
                      <button className='button is-small is-rounded is-danger' onClick={() => setResultToRemove(result) }>Remove</button>
                    </div>
                  </div>
                </div>

                <div className='level-right'>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>House</p>
                      <p className='title'>
                        <span className='tag is-medium'>
                          {result.house}
                        </span>
                      </p>
                    </div>
                  </div>
                  <StatItem heading='Castles' data={result.castles} />
                  <StatItem heading='Strongholds' data={result.strongholds} />
                  <StatItem heading='Power Tokens' data={result.powerTokens} />
                  <StatItem heading='Supply' data={result.supply} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <ConfirmationDialog
          title="Confirm Deletion"
          message={`This stat will be deleted.`}
          onConfirm={onRemoveResult}
          onCancel={() => setResultToRemove(null) }
          isActive={resultToRemove !== null}
          />

        <div className='add-player'>
          <PlayerStatForm
            players={groupPlayers}
            onSave={onAddResult}
            isActive={isActive === 'add-result'}
            onCancel={toggleModal}
            />
        </div>
      </div>
    </article>
  )
}
