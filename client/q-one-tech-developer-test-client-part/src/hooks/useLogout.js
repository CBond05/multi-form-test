import { useAuthContext } from './useAuthContext'
import { useItemContext } from './useItemContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchItem } = useItemContext()

  const logout = () => {
    localStorage.removeItem('user')
    dispatch({ type: 'LOGOUT' })
    dispatchItem({ type: 'SET_ITEM', payload: null })
    window.location.reload();
  }
  return { logout }
}
