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
        <a href="#" class="nav-link active" data-view="dashboard">New Bid</a>
        <a href="#" class="nav-link" data-view="history">History</a>
        <a href="#" class="nav-link" data-view="certifications">Certifications</a>
      </nav>
      <div class="header-actions">
        <input type="file" id="pdf-upload" accept="application/pdf" style="display: none;" />
        <button class="btn-primary" onclick="document.getElementById('pdf-upload').click()">Upload Bid PDF</button>
      </div>
    </header>
    
    <main class="main-content">
      <section id="selection-screen" class="view-section">
        <h1 class="hero-title">Select Business Sector</h1>
        <p class="hero-subtitle">Choose the area you want to generate an estimate for today.</p>
        
        <div class="selection-grid">
          <div class="selection-card" data-sector="painting">
            <div class="card-icon">🎨</div>
            <h3>Painting</h3>
            <p>Interior, Exterior & Trim estimates.</p>
          </div>
          <div class="selection-card" data-sector="cleaning">
            <div class="card-icon">🧹</div>
            <h3>Cleaning</h3>
            <p>Post-construction janitorial services.</p>
          </div>
          <div class="selection-card" data-sector="demolition">
            <div class="card-icon">🔨</div>
            <h3>Demolition</h3>
            <p>Structural & debris removal estimates.</p>
          </div>
        </div>
      </section>

      <section id="upload-section" class="hero" style="display: none;">
        <h1 id="upload-title">Read your Construction Bids</h1>
        <p>Upload a PlanHub, BuildingConnect, or GC project file.</p>
      </section>

      <section id="results-section" class="results-container" style="display: none;">
        <div class="analysis-card">
          <h2>Scope Analysis Results</h2>
          <div id="scope-details" class="scope-grid"></div>
          <div class="sector-selector">
            <label>Select Sector for Estimate:</label>
            <select id="selected-sector">
              <option value="painting">Painting</option>
              <option value="cleaning" selected>Cleaning</option>
              <option value="demolition">Demolition</option>
            </select>
          </div>

          <!-- Detailed Cleaning Form (Hidden by default) -->
          <div id="cleaning-details-form" class="details-form">
            <h3>Cleaning Details</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Window Count</label>
                <input type="number" id="window-count" value="0" min="0" />
              </div>
              <div class="form-group">
                <label>Carpet Area (SF)</label>
                <input type="number" id="carpet-sqft" value="0" min="0" />
              </div>
              <div class="form-group">
                <label>Tile Area (SF)</label>
                <input type="number" id="tile-sqft" value="0" min="0" />
              </div>
              <div class="form-group">
                <label>Hardwood Area (SF)</label>
                <input type="number" id="hardwood-sqft" value="0" min="0" />
              </div>
            </div>
            <div class="form-checkboxes">
              <label><input type="checkbox" id="include-rough" checked /> Include Rough Clean</label>
              <label><input type="checkbox" id="include-final" checked /> Include Final Clean</label>
              <label><input type="checkbox" id="include-touchup" checked /> Include Touch-up</label>
            </div>
          </div>

          <!-- Detailed Painting Form (Hidden by default) -->
          <div id="painting-details-form" class="details-form" style="display: none;">
            <h3>Painting Details</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Wall Area (SF)</label>
                <input type="number" id="paint-wall-sqft" value="0" min="0" />
              </div>
              <div class="form-group">
                <label>Ceiling Area (SF)</label>
                <input type="number" id="paint-ceiling-sqft" value="0" min="0" />
              </div>
              <div class="form-group">
                <label>Trim (Linear Ft)</label>
                <input type="number" id="paint-trim-lf" value="0" min="0" />
              </div>
              <div class="form-group">
                <label>Door Count</label>
                <input type="number" id="paint-door-count" value="0" min="0" />
              </div>
            </div>
          </div>

          <!-- Detailed Demolition Form (Hidden by default) -->
          <div id="demolition-details-form" class="details-form" style="display: none;">
            <h3>Demolition Details</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Structural Wall Area (SF)</label>
                <input type="number" id="demo-structural-sqft" value="0" min="0" />
              </div>
              <div class="form-group">
                <label>Flooring Area (SF)</label>
                <input type="number" id="demo-flooring-sqft" value="0" min="0" />
              </div>
              <div class="form-group">
                <label>Dumpsters Needed</label>
                <input type="number" id="demo-dumpster-count" value="1" min="1" />
              </div>
            </div>
          </div>

          <button id="generate-estimate-btn" class="btn-accent">Generate Professional Estimate</button>
        </div>
      </section>

      <section id="estimate-display" class="estimate-view" style="display: none;">
        <div id="save-to-drive-status" class="save-status"></div>
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
      
      <section id="history-section" class="view-section" style="display: none;">
        <div class="card">
          <h2>Estimate History</h2>
          <div id="history-list" class="history-grid">
            <p class="empty-state">No estimates sent yet.</p>
          </div>
        </div>
      </section>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Estimates</h3>
          <p id="stat-total-count" class="value">0</p>
        </div>
        <div class="stat-card">
          <h3>Total Value</h3>
          <p id="stat-total-value" class="value">$0.00</p>
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

      const options = {};
      if (sector === 'cleaning') {
        options.windowCount = parseInt(document.getElementById('window-count').value) || 0;
        options.includeRough = document.getElementById('include-rough').checked;
        options.includeFinal = document.getElementById('include-final').checked;
        options.includeTouchup = document.getElementById('include-touchup').checked;
        options.floors = {
          carpet: parseFloat(document.getElementById('carpet-sqft').value) || 0,
          tile: parseFloat(document.getElementById('tile-sqft').value) || 0,
          hardwood: parseFloat(document.getElementById('hardwood-sqft').value) || 0
        };
      } else if (sector === 'painting') {
        options.wallSqft = parseFloat(document.getElementById('paint-wall-sqft').value) || 0;
        options.ceilingSqft = parseFloat(document.getElementById('paint-ceiling-sqft').value) || 0;
        options.trimLinearFt = parseFloat(document.getElementById('paint-trim-lf').value) || 0;
        options.doorCount = parseInt(document.getElementById('paint-door-count').value) || 0;
      } else if (sector === 'demolition') {
        options.structuralSqft = parseFloat(document.getElementById('demo-structural-sqft').value) || 0;
        options.flooringSqft = parseFloat(document.getElementById('demo-flooring-sqft').value) || 0;
        options.dumpsterCount = parseInt(document.getElementById('demo-dumpster-count').value) || 0;
      }

    const sectorSelect = document.getElementById('selected-sector');
    sectorSelect.value = window.currentSector;
    
    // Set initial visibility
    const cleaningForm = document.getElementById('cleaning-details-form');
    cleaningForm.style.display = sectorSelect.value === 'cleaning' ? 'block' : 'none';

    // Estimate Index Logic (starts at 450)
    let estimateId = parseInt(localStorage.getItem('estimate_index')) || 450;
    options.estimateId = estimateId;

    const { html, totalValue } = generateEstimateHTML(analysis, sector, options);
    estimateContent.innerHTML = html;
    
    // Auto-save to Google Drive
    const clientName = analysis.projectName || 'New Project';
    const sectorCapitalized = sector.charAt(0).toUpperCase() + sector.slice(1);
    const formattedFileName = `${estimateId} - ${clientName} - ${sectorCapitalized}`;
    
    saveToGoogleDrive(html, formattedFileName);

    // Save to history
    saveEstimateToHistory({
      id: estimateId,
      date: new Date().toLocaleDateString(),
      projectName: clientName,
      sector: sectorCapitalized,
      total: totalValue
    });
    
    // Increment index
    localStorage.setItem('estimate_index', estimateId + 1);
    
    updateStats();
    };

  } catch (error) {
    console.error('Error processing PDF:', error);
    const uploadSection = document.getElementById('upload-section');
    uploadSection.innerHTML = `<h1>Error reading PDF</h1><p>Please try another file.</p>`;
  }
});

