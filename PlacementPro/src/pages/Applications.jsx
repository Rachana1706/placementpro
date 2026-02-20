import { Search, Filter, Plus, MoreVertical, Download, Eye } from 'lucide-react'

const applications = [
  { id: 1, student: 'John Smith', company: 'Google', position: 'Software Engineer', status: 'Pending', date: '2024-01-15', cgpa: '8.5' },
  { id: 2, student: 'Sarah Johnson', company: 'Microsoft', position: 'Data Analyst', status: 'Selected', date: '2024-01-14', cgpa: '9.0' },
  { id: 3, student: 'Mike Brown', company: 'Amazon', position: 'Cloud Engineer', status: 'Interview', date: '2024-01-14', cgpa: '8.2' },
  { id: 4, student: 'Emily Davis', company: 'Meta', position: 'Product Manager', status: 'Rejected', date: '2024-01-13', cgpa: '7.8' },
  { id: 5, student: 'Alex Wilson', company: 'Apple', position: 'iOS Developer', status: 'Pending', date: '2024-01-12', cgpa: '8.8' },
  { id: 6, student: 'Jessica Lee', company: 'Google', position: 'Frontend Developer', status: 'Interview', date: '2024-01-11', cgpa: '8.0' },
  { id: 7, student: 'David Chen', company: 'Microsoft', position: 'Backend Engineer', status: 'Selected', date: '2024-01-10', cgpa: '9.2' },
]

function Applications() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500 mt-1">Track and manage student applications</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Application
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <div className="card">
          <p className="text-2xl font-bold text-gray-900">234</p>
          <p className="text-sm text-gray-500 mt-1">Total</p>
        </div>
        <div className="card">
          <p className="text-2xl font-bold text-yellow-600">45</p>
          <p className="text-sm text-gray-500 mt-1">Pending</p>
        </div>
        <div className="card">
          <p className="text-2xl font-bold text-blue-600">28</p>
          <p className="text-sm text-gray-500 mt-1">Interview</p>
        </div>
        <div className="card">
          <p className="text-2xl font-bold text-green-600">18</p>
          <p className="text-sm text-gray-500 mt-1">Selected</p>
        </div>
        <div className="card">
          <p className="text-2xl font-bold text-red-600">12</p>
          <p className="text-sm text-gray-500 mt-1">Rejected</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              className="input-field pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Applications table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Student</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Company</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Position</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">CGPA</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Applied Date</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{app.student}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.company}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.cgpa}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${app.status === 'Selected' ? 'bg-green-100 text-green-800' : 
                        app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{app.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Applications
