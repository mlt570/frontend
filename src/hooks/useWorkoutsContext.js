import { WorkoutsContext } from '../context/WorkoutContext'
import { useContext } from 'react'

// custom hook to access the workouts context 
export const useWorkoutsContext = () => {
    // use the useContext hook to get the context val
    const context = useContext(WorkoutsContext)

    // if context not found, throw an error to indicate misuse
    if (!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
    }

    return context
}