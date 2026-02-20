import { useState, useEffect, useRef } from 'react'
import { 
  User, 
  Briefcase, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronRight,
  Download,
  X,
  Mail,
  Phone,
  GraduationCap,
  Award,
  Sparkles,
  BookOpen,
  Building2,
  Target,
  TrendingUp,
  Bookmark,
  ArrowRight,
  Check
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import html2pdf from 'html2pdf.js'

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

// Skill improvement suggestions database
const SKILL_SUGGESTIONS = {
  'React': { course: 'React - The Complete Guide', platform: 'Udemy', topic: 'Learn React Hooks & Advanced Concepts' },
  'Angular': { course: 'Angular - The Complete Guide', platform: 'Udemy', topic: 'Master Angular Components & Services' },
  'Vue': { course: 'Vue.js 3 Complete Guide', platform: 'Udemy', topic: 'Vue Composition API & Pinia' },
  'Node.js': { course: 'Node.js Developer Course', platform: 'Udemy', topic: 'Express.js & REST APIs' },
  'Python': { course: 'Python for Everybody', platform: 'Coursera', topic: 'Python Basics to Advanced' },
  'Java': { course: 'Java Programming Masterclass', platform: 'Udemy', topic: 'OOPs & Collections' },
  'JavaScript': { course: 'JavaScript: The Complete Guide', platform: 'Udemy', topic: 'ES6+ Features & Async Programming' },
  'Machine Learning': { course: 'Machine Learning by Andrew Ng', platform: 'Coursera', topic: 'ML Algorithms & Applications' },
  'AWS': { course: 'AWS Solutions Architect', platform: 'AWS Training', topic: 'Cloud Computing Fundamentals' },
  'Azure': { course: 'Microsoft Azure Fundamentals', platform: 'Microsoft Learn', topic: 'Cloud Services & Deployment' },
  'Docker': { course: 'Docker Mastery', platform: 'Udemy', topic: 'Containerization & Orchestration' },
  'Kubernetes': { course: 'Kubernetes for Developers', platform: 'Udemy', topic: 'Container Orchestration' },
  'SQL': { course: 'Complete SQL Bootcamp', platform: 'Udemy', topic: 'Database Design & Queries' },
  'MongoDB': { course: 'MongoDB Complete Developer Guide', platform: 'Udemy', topic: 'NoSQL Database Design' },
  'Git': { course: 'Git Complete Guide', platform: 'Udemy', topic: 'Version Control Best Practices' },
  'System Design': { course: 'System Design Interview', platform: 'Exponent', topic: 'Scalable Architecture' },
  'Data Structures': { course: 'Data Structures & Algorithms', platform: 'GeeksforGeeks', topic: 'DSA for Placements' },
  'Algorithms': { course: 'Algorithms Specialization', platform: 'Coursera', topic: 'Algorithm Design & Analysis' },
  'DevOps': { course: 'DevOps Engineering', platform: 'Coursera', topic: 'CI/CD & Automation' },
  'TypeScript': { course: 'TypeScript Essential Training', platform: 'LinkedIn Learning', topic: 'Type Safety & Generics' },
  'Linux': { course: 'Linux Administration', platform: 'Udemy', topic: 'Linux Command Line' },
  'C++': { course: 'C++ Programming Masterclass', platform: 'Udemy', topic: 'STL & Advanced C++' }
}

const DEFAULT_SUGGESTION = { course: 'Online Learning Platform', platform: 'Coursera/Udemy', topic: 'Practice through projects and tutorials' }

function StudentPortal() {
  const { 
    user, 
    updateUser,
    drives, 
    applyToDrive, 
    getEligibleDrives,
    getMyApplications,
    applications,
    mentorshipSlots,
    requestMentorship
  } = useApp()

  const resumeRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState('drives')
  const [eligibleDrives, setEligibleDrives] = useState([])
  const [myApplications, setMyApplications] = useState([])
  const [showProfileForm, setShowProfileForm] = useState(false)
  const [applyStatus, setApplyStatus] = useState({})
  const [mentorshipRequest, setMentorshipRequest] = useState({})
  
  // Skill Gap Analysis State
  const [showSkillGapModal, setShowSkillGapModal] = useState(false)
  const [selectedDrive, setSelectedDrive] = useState(null)
  const [skillAnalysis, setSkillAnalysis] = useState(null)
  const [eligibilityWarning, setEligibilityWarning] = useState(null)

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    branch: '',
    year: '',
    cgpa: '',
    location: '',
    skills: '',
    projects: '',
    achievements: ''
  })

  // Sync profileData with user from context
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        branch: user.branch || '',
        year: user.year || '',
        cgpa: user.cgpa || '',
        location: user.location || '',
        skills: Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ''),
        projects: user.projects || '',
        achievements: user.achievements || ''
      })
    }
  }, [user])

  useEffect(() => {
    setEligibleDrives(getEligibleDrives())
    setMyApplications(getMyApplications())
  }, [drives, applications, user])

  // Analyze skills - compares user skills with required skills
  const analyzeSkillGap = (drive, currentUser) => {
    if (!currentUser) return null
    
    // Get user skills as array
    const userSkills = currentUser.skills || []
    const userSkillsArray = Array.isArray(userSkills) 
      ? userSkills.map(s => s.toLowerCase().trim()) 
      : String(userSkills).split(',').map(s => s.toLowerCase().trim()).filter(s => s)
    
    // Get required skills from drive
    const requiredSkills = drive.requiredSkills || []
    const requiredSkillsArray = requiredSkills.map(s => s.toLowerCase().trim())
    
    // Find matching and missing skills
    const matchingSkills = []
    const missingSkills = []
    
    requiredSkillsArray.forEach(skill => {
      const isMatched = userSkillsArray.some(userSkill => 
        userSkill.includes(skill) || skill.includes(userSkill)
      )
      if (isMatched) {
        matchingSkills.push(skill)
      } else {
        missingSkills.push(skill)
      }
    })
    
    // Calculate percentage
    const matchPercentage = requiredSkillsArray.length > 0 
      ? Math.round((matchingSkills.length / requiredSkillsArray.length) * 100)
      : 100
    
    // Get suggestions for missing skills
    const suggestions = missingSkills.map(skill => {
      const skillKey = Object.keys(SKILL_SUGGESTIONS).find(k => 
        k.toLowerCase() === skill || skill.includes(k.toLowerCase())
      )
      const suggestion = skillKey ? SKILL_SUGGESTIONS[skillKey] : DEFAULT_SUGGESTION
      return { skill: skill.charAt(0).toUpperCase() + skill.slice(1), ...suggestion }
    })
    
    return {
      matchingSkills: matchingSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
      missingSkills: missingSkills.map(s => s.charAt(0).toUpperCase() + s.slice(1)),
      matchPercentage,
      suggestions,
      totalRequired: requiredSkillsArray.length,
      totalMatched: matchingSkills.length
    }
  }

  // Check eligibility
  const checkEligibility = (drive, currentUser) => {
    if (!currentUser) return ['Please login first']
    
    const warnings = []
    const studentCgpa = parseFloat(currentUser.cgpa) || 0
    const minCgpa = parseFloat(drive.minCgpa) || 0
    
    if (studentCgpa < minCgpa) {
      warnings.push(`Your CGPA (${studentCgpa}) is below the required minimum (${minCgpa})`)
    }
    
    if (currentUser.branch && !drive.allowedBranches?.includes(currentUser.branch)) {
      warnings.push(`Your branch (${currentUser.branch}) is not eligible for this drive`)
    }
    
    return warnings.length > 0 ? warnings : null
  }

  const handleApply = (drive) => {
    // Use user from context directly
    const currentUser = user
    
    // Check eligibility
    const warnings = checkEligibility(drive, currentUser)
    
    if (warnings) {
      setEligibilityWarning(warnings)
      setSelectedDrive(drive)
      setSkillAnalysis(analyzeSkillGap(drive, currentUser))
      setShowSkillGapModal(true)
      return
    }
    
    // If eligible, show skill gap analysis
    const analysis = analyzeSkillGap(drive, currentUser)
    setSkillAnalysis(analysis)
    setSelectedDrive(drive)
    setEligibilityWarning(null)
    setShowSkillGapModal(true)
  }

  const confirmApplication = () => {
    if (!selectedDrive || !user) return
    
    setApplyStatus({ ...applyStatus, [selectedDrive.id]: 'applying' })
    
    // Store skill analysis in localStorage
    const skillAnalysisData = {
      driveId: selectedDrive.id,
      analysis: skillAnalysis,
      timestamp: new Date().toISOString()
    }
    
    const existingAnalyses = JSON.parse(localStorage.getItem('placementPro_skillAnalyses') || '[]')
    existingAnalyses.push(skillAnalysisData)
    localStorage.setItem('placementPro_skillAnalyses', JSON.stringify(existingAnalyses))
    
    setTimeout(() => {
      const result = applyToDrive(selectedDrive)
      
      if (result.success) {
        setApplyStatus({ ...applyStatus, [selectedDrive.id]: 'applied' })
        setMyApplications(getMyApplications())
        setTimeout(() => {
          setApplyStatus({ ...applyStatus, [selectedDrive.id]: null })
        }, 3000)
      } else {
        setApplyStatus({ ...applyStatus, [selectedDrive.id]: 'error' })
      }
    }, 500)
    
    setShowSkillGapModal(false)
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    const skillsArray = profileData.skills.split(',').map(s => s.trim()).filter(s => s)
    
    const updatedUser = {
      ...user,
      name: profileData.name,
      phone: profileData.phone,
      branch: profileData.branch,
      year: profileData.year,
      cgpa: profileData.cgpa,
      location: profileData.location,
      skills: skillsArray,
      projects: profileData.projects,
      achievements: profileData.achievements
    }
    
    updateUser(updatedUser)
    setShowProfileForm(false)
  }

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return
    
    setIsDownloading(true)
    
    try {
      const element = resumeRef.current
      const fileName = `${profileData.name || 'student'}_resume.pdf`.replace(/\s+/g, '_').toLowerCase()
      
      const options = {
        margin: 10,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }
      
      await html2pdf().set(options).from(element).save()
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleMentorshipRequest = (slotId, slotTime) => {
    setMentorshipRequest({ ...mentorshipRequest, [slotId]: 'requesting' })
    
    setTimeout(() => {
      const result = requestMentorship(slotId, slotTime)
      if (result.success) {
        setMentorshipRequest({ ...mentorshipRequest, [slotId]: 'requested' })
      } else {
        setMentorshipRequest({ ...mentorshipRequest, [slotId]: 'error' })
      }
    }, 500)
  }

  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Shortlisted': 'bg-blue-100 text-blue-700 border-blue-200',
      'Interview': 'bg-purple-100 text-purple-700 border-purple-200',
      'Selected': 'bg-green-100 text-green-700 border-green-200',
      'Rejected': 'bg-red-100 text-red-700 border-red-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200'
  }

  const hasApplied = (driveId) => {
    return myApplications.some(app => app.driveId === driveId)
  }

  const getSkillsArray = (skillsStr) => {
    if (!skillsStr) return []
    return skillsStr.split(',').map(s => s.trim()).filter(s => s)
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-white/50 backdrop-blur-sm rounded-xl overflow-x-auto">
        {[
          { id: 'drives', label: 'Eligible Drives', icon: Briefcase },
          { id: 'applications', label: 'My Applications', icon: FileText },
          { id: 'resume', label: 'Resume Builder', icon: FileText },
          { id: 'mentorship', label: 'Mentorship', icon: User },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg shadow-primary-500/30'
                : 'text-gray-600 hover:bg-white/50 hover:shadow-md'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {tab.id === 'applications' && myApplications.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                {myApplications.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ELIGIBLE DRIVES TAB */}
      {activeTab === 'drives' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Eligible Placement Drives</h2>
              <p className="text-sm text-gray-500">
                Your Profile - CGPA: {user?.cgpa || 'Not set'}, Branch: {user?.branch || 'Not set'}
              </p>
            </div>
            <button 
              onClick={() => setShowProfileForm(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Update Profile
            </button>
          </div>

          {eligibleDrives.length === 0 ? (
            <div className="card-glass p-8 text-center">
              <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">No Eligible Drives</h3>
              <p className="text-sm text-gray-500 mb-4">Update your profile with CGPA and branch to see eligible drives</p>
              <button 
                onClick={() => setShowProfileForm(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Update Profile
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {eligibleDrives.map((drive) => (
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
                            <Award className="w-3.5 h-3.5" />
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
                        </div>
                        
                        {(drive.requiredSkills || []).length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              Skills:
                            </span>
                            {(drive.requiredSkills || []).slice(0, 5).map((skill) => (
                              <span key={skill} className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                            {(drive.requiredSkills || []).length > 5 && (
                              <span className="px-2 py-0.5 bg-primary-50 text-primary-600 rounded text-xs">
                                +{drive.requiredSkills.length - 5}
                              </span>
                            )}
                          </div>
                        )}
                        
                        <p className="text-sm text-gray-600 mt-2">{drive.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {hasApplied(drive.id) ? (
                        <button disabled className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-medium flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          Applied
                        </button>
                      ) : applyStatus[drive.id] === 'applying' ? (
                        <button disabled className="px-6 py-3 bg-primary-100 text-primary-700 rounded-xl font-medium flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                          Applying...
                        </button>
                      ) : (
                        <button onClick={() => handleApply(drive)} className="btn-primary flex items-center gap-2">
                          Apply Now
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* APPLICATIONS TAB */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">My Applications</h2>
          
          {myApplications.length === 0 ? (
            <div className="card-glass p-8 text-center">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">No Applications Yet</h3>
              <p className="text-sm text-gray-500">Apply to placement drives to see your applications here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myApplications.map((app) => (
                <div key={app.id} className="card-glass-hover">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{app.position}</h3>
                        <p className="text-primary-600">{app.company}</p>
                        <p className="text-sm text-gray-500 mt-1">Applied on: {app.appliedDate}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-xl font-medium border ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RESUME BUILDER TAB */}
      {activeTab === 'resume' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card-glass">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume Builder</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowProfileForm(true) }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="input-field"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="text" value={profileData.email} className="input-field" disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="input-field"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <select
                    value={profileData.branch}
                    onChange={(e) => setProfileData({...profileData, branch: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select Branch</option>
                    {BRANCHES.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={profileData.skills}
                  onChange={(e) => setProfileData({...profileData, skills: e.target.value})}
                  className="input-field"
                  placeholder="React, Node.js, Python, SQL..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Projects</label>
                <textarea
                  value={profileData.projects}
                  onChange={(e) => setProfileData({...profileData, projects: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Describe your projects..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Achievements</label>
                <textarea
                  value={profileData.achievements}
                  onChange={(e) => setProfileData({...profileData, achievements: e.target.value})}
                  className="input-field"
                  rows={2}
                  placeholder="Your achievements..."
                />
              </div>
              <button type="submit" className="btn-primary w-full">
                Save Resume
              </button>
            </form>
          </div>

          <div className="card-glass">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
              <button onClick={handleDownloadPDF} disabled={isDownloading} className="btn-primary flex items-center gap-2">
                {isDownloading ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating...</>
                ) : (
                  <><Download className="w-4 h-4" /> Download PDF</>
                )}
              </button>
            </div>
            
            <div ref={resumeRef} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm" style={{ minHeight: '297mm', width: '210mm', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
              <div className="border-b-2 border-primary-500 pb-4 mb-4">
                <h1 className="text-2xl font-bold text-gray-900">{profileData.name || 'Your Name'}</h1>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                  {profileData.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {profileData.email}</span>}
                  {profileData.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> {profileData.phone}</span>}
                  {profileData.branch && <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {profileData.branch}</span>}
                </div>
              </div>

              {profileData.skills && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Sparkles className="w-4 h-4 text-primary-500" /> Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {getSkillsArray(profileData.skills).map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {profileData.projects && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary-500" /> Projects</h2>
                  <div className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">{profileData.projects}</div>
                </div>
              )}

              {profileData.achievements && (
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2"><Award className="w-4 h-4 text-primary-500" /> Achievements</h2>
                  <div className="text-sm text-gray-700 whitespace-pre-line bg-gray-50 p-3 rounded-lg">{profileData.achievements}</div>
                </div>
              )}

              {!profileData.name && !profileData.skills && !profileData.projects && (
                <div className="text-center py-12 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4" />
                  <p>Start filling the form to see your resume preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MENTORSHIP TAB */}
      {activeTab === 'mentorship' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Available Mentors</h2>
          
          {mentorshipSlots.length === 0 ? (
            <div className="card-glass p-8 text-center">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">No Mentors Available</h3>
              <p className="text-sm text-gray-500">Check back later for mentorship opportunities</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(mentorshipSlots || []).map((slot) => (
                <div key={slot.id} className="card-glass-hover">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-semibold">{(slot.alumniName || '').split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{slot.alumniName}</h3>
                      <p className="text-xs text-gray-600">{slot.expertise}</p>
                      <p className="text-xs text-gray-500">{slot.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mb-3">
                    {(slot.slots || []).map((timeSlot, index) => (
                      <button
                        key={index}
                        onClick={() => handleMentorshipRequest(slot.id, timeSlot.day + ' ' + timeSlot.time)}
                        disabled={mentorshipRequest[slot.id] === 'requested'}
                        className={`w-full py-2 px-3 rounded-lg text-sm ${mentorshipRequest[slot.id] === 'requested' ? 'bg-green-100 text-green-700 cursor-default' : 'bg-gray-50 hover:bg-primary-50 hover:text-primary-700 text-gray-600'}`}
                      >
                        {timeSlot.day} • {timeSlot.time}
                      </button>
                    ))}
                  </div>
                  {mentorshipRequest[slot.id] === 'requested' && (
                    <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Request sent</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Skill Gap Analysis Modal */}
      {showSkillGapModal && skillAnalysis && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-primary-500 to-purple-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="text-white">
                  <h2 className="text-xl font-bold flex items-center gap-2"><Target className="w-5 h-5" /> Skill Gap Analysis</h2>
                  <p className="text-white/80 mt-1">{selectedDrive?.company} - {selectedDrive?.role}</p>
                </div>
                <button onClick={() => setShowSkillGapModal(false)} className="p-2 bg-white/20 hover:bg-white/30 rounded-lg">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Eligibility Warning */}
              {eligibilityWarning && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-700">Eligibility Warning</h3>
                      <ul className="mt-1 text-sm text-red-600 space-y-1">
                        {eligibilityWarning.map((warning, i) => <li key={i}>• {warning}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Eligible confirmation */}
              {!eligibilityWarning && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-green-700">You are eligible to apply!</span>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Skill Match</span>
                  <span className="text-lg font-bold text-primary-600">{skillAnalysis.matchPercentage}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${skillAnalysis.matchPercentage >= 70 ? 'bg-green-500' : skillAnalysis.matchPercentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${skillAnalysis.matchPercentage}%` }}></div>
                </div>
                <p className="text-sm text-gray-500">{skillAnalysis.totalMatched} of {skillAnalysis.totalRequired} required skills matched</p>
              </div>

              {/* Matching Skills */}
              {skillAnalysis.matchingSkills.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Matching Skills ({skillAnalysis.matchingSkills.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillAnalysis.matchingSkills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1"><Check className="w-3 h-3" /> {skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Skills */}
              {skillAnalysis.missingSkills.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-red-500" /> Missing Skills ({skillAnalysis.missingSkills.length})</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillAnalysis.missingSkills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {skillAnalysis.suggestions.length > 0 && (
                <div className="space-y-3">
                 <h3 className="font-semibold text-gray-900 flex items-center gap-2">
   <Bookmark className="w-4 h-4 text-purple-500" />
   Skill Improvement Suggestions
</h3>
                  <div className="space-y-3">
                    {skillAnalysis.suggestions.map((suggestion, i) => (
                      <div key={i} className="p-4 bg-purple-50 border border-purple-100 rounded-xl">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-purple-900">{suggestion.skill}</p>
                            <p className="text-sm text-purple-700 mt-1">{suggestion.topic}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-purple-600">{suggestion.course}</p>
                            <p className="text-xs text-purple-500">{suggestion.platform}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowSkillGapModal(false)} className="btn-secondary flex-1">Cancel</button>
                <button onClick={confirmApplication} className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {eligibilityWarning ? 'Apply Anyway' : 'Confirm Application'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Profile Update Modal */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Update Profile</h2>
              <button onClick={() => setShowProfileForm(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="input-field" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={profileData.email} className="input-field" disabled />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} className="input-field" placeholder="+91 9876543210" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input type="text" value={profileData.location} onChange={(e) => setProfileData({...profileData, location: e.target.value})} className="input-field" placeholder="City, State" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
                  <select required value={profileData.branch} onChange={(e) => setProfileData({...profileData, branch: e.target.value})} className="input-field">
                    <option value="">Select Branch</option>
                    {BRANCHES.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CGPA *</label>
                  <input type="number" step="0.1" min="0" max="10" required value={profileData.cgpa} onChange={(e) => setProfileData({...profileData, cgpa: e.target.value})} className="input-field" placeholder="e.g., 8.5" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                <input type="text" value={profileData.skills} onChange={(e) => setProfileData({...profileData, skills: e.target.value})} className="input-field" placeholder="React, Node.js, Python..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Projects</label>
                <textarea value={profileData.projects} onChange={(e) => setProfileData({...profileData, projects: e.target.value})} className="input-field" rows={2} placeholder="Describe your projects..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowProfileForm(false)} className="btn-secondary flex-1">Cancel</button>
                <button type="submit" className="btn-primary flex-1">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudentPortal
