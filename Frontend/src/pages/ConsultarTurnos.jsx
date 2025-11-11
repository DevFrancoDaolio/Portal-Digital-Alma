"use client"

import { useState, useEffect } from "react"
import NavBar from "../componentes/NavBar"
import Fondo from "../componentes/Fondo"
import "../styles/Turnos.css"

export default function ConsultarTurnos() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [weekDays, setWeekDays] = useState([])
  const [appointments, setAppointments] = useState([])

  // Datos de ejemplo - reemplazar con llamadas a tu API
  const mockAppointments = [
    {
      id: 1,
      patientName: "PEREZ, JUAN",
      date: "2025-01-06",
      startTime: "09:00",
      endTime: "09:30",
      type: "normal",
    },
    {
      id: 2,
      patientName: "PEREZ, JUAN",
      date: "2025-01-06",
      startTime: "10:30",
      endTime: "11:00",
      type: "normal",
    },
    {
      id: 3,
      patientName: "PEREZ, JUAN",
      date: "2025-01-07",
      startTime: "09:15",
      endTime: "09:45",
      type: "normal",
    },
    {
      id: 4,
      patientName: "PEREZ, JUAN",
      date: "2025-01-07",
      startTime: "11:00",
      endTime: "11:30",
      type: "normal",
    },
    {
      id: 5,
      patientName: "PEREZ, JUAN",
      date: "2025-01-08",
      startTime: "12:00",
      endTime: "12:30",
      type: "normal",
    },
    {
      id: 6,
      patientName: "LUNA BLOQUEADO",
      date: "2025-01-09",
      startTime: "10:00",
      endTime: "14:00",
      type: "blocked",
    },
    {
      id: 7,
      patientName: "GINA, AGUSTIN",
      date: "2025-01-07",
      startTime: "10:30",
      endTime: "11:00",
      type: "blocked",
    },
    {
      id: 8,
      patientName: "PEREZ, JUAN",
      date: "2025-01-09",
      startTime: "13:30",
      endTime: "14:00",
      type: "normal",
    },
  ]

  const timeSlots = [
    "08:00",
    "08:15",
    "08:30",
    "08:45",
    "09:00",
    "09:15",
    "09:30",
    "09:45",
    "10:00",
    "10:15",
    "10:30",
    "10:45",
    "11:00",
    "11:15",
    "11:30",
    "11:45",
    "12:00",
    "12:15",
    "12:30",
    "12:45",
    "13:00",
    "13:15",
    "13:30",
    "13:45",
    "14:00",
    "14:15",
    "14:30",
  ]

  const menuItems = [
    { id: "agenda", label: "AGENDA", icon: "📅" },
    { id: "turnos-past", label: "TURNOS PAST", icon: "📋" },
    { id: "estudios", label: "ESTUDIOS", icon: "🔬" },
    { id: "pacientes", label: "PACIENTES", icon: "👥" },
    { id: "nominalizacion", label: "NOMINALIZACIÓN", icon: "📝" },
    { id: "reportes", label: "REPORTES", icon: "📊" },
    { id: "datos-personales", label: "DATOS PERSONALES", icon: "👤" },
    { id: "preferencias", label: "PREFERENCIAS", icon: "⚙️" },
    { id: "salir", label: "SALIR", icon: "🚪" },
  ]

  useEffect(() => {
    setAppointments(mockAppointments)
  }, [])

  useEffect(() => {
    calculateWeekDays(selectedDate)
  }, [selectedDate])

  const calculateWeekDays = (date) => {
    const day = date.getDay()
    const diff = date.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(date.setDate(diff))

    const days = []
    for (let i = 0; i < 5; i++) {
      const currentDay = new Date(monday)
      currentDay.setDate(monday.getDate() + i)
      days.push(currentDay)
    }
    setWeekDays(days)
  }

  const formatDate = (date) => {
    const days = ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"]
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    return `${days[date.getDay()]} ${String(date.getDate()).padStart(2, "0")}/${months[date.getMonth()]}/${date.getFullYear()}`
  }

  const formatDateISO = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const getAppointmentsForDateAndTime = (date, time) => {
    const dateStr = formatDateISO(date)
    return appointments.filter((apt) => {
      if (apt.date !== dateStr) return false
      const aptStart = apt.startTime
      const aptEnd = apt.endTime
      return time >= aptStart && time < aptEnd
    })
  }

  const calculateAppointmentHeight = (startTime, endTime) => {
    const [startHour, startMin] = startTime.split(":").map(Number)
    const [endHour, endMin] = endTime.split(":").map(Number)
    const durationMinutes = endHour * 60 + endMin - (startHour * 60 + startMin)
    return (durationMinutes / 15) * 30
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(new Date(date))
    }
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date) => {
    if (!date) return false
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const getNextAppointment = () => {
    const now = new Date()
    const currentDateStr = formatDateISO(now)
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

    const upcomingAppointments = appointments
      .filter((apt) => {
        if (apt.type === "blocked") return false
        const aptDate = new Date(apt.date)
        if (aptDate > now) return true
        if (apt.date === currentDateStr && apt.startTime > currentTime) return true
        return false
      })
      .sort((a, b) => {
        if (a.date !== b.date) return new Date(a.date) - new Date(b.date)
        return a.startTime.localeCompare(b.startTime)
      })

    return upcomingAppointments[0] || null
  }

  const nextAppointment = getNextAppointment()

  const formatAppointmentDate = (dateStr) => {
    const date = new Date(dateStr)
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
    return `${days[date.getDay()]} ${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}`
  }

  return (
    <Fondo>
      <NavBar />
      <div className="turnos-container">
        <div className="turnos-sidebar">
          <div className="doctor-profile">
            <div className="doctor-avatar">
              <img src="/caring-doctor.png" alt="Doctor" />
            </div>
            <div className="doctor-info">
              <h3>Dr. Luciano Cima</h3>
              <p>Cirujano</p>
            </div>
          </div>

          <div className="next-appointment-section">
            <h4 className="section-title">Próximo Turno</h4>
            {nextAppointment ? (
              <div className="next-appointment-card">
                <div className="appointment-patient">{nextAppointment.patientName}</div>
                <div className="appointment-datetime">
                  <span className="appointment-date">{formatAppointmentDate(nextAppointment.date)}</span>
                  <span className="appointment-time-badge">{nextAppointment.startTime}</span>
                </div>
              </div>
            ) : (
              <div className="no-appointment">No hay turnos próximos</div>
            )}
          </div>

          <div className="sidebar-actions">
            <button className="boton-agregar">Nuevo Turno</button>
            <button className="btn-baja">Baja Masiva</button>
          </div>

          <div className="calendar-widget">
            <div className="calendar-header">
              <button onClick={handlePrevMonth} className="calendar-nav-btn">
                ◀
              </button>
              <span className="calendar-month">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button onClick={handleNextMonth} className="calendar-nav-btn">
                ▶
              </button>
            </div>
            <div className="calendar-grid">
              <div className="calendar-weekdays">
                {["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"].map((day) => (
                  <div key={day} className="calendar-weekday">
                    {day}
                  </div>
                ))}
              </div>
              <div className="calendar-days">
                {getDaysInMonth(currentMonth).map((date, index) => (
                  <div
                    key={index}
                    className={`calendar-day ${!date ? "empty" : ""} ${
                      isToday(date) ? "today" : ""
                    } ${isSelected(date) ? "selected" : ""}`}
                    onClick={() => handleDateClick(date)}
                  >
                    {date ? date.getDate() : ""}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="turnos-main">
          <div className="week-header">
            <div className="week-day-header time-header"></div>
            {weekDays.map((day, index) => (
              <div key={index} className="week-day-header">
                <div className="day-name">{formatDate(day)}</div>
              </div>
            ))}
          </div>

          <div className="schedule-grid">
            <div className="time-column">
              {timeSlots.map((time) => (
                <div key={time} className="time-slot">
                  {time}
                </div>
              ))}
            </div>

            {weekDays.map((day, dayIndex) => (
              <div key={dayIndex} className="day-column">
                {timeSlots.map((time, timeIndex) => {
                  const dayAppointments = getAppointmentsForDateAndTime(day, time)
                  const isFirstSlot = dayAppointments.length > 0 && dayAppointments[0].startTime === time

                  return (
                    <div key={timeIndex} className="schedule-slot">
                      {isFirstSlot &&
                        dayAppointments.map((apt) => (
                          <div
                            key={apt.id}
                            className={`appointment ${apt.type === "blocked" ? "blocked" : "normal"}`}
                            style={{
                              height: `${calculateAppointmentHeight(apt.startTime, apt.endTime)}px`,
                            }}
                          >
                            <div className="appointment-content">
                              <div className="appointment-name">{apt.patientName}</div>
                              <div className="appointment-time">{apt.startTime}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fondo>
  )
}
