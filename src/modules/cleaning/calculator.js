export const CLEANING_PHASES = {
  ROUGH: { name: 'Rough Clean', baseRate: 0.15 },
  FINAL: { name: 'Final Clean', baseRate: 0.25 },
  TOUCHUP: { name: 'Touch-up / Final Shine', baseRate: 0.08 }
};

export const FLOOR_TYPES = {
  CARPET: { name: 'Carpet (Vacuuming)', rate: 0.05 },
  TILE: { name: 'Tile & Grout (Mopping)', rate: 0.10 },
  CONCRETE: { name: 'Polished Concrete', rate: 0.15 },
  HARDWOOD: { name: 'Hardwood (Special Care)', rate: 0.20 }
};

export const WINDOW_RATE = 15.00; // per window pane

export const calculateCleaning = (sqft, options = {}) => {
  const area = parseFloat(sqft) || 0;
  const items = [];
  let total = 0;

  // 1. Phases
  if (options.includeRough) {
    const cost = area * CLEANING_PHASES.ROUGH.baseRate;
    items.push({ name: 'Phase: Rough Clean', cost });
    total += cost;
  }
  if (options.includeFinal) {
    const cost = area * CLEANING_PHASES.FINAL.baseRate;
    items.push({ name: 'Phase: Final Clean', cost });
    total += cost;
  }
  if (options.includeTouchup) {
    const cost = area * CLEANING_PHASES.TOUCHUP.baseRate;
    items.push({ name: 'Phase: Touch-up', cost });
    total += cost;
  }

  // 2. Floor Types
  if (options.floors) {
    Object.entries(options.floors).forEach(([type, sft]) => {
      const rate = FLOOR_TYPES[type.toUpperCase()]?.rate || 0;
      const cost = sft * rate;
      if (cost > 0) {
        items.push({ name: `Floor Treatment: ${FLOOR_TYPES[type.toUpperCase()].name}`, cost });
        total += cost;
      }
    });
  }

  // 3. Windows
  if (options.windowCount > 0) {
    const cost = options.windowCount * WINDOW_RATE;
    items.push({ name: `Specialized Glass: ${options.windowCount} Windows`, cost });
    total += cost;
  }

  return { items, total };
};
