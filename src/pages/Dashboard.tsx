import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Clock, MessageSquare, Plus, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { name: 'Documents Analyzed', value: '4', icon: FileText, color: 'text-brand-electric', bg: 'bg-brand-electric/10' },
    { name: 'Important Findings', value: '12', icon: AlertTriangle, color: 'text-brand-amber', bg: 'bg-brand-amber/10' },
    { name: 'Upcoming Deadlines', value: '3', icon: Clock, color: 'text-brand-red', bg: 'bg-brand-red/10' },
    { name: 'Questions Prepared', value: '8', icon: MessageSquare, color: 'text-brand-indigo', bg: 'bg-brand-indigo/10' },
  ];

  const recentDocs = [
    { id: '1', name: 'Sample Rental Agreement.pdf', type: 'Rental', date: 'Today', findings: 4, risk: 'amber' },
    { id: '2', name: 'Employment Contract_v2.docx', type: 'Employment', date: 'Yesterday', findings: 1, risk: 'green' },
    { id: '3', name: 'NDA_TechCorp.pdf', type: 'NDA', date: 'Oct 12, 2026', findings: 7, risk: 'red' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy tracking-tight">Good morning 👋</h1>
          <p className="mt-2 text-slate-500">Welcome back to your Legal Workspace.</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/upload"
            className="inline-flex items-center px-5 py-2.5 bg-brand-electric text-white text-sm font-medium rounded-lg hover:bg-brand-indigo transition-colors shadow-sm"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Analyze New Document
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center"
          >
            <div className={`h-12 w-12 rounded-lg ${stat.bg} flex items-center justify-center mr-4`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="text-2xl font-bold text-brand-navy mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-brand-navy">Recent Documents</h2>
          <button className="text-sm font-medium text-brand-electric hover:text-brand-indigo transition-colors">
            View All
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {recentDocs.map((doc, index) => (
            <motion.div 
              key={doc.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group"
              onClick={() => navigate(`/analysis/${doc.id}`)}
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-brand-navy group-hover:text-brand-electric transition-colors">{doc.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{doc.type} • Analyzed {doc.date}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="hidden md:flex items-center text-sm text-slate-500">
                  <span className="font-medium text-brand-navy mr-1">{doc.findings}</span> findings
                </div>
                <div className="flex items-center">
                  <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                    doc.risk === 'amber' ? 'bg-brand-amber' : 
                    doc.risk === 'red' ? 'bg-brand-red' : 'bg-brand-green'
                  }`} />
                  <span className="text-xs font-medium text-slate-600 capitalize hidden sm:inline-block">
                    {doc.risk === 'amber' ? 'Attention Needed' : doc.risk === 'red' ? 'High Risk' : 'Looks Good'}
                  </span>
                </div>
                <button 
                  className="p-2 text-slate-400 group-hover:text-brand-electric transition-colors bg-white border border-slate-200 rounded-lg group-hover:border-brand-electric/30 shadow-sm group-hover:shadow"
                  aria-label="Open document"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Action Plan preview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden p-6">
        <h2 className="text-lg font-semibold text-brand-navy mb-4">Pending Action Items</h2>
        <div className="space-y-3">
          <div className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-slate-300 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-brand-navy">Review early termination clause</p>
              <p className="text-xs text-slate-500">from NDA_TechCorp.pdf</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle2 className="h-5 w-5 text-slate-300 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-brand-navy">Note down auto-renewal deadline</p>
              <p className="text-xs text-slate-500">from Sample Rental Agreement.pdf</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
