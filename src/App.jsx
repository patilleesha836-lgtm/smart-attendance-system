import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import StudentsPage from './components/StudentsPage.jsx'
import MarkAttendancePage from './components/MarkAttendancePage.jsx'
import ReportsPage from './components/ReportsPage.jsx'
import { loadStudents, saveStudents, loadAttendance, saveAttendance } from './utils/storage.js'

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [students, setStudentsState] = useState([])
  const [attendance, setAttendanceState] = useState({})

  useEffect(() => {
    setStudentsState(loadStudents())
    setAttendanceState(loadAttendance())
  }, [])

  function setStudents(next) {
    setStudentsState(next)
    saveStudents(next)
  }

  function setAttendance(next) {
    setAttendanceState(next)
    saveAttendance(next)
  }

  return (
    <div className="app-shell">
      <Sidebar active={page} onNavigate={setPage} />
      <main className="main">
        {page === 'dashboard' && (
          <Dashboard students={students} attendance={attendance} onNavigate={setPage} />
        )}
        {page === 'students' && (
          <StudentsPage students={students} setStudents={setStudents} />
        )}
        {page === 'mark' && (
          <MarkAttendancePage students={students} attendance={attendance} setAttendance={setAttendance} />
        )}
        {page === 'reports' && (
          <ReportsPage students={students} attendance={attendance} />
        )}
      </main>
    </div>
  )
}
