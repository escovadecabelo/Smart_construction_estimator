import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateDemoProposal } from './demo_generator.mjs';
import logoImg from './logo.jpg';

const AI_ENGINES = [
    { id: 'gemini', label: 'Gemini 2.0 Pro', icon: '♊', provider: 'Google', model: 'gemini-2.0-pro-exp-02-05' },
    { id: 'claude', label: 'Claude 3.5 Sonnet', icon: '🎭', provider: 'Anthropic', model: 'claude-3-5-sonnet' },
    { id: 'gpt4', label: 'GPT-4o Premium', icon: '🤖', provider: 'OpenAI', model: 'gpt-4o' },
];

const DEFAULT_DATA = {
    items: [
        { id: 1, label: 'Non-Load Bearing Partition Removal', qty: 2500, unit: 'sq.ft', unitCost: 5.50 },
        { id: 2, label: 'Acoustic Ceiling Tile & Grid Demo', qty: 5200, unit: 'sq.ft', unitCost: 1.25 },
        { id: 3, label: 'Carpet & VCT Flooring Removal', qty: 4800, unit: 'sq.ft', unitCost: 2.15 },
        { id: 4, label: 'Construction Debris Disposal (Roll-off)', qty: 6, unit: 'hauls', unitCost: 725.00 },
        { id: 5, label: 'Heavy Equipment & Scaffolding Rental', qty: 1, unit: 'lot', unitCost: 2400.00 }
    ]
};

const MARKET_COSTS = {
    'Non-Load Bearing Partition Removal': { min: 4.50, max: 7.50, avg: 5.50, unit: 'sq.ft' },
    'Acoustic Ceiling Tile & Grid Demo': { min: 1.00, max: 1.50, avg: 1.25, unit: 'sq.ft' },
    'Carpet & VCT Flooring Removal': { min: 1.50, max: 2.50, avg: 2.15, unit: 'sq.ft' },
    'Construction Debris Disposal (Roll-off)': { min: 650, max: 850, avg: 725, unit: 'haul' },
    'Heavy Equipment & Scaffolding Rental': { min: 2000, max: 3000, avg: 2400, unit: 'lot' }
};

