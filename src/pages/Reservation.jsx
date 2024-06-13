import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

import '../table.css'

const Reservation = () => {
  const { user } = useAuthContext()

  const [appointments, setAppointments] = useState(null)

  useEffect(() => async () => {
    const config = {
      headers: { Authorization: `Bearer ${user.token}` }
    }

    try {
      const response = await axios.get('/api/appointments', config)
      setAppointments(response.data)
    } catch(exception) {
      setReservationError(exception.response.data)
    }
  }, [])

  const [appointmentDate, setAppointmentDate] = useState('')
  const [reservationError, setReservationError] = useState(null)


  const handleReservation = async (e) => {
    e.preventDefault()

    try {

      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }
      const newDate = { date: appointmentDate }
      const status = await axios.post('/api/appointments', newDate, config)
      setAppointments(status.data)

    } catch (exception) {

      setReservationError(exception.response.data.error)

    }
  }

  const handleDeletion = (id) => async () => {

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      }

      const status = await axios.delete(`/api/appointments/${id}`, config)
      setAppointments(appointments.filter(appointment => appointment.id !== id))
    } catch (exception) {
      console.log('Error fired from trying to delete a reservation', exception)
    }
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }

  if (appointments && appointments.length) {

    return (
      <>
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                appointments.map(
                  (appointment, index) =>
                    <tr key={appointment.id}>
                      <td>{index + 1}</td>
                      <td>{appointment.userId.name}</td>
                      <td>{appointment.userId.email}</td>
                      <td>{new Date(appointment.date).toLocaleString('en-US', options)}</td>
                      <td>
                        <button className="delete-button" onClick={handleDeletion(appointment.id)}><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                )
              }
            </tbody>
          </table>
        </div>
      </>
    )
  }

  return (
    <>
      {Array.isArray(appointments) && !appointments.length && user.username !== 'root' && // Basically if appointments is an array and empty, return a form to make an appointment
        <div>
          <form id="appointment-form" onSubmit={handleReservation}>
            <input type="datetime-local" onChange={({ target }) => setAppointmentDate(target.value)} />
            <button type="submit">make a reservation</button>
            <br />
            {reservationError && <div className="error-message">{reservationError}</div>}
          </form>
        </div>
      }
    </>
  )
}

export default Reservation