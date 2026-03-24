export const CLEANING_PHASES = {
  ROUGH: {
    name: 'Rough Clean',
    description: 'Removal of large debris, stickers from windows/appliances, and initial sweeping/vacuuming.',
    baseRate: 0.15 // per sqft
  },
  FINAL: {
    name: 'Final Clean',
    description: 'Deep cleaning of all surfaces, kitchens, bathrooms, floors, and interior windows.',
    baseRate: 0.25 // per sqft
  },
  TOUCHUP: {
    name: 'Touch-up / Final Shine',
    description: 'Final walkthrough to remove dust settled after the final clean, ensuring perfect condition for handover.',
    baseRate: 0.08 // per sqft
  }
};

export const calculateCleaning = (sqft, options = {}) => {
  const area = parseFloat(sqft) || 0;
  const items = [];
  let total = 0;

  if (options.includeRough) {
    const cost = area * CLEANING_PHASES.ROUGH.baseRate;
    items.push({ name: CLEANING_PHASES.ROUGH.name, description: CLEANING_PHASES.ROUGH.description, cost });
    total += cost;
  }

  if (options.includeFinal) {
    const cost = area * CLEANING_PHASES.FINAL.baseRate;
    items.push({ name: CLEANING_PHASES.FINAL.name, description: CLEANING_PHASES.FINAL.description, cost });
    total += cost;
  }

  if (options.includeTouchup) {
    const cost = area * CLEANING_PHASES.TOUCHUP.baseRate;
    items.push({ name: CLEANING_PHASES.TOUCHUP.name, description: CLEANING_PHASES.TOUCHUP.description, cost });
    total += cost;
  }

  return { items, total };
};
