import {AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

// custom hook to access the workouts context 
export const useAuthContext = () => {
    // use the useContext hook to get the context val
    const context = useContext(AuthContext)

    // if context not found, throw an error to indicate misuse
    if (!context) {
        throw Error('useWAuthContext must be used inside a AuthContextProvider')
    }

    return context
}