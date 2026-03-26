/**
 * DATA MODULE: orcamentoLimpeza (POST-CONSTRUCTION CLEANING)
 * Specialized high-fidelity cleaning variables.
 */

export const orcamentoLimpeza = {
    totalSqFt: 15400,
    restrooms: 6,
    items: [
        { id: 1, label: 'Phase 1: Rough Clean (Debris & Sweep)', qty: 15400, unit: 'sq.ft', unitCost: 0.18 },
        { id: 2, label: 'Phase 2: Progress Clean (Detail Dusting)', qty: 15400, unit: 'sq.ft', unitCost: 0.25 },
        { id: 3, label: 'Phase 3: Final Clean (Turnover Ready)', qty: 15400, unit: 'sq.ft', unitCost: 0.45 },
        { id: 4, label: 'Phase 4: Puff Clean (Touch-up)', qty: 1, unit: 'lot', unitCost: 1200.00 },
        { id: 5, label: 'Restroom Deep Scrub & Sanitization', qty: 6, unit: 'units', unitCost: 95.00 }
    ],
    totalBaseBid: 8500.00,
    markup: 0.30
};
