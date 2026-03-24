export const DEFAULT_CERTIFICATIONS = [
  { id: 'osha', name: 'OSHA 30-Hour Construction Safety', active: true },
  { id: 'epa', name: 'EPA Lead-Safe Certified Firm', active: true },
  { id: 'mbe', name: 'MBE (Minority Business Enterprise)', active: false },
  { id: 'wbe', name: 'WBE (Women Business Enterprise)', active: false },
  { id: 'hube', name: 'HUB Certified (Texas)', active: false }
];

export const getActiveCertifications = () => {
  const saved = localStorage.getItem('company_certs');
  return saved ? JSON.parse(saved) : DEFAULT_CERTIFICATIONS;
};

export const saveCertifications = (certs) => {
  localStorage.setItem('company_certs', JSON.stringify(certs));
};
