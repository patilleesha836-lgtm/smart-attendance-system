import { useState } from 'react'
import { Plus, Trash2, Search } from 'lucide-react'

function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function StudentsPage({ students, setStudents }) {
  const [name, setName] = useState('')
  const [roll, setRoll] = useState('')
  const [className, setClassName] = useState('CS-A')
  const [query, setQuery] = useState('')

  function addStudent(e) {
    e.preventDefault()
    if (!name.trim() || !roll.trim()) return
    const newStudent = {
      id: 's' + Date.now(),
      name: name.trim(),
      roll: roll.trim(),
      className: className.trim() || 'CS-A',
    }
    setStudents([...students, newStudent])
    setName('')
    setRoll('')
  }

  function removeStudent(id) {
    setStudents(students.filter((s) => s.id !== id))
  }

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.roll.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <div className="page-header">
        <div>
          <span className="eyebrow">Roster</span>
          <div className="page-title">Students</div>
          <div className="page-sub">{students.length} students enrolled</div>
        </div>
      </div>

      <div className="glass mb-16">
        <div className="section-head">
          <div className="section-title">Add Student</div>
        </div>
        <form className="pad" onSubmit={addStudent}>
          <div className="grid-2 mb-16">
            <div>
              <label className="field-label">Full Name</label>
              <input
                className="input"
                placeholder="e.g. Meera Nair"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="field-label">Roll Number</label>
              <input
                className="input"
                placeholder="e.g. 06"
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
              />
            </div>
          </div>
          <div className="grid-2">
            <div>
              <label className="field-label">Class / Section</label>
              <input
                className="input"
                placeholder="e.g. CS-A"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={15} /> Add Student
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="glass">
        <div className="section-head">
          <div className="section-title">Roster</div>
          <div style={{ position: 'relative', width: 220 }}>
            <Search size={14} style={{ position: 'absolute', left: 11, top: 11, color: 'var(--text-dim)' }} />
            <input
              className="input"
              style={{ paddingLeft: 32 }}
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="table-wrap">
          {filtered.length === 0 ? (
            <div className="empty-state">No students found.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No.</th>
                  <th>Class</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="row-flex">
                        <div className="avatar">{initials(s.name)}</div>
                        {s.name}
                      </div>
                    </td>
                    <td className="text-mono">{s.roll}</td>
                    <td>{s.className}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => removeStudent(s.id)}>
                        <Trash2 size={13} />
                      </button>
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
