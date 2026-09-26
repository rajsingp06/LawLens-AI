import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { subject: 'Financial', A: 80, fullMark: 100 },
  { subject: 'Termination', A: 90, fullMark: 100 },
  { subject: 'Liability', A: 60, fullMark: 100 },
  { subject: 'Data Privacy', A: 40, fullMark: 100 },
  { subject: 'Obligations', A: 70, fullMark: 100 },
  { subject: 'Dispute', A: 50, fullMark: 100 },
];

const RiskRadar = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-brand-navy">Risk & Attention Radar</h3>
        <p className="text-sm text-slate-500">Visual representation of document attention areas.</p>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              name="Attention Score"
              dataKey="A"
              stroke="#F59E0B"
              fill="#F59E0B"
              fillOpacity={0.4}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-center space-x-6 text-sm">
        <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-brand-red mr-2"></div> High Attention</div>
        <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-brand-amber mr-2"></div> Review</div>
        <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-brand-green mr-2"></div> Informational</div>
      </div>
    </div>
  );
};

export default RiskRadar;
