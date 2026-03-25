export const PAINT_RATES = {
  WALLS: { name: 'Walls (2 coats)', labor: 0.85, material: 0.25 },
  CEILINGS: { name: 'Ceilings (1 coat)', labor: 0.65, material: 0.20 },
  TRIM: { name: 'Trim & Baseboards', labor: 1.50, material: 0.15 },
  DOORS: { name: 'Doors & Frames', labor: 45.00, material: 5.00 } // Per unit
};

export const calculatePainting = (options = {}) => {
  const items = [];
  let total = 0;

  if (options.wallSqft > 0) {
    const cost = options.wallSqft * (PAINT_RATES.WALLS.labor + PAINT_RATES.WALLS.material);
    items.push({ name: PAINT_RATES.WALLS.name, cost, qty: options.wallSqft, unit: 'SF' });
    total += cost;
  }

  if (options.ceilingSqft > 0) {
    const cost = options.ceilingSqft * (PAINT_RATES.CEILINGS.labor + PAINT_RATES.CEILINGS.material);
    items.push({ name: PAINT_RATES.CEILINGS.name, cost, qty: options.ceilingSqft, unit: 'SF' });
    total += cost;
  }

  if (options.trimLinearFt > 0) {
    const cost = options.trimLinearFt * (PAINT_RATES.TRIM.labor + PAINT_RATES.TRIM.material);
    items.push({ name: PAINT_RATES.TRIM.name, cost, qty: options.trimLinearFt, unit: 'LF' });
    total += cost;
  }

  if (options.doorCount > 0) {
    const cost = options.doorCount * (PAINT_RATES.DOORS.labor + PAINT_RATES.DOORS.material);
    items.push({ name: PAINT_RATES.DOORS.name, cost, qty: options.doorCount, unit: 'EA' });
    total += cost;
  }

  return { items, total };
};
