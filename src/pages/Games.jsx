import React, { useEffect, useReducer } from 'react'
import produce from 'immer'
import { useFirestore } from '/hooks/use-firestore'
import { GameCard } from '/components/GameCard'

export const Games = () => {

  const [stats, setGames] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'added':
          return produce(state, draft => { draft.games.push(action.payload) })
        case 'modified':
          return { games: state.games.map(game => {
            if (game.id === action.payload.id) return action.payload
            return game
          }) }
        case 'removed':
          return { games: state.games.filter(game => game.id === action.payload.id) }
        default:
          return state
      }
    }
    , { games: [] })

  const db = useFirestore()

  useEffect(() => (
    db.collection('games').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // console.log("changes", change)
        setGames({
          type: change.type,
          payload: { id: change.doc.id, ...change.doc.data() }
        })
      });

    })
  ), [])

  console.log("games", stats)

  return (
    <article className='article'>
      <div className='container'>
        {stats.games.map( game => (<GameCard key={game.id} game={game} />))}
      </div>
    </article>
  )
}
