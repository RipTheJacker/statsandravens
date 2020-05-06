import React, { useEffect, useState, useReducer, useRef } from 'react'
import produce from 'immer'
import { useParams } from 'react-router-dom'
import ContentLoader from 'react-content-loader'


import { useFirestore, useFunctions } from '/hooks/use-firestore'
import { useModal } from '/hooks/use-modal'
import { useStats } from '/hooks/use-stats'

import { GameForm } from '/components/GameForm'
import { PlayerForm } from '/components/PlayerForm'
import { GameCard } from '/components/GameCard'
import { Loading } from '/components/Loading'
import { Icon } from '/components/Icon'
import { LevelItem } from '/components/LevelItem'
import { HouseLabel } from '/components/HouseLabel'
import { Popover } from '/components/Popover'
import { Quickview } from '/components/Quickview'

const MemberLoading = () => (
  <ContentLoader>
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="14" />
    <rect x="0" y="18" rx="4" ry="4" width="100%" height="14" />
    <rect x="0" y="36" rx="3" ry="3" width="100%" height="14" />
  </ContentLoader>
)

const reducer = (state, action) => {
  switch (action.type) {
    case 'members':
      return produce(state, draft => { draft.members.push(...action.payload) })
    case 'added':
      return produce(state, draft => { draft[action.collection].push({id: action.doc.id, ...action.doc.data() }) })
    case 'modified':
      return produce(state, draft => {
        const list = draft[action.collection].map(record => {
          if (record.id === action.doc.id) return {id: action.doc.id, ...action.doc.data() }
          return record
        })

        draft[action.collection] = list
      })

    case 'removed':
      return produce(state, draft => {
        const list = draft[action.collection].filter(record => record.id === action.doc.id)
        draft[action.collection] = list
      })
    default:
      return state
  }
}

export const GameGroupDetails = () => {
  const { id: groupId } = useParams()
  const db = useFirestore()
  const [group, setGroup] = useState(null)
  const [popoverShown, togglePopover] = useState(false)
  const [quickviewShown, toggleQuickview] = useState(false)
  const getMembers = useFunctions('groupMembers')
  const popoverButton = useRef(null)
  const [ activeModal, toggleModal ] = useModal()
  const [state, setState] = useReducer(reducer, { games: [], players: [], members: [] })
  const doc = db.collection('game-groups').doc(groupId)

  const getStats = useStats(state.games, state.players)

  const onAddGame = (data) => {
    doc.collection('games').add({
      ...data,
      results: [],
      createdAt: new Date()
    }).then(() => {
      toggleModal()
    })
  }

  const onAddPlayer = (data) => {
    doc.collection('players').add({
      ...data,
      createdAt: new Date()
    }).then(() => {
      toggleModal()
    })
  }

  useEffect(() => {
    const group$ = doc.onSnapshot((doc) => {
      setGroup({id: doc.id, ...doc.data()})
    })

    const games$ = doc.collection('games').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        setState({
          ...change,
          collection: 'games'
        })
      })
    })

    const players$ = doc.collection('players').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        setState({
          ...change,
          collection: 'players'
        })
      })
    })

    return () => {
      group$()
      games$()
      players$()
    }
  }, [groupId])

  useEffect(() => {
    if (quickviewShown && !state.members.length) {
      getMembers({groupId: groupId })
        .then(result => {
          console.log("members", result)
          setState({
            payload: result.data,
            type: 'members'
          })
        })
        .catch(error => console.log(error))
    }
  }, [groupId, quickviewShown])

  if (!group) return <Loading />

  const stats = getStats()

  console.log("stats", state.players.map(p => ({name: p.name, ...stats[p.id]}) ))
  
  return (
    <>
    <section className='section'>
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

            <div className='level-item'>
              <div>
                <button className='button is-small is-text' ref={popoverButton} onClick={() => togglePopover(!popoverShown)}>
                  <Icon name='share-variant' />
                  <span>Share Code</span>
                </button>
                <Popover handler={popoverButton} isShown={popoverShown}>
                  <div className='field has-addons'>
                    <p className='control'>
                      <span className='button is-static is-small'>
                        Code
                      </span>
                    </p>
                    <p className='control'>
                      <input type='text' className='input is-small' readOnly value={group.joinCode} />
                    </p>
                  </div>
                </Popover>
              </div>
            </div>

            <div className='level-item'>
              <div>
                <button className='button is-small' onClick={() => toggleQuickview(!quickviewShown)}>
                  <Icon name='eye-settings' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className='section'>
      <div className='container'>
        <div className='media'>
          <div className='media-left'>
            <p className='title is-5'>Players</p>
          </div>

          <div className='media-content'>
            {state.players.map(player => (
              <nav className='level' key={player.id}>
                <div className='level-left'>
                  <LevelItem data={player.name} />
                </div>

                <div className='level-right'>
                  <LevelItem
                    heading='Favorite House'
                    data={
                        <HouseLabel name={stats[player.id].favoriteHouse} />
                    }
                    />
                  <LevelItem heading='Games Played' data={stats[player.id].gamesPlayed} />
                  <LevelItem heading='Wins' data={stats[player.id].wins} />
                </div>
              </nav>
            ))}
          </div>
        </div>
      </div>
    </section>

        <section className='section'>
          <div className='container'>
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
            <div className='card-list'>
              {state.games.map( game => (<GameCard key={game.id} game={game} groupId={groupId} />))}
            </div>
        </div>
      </section>

      <Quickview isActive={quickviewShown} title="Permissions" onClose={() => toggleQuickview(false)}>
        <div className="box is-shadowless">
          {!state.members.length && <MemberLoading />}

          <ul>
            {state.members.map(m => <li key={m.uid}>{m.displayName}</li>)}
          </ul>
        </div>
      </Quickview>

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
    </>
  )
}
