/**
 * MÓDULO 4: GERADOR DE LAYOUT PREMIUM (HTML/CSS)
 * Este módulo gera uma proposta comercial ultra-moderna e elegante.
 */

export function gerarPropostaHTML(dados) {
    const { limpeza, demolicao, pintura } = dados;

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Premium Construction Proposal</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #0f172a;
            --accent: #3b82f6;
            --accent-glow: rgba(59, 130, 246, 0.5);
            --bg: #f8fafc;
            --glass: rgba(255, 255, 255, 0.7);
            --glass-border: rgba(255, 255, 255, 0.4);
            --text-main: #1e293b;
            --text-muted: #64748b;
            --shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Outfit', sans-serif;
            background: var(--bg);
            color: var(--text-main);
            line-height: 1.6;
            padding: 40px 20px;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 60px;
            animation: fadeInDown 0.8s ease-out;
        }

        .header h1 {
            font-family: 'Inter', sans-serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--primary);
            letter-spacing: -1px;
            margin-bottom: 10px;
        }

        .header p { color: var(--text-muted); font-size: 1.1rem; }

        .page {
            background: var(--glass);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--glass-border);
            border-radius: 24px;
            padding: 50px;
            margin-bottom: 40px;
            box-shadow: var(--shadow);
            page-break-after: always;
            position: relative;
            overflow: hidden;
            animation: fadeInUp 0.8s ease-out both;
        }

        .page::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 6px;
            background: linear-gradient(90deg, var(--accent), #60a5fa);
        }

        h2 {
            font-family: 'Inter', sans-serif;
            font-size: 1.8rem;
            color: var(--primary);
            margin-bottom: 30px;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        h2 span {
            background: var(--accent);
            color: white;
            padding: 4px 12px;
            border-radius: 8px;
            font-size: 1rem;
        }

        .section-title {
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.85rem;
            color: var(--accent);
            margin-bottom: 15px;
            display: block;
        }

        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 30px;
        }

        .card {
            background: white;
            padding: 24px;
            border-radius: 16px;
            border: 1px solid #e2e8f0;
            transition: all 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 20px -10px rgba(0, 0, 0, 0.1);
            border-color: var(--accent);
        }

        .label { font-size: 0.9rem; color: var(--text-muted); }
        .value { font-size: 1.1rem; font-weight: 600; color: var(--primary); }

        .item-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #f1f5f9;
        }

        .item-row:last-child { border-bottom: none; }

        .total-box {
            background: var(--primary);
            color: white;
            padding: 30px;
            border-radius: 16px;
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 10px 15px -3px var(--accent-glow);
        }

        .total-box .price { font-size: 2rem; font-weight: 700; color: #60a5fa; }

        .footer-sig {
            margin-top: 60px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
        }

        .sig-line {
            border-top: 1px solid #cbd5e1;
            padding-top: 10px;
            font-size: 0.9rem;
            color: var(--text-muted);
        }

        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media print {
            body { background: white; padding: 0; }
            .page { border: none; box-shadow: none; background: white; margin: 0; padding: 20px; }
            .total-box { background: #f1f5f9; color: black; border: 1px solid #ccc; }
            .total-box .price { color: #1e293b; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Commercial Bidding Proposal</h1>
            <p>Smart Construction Estimator | Industrial & Office Solutions</p>
        </div>

        <!-- PAGE 1: CLEANING -->
        <div class="page">
            <h2><span>01</span> Post-Construction Cleaning</h2>
            <div class="grid">
                <div class="card">
                    <span class="label">Project Area</span>
                    <p class="value">${limpeza.totalSqFt.toLocaleString()} sq.ft</p>
                </div>
                <div class="card">
                    <span class="label">Facilities</span>
                    <p class="value">${limpeza.restrooms} Restrooms</p>
                </div>
            </div>

            <span class="section-title">Phased Scope</span>
            ${Object.values(limpeza.phases).map(p => `
                <div class="item-row">
                    <span>${p.description}</span>
                    <span style="font-weight: 600;">Included</span>
                </div>
            `).join('')}

            <div class="total-box">
                <div>
                    <p style="font-size: 0.9rem; opacity: 0.8;">Full Bundle Investment</p>
                    <p style="font-size: 1.1rem; font-weight: 600;">Turnover Ready Guaranteed</p>
                </div>
                <p class="price">${formatCurrency(limpeza.bundleOption.discountedPrice)}</p>
            </div>

            <div class="footer-sig">
                <div class="sig-line">Client Signature</div>
                <div class="sig-line">Date</div>
            </div>
        </div>

        <!-- PAGE 2: DEMOLITION -->
        <div class="page">
            <h2><span>02</span> Selective Interior Demolition</h2>
            <span class="section-title">Detailed Scope of Work</span>
            <div style="margin-bottom: 30px;">
                ${demolicao.scope.map(s => `
                    <div class="item-row">
                        <span>${s}</span>
                        <span style="color: var(--accent); font-weight: 600;">&#10003;</span>
                    </div>
                `).join('')}
            </div>

            <div class="grid">
                <div class="card">
                    <span class="label">Mobilization (30%)</span>
                    <p class="value">${formatCurrency(demolicao.totalBid * 0.3)}</p>
                </div>
                <div class="card">
                    <span class="label">Final Progress (70%)</span>
                    <p class="value">${formatCurrency(demolicao.totalBid * 0.7)}</p>
                </div>
            </div>

            <div class="total-box">
                <div>
                    <p style="font-size: 0.9rem; opacity: 0.8;">Selective Demolition Total Bid</p>
                    <p style="font-size: 1.1rem; font-weight: 600;">Disposal Included</p>
                </div>
                <p class="price">${formatCurrency(demolicao.totalBid)}</p>
            </div>

            <div class="footer-sig">
                <div class="sig-line">Client Signature</div>
                <div class="sig-line">Date</div>
            </div>
        </div>

        <!-- PAGE 3: PAINTING -->
        <div class="page">
            <h2><span>03</span> Painting & Drywall Finishing</h2>
            <span class="section-title">Material Palette</span>
            <div style="margin-bottom: 20px; font-weight: 600; color: var(--primary);">
                ${pintura.paintCodes.join(' &bull; ')}
            </div>

            <span class="section-title">Investment Breakdown</span>
            ${Object.values(pintura.breakdown).map(b => `
                <div class="item-row">
                    <span>${b.description}</span>
                    <span style="font-weight: 600;">${formatCurrency(b.total)}</span>
                </div>
            `).join('')}

            <div class="total-box">
                <div>
                    <p style="font-size: 0.9rem; opacity: 0.8;">Total Painting Investment</p>
                    <p style="font-size: 1.1rem; font-weight: 600;">Premium Materials Included</p>
                </div>
                <p class="price">${formatCurrency(pintura.totalBaseBid)}</p>
            </div>

            <div class="footer-sig">
                <div class="sig-line">Client Signature</div>
                <div class="sig-line">Date</div>
            </div>
        </div>
    </div>
</body>
</html>
    `;
}
