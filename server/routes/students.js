import express from 'express'

const router = express.Router()

// Mock students data
let students = [
  { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1 234 567 890', branch: 'Computer Science', year: 2024, cgpa: 8.5, twelfth: 85, tenth: 90, backlogs: 0, status: 'Active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1 234 567 891', branch: 'Information Technology', year: 2024, cgpa: 9.0, twelfth: 88, tenth: 92, backlogs: 0, status: 'Active' },
  { id: 3, name: 'Mike Brown', email: 'mike@example.com', phone: '+1 234 567 892', branch: 'Electronics', year: 2024, cgpa: 7.8, twelfth: 80, tenth: 85, backlogs: 1, status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', phone: '+1 234 567 893', branch: 'Computer Science', year: 2025, cgpa: 8.2, twelfth: 82, tenth: 88, backlogs: 0, status: 'Active' },
  { id: 5, name: 'Alex Wilson', email: 'alex@example.com', phone: '+1 234 567 894', branch: 'Mechanical', year: 2024, cgpa: 7.5, twelfth: 78, tenth: 82, backlogs: 0, status: 'Placed' },
]

// Get all students
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: students
  })
})

// Get student by ID
router.get('/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id))
  
  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    })
  }
  
  res.json({
    success: true,
    data: student
  })
})

// Create student
router.post('/', (req, res) => {
  const newStudent = {
    id: students.length + 1,
    ...req.body,
    status: 'Active'
  }
  
  students.push(newStudent)
  
  res.status(201).json({
    success: true,
    data: newStudent
  })
})

// Update student
router.put('/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id))
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    })
  }
  
  students[index] = { ...students[index], ...req.body }
  
  res.json({
    success: true,
    data: students[index]
  })
})

// Delete student
router.delete('/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id))
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student not found'
    })
  }
  
  students.splice(index, 1)
  
  res.json({
    success: true,
    message: 'Student deleted successfully'
  })
})

// Get eligible students based on criteria
router.get('/eligible/criteria', (req, res) => {
  const { cgpa, branch, backlogs } = req.query
  
  let eligible = students.filter(s => {
    if (cgpa && s.cgpa < parseFloat(cgpa)) return false
    if (branch && s.branch !== branch) return false
    if (backlogs && s.backlogs > parseInt(backlogs)) return false
    return true
  })
  
  res.json({
    success: true,
    data: eligible
  })
})

export default router
