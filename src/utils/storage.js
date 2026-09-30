const STUDENTS_KEY = 'attos_students'
const ATTENDANCE_KEY = 'attos_attendance'

export function loadStudents() {
  try {
    const raw = localStorage.getItem(STUDENTS_KEY)
    if (!raw) return seedStudents()
    return JSON.parse(raw)
  } catch {
    return seedStudents()
  }
}

export function saveStudents(students) {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students))
}

export function loadAttendance() {
  try {
    const raw = localStorage.getItem(ATTENDANCE_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export function saveAttendance(records) {
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(records))
}

function seedStudents() {
  const seed = [
    { id: 's1', name: 'Aarav Sharma', roll: '01', className: 'CS-A' },
    { id: 's2', name: 'Diya Patel', roll: '02', className: 'CS-A' },
    { id: 's3', name: 'Ishaan Verma', roll: '03', className: 'CS-A' },
    { id: 's4', name: 'Ananya Reddy', roll: '04', className: 'CS-A' },
    { id: 's5', name: 'Kabir Singh', roll: '05', className: 'CS-A' },
  ]
  saveStudents(seed)
  return seed
}

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10)
}
