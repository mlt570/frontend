import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    // state to manage error messages
    const [error, setError] = useState(null)
    // state to manage loading status
    const [isLoading, setIsLoading] = useState(null)
    // extract the dispatch function from the authentication context
    const { dispatch } = useAuthContext()

    // defining login function
    const login = async (email, password) => {
        // set loading status to true and clear and previous errors
        setIsLoading(true)
        setError(null)

        // send a POST request to the login endpoint with the user's email and password
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        // parse the json response
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            

            // update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

        }
    }

    return { login, isLoading, error }
}