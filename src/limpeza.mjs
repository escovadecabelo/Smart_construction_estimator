// MÓDULO 1: orcamentoLimpeza (POST-CONSTRUCTION CLEANING)
// Este módulo contém os dados estruturados para a estimativa de limpeza pós-obra.

export const orcamentoLimpeza = {
    totalSqFt: 5000,
    restrooms: 4,
    flooringTypes: ['Polished Concrete', 'LVT', 'Ceramic Tile'],
    phases: {
        phase1_RoughClean: {
            description: 'Rough Clean (Debris removal, initial sweep)',
            cost: 1500,
            margin: 0.30
        },
        phase2_ProgressClean: {
            description: 'Progress Clean (Detailed cleaning during construction)',
            cost: 2000,
            margin: 0.30
        },
        phase3_FinalClean: {
            description: 'Final Clean (Turnover Ready - Detailed sanitization)',
            cost: 3500,
            margin: 0.30
        },
        phase4_PuffClean: {
            description: 'Puff Clean (Final touch-up before move-in)',
            cost: 800,
            margin: 0.30
        }
    },
    bundleOption: {
        description: 'Complete Cleaning Package (Phase 1-4)',
        discountedPrice: 7000 // Valor com desconto aplicado
    },
    alternates: [
        { name: 'Power Washing (Exterior)', price: 1200 }
    ]
};
