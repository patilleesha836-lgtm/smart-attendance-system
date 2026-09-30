import { LayoutDashboard, Users, ClipboardCheck, FileBarChart, Fingerprint } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'mark', label: 'Mark Attendance', icon: ClipboardCheck },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
]

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <Fingerprint size={19} color="#04121a" strokeWidth={2.4} />
        </div>
        <div className="brand-text">
          <div className="t1">Attendance OS</div>
          <div className="t2">CLASS CS-A</div>
        </div>
      </div>

      {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`nav-item ${active === id ? 'active' : ''}`}
          onClick={() => onNavigate(id)}
        >
          <Icon size={17} strokeWidth={2} />
          {label}
        </button>
      ))}

      <div className="sidebar-footer">
        v1.0 · local storage
      </div>
    </aside>
  )
}
