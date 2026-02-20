import { Search, Filter, Plus, MoreVertical, MapPin, DollarSign, Clock } from 'lucide-react'

const jobs = [
  { id: 1, title: 'Software Engineer', company: 'Google', location: 'Remote', salary: '$120k - $180k', type: 'Full-time', applicants: 45, posted: '2 days ago' },
  { id: 2, title: 'Data Analyst', company: 'Microsoft', location: 'Redmond, WA', salary: '$90k - $120k', type: 'Full-time', applicants: 32, posted: '3 days ago' },
  { id: 3, title: 'Cloud Engineer', company: 'Amazon', location: 'Seattle, WA', salary: '$130k - $170k', type: 'Full-time', applicants: 28, posted: '5 days ago' },
  { id: 4, title: 'Product Manager', company: 'Meta', location: 'Menlo Park, CA', salary: '$140k - $200k', type: 'Full-time', applicants: 56, posted: '1 week ago' },
  { id: 5, title: 'iOS Developer', company: 'Apple', location: 'Cupertino, CA', salary: '$110k - $160k', type: 'Full-time', applicants: 22, posted: '1 week ago' },
]

function Jobs() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
          <p className="text-gray-500 mt-1">Manage job postings and openings</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Post Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-500 mt-1">Active Jobs</p>
        </div>
        <div className="card">
          <p className="text-3xl font-bold text-gray-900">89</p>
          <p className="text-sm text-gray-500 mt-1">Total Applications</p>
        </div>
        <div className="card">
          <p className="text-3xl font-bold text-gray-900">23</p>
          <p className="text-sm text-gray-500 mt-1">This Week</p>
        </div>
        <div className="card">
          <p className="text-3xl font-bold text-gray-900">67</p>
          <p className="text-sm text-gray-500 mt-1">Interviews Scheduled</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="input-field pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Jobs table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Job Title</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Company</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Location</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Salary</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Type</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Applicants</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Posted</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{job.title}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.company}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {job.salary}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {job.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{job.applicants}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.posted}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
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

export default Jobs
