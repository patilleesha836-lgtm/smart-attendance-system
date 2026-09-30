import { useState, useEffect } from 'react'
import { CheckCheck, Save } from 'lucide-react'
import { todayKey } from '../utils/storage'

function initials(name) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
}

export default function MarkAttendancePage({ students, attendance, setAttendance }) {
  const [date, setDate] = useState(todayKey())
  const [draft, setDraft] = useState({})
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setDraft(attendance[date] || {})
    setSaved(false)
  }, [date, attendance])

  function setStatus(studentId, status) {
    setDraft((prev) => ({ ...prev, [studentId]: status }))
    setSaved(false)
  }

  function markAllPresent() {
    const all = {}
    students.forEach((s) => { all[s.id] = 'present' })
    setDraft(all)
    setSaved(false)
  }

  function saveAttendance() {
    setAttendance({ ...attendance, [date]: draft })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Roll Call</span>
          <div className="page-title">Mark Attendance</div>
          <div className="page-sub">Set each student's status, then save.</div>
        </div>
        <div className="row-flex">
          <input
            type="date"
            className="input"
            style={{ width: 170 }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button className="btn btn-ghost" onClick={markAllPresent}>
            <CheckCheck size={15} /> All Present
          </button>
          <button className="btn btn-primary" onClick={saveAttendance}>
            <Save size={15} /> {saved ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>

      <div className="glass">
        <div className="section-head">
          <div className="section-title">{date}</div>
          <span className="text-mono text-dim" style={{ fontSize: 12 }}>
            {Object.keys(draft).length}/{students.length} marked
          </span>
        </div>
        <div className="pad">
          {students.length === 0 ? (
            <div className="empty-state">No students yet — add some in the Students tab.</div>
          ) : (
            <div className="mark-list">
              {students.map((s) => {
                const status = draft[s.id]
                return (
                  <div key={s.id} className="glass mark-row">
                    <div className="row-flex">
                      <div className="avatar">{initials(s.name)}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13.5 }}>{s.name}</div>
                        <div className="text-mono text-dim" style={{ fontSize: 11.5 }}>Roll {s.roll} · {s.className}</div>
                      </div>
                    </div>
                    <div className="status-btns">
                      <button
                        className={`status-btn p ${status === 'present' ? 'on' : ''}`}
                        onClick={() => setStatus(s.id, 'present')}
                      >
                        P
                      </button>
                      <button
                        className={`status-btn l ${status === 'late' ? 'on' : ''}`}
                        onClick={() => setStatus(s.id, 'late')}
                      >
                        L
                      </button>
                      <button
                        className={`status-btn a ${status === 'absent' ? 'on' : ''}`}
                        onClick={() => setStatus(s.id, 'absent')}
                      >
                        A
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
