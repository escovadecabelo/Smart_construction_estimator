export const DEMO_RATES = {
  STRUCTURAL: { name: 'Wall/Structural Demo', rate: 4.50 },
  FLOORING: { name: 'Flooring Removal', rate: 1.75 },
  DEBRIS: { name: 'Debris Disposal (Dumpster)', rate: 450.00 }, // Per unit
  HAZMAT: { name: 'Safe Disposal/Prep', rate: 0.50 }
};

export const calculateDemolition = (options = {}) => {
  const items = [];
  let total = 0;

  if (options.structuralSqft > 0) {
    const cost = options.structuralSqft * DEMO_RATES.STRUCTURAL.rate;
    items.push({ name: DEMO_RATES.STRUCTURAL.name, cost, qty: options.structuralSqft, unit: 'SF' });
    total += cost;
  }

  if (options.flooringSqft > 0) {
    const cost = options.flooringSqft * DEMO_RATES.FLOORING.rate;
    items.push({ name: DEMO_RATES.FLOORING.name, cost, qty: options.flooringSqft, unit: 'SF' });
    total += cost;
  }

  if (options.dumpsterCount > 0) {
    const cost = options.dumpsterCount * DEMO_RATES.DEBRIS.rate;
    items.push({ name: DEMO_RATES.DEBRIS.name, cost, qty: options.dumpsterCount, unit: 'EA' });
    total += cost;
  }

  return { items, total };
};
