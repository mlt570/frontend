import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"


//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    // destructure workouts and dispatch from the workouts context
    const {workouts, dispatch} = useWorkoutsContext()

    const {user} = useAuthContext()

    // useEffect hook to fetch workouts when the component mounts or dispatch changes
    useEffect(() => {

        // define an async function to fetch workouts when the component mounts or dispatch changes
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        // when useEffect function runs, if we have a val in user, then program will fetch workouts
        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user]) // dependency arr ensures fetchWorkouts is called when dispatch changes

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home