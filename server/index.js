import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { apiLimiter, uploadConfig } from './middleware/security.js';
import { analyzeDocumentAI, compareDocumentsAI, chatWithDocumentAI } from './services/ai.js';
import pdfParse from 'pdf-parse';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'LawLens AI API' });
});

app.post('/api/analyze', uploadConfig.single('document'), async (req, res) => {
  try {
    let documentText = req.body.text || '';
    
    // Fallback document parsing if a file was actually uploaded
    if (req.file) {
      if (req.file.mimetype === 'application/pdf') {
        const pdfData = await pdfParse(req.file.buffer);
        documentText = pdfData.text;
      } else {
        documentText = req.file.buffer.toString('utf-8');
      }
    }

    if (!documentText) {
      // If we are strictly in demo mode, proceed with a dummy string to trigger the mock
      documentText = "MOCK_DOCUMENT_TEXT";
    }

    const analysis = await analyzeDocumentAI(documentText);
    res.json({ success: true, data: analysis });
  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: 'Failed to process document.' });
  }
});

app.post('/api/compare', uploadConfig.array('documents', 2), async (req, res) => {
  try {
    let textA = req.body.textA || "MOCK_A";
    let textB = req.body.textB || "MOCK_B";

    const comparison = await compareDocumentsAI(textA, textB);
    res.json({ success: true, data: comparison });
  } catch (error) {
    console.error("Compare Error:", error);
    res.status(500).json({ error: 'Failed to compare documents.' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { query, documentContext } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required.' });
    }

    const answer = await chatWithDocumentAI(documentContext || 'MOCK_CONTEXT', query);
    res.json({ success: true, data: { text: answer } });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: 'Failed to chat with AI.' });
  }
});

app.listen(port, () => {
  console.log(`LawLens AI Secure Backend running on port ${port}`);
});
