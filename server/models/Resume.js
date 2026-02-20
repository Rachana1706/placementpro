import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  url: String,
  version: {
    type: Number,
    default: 1
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  verifiedAt: Date,
  parsingStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Completed', 'Failed'],
    default: 'Pending'
  },
  parsedData: {
    summary: String,
    skills: [String],
    education: [{
      degree: String,
      institution: String,
      year: Number,
      percentage: Number
    }],
    experience: [{
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    projects: [{
      name: String,
      description: String,
      technologies: [String]
    }],
    certifications: [{
      name: String,
      issuer: String,
      date: Date
    }]
  },
  atsScore: {
    type: Number,
    default: 0
  },
  atsFeedback: {
    type: String
  },
  keywords: [String],
  downloadCount: {
    type: Number,
    default: 0
  },
  lastDownloaded: Date,
  metadata: {
    format: String,
    pages: Number,
    wordCount: Number
  }
}, {
  timestamps: true
})

// Index for efficient queries
resumeSchema.index({ user: 1 })
resumeSchema.index({ user: 1, isDefault: 1 })
resumeSchema.index({ isVerified: 1 })

// Pre-save middleware to handle default resume
resumeSchema.pre('save', async function(next) {
  if (this.isDefault && this.isModified('isDefault')) {
    // Set all other resumes of this user to non-default
    await this.constructor.updateMany(
      { user: this.user, _id: { $ne: this._id } },
      { isDefault: false }
    )
  }
  next()
})

// Method to mark as default
resumeSchema.methods.markAsDefault = async function() {
  this.isDefault = true
  return this.save()
}

// Method to increment download count
resumeSchema.methods.incrementDownload = async function() {
  this.downloadCount += 1
  this.lastDownloaded = new Date()
  return this.save()
}

// Static method to get user's default resume
resumeSchema.statics.getDefaultResume = function(userId) {
  return this.findOne({ user: userId, isDefault: true })
}

const Resume = mongoose.model('Resume', resumeSchema)

export default Resume
