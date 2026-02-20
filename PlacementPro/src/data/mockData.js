// Mock Data for PlacementPro

// Admin Dashboard Data
export const adminData = {
  placementDrives: [
    { 
      id: 1, 
      company: 'Google', 
      date: '2024-02-15', 
      position: 'Software Engineer', 
      package: '₹45 LPA', 
      status: 'Upcoming',
      applicants: 145,
      eligible: 89
    },
    { 
      id: 2, 
      company: 'Microsoft', 
      date: '2024-02-20', 
      position: 'SDE Intern', 
      package: '₹35 LPA', 
      status: 'Ongoing',
      applicants: 234,
      eligible: 156
    },
    { 
      id: 3, 
      company: 'Amazon', 
      date: '2024-02-25', 
      position: 'Cloud Engineer', 
      package: '₹32 LPA', 
      status: 'Upcoming',
      applicants: 189,
      eligible: 112
    },
    { 
      id: 4, 
      company: 'Meta', 
      date: '2024-01-30', 
      position: 'Product Manager', 
      package: '₹40 LPA', 
      status: 'Completed',
      applicants: 267,
      eligible: 178
    },
    { 
      id: 5, 
      company: 'Apple', 
      date: '2024-03-05', 
      position: 'iOS Developer', 
      package: '₹50 LPA', 
      status: 'Upcoming',
      applicants: 98,
      eligible: 67
    },
  ],
  eligibleStudents: {
    total: 847,
    byBranch: {
      'Computer Science': 312,
      'Information Technology': 245,
      'Electronics': 156,
      'Mechanical': 89,
      'Civil': 45
    },
    byYear: {
      '2024': 456,
      '2025': 391
    }
  },
  notifications: [
    { id: 1, type: 'info', message: 'Google placement drive registrations closing tomorrow', time: '2 hours ago' },
    { id: 2, type: 'success', message: '45 students placed in Amazon drive', time: '1 day ago' },
    { id: 3, type: 'warning', message: 'Resume verification pending for 23 students', time: '2 days ago' },
    { id: 4, type: 'info', message: 'Microsoft interview schedule released', time: '3 days ago' },
  ]
}

// Student Portal Data - will be populated from localStorage
export const studentData = {
  profile: {
    name: '', // Will be set from localStorage
    email: 'student@placementpro.com',
    phone: '+91 9876543210',
    branch: 'Computer Science',
    year: '2024',
    cgpa: '8.5',
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'Machine Learning'],
    resumeUrl: '#',
    location: 'New Delhi, India',
    profileStrength: 85
  },
  applicationTimeline: [],
  recommendedSkills: [
    { name: 'Cloud Computing', demand: '70+' },
    { name: 'System Design', demand: '60+' },
    { name: 'DevOps', demand: '55+' },
    { name: 'Data Structures', demand: '80+' }
  ],
  upcomingDrives: [
    { company: 'Apple', date: '2024-03-05', position: 'iOS Developer', eligibility: 'CGPA >= 8.0' },
    { company: 'Adobe', date: '2024-03-10', position: 'UX Designer', eligibility: 'CGPA >= 7.5' },
    { company: 'Salesforce', date: '2024-03-15', position: 'Sales Engineer', eligibility: 'CGPA >= 7.0' },
  ]
}

// Analytics Data
export const analyticsData = {
  placementStats: {
    totalStudents: 1234,
    placed: 456,
    pending: 234,
    notPlaced: 544,
    placementRate: 37
  },
  branchWisePlacement: [
    { branch: 'Computer Science', placed: 180, total: 312, percentage: 58 },
    { branch: 'IT', placed: 145, total: 245, percentage: 59 },
    { branch: 'Electronics', placed: 78, total: 156, percentage: 50 },
    { branch: 'Mechanical', placed: 35, total: 89, percentage: 39 },
    { branch: 'Civil', placed: 18, total: 45, percentage: 40 },
  ],
  companyVisits: [
    { month: 'Aug', count: 5 },
    { month: 'Sep', count: 8 },
    { month: 'Oct', count: 12 },
    { month: 'Nov', count: 15 },
    { month: 'Dec', count: 10 },
    { month: 'Jan', count: 18 },
    { month: 'Feb', count: 14 },
  ],
  skillGaps: [
    { skill: 'Python', demand: 85, students: 65 },
    { skill: 'JavaScript', demand: 80, students: 70 },
    { skill: 'Machine Learning', demand: 75, students: 45 },
    { skill: 'Cloud Computing', demand: 70, students: 40 },
    { skill: 'Data Structures', demand: 90, students: 75 },
    { skill: 'SQL', demand: 85, students: 80 },
  ],
  topRecruiters: [
    { company: 'Google', hires: 45 },
    { company: 'Microsoft', hires: 38 },
    { company: 'Amazon', hires: 67 },
    { company: 'Meta', hires: 32 },
    { company: 'Apple', hires: 28 },
  ],
  salaryDistribution: [
    { range: '5-10 LPA', count: 89 },
    { range: '10-15 LPA', count: 145 },
    { range: '15-20 LPA', count: 98 },
    { range: '20-30 LPA', count: 67 },
    { range: '30+ LPA', count: 57 },
  ]
}

// Alumni Portal Data
export const alumniData = {
  referrals: [
    { id: 1, company: 'Google', position: 'Software Engineer', eligibility: 'CGPA >= 8.0', lastDate: '2024-02-20', applicants: 23 },
    { id: 2, company: 'Amazon', position: 'SDE', eligibility: 'CGPA >= 7.5', lastDate: '2024-02-25', applicants: 45 },
  ],
  mentorshipBookings: [
    { id: 1, alumni: 'Priya Sharma', company: 'Google', expertise: 'SDE', slots: ['Mon 4-5 PM', 'Wed 4-5 PM'] },
    { id: 2, alumni: 'Rahul Verma', company: 'Microsoft', expertise: 'Full Stack', slots: ['Tue 6-7 PM', 'Fri 6-7 PM'] },
    { id: 3, alumni: 'Ananya Patel', company: 'Amazon', expertise: 'Cloud', slots: ['Thu 5-6 PM', 'Sat 10-11 AM'] },
  ]
}
