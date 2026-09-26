import request from 'supertest';
import express from 'express';
import { apiLimiter, uploadConfig } from '../middleware/security.js';

const app = express();
app.use(express.json());
app.use('/api', apiLimiter);

app.post('/api/test-upload', uploadConfig.single('document'), (req, res) => {
  res.status(200).json({ success: true });
});

describe('Backend API Security & Validation', () => {
  it('should reject non-allowed file types', async () => {
    const response = await request(app)
      .post('/api/test-upload')
      .attach('document', Buffer.from('console.log("malicious")'), {
        filename: 'script.js',
        contentType: 'application/javascript'
      });
    
    expect(response.status).toBe(500); // Multer error thrown
  });

  it('should allow PDF file types', async () => {
    const response = await request(app)
      .post('/api/test-upload')
      .attach('document', Buffer.from('fake pdf data'), {
        filename: 'contract.pdf',
        contentType: 'application/pdf'
      });
    
    expect(response.status).toBe(200);
  });
});
