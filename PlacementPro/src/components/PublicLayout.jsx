import { Outlet } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-primary shadow-lg shadow-primary-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">PlacementPro</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-white/80 hover:text-white font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-white/80 hover:text-white font-medium transition-colors">
                About
              </a>
              <a href="#" className="text-white/80 hover:text-white font-medium transition-colors">
                Features
              </a>
              <a href="#" className="text-white/80 hover:text-white font-medium transition-colors">
                Contact
              </a>
            </div>

            {/* Login Button */}
            <div className="flex items-center gap-4">
              <button className="text-white/80 hover:text-white font-medium transition-colors hidden sm:block">
                Sign In
              </button>
              <button className="px-5 py-2 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg shadow-black/5">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary-600" />
              <span className="text-lg font-semibold text-gray-900">PlacementPro</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2024 PlacementPro. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
