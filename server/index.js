import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;
const TARGET_DIR = 'G:\\My Drive\\Estimates\\generated';

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Ensure directory exists
if (!fs.existsSync(TARGET_DIR)) {
    try {
        fs.mkdirSync(TARGET_DIR, { recursive: true });
    } catch (err) {
        console.error('Warning: Could not create target directory. Please ensure G: is mounted.');
    }
}

app.post('/generate-pdf', async (req, res) => {
    const { html, fileName, css } = req.body;

    if (!html) {
        return res.status(400).send('HTML content is required');
    }

    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        // Inject styles + content
        const fullHTML = `
            <html>
                <head>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
                        ${css}
                        body { background: white !important; }
                    </style>
                </head>
                <body>
                    ${html}
                </body>
            </html>
        `;

        await page.setContent(fullHTML, { waitUntil: 'networkidle0' });
        
        // Remove only characters invalid for Windows filenames
        const safeFileName = fileName.replace(/[<>:"/\\|?*]+/g, '_') + '.pdf';
        const filePath = path.join(TARGET_DIR, safeFileName);

        await page.pdf({
            path: filePath,
            format: 'A4',
            printBackground: true,
            margin: { top: '20mm', right: '20mm', bottom: '20mm', left: '20mm' }
        });

        await browser.close();
        console.log(`PDF saved: ${filePath}`);
        
        res.json({ success: true, path: filePath });
    } catch (error) {
        console.error('PDF Generation Error:', error);
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`PDF Bridge Server running on http://localhost:${PORT}`);
    console.log(`Target Directory: ${TARGET_DIR}`);
});
