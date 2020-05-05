import React, { useEffect, useReducer } from 'react'
import produce from 'immer'
import { useFirestore } from '/hooks/use-firestore'
import { GroupCard } from '/components/GroupCard'
import { GameGroupForm } from '/components/GameGroupForm'
import { useModal } from '/hooks/use-modal'
import { useAppContext } from '/contexts/application'

export const GameGroups = () => {

  const [stats, setGroups] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'added':
          return produce(state, draft => { draft.groups.push(action.payload) })
        case 'modified':
          return { groups: state.groups.map(group => {
            if (group.id === action.payload.id) return action.payload
            return group
          }) }
        case 'removed':
          return { groups: state.groups.filter(group => group.id === action.payload.id) }
        default:
          return state
      }
    }, { groups: [] })

  const [ isActive, toggleModal ] = useModal()

  const db = useFirestore()
  const { globalState } = useAppContext()

  useEffect(() => (
    db.collection('game-groups')
      .where('members', 'array-contains-any', [ globalState.currentUser.uid ])
      .onSnapshot((snapshot) => {
        console.log("group", snapshot.size, globalState.currentUser.uid)
        snapshot.docChanges().forEach((change) => {
          setGroups({
            type: change.type,
            payload: { id: change.doc.id, ...change.doc.data() }
          })
        })
      })
  ), [])

  const onCreateGroup = (data) => {
    db.collection('game-groups').add({
      ...data,
      createdAt: new Date()
    }).then(() => {
      toggleModal()
    })
  }

  return (
    <section className='section'>
      <div className='container'>
        <div className='level'>
          <div className='level-left'>
            <div>
              <h1 className='title'>Game Groups</h1>
            </div>
          </div>
          <div className='level-right'>
            <div>
              <button className='button is-small' onClick={() => toggleModal('game-group-form')}>Create Group</button>
            </div>
          </div>
        </div>

        <div className='card-list'>
          {stats.groups.map( group => (<GroupCard key={group.id} group={group} />))}
        </div>

        <GameGroupForm
          title="Create Group"
          isActive={isActive === 'game-group-form'}
          onSave={onCreateGroup}
          onCancel={toggleModal}
          />
      </div>
    </section>
  )
}
