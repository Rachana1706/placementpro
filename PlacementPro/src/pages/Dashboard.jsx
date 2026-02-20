import { Users, Building2, Briefcase, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'

const stats = [
  { 
    label: 'Total Students', 
    value: '1,234', 
    change: '+12%', 
    trend: 'up',
    icon: Users,
    color: 'bg-blue-500'
  },
  { 
    label: 'Companies', 
    value: '89', 
    change: '+8%', 
    trend: 'up',
    icon: Building2,
    color: 'bg-purple-500'
  },
  { 
    label: 'Active Jobs', 
    value: '156', 
    change: '+24%', 
    trend: 'up',
    icon: Briefcase,
    color: 'bg-green-500'
  },
  { 
    label: 'Placements', 
    value: '456', 
    change: '-3%', 
    trend: 'down',
    icon: TrendingUp,
    color: 'bg-orange-500'
  },
]

const recentApplications = [
  { id: 1, student: 'John Smith', company: 'Google', position: 'Software Engineer', status: 'Pending', date: '2024-01-15' },
  { id: 2, student: 'Sarah Johnson', company: 'Microsoft', position: 'Data Analyst', status: 'Selected', date: '2024-01-14' },
  { id: 3, student: 'Mike Brown', company: 'Amazon', position: 'Cloud Engineer', status: 'Interview', date: '2024-01-14' },
  { id: 4, student: 'Emily Davis', company: 'Meta', position: 'Product Manager', status: 'Rejected', date: '2024-01-13' },
  { id: 5, student: 'Alex Wilson', company: 'Apple', position: 'iOS Developer', status: 'Pending', date: '2024-01-12' },
]

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with placements.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent applications */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Student</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Company</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Position</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50/50">
                  <td className="py-3 text-sm font-medium text-gray-900">{app.student}</td>
                  <td className="py-3 text-sm text-gray-600">{app.company}</td>
                  <td className="py-3 text-sm text-gray-600">{app.position}</td>
                  <td className="py-3">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${app.status === 'Selected' ? 'bg-green-100 text-green-800' : 
                        app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'Interview' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-3 text-sm text-gray-500">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
