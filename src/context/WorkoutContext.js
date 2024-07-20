import { createContext, useReducer } from 'react'

// create a new context for workouts
export const WorkoutsContext = createContext()

// define the workouts reducer function to handle state changes based on action types
export const workoutsReducer = (state, action) => {
  switch (action.type) {

    // set workout states with the provided payload
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      }
    // add new workout to the workouts array
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts] 
      }
    // remove a workout from the workouts array by filtering out the workout with the provided ID
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id)
      }
    // return the current state for any unknown action types
    default:
      return state
  }
}

// define the WorkoutsContextProvider component to provide the workouts state and dispatch function to its children
export const WorkoutsContextProvider = ({ children }) => {
  // initialize the useReducer hook with the workoutsReducer function and initial state
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })
  
  // return provider component, passing the state and the dispatch function as the val
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}