function App() {
    const [currentEngine, setCurrentEngine] = useState(AI_ENGINES[0]);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0);
    const [showFacilitator, setShowFacilitator] = useState(false);
    const [jsonInput, setJsonInput] = useState('');
    const [projectedTotal, setProjectedTotal] = useState(0);
    const [proposalHtml, setProposalHtml] = useState('');
    const [smartPrompt, setSmartPrompt] = useState('');
    const [generatingSmart, setGeneratingSmart] = useState(false);
    const [showMarketModal, setShowMarketModal] = useState(false);
    const [opMarkup, setOpMarkup] = useState(0);
    const [projectDescription, setProjectDescription] = useState("");
    const [clientName, setClientName] = useState("Premium Client");
    const [clientAddress, setClientAddress] = useState("Project Site Address");
    const [originalVars, setOriginalVars] = useState([]);
    const [editableVars, setEditableVars] = useState([]);

    const fileInputRef = useRef(null);
    const apiKeys = { google: import.meta.env.VITE_GEMINI_API_KEY || '' };

    useEffect(() => {
        const base = editableVars
            .filter(v => v.included !== false)
            .reduce((acc, curr) => acc + (curr.qty * curr.unitCost), 0);
        const opAmount = base * (opMarkup / 100);
        setProjectedTotal(base + opAmount);
    }, [editableVars, opMarkup]);

    const handleUpload = () => fileInputRef.current.click();

    const generateNarrative = (items) => {
        if (!items || items.length === 0) return "";
        const names = items.slice(0, 3).map(i => i.label.toLowerCase()).join(", ");
        return `This selective demolition engagement covers comprehensive services for ${names}${items.length > 3 ? ' and associated scope items' : ''}. All work will be executed following Mardegan Construction's premium standards for elite quality, precision, and architectural integrity.`;
    };

    const processAI = async (file) => {
        setAnalyzing(true);
        try {
            const genAI = new GoogleGenerativeAI(apiKeys.google);
            const model = genAI.getGenerativeModel({ model: currentEngine.model });
            const reader = new FileReader();
            const base64Data = await new Promise(r => { reader.onload = () => r(reader.result.split(',')[1]); reader.readAsDataURL(file); });
            const prompt = `Act as an Elite Selective Demolition Auditor. Exhaustively analyze this blueprint for every Demolition and Interior Prep variable. 
            Return ONLY a valid JSON array: [{"id": 1, "label": "Concrete Removal", "qty": 500, "unit": "sq.ft", "unitCost": 12.00}]. 
            PROVIDE COMPLETE DATA. NO LIMIT ON ITEMS.`;
            const result = await model.generateContent([{ inlineData: { data: base64Data, mimeType: file.type } }, prompt]);
            const text = await result.response.text();
            const jsonStr = text.match(/\[.*\]/s)?.[0] || text;
            const parsed = JSON.parse(jsonStr);
            const finalData = parsed.map(v => ({ ...v, included: true }));
            setEditableVars(finalData);
            setOriginalVars(JSON.parse(JSON.stringify(finalData)));
            setProjectDescription(generateNarrative(finalData));
            setAnalysisStep(1);
        } catch (err) {
            console.error(err);
            const fallback = DEFAULT_DATA.items.map(v => ({ ...v, included: true }));
            setEditableVars(fallback);
            setOriginalVars(JSON.parse(JSON.stringify(fallback)));
            setProjectDescription(generateNarrative(fallback));
            setAnalysisStep(1);
        } finally { setAnalyzing(false); }
    };

    const getExternalPrompt = () => {
        return `Act as an Elite Lead Estimator for Mardegan Construction. Exhaustively analyze this blueprint for every Selective Demolition and Interior Prep variable. 
Return ONLY a valid JSON array: [{"id": 1, "label": "Wall Removal", "qty": 100, "unit": "sq.ft", "unitCost": 4.50}]. 
PROVIDE COMPLETE DATA. NO LIMIT ON ITEMS.`;
    };

    const handleGenerateSmartPrompt = async () => {
        if (!apiKeys.google) { alert("API-KEY missing"); return; }
        setGeneratingSmart(true);
        try {
            const genAI = new GoogleGenerativeAI(apiKeys.google);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const prompt = `Act as an Elite Prompt Engineer. Write the ULTIMATE expert prompt for a Selective Demolition Estimator. 
            The goal is for a user to extract a zero-error takeoff of all Demolition and Interior Prep from a blueprint. 
            Enforce STRICT JSON format. Demand exhaustive detail. No item limits. Include specifics for 'Floor Prep' and 'Debris Hauling'.`;
            const result = await model.generateContent(prompt);
            setSmartPrompt(await result.response.text());
        } catch (err) { setSmartPrompt(getExternalPrompt()); }
        finally { setGeneratingSmart(false); }
    };

    const handleJSONImport = () => {
        try {
            const parsed = JSON.parse(jsonInput);

            // Explicitly clear state
            setEditableVars([]);
            setProposalHtml('');
            setProjectedTotal(0);

            const cleaned = parsed.map((v, i) => ({ ...v, id: v.id || i + 1, included: true }));
            setEditableVars(cleaned);
            setOriginalVars(JSON.parse(JSON.stringify(cleaned)));
            setProjectDescription(generateNarrative(cleaned));
            setShowFacilitator(false);
            setAnalysisStep(1);
            setJsonInput('');
            setScaleFactor(1.0);
        } catch (err) { alert("Invalid JSON!"); }
    };

    const handleGenerateProposal = () => {
        const baseBid = editableVars
            .filter(v => v.included !== false)
            .reduce((acc, curr) => acc + (curr.qty * curr.unitCost), 0);

        const data = {
            items: editableVars.filter(v => v.included),
            totalBaseBid: baseBid,
            opMarkup: opMarkup,
            opAmount: baseBid * (opMarkup / 100),
            totalWithOp: projectedTotal,
            projectDescription: projectDescription,
            clientName: clientName,
            clientAddress: clientAddress
        };
        const html = generateDemoProposal(data);
        setProposalHtml(html);
        setAnalysisStep(2);
    };

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    const handleApplyScale = () => {
        if (scaleFactor <= 0) return;
        setEditableVars(prev => prev.map(v => {
            const original = originalVars.find(o => o.id === v.id) || v;
            const unit = original.unit.toLowerCase();

            // Only scale spatial measurements (Sq.Ft, Ln.Ft, etc.)
            const measurementUnits = ['sq.ft', 'sf', 'ln.ft', 'lf', 'sq.yd', 'sy', 'linear', 'sq ft'];
            const shouldScale = measurementUnits.some(m => unit.includes(m));

            if (shouldScale) {
                return { ...v, qty: original.qty * scaleFactor };
            }

            // Return original values for non-measurement units (lot, haul, hours, unit, ea)
            return { ...v, qty: original.qty, unitCost: original.unitCost };
        }));
    };

    const handleResetScale = () => {
        setScaleFactor(1.0);
        setEditableVars(JSON.parse(JSON.stringify(originalVars)));
    };

    return (
        <div className="paint-app">
            <nav className="navbar">
                <div className="nav-left">
                    <img src={logoImg} alt="Mardegan Logo" className="bar-logo" />
                    <div>
                        <span className="bar-title">MARDEGAN CONSTRUCTION</span>
                        <span className="bar-sub">Selective Demolition Specialist</span>
                    </div>
                </div>
                <div className="engine-select">
                    <button className="engine-btn">{currentEngine.icon} {currentEngine.label}</button>
                </div>
            </nav>
            <main className="viewer">
                {analysisStep === 0 && (
                    <div className="landing hero-fade">
                        <h1>Selective Demo analysis</h1>
                        <p>High-fidelity takeoff for interior demolition and debris logistics.</p>
                        <div className="discovery-grid">
                            <div className={`drop-zone ${analyzing ? 'is-analyzing' : ''}`} onClick={handleUpload}>
                                <input type="file" ref={fileInputRef} hidden accept=".pdf" onChange={e => e.target.files.length && processAI(e.target.files[0])} />
                                {analyzing ? <div className="loader-box"><div className="scan-line"></div><span>AI Scanning...</span></div> :
                                    <div className="empty-box"><div className="big-icon">🏗️</div><h3>Direct AI Scan</h3><p>Select PDF Blueprint</p></div>}
                            </div>
                            <div className="web-helper-card" onClick={() => setShowFacilitator(true)}>
                                <div className="helper-icon">🌐</div><h3>Manual Web AI</h3><p>Use Gemini/ChatGPT web</p><button className="helper-btn">Open →</button>
                            </div>
                        </div>
                    </div>
                )}
                {analysisStep === 1 && (
                    <div className="hub hero-fade">
                        <header className="hub-header"><div><h2>Demo Audit Hub</h2><p>Verify quantities and disposal fees.</p></div><div className="total-badge"><label>Project Bid</label><span>{formatCurrency(projectedTotal)}</span></div></header>

                        <div className="scale-bar">
                            <div className="scale-info">
                                <strong>📏 Scale & Dimension Converter</strong>
                                <span>Adjust captured blueprint quantities to real-world sizes.</span>
                            </div>
                            <div className="scale-controls">
                                <div className="scale-field">
                                    <label>Adjustment Factor</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={scaleFactor}
                                        onChange={e => setScaleFactor(parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <div className="scale-field" style={{ marginLeft: '20px', borderLeft: '1px solid var(--border)', paddingLeft: '20px' }}>
                                    <label>O&P %</label>
                                    <input
                                        type="number"
                                        value={opMarkup}
                                        onChange={e => setOpMarkup(parseFloat(e.target.value) || 0)}
                                    />
                                </div>
                                <button className="apply-scale-btn" onClick={handleApplyScale} style={{ marginLeft: '10px' }}>Apply All</button>
                                <button className="reset-scale-btn" onClick={handleResetScale}>Reset</button>
                            </div>
                        </div>

                        <div className="client-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                            <div className="client-field">
                                <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>Client / Company Name</label>
                                <input
                                    type="text"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', background: '#0b0e14', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem' }}
                                    placeholder="Enter client name..."
                                />
                            </div>
                            <div className="client-field">
                                <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>Project Site Address</label>
                                <input
                                    type="text"
                                    value={clientAddress}
                                    onChange={(e) => setClientAddress(e.target.value)}
                                    style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', background: '#0b0e14', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem' }}
                                    placeholder="Enter project address..."
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '30px' }}>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>Project Narrative / Description</label>
                            <textarea
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                style={{ width: '100%', padding: '20px', borderRadius: '16px', background: '#0b0e14', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem', fontFamily: 'Inter', minHeight: '100px', lineHeight: '1.6', resize: 'vertical' }}
                                placeholder="Describe the scope of work for the proposal..."
                            />
                        </div>

                        <table className="audit-table">
                            <thead><tr><th>Incl.</th><th>Variable</th><th>Qty</th><th>Unit</th><th>Cost</th><th>Subtotal</th></tr></thead>
                            <tbody>
                                {editableVars.map(v => (
                                    <tr key={v.id} className={v.included ? '' : 'is-excluded'}>
                                        <td><input type="checkbox" checked={v.included} onChange={() => setEditableVars(prev => prev.map(x => x.id === v.id ? { ...x, included: !x.included } : x))} /></td>
                                        <td className="desc">{v.label}</td>
                                        <td><input type="number" value={v.qty} onChange={e => setEditableVars(prev => prev.map(x => x.id === v.id ? { ...x, qty: parseFloat(e.target.value) || 0 } : x))} /></td>
                                        <td className="unit">{v.unit}</td>
                                        <td>$ <input type="number" value={v.unitCost} onChange={e => setEditableVars(prev => prev.map(x => x.id === v.id ? { ...x, unitCost: parseFloat(e.target.value) || 0 } : x))} /></td>
                                        <td className="sub">{formatCurrency(v.qty * v.unitCost)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="hub-actions">
                            <button className="restart-btn" onClick={() => {
                                setEditableVars([]);
                                setProposalHtml('');
                                setAnalysisStep(0);
                            }}>← New Scan (Clear All)</button>
                            <button className="market-btn" onClick={() => setShowMarketModal(true)}>📈 Check DFW Market Rates</button>
                            <button className="finish-btn" onClick={handleGenerateProposal}>Build Proposal →</button>
                        </div>
                    </div>
                )}

                {showMarketModal && (
                    <div className="modal-overlay" onClick={() => setShowMarketModal(false)}>
                        <div className="modal-content market-modal" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>DFW Market Rates 2026</h2>
                                <button className="close-btn" onClick={() => setShowMarketModal(false)}>×</button>
                            </div>
                            <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '20px' }}>Reference rates for Demolition specialized services in Dallas-Fort Worth.</p>
                            <div className="market-list">
                                {Object.entries(MARKET_COSTS).map(([label, data]) => (
                                    <div key={label} className="market-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                        <div style={{ flex: 1 }}>
                                            <strong style={{ display: 'block', fontSize: '0.9rem' }}>{label}</strong>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{data.unit} basis</span>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ color: 'var(--accent)', fontWeight: '800' }}>Avg: {formatCurrency(data.avg)}</div>
                                            <div style={{ fontSize: '0.7rem' }}>Range: {formatCurrency(data.min)} - {formatCurrency(data.max)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="import-final" style={{ marginTop: '20px' }} onClick={() => setShowMarketModal(false)}>Close Reference</button>
                        </div>
                    </div>
                )}
                {analysisStep === 2 && (
                    <div className="preview hero-fade">
                        <div className="preview-bar" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <button onClick={() => setAnalysisStep(1)} style={{ padding: '8px 16px', background: '#21262d', border: '1px solid #30363d', color: '#fff', borderRadius: '8px' }}>← Edit Audit</button>
                            <button className="accent" onClick={() => {
                                const win = window.open('', '_blank');
                                win.document.write(proposalHtml);
                                win.document.close();
                            }} style={{ padding: '8px 16px', background: '#f59e0b', border: 'none', color: '#fff', borderRadius: '8px', fontWeight: 'bold' }}>Print Proposal</button>
                        </div>
                        <iframe title="Proposal" srcDoc={proposalHtml} style={{ width: '100%', height: '800px', border: 'none', borderRadius: '16px', background: '#fff' }} />
                    </div>
                )}
                {showFacilitator && (
                    <div className="modal-overlay" onClick={() => setShowFacilitator(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h2>Web AI Facilitator</h2>
                            <div className="m-step">
                                <strong>1. Develop Prompt</strong>
                                <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                                    <button onClick={handleGenerateSmartPrompt} disabled={generatingSmart} style={{ flex: 1, padding: '10px', background: '#f59e0b', border: 'none', color: '#fff', borderRadius: '5px' }}>
                                        {generatingSmart ? 'Generating...' : '✨ Create Smart Prompt'}
                                    </button>
                                    <button onClick={() => { navigator.clipboard.writeText(smartPrompt || getExternalPrompt()); alert("Copied!"); }} style={{ padding: '10px', background: '#21262d', border: '1px solid #30363d', color: '#fff', borderRadius: '5px' }}>📋 Copy</button>
                                </div>
                                {smartPrompt && <div style={{ background: '#000', color: '#0f0', padding: '10px', fontSize: '0.6rem', marginTop: '5px', borderRadius: '5px', maxHeight: '60px', overflow: 'auto' }}>{smartPrompt}</div>}
                            </div>
                            <div className="m-step"><strong>2. Open AI Web</strong><br /><a href="https://gemini.google.com" target="_blank" rel="noreferrer" style={{ color: '#f59e0b', display: 'block', marginTop: '5px' }}>Open Gemini Web →</a></div>
                            <div className="m-step"><strong>3. Paste Results</strong><textarea placeholder="Paste JSON here..." value={jsonInput} onChange={e => setJsonInput(e.target.value)} /></div>
                            <button className="import-final" onClick={handleJSONImport}>Import & Audit</button>
                        </div>
                    </div>
                )}
            </main>
            <style>{`
                :root { --bg: #0b0e14; --panel: #161b22; --accent: #f59e0b; --text: #e6edf3; --text-dim: #7d8590; --border: #30363d; }
                .paint-app { min-height: 100vh; background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; }
                .navbar { height: 90px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; background: #0b0e14; border-bottom: 1px solid var(--border); }
                .nav-left { display: flex; align-items: center; gap: 15px; }
                .bar-logo { height: 45px; border-radius: 8px; box-shadow: 0 0 15px rgba(245, 158, 11, 0.3); }
                .bar-title { display: block; font-weight: 800; font-size: 1rem; color: #fff; letter-spacing: -0.5px; }
                .bar-sub { display: block; font-size: 0.6rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700; }
                .engine-btn { background: #21262d; border: 1px solid var(--border); color: var(--text); padding: 8px 16px; border-radius: 8px; font-weight: 600; }
                .viewer { max-width: 1100px; margin: 0 auto; padding: 60px 20px; }
                .landing { text-align: center; }
                .landing h1 { font-size: 3rem; font-weight: 800; margin-bottom: 12px; }
                .discovery-grid { display: grid; grid-template-columns: 1fr 0.5fr; gap: 20px; margin-top: 40px; }
                .drop-zone { background: var(--panel); border: 2px dashed var(--border); border-radius: 32px; padding: 60px; cursor: pointer; transition: 0.3s; }
                .web-helper-card { background: var(--panel); border: 1px solid var(--border); border-radius: 32px; padding: 40px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .web-helper-card:hover { border-color: #10b981; }
                .hub-actions { display: flex; justify-content: space-between; margin-top: 40px; gap: 15px; }
                .hub-actions button { flex: 1; padding: 15px 30px; border-radius: 12px; font-weight: 700; cursor: pointer; }
                .finish-btn { background: var(--accent); color: #fff; border: none; }
                .restart-btn { background: #21262d; border: 1px solid var(--border); color: var(--text-dim); }
                .market-btn { background: #161b22; color: #10b981; border: 1px solid #10b981; }
                
                .scale-bar { background: #161b22; border: 1px solid var(--border); border-radius: 20px; padding: 20px 25px; margin-bottom: 30px; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
                .scale-info strong { display: block; font-size: 1.1rem; color: #fff; margin-bottom: 4px; }
                .scale-info span { font-size: 0.8rem; color: var(--text-dim); }
                .scale-controls { display: flex; align-items: center; gap: 15px; }
                .scale-field label { display: block; font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; font-weight: 800; margin-bottom: 6px; }
                .scale-field input { background: #0d1117; border: 1px solid var(--border); color: var(--accent); padding: 8px 12px; border-radius: 8px; width: 90px; font-weight: 800; font-size: 0.9rem; }
                .apply-scale-btn { background: var(--accent); color: #fff; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 700; cursor: pointer; transition: 0.3s; }
                .apply-scale-btn:hover { filter: brightness(1.2); }
                .reset-scale-btn { background: #21262d; color: var(--text-dim); border: 1px solid var(--border); padding: 10px 18px; border-radius: 10px; font-weight: 700; cursor: pointer; }

                .is-excluded { opacity: 0.3; }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .close-btn { background: none; border: none; font-size: 2rem; color: var(--text-dim); cursor: pointer; }
                .modal-overlay { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.9); display: flex; align-items: center; justify-content: center; z-index: 2000; }
                .modal-content { background: var(--panel); padding: 40px; border-radius: 24px; width: 400px; border: 1px solid var(--border); }
                .m-step { margin-bottom: 20px; }
                .m-step textarea { width: 100%; height: 80px; background: #000; color: #0f0; border-radius: 8px; margin-top: 10px; }
                .import-final { width: 100%; padding: 12px; background: var(--accent); color: #fff; border: none; border-radius: 10px; cursor: pointer; }
                .hero-fade { animation: fadeIn 0.6s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
}

export default App;
