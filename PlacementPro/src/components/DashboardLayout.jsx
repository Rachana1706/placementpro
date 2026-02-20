import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard,
  GraduationCap,
  User,
  Users,
  BarChart3,
  Bot,
  Menu,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Settings,
  Sparkles,
  TrendingUp,
  Briefcase,
  Building2,
  Award
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

// Role-based stats
const getRoleStats = (role, analytics) => {
  switch (role) {
    case 'admin':
      return [
        { label: 'Total Students', value: analytics?.totalStudents?.toString() || '0', icon: Users, change: '+12%', color: 'from-blue-500 to-blue-600' },
        { label: 'Companies', value: analytics?.totalCompanies?.toString() || '0', icon: Building2, change: '+8%', color: 'from-purple-500 to-purple-600' },
        { label: 'Active Jobs', value: analytics?.activeDrives?.toString() || '0', icon: Briefcase, change: '+24%', color: 'from-green-500 to-green-600' },
        { label: 'Placements', value: analytics?.placedCount?.toString() || '0', icon: Award, change: '+15%', color: 'from-orange-500 to-orange-600' },
      ]
    case 'student':
      return [
        { label: 'Applications', value: analytics?.myApplications?.toString() || '0', icon: Briefcase, change: '+3', color: 'from-blue-500 to-blue-600' },
        { label: 'Interviews', value: analytics?.interviews?.toString() || '0', icon: TrendingUp, change: '+2', color: 'from-purple-500 to-purple-600' },
        { label: 'Offers', value: analytics?.offers?.toString() || '0', icon: Award, change: '1 new', color: 'from-green-500 to-green-600' },
        { label: 'Profile Score', value: analytics?.profileScore?.toString() || '0%', icon: User, change: '+5%', color: 'from-orange-500 to-orange-600' },
      ]
    case 'alumni':
      return [
        { label: 'Connections', value: '456', icon: Users, change: '+23', color: 'from-blue-500 to-blue-600' },
        { label: 'Referrals', value: analytics?.referrals?.toString() || '0', icon: Briefcase, change: '+5', color: 'from-purple-500 to-purple-600' },
        { label: 'Mentors', value: '18', icon: Award, change: '+2', color: 'from-green-500 to-green-600' },
        { label: 'Sessions', value: '45', icon: TrendingUp, change: '+8', color: 'from-orange-500 to-orange-600' },
      ]
    default:
      return []
  }
}

