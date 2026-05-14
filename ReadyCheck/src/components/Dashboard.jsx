import { AlertTriangle, CalendarCheck, Target, TrendingUp, ChevronRight, Activity } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const Dashboard = ({ data }) => {
  if (!data || !data.scores) return null;
  const chartData = [
    { subject: 'Technical', A: data.scores.Technical, B: 75, fullMark: 100 },
    { subject: 'Resume', A: data.scores.Resume, B: 65, fullMark: 100 },
    { subject: 'Communication', A: data.scores.Communication, B: 70, fullMark: 100 },
    { subject: 'Portfolio', A: data.scores.Portfolio, B: 60, fullMark: 100 },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const roleFitScore = Math.min(data.overallScore + 5, 98); // Mock JD match

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      
      {/* Header Section */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Target size={14} /> Target: {data.role}
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Interview Readiness Report</h1>
          <p className="text-slate-500">Analysis complete. Here is how recruiters see your profile right now.</p>
        </div>
        
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle className="text-slate-100 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                <circle className={`${getScoreColor(data.overallScore).replace('text-', 'stroke-')} stroke-current transition-all duration-1000 ease-out`} strokeWidth="8" strokeLinecap="round" cx="50" cy="50" r="40" fill="transparent" strokeDasharray={`${(data.overallScore / 100) * 251.2} 251.2`}></circle>
              </svg>
              <span className={`text-4xl font-extrabold ${getScoreColor(data.overallScore)}`}>{data.overallScore}</span>
            </div>
            <span className="text-sm font-bold text-slate-600 mt-2 uppercase tracking-wider">Overall Score</span>
          </div>

          <div className="flex flex-col items-center justify-center">
             <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center border-4 border-white shadow-lg text-blue-600 font-bold text-2xl">
               {roleFitScore}%
             </div>
             <span className="text-sm font-bold text-slate-600 mt-4 uppercase tracking-wider">JD Match</span>
          </div>
        </div>
      </div>

      {/* Grid Layout for Charts & Red Flags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Radar Chart */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-blue-500" /> Dimension Breakdown
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Your Score" dataKey="A" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.5} />
                <Radar name="Peer Average" dataKey="B" stroke="#94a3b8" fill="#cbd5e1" fillOpacity={0.3} />
                <Tooltip wrapperClassName="rounded-lg shadow-lg border-none" />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-2 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Your Score</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-400"></span> Peer Avg</div>
          </div>
        </div>

        {/* Red Flags & Top Gaps */}
        <div className="flex flex-col gap-6">
          <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
            <h3 className="text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} className="text-red-600" /> Critical Red Flags
            </h3>
            <ul className="space-y-3">
              {data.redFlags.map((flag, idx) => (
                <li key={idx} className="flex gap-3 text-red-800 text-sm bg-white/50 p-3 rounded-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  {flag}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex-1">
             <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" /> Top 3 Gaps (Recruiter Impact)
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div><p className="font-semibold text-slate-800">1. Lack of Measurable Impact</p><p className="text-xs text-slate-500">Affects Resume ATS parsing</p></div>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md">High Impact</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <div><p className="font-semibold text-slate-800">2. Communication Structure</p><p className="text-xs text-slate-500">Missing STAR framework</p></div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">Med Impact</span>
              </div>
              <div className="flex justify-between items-center">
                <div><p className="font-semibold text-slate-800">3. GitHub Recency</p><p className="text-xs text-slate-500">No commits in last 45 days</p></div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-md">Med Impact</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-slate-900 rounded-3xl p-8 shadow-xl text-white">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <CalendarCheck className="text-blue-400" size={28} /> Personalized 7-Day Action Plan
            </h3>
            <p className="text-slate-400 mt-1">Generated by Claude 3 based on your specific gaps.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.actionPlan.map((task) => (
            <div key={task.day} className={`p-5 rounded-2xl border ${task.day === 7 ? 'bg-blue-600 border-blue-500' : 'bg-slate-800 border-slate-700'}`}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${task.day === 7 ? 'text-blue-200' : 'text-slate-400'}`}>Day {task.day}</div>
              <h4 className="font-bold text-lg mb-2 leading-tight">{task.title}</h4>
              <p className={`text-sm ${task.day === 7 ? 'text-blue-100' : 'text-slate-400'}`}>{task.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
           <button className="bg-white text-slate-900 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2" onClick={() => alert('Reminder set for 7 days! (Mock)')}>
             Re-assess in 7 days <ChevronRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
