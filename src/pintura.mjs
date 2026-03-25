// MÓDULO 3: orcamentoPintura (PAINTING AND DRYWALL FINISHING)
// Este módulo contém os dados estruturados para a estimativa de pintura e acabamento.

export const orcamentoPintura = {
    paintCodes: ['SW 7005 (Pure White)', 'SW 7048 (Urbane Bronze)', 'SW 6258 (Tricorn Black)'],
    breakdown: {
        standardLevel4Finish: {
            description: 'Drywall Finishing Level 4',
            total: 4500
        },
        interiorPainting: {
            description: 'Interior Wall Painting (Two Coats)',
            total: 6200
        },
        exposedStructure: {
            description: 'Painting of Exposed Ceiling Structure',
            total: 3800
        },
        exteriorStorefront: {
            description: 'Premium Exterior Storefront Paint',
            total: 2500
        },
        accessories: {
            description: 'Doors, Frames, and Trim',
            total: 1800
        }
    },
    totalBaseBid: 18800 // Somatório final com lucro aplicado
};
