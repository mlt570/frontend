// import custom hook to use workouts context
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import { useAuthContext } from '../hooks/useAuthContext'

// date fns used to format the date
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// definiing WorkoutDetails component which takes a workout as a prop
const WorkoutDetails = ({ workout }) => {

    // destructure dispatch from workouts context
    const { dispatch } = useWorkoutsContext()

    const { user } = useAuthContext()

    // define handleClick function to handle delete action
    const handleClick = async () => {
        if (!user) {
            return
        }
        // make a delete request to delete workout
        const response = await fetch ('/api/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        // parse json response
        const json = await response.json()

        // if response ok, dispatch DELETE_WORKOUT with the workout data
        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json})
        }
    }
    // render the workout details
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (lbs): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <span onClick={handleClick}>Delete</span>
        </div>
    )
}


export default WorkoutDetails