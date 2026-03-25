import { calculateCleaning } from '../modules/cleaning/calculator.js';
import { calculatePainting } from '../modules/painting/calculator.js';
import { calculateDemolition } from '../modules/demolition/calculator.js';
import { getActiveCertifications } from '../config/certifications.js';
import { COMPANY_INFO } from '../config/company.js';

export const generateEstimateHTML = (analysis, sector, options = {}) => {
  const company = sector === 'painting' ? COMPANY_INFO.painting : 
                  sector === 'cleaning' ? COMPANY_INFO.cleaning : 
                  COMPANY_INFO.demolition;

  let lineItems = [];
  let totalValue = 0;

  if (sector === 'cleaning') {
    const result = calculateCleaning(analysis.sqft?.replace(/,/g, ''), options);
    lineItems = result.items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${analysis.sqft || '1'}</td>
        <td>SF</td>
        <td>$${item.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
      </tr>
    `);
    totalValue = result.total;
  } else if (sector === 'painting') {
    const result = calculatePainting(options);
    lineItems = result.items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.unit}</td>
        <td>$${item.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
      </tr>
    `);
    totalValue = result.total;
  } else if (sector === 'demolition') {
    const result = calculateDemolition(options);
    lineItems = result.items.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${item.unit}</td>
        <td>$${item.cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
      </tr>
    `);
    totalValue = result.total;
  } else {
    // Other sectors fallback
    totalValue = calculatePlaceholderTotal(analysis, sector);
    lineItems = [`
      <tr>
        <td>Post-Construction ${sector} services</td>
        <td>${analysis.sqft || '1'}</td>
        <td>SF</td>
        <td>$${totalValue}</td>
      </tr>
    `];
  }

  const certGroups = getActiveCertifications()
    .filter(c => c.active)
    .reduce((acc, cert) => {
      acc[cert.category] = acc[cert.category] || [];
      acc[cert.category].push(cert.name);
      return acc;
    }, {});

  const certsHTML = Object.entries(certGroups).map(([cat, list]) => `
    <div class="cert-group">
      <strong>${cat}:</strong> ${list.join(', ')}
    </div>
  `).join('');

  return `
    <div class="estimate-sheet">
      <div class="header-band">
        <div class="company-info">
          <img src="/logo.svg" alt="Mardegan Logo" class="sheet-logo" />
          <div class="company-text">
            <h2>${company.name}</h2>
            <p>${company.address}</p>
            <p>Phone: ${company.phone} | Estimator: ${company.estimator}</p>
          </div>
        </div>
        <div class="project-info">
          <div class="estimate-label">ESTIMATE</div>
          <p><strong>Estimate #:</strong> ${options.estimateId || 'N/A'}</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Project:</strong> ${analysis.projectName || 'New Construction Project'}</p>
          <p><strong>Sector:</strong> ${sector.charAt(0).toUpperCase() + sector.slice(1)}</p>
        </div>
      </div>

      <div class="intro-text">
        <p>Our specialist review of the project documents indicates a requirement for the following professional services. We are pleased to submit our competitive proposal based on the provided scope of work.</p>
      </div>

      <table class="proposal-table">
        <thead>
          <tr>
            <th>DESCRIPTION OF WORK</th>
            <th>QTY</th>
            <th>UNIT</th>
            <th>LINE TOTAL</th>
          </tr>
        </thead>
        <tbody>
          ${lineItems.join('')}
        </tbody>
        <tfoot>
          <tr class="total-row">
            <td colspan="3">PROPOSED TOTAL BID</td>
            <td>$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
          </tr>
        </tfoot>
      </table>

      <div class="expert-verification">
        <h3>Expertise & Safety Verified</h3>
        <div class="certs-list">
          ${certsHTML}
        </div>
      </div>

      <div class="signature-section">
        <div class="sign-block">
          <p>Accepted By (General Contractor)</p>
          <div class="line"></div>
          <p>Name / Title</p>
        </div>
        <div class="sign-block">
          <p>Date</p>
          <div class="line"></div>
        </div>
      </div>

      <div class="footer-note">
        <p>Thank you for the opportunity to bid on this project. We look forward to supporting your team.</p>
      </div>
    </div>
  `;

  return { html, totalValue };
};

const calculatePlaceholderTotal = (analysis, sector) => {
  const sqft = parseFloat(analysis.sqft?.replace(/,/g, '')) || 0;
  const rates = {
    cleaning: 0.25,
    painting: 1.50,
    demolition: 3.00
  };
  return (sqft * (rates[sector] || 0)).toLocaleString(undefined, { minimumFractionDigits: 2 });
};
