import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  drive: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PlacementDrive',
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  },
  status: {
    type: String,
    enum: ['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Selected', 'Offer Accepted', 'Offer Declined'],
    default: 'Applied'
  },
  currentRound: {
    type: Number,
    default: 0
  },
  rounds: [{
    roundName: String,
    roundNumber: Number,
    status: {
      type: String,
      enum: ['Pending', 'Cleared', 'Failed', 'Not Appeared', 'Scheduled'],
      default: 'Pending'
    },
    scheduledDate: Date,
    conductedDate: Date,
    marks: Number,
    feedback: String,
    conductedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  interviewSchedule: {
    date: Date,
    time: String,
    location: String,
    meetingLink: String,
    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  offer: {
    package: String,
    joiningDate: Date,
    bond: String,
    offerLetter: String,
    offeredAt: Date,
    response: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending'
    },
    responseDate: Date
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date
  }],
  resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  notes: String,
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  source: {
    type: String,
    enum: ['Direct Application', 'Referral', 'Campus Placement', 'Career Fair'],
    default: 'Campus Placement'
  }
}, {
  timestamps: true
})

// Index for efficient queries
applicationSchema.index({ student: 1, drive: 1 }, { unique: true })
applicationSchema.index({ student: 1, status: 1 })
applicationSchema.index({ drive: 1, status: 1 })
applicationSchema.index({ company: 1, status: 1 })

// Pre-save middleware to update lastUpdated
applicationSchema.pre('save', function(next) {
  this.lastUpdated = new Date()
  next()
})

// Method to advance to next round
applicationSchema.methods.advanceRound = function(roundName) {
  this.currentRound += 1
  this.rounds.push({
    roundName,
    roundNumber: this.currentRound,
    status: 'Pending',
    scheduledDate: new Date()
  })
  this.status = 'Under Review'
  return this.save()
}

// Method to update round status
applicationSchema.methods.updateRoundStatus = function(roundNumber, status, feedback) {
  const round = this.rounds.find(r => r.roundNumber === roundNumber)
  if (round) {
    round.status = status
    round.conductedDate = new Date()
    if (feedback) round.feedback = feedback
    
    if (status === 'Failed') {
      this.status = 'Rejected'
    } else if (status === 'Cleared' && this.currentRound === roundNumber) {
      // Check if there are more rounds
      if (this.currentRound < this.rounds.length) {
        this.status = 'Shortlisted'
      } else {
        this.status = 'Selected'
      }
    }
  }
  return this.save()
}

const Application = mongoose.model('Application', applicationSchema)

export default Application
