const API_BASE = 'http://localhost:3000/api';

// Cache for storing recent analysis to avoid redundant calls
const analysisCache = new Map<string, any>();

export const lawLensApi = {
  analyzeDocument: async (file: File | null, signal?: AbortSignal) => {
    // If no file but demo is requested, we send a dummy text to trigger mock
    if (!file) {
      const cacheKey = 'DEMO_DOC';
      if (analysisCache.has(cacheKey)) return analysisCache.get(cacheKey);

      const response = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: "MOCK_DOCUMENT_TEXT" }),
        signal
      });
      const data = await response.json();
      analysisCache.set(cacheKey, data.data);
      return data.data;
    }

    const formData = new FormData();
    formData.append('document', file);
    
    const cacheKey = file.name + file.size;
    if (analysisCache.has(cacheKey)) return analysisCache.get(cacheKey);

    const response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      body: formData,
      signal
    });

    if (!response.ok) throw new Error('Analysis failed');
    const data = await response.json();
    analysisCache.set(cacheKey, data.data);
    return data.data;
  },

  compareDocuments: async (signal?: AbortSignal) => {
    // For MVP Demo, we just trigger the compare endpoint
    const response = await fetch(`${API_BASE}/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ textA: 'A', textB: 'B' }),
      signal
    });
    
    if (!response.ok) throw new Error('Comparison failed');
    const data = await response.json();
    return data.data;
  },

  askQuestion: async (query: string, documentContext: string, signal?: AbortSignal) => {
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, documentContext }),
      signal
    });
    
    if (!response.ok) throw new Error('Chat request failed');
    const data = await response.json();
    return data.data.text;
  }
};
