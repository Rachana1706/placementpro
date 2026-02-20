import express from 'express'

const router = express.Router()

// Mock applications data
let applications = [
  { id: 1, studentId: 1, studentName: 'John Smith', jobId: 1, companyName: 'Google', position: 'Software Engineer', applyDate: '2024-01-15', status: 'Pending', round: 0 },
  { id: 2, studentId: 2, studentName: 'Sarah Johnson', jobId: 2, companyName: 'Microsoft', position: 'Data Analyst', applyDate: '2024-01-14', status: 'Selected', round: 3 },
  { id: 3, studentId: 3, studentName: 'Mike Brown', jobId: 3, companyName: 'Amazon', position: 'Cloud Engineer', applyDate: '2024-01-14', status: 'Interview', round: 2 },
  { id: 4, studentId: 4, studentName: 'Emily Davis', jobId: 4, companyName: 'Meta', position: 'Product Manager', applyDate: '2024-01-13', status: 'Rejected', round: 1 },
  { id: 5, studentId: 5, studentName: 'Alex Wilson', jobId: 5, companyName: 'Apple', position: 'iOS Developer', applyDate: '2024-01-12', status: 'Pending', round: 0 },
]

// Get all applications
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: applications
  })
})

// Get application by ID
router.get('/:id', (req, res) => {
  const application = applications.find(a => a.id === parseInt(req.params.id))
  
  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    })
  }
  
  res.json({
    success: true,
    data: application
  })
})

// Create application
router.post('/', (req, res) => {
  const newApplication = {
    id: applications.length + 1,
    ...req.body,
    applyDate: new Date().toISOString().split('T')[0],
    status: 'Pending',
    round: 0
  }
  
  applications.push(newApplication)
  
  res.status(201).json({
    success: true,
    data: newApplication
  })
})

// Update application status
router.put('/:id', (req, res) => {
  const index = applications.findIndex(a => a.id === parseInt(req.params.id))
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    })
  }
  
  applications[index] = { ...applications[index], ...req.body }
  
  res.json({
    success: true,
    data: applications[index]
  })
})

// Delete application
router.delete('/:id', (req, res) => {
  const index = applications.findIndex(a => a.id === parseInt(req.params.id))
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Application not found'
    })
  }
  
  applications.splice(index, 1)
  
  res.json({
    success: true,
    message: 'Application deleted successfully'
  })
})

// Get applications by student
router.get('/student/:studentId', (req, res) => {
  const studentApplications = applications.filter(a => a.studentId === parseInt(req.params.studentId))
  
  res.json({
    success: true,
    data: studentApplications
  })
})

// Get applications by job
router.get('/job/:jobId', (req, res) => {
  const jobApplications = applications.filter(a => a.jobId === parseInt(req.params.jobId))
  
  res.json({
    success: true,
    data: jobApplications
  })
})

// Get applications by status
router.get('/status/:status', (req, res) => {
  const statusApplications = applications.filter(a => a.status.toLowerCase() === req.params.status.toLowerCase())
  
  res.json({
    success: true,
    data: statusApplications
  })
})

export default router
