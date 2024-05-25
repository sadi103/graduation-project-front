import axios from 'axios'
import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

export const loader = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  const response = await axios.get('/api/appointments', config)

  return response.data
}

const Reservation = () => {
  const { user } = useAuthContext()

  const appointments = useLoaderData()
  console.log('these are the appointments', appointments)
  const [appointmentDate, setAppointmentDate] = useState('')
  const [reservationError, setReservationError] = useState(null)


  const handleReservation = async (e) => {
    e.preventDefault()

    try {

      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }
      const newDate = { date: appointmentDate }
      console.log('this is the appointment data sent to the backend', newDate)
      const status = await axios.post('/api/appointments', newDate, config)
      console.log('this is the data', status.data)

    } catch (exception) {

      console.log('Error fired from reservation form', exception)
      setReservationError(exception.response.data.error)

    }
  }

  return (
    <>
      {Array.isArray(appointments) && !appointments.length && // Basically if appointments is an array and empty, return a form to make an appointment
        <div>
          <form id="appointment-form" onSubmit={handleReservation}>
            <input type="datetime-local" onChange={({ target }) => setAppointmentDate(target.value)} />
            <button type="submit">make a reservation</button>
            <br />
            {reservationError}
          </form>
        </div>
      }

      {/* {(appointments && (typeof appointments === 'object') && <p>{appointments.date}</p>) || (appointments && appointments.map(
        appointment => <p key={appointment.id}>{appointment.date}</p>
      ))} */}

      {(appointments && appointments.map(
        appointment => <p key={appointment.id}>{appointment.date}</p>
      ))}
    </>
  )
}

export default Reservation