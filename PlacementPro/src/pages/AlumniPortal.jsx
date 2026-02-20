import { useState, useEffect } from 'react'
import { 
  Users, 
  Briefcase, 
  Network, 
  MessageCircle,
  Plus,
  Calendar,
  Clock,
  User,
  CheckCircle,
  Sparkles,
  ArrowRight,
  X,
  Send,
  Link as LinkIcon,
  Trash2
} from 'lucide-react'
import { useApp } from '../context/AppContext'

const features = [
  { icon: Users, label: 'Alumni Directory', desc: 'Connect with alumni', color: 'from-blue-500 to-blue-600' },
  { icon: Briefcase, label: 'Jobs Board', desc: 'Post or find jobs', color: 'from-purple-500 to-purple-600' },
  { icon: Network, label: 'Network', desc: 'Expand your network', color: 'from-green-500 to-green-600' },
  { icon: MessageCircle, label: 'Mentorship', desc: 'Connect with mentors', color: 'from-orange-500 to-orange-600' },
]

function AlumniPortal() {
  const { 
    user, 
    referrals, 
    addReferral, 
    mentorshipSlots, 
    addMentorshipSlot 
  } = useApp()

  const [activeTab, setActiveTab] = useState('referrals')
  const [showReferralForm, setShowReferralForm] = useState(false)
  const [showMentorshipForm, setShowMentorshipForm] = useState(false)

  const [newReferral, setNewReferral] = useState({
    company: '',
    position: '',
    description: '',
    link: ''
  })

  const [newMentorship, setNewMentorship] = useState({
    alumniName: user?.name || '',
    company: user?.company || '',
    expertise: '',
    slots: []
  })

  const [newSlot, setNewSlot] = useState({ day: '', time: '' })

  const handlePostReferral = (e) => {
    e.preventDefault()
    addReferral(newReferral)
    setNewReferral({ company: '', position: '', description: '', link: '' })
    setShowReferralForm(false)
  }

  const addSlot = () => {
    if (newSlot.day && newSlot.time) {
      setNewMentorship({
        ...newMentorship,
        slots: [...newMentorship.slots, newSlot]
      })
      setNewSlot({ day: '', time: '' })
    }
  }

  const removeSlot = (index) => {
    setNewMentorship({
      ...newMentorship,
      slots: newMentorship.slots.filter((_, i) => i !== index)
    })
  }

  const handleCreateMentorship = (e) => {
    e.preventDefault()
    addMentorshipSlot(newMentorship)
    setNewMentorship({
      alumniName: user?.name || '',
      company: user?.company || '',
      expertise: '',
      slots: []
    })
    setShowMentorshipForm(false)
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 bg-white/50 backdrop-blur-sm rounded-xl">
        {[
          { id: 'referrals', label: 'Job Referrals', icon: Briefcase },
          { id: 'mentorship', label: 'Mentorship', icon: User },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-primary-500 to-purple-500 text-white shadow-lg shadow-primary-500/30'
                : 'text-gray-600 hover:bg-white/50 hover:shadow-md'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* REFERRALS TAB */}
      {activeTab === 'referrals' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Post Referral Form */}
          <div className="card-glass">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Post Job Referral</h2>
            <form onSubmit={handlePostReferral} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                <input 
                  type="text" 
                  required
                  value={newReferral.company}
                  onChange={(e) => setNewReferral({...newReferral, company: e.target.value})}
                  placeholder="e.g., Google" 
                  className="input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position *</label>
                <input 
                  type="text" 
                  required
                  value={newReferral.position}
                  onChange={(e) => setNewReferral({...newReferral, position: e.target.value})}
                  placeholder="e.g., Software Engineer" 
                  className="input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  rows={3}
                  value={newReferral.description}
                  onChange={(e) => setNewReferral({...newReferral, description: e.target.value})}
                  placeholder="Job description..." 
                  className="input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Referral Link</label>
                <input 
                  type="url"
                  value={newReferral.link}
                  onChange={(e) => setNewReferral({...newReferral, link: e.target.value})}
                  placeholder="https://careers.company.com" 
                  className="input-field" 
                />
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Post Referral
              </button>
            </form>
          </div>

          {/* Recent Referrals */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Referrals</h2>
            {(!referrals || referrals.length === 0) ? (
              <div className="card-glass p-8 text-center">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">No Referrals Yet</h3>
                <p className="text-sm text-gray-500 mb-4">Post a job referral to help students</p>
              </div>
            ) : (
              (referrals || []).map((referral) => (
                <div key={referral.id} className="card-glass-hover group cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold">{referral.company?.[0] || 'C'}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">{referral.position}</h3>
                        <p className="text-sm text-gray-600">{referral.company}</p>
                        <p className="text-xs text-gray-500 mt-1">Posted by {referral.postedBy} on {referral.postedDate}</p>
                        {referral.link && (
                          <a 
                            href={referral.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1 mt-1"
                          >
                            <LinkIcon className="w-3 h-3" />
                            Apply Link
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {referral.applicants || 0} applicants
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MENTORSHIP TAB */}
      {activeTab === 'mentorship' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Create Mentorship Slot */}
          <div className="card-glass">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Create Mentorship Slot</h2>
            <form onSubmit={handleCreateMentorship} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  type="text" 
                  value={newMentorship.alumniName}
                  onChange={(e) => setNewMentorship({...newMentorship, alumniName: e.target.value})}
                  className="input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input 
                  type="text" 
                  value={newMentorship.company}
                  onChange={(e) => setNewMentorship({...newMentorship, company: e.target.value})}
                  placeholder="e.g., Google" 
                  className="input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                <input 
                  type="text" 
                  value={newMentorship.expertise}
                  onChange={(e) => setNewMentorship({...newMentorship, expertise: e.target.value})}
                  placeholder="e.g., SDE, Machine Learning" 
                  className="input-field" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Time Slots</label>
                <div className="flex gap-2">
                  <select 
                    value={newSlot.day}
                    onChange={(e) => setNewSlot({...newSlot, day: e.target.value})}
                    className="input-field flex-1"
                  >
                    <option value="">Select Day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </select>
                  <input 
                    type="time"
                    value={newSlot.time}
                    onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                    className="input-field flex-1"
                  />
                  <button 
                    type="button"
                    onClick={addSlot}
                    className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                {newMentorship.slots.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newMentorship.slots.map((slot, index) => (
                      <span 
                        key={index} 
                        className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-lg text-xs"
                      >
                        {slot.day} {slot.time}
                        <button 
                          type="button"
                          onClick={() => removeSlot(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="btn-primary w-full">
                Create Slot
              </button>
            </form>
          </div>

          {/* Existing Slots */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Your Mentorship Sessions</h2>
            {(!mentorshipSlots || mentorshipSlots.length === 0) ? (
              <div className="card-glass p-8 text-center">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">No Slots Created</h3>
                <p className="text-sm text-gray-500">Create mentorship slots to help students</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {(mentorshipSlots || []).map((slot) => (
                  <div key={slot.id} className="card-glass-hover">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <span className="text-white font-semibold">{(slot.alumniName || '').split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{slot.alumniName}</h3>
                        <p className="text-xs text-gray-600">{slot.expertise} at {slot.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(slot.slots || []).map((timeSlot, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                          {timeSlot.day} {timeSlot.time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <div key={feature.label} className="card-glass-hover group cursor-pointer">
            <div className={`p-3 bg-gradient-to-br ${feature.color} rounded-xl shadow-lg w-fit group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mt-3 group-hover:text-primary-600 transition-colors">{feature.label}</h3>
            <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlumniPortal
