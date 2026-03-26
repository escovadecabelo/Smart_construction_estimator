/**
 * DATA MODULE: orcamentoPintura (PAINTING AND DRYWALL FINISHING)
 * Realistic sample data for specialized painting bids.
 */

export const orcamentoPintura = {
    paintCodes: [
        { code: 'SW 7005', name: 'Pure White', finish: 'Satin', area: 'Ceilings' },
        { code: 'SW 7048', name: 'Urbane Bronze', finish: 'Eggshell', area: 'Accent Walls' },
        { code: 'SW 6258', name: 'Tricorn Black', finish: 'Semi-Gloss', area: 'Doors & Trims' }
    ],
    items: [
        { id: 1, label: 'Standard Level 4 Drywall Finish', qty: 12500, unit: 'sq.ft', unitCost: 1.15 },
        { id: 2, label: 'Interior Wall Painting (2 Coats)', qty: 15400, unit: 'sq.ft', unitCost: 0.85 },
        { id: 3, label: 'Exposed Ceiling Structure Spray Paint', qty: 5200, unit: 'sq.ft', unitCost: 1.45 },
        { id: 4, label: 'Premium Storefront Metal Painting', qty: 1, unit: 'lot', unitCost: 3200.00 },
        { id: 5, label: 'Door & Frame Detail Finishes', qty: 24, unit: 'units', unitCost: 125.00 }
    ],
    totalBaseBid: 35435.00,
    markup: 0.30
};
