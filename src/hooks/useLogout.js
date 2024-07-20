import { useAuthContext } from './useAuthContext'
import { useWorkoutsContext } from './useWorkoutsContext'

// defining a custom hook for logging out a user
export const useLogout = () => {
    // extract the dispatch function from the authentication metho
    const { dispatch } = useAuthContext()
    // extract the dispatch function from the workouts context, renaming it to avoid conflicts
    const { dispatch: workoutsDispatch } = useWorkoutsContext()
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_WORKOUTS', payload: null})
    }

    return {logout}
}