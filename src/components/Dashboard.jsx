import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react'
import { todayKey } from '../utils/storage'

export default function Dashboard({ students, attendance, onNavigate }) {
  const today = todayKey()
  const todayRecord = attendance[today] || {}

  const presentToday = Object.values(todayRecord).filter((s) => s === 'present').length
  const absentToday = Object.values(todayRecord).filter((s) => s === 'absent').length
  const lateToday = Object.values(todayRecord).filter((s) => s === 'late').length
  const markedToday = Object.keys(todayRecord).length

  const total = students.length

  // overall attendance rate across all recorded days
  let totalMarks = 0
  let totalPresent = 0
  Object.values(attendance).forEach((day) => {
    Object.values(day).forEach((status) => {
      totalMarks += 1
      if (status === 'present' || status === 'late') totalPresent += 1
    })
  })
  const overallRate = totalMarks ? Math.round((totalPresent / totalMarks) * 100) : 0

  const recentDays = Object.keys(attendance).sort().reverse().slice(0, 6)

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Overview</span>
          <div className="page-title">Dashboard</div>
          <div className="page-sub">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        <button className="btn btn-primary" onClick={() => onNavigate('mark')}>
          <UserCheck size={15} /> Mark Today's Attendance
        </button>
      </div>

      <div className="stat-grid">
        <div className="glass stat-card">
          <div className="stat-icon"><Users size={20} color="#7c8cf8" /></div>
          <div className="stat-label">Total Students</div>
          <div className="stat-value indigo">{total}</div>
        </div>
        <div className="glass stat-card">
          <div className="stat-icon"><UserCheck size={20} color="#3ee08c" /></div>
          <div className="stat-label">Present Today</div>
          <div className="stat-value good">{presentToday}</div>
        </div>
        <div className="glass stat-card">
          <div className="stat-icon"><UserX size={20} color="#ff6b7a" /></div>
          <div className="stat-label">Absent Today</div>
          <div className="stat-value bad">{absentToday}</div>
        </div>
        <div className="glass stat-card">
          <div className="stat-icon"><TrendingUp size={20} color="#2dd4ee" /></div>
          <div className="stat-label">Overall Attendance</div>
          <div className="stat-value cyan">{overallRate}%</div>
        </div>
      </div>

      <div className="glass">
        <div className="section-head">
          <div className="section-title">Today's Status</div>
          <span className="text-mono text-dim" style={{ fontSize: 12 }}>
            {markedToday}/{total} marked
          </span>
        </div>
        <div className="pad">
          {total === 0 ? (
            <div className="empty-state">Add students to get started.</div>
          ) : (
            <>
              <div className="bar-track mb-16">
                <div
                  className="bar-fill"
                  style={{ width: `${total ? (markedToday / total) * 100 : 0}%` }}
                />
              </div>
              <div className="row-flex" style={{ gap: 20, flexWrap: 'wrap' }}>
                <span className="badge present">● {presentToday} present</span>
                <span className="badge absent">● {absentToday} absent</span>
                <span className="badge late">● {lateToday} late</span>
                <span className="badge neutral">○ {total - markedToday} unmarked</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="glass mt-16">
        <div className="section-head">
          <div className="section-title">Recent Days</div>
        </div>
        <div className="pad">
          {recentDays.length === 0 ? (
            <div className="empty-state">No attendance recorded yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {recentDays.map((day) => {
                const record = attendance[day]
                const p = Object.values(record).filter((s) => s === 'present').length
                const a = Object.values(record).filter((s) => s === 'absent').length
                const l = Object.values(record).filter((s) => s === 'late').length
                return (
                  <div key={day} className="flex-between" style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span className="text-mono" style={{ fontSize: 13 }}>{day}</span>
                    <div className="row-flex">
                      <span className="badge present">{p}</span>
                      <span className="badge absent">{a}</span>
                      <span className="badge late">{l}</span>
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
