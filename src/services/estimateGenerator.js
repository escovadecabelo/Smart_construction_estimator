import { calculateDemolition } from '../modules/demolition/calculator.js';
import { getActiveCertifications } from '../config/certifications.js';

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
        <td>${item.name}<br/><small>${item.description}</small></td>
        <td>${analysis.sqft || '1'}</td>
        <td>SF</td>
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

  return `
    <div class="estimate-sheet">
      <div class="expert-badge">Specialist Agent Verified</div>
      <div class="estimate-header">
        <div class="company-brand">
          <img src="/logo.svg" alt="Logo" class="estimate-logo" />
          <div class="company-details">
            <h2>${company.name}</h2>
            <p>${COMPANY_INFO.general.address}</p>
            <p>Phone: ${COMPANY_INFO.general.phone}</p>
          </div>
        </div>
        <div class="estimate-meta">
          <h1>PROPOSAL</h1>
          <p>Date: ${new Date().toLocaleDateString()}</p>
          <p>Estimator: ${COMPANY_INFO.general.estimator}</p>
        </div>
      </div>

      <div class="estimate-body">
        <h3>Project Scope: ${sector.toUpperCase()}</h3>
        <p>Our specialist review of the project documents indicates a requirement for the following specialized services:</p>
        
        <table class="items-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${lineItems.join('')}
          </tbody>
          <tfoot>
            <tr class="total-row">
              <td colspan="3">TOTAL ESTIMATED BID</td>
              <td>$${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="certifications-section">
        <h4>Our Certifications</h4>
        <div class="certs-grid">
          ${getActiveCertifications()
            .filter(c => c.active)
            .map(c => `<span class="cert-badge">${c.name}</span>`)
            .join('')}
        </div>
      </div>

      <div class="estimate-footer">
        <p>Thank you for the opportunity to bid on this project. We look forward to working with you.</p>
        <div class="signature-line">
          <span>Accepted By: __________________________</span>
          <span>Date: ________________</span>
        </div>
      </div>
    </div>
  `;
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
