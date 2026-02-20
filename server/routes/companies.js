import express from 'express'

const router = express.Router()

// Mock companies data
let companies = [
  { id: 1, name: 'Google', industry: 'Technology', location: 'Mountain View, CA', website: 'https://google.com', employees: '10,000+', description: 'Global technology leader', logo: 'G', status: 'Active' },
  { id: 2, name: 'Microsoft', industry: 'Technology', location: 'Redmond, WA', website: 'https://microsoft.com', employees: '5,000+', description: 'Software and cloud computing', logo: 'M', status: 'Active' },
  { id: 3, name: 'Amazon', industry: 'E-commerce', location: 'Seattle, WA', website: 'https://amazon.com', employees: '10,000+', description: 'E-commerce and cloud services', logo: 'A', status: 'Active' },
  { id: 4, name: 'Meta', industry: 'Social Media', location: 'Menlo Park, CA', website: 'https://meta.com', employees: '5,000+', description: 'Social media and VR', logo: 'F', status: 'Active' },
  { id: 5, name: 'Apple', industry: 'Technology', location: 'Cupertino, CA', website: 'https://apple.com', employees: '10,000+', description: 'Consumer electronics and software', logo: 'A', status: 'Active' },
]

// Get all companies
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: companies
  })
})

// Get company by ID
router.get('/:id', (req, res) => {
  const company = companies.find(c => c.id === parseInt(req.params.id))
  
  if (!company) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    })
  }
  
  res.json({
    success: true,
    data: company
  })
})

// Create company
router.post('/', (req, res) => {
  const newCompany = {
    id: companies.length + 1,
    ...req.body,
    status: 'Active'
  }
  
  companies.push(newCompany)
  
  res.status(201).json({
    success: true,
    data: newCompany
  })
})

// Update company
router.put('/:id', (req, res) => {
  const index = companies.findIndex(c => c.id === parseInt(req.params.id))
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    })
  }
  
  companies[index] = { ...companies[index], ...req.body }
  
  res.json({
    success: true,
    data: companies[index]
  })
})

// Delete company
router.delete('/:id', (req, res) => {
  const index = companies.findIndex(c => c.id === parseInt(req.params.id))
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Company not found'
    })
  }
  
  companies.splice(index, 1)
  
  res.json({
    success: true,
    message: 'Company deleted successfully'
  })
})

// Get companies by industry
router.get('/industry/:industry', (req, res) => {
  const industryCompanies = companies.filter(c => 
    c.industry.toLowerCase() === req.params.industry.toLowerCase()
  )
  
  res.json({
    success: true,
    data: industryCompanies
  })
})

export default router
