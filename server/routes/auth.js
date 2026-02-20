import express from 'express'
import User from '../models/User.js'

const router = express.Router()

// POST /api/auth/login - Login with email/password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    // Find user by email (include password for comparison)
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Compare password
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save({ validateBeforeSave: false })

    // Return user data without password
    const userData = user.getPublicProfile()

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        role: userData.role,
        token: 'jwt-token-placeholder-' + user._id
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    })
  }
})

// POST /api/auth/register - Register new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, profile } = req.body

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required'
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || 'student',
      profile: profile || {}
    })

    await user.save()

    // Return user data without password
    const userData = user.getPublicProfile()

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: userData
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    })
  }
})

// GET /api/auth/me - Get current user
router.get('/me', async (req, res) => {
  try {
    const { authorization } = req.headers
    
    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const userId = authorization.replace('Bearer jwt-token-placeholder-', '')
    
    const mockUsers = {
      '1': { _id: '1', name: 'Admin User', email: 'admin@placementpro.com', role: 'admin' },
      '2': { _id: '2', name: 'John Doe', email: 'student@placementpro.com', role: 'student' },
      '3': { _id: '3', name: 'Alumni User', email: 'alumni@placementpro.com', role: 'alumni' }
    }

    const user = mockUsers[userId] || mockUsers['1']

    res.json({
      success: true,
      data: user
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
})

export default router
