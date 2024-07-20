import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

// define the reducer function to manage authentication state
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': // if action type is 'LOGIN'
            return { user: action.payload } // update state with the user data
        case 'LOGOUT':
            return { user: null }
        default: // if action type is unknown
            return state //return cur state
    }
}

// define the context provider component for authentication
export const AuthContextProvider = ({ children }) => {
    // register the state
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({type: 'LOGIN', payload: user}) // dispatch 'LOGIN' data with user data
        }
    }, []) // empty dependency array means this effect runs only oncee when the component mounts

    console.log('AuthContext state: ', state)

    // return the context provider with the current state and dispatch function
    return (
        <AuthContext.Provider value ={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}