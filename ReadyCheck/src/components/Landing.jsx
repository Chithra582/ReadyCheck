import { ArrowRight, CheckCircle, Clock, BarChart2 } from 'lucide-react';

const Landing = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
      
      {/* Hero Section */}
      <div className="text-center max-w-3xl mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-6 border border-blue-100">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          AI-Powered Interview Evaluator
        </div>
        
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Know your interview readiness in <span className="text-blue-600">under 2 minutes.</span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
          Upload your resume, record a 30-second intro, and drop your portfolio link. Our AI agents will score your profile across 4 dimensions and give you a 7-day action plan. No login required.
        </p>
        
        <button 
          onClick={onStart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 flex items-center gap-2 mx-auto"
        >
          Start Free Assessment <ArrowRight size={20} />
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <FeatureCard 
          icon={<Clock className="text-blue-500" size={24} />}
          title="Lightning Fast"
          desc="Parallel AI agents analyze your profile in 30 seconds."
        />
        <FeatureCard 
          icon={<BarChart2 className="text-indigo-500" size={24} />}
          title="4-Dimension Scoring"
          desc="Technical, Resume, Communication, and Portfolio."
        />
        <FeatureCard 
          icon={<CheckCircle className="text-emerald-500" size={24} />}
          title="Actionable Plan"
          desc="Get a personalized 7-day roadmap to fix critical red flags."
        />
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-200 text-center w-full max-w-4xl">
        <p className="text-sm font-medium text-slate-400">
          &copy; {new Date().getFullYear()} ReadyCheck AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 border border-slate-100">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
