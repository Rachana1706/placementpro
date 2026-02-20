import express from 'express'

const router = express.Router()

// Mock jobs data
let jobs = [
  { id: 1, companyId: 1, companyName: 'Google', title: 'Software Engineer', type: 'Full-time', location: 'Bangalore, India', salary: '₹25-35 LPA', requirements: 'B.Tech in CS/IT', cgpa: 8.0, bond: '2 years', lastDate: '2024-02-15', status: 'Active', applicants: 45 },
  { id: 2, companyId: 2, companyName: 'Microsoft', title: 'Data Analyst', type: 'Full-time', location: 'Hyderabad, India', salary: '₹18-25 LPA', requirements: 'B.Tech any branch', cgpa: 7.5, bond: '1 year', lastDate: '2024-02-20', status: 'Active', applicants: 32 },
  { id: 3, companyId: 3, companyName: 'Amazon', title: 'Cloud Engineer', type: 'Full-time', location: 'Bangalore, India', salary: '₹20-30 LPA', requirements: 'B.Tech in CS/IT/EC', cgpa: 7.0, bond: '2 years', lastDate: '2024-02-25', status: 'Active', applicants: 58 },
  { id: 4, companyId: 4, companyName: 'Meta', title: 'Product Manager', type: 'Full-time', location: 'Bangalore, India', salary: '₹30-40 LPA', requirements: 'MBA or B.Tech', cgpa: 8.5, bond: '1 year', lastDate: '2024-03-01', status: 'Active', applicants: 28 },
  { id: 5, companyId: 5, companyName: 'Apple', title: 'iOS Developer', type: 'Full-time', location: 'Bangalore, India', salary: '₹28-38 LPA', requirements: 'B.Tech in CS/IT', cgpa: 8.0, bond: '2 years', lastDate: '2024-03-10', status: 'Active', applicants: 35 },
]

// Get all jobs
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: jobs
  })
})

// Get job by ID
router.get('/:id', (req, res) => {
  const job = jobs.find(j => j.id === parseInt(req.params.id))
  
  if (!job) {
    return res.status(404).json({
      success: false,
      message: 'Job not found'
    })
  }
  
  res.json({
    success: true,
    data: job
  })
})

// Create job
router.post('/', (req, res) => {
  const newJob = {
    id: jobs.length + 1,
    ...req.body,
    status: 'Active',
    applicants: 0
  }
  
  jobs.push(newJob)
  
  res.status(201).json({
    success: true,
    data: newJob
  })
})

// Update job
router.put('/:id', (req, res) => {
  const index = jobs.findIndex(j => j.id === parseInt(req.params.id))
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Job not found'
    })
  }
  
  jobs[index] = { ...jobs[index], ...req.body }
  
  res.json({
    success: true,
    data: jobs[index]
  })
})

// Delete job
router.delete('/:id', (req, res) => {
  const index = jobs.findIndex(j => j.id === parseInt(req.params.id))
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Job not found'
    })
  }
  
  jobs.splice(index, 1)
  
  res.json({
    success: true,
    message: 'Job deleted successfully'
  })
})

// Get active jobs
router.get('/status/active', (req, res) => {
  const activeJobs = jobs.filter(j => j.status === 'Active')
  
  res.json({
    success: true,
    data: activeJobs
  })
})

// Get jobs by company
router.get('/company/:companyId', (req, res) => {
  const companyJobs = jobs.filter(j => j.companyId === parseInt(req.params.companyId))
  
  res.json({
    success: true,
    data: companyJobs
  })
})

export default router
