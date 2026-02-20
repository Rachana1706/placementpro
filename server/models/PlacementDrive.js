import mongoose from 'mongoose'

const placementDriveSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  title: {
    type: String,
    required: [true, 'Drive title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  eligibility: {
    cgpa: {
      type: Number,
      default: 0
    },
    branch: [String],
    year: [Number],
    twelfthMarks: Number,
    tenthMarks: Number,
    maxBacklogs: {
      type: Number,
      default: 0
    }
  },
  package: {
    type: String,
    required: [true, 'Package details are required']
  },
  bond: {
    type: String,
    default: 'None'
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Internship', 'Part-time', 'Contract'],
    default: 'Full-time'
  },
  positions: {
    type: Number,
    default: 1
  },
  requirements: [String],
  responsibilities: [String],
  selectionProcess: {
    type: String,
    enum: ['Direct', 'Aptitude Test', 'Technical Round', 'HR Round', 'Group Discussion'],
    default: ['Technical Round', 'HR Round']
  },
  registrationStart: {
    type: Date,
    required: true
  },
  registrationEnd: {
    type: Date,
    required: true
  },
  examDate: Date,
  interviewDate: Date,
  documentsRequired: [String],
  status: {
    type: String,
    enum: ['Draft', 'Upcoming', 'Registration Open', 'Registration Closed', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Draft'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  registeredStudents: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Applied', 'Shortlisted', 'Rejected', 'Selected'],
      default: 'Applied'
    },
    round: {
      type: Number,
      default: 0
    },
    roundStatus: {
      type: String,
      enum: ['Pending', 'Cleared', 'Failed', 'Not Appeared'],
      default: 'Pending'
    },
    notes: String
  }],
  totalApplications: {
    type: Number,
    default: 0
  },
  selectedCandidates: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Index for better query performance
placementDriveSchema.index({ status: 1, registrationEnd: 1 })
placementDriveSchema.index({ company: 1 })

// Virtual for checking if registration is open
placementDriveSchema.virtual('isRegistrationOpen').get(function() {
  const now = new Date()
  return this.status === 'Registration Open' && 
         now >= this.registrationStart && 
         now <= this.registrationEnd
})

// Method to check if student is registered
placementDriveSchema.methods.isStudentRegistered = function(studentId) {
  return this.registeredStudents.some(
    reg => reg.student.toString() === studentId.toString()
  )
}

const PlacementDrive = mongoose.model('PlacementDrive', placementDriveSchema)

export default PlacementDrive
