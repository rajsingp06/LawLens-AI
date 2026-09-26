import { Calendar, AlertCircle } from 'lucide-react';

const events = [
  { id: 1, date: 'Oct 15, 2026', title: 'Payment Due', type: 'critical', desc: 'Initial deposit of $2,000 required.', source: 'Page 2 • Sec 4.1' },
  { id: 2, date: 'Nov 30, 2026', title: 'Notice Deadline', type: 'attention', desc: 'Must give notice to avoid auto-renewal.', source: 'Page 7 • Sec 12.2' },
  { id: 3, date: 'Dec 15, 2026', title: 'Renewal Date', type: 'info', desc: 'Contract automatically renews for 1 year.', source: 'Page 7 • Sec 12.1' },
];

const LegalTimeline = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-semibold text-brand-navy mb-6">Key Dates & Deadlines</h3>
      
      <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
        {events.map((event) => (
          <div key={event.id} className="relative pl-6">
            <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${
              event.type === 'critical' ? 'bg-brand-red' : 
              event.type === 'attention' ? 'bg-brand-amber' : 'bg-brand-green'
            }`} />
            
            <div className="flex items-center text-sm font-semibold text-brand-navy mb-1">
              <Calendar className="h-4 w-4 mr-2 text-slate-400" />
              {event.date}
              <span className={`ml-3 text-xs px-2 py-0.5 rounded-full ${
                event.type === 'critical' ? 'bg-brand-red/10 text-brand-red' : 
                event.type === 'attention' ? 'bg-brand-amber/10 text-brand-amber' : 
                'bg-brand-green/10 text-brand-green'
              }`}>
                {event.title}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 mb-2">{event.desc}</p>
            <div className="flex items-center text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded inline-flex">
              <AlertCircle className="h-3 w-3 mr-1" />
              Source: {event.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegalTimeline;
