import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Briefcase, 
  Award, 
  DollarSign,
  Building2,
  BookOpen
} from 'lucide-react'
import { useApp } from '../context/AppContext'

// Simple chart components (since we can't use Recharts easily)
const SimpleBarChart = ({ data, dataKey, nameKey, colors }) => {
  const maxValue = Math.max(...(data.map(d => d[dataKey]) || [0]))
  
  return (
    <div className="space-y-3">
      {(data || []).map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <span className="w-24 text-xs text-gray-600 truncate">{item[nameKey]}</span>
          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${(item[dataKey] / maxValue) * 100}%`,
                backgroundColor: colors[index % colors.length]
              }}
            />
          </div>
          <span className="w-12 text-xs text-gray-900 font-medium text-right">{item[dataKey]}</span>
        </div>
      ))}
    </div>
  )
}

const SimpleLineChart = ({ data, dataKey, nameKey }) => {
  const maxValue = Math.max(...(data.map(d => d[dataKey]) || [0]))
  const minValue = Math.min(...(data.map(d => d[dataKey]) || [0]))
  const range = maxValue - minValue || 1
  
  const points = (data || []).map((item, index) => {
    const x = (index / ((data.length - 1) || 1)) * 100
    const y = 100 - ((item[dataKey] - minValue) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="relative h-40">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#e5e7eb" strokeWidth="0.5" />
        ))}
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        
        {/* Gradient */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Labels */}
      <div className="flex justify-between mt-2">
        {(data || []).map((item, index) => (
          <span key={index} className="text-xs text-gray-500">{item[nameKey]}</span>
        ))}
      </div>
    </div>
  )
}

function Analytics() {
  const { getAnalytics, drives, applications, user } = useApp()
  const [analytics, setAnalytics] = useState({})

  useEffect(() => {
    setAnalytics(getAnalytics())
  }, [drives, applications, getAnalytics])

  const isAdmin = user?.role === 'admin'

  // Mock data for charts
  const branchData = [
    { branch: 'CS', placed: 180, total: 312 },
    { branch: 'IT', placed: 145, total: 245 },
    { branch: 'EC', placed: 78, total: 156 },
    { branch: 'ME', placed: 35, total: 89 },
    { branch: 'CE', placed: 18, total: 45 },
  ]

  const skillData = [
    { skill: 'Python', demand: 85 },
    { skill: 'JavaScript', demand: 80 },
    { skill: 'ML', demand: 75 },
    { skill: 'Cloud', demand: 70 },
    { skill: 'SQL', demand: 85 },
    { skill: 'DevOps', demand: 65 },
  ]

  const companyData = [
    { company: 'Google', hires: 45 },
    { company: 'Microsoft', hires: 38 },
    { company: 'Amazon', hires: 67 },
    { company: 'Meta', hires: 32 },
    { company: 'Apple', hires: 28 },
  ]

  const salaryData = [
    { range: '5-10L', count: 89 },
    { range: '10-15L', count: 145 },
    { range: '15-20L', count: 98 },
    { range: '20-30L', count: 67 },
    { range: '30L+', count: 57 },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-glass group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-200/50">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{analytics.totalStudents || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Total Students</p>
          </div>
        </div>

        <div className="card-glass group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg shadow-purple-200/50">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+24%</span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{analytics.totalApplications || 0}</p>
            <p className="text-sm text-gray-500 mt-1">Applications</p>
          </div>
        </div>

        <div className="card-glass group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg shadow-green-200/50">
              <Award className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+15%</span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{analytics.placementRate || 0}%</p>
            <p className="text-sm text-gray-500 mt-1">Placement Rate</p>
          </div>
        </div>

        <div className="card-glass group hover:scale-105 transition-transform duration-300">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-200/50">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">₹{analytics.avgPackage || 0} LPA</p>
            <p className="text-sm text-gray-500 mt-1">Avg. Package</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Branch-wise Placement */}
        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Branch-wise Placement</h3>
          </div>
          <SimpleBarChart 
            data={branchData} 
            dataKey="placed" 
            nameKey="branch"
            colors={['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe']}
          />
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Placed</span>
              <span className="font-semibold text-gray-900">456 students</span>
            </div>
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Top Recruiters</h3>
          </div>
          <SimpleBarChart 
            data={companyData} 
            dataKey="hires" 
            nameKey="company"
            colors={['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5']}
          />
        </div>

        {/* Skill Demand */}
        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Skill Demand</h3>
          </div>
          <SimpleBarChart 
            data={skillData} 
            dataKey="demand" 
            nameKey="skill"
            colors={['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#fef3c7']}
          />
        </div>

        {/* Salary Distribution */}
        <div className="card-glass">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-600" />
            <h3 className="font-semibold text-gray-900">Salary Distribution</h3>
          </div>
          <SimpleBarChart 
            data={salaryData} 
            dataKey="count" 
            nameKey="range"
            colors={['#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8', '#fce7f3']}
          />
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="card-glass">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-gray-900">Monthly Company Visits</h3>
        </div>
        <SimpleLineChart 
          data={[
            { month: 'Aug', count: 5 },
            { month: 'Sep', count: 8 },
            { month: 'Oct', count: 12 },
            { month: 'Nov', count: 15 },
            { month: 'Dec', count: 10 },
            { month: 'Jan', count: 18 },
            { month: 'Feb', count: 14 },
          ]}
          dataKey="count"
          nameKey="month"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-glass bg-gradient-to-br from-primary-500/10 to-purple-500/10">
          <h4 className="font-semibold text-gray-900 mb-2">Active Drives</h4>
          <p className="text-3xl font-bold text-primary-600">{analytics.activeDrives || 0}</p>
          <p className="text-sm text-gray-500 mt-1">placement drives ongoing</p>
        </div>
        <div className="card-glass bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <h4 className="font-semibold text-gray-900 mb-2">Students Placed</h4>
          <p className="text-3xl font-bold text-green-600">{analytics.placedCount || 0}</p>
          <p className="text-sm text-gray-500 mt-1">this placement season</p>
        </div>
        <div className="card-glass bg-gradient-to-br from-orange-500/10 to-amber-500/10">
          <h4 className="font-semibold text-gray-900 mb-2">Total Companies</h4>
          <p className="text-3xl font-bold text-orange-600">{analytics.totalCompanies || 0}</p>
          <p className="text-sm text-gray-500 mt-1">participating this year</p>
        </div>
      </div>
    </div>
  )
}

export default Analytics
