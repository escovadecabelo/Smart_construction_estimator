/**
 * GENERATOR MODULE: STANDALONE PAINTING PROPOSAL
 * Produces a high-end, professional proposal for painting scopes.
 * Optimized for Mardegan Construction.
 */

export function generatePaintingProposal(data) {
    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const logoBase64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAINAZcDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAgJBgcDBAUBAv/EAF8QAAEDAwIDAwUitVdLrA3EEFhY2XmB8fW6KqushJSUtPUVNDS1NTV2drd4rLz6RkdHSExMSUksLCwsLCwsLOxcWFhYWFhYWFh58LCwsLCwsLCws7FxYWFhYWFhZ1kfWEfAAUAAOD/+9vKHvCJC2TNImJiYmJiYmJS0sLCwsLCwsLCzoWFhYWFhYWFhZ0LCwsLCwsLCws7FxYWFhYWFhYWdi4sLCwsLCwsLOxcWFhYWFhYWFjYubCwsLCwsLCwsHNhYWFhYWFhYWHnwsLCwsLCwsLOsr6wD4AAAAf+v7+t7AGfuEDWbFImJiYmJiYmJnFhYWFhYWFhYWfnwsLCwsLCwsLOxcWFhYWFhYWFhZ0LCwsLCwsLCws7FxYWFhYWFhYWdi4sLCwsLCwsLOxcWFhYWFhYWFjYubCwsLCwsLCwsHNhYWFhYWFhYWHnwsLCwsLCwsLOsr6wD4ACAAAA/9/fVvaAT1wgaxYRExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMQ==";
    const styles = `
        <style>
            :root {
                --primary: #0f172a;
                --accent: #3b82f6;
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
            .proposal-meta .ref { font-size: 0.85rem; font-weight: 800; color: var(--accent); }
            
            .intro-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-bottom: 50px; background: var(--bg-page); padding: 25px; border-radius: 20px; border: 1px solid var(--border); }
            .info-group label { display: block; font-size: 0.6rem; font-weight: 900; text-transform: uppercase; color: #94a3b8; letter-spacing: 1.5px; margin-bottom: 4px; }
            .info-group p { font-weight: 700; font-size: 0.95rem; color: var(--primary); }
            h2 { font-size: 1.6rem; color: var(--primary); margin: 40px 0 25px; display: flex; align-items: center; gap: 12px; font-weight: 800; border-left: 5px solid var(--accent); padding-left: 15px; }
            .color-palette { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px; margin-bottom: 30px; background: #fafafa; padding: 20px; border-radius: 16px; border: 1px solid var(--border); }
            .color-item { background: white; padding: 12px; border-radius: 10px; border: 1px solid var(--border); }
            .color-item .swatch { height: 8px; border-radius: 4px; margin-bottom: 8px; }
            .color-item span { font-size: 0.7rem; font-weight: 700; color: var(--text-muted); }
            
            .client-info-box {
                grid-column: span 3;
                border: 1.5px solid var(--primary);
                border-radius: 24px;
                padding: 25px 35px;
                margin-bottom: 40px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 40px;
            }
            
            .scope-item { background: #fafafa; padding: 25px; border-radius: 20px; margin-bottom: 20px; border: 1px solid var(--border); }
            .scope-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
            .scope-title { font-weight: 800; color: var(--primary); font-size: 1.1rem; }
            .scope-qty { font-weight: 700; color: var(--accent); background: #eff6ff; padding: 4px 12px; border-radius: 8px; font-size: 0.85rem; }
            .scope-description { font-size: 0.9rem; color: var(--text-muted); }

            .total-section { margin-top: 60px; background: var(--primary); color: var(--white); padding: 40px; border-radius: 24px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 20px 40px -10px rgba(15,23,42,0.3); }
            .total-label { font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; opacity: 0.8; }
            .total-value { font-size: 3rem; font-weight: 900; }

            .footer { margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border); display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
            .sig-box { border-bottom: 2px solid var(--border); padding-bottom: 10px; position: relative; }
            .sig-line::after { content: 'X'; position: absolute; left: 0; top: -25px; color: var(--accent); font-weight: 900; opacity: 0.3; }
            .sig-box strong { display: block; font-size: 1rem; color: var(--primary); }
            .sig-box span { font-size: 0.8rem; color: #94a3b8; font-weight: 600; text-transform: uppercase; }

            .narrative-section {
                background: #f8fafc;
                padding: 30px;
                border-radius: 20px;
                margin-bottom: 40px;
                border-left: 6px solid var(--accent);
            }
            .narrative-header {
                font-size: 0.75rem;
                font-weight: 900;
                text-transform: uppercase;
                color: #94a3b8;
                letter-spacing: 1.5px;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .narrative-content {
                font-size: 1rem;
                color: var(--text-main);
                line-height: 1.7;
                font-style: italic;
            }

            @media print {
                body { padding: 0; background: white; }
                .proposal-container { border: none; box-shadow: none; padding: 0; width: 100%; border-radius: 0; }
                .total-section { background: #f8fafc !important; color: var(--primary) !important; border: 2px solid var(--primary); box-shadow: none; }
                .total-value { color: var(--accent) !important; }
            }
        </style>
    `;

    return `
        <div class="proposal-container">
            ${styles}
            <header>
                <div class="logo-area">
                    <img src="data:image/jpeg;base64,${logoBase64}" alt="Mardegan Construction" />
                </div>
                <div class="header-main" style="display: flex; justify-content: space-between; align-items: flex-end; width: 100%;">
                    <div class="company-meta">
                        <p class="name">MARDEGAN CONSTRUCTION</p>
                        <p class="sub">Professional Painting Services</p>
                        <p class="address">904 Valleybrook Dr. Lewisville - TX, 75067</p>
                    </div>
                    <div class="proposal-meta" style="text-align: right;">
                        <h1>Painting Proposal</h1>
                        <p class="ref">REF: PNT-${Math.floor(Math.random() * 89999) + 10000}</p>
                    </div>
                </div>
            </header>

            <div class="intro-grid">
                <div class="info-group">
                    <label>Issue Date</label>
                    <p>${date}</p>
                </div>
                <div class="info-group">
                    <label>Valid Until</label>
                    <p>30 Days from Issue</p>
                </div>
                <div class="info-group">
                    <label>Lead Estimator</label>
                    <p>Eduardo Moulin Mardegan</p>
                </div>
                
                <div class="client-info-box">
                    <div class="info-group">
                        <label>Prepared For</label>
                        <p style="font-size: 1.2rem; letter-spacing: -0.3px;">${data.clientName || 'Valued Client'}</p>
                    </div>
                    <div class="info-group">
                        <label>Project Location</label>
                        <p>${data.clientAddress || 'Project Site Address'}</p>
                    </div>
                </div>
            </div>

            <div class="narrative-section">
                <div class="narrative-header">📝 Project Narrative & Scope Summary</div>
                <div class="narrative-content">
                    ${data.projectDescription || 'No description provided.'}
                </div>
            </div>

            <h2>Color Specification</h2>
            <div class="color-palette">
                ${data.colors.map(c => `
                    <div class="color-item">
                        <div class="swatch" style="background: ${c.hex}"></div>
                        <p><strong>${c.name}</strong></p>
                        <span>${c.code}</span>
                    </div>
                `).join('')}
            </div>

            <h2>Scope of Work</h2>
            ${data.items.map(item => `
                <div class="scope-item">
                    <div class="scope-header">
                        <span class="scope-title">${item.area}</span>
                        <span class="scope-qty">${item.qty} ${item.unit}</span>
                    </div>
                    <p class="scope-description">${item.description}</p>
                </div>
            `).join('')}

            <div class="total-section">
                <div class="total-label">Investment Total</div>
                <div class="total-value">${formatCurrency(data.total)}</div>
            </div>

            <div class="footer">
                <div class="sig-box">
                    <div class="sig-line"></div>
                    <strong>Eduardo Moulin Mardegan</strong>
                    <span>Mardegan Construction</span>
                </div>
                <div class="sig-box">
                    <div class="sig-line"></div>
                    <strong>Client Acceptance</strong>
                    <span>Authorized Signature</span>
                </div>
            </div>
        </div>
    `;
}
