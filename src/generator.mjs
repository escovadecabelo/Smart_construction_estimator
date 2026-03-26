/**
 * MASTER GENERATOR: UNIFIED PREMIUM PROPOSAL
 * Produces stunning, trade-specific proposals for Painting, Demolition, and Cleaning.
 * Designed for Mardegan Construction.
 */

export function gerarPropostaHTML(dados, currentScope = 'all') {
    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    // LOGO_PLACEHOLDER
    const logoBase64 = "iVBORw0KGgoAAAANSUhEUgAAA+gAAASCAMAAAC0MByZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFMB02T0te////9/z9X78WAAAAB3RSTlP///////8AGGo03QAADG5JREFUeNrs2UENAAAIA6D3728re8AnLpA1m5SJiYmJiYmJiUksLCwsLCwsLCzsXFhYWFhYWFhY2LmwsLCwsLCwsLBzYWFhYWFhYWFh58LCwsLCwsLCws6FhYWFhYWFhYWdCwsLCwsLCwsLOxcWFhYWFhYWFnaS9YV/AFAAAn/vbyt7wCcukDWblImJiYmJiYmJSSwsLCwsLCwsLOxcWFhYWFhYWFh58LCwsLCwsLCwsnNhYWFhYWFhYWFnwsLCwsLCwsLCzsWFhYWFhYWFhZ1kfWEfAAUAAOD/+9vKHvCJC2TNImJiYmJiYmJS0sLCwsLCwsLCzoWFhYWFhYWFhZ0LCwsLCwsLCws7FxYWFhYWFhYWdi4sLCwsLCwsLOxcWFhYWFhYWFjYubCwsLCwsLCwsHNhYWFhYWFhYWHnwsLCwsLCwsLOsr6wD4AAAAf+v7+t7AGfuEDWbFImJiYmJiYmJnFhYWFhYWFhYWfnwsLCwsLCwsLOxcWFhYWFhYWFhZ0LCwsLCwsLCws7FxYWFhYWFhYWdi4sLCwsLCwsLOxcWFhYWFhYWFjYubCwsLCwsLCwsHNhYWFhYWFhYWHnwsLCwsLCwsLOsr6wD4ACAAAA/9/fVvaAT1wgaxYRExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExO7KlsAwwAABGHfT6sbY6HAAAE7FxYWFhYWFhZ2LiwsLCwsLCws7FxYWFhYWFhYWdiwsLCwsLCwsLBzYWFhYWFhYWFh58LCwsLCwsLCws7FxYWFhYWFhZ1kfWEvAAUAAOD/+9vKHvCJC2TNImJiYmJiYmJS0sLCwsLCwsLCzoWFhYWFhYWFhZ0LCwsLCwsLCws7FxYWFhYWFhYWdi4sLCwsLCwsLOxcWFhYWFhYWFjYubCwsLCwsLCwsHNhYWFhYWFhYWHnwsLCwsLCwsLOsr6wD4AAAAf+v7+t7AGfuEDWbFImJiYmJiYmJnFhYWFhYWFhYWfnwsLCwsLCwsLOxcWFhYWFhYWFhZ0LCwsLCwsLCws7FxYWFhYWFhYWdi4sLCwsLCwsLOxcWFhYWFhYWFjYubCwsLCwsLCwsHNhYWFhYWFhYWHnwsLCwsLCwsLOsr6wD4ACAAAA/9/fVvaAT1wgaxYRExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExBTAwtbAFMAAARh30+rG2OhwAABOxcWFhYWFhYWdi4sLCwsLCwsLOxcWFhYWFhYWFhZ0LCwsLCwsLCws7FxYWFhYWFhYWdi4sLCwsLCwsLBzYWFhYWFhYWFh58LCwsLCwsLCws7FxYWFhYWFhZ1kfWEfAAUAAOD/+9vKHvCJC2TNImJiYmJiYmJS0sLCwsLCwsLCzoWFhYWFhYWFhZ0LCwsLCwsLCws7FxYWFhYWFhYWdi4sLCwsLCwsLOxcWFhYWFhYWFjYubCwsLCwsLCwsHNhYWFhYWFhYWHnwsLCwsLCwsLOsr6wD4AAAAf+v7+t7AGfuEDWbFImJiYmJiYmJnFhYWFhYWFhYWfnwsLCwsLCwsLOxcWFhYWFhYWFhZ0LCwsLCwsLCws7FxYWFhYWFhYWdi4sLCwsLCwsLOxcWFhYWFhYWFjYubCwsLCwsLCwsHNhYWFhYWFhYWHnwsLCwsLCwsLOsr6wD4ACAAAA/9/fVvaAT1wgaxYRExMTExMTExMTExMTExMTExMTExMTExMTExMTExtbAFMAAARh30+rG2OhwAABOxcWFhYWFhYWdi4sLCwsLCwsLOxcWFhYWFhYWFhZ0LCwsLCwsLCws7FxYWFhYWFhYWdi4sLCwsLCwsLBzYWFhYWFhYWFh58LCwsLCwsLCws7FxYWFhYWFhZ1kfWEvAAUAAOD/+92A0JwAyV7UqmQKPJw5KWFmMFuJ1JPEnMr/2Q==";

    const styles = `
        <style>
            :root {
                --primary: #0f172a;
                --accent: #3b82f6;
                --accent-soft: #eff6ff;
                --text-main: #1e293b;
                --text-muted: #64748b;
                --border: #e2e8f0;
                --white: #ffffff;
                --bg-page: #f1f5f9;
            }

            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Outfit', sans-serif; background: var(--bg-page); color: var(--text-main); line-height: 1.6; padding: 60px 20px; }
            
            .proposal-container { max-width: 850px; margin: 0 auto; background: var(--white); border-radius: 32px; padding: 70px; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.1); border: 1px solid var(--border); overflow: hidden; position: relative; }
            .proposal-container::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 10px; background: linear-gradient(90deg, var(--accent), #60a5fa); }

            header { 
                display: grid; 
                grid-template-columns: auto 1fr; 
                gap: 40px;
                border-bottom: 3px solid var(--primary); 
                padding-bottom: 25px; 
                margin-bottom: 40px; 
                align-items: center;
            }
            .logo-area img {
                height: 100px;
                width: auto;
                object-fit: contain;
            }
            .company-meta { flex: 1; display: flex; flex-direction: column; gap: 4px; }
            .company-meta .name { font-weight: 900; font-size: 1.6rem; color: var(--primary); letter-spacing: -0.5px; }
            .company-meta .sub { font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }
            .company-meta .address { font-size: 0.75rem; color: #94a3b8; margin-top: 10px; font-weight: 600; }

            .proposal-meta { text-align: right; }
            .proposal-meta h1 { font-family: 'Inter', sans-serif; font-size: 2.4rem; font-weight: 800; color: var(--primary); margin-bottom: 8px; line-height: 1; }
            .proposal-meta .ref { font-size: 0.85rem; font-weight: 800; color: var(--accent); text-transform: uppercase; }

            .intro-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 50px; background: var(--bg-page); padding: 25px; border-radius: 20px; border: 1px solid var(--border); }
            .info-group label { display: block; font-size: 0.6rem; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 1.5px; margin-bottom: 4px; }
            .info-group p { font-weight: 700; font-size: 0.95rem; color: var(--primary); }

            h2 { font-size: 1.6rem; color: var(--primary); margin: 40px 0 25px; display: flex; align-items: center; gap: 12px; font-weight: 800; border-left: 5px solid var(--accent); padding-left: 15px; }
            
            .ledger-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .ledger-table th { text-align: left; padding: 15px 10px; border-bottom: 2px solid var(--border); font-size: 0.7rem; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; }
            .ledger-table td { padding: 25px 10px; border-bottom: 1px solid #f1f5f9; }
            .item-label { font-weight: 700; color: var(--primary); font-size: 1.05rem; margin-bottom: 4px; }
            .item-details { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
            .item-price { font-weight: 800; text-align: right; font-size: 1.2rem; color: var(--primary); }

            .total-section { background: var(--primary); padding: 50px; border-radius: 30px; color: var(--white); display: flex; justify-content: space-between; align-items: center; margin: 50px 0; box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.4); }
            .total-label h3 { font-size: 1.1rem; font-weight: 600; margin-bottom: 6px; }
            .total-label p { font-size: 0.8rem; opacity: 0.6; }
            .total-section .value { font-size: 3.2rem; font-weight: 900; color: #60a5fa; letter-spacing: -2px; }

            .terms-box { background: #fafafa; border: 1px dashed var(--border); padding: 30px; border-radius: 20px; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 50px; }
            .terms-box h4 { color: var(--primary); margin-bottom: 10px; font-weight: 800; text-transform: uppercase; font-size: 0.7rem; }
            .terms-list { padding-left: 20px; }
            .terms-list li { margin-bottom: 8px; }

            .signature-area { margin-top: 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
            .sig-line { border-top: 2px solid var(--primary); padding-top: 15px; margin-bottom: 6px; position: relative; }
            .sig-line::after { content: 'X'; position: absolute; left: 0; top: -25px; color: var(--accent); font-weight: 900; opacity: 0.3; }
            .sig-box strong { display: block; font-size: 1rem; color: var(--primary); }
            .sig-box span { font-size: 0.8rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; }

            .page-break { page-break-after: always; }
            
            @media print {
                body { padding: 0; background: white; }
                .proposal-container { border: none; box-shadow: none; padding: 0; width: 100%; border-radius: 0; }
                .total-section { background: #f8fafc !important; color: var(--primary) !important; border: 2px solid var(--primary); box-shadow: none; }
                .total-section .value { color: var(--accent) !important; }
            }
        </style>
    `;

    const commonHeader = (title, refPrefix, data) => `
        <header>
            <div class="logo-area">
                <img src="data:image/jpeg;base64,${logoBase64}" alt="Mardegan Construction" />
            </div>
            <div class="header-main" style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%;">
                <div class="company-meta">
                    <p class="name">MARDEGAN CONSTRUCTION</p>
                    <p class="sub">Advanced Construction Solutions</p>
                    <p class="address">904 Valleybrook Dr. Lewisville - TX, 75067</p>
                </div>
                <div class="proposal-meta" style="text-align: right;">
                    <h1>${title}</h1>
                    <p class="ref">REF: ${refPrefix}-${Math.floor(Math.random() * 89999) + 10000}</p>
                </div>
            </div>
        </header>

        <div class="intro-grid">
            <div class="info-group"><label>Issue Date</label><p>${date}</p></div>
            <div class="info-group"><label>Valid Until</label><p>30 Days from Issue</p></div>
            <div class="info-group"><label>Lead Estimator</label><p>Eduardo Moulin Mardegan</p></div>
        </div>

        <div class="client-box" style="margin-bottom: 40px; padding: 30px; border: 2px solid var(--primary); border-radius: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
            <div class="client-detail">
                <label style="display: block; font-size: 0.65rem; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 1.5px; margin-bottom: 8px;">Prepared For</label>
                <p style="font-weight: 800; font-size: 1.2rem; color: var(--primary);">${data.clientName || 'Valued Client'}</p>
            </div>
            <div class="client-detail">
                <label style="display: block; font-size: 0.65rem; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 1.5px; margin-bottom: 8px;">Project Location</label>
                <p style="font-weight: 700; font-size: 1rem; color: var(--primary);">${data.clientAddress || 'Project Site'}</p>
            </div>
        </div>
    `;

    const termsSection = `
        <div class="terms-box">
            <h4>Standard Terms & Execution Protocol</h4>
            <ul class="terms-list">
                <li>Materials: Mardegan Construction will provide premium-grade materials as per blueprint specs.</li>
                <li>Timeline: Work completion dates are subject to project site readiness and clear access.</li>
                <li>Standards: All execution follows high-end architectural standards for elite results.</li>
                <li>Safety: Project will strictly adhere to OSHA guidelines and Mardegan's internal safety protocols.</li>
            </ul>
        </div>
    `;

    const renderTradeContent = (scopeId, data) => {
        const titleMap = {
            painting: 'Painting & Finishing',
            demolition: 'Selective Demolition',
            cleaning: 'Post-Construction cleaning'
        };
        const refMap = { painting: 'PNT', demolition: 'DMO', cleaning: 'CLN' };

        return `
            <div class="proposal-page">
                ${commonHeader(titleMap[scopeId], refMap[scopeId], data)}
                
                ${data.projectDescription ? `
                    <div class="narrative-box" style="margin-bottom: 40px; padding: 25px; background: #f8fafc; border-radius: 20px; border: 1px solid var(--border);">
                        <h4 style="font-size: 0.7rem; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 1.5px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 1.2rem;">📝</span> Project Narrative & Scope Summary
                        </h4>
                        <p style="font-size: 0.95rem; color: var(--primary); font-weight: 500; line-height: 1.7;">${data.projectDescription}</p>
                    </div>
                ` : ''}

                <h2>Project Takeoff Ledger</h2>
                <table class="ledger-table">
                    <thead>
                        <tr>
                            <th>Description of Scope</th>
                            <th style="text-align: right;">Line Item Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${data.items ? data.items.map(item => `
                            <tr>
                                <td>
                                    <p class="item-label">${item.label}</p>
                                    <span class="item-details">${item.qty.toLocaleString()} ${item.unit} @ ${formatCurrency(item.unitCost)} / unit</span>
                                </td>
                                <td class="item-price">${formatCurrency(item.qty * item.unitCost)}</td>
                            </tr>
                        `).join('') : '<tr><td colspan="2">No items extracted.</td></tr>'}
                        ${data.opMarkup > 0 ? `
                            <tr style="background: #f8fafc; border-top: 2px solid var(--border);">
                                <td style="padding: 15px 10px;">
                                    <p class="item-label" style="color: var(--accent);">Overhead & Profit (O&P)</p>
                                    <span class="item-details">Applied markup of ${data.opMarkup}% to base bid</span>
                                </td>
                                <td class="item-price" style="color: var(--accent); padding: 15px 10px;">${formatCurrency(data.opAmount || 0)}</td>
                            </tr>
                        ` : ''}
                    </tbody>
                </table >

        <div class="total-section">
            <div class="total-label">
                <h3>Total Proposed Investment</h3>
                <p>Fully inclusive of Mobilization, Labor, and Materials.</p>
            </div>
            <div class="value">${formatCurrency(data.totalWithOp || data.totalBaseBid || 0)}</div>
        </div>

                ${termsSection}

    <div class="signature-area">
        <div class="sig-box"><div class="sig-line"></div><strong>Eduardo Moulin Mardegan</strong><span>Chief Estimator</span></div>
        <div class="sig-box"><div class="sig-line"></div><strong>Client Authorization</strong><span>Approved Signatory</span></div>
    </div>
            </div >
        `;
    };

    let content = '';
    if (currentScope === 'painting' || currentScope === 'all') {
        content += renderTradeContent('painting', dados.painting || {});
    }
    if (currentScope === 'demolition' || currentScope === 'all') {
        if (content) content += '<div class="page-break"></div>';
        content += renderTradeContent('demolition', dados.demolition || {});
    }
    if (currentScope === 'cleaning' || currentScope === 'all') {
        if (content) content += '<div class="page-break"></div>';
        content += renderTradeContent('cleaning', dados.cleaning || {});
    }

    return `
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                        <title>Master Bid Proposal | Mardegan Construction</title>
                        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Outfit:wght@300;400;600;700;900&display=swap" rel="stylesheet">
                            ${styles}
                        </head>
                        <body>
                            <div class="proposal-container">
                                ${content}
                            </div>
                        </body>
                    </html>
                    `;
}
