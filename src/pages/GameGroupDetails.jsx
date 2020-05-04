import React, { useEffect, useState, useReducer } from 'react'
import produce from 'immer'
import { useParams } from 'react-router-dom'

import { useFirestore } from '/hooks/use-firestore'
import { useModal } from '/hooks/use-modal'

import { GameForm } from '/components/GameForm'
import { PlayerForm } from '/components/PlayerForm'
import { GameCard } from '/components/GameCard'
import { Loading } from '/components/Loading'
import { LevelItem } from '/components/LevelItem'
import { Houses } from '/config/constants'
import { HouseLabel } from '/components/HouseLabel'

const reducer = (state, action) => {
  switch (action.type) {
    case 'added':
      return produce(state, draft => { draft[action.collection].push({id: action.doc.id, ...action.doc.data() }) })
    case 'modified':
      return produce(state, draft => {
        const list = draft[action.collection].map(record => {
          if (record.id === action.doc.id) return {id: action.doc.id, ...action.doc.data() }
          return record
        })

        return { [draft[action.collection]]: list }
      })

    case 'removed':
      return produce(state, draft => {
        const list = draft[action.collection].filter(record => record.id === action.doc.id)

        return {
          [draft[action.collection]]: list
        }
      })
    default:
      return state
  }
}

export const GameGroupDetails = () => {
  const { id: groupId } = useParams()
  const db = useFirestore()
  const [group, setGroup] = useState(null)
  const [ activeModal, toggleModal ] = useModal()

  const doc = db.collection('game-groups').doc(groupId)

  const onAddGame = (data) => {
    console.log("data", data)
    doc.collection('games').add({
      ...data,
      results: [],
      createdAt: new Date()
    }).then(() => {
      toggleModal()
    })
  }

  const onAddPlayer = (data) => {
    console.log("player updated", data)
    doc.collection('players').add({
      ...data,
      createdAt: new Date()
    }).then(() => {
      toggleModal()
    })
  }

  const [state, setState] = useReducer(reducer, { games: [], players: [] })

  useEffect(() => {
    const groups = doc.onSnapshot((doc) => {
      setGroup({id: doc.id, ...doc.data()})
    })

    const games = doc.collection('games').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        setState({
          ...change,
          collection: 'games'
        })
      })
    })

    const players = doc.collection('players').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        setState({
          ...change,
          collection: 'players'
        })
      })
    })

    return () => {
      groups()
      games()
      players()
    }
  }, [groupId])

  if (!group) return <Loading />

  console.log("state", state)

  return (
    <article>
      <div className='container'>
        <div className='level'>
          <div className='level-left'>
            <div className='level-item'>
              <div>
                <h1 className='title'>{group.name}</h1>
              </div>
            </div>
          </div>
          <div className='level-right'>
            <div className='level-item'>
              <div>
                <button className='button is-small' onClick={() => toggleModal('add-player')}>Add Player</button>
              </div>
            </div>
          </div>
        </div>

        <div className='media'>
          <div className='media-content'>
            {state.players.map(player => (
              <nav className='level' key={player.id}>
                <div className='level-left'>
                  <LevelItem data={player.name} />
                </div>

                <div className='level-right'>
                  <LevelItem
                    heading='Favorite House'
                    title={
                      <span className='tag is-medium'>
                        {player.favoriteHouse}
                      </span>
                    }
                    />
                  <LevelItem heading='Games Played' data={player.gamesPlayed} />
                  <LevelItem heading='Wins' data={player.wins} />
                </div>
              </nav>
            ))}
          </div>
        </div>

        <div>
          <div className='level'>
            <div className='level-left'>
              <div>
                <h3 className='title is-5'>Games</h3>
              </div>
            </div>
            <div className='level-right'>
              <div>
                <button className='button is-small' onClick={() => toggleModal('add-game')}>Add Game</button>
              </div>
            </div>
          </div>
          {state.games.map( game => (<GameCard key={game.id} game={game} groupId={groupId} />))}
        </div>

        <GameForm
          onSave={onAddGame}
          onCancel={toggleModal}
          title="Add Game"
          isActive={activeModal === 'add-game'}
          />

        <PlayerForm
          onSave={onAddPlayer}
          onCancel={toggleModal}
          isActive={activeModal === 'add-player'}
          />
      </div>
    </article>
  )
}
