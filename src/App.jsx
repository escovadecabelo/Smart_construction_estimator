import React, { useState, useRef, useEffect } from 'react';
import { orcamentoLimpeza } from './limpeza.mjs';
import { orcamentoDemolicao } from './demolicao.mjs';
import { orcamentoPintura } from './pintura.mjs';

const SCOPES = [
    { id: 'cleaning', label: 'Post-Construction Cleaning', icon: '✨', data: orcamentoLimpeza },
    { id: 'demolition', label: 'Selective Demolition', icon: '🏗️', data: orcamentoDemolicao },
    { id: 'painting', label: 'Painting & Finishing', icon: '🎨', data: orcamentoPintura },
];

const AI_ENGINES = [
    { id: 'gemini', label: 'Gemini 2.0 Pro', icon: '♊', provider: 'Google' },
    { id: 'claude', label: 'Claude 3.5 Sonnet', icon: '🎭', provider: 'Anthropic' },
    { id: 'gpt4', label: 'GPT-4o Premium', icon: '🤖', provider: 'OpenAI' },
];

function App() {
    const [currentScope, setCurrentScope] = useState(SCOPES[0]);
    const [currentEngine, setCurrentEngine] = useState(AI_ENGINES[0]);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0); // 0: Upload, 1: Inspection, 2: Proposal
    const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false);
    const [engineDropdownOpen, setEngineDropdownOpen] = useState(false);

    // V4: Editable Variables State
    const [editableVars, setEditableVars] = useState([]);
    const [projectedTotal, setProjectedTotal] = useState(0);

    const [results, setResults] = useState({
        cleaning: null,
        demolition: null,
        painting: null
    });

    const fileInputRef = useRef(null);
    const scopeRef = useRef(null);
    const engineRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (scopeRef.current && !scopeRef.current.contains(event.target)) setScopeDropdownOpen(false);
            if (engineRef.current && !engineRef.current.contains(event.target)) setEngineDropdownOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // V4: Recalculate total whenever variables change
    useEffect(() => {
        const total = editableVars.reduce((acc, curr) => acc + (curr.qty * curr.unitCost), 0);
        setProjectedTotal(total);
    }, [editableVars]);

    const handleZoneClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            processAnalysis();
        }
    };

    const processAnalysis = () => {
        setAnalyzing(true);
        const delay = 1500;
        setTimeout(() => {
            setAnalyzing(false);
            const initialData = getDefaultVariables(currentScope.id);
            setEditableVars(initialData);
            setResults(prev => ({ ...prev, [currentScope.id]: { ...currentScope.data, engine: currentEngine } }));
            setAnalysisStep(1);
        }, delay);
    };

    const getDefaultVariables = (scope) => {
        if (scope === 'cleaning') {
            return [
                { id: 1, label: 'Standard Floor Area', qty: 5000, unit: 'sq.ft', unitCost: 0.15 },
                { id: 2, label: 'Restroom Deep Scrub', qty: 4, unit: 'units', unitCost: 45.00 },
                { id: 3, label: 'Window Detailing', qty: 1, unit: 'lot', unitCost: 850.00 },
                { id: 4, label: 'Project Mobilization', qty: 1, unit: 'fee', unitCost: 350.00 },
            ];
        }
        if (scope === 'demolition') {
            return [
                { id: 1, label: 'Interior Gyp Walls', qty: 450, unit: 'linear ft', unitCost: 12.00 },
                { id: 2, label: 'Flooring (Tile/Carpet)', qty: 2200, unit: 'sq.ft', unitCost: 2.50 },
                { id: 3, label: 'Debris Disposal (Est)', qty: 8.5, unit: 'tons', unitCost: 350.00 },
                { id: 4, label: 'Heavy Equipment Ops', qty: 2, unit: 'days', unitCost: 1200.00 },
            ];
        }
        return [
            { id: 1, label: 'Wall Prime & 2-Coats', qty: 12500, unit: 'sq.ft', unitCost: 0.85 },
            { id: 2, label: 'Drywall Repair / Prep', qty: 24, unit: 'hrs', unitCost: 65.00 },
            { id: 3, label: 'Luxury Finish Upgrade', qty: 1, unit: 'lot', unitCost: 1450.00 },
            { id: 4, label: 'Material Surcharge', qty: 1, unit: 'ea', unitCost: 550.00 },
        ];
    };

    const handleVarChange = (id, newQty) => {
        setEditableVars(prev => prev.map(v => v.id === id ? { ...v, qty: parseFloat(newQty) || 0 } : v));
    };

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="app-container">
            <nav className="top-nav">
                <div className="nav-logo">SMART<span>BID</span> AI</div>
                <div className="nav-controls">
                    <div className="custom-dropdown" ref={scopeRef}>
                        <label className="dropdown-label">CONSTRUCTION SCOPE</label>
                        <button className="dropdown-trigger" onClick={() => setScopeDropdownOpen(!scopeDropdownOpen)}>
                            <span className="icon">{currentScope.icon}</span>
                            <span className="label-text">{currentScope.label}</span>
                            <span className={`arrow ${scopeDropdownOpen ? 'up' : 'down'}`}>▾</span>
                        </button>
                        {scopeDropdownOpen && (
                            <div className="dropdown-menu animate-fade-in">
                                {SCOPES.map(s => (
                                    <div key={s.id} className={`menu-item ${currentScope.id === s.id ? 'active' : ''}`} onClick={() => { setCurrentScope(s); setScopeDropdownOpen(false); setAnalysisStep(0); }}>
                                        <span className="icon">{s.icon}</span> {s.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="nav-divider"></div>
                    <div className="custom-dropdown" ref={engineRef}>
                        <label className="dropdown-label">INTELLIGENCE ENGINE</label>
                        <button className="dropdown-trigger engine-trigger" onClick={() => setEngineDropdownOpen(!engineDropdownOpen)}>
                            <span className="icon">{currentEngine.icon}</span>
                            <span className="label-text">{currentEngine.label}</span>
                            <span className={`arrow ${engineDropdownOpen ? 'up' : 'down'}`}>▾</span>
                        </button>
                        {engineDropdownOpen && (
                            <div className="dropdown-menu animate-fade-in">
                                {AI_ENGINES.map(e => (
                                    <div key={e.id} className={`menu-item engine-item ${currentEngine.id === e.id ? 'active' : ''}`} onClick={() => { setCurrentEngine(e); setEngineDropdownOpen(false); }}>
                                        <span className="icon">{e.icon}</span>
                                        <div className="engine-info">
                                            <span className="name">{e.label}</span>
                                            <span className="provider">{e.provider}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="content-area">
                {analysisStep === 0 && (
                    <div className="landing animate-fade-in">
                        <header className="hero">
                            <div className="engine-chip">Powered by {currentEngine.label}</div>
                            <h1>{currentScope.label} Extraction</h1>
                            <p>Upload blueprints for high-precision neural analysis and editable bid modeling.</p>
                        </header>
                        <div className="upload-section">
                            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept=".pdf" />
                            <div className={`dropzone ${analyzing ? 'analyzing' : ''}`} onClick={handleZoneClick}>
                                {analyzing ? (
                                    <div className="status">
                                        <div className="spinner-container"><div className="spinner"></div><div className="spinner-pulse"></div></div>
                                        <p className="analyzing-text">Neural Analysis In Progress...</p>
                                        <span className="analyzing-sub">Mining {currentScope.label} finish schedules</span>
                                    </div>
                                ) : (
                                    <div className="prompt">
                                        <div className="icon">📄</div>
                                        <h3>Upload Blueprint PDF</h3>
                                        <p>Select the document for {currentEngine.label} intelligence</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {analysisStep === 1 && (
                    <div className="inspection-hub animate-fade-in">
                        <header className="step-header-v4">
                            <div className="header-meta">
                                <div className="step-count">Interactive Inspection (Step 1)</div>
                                <h2>Neural Audit Hub</h2>
                                <p>Adjust extracted variables to refine the bid in real-time.</p>
                            </div>
                            <div className="recalculation-status">
                                <span className="status-label">Projected Bid Total</span>
                                <span className="status-value">{formatCurrency(projectedTotal)}</span>
                            </div>
                        </header>

                        <div className="hub-data-grid">
                            <table className="editable-table">
                                <thead>
                                    <tr>
                                        <th>Extracted Variable</th>
                                        <th>Value / Quantity</th>
                                        <th>Unit</th>
                                        <th>Unit Cost</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {editableVars.map((v) => (
                                        <tr key={v.id}>
                                            <td className="v-label-cell">{v.label}</td>
                                            <td className="v-input-cell">
                                                <input
                                                    type="number"
                                                    value={v.qty}
                                                    onChange={(e) => handleVarChange(v.id, e.target.value)}
                                                    className="qty-input"
                                                />
                                            </td>
                                            <td className="v-unit">{v.unit}</td>
                                            <td className="v-cost">{formatCurrency(v.unitCost)}</td>
                                            <td className="v-subtotal">{formatCurrency(v.qty * v.unitCost)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="action-bar">
                                <button className="secondary-btn" onClick={() => setAnalysisStep(0)}>← Re-analyze PDF</button>
                                <div className="agent-signature">
                                    <span className="agent-icon">{currentEngine.icon}</span>
                                    <div className="agent-text">
                                        <strong>{currentEngine.label}</strong>
                                        <span>Audit Active</span>
                                    </div>
                                </div>
                                <button className="primary-btn" onClick={() => setAnalysisStep(2)}>
                                    Generate Formal Proposal
                                    <span className="btn-icon">→</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {analysisStep === 2 && (
                    <div className="proposal-view animate-fade-in">
                        <header className="proposal-header">
                            <button className="back-link" onClick={() => setAnalysisStep(1)}>← Back to Inspection</button>
                            <div className="badge">
                                <span className="scope-tag">{currentScope.icon} {currentScope.label}</span>
                                <span className="engine-tag">{currentEngine.label} Certified</span>
                            </div>
                        </header>

                        <div className="proposal-doc">
                            <header className="doc-header">
                                <h1>Specialized Bidding Proposal</h1>
                                <p className="engine-id">REF: BID-{currentEngine.id.toUpperCase()}-{Math.floor(Math.random() * 10000)}</p>
                            </header>

                            <section className="doc-page">
                                <h2><span>01</span> Project Scope & Final Investment</h2>
                                <div className="scope-summary-v4">
                                    <div className="summary-pill">Scope: {currentScope.label}</div>
                                    <div className="summary-pill">Engine: {currentEngine.label}</div>
                                </div>

                                <div className="final-ledger">
                                    {editableVars.map((v, i) => (
                                        <div key={i} className="item-row">
                                            <div className="item-info">
                                                <span className="item-nm">{v.label}</span>
                                                <span className="item-dt">{v.qty} {v.unit} @ {formatCurrency(v.unitCost)}</span>
                                            </div>
                                            <span className="item-val">{formatCurrency(v.qty * v.unitCost)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="total-box-v4">
                                    <div className="total-label">
                                        <h3>Total Proposed Investment</h3>
                                        <p>All taxes and disposal fees included as calculated by {currentEngine.label}</p>
                                    </div>
                                    <div className="total-value">{formatCurrency(projectedTotal)}</div>
                                </div>
                            </section>

                            <footer className="proposal-footer">
                                <div className="sig-area">
                                    <div className="sig-box"><p>Contractor Signature</p></div>
                                    <div className="sig-box"><p>Project Owner Approval</p></div>
                                </div>
                            </footer>
                        </div>
                    </div>
                )}
            </main>

            <style>{`
        :root { --accent: #3b82f6; --primary: #0f172a; --text-muted: #64748b; }
        .app-container { min-height: 100vh; width: 100%; display: flex; flex-direction: column; align-items: center; background: #f8fafc; font-family: 'Inter', sans-serif; }
        
        .top-nav { width: 100%; height: 80px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; background: white; border-bottom: 1px solid #e2e8f0; position: sticky; top: 0; z-index: 1000; }
        .nav-logo { font-weight: 800; font-size: 1.4rem; color: var(--primary); }
        .nav-logo span { color: var(--accent); }
        .nav-controls { display: flex; align-items: center; gap: 30px; }
        .nav-divider { width: 1px; height: 30px; background: #e2e8f0; }

        .custom-dropdown { position: relative; }
        .dropdown-label { font-size: 0.6rem; font-weight: 800; color: #94a3b8; display: block; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px; }
        .dropdown-trigger { display: flex; align-items: center; gap: 10px; padding: 8px 16px; min-width: 220px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; font-weight: 600; color: var(--primary); cursor: pointer; transition: 0.2s; }
        .dropdown-trigger:hover { border-color: var(--accent); background: white; }
        .label-text { flex: 1; text-align: left; font-size: 0.85rem; }
        .engine-trigger { border-left: 4px solid var(--accent); }

        .dropdown-menu { position: absolute; top: calc(100% + 8px); right: 0; min-width: 280px; background: white; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 20px 40px rgba(0,0,0,0.1); padding: 8px; z-index: 1001; }
        .menu-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: 0.2s; color: var(--primary); }
        .menu-item:hover { background: #eff6ff; color: var(--accent); }
        .menu-item.active { background: var(--accent); color: white; }
        .engine-info { display: flex; flex-direction: column; line-height: 1.3; }
        .provider { font-size: 0.7rem; opacity: 0.6; }

        .content-area { width: 100%; max-width: 1200px; padding: 60px 20px; }
        .hero { text-align: center; margin-bottom: 60px; }
        .engine-chip { display: inline-block; padding: 6px 14px; background: #eff6ff; color: var(--accent); border-radius: 50px; font-weight: 700; font-size: 0.7rem; margin-bottom: 24px; border: 1px solid #dbeafe; }
        .hero h1 { font-size: 3.5rem; font-weight: 800; color: var(--primary); letter-spacing: -2px; }
        
        .dropzone { background: white; border: 2px dashed #cbd5e1; border-radius: 40px; padding: 100px 40px; text-align: center; cursor: pointer; transition: 0.4s; }
        .dropzone:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.05); }

        .spinner-container { position: relative; width: 64px; height: 64px; margin: 0 auto 24px; }
        .spinner { width: 100%; height: 100%; border: 4px solid #f3f3f3; border-top: 4px solid var(--accent); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* V4: INSPECTION HUB ENHANCEMENTS */
        .step-header-v4 { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 50px; }
        .header-meta h2 { font-size: 2.8rem; font-weight: 800; color: var(--primary); letter-spacing: -1px; margin-bottom: 4px; }
        .recalculation-status { background: var(--primary); padding: 24px 40px; border-radius: 24px; text-align: right; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.2); }
        .status-label { color: #94a3b8; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; display: block; }
        .status-value { color: white; font-size: 2.2rem; font-weight: 800; }

        .editable-table { width: 100%; border-collapse: separate; border-spacing: 0 12px; margin-bottom: 40px; }
        .editable-table th { text-align: left; padding: 0 20px; font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
        .editable-table tr td { background: white; padding: 24px 20px; border-radius: 16px; border-top: 1px solid #f1f5f9; border-bottom: 1px solid #f1f5f9; }
        .editable-table tr td:first-child { border-left: 1px solid #f1f5f9; border-radius: 16px 0 0 16px; }
        .editable-table tr td:last-child { border-right: 1px solid #f1f5f9; border-radius: 0 16px 16px 0; }
        
        .v-label-cell { font-weight: 700; color: var(--primary); font-size: 1rem; }
        .qty-input { background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 16px; border-radius: 10px; width: 120px; font-weight: 800; font-size: 1rem; color: var(--accent); }
        .v-unit { font-weight: 600; color: var(--text-muted); font-size: 0.85rem; }
        .v-cost { font-weight: 600; color: var(--text-muted); }
        .v-subtotal { font-weight: 800; color: var(--primary); font-size: 1.1rem; }

        .agent-signature { display: flex; align-items: center; gap: 14px; padding: 12px 24px; background: white; border: 1px solid #e2e8f0; border-radius: 100px; }
        .agent-icon { font-size: 1.2rem; }
        .agent-text { display: flex; flex-direction: column; line-height: 1; }
        .agent-text strong { font-size: 0.75rem; color: var(--primary); }
        .agent-text span { font-size: 0.65rem; color: #10b981; font-weight: 800; text-transform: uppercase; }

        /* V4: PROPOSAL ENHANCEMENTS */
        .scope-summary-v4 { display: flex; gap: 12px; margin-bottom: 40px; }
        .summary-pill { padding: 6px 14px; background: #f1f5f9; border-radius: 8px; font-size: 0.75rem; font-weight: 700; color: var(--text-muted); }
        .final-ledger { margin-bottom: 60px; }
        .item-info { display: flex; flex-direction: column; }
        .item-nm { font-weight: 700; color: var(--primary); font-size: 1.1rem; margin-bottom: 4px; }
        .item-dt { font-size: 0.8rem; color: var(--text-muted); }
        .item-val { font-weight: 800; color: var(--primary); font-size: 1.2rem; }

        .total-box-v4 { background: var(--primary); padding: 40px; border-radius: 24px; display: flex; justify-content: space-between; align-items: center; color: white; }
        .total-label h3 { font-size: 1.4rem; font-weight: 800; margin-bottom: 4px; }
        .total-label p { opacity: 0.6; font-size: 0.85rem; }
        .total-value { font-size: 3rem; font-weight: 800; color: #60a5fa; letter-spacing: -2px; }

        .primary-btn { background: var(--primary); color: white; border: none; padding: 18px 40px; border-radius: 18px; font-weight: 700; cursor: pointer; transition: 0.3s; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.2); }
        .primary-btn:hover { background: #1e293b; transform: translateY(-2px); shadow: 0 15px 40px rgba(15, 23, 42, 0.35); }
        .secondary-btn { background: none; border: none; color: var(--text-muted); font-weight: 700; cursor: pointer; }
        .back-link { background: none; border: none; color: var(--accent); font-weight: 800; cursor: pointer; margin-bottom: 30px; font-size: 0.9rem; }

        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1024px) {
            .step-header-v4 { flex-direction: column; align-items: flex-start; gap: 30px; }
            .recalculation-status { width: 100%; text-align: left; }
        }
      `}</style>
        </div>
    );
}

export default App;
