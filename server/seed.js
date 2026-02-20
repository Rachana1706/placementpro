import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placementpro'

const seedUsers = [
  {
    name: 'Admin User',
    email: 'admin@placementpro.com',
    password: 'admin123',
    role: 'admin',
    profile: {
      phone: '+1 234 567 890',
      branch: 'Computer Science',
      year: 2024
    }
  },
  {
    name: 'John Doe',
    email: 'student@placementpro.com',
    password: 'student123',
    role: 'student',
    profile: {
      phone: '+1 234 567 891',
      branch: 'Information Technology',
      year: 2024,
      cgpa: 8.5
    }
  },
  {
    name: 'Alumni User',
    email: 'alumni@placementpro.com',
    password: 'alumni123',
    role: 'alumni',
    profile: {
      phone: '+1 234 567 892',
      branch: 'Computer Science',
      year: 2023
    }
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing users
    await User.deleteMany({})
    console.log('🗑️ Cleared existing users')

    // Create new users
    for (const userData of seedUsers) {
      const user = new User(userData)
      await user.save()
      console.log(`✅ Created user: ${userData.email} (${userData.role})`)
    }

    console.log('\n🎉 Seed completed successfully!')
    console.log('\nTest Users:')
    console.log('  Email: admin@placementpro.com | Password: admin123 | Role: admin')
    console.log('  Email: student@placementpro.com | Password: student123 | Role: student')
    console.log('  Email: alumni@placementpro.com | Password: alumni123 | Role: alumni')

    process.exit(0)
  } catch (error) {
    console.error('❌ Seed error:', error)
    process.exit(1)
  }
}

seedDatabase()
