/**
 * GENERATOR MODULE: STANDALONE DEMOLITION PROPOSAL
 * Produces a high-end, professional proposal for demolition scopes.
 * Optimized for Mardegan Construction.
 */

export function generateDemoProposal(data) {
    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const styles = `
        <style>
            :root {
                --primary: #0f172a;
                --accent: #f59e0b;
                --text-main: #1e293b;
                --text-muted: #64748b;
                --border: #e2e8f0;
                --white: #ffffff;
                --bg-page: #f1f5f9;
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Outfit', sans-serif; background: var(--bg-page); color: var(--text-main); line-height: 1.6; padding: 60px 20px; }
            .proposal-container { max-width: 850px; margin: 0 auto; background: var(--white); border-radius: 32px; padding: 70px; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.1); border: 1px solid var(--border); overflow: hidden; position: relative; }
            .proposal-container::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 10px; background: linear-gradient(90deg, var(--accent), #fbbf24); }
            header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid var(--primary); padding-bottom: 40px; margin-bottom: 50px; }
            .company-meta .name { font-weight: 900; font-size: 1.6rem; color: var(--primary); letter-spacing: -0.5px; }
            .company-meta .sub { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
            .company-meta .address { font-size: 0.75rem; color: #94a3b8; margin-top: 10px; font-weight: 600; }
            .proposal-meta { text-align: right; }
            .proposal-meta h1 { font-family: 'Inter', sans-serif; font-size: 2.4rem; font-weight: 800; color: var(--primary); margin-bottom: 8px; line-height: 1; }
            .proposal-meta .ref { font-size: 0.85rem; font-weight: 800; color: var(--accent); }
            .intro-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 50px; background: #fafafa; padding: 25px; border-radius: 20px; border: 1px solid var(--border); }
            .info-group label { display: block; font-size: 0.6rem; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 1.5px; margin-bottom: 4px; }
            .info-group p { font-weight: 700; font-size: 0.95rem; color: var(--primary); }
            h2 { font-size: 1.6rem; color: var(--primary); margin: 40px 0 25px; display: flex; align-items: center; gap: 12px; font-weight: 800; border-left: 5px solid var(--accent); padding-left: 15px; }
            .ledger-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .ledger-table th { text-align: left; padding: 15px 10px; border-bottom: 2px solid var(--border); font-size: 0.7rem; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; }
            .ledger-table td { padding: 25px 10px; border-bottom: 1px solid #f1f5f9; }
            .item-label { font-weight: 700; color: var(--primary); font-size: 1.05rem; }
            .item-details { font-size: 0.8rem; color: var(--text-muted); }
            .item-price { font-weight: 800; text-align: right; font-size: 1.2rem; color: var(--primary); }
            .total-section { background: var(--primary); padding: 50px; border-radius: 30px; color: var(--white); display: flex; justify-content: space-between; align-items: center; margin: 50px 0; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.4); }
            .total-section .value { font-size: 3.2rem; font-weight: 900; color: #fbbf24; letter-spacing: -2px; }
            .signature-area { margin-top: 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
            .sig-line { border-top: 2px solid var(--primary); padding-top: 15px; position: relative; }
            .sig-box strong { display: block; font-size: 1rem; color: var(--primary); }
            .sig-box span { font-size: 0.8rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; }
            @media print {
                body { padding: 0; background: white; }
                .proposal-container { border: none; box-shadow: none; padding: 0; width: 100%; border-radius: 0; }
                .total-section { background: #f8fafc !important; color: var(--primary) !important; border: 2px solid var(--primary); }
                .total-section .value { color: var(--accent) !important; }
            }
        </style>
    `;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Demolition Proposal | Mardegan Construction</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=Outfit:wght@300;400;600;700;900&display=swap" rel="stylesheet">
    ${styles}
</head>
<body>
    <div class="proposal-container">
        <header>
            <div class="company-meta">
                <p class="name">MARDEGAN CONSTRUCTION</p>
                <p class="sub">Selective Demolition & Prep</p>
                <p class="address">904 Valleybrook Dr. Lewisville - TX, 75067</p>
            </div>
            <div class="proposal-meta">
                <h1>Service Proposal</h1>
                <p class="ref">REF: DMO-${Math.floor(Math.random() * 8999) + 1000}</p>
            </div>
        </header>

        <div class="intro-grid">
            <div class="info-group"><label>Issue Date</label><p>${date}</p></div>
            <div class="info-group"><label>Lead Estimator</label><p>Eduardo Moulin Mardegan</p></div>
            <div class="info-group"><label>Scope Type</label><p>Selective Demo</p></div>
        </div>

        <h2><span>01</span> Demolition Work Breakdown</h2>
        <table class="ledger-table">
            <thead><tr><th>Scope of Removal</th><th style="text-align: right;">Line Subtotal</th></tr></thead>
            <tbody>
                ${data.items.map(item => `
                    <tr>
                        <td>
                            <p class="item-label">${item.label}</p>
                            <span class="item-details">${item.qty.toLocaleString()} ${item.unit} included</span>
                        </td>
                        <td class="item-price">${formatCurrency(item.qty * item.unitCost)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="total-section">
            <div class="total-label">
                <h3>Total Demolition Investment</h3>
                <p>Includes all debris removal and floor preparation.</p>
            </div>
            <div class="value">${formatCurrency(data.totalBaseBid)}</div>
        </div>

        <div class="signature-area">
            <div class="sig-box"><div class="sig-line"></div><strong>Eduardo Moulin Mardegan</strong><span>Chief Estimator</span></div>
            <div class="sig-box"><div class="sig-line"></div><strong>Client Authorization</strong><span>Approved Signatory</span></div>
        </div>
    </div>
</body>
</html>
    `;
}
