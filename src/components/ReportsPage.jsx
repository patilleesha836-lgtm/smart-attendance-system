import { FileDown } from 'lucide-react'

function initials(name) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase()
}

export default function ReportsPage({ students, attendance }) {
  const days = Object.keys(attendance).sort()

  const rows = students.map((s) => {
    let present = 0
    let absent = 0
    let late = 0
    let marked = 0
    days.forEach((day) => {
      const status = attendance[day][s.id]
      if (!status) return
      marked += 1
      if (status === 'present') present += 1
      else if (status === 'absent') absent += 1
      else if (status === 'late') late += 1
    })
    const rate = marked ? Math.round(((present + late) / marked) * 100) : 0
    return { ...s, present, absent, late, marked, rate }
  })

  function exportCSV() {
    const header = ['Name', 'Roll', 'Class', 'Days Marked', 'Present', 'Late', 'Absent', 'Attendance %']
    const lines = rows.map((r) => [r.name, r.roll, r.className, r.marked, r.present, r.late, r.absent, r.rate + '%'])
    const csv = [header, ...lines].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'attendance_report.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Analytics</span>
          <div className="page-title">Reports</div>
          <div className="page-sub">{days.length} days recorded</div>
        </div>
        <button className="btn btn-ghost" onClick={exportCSV} disabled={rows.length === 0}>
          <FileDown size={15} /> Export CSV
        </button>
      </div>

      <div className="glass">
        <div className="table-wrap">
          {rows.length === 0 ? (
            <div className="empty-state">No students to report on yet.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Present</th>
                  <th>Late</th>
                  <th>Absent</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="row-flex">
                        <div className="avatar">{initials(r.name)}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{r.name}</div>
                          <div className="text-mono text-dim" style={{ fontSize: 11.5 }}>Roll {r.roll}</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-mono" style={{ color: 'var(--good)' }}>{r.present}</td>
                    <td className="text-mono" style={{ color: 'var(--warn)' }}>{r.late}</td>
                    <td className="text-mono" style={{ color: 'var(--bad)' }}>{r.absent}</td>
                    <td>
                      <div className="row-flex" style={{ gap: 10 }}>
                        <div className="bar-track" style={{ width: 90 }}>
                          <div
                            className="bar-fill"
                            style={{
                              width: `${r.rate}%`,
                              background: r.rate >= 75
                                ? 'linear-gradient(90deg, var(--cyan), var(--good))'
                                : 'linear-gradient(90deg, var(--warn), var(--bad))',
                            }}
                          />
                        </div>
                        <span className="text-mono" style={{ fontSize: 12.5 }}>{r.rate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
