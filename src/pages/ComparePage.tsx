import { useState, useEffect, useRef } from 'react';
import { SplitSquareHorizontal, Upload, FileText, ArrowRightLeft, Info, Plus, Minus } from 'lucide-react';
import { cn } from '../components/Layout';
import { lawLensApi } from '../services/api';

interface Difference {
  id: number;
  title: string;
  type: 'added' | 'removed' | 'changed';
  docA: string | null;
  docB: string | null;
  explanation: string;
  whyMatters: string;
}

const ComparePage = () => {
  const [isComparing, setIsComparing] = useState(false);
  const [differences, setDifferences] = useState<Difference[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const simulateComparison = async () => {
    setIsComparing(true);
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    try {
      const data = await lawLensApi.compareDocuments(abortControllerRef.current.signal);
      setDifferences(data.differences);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error("Comparison failed", err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-navy flex items-center">
            <SplitSquareHorizontal className="h-8 w-8 mr-3 text-brand-electric" />
            Compare Agreements
          </h1>
          <p className="text-slate-500 mt-2">Upload two versions of a document to highlight changes and understand their impact.</p>
        </div>
      </div>

      {!isComparing ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Upload Box A */}
            <div className="flex-1 w-full border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-brand-electric transition-colors bg-slate-50 cursor-pointer">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-4" />
              <p className="text-sm font-medium text-brand-navy mb-1">Upload Original Version</p>
              <p className="text-xs text-slate-500">Contract A</p>
            </div>

            <div className="bg-slate-100 rounded-full p-4">
              <ArrowRightLeft className="h-6 w-6 text-slate-400" />
            </div>

            {/* Upload Box B */}
            <div className="flex-1 w-full border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-brand-electric transition-colors bg-slate-50 cursor-pointer">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-4" />
              <p className="text-sm font-medium text-brand-navy mb-1">Upload New Version</p>
              <p className="text-xs text-slate-500">Contract B</p>
            </div>
            
          </div>
          
          <div className="mt-10 flex justify-center">
            <button 
              onClick={simulateComparison}
              className="bg-brand-navy text-white px-8 py-3 rounded-lg font-medium shadow-sm hover:bg-brand-charcoal transition-colors flex items-center"
            >
              Start Comparison (Demo)
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex bg-white rounded-xl border border-slate-200 shadow-sm p-4 overflow-hidden">
            <div className="flex-1 flex items-center justify-center border-r border-slate-200">
              <FileText className="h-5 w-5 text-slate-400 mr-2" />
              <span className="font-medium text-brand-navy text-sm">Employment_Contract_v1.docx</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <FileText className="h-5 w-5 text-brand-electric mr-2" />
              <span className="font-medium text-brand-electric text-sm">Employment_Contract_v2_FINAL.docx</span>
            </div>
          </div>

          <div className="space-y-6">
            {differences.map((diff) => (
              <div key={diff.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center bg-slate-50 justify-between">
                  <div className="flex items-center">
                    <span className={cn(
                      "uppercase text-[10px] font-bold px-2 py-1 rounded mr-3 flex items-center",
                      diff.type === 'added' ? 'bg-brand-green/20 text-brand-green' : 
                      diff.type === 'removed' ? 'bg-brand-red/20 text-brand-red' : 'bg-brand-amber/20 text-brand-amber'
                    )}>
                      {diff.type === 'added' && <Plus className="h-3 w-3 mr-1" />}
                      {diff.type === 'removed' && <Minus className="h-3 w-3 mr-1" />}
                      {diff.type === 'changed' && <ArrowRightLeft className="h-3 w-3 mr-1" />}
                      {diff.type}
                    </span>
                    <h3 className="font-semibold text-brand-navy text-sm">{diff.title}</h3>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-5 md:border-r border-b md:border-b-0 border-slate-100 bg-slate-50/50">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Original (Contract A)</p>
                    <p className={cn(
                      "text-sm font-serif italic",
                      diff.type === 'added' ? "text-slate-400" : diff.type === 'removed' ? "text-brand-red line-through decoration-brand-red/50" : "text-slate-600"
                    )}>
                      {diff.docA || "No equivalent clause in original document."}
                    </p>
                  </div>
                  <div className="flex-1 p-5 bg-white">
                    <p className="text-xs font-semibold text-brand-electric uppercase tracking-wider mb-2">New (Contract B)</p>
                    <p className={cn(
                      "text-sm font-serif italic",
                      diff.type === 'removed' ? "text-slate-400" : diff.type === 'added' ? "text-brand-green bg-brand-green/5 p-1 rounded" : "text-brand-navy bg-brand-amber/5 p-1 rounded"
                    )}>
                      {diff.docB || "Clause was removed in the new document."}
                    </p>
                  </div>
                </div>

                <div className="p-5 border-t border-slate-100 bg-brand-offwhite/50">
                  <div className="flex items-start">
                    <Info className="h-5 w-5 text-brand-electric mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-brand-navy mb-1">{diff.explanation}</p>
                      <p className="text-sm text-slate-600"><span className="font-semibold text-slate-800">Why it matters:</span> {diff.whyMatters}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
