import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// define WorkoutForm component
const WorkoutForm = () => {
    // destructure dispatch from the workouts context
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    // state variables to manage the form input vals and error handling
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault() // prevent default form submission behavior

        if (!user) {
            setError('You must be logged in')
            return
        }

        // create workout object with form input vals
        const workout = {title, load, reps}

        // make a POST request to add a new workout to the server
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        // parse json response
        const json = await response.json()

        // set the error and empty fields state
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        // clear the form and update the context
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('New workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }

    }

    // render the form
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Log a Workout</h3>
            <label>Exercise Type:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)} // update title state on input change
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''} // add error class if title field is empty
            />

            <label>Weight: </label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''} 
            />

            <label>Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}

        </form>

    )
}

export default WorkoutForm