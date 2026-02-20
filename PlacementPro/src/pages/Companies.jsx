import { Search, Filter, Plus, MoreVertical, MapPin, Globe, Users } from 'lucide-react'

const companies = [
  { id: 1, name: 'Google', industry: 'Technology', location: 'Mountain View, CA', employees: '10,000+', jobs: 12, logo: 'G' },
  { id: 2, name: 'Microsoft', industry: 'Technology', location: 'Redmond, WA', employees: '5,000+', jobs: 8, logo: 'M' },
  { id: 3, name: 'Amazon', industry: 'E-commerce', location: 'Seattle, WA', employees: '10,000+', jobs: 15, logo: 'A' },
  { id: 4, name: 'Meta', industry: 'Social Media', location: 'Menlo Park, CA', employees: '5,000+', jobs: 6, logo: 'F' },
  { id: 5, name: 'Apple', industry: 'Technology', location: 'Cupertino, CA', employees: '10,000+', jobs: 10, logo: 'A' },
]

function Companies() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-500 mt-1">Manage recruiting companies and partnerships</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-3xl font-bold text-gray-900">89</p>
          <p className="text-sm text-gray-500 mt-1">Total Companies</p>
        </div>
        <div className="card">
          <p className="text-3xl font-bold text-gray-900">156</p>
          <p className="text-sm text-gray-500 mt-1">Active Job Posts</p>
        </div>
        <div className="card">
          <p className="text-3xl font-bold text-gray-900">45</p>
          <p className="text-sm text-gray-500 mt-1">Placements This Year</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search companies..." 
              className="input-field pl-10"
            />
          </div>
          <button className="btn-secondary flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Companies grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map((company) => (
          <div key={company.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{company.logo}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.industry}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {company.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                {company.employees} employees
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{company.jobs} open positions</span>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  View Jobs
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Companies
