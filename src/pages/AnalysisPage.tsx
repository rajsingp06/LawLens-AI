import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, FileText, CheckCircle2, Download, Languages, ExternalLink } from 'lucide-react';
import RiskRadar from '../components/RiskRadar';
import LegalTimeline from '../components/LegalTimeline';
import AskLawLens from '../components/AskLawLens';
import { cn } from '../components/Layout';
import { lawLensApi } from '../services/api';

const AnalysisPage = () => {
  const [activeTab, setActiveTab] = useState('insights');
  const [activeClause, setActiveClause] = useState<number | null>(null);
  
  const [analysisData, setAnalysisData] = useState<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController();
      
      try {
        const data = await lawLensApi.analyzeDocument(null, abortControllerRef.current.signal);
        setAnalysisData(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') console.error(err);
      }
    };
    fetchData();

    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const tabs = [
    { id: 'insights', name: 'Key Insights' },
    { id: 'clauses', name: 'Important Clauses' },
    { id: 'timeline', name: 'Timeline' },
    { id: 'action', name: 'Action Center' },
  ];

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      {/* Left Column: Document Preview */}
      <div className="w-full md:w-5/12 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden hidden md:flex">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center text-sm font-medium text-brand-navy">
            <FileText className="h-4 w-4 mr-2 text-slate-400" />
            Sample Rental Agreement.pdf
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-brand-green/10 text-brand-green px-2 py-1 rounded-md font-medium flex items-center">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Analyzed
            </span>
          </div>
        </div>
        <div className="flex-1 bg-slate-100 p-4 overflow-y-auto relative">
          {/* Mock Document Page */}
          <div className="bg-white mx-auto shadow-sm p-8 min-h-[800px] text-[10px] text-slate-300 font-serif leading-loose">
            <h1 className="text-xl text-slate-800 text-center mb-8 font-bold">RENTAL AGREEMENT</h1>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} className="mb-4">
                <div className="h-2 w-full bg-slate-200 mb-2 rounded"></div>
                <div className="h-2 w-11/12 bg-slate-200 mb-2 rounded"></div>
                <div className="h-2 w-full bg-slate-200 mb-2 rounded"></div>
                <div className="h-2 w-4/5 bg-slate-200 mb-2 rounded"></div>
              </div>
            ))}
            
            {/* Highlighted section demo */}
            <div className={cn(
              "mt-8 p-2 rounded transition-all duration-500",
              activeClause === 1 ? "bg-brand-amber/20 ring-2 ring-brand-amber shadow-md" : "",
              activeClause === 2 ? "bg-brand-red/20 ring-2 ring-brand-red shadow-md" : ""
            )}>
              <h3 className="text-sm text-slate-800 font-bold mb-2">Section {activeClause === 1 ? '12.1' : activeClause === 2 ? '9.2' : 'X.X'}</h3>
              <div className="text-slate-800 text-xs leading-relaxed">
                {activeClause ? analysisData?.clauses?.find((c: any) => c.id === activeClause)?.original : 'Click a clause on the right to highlight it in the document...'}
              </div>
            </div>
            
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={`post-${i}`} className="mt-4">
                <div className="h-2 w-full bg-slate-200 mb-2 rounded"></div>
                <div className="h-2 w-full bg-slate-200 mb-2 rounded"></div>
                <div className="h-2 w-5/6 bg-slate-200 mb-2 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: AI Analysis */}
      <div className="w-full md:w-7/12 flex flex-col h-[calc(100vh-8rem)]">
        {/* Header Tabs */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                  activeTab === tab.id 
                    ? "bg-white text-brand-navy shadow-sm" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center text-xs font-medium text-slate-500 hover:text-brand-navy bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
              <Languages className="h-3 w-3 mr-1.5" /> Translate
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-20">
          
          {activeTab === 'insights' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-semibold text-brand-navy mb-2">Document Overview</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  This is a standard commercial rental agreement. The document outlines the terms for leasing office space, including payment schedules, maintenance responsibilities, and termination conditions. Overall, it is standard, but contains an <span className="font-semibold text-brand-amber">automatic renewal clause</span> and a <span className="font-semibold text-brand-red">strict early termination penalty</span> that require your attention.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RiskRadar />
                <AskLawLens />
              </div>
            </motion.div>
          )}

          {activeTab === 'clauses' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-brand-navy">Important Clauses Found</h3>
                <p className="text-sm text-slate-500">Click any clause to highlight it in the original document.</p>
              </div>
              
              {analysisData?.clauses?.map((clause: any) => (
                <div 
                  key={clause.id}
                  onClick={() => setActiveClause(clause.id)}
                  className={cn(
                    "bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden group",
                    activeClause === clause.id ? "border-brand-electric shadow-md ring-1 ring-brand-electric" : "border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md"
                  )}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className={cn(
                          "h-2 w-2 rounded-full mr-2",
                          clause.importance === 'high' ? "bg-brand-red" : 
                          clause.importance === 'attention' ? "bg-brand-amber" : "bg-brand-green"
                        )} />
                        <h4 className="text-md font-semibold text-brand-navy">{clause.title}</h4>
                      </div>
                      <span className="text-xs text-slate-400 font-medium bg-slate-50 px-2 py-1 rounded flex items-center group-hover:text-brand-electric transition-colors">
                        Page {clause.page} • Sec {clause.section}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </span>
                    </div>

                    <div className="space-y-4 mt-4">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Simple Explanation</span>
                        <p className="text-sm text-slate-700 bg-brand-offwhite p-3 rounded-lg border border-slate-100">
                          {clause.simple}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Original Legal Text</span>
                        <p className="text-xs text-slate-500 font-serif italic pl-3 border-l-2 border-slate-200">
                          "{clause.original}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'timeline' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <LegalTimeline />
            </motion.div>
          )}

          {activeTab === 'action' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-brand-navy">Your Action Plan</h3>
                    <p className="text-sm text-slate-500">Tasks to complete before signing.</p>
                  </div>
                  <button className="flex items-center text-sm font-medium text-brand-electric hover:text-brand-indigo bg-brand-electric/10 px-4 py-2 rounded-lg transition-colors">
                    <Download className="h-4 w-4 mr-2" /> Export Brief
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-brand-red flex items-center mb-3">
                      <AlertTriangle className="h-4 w-4 mr-2" /> High Priority
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start group cursor-pointer">
                        <div className="h-5 w-5 rounded border-2 border-slate-300 mr-3 flex-shrink-0 group-hover:border-brand-electric transition-colors" />
                        <span className="text-sm text-slate-700 group-hover:text-brand-navy">Review the early termination penalty (50% fee) on Page 5.</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-brand-navy flex items-center mb-3">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-slate-400" /> General Prep
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-start group cursor-pointer">
                        <div className="h-5 w-5 rounded border-2 border-slate-300 mr-3 flex-shrink-0 group-hover:border-brand-electric transition-colors" />
                        <span className="text-sm text-slate-700 group-hover:text-brand-navy">Verify if the notice period (30 days) aligns with your timeline.</span>
                      </li>
                      <li className="flex items-start group cursor-pointer">
                        <div className="h-5 w-5 rounded border-2 border-slate-300 mr-3 flex-shrink-0 group-hover:border-brand-electric transition-colors" />
                        <span className="text-sm text-slate-700 group-hover:text-brand-navy">Collect proof of insurance as required by Section 8.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-sm font-bold text-brand-navy mb-3">Questions to Ask a Professional</h4>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <ul className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
                        <li>Is the 50% early termination fee standard for this type of lease in Delaware?</li>
                        <li>Can we negotiate a cap on annual rent increases during the auto-renewal term?</li>
                        <li>Who is explicitly responsible for HVAC maintenance under Section 6?</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
