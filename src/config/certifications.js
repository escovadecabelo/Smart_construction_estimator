const DEFAULT_CERTS = [
  // Safety
  { id: 'osha-10', name: 'OSHA 10 Safety Certified', active: true, category: 'Safety' },
  
  // Expertise / Estimating
  { id: 'xactimate-l1', name: 'Xactimate Verisk L1 Certified', active: true, category: 'Expertise' },
  { id: 'xactimate-l2', name: 'Xactimate Verisk L2 Certified', active: true, category: 'Expertise' },
  
  // Products - Painting (Sherwin Williams)
  { id: 'sw-painter-skills', name: 'Sherwin Williams Painter Skills Mastery', active: true, category: 'Product Specialist' },
  { id: 'sw-high-performance', name: 'SW High Performance Commercial Coatings', active: true, category: 'Product Specialist' },
  { id: 'sw-color-basics', name: 'SW Color Basics & Color Code Mastery', active: true, category: 'Product Specialist' },
  
  // Products - Roofing/Coatings (GAF)
  { id: 'gaf-coatings-pro', name: 'GAF Coatings Pro Liquid-Applied Roofing', active: true, category: 'Product Specialist' },
  { id: 'gaf-commercial-slow-slope', name: 'GAF Commercial Slow Slope Mastery', active: true, category: 'Product Specialist' },
  
  // General
  { id: 'industrial-coatings', name: 'Industrial Coatings & Metal Finishes Certified', active: true, category: 'Expertise' },
  { id: 'approved-applicator', name: 'Approved Applicator Certified', active: true, category: 'Expertise' }
];

export const getActiveCertifications = () => {
  const saved = localStorage.getItem('company_certs');
  return saved ? JSON.parse(saved) : DEFAULT_CERTS;
};

export const saveCertifications = (certs) => {
  localStorage.setItem('company_certs', JSON.stringify(certs));
};