function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, getAnalytics, getMyApplications } = useApp()
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const [analytics, setAnalytics] = useState({})

  useEffect(() => {
    setIsPageTransitioning(true)
    const timer = setTimeout(() => setIsPageTransitioning(false), 300)
    return () => clearTimeout(timer)
  }, [location.pathname])

  // Load analytics
  useEffect(() => {
    if (user?.role === 'admin') {
      const adminAnalytics = getAnalytics()
      setAnalytics(adminAnalytics)
    } else if (user?.role === 'student') {
      const myApps = getMyApplications()
      setAnalytics({
        myApplications: myApps.length,
        interviews: myApps.filter(a => a.status === 'Interview').length,
        offers: myApps.filter(a => a.status === 'Selected').length,
        profileScore: user.profileStrength || 0
      })
    } else if (user?.role === 'alumni') {
      setAnalytics({ referrals: 2 })
    }
  }, [user, getAnalytics, getMyApplications])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const getUserInitial = () => {
    if (!user?.name) return 'U'
    return user.name.charAt(0).toUpperCase()
  }

  const getRoleLabel = () => {
    switch (user?.role) {
      case 'admin': return 'Admin'
      case 'student': return 'Student'
      case 'alumni': return 'Alumni'
      default: return 'User'
    }
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    let greeting = 'Good morning'
    if (hour >= 12 && hour < 17) greeting = 'Good afternoon'
    else if (hour >= 17) greeting = 'Good evening'
    
    const firstName = user?.name ? user.name.split(' ')[0] : 'User'
    
    switch (user?.role) {
      case 'admin': return `${greeting}, ${firstName}!`
      case 'student': return `${greeting}, ${firstName}! Ready to ace your placement?`
      case 'alumni': return `${greeting}, ${firstName}! Give back to the community`
      default: return `${greeting}, ${firstName}!`
    }
  }

  const getNavItems = () => {
    const items = []
    
    if (user?.role === 'admin') {
      items.push({ path: '/dashboard', icon: LayoutDashboard, label: 'Admin Dashboard', description: 'Overview & Stats' })
    }
    
    if (user?.role === 'student') {
      items.push({ path: '/student-portal', icon: User, label: 'Student Portal', description: 'My Profile' })
    }
    
    if (user?.role === 'alumni') {
      items.push({ path: '/alumni-portal', icon: Users, label: 'Alumni Portal', description: 'Network' })
    }
    
    if (user?.role === 'admin' || user?.role === 'alumni') {
      items.push({ path: '/analytics', icon: BarChart3, label: 'Analytics', description: 'Data & Insights' })
    }
    
    items.push({ path: '/placement-bot', icon: Bot, label: 'PlacementBot', description: 'AI Assistant' })
    
    return items
  }

  const navItems = getNavItems()
  const stats = getRoleStats(user?.role, analytics)
  const getDisplayName = () => user?.name || 'User'

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50/30 to-purple-50/20">
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Glassmorphism Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-2xl
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Glass Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100/50 bg-white/30">
          <div className="p-2.5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg shadow-primary-500/30">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            PlacementPro
          </span>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-2 overflow-y-auto h-[calc(100vh-140px)]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              end={item.path === location.pathname}
              className={({ isActive }) => `
                flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-gradient-to-r from-primary-500/10 to-purple-500/10 text-primary-700 shadow-lg shadow-primary-500/10' 
                  : 'text-gray-600 hover:bg-white/50 hover:shadow-md hover:text-gray-900 hover:scale-[1.02]'
                }
              `}
            >
              <div className={`
                p-2 rounded-lg transition-all duration-300
                ${location.pathname === item.path
                  ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30' 
                  : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600'
                }
              `}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className={`font-medium text-sm ${location.pathname === item.path ? 'text-primary-700' : ''}`}>
                  {item.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.description}
                </p>
              </div>
            </NavLink>
          ))}
        </nav>

        {/* Glass Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100/50">
          <div className="p-4 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-xl border border-primary-100/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <p className="text-sm font-semibold text-primary-700">Welcome, {getDisplayName().split(' ')[0]}!</p>
            </div>
            <p className="text-xs text-gray-500 mt-1 capitalize">{getRoleLabel()} Portal</p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Glassmorphism Header */}
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
          <div className="flex items-center justify-between px-4 py-4 lg:px-6">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2.5 rounded-xl bg-gray-50/50 hover:bg-white/80 transition-all duration-200 hover:scale-105"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:bg-white/50 focus:border-primary-300 transition-all backdrop-blur-sm hover:shadow-md"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button className="p-2.5 rounded-xl bg-gray-50/50 hover:bg-white/80 relative transition-all duration-200 hover:scale-105 group">
                <Bell className="w-5 h-5 text-gray-500 group-hover:text-primary-600 transition-colors" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-4 rounded-xl bg-gray-50/50 hover:bg-white/80 transition-all duration-200 hover:scale-105"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                    <span className="text-white text-sm font-semibold">{getUserInitial()}</span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">{getRoleLabel()}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Glass Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50 overflow-hidden animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{getDisplayName()}</p>
                      <p className="text-xs text-gray-500 capitalize">{getRoleLabel()}</p>
                    </div>
                    <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-primary-50/50 transition-colors">
                      <Settings className="w-4 h-4 text-gray-400" />
                      Settings
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50/50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content with transition */}
        <main className={`p-4 lg:p-6 transition-all duration-300 ${isPageTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {/* Welcome Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 animate-fade-in">
              {getWelcomeMessage()}
            </h1>
            <p className="text-gray-500 mt-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Here's what's happening in your {getRoleLabel().toLowerCase()} portal today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="card-glass-hover group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg shadow-gray-200/50 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Page Content */}
          <Outlet />
        </main>
      </div>

      {/* Mobile close button */}
      {sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(false)}
          className="fixed top-4 right-4 z-50 p-2.5 bg-white/80 backdrop-blur-md rounded-xl shadow-lg lg:hidden hover:bg-white transition-all"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  )
}

export default DashboardLayout
