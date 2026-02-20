import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

// Default demo users
const DEMO_USERS = {
  'admin@placementpro.com': { 
    password: 'admin123', 
    name: 'Admin User', 
    role: 'admin',
    email: 'admin@placementpro.com'
  },
  'student@placementpro.com': { 
    password: 'student123', 
    name: 'Student User', 
    role: 'student',
    email: 'student@placementpro.com',
    cgpa: '8.5',
    branch: 'Computer Science',
    year: '2024'
  },
  'alumni@placementpro.com': { 
    password: 'alumni123', 
    name: 'Alumni User', 
    role: 'alumni',
    email: 'alumni@placementpro.com',
    company: 'Google',
    year: '2021'
  }
}

// Default drives with required skills
const DEFAULT_DRIVES = [
  {
    id: 1,
    company: 'Google',
    role: 'Software Engineer',
    package: '₹45 LPA',
    minCgpa: 8.0,
    allowedBranches: ['Computer Science', 'Information Technology', 'Electronics'],
    requiredSkills: ['Python', 'JavaScript', 'Data Structures', 'Algorithms', 'System Design'],
    lastDate: '2024-03-15',
    interviewDate: '2024-03-20',
    status: 'Active',
    description: 'Looking for talented software engineers',
    applicants: 0
  },
  {
    id: 2,
    company: 'Microsoft',
    role: 'SDE Intern',
    package: '₹35 LPA',
    minCgpa: 7.5,
    allowedBranches: ['Computer Science', 'Information Technology'],
    requiredSkills: ['C++', 'Python', 'SQL', 'Data Structures', 'Algorithms'],
    lastDate: '2024-03-10',
    interviewDate: '2024-03-15',
    status: 'Active',
    description: 'Summer internship for final year students',
    applicants: 0
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'Cloud Engineer',
    package: '₹32 LPA',
    minCgpa: 7.0,
    allowedBranches: ['Computer Science', 'Information Technology', 'Electronics', 'Mechanical'],
    requiredSkills: ['AWS', 'Python', 'Linux', 'Docker', 'Kubernetes'],
    lastDate: '2024-03-20',
    interviewDate: '2024-03-25',
    status: 'Active',
    description: 'Cloud computing roles',
    applicants: 0
  }
]

// Default referrals
const DEFAULT_REFERRALS = [
  {
    id: 1,
    company: 'Google',
    position: 'Software Engineer',
    description: 'Looking for talented engineers',
    link: 'https://careers.google.com',
    postedBy: 'Priya Sharma',
    postedDate: '2024-02-10',
    applicants: 5
  },
  {
    id: 2,
    company: 'Microsoft',
    position: 'Product Manager',
    description: 'PM roles for freshers',
    link: 'https://careers.microsoft.com',
    postedBy: 'Rahul Verma',
    postedDate: '2024-02-08',
    applicants: 3
  }
]

// Default mentorship slots
const DEFAULT_MENTORSHIP = [
  {
    id: 1,
    alumniName: 'Priya Sharma',
    company: 'Google',
    expertise: 'SDE, Machine Learning',
    slots: [
      { day: 'Monday', time: '4:00 PM - 5:00 PM' },
      { day: 'Wednesday', time: '4:00 PM - 5:00 PM' }
    ]
  },
  {
    id: 2,
    alumniName: 'Rahul Verma',
    company: 'Microsoft',
    expertise: 'Product Management, Cloud',
    slots: [
      { day: 'Tuesday', time: '6:00 PM - 7:00 PM' },
      { day: 'Friday', time: '6:00 PM - 7:00 PM' }
    ]
  }
]

// Interview tips
const INTERVIEW_TIPS = [
  'Research the company thoroughly before the interview',
  'Practice coding problems on platforms like LeetCode',
  'Prepare for behavioral questions using the STAR method',
  'Review your projects and be ready to discuss them',
  'Practice system design questions for senior roles',
  'Prepare thoughtful questions to ask the interviewer',
  'Get adequate rest before the interview day',
  'Dress professionally even for virtual interviews'
]

