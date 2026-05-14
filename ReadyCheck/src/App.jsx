import { useState } from 'react';
import Landing from './components/Landing';
import Assessment from './components/Assessment';
import Dashboard from './components/Dashboard';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [assessmentData, setAssessmentData] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
              RC
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800">ReadyCheck</span>
          </div>
          {currentView === 'dashboard' && (
            <button 
              onClick={() => setCurrentView('landing')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Start New Assessment
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {currentView === 'landing' && <Landing onStart={() => setCurrentView('assessment')} />}
        {currentView === 'assessment' && (
          <Assessment onComplete={(data) => {
            setAssessmentData(data);
            setCurrentView('dashboard');
          }} />
        )}
        {currentView === 'dashboard' && <Dashboard data={assessmentData} />}
      </main>
    </div>
  );
}

export default App;
