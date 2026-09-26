import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, ShieldAlert, FileSearch } from 'lucide-react';

const UploadPage = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'scanning' | 'extracting' | 'analyzing' | 'done'>('idle');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateProcessing = () => {
    setUploadState('uploading');
    
    // Simulate API steps for hackathon wow factor
    setTimeout(() => setUploadState('scanning'), 1000);
    setTimeout(() => setUploadState('extracting'), 2500);
    setTimeout(() => setUploadState('analyzing'), 4000);
    setTimeout(() => {
      setUploadState('done');
      // Navigate to demo analysis page
      setTimeout(() => navigate('/analysis/demo'), 1000);
    }, 6000);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      simulateProcessing();
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      simulateProcessing();
    }
  };

  const steps = [
    { id: 'uploading', name: 'Uploading document', icon: UploadCloud },
    { id: 'scanning', name: 'Scanning text (OCR)', icon: FileSearch },
    { id: 'extracting', name: 'Extracting clauses & dates', icon: FileText },
    { id: 'analyzing', name: 'Analyzing legal risks', icon: ShieldAlert },
    { id: 'done', name: 'Analysis Complete', icon: CheckCircle2 },
  ];

  const getStepStatus = (stepId: string) => {
    const states = ['idle', 'uploading', 'scanning', 'extracting', 'analyzing', 'done'];
    const currentIndex = states.indexOf(uploadState);
    const stepIndex = states.indexOf(stepId);
    
    if (currentIndex > stepIndex) return 'complete';
    if (currentIndex === stepIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-brand-navy">Analyze a Document</h1>
        <p className="text-slate-500 mt-2">Upload your agreement to get instant AI-powered insights.</p>
      </div>

      <AnimatePresence mode="wait">
        {uploadState === 'idle' ? (
          <motion.div
            key="upload-zone"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
              isDragging ? 'border-brand-electric bg-brand-electric/5' : 'border-slate-300 bg-white hover:border-brand-electric/50 hover:bg-slate-50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mx-auto w-20 h-20 bg-brand-electric/10 rounded-full flex items-center justify-center mb-6">
              <UploadCloud className="h-10 w-10 text-brand-electric" />
            </div>
            
            <h3 className="text-xl font-semibold text-brand-navy mb-2">Drop your legal document here</h3>
            <p className="text-slate-500 mb-8">Supports PDF, DOCX, TXT, and Images up to 20MB</p>
            
            <div className="relative">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
                accept=".pdf,.docx,.doc,.txt,image/*"
              />
              <button className="bg-brand-navy text-white px-8 py-3 rounded-lg font-medium shadow-sm hover:bg-brand-charcoal transition-colors">
                Browse Files
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-500 mb-4">Or try with a sample document</p>
              <button 
                onClick={() => {
                  setFile(new File([""], "Sample Rental Agreement.pdf"));
                  simulateProcessing();
                }}
                className="text-brand-electric text-sm font-medium hover:underline flex items-center justify-center mx-auto"
              >
                <FileText className="h-4 w-4 mr-2" />
                Use "Sample Rental Agreement.pdf" (Demo)
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="processing-zone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm"
          >
            <div className="flex items-center space-x-4 mb-10 pb-6 border-b border-slate-100">
              <div className="h-16 w-16 bg-slate-100 rounded-xl flex items-center justify-center">
                <FileText className="h-8 w-8 text-brand-navy" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-brand-navy">{file?.name}</h3>
                <p className="text-sm text-slate-500">Processing document...</p>
              </div>
            </div>

            <div className="space-y-8 pl-4 border-l-2 border-slate-100 ml-4 relative">
              {steps.map((step) => {
                const status = getStepStatus(step.id);
                return (
                  <div key={step.id} className="relative flex items-center">
                    <div className={`absolute -left-[21px] h-10 w-10 rounded-full border-4 border-white flex items-center justify-center ${
                      status === 'complete' ? 'bg-brand-green text-white' : 
                      status === 'current' ? 'bg-brand-electric text-white animate-pulse' : 
                      'bg-slate-100 text-slate-400'
                    }`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="ml-10">
                      <p className={`font-medium ${
                        status === 'complete' ? 'text-brand-navy' : 
                        status === 'current' ? 'text-brand-electric' : 
                        'text-slate-400'
                      }`}>
                        {step.name}
                      </p>
                      {status === 'current' && (
                        <p className="text-xs text-slate-500 mt-1">Please wait...</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadPage;