export function AppProvider({ children }) {
  // Auth state
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  // Placement data
  const [drives, setDrives] = useState([])
  const [applications, setApplications] = useState([])
  const [referrals, setReferrals] = useState([])
  const [mentorshipSlots, setMentorshipSlots] = useState([])
  const [interviewSchedule, setInterviewSchedule] = useState([])
  const [studentProfiles, setStudentProfiles] = useState([])

  // Initialize data from localStorage
  useEffect(() => {
    // Check for existing session
    const loggedIn = localStorage.getItem('placementPro_loggedIn')
    const savedUser = localStorage.getItem('placementPro_user')
    
    if (loggedIn === 'true' && savedUser) {
      setIsLoggedIn(true)
      setUser(JSON.parse(savedUser))
    }

    // Load drives
    const savedDrives = localStorage.getItem('placementDrives')
    if (savedDrives) {
      setDrives(JSON.parse(savedDrives))
    } else {
      setDrives(DEFAULT_DRIVES)
      localStorage.setItem('placementDrives', JSON.stringify(DEFAULT_DRIVES))
    }

    // Load applications
    const savedApps = localStorage.getItem('placementApplications')
    if (savedApps) {
      setApplications(JSON.parse(savedApps))
    }

    // Load referrals
    const savedReferrals = localStorage.getItem('placementReferrals')
    if (savedReferrals) {
      setReferrals(JSON.parse(savedReferrals))
    } else {
      setReferrals(DEFAULT_REFERRALS)
      localStorage.setItem('placementReferrals', JSON.stringify(DEFAULT_REFERRALS))
    }

    // Load mentorship slots
    const savedMentorship = localStorage.getItem('placementMentorship')
    if (savedMentorship) {
      setMentorshipSlots(JSON.parse(savedMentorship))
    } else {
      setMentorshipSlots(DEFAULT_MENTORSHIP)
      localStorage.setItem('placementMentorship', JSON.stringify(DEFAULT_MENTORSHIP))
    }

    // Load interview schedule
    const savedSchedule = localStorage.getItem('interviewSchedule')
    if (savedSchedule) {
      setInterviewSchedule(JSON.parse(savedSchedule))
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (drives.length > 0) {
      localStorage.setItem('placementDrives', JSON.stringify(drives))
    }
  }, [drives])

  useEffect(() => {
    localStorage.setItem('placementApplications', JSON.stringify(applications))
  }, [applications])

  useEffect(() => {
    localStorage.setItem('placementReferrals', JSON.stringify(referrals))
  }, [referrals])

  useEffect(() => {
    localStorage.setItem('placementMentorship', JSON.stringify(mentorshipSlots))
  }, [mentorshipSlots])

  useEffect(() => {
    localStorage.setItem('interviewSchedule', JSON.stringify(interviewSchedule))
  }, [interviewSchedule])

  // Auth functions
  const login = (email, password, selectedRole) => {
    const userInfo = DEMO_USERS[email.toLowerCase()]
    
    if (!userInfo || userInfo.password !== password) {
      return { success: false, message: 'Invalid email or password' }
    }

    if (userInfo.role !== selectedRole) {
      return { success: false, message: `Please select ${userInfo.role} role to login` }
    }

    const userData = {
      name: userInfo.name,
      email: userInfo.email,
      role: userInfo.role,
      cgpa: userInfo.cgpa || '',
      branch: userInfo.branch || '',
      year: userInfo.year || '',
      company: userInfo.company || ''
    }

    localStorage.setItem('placementPro_loggedIn', 'true')
    localStorage.setItem('placementPro_role', userInfo.role)
    localStorage.setItem('placementPro_user', JSON.stringify(userData))

    setUser(userData)
    setIsLoggedIn(true)

    return { success: true, user: userData }
  }

  const logout = () => {
    localStorage.removeItem('placementPro_loggedIn')
    localStorage.removeItem('placementPro_role')
    localStorage.removeItem('placementPro_user')
    setUser(null)
    setIsLoggedIn(false)
  }

  const updateUser = (userData) => {
    localStorage.setItem('placementPro_user', JSON.stringify(userData))
    setUser(userData)
  }

  // Drive functions
  const addDrive = (drive) => {
    const newDrive = {
      ...drive,
      id: Date.now(),
      applicants: 0,
      status: 'Active'
    }
    setDrives([newDrive, ...drives])
    return newDrive
  }

  const updateDrive = (id, updates) => {
    setDrives(drives.map(d => d.id === id ? { ...d, ...updates } : d))
  }

  const deleteDrive = (id) => {
    setDrives(drives.filter(d => d.id !== id))
  }

  // Application functions
  const applyToDrive = (drive) => {
    if (!user) return { success: false, message: 'Please login first' }

    // Check for duplicate
    const existing = applications.find(a => a.driveId === drive.id && a.studentEmail === user.email)
    if (existing) {
      return { success: false, message: 'You have already applied to this drive' }
    }

    const newApplication = {
      id: Date.now(),
      driveId: drive.id,
      company: drive.company,
      position: drive.role,
      package: drive.package,
      studentName: user.name,
      studentEmail: user.email,
      studentBranch: user.branch,
      studentCgpa: user.cgpa,
      status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      timeline: [
        { status: 'Applied', date: new Date().toISOString().split('T')[0], note: 'Application submitted' }
      ]
    }

    setApplications([newApplication, ...applications])
    
    // Update drive applicant count
    setDrives(drives.map(d => 
      d.id === drive.id ? { ...d, applicants: (d.applicants || 0) + 1 } : d
    ))

    return { success: true, application: newApplication }
  }

  const updateApplicationStatus = (id, status, note) => {
    setApplications(applications.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status,
          timeline: [...(a.timeline || []), { status, date: new Date().toISOString().split('T')[0], note }]
        }
      }
      return a
    }))
  }

  // Get eligible drives for current student
  const getEligibleDrives = () => {
    if (!user || user.role !== 'student') return []
    
    return drives.filter(drive => {
      const cgpa = parseFloat(user.cgpa || '0')
      return cgpa >= (drive.minCgpa || 0) && 
             (drive.allowedBranches || []).includes(user.branch) &&
             drive.status === 'Active'
    })
  }

  // Get student's applications
  const getMyApplications = () => {
    if (!user) return []
    return applications.filter(a => a.studentEmail === user.email)
  }

  // Referral functions
  const addReferral = (referral) => {
    const newReferral = {
      ...referral,
      id: Date.now(),
      postedBy: user?.name || 'You',
      postedDate: new Date().toISOString().split('T')[0],
      applicants: 0
    }
    setReferrals([newReferral, ...referrals])
    return newReferral
  }

  // Mentorship functions
  const addMentorshipSlot = (slot) => {
    const newSlot = {
      ...slot,
      id: Date.now()
    }
    setMentorshipSlots([...mentorshipSlots, newSlot])
    return newSlot
  }

  const requestMentorship = (slotId, slotTime) => {
    if (!user) return { success: false, message: 'Please login first' }
    
    const requests = JSON.parse(localStorage.getItem('mentorshipRequests') || '[]')
    const newRequest = {
      id: Date.now(),
      slotId,
      slotTime,
      studentName: user.name,
      studentEmail: user.email,
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0]
    }
    requests.push(newRequest)
    localStorage.setItem('mentorshipRequests', JSON.stringify(requests))
    return { success: true, request: newRequest }
  }

  // Interview schedule functions
  const addInterviewSchedule = (schedule) => {
    const newSchedule = {
      ...schedule,
      id: Date.now()
    }
    setInterviewSchedule([...interviewSchedule, newSchedule])
    return newSchedule
  }

  // Analytics
  const getAnalytics = () => {
    const totalStudents = studentProfiles.length || 456
    const totalApplications = applications.length
    const placedCount = applications.filter(a => a.status === 'Selected').length
    const placementRate = totalStudents > 0 ? Math.round((placedCount / totalStudents) * 100) : 0
    
    const packages = applications.filter(a => a.package).map(a => parseFloat(a.package.replace(/[^\d]/g, '')))
    const avgPackage = packages.length > 0 ? Math.round(packages.reduce((a, b) => a + b, 0) / packages.length) : 0

    return {
      totalStudents,
      totalApplications,
      placedCount,
      placementRate,
      avgPackage,
      activeDrives: drives.filter(d => d.status === 'Active').length,
      totalCompanies: [...new Set(drives.map(d => d.company))].length
    }
  }

  const value = {
    // Auth
    user,
    isLoggedIn,
    login,
    logout,
    updateUser,
    DEMO_USERS,

    // Drives
    drives,
    addDrive,
    updateDrive,
    deleteDrive,
    getEligibleDrives,

    // Applications
    applications,
    applyToDrive,
    updateApplicationStatus,
    getMyApplications,

    // Referrals
    referrals,
    addReferral,

    // Mentorship
    mentorshipSlots,
    addMentorshipSlot,
    requestMentorship,

    // Interview
    interviewSchedule,
    addInterviewSchedule,

    // Analytics
    getAnalytics,
    INTERVIEW_TIPS
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
