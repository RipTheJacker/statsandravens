import { useFirestoreAuth } from './use-firestore'


export const useAuth = () => {
  const auth = useFirestoreAuth()
  const context = useGlobalContext()

  const store = {
    signIn() {
      auth.signInWithRedirect()
    },
    signOut() {
      auth.signOut()
    }
  })

  return store
}
