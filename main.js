import { COMPANY_INFO } from './src/config/company.js';
import { extractTextFromPDF } from './src/services/pdfService.js';
import { analyzeScope } from './src/services/scopeAnalyzer.js';
import { generateEstimateHTML } from './src/services/estimateGenerator.js';
import { getActiveCertifications, saveCertifications } from './src/config/certifications.js';

document.querySelector('#app').innerHTML = `
  <div class="dashboard-container">
    <header class="header">
      <div class="header-brand">
        <img src="/logo.svg" alt="Mardegan Logo" class="header-logo" />
        <div class="logo">${COMPANY_INFO.cleaning.name.split(' ')[0]} <span>${COMPANY_INFO.cleaning.name.split(' ').slice(1).join(' ')}</span></div>
      </div>
      <nav class="nav">
        <a href="#" class="nav-link active" data-view="dashboard">Estimates</a>
        <a href="#" class="nav-link" data-view="sectors">Sectors</a>
        <a href="#" class="nav-link" data-view="certifications">Certifications</a>
      </nav>
      <div class="header-actions">
        <input type="file" id="pdf-upload" accept="application/pdf" style="display: none;" />
        <button class="btn-primary" onclick="document.getElementById('pdf-upload').click()">Upload Bid PDF</button>
      </div>
    </header>
    
    <main class="main-content">
      <section id="upload-section" class="hero">
        <h1>Read your Construction Bids</h1>
        <p>Upload a PlanHub, BuildingConnect, or GC project file to generate a competitive estimate.</p>
      </section>

      <section id="results-section" class="results-container" style="display: none;">
        <div class="analysis-card">
          <h2>Scope Analysis Results</h2>
          <div id="scope-details" class="scope-grid"></div>
          <div class="sector-selector">
            <label>Select Sector for Estimate:</label>
            <select id="selected-sector">
              <option value="painting">Painting</option>
              <option value="cleaning">Cleaning</option>
              <option value="demolition">Demolition</option>
            </select>
          </div>
          <button id="generate-estimate-btn" class="btn-accent">Generate Professional Estimate</button>
        </div>
      </section>

      <section id="estimate-display" class="estimate-view" style="display: none;">
        <div id="estimate-content"></div>
        <div class="actions">
          <button class="btn-primary" onclick="window.print()">Print / Export PDF</button>
          <button class="btn-secondary" id="back-to-results">Back to Edit</button>
        </div>
      </section>

      <section id="certifications-section" class="view-section" style="display: none;">
        <div class="card">
          <h2>Manage Your Certifications</h2>
          <p>Select the certifications you want to highlight in your professional estimates.</p>
          <div id="certs-list" class="certs-editor-grid"></div>
          <button id="save-certs-btn" class="btn-primary">Save Certifications</button>
        </div>
      </section>
      
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Estimates</h3>
          <p class="value">0</p>
        </div>
        <div class="stat-card">
          <h3>Pending Bids</h3>
          <p class="value">0</p>
        </div>
        <div class="stat-card">
          <h3>Total Value</h3>
          <p class="value">$0.00</p>
        </div>
      </div>
    </main>
  </div>
`;

// Logic for handling PDF upload
document.getElementById('pdf-upload').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const uploadSection = document.getElementById('upload-section');
  const resultsSection = document.getElementById('results-section');
  const scopeDetails = document.getElementById('scope-details');

  uploadSection.innerHTML = `
    <div class="loading-spinner"></div>
    <p>Reading PDF and analyzing scope...</p>
  `;

  try {
    const text = await extractTextFromPDF(file);
    const analysis = analyzeScope(text);

    uploadSection.style.display = 'none';
    resultsSection.style.display = 'block';

    scopeDetails.innerHTML = `
      <div class="scope-item ${analysis.painting ? 'detected' : ''}">
        <span>Painting Sector</span>
        <span class="status">${analysis.painting ? 'Detected ✅' : 'Not Found'}</span>
      </div>
      <div class="scope-item ${analysis.demolition ? 'detected' : ''}">
        <span>Demolition Sector</span>
        <span class="status">${analysis.demolition ? 'Detected ✅' : 'Not Found'}</span>
      </div>
      <div class="scope-item ${analysis.cleaning ? 'detected' : ''}">
        <span>Cleaning Sector</span>
        <span class="status">${analysis.cleaning ? 'Detected ✅' : 'Not Found'}</span>
      </div>
      <div class="scope-item">
        <span>Estimated Sq Ft</span>
        <span class="status">${analysis.sqft || 'Manual Entry Request'}</span>
      </div>
    `;

    // Handle Estimate Generation
    document.getElementById('generate-estimate-btn').onclick = () => {
      const sector = document.getElementById('selected-sector').value;
      const resultsSection = document.getElementById('results-section');
      const estimateDisplay = document.getElementById('estimate-display');
      const estimateContent = document.getElementById('estimate-content');

      resultsSection.style.display = 'none';
      estimateDisplay.style.display = 'block';
      estimateContent.innerHTML = generateEstimateHTML(analysis, sector);
    };

  } catch (error) {
    console.error('Error processing PDF:', error);
    uploadSection.innerHTML = `<h1>Error reading PDF</h1><p>Please try another file.</p>`;
  }
});

// Navigation Logic
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const view = link.getAttribute('data-view');
    
    // Hide all sections
    document.getElementById('upload-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('estimate-display').style.display = 'none';
    document.getElementById('certifications-section').style.display = 'none';
    
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    if (view === 'dashboard') {
      document.getElementById('upload-section').style.display = 'block';
    } else if (view === 'certifications') {
      document.getElementById('certifications-section').style.display = 'block';
      renderCertsEditor();
    }
  });
});

function renderCertsEditor() {
  const certs = getActiveCertifications();
  const certsList = document.getElementById('certs-list');
  certsList.innerHTML = certs.map(cert => `
    <div class="cert-edit-item">
      <input type="checkbox" id="cert-${cert.id}" ${cert.active ? 'checked' : ''} />
      <label for="cert-${cert.id}">${cert.name}</label>
    </div>
  `).join('');
}

document.getElementById('save-certs-btn').onclick = () => {
  const certs = getActiveCertifications();
  const updated = certs.map(cert => ({
    ...cert,
    active: document.getElementById(`cert-${cert.id}`).checked
  }));
  saveCertifications(updated);
  alert('Certifications updated!');
};

document.getElementById('back-to-results').onclick = () => {
  document.getElementById('estimate-display').style.display = 'none';
  document.getElementById('results-section').style.display = 'block';
};
