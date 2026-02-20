import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  Building2, 
  Briefcase, 
  Trash2, 
  Edit3,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
  ChevronRight,
  TrendingUp,
  Filter,
  Sparkles
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const BRANCHES = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Mechanical',
  'Civil',
  'Electrical',
  'Chemical',
  'Biotechnology'
]

const COMMON_SKILLS = [
  'Python', 'JavaScript', 'Java', 'C++', 'React', 'Angular', 'Vue',
  'Node.js', 'Express', 'Django', 'Flask', 'SQL', 'MongoDB', 'PostgreSQL',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Git', 'Linux',
  'Machine Learning', 'Data Science', 'TensorFlow', 'PyTorch', 'NLP',
  'System Design', 'Data Structures', 'Algorithms', 'OOPs', 'DBMS',
  'Computer Networks', 'Operating Systems', 'DevOps', 'CI/CD', 'REST APIs',
  'GraphQL', 'TypeScript', 'React Native', 'Flutter', 'iOS', 'Android',
  'UI/UX Design', 'Figma', 'Adobe XD', 'Agile', 'Scrum', 'JIRA'
]

function AdminDashboard() {
  const { 
    drives, 
    addDrive, 
    updateDrive, 
    deleteDrive, 
    applications,
    updateApplicationStatus,
    interviewSchedule,
    addInterviewSchedule,
    getAnalytics 
  } = useApp()

  const [activeTab, setActiveTab] = useState('drives')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showInterviewForm, setShowInterviewForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingDrive, setEditingDrive] = useState(null)
  const [analytics, setAnalytics] = useState({})
  const [skillSearch, setSkillSearch] = useState('')

  const [newDrive, setNewDrive] = useState({
    company: '',
    role: '',
    package: '',
    minCgpa: '',
    allowedBranches: [],
    requiredSkills: [],
    lastDate: '',
    interviewDate: '',
    description: ''
  })

  const [newInterview, setNewInterview] = useState({
    company: '',
    date: '',
    time: '',
    venue: '',
    students: []
  })

  useEffect(() => {
    setAnalytics(getAnalytics())
  }, [drives, applications, getAnalytics])

  const handleCreateDrive = (e) => {
    e.preventDefault()
    addDrive({
      company: newDrive.company,
      role: newDrive.role,
      package: newDrive.package,
      minCgpa: parseFloat(newDrive.minCgpa),
      allowedBranches: newDrive.allowedBranches,
      requiredSkills: newDrive.requiredSkills,
      lastDate: newDrive.lastDate,
      interviewDate: newDrive.interviewDate,
      description: newDrive.description
    })
    
    setNewDrive({
      company: '',
      role: '',
      package: '',
      minCgpa: '',
      allowedBranches: [],
      requiredSkills: [],
      lastDate: '',
      interviewDate: '',
      description: ''
    })
    setShowCreateForm(false)
  }

  const handleUpdateDrive = (e) => {
    e.preventDefault()
    if (editingDrive) {
      updateDrive(editingDrive.id, {
        company: editingDrive.company,
        role: editingDrive.role,
        package: editingDrive.package,
        minCgpa: parseFloat(editingDrive.minCgpa),
        allowedBranches: editingDrive.allowedBranches,
        requiredSkills: editingDrive.requiredSkills || [],
        lastDate: editingDrive.lastDate,
        interviewDate: editingDrive.interviewDate,
        description: editingDrive.description
      })
      setEditingDrive(null)
    }
  }

  const handleCreateInterview = (e) => {
    e.preventDefault()
    addInterviewSchedule(newInterview)
    setNewInterview({
      company: '',
      date: '',
      time: '',
      venue: '',
      students: []
    })
    setShowInterviewForm(false)
  }

  const toggleBranch = (branch) => {
    if (newDrive.allowedBranches.includes(branch)) {
      setNewDrive({
        ...newDrive,
        allowedBranches: newDrive.allowedBranches.filter(b => b !== branch)
      })
    } else {
      setNewDrive({
        ...newDrive,
        allowedBranches: [...newDrive.allowedBranches, branch]
      })
    }
  }

  const toggleSkill = (skill) => {
    if (newDrive.requiredSkills.includes(skill)) {
      setNewDrive({
        ...newDrive,
        requiredSkills: newDrive.requiredSkills.filter(s => s !== skill)
      })
    } else {
      setNewDrive({
        ...newDrive,
        requiredSkills: [...newDrive.requiredSkills, skill]
      })
    }
  }

  const addCustomSkill = () => {
    if (skillSearch.trim() && !newDrive.requiredSkills.includes(skillSearch.trim())) {
      setNewDrive({
        ...newDrive,
        requiredSkills: [...newDrive.requiredSkills, skillSearch.trim()]
      })
      setSkillSearch('')
    }
  }

  const filteredDrives = drives.filter(drive => 
    drive.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    drive.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status) => {
    const styles = {
      'Active': 'bg-green-100 text-green-700',
      'Completed': 'bg-gray-100 text-gray-700',
      'Upcoming': 'bg-blue-100 text-blue-700'
    }
    return styles[status] || 'bg-gray-100 text-gray-700'
  }

  const getApplicationStatusBadge = (status) => {
    const styles = {
      'Applied': 'bg-yellow-100 text-yellow-700',
      'Shortlisted': 'bg-blue-100 text-blue-700',
      'Interview': 'bg-purple-100 text-purple-700',
      'Selected': 'bg-green-100 text-green-700',
      'Rejected': 'bg-red-100 text-red-700'
    }
    return styles[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-white/50 backdrop-blur-sm rounded-xl">
        {[
          { id: 'drives', label: 'Placement Drives', icon: Briefcase },
          { id: 'applications', label: 'Applications', icon: Users },
          { id: 'interviews', label: 'Interviews', icon: Calendar },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg shadow-primary-500/30'
                : 'text-gray-600 hover:bg-white/50 hover:shadow-md'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* DRIVES TAB */}
      {activeTab === 'drives' && (
        <div className="space-y-6">
          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search drives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-11"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowInterviewForm(true)}
                className="btn-secondary flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule Interview
              </button>
              <button 
                onClick={() => setShowCreateForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Drive
              </button>
            </div>
          </div>

          {/* Drive Cards */}
          <div className="grid gap-4">
            {filteredDrives.map((drive) => (
              <div key={drive.id} className="card-glass-hover group">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 flex-shrink-0">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{drive.company}</h3>
                      <p className="text-primary-600 font-medium">{drive.role}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5" />
                          {drive.package}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          Min CGPA: {drive.minCgpa}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Last Date: {drive.lastDate}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(drive.status)}`}>
                          {drive.status}
                        </span>
                      </div>
                      
                      {/* Required Skills Display */}
                      {(drive.requiredSkills || []).length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Skills Required:
                          </span>
                          {(drive.requiredSkills || []).slice(0, 6).map((skill) => (
                            <span key={skill} className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                          {(drive.requiredSkills || []).length > 6 && (
                            <span className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded text-xs">
                              +{drive.requiredSkills.length - 6} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {(drive.allowedBranches || []).map((branch) => (
                          <span key={branch} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            {branch}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center px-4">
                      <p className="text-2xl font-bold text-primary-600">{drive.applicants || 0}</p>
                      <p className="text-xs text-gray-500">Applicants</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => setEditingDrive(drive)}
                        className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteDrive(drive.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPLICATIONS TAB */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">All Applications</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Student</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Company</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Position</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {(applications || []).map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{app.studentName}</p>
                        <p className="text-xs text-gray-500">{app.studentBranch} • CGPA: {app.studentCgpa}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{app.company}</td>
                    <td className="px-4 py-3 text-gray-600">{app.position}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getApplicationStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {app.status === 'Applied' && (
                          <button 
                            onClick={() => updateApplicationStatus(app.id, 'Shortlisted', 'Shortlisted for interview')}
                            className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                          >
                            Shortlist
                          </button>
                        )}
                        {app.status === 'Shortlisted' && (
                          <button 
                            onClick={() => updateApplicationStatus(app.id, 'Interview', 'Called for interview')}
                            className="px-2 py-1 text-xs bg-purple-50 text-purple-600 rounded hover:bg-purple-100"
                          >
                            Schedule
                          </button>
                        )}
                        {app.status === 'Interview' && (
                          <>
                            <button 
                              onClick={() => updateApplicationStatus(app.id, 'Selected', 'Offer accepted')}
                              className="px-2 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100"
                            >
                              Select
                            </button>
                            <button 
                              onClick={() => updateApplicationStatus(app.id, 'Rejected', 'Not selected')}
                              className="px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {(!applications || applications.length === 0) && (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No applications yet</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* INTERVIEWS TAB */}
      {activeTab === 'interviews' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Interview Schedule</h2>
            <button 
              onClick={() => setShowInterviewForm(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Schedule
            </button>
          </div>
          
          <div className="grid gap-4">
            {(interviewSchedule || []).map((schedule) => (
              <div key={schedule.id} className="card-glass-hover">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{schedule.company}</h3>
                      <p className="text-sm text-gray-500">{schedule.date} at {schedule.time}</p>
                      <p className="text-sm text-gray-500">{schedule.venue}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            ))}
            {(!interviewSchedule || interviewSchedule.length === 0) && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No interviews scheduled</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Drive Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Create Placement Drive</h2>
              <button 
                onClick={() => setShowCreateForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleCreateDrive} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={newDrive.company}
                    onChange={(e) => setNewDrive({...newDrive, company: e.target.value})}
                    className="input-field"
                    placeholder="e.g., Google"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                  <input
                    type="text"
                    required
                    value={newDrive.role}
                    onChange={(e) => setNewDrive({...newDrive, role: e.target.value})}
                    className="input-field"
                    placeholder="e.g., Software Engineer"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package (LPA) *</label>
                  <input
                    type="text"
                    required
                    value={newDrive.package}
                    onChange={(e) => setNewDrive({...newDrive, package: e.target.value})}
                    className="input-field"
                    placeholder="e.g., ₹45 LPA"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum CGPA *</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    required
                    value={newDrive.minCgpa}
                    onChange={(e) => setNewDrive({...newDrive, minCgpa: e.target.value})}
                    className="input-field"
                    placeholder="e.g., 8.0"
                  />
                </div>
              </div>
              
              {/* Required Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills *</label>
                
                {/* Selected Skills */}
                {newDrive.requiredSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {newDrive.requiredSkills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm flex items-center gap-1"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className="hover:bg-primary-200 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Add custom skill */}
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={skillSearch}
                    onChange={(e) => setSkillSearch(e.target.value)}
                    className="input-field flex-1"
                    placeholder="Add custom skill..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
                  />
                  <button
                    type="button"
                    onClick={addCustomSkill}
                    className="btn-secondary"
                  >
                    Add
                  </button>
                </div>
                
                {/* Common skills dropdown */}
                <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  <div className="flex flex-wrap gap-1">
                    {COMMON_SKILLS.filter(skill => !newDrive.requiredSkills.includes(skill)).map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        + {skill}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Allowed Branches *</label>
                <div className="grid grid-cols-2 gap-2">
                  {BRANCHES.map((branch) => (
                    <label key={branch} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newDrive.allowedBranches.includes(branch)}
                        onChange={() => toggleBranch(branch)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">{branch}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Date *</label>
                  <input
                    type="date"
                    required
                    value={newDrive.lastDate}
                    onChange={(e) => setNewDrive({...newDrive, lastDate: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interview Date *</label>
                  <input
                    type="date"
                    required
                    value={newDrive.interviewDate}
                    onChange={(e) => setNewDrive({...newDrive, interviewDate: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newDrive.description}
                  onChange={(e) => setNewDrive({...newDrive, description: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Job description..."
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Create Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Drive Modal */}
      {editingDrive && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Edit Placement Drive</h2>
              <button 
                onClick={() => setEditingDrive(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleUpdateDrive} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    value={editingDrive.company}
                    onChange={(e) => setEditingDrive({...editingDrive, company: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    required
                    value={editingDrive.role}
                    onChange={(e) => setEditingDrive({...editingDrive, role: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package (LPA)</label>
                  <input
                    type="text"
                    required
                    value={editingDrive.package}
                    onChange={(e) => setEditingDrive({...editingDrive, package: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum CGPA</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={editingDrive.minCgpa}
                    onChange={(e) => setEditingDrive({...editingDrive, minCgpa: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Date</label>
                  <input
                    type="date"
                    required
                    value={editingDrive.lastDate}
                    onChange={(e) => setEditingDrive({...editingDrive, lastDate: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interview Date</label>
                  <input
                    type="date"
                    required
                    value={editingDrive.interviewDate}
                    onChange={(e) => setEditingDrive({...editingDrive, interviewDate: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingDrive(null)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interview Schedule Modal */}
      {showInterviewForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Schedule Interview</h2>
              <button 
                onClick={() => setShowInterviewForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleCreateInterview} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  required
                  value={newInterview.company}
                  onChange={(e) => setNewInterview({...newInterview, company: e.target.value})}
                  className="input-field"
                  placeholder="Company name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newInterview.date}
                    onChange={(e) => setNewInterview({...newInterview, date: e.target.value})}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    required
                    value={newInterview.time}
                    onChange={(e) => setNewInterview({...newInterview, time: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                <input
                  type="text"
                  required
                  value={newInterview.venue}
                  onChange={(e) => setNewInterview({...newInterview, venue: e.target.value})}
                  className="input-field"
                  placeholder="Interview venue"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInterviewForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