// Selection Logic
document.querySelectorAll('.selection-card').forEach(card => {
  card.addEventListener('click', () => {
    const sector = card.getAttribute('data-sector');
    window.currentSector = sector;
    
    document.getElementById('selection-screen').style.display = 'none';
    document.getElementById('upload-section').style.display = 'block';
    document.getElementById('upload-title').innerText = `New ${sector.charAt(0).toUpperCase() + sector.slice(1)} Estimate`;
  });
});

// Navigation Logic
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const view = link.getAttribute('data-view');
    
    // Hide all sections
    document.getElementById('selection-screen').style.display = 'none';
    document.getElementById('upload-section').style.display = 'none';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('estimate-display').style.display = 'none';
    document.getElementById('certifications-section').style.display = 'none';
    document.getElementById('history-section').style.display = 'none';
    
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    if (view === 'dashboard') {
      document.getElementById('selection-screen').style.display = 'block';
      updateStats();
    } else if (view === 'history') {
      document.getElementById('history-section').style.display = 'block';
      renderHistory();
    } else if (view === 'certifications') {
      document.getElementById('certifications-section').style.display = 'block';
      renderCertsEditor();
    }
  });
});

function renderCertsEditor() {
  const certs = getActiveCertifications();
  const certsList = document.getElementById('certs-list');
  
  const grouped = certs.reduce((acc, cert) => {
    acc[cert.category] = acc[cert.category] || [];
    acc[cert.category].push(cert);
    return acc;
  }, {});

  certsList.innerHTML = Object.entries(grouped).map(([cat, list]) => `
    <div class="cert-category-group">
      <h4>${cat}</h4>
      ${list.map(cert => `
        <div class="cert-edit-item">
          <input type="checkbox" id="cert-${cert.id}" ${cert.active ? 'checked' : ''} />
          <label for="cert-${cert.id}">${cert.name}</label>
        </div>
      `).join('')}
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
