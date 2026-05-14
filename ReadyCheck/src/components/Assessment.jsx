import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Upload, Mic, Code, FileText, CheckCircle, Loader2, StopCircle } from 'lucide-react';

const ROLES = ['Software Engineer (SDE)', 'Data Analyst', 'Product Manager (PM)', 'UI/UX Designer'];
const EXP_LEVELS = ['Fresher (0 yrs)', 'Junior (1-2 yrs)', 'Mid (3-5 yrs)', 'Senior (5+ yrs)'];
const TIERS = ['Startup', 'Mid-Size', 'FAANG / Big Tech'];

const Assessment = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', role: '', experience: '', tier: '',
    resume: null,
    githubUrl: '',
    jd: ''
  });
  
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, resume: file.name });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  // Recording mock state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  // Processing mock state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState('');

  const handleNext = () => setStep(s => s + 1);

  const simulateProcessing = () => {
    setIsProcessing(true);
    setProcessStatus('Parsing resume with PyResparser & spaCy...');
    
    setTimeout(() => setProcessStatus('Transcribing voice with OpenAI Whisper...'), 2000);
    setTimeout(() => setProcessStatus('Analyzing GitHub repo quality & recency...'), 4000);
    setTimeout(() => setProcessStatus('Generating action plan with Claude 3...'), 6000);
    
    setTimeout(() => {
      // Logic for communication score based on recording duration
      let communicationScore;
      let communicationFeedback;
      
      if (recordingTime < 10) {
        communicationScore = 30 + Math.random() * 20; // 30-50
        communicationFeedback = 'Voice intro was too short (under 10s). Recruiter lacks detail to assess personality.';
      } else if (recordingTime >= 20 && recordingTime <= 27) {
        communicationScore = 85 + Math.random() * 10; // 85-95 (Ideal)
        communicationFeedback = 'Perfect pace and duration. Answer feels structured and concise.';
      } else if (recordingTime > 27) {
        communicationScore = 60 + Math.random() * 15; // 60-75 (Rambling)
        communicationFeedback = 'Intro approached 30s limit. Risk of rambling or losing recruiter attention.';
      } else {
        communicationScore = 65 + Math.random() * 20; // 65-85
        communicationFeedback = 'Good effort, but could be more punchy with better STAR structure.';
      }

      // Mock result generation
      const result = {
        role: formData.role || 'Software Engineer (SDE)',
        scores: {
          Technical: Math.floor(Math.random() * 30) + 60, // 60-90
          Resume: Math.floor(Math.random() * 40) + 50,    // 50-90
          Communication: Math.round(communicationScore),
          Portfolio: formData.githubUrl ? Math.floor(Math.random() * 30) + 70 : 40
        },
        redFlags: [
          'No measurable impact metrics (e.g., %, $, hours) found in resume bullets.',
          communicationFeedback
        ],
        actionPlan: [
          { day: 1, title: 'Rewrite top 3 resume bullets', desc: 'Use the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z].' },
          { day: 2, title: 'Practice STAR method', desc: 'Draft 2 stories focusing strictly on Situation, Task, Action, Result.' },
          { day: 3, title: 'GitHub cleanup', desc: 'Pin your top 2 repositories and add comprehensive READMEs.' },
          { day: 4, title: 'Mock Interview (Behavioral)', desc: 'Record yourself answering "Tell me about a conflict" without filler words.' },
          { day: 5, title: 'Targeted LeetCode', desc: 'Solve 3 medium Array/String problems related to your target role.' },
          { day: 6, title: 'Update LinkedIn', desc: 'Sync your newly updated resume bullet points to your LinkedIn profile.' },
          { day: 7, title: 'Re-assess on ReadyCheck', desc: 'Take this assessment again to track your improvement.' }
        ]
      };
      
      // Calculate overall score based on role weights
      let techWeight=0.4, resWeight=0.25, commWeight=0.2, portWeight=0.15;
      if (result.role.includes('PM')) {
        techWeight=0.2; commWeight=0.4; // PMs lean communication
      }
      result.overallScore = Math.round(
        result.scores.Technical * techWeight + 
        result.scores.Resume * resWeight + 
        result.scores.Communication * commWeight + 
        result.scores.Portfolio * portWeight
      );

      onComplete(result);
    }, 8000);
  };

  // Mock Recording Timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(t => {
          if (t >= 30) {
            setIsRecording(false);
            setRecordingComplete(true);
            return 30;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordingComplete(true);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
      setRecordingComplete(false);
    }
  };

  if (isProcessing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-8" />
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing your profile</h2>
        <p className="text-slate-500 font-mono bg-slate-100 px-4 py-2 rounded-lg">{processStatus}</p>
        
        <div className="w-full max-w-md mt-8 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-1000 animate-pulse w-full"></div>
        </div>
        <p className="text-xs text-slate-400 mt-4">Running AI models in parallel (ETA: ~10s)</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-in slide-in-from-bottom-4 duration-500">
      
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
          <span>Step {step} of 4</span>
          <span>{step === 1 ? 'Profile' : step === 2 ? 'Resume' : step === 3 ? 'Voice' : 'Portfolio'}</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>
      </div>

      {/* Step 1: Profile */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Let's set your target</h2>
            <p className="text-slate-500 mb-6">We use this to benchmark your scores against peers.</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Your Name</label>
              <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Target Role</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                  <option value="">Select Role</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Experience</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}>
                  <option value="">Select Level</option>
                  {EXP_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Target Company Tier</label>
              <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" value={formData.tier} onChange={e => setFormData({...formData, tier: e.target.value})}>
                <option value="">Select Tier</option>
                {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          
          <div className="pt-4 flex justify-end">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-50" disabled={!formData.name || !formData.role} onClick={handleNext}>
              Next Step <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Resume */}
      {step === 2 && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Upload your Resume</h2>
            <p className="text-slate-500 mb-6">We'll parse this for ATS keywords, action verbs, and formatting.</p>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept=".pdf,.doc,.docx"
          />
          
          <div className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${formData.resume ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 cursor-pointer'}`} onClick={triggerFileInput}>
            {formData.resume ? (
              <div className="flex flex-col items-center text-emerald-600">
                <CheckCircle size={48} className="mb-4" />
                <span className="font-semibold">{formData.resume} attached</span>
                <span className="text-sm mt-1 opacity-80">Click to change file</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-500">
                <Upload size={48} className="mb-4 text-slate-400" />
                <span className="font-semibold text-slate-700">Click to upload PDF</span>
                <span className="text-sm mt-1">Max 5MB</span>
              </div>
            )}
          </div>
          
          <div className="pt-4 flex justify-between">
            <button className="text-slate-500 font-semibold px-4" onClick={() => setStep(1)}>Back</button>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-50" disabled={!formData.resume} onClick={handleNext}>
              Next Step <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Voice */}
      {step === 3 && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">"Tell me about yourself"</h2>
            <p className="text-slate-500 mb-6">Record a quick 30s intro. We'll analyze clarity, filler words, and pace.</p>
          </div>
          
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center">
            
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-lg transition-all ${isRecording ? 'bg-red-100 text-red-600 animate-pulse' : recordingComplete ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-700 cursor-pointer hover:scale-105'}`} onClick={toggleRecording}>
              {isRecording ? <StopCircle size={40} /> : recordingComplete ? <CheckCircle size={40} /> : <Mic size={40} />}
            </div>
            
            <div className="text-2xl font-mono font-bold text-slate-700 mb-2">
              00:{recordingTime.toString().padStart(2, '0')} <span className="text-slate-400 text-lg">/ 00:30</span>
            </div>
            
            <p className="text-sm font-medium text-slate-500 text-center">
              {isRecording ? 'Recording... Tap to stop' : recordingComplete ? 'Recording saved! Tap mic to re-record.' : 'Tap mic to start recording'}
            </p>
          </div>
          
          <div className="pt-4 flex justify-between">
            <button className="text-slate-500 font-semibold px-4" onClick={() => setStep(2)}>Back</button>
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-slate-800 transition-colors disabled:opacity-50" disabled={!recordingComplete} onClick={handleNext}>
              Next Step <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Portfolio & JD */}
      {step === 4 && (
        <div className="space-y-6 animate-in slide-in-from-right-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Final Details</h2>
            <p className="text-slate-500 mb-6">Link your work and (optionally) provide a target job description.</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <Code size={18} /> GitHub or Portfolio Link
              </label>
              <input type="url" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://github.com/username" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
            </div>
            
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                <FileText size={18} /> Target Job Description (Optional)
              </label>
              <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none h-32" placeholder="Paste the job requirements here to get a Role Fit %..." value={formData.jd} onChange={e => setFormData({...formData, jd: e.target.value})}></textarea>
            </div>
          </div>
          
          <div className="pt-4 flex justify-between">
            <button className="text-slate-500 font-semibold px-4" onClick={() => setStep(3)}>Back</button>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200" onClick={simulateProcessing}>
              Run AI Analysis
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Assessment;
