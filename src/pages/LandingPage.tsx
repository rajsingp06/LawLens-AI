import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileSearch, SplitSquareHorizontal, CheckCircle2, ShieldCheck, Clock, MessageSquare } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-brand-offwhite text-brand-charcoal overflow-hidden font-sans selection:bg-brand-electric/30">
      {/* Navbar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-10">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-brand-electric rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg leading-none">L</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-navy">LawLens AI</span>
        </div>
        <div className="space-x-6 flex items-center">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-brand-navy transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-brand-navy transition-colors">How it Works</a>
          <Link to="/upload" className="bg-brand-navy text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-brand-charcoal transition-all shadow-md hover:shadow-lg">
            Try Demo
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-20 pb-32">
        {/* Background glow effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-brand-electric/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-brand-electric/10 text-brand-electric text-sm font-semibold tracking-wide mb-6 border border-brand-electric/20">
                AI-Powered Legal Intelligence
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-brand-navy mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Understand Your Legal Documents.<br className="hidden md:block" /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-electric to-brand-indigo">
                Without the Legal Jargon.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              LawLens AI turns complex legal documents into clear insights, important clauses, timelines, and actionable questions — so you know what deserves attention before speaking with a legal professional.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                to="/upload" 
                className="w-full sm:w-auto bg-brand-electric text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-brand-indigo transition-all shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.4)] flex items-center justify-center group"
              >
                Analyze a Document
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#how-it-works" 
                className="w-full sm:w-auto bg-white text-brand-navy border border-slate-200 px-8 py-4 rounded-full text-base font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm flex items-center justify-center"
              >
                See How It Works
              </a>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Feature Section */}
      <section id="features" className="py-24 bg-white relative z-10 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">From Legal Text to Clear Action</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Upload a document, get immediate AI analysis, uncover hidden risks, and create a concrete action plan.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <FeatureCard 
              icon={<FileSearch className="h-6 w-6 text-brand-electric" />}
              title="Simplify Documents"
              desc="Translates dense legalese into plain English so you understand your obligations instantly."
            />
            <FeatureCard 
              icon={<ShieldCheck className="h-6 w-6 text-brand-green" />}
              title="Detect Important Clauses"
              desc="Highlights high-attention areas, risks, and hidden fees that require your review."
            />
            <FeatureCard 
              icon={<SplitSquareHorizontal className="h-6 w-6 text-brand-indigo" />}
              title="Compare Agreements"
              desc="Upload two versions of a contract and instantly see what was added, removed, or changed."
            />
            <FeatureCard 
              icon={<MessageSquare className="h-6 w-6 text-brand-amber" />}
              title="Ask Questions"
              desc="Chat directly with your document. Ask specific questions and get grounded answers."
            />
            <FeatureCard 
              icon={<Clock className="h-6 w-6 text-brand-red" />}
              title="Track Deadlines"
              desc="Automatically extracts dates and builds a visual timeline of notice periods and renewals."
            />
            <FeatureCard 
              icon={<CheckCircle2 className="h-6 w-6 text-slate-800" />}
              title="Prepare for Consultation"
              desc="Generates a concise brief and smart questions to ask your lawyer, saving you billable hours."
            />
          </div>
        </div>
      </section>
      
      {/* Trust Footer */}
      <footer className="py-8 bg-brand-offwhite text-center border-t border-slate-200">
        <p className="text-sm text-slate-500 max-w-3xl mx-auto px-6">
          <span className="font-semibold text-slate-700">Disclaimer:</span> LawLens AI provides informational assistance and document analysis. It is not a substitute for professional legal advice. Always consult a qualified attorney for legal matters.
        </p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-brand-offwhite/50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:border-slate-200 transition-all duration-300 group">
    <div className="h-12 w-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-brand-navy mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

export default LandingPage;
