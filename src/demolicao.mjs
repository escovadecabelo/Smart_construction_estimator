// MÓDULO 2: orcamentoDemolicao (SELECTIVE INTERIOR DEMOLITION)
// Este módulo contém os dados estruturados para a estimativa de demolição seletiva interna.

export const orcamentoDemolicao = {
    scope: [
        'Removal of existing non-load bearing partitions',
        'Demolition of acoustic ceiling tiles and grid',
        'Removal of existing floor finishes (Carpet, VCT)',
        'Disposal of all construction debris'
    ],
    paymentTerms: {
        mobilization: '30%',
        progress: '30%',
        final: '40%'
    },
    totalBid: 12500, // Total considerando lucro
    alternates: [
        { name: 'Concrete Slab Cutting', unit: 'Linear Foot', pricePerUnit: 45 }
    ]
};
