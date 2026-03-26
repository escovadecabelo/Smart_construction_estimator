import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePaintingProposal } from './painting_generator.mjs';
import logoImg from './logo.jpg';

const AI_ENGINES = [
    { id: 'gemini', label: 'Gemini 2.0 Pro', icon: '♊', provider: 'Google', model: 'gemini-2.0-pro-exp-02-05' },
    { id: 'claude', label: 'Claude 3.5 Sonnet', icon: '🎭', provider: 'Anthropic', model: 'claude-3-5-sonnet' },
    { id: 'gpt4', label: 'GPT-4o Premium', icon: '🤖', provider: 'OpenAI', model: 'gpt-4o' },
];

const DEFAULT_DATA = {
    paintCodes: [
        { code: 'SW 7005', name: 'Pure White', finish: 'Satin', area: 'Ceilings' },
        { code: 'SW 7048', name: 'Urbane Bronze', finish: 'Eggshell', area: 'Accent Walls' },
        { code: 'SW 6258', name: 'Tricorn Black', finish: 'Semi-Gloss', area: 'Doors & Trims' }
    ],
    items: [
        { id: 1, label: 'Standard Level 4 Drywall Finish', qty: 12500, unit: 'sq.ft', unitCost: 1.15 },
        { id: 2, label: 'Interior Wall Painting (2 Coats)', qty: 15400, unit: 'sq.ft', unitCost: 0.85 },
        { id: 3, label: 'Exposed Ceiling Structure Spray Paint', qty: 5200, unit: 'sq.ft', unitCost: 1.45 },
        { id: 4, label: 'Premium Storefront Metal Painting', qty: 1, unit: 'lot', unitCost: 3200.00 },
        { id: 5, label: 'Door & Frame Detail Finishes', qty: 24, unit: 'units', unitCost: 125.00 }
    ]
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

    const fileInputRef = useRef(null);
    const apiKeys = { google: import.meta.env.VITE_GEMINI_API_KEY || '' };

    useEffect(() => {
        const total = editableVars
            .filter(v => v.included !== false)
            .reduce((acc, curr) => acc + (curr.qty * curr.unitCost), 0);
        setProjectedTotal(total);
    }, [editableVars]);

    const handleUpload = () => fileInputRef.current.click();

    const processAI = async (file) => {
        setAnalyzing(true);
        try {
            const genAI = new GoogleGenerativeAI(apiKeys.google);
            const model = genAI.getGenerativeModel({ model: currentEngine.model });
            const reader = new FileReader();
            const base64Data = await new Promise(r => { reader.onload = () => r(reader.result.split(',')[1]); reader.readAsDataURL(file); });
            const prompt = `Act as a Senior Painting Estimator. Exhaustively analyze this blueprint for every Painting and Finishing variable. 
            Return ONLY a valid JSON array: [{"id": 1, "label": "Interior Wall Paint", "qty": 5000, "unit": "sq.ft", "unitCost": 1.20}]. 
            PROVIDE COMPLETE DATA. NO LIMIT ON ITEMS.`;
            const result = await model.generateContent([{ inlineData: { data: base64Data, mimeType: file.type } }, prompt]);
            const text = await result.response.text();
            const jsonStr = text.match(/\[.*\]/s)?.[0] || text;
            setEditableVars(JSON.parse(jsonStr).map(v => ({ ...v, included: true })));
            setAnalysisStep(1);
        } catch (err) {
            alert("Direct AI extraction failed. Use the Manual Web AI feature instead.");
            setAnalysisStep(1);
        } finally { setAnalyzing(false); }
    };

    const getExternalPrompt = () => {
        return `Act as an Elite Lead Estimator for Mardegan Construction. Exhaustively analyze this blueprint for every Painting and Drywall Finishing variable. 
Return ONLY a valid JSON array: [{"id": 1, "label": "Item", "qty": 100, "unit": "sq.ft", "unitCost": 0.85}]. 
PROVIDE COMPLETE DATA. NO LIMIT ON ITEMS.`;
    };

    const handleJSONImport = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            setEditableVars(parsed.map((v, i) => ({ ...v, id: v.id || i + 1, included: true })));
            setShowFacilitator(false);
            setAnalysisStep(1);
        } catch (err) { alert("Invalid JSON!"); }
    };

    const handleGenerateSmartPrompt = async () => {
        if (!apiKeys.google) { alert("API-KEY missing"); return; }
        setGeneratingSmart(true);
        try {
            const genAI = new GoogleGenerativeAI(apiKeys.google);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const prompt = `Act as an Elite Prompt Engineer. Write the ULTIMATE expert prompt for a Painting Estimator. 
            The goal is for a user to extract a zero-error takeoff of all Painting/Finishing from a blueprint. 
            Enforce STRICT JSON format. Demand exhaustive detail. No item limits.`;
            const result = await model.generateContent(prompt);
            setSmartPrompt(await result.response.text());
        } catch (err) { setSmartPrompt(getExternalPrompt()); }
        finally { setGeneratingSmart(false); }
    };

    const handleGenerateProposal = () => {
        const data = {
            paintCodes: DEFAULT_DATA.paintCodes,
            items: editableVars.filter(v => v.included),
            totalBaseBid: projectedTotal
        };
        const html = generatePaintingProposal(data);
        setProposalHtml(html);
        setAnalysisStep(2);
    };

    const formatCurrency = (val) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="paint-app">
            <nav className="navbar">
                <div className="nav-left">
                    <img src={logoImg} alt="Mardegan Logo" className="bar-logo" />
                    <div>
                        <span className="bar-title">MARDEGAN CONSTRUCTION</span>
                        <span className="bar-sub">Professional Painting Estimator</span>
                    </div>
                </div>
                <div className="engine-select">
                    <button className="engine-btn">{currentEngine.icon} {currentEngine.label}</button>
                </div>
            </nav>

            <main className="viewer">
                {analysisStep === 0 && (
                    <div className="landing hero-fade">
                        <h1>Painting spatial analysis</h1>
                        <p>High-end finishing and material takeoff.</p>
                        <div className="discovery-grid">
                            <div className={`drop-zone ${analyzing ? 'is-analyzing' : ''}`} onClick={handleUpload}>
                                <input type="file" ref={fileInputRef} hidden accept=".pdf" onChange={e => e.target.files.length && processAI(e.target.files[0])} />
                                {analyzing ? <div className="loader-box"><div className="scan-line"></div><span>AI Scanning...</span></div> :
                                    <div className="empty-box"><div className="big-icon">🎨</div><h3>Direct AI Scan</h3><p>Select PDF Blueprint</p></div>}
                            </div>
                            <div className="web-helper-card" onClick={() => setShowFacilitator(true)}>
                                <div className="helper-icon">🌐</div>
                                <h3>Manual Web AI</h3>
                                <p>Use Gemini/ChatGPT web</p>
                                <button className="helper-btn">Open →</button>
                            </div>
                        </div>
                    </div>
                )}

                {analysisStep === 1 && (
                    <div className="hub hero-fade">
                        <header className="hub-header">
                            <div><h2>Finish Audit Hub</h2><p>Verify quantities and material choices.</p></div>
                            <div className="total-badge"><label>Project Bid</label><span>{formatCurrency(projectedTotal)}</span></div>
                        </header>
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
                            <button className="restart-btn" onClick={() => setAnalysisStep(0)}>← New Scan</button>
                            <button className="finish-btn" onClick={handleGenerateProposal}>Build Proposal →</button>
                        </div>
                    </div>
                )}

                {analysisStep === 2 && (
                    <div className="preview hero-fade">
                        <div className="preview-bar">
                            <button onClick={() => setAnalysisStep(1)}>← Edit Audit</button>
                            <button className="accent" onClick={() => {
                                const win = window.open('', '_blank');
                                win.document.write(proposalHtml);
                                win.document.close();
                            }}>Print Proposal</button>
                        </div>
                        <div className="doc-frame">
                            <iframe title="Proposal" srcDoc={proposalHtml} style={{ width: '100%', height: '800px', border: 'none', borderRadius: '16px', background: '#fff' }} />
                        </div>
                    </div>
                )}

                {showFacilitator && (
                    <div className="modal-overlay" onClick={() => setShowFacilitator(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h2>Web AI Facilitator</h2>
                            <div className="m-step">
                                <strong>1. Develop Prompt</strong>
                                <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                                    <button onClick={handleGenerateSmartPrompt} disabled={generatingSmart} style={{ flex: 1, padding: '10px', background: '#3b82f6', border: 'none', color: '#fff', borderRadius: '5px' }}>
                                        {generatingSmart ? 'Generating...' : '✨ Create Smart Prompt'}
                                    </button>
                                    <button onClick={() => { navigator.clipboard.writeText(smartPrompt || getExternalPrompt()); alert("Copied!"); }} style={{ padding: '10px', background: '#21262d', border: '1px solid #30363d', color: '#fff', borderRadius: '5px' }}>📋 Copy</button>
                                </div>
                                {smartPrompt && <div style={{ background: '#000', color: '#0f0', padding: '10px', fontSize: '0.6rem', marginTop: '5px', borderRadius: '5px', maxHeight: '60px', overflow: 'auto' }}>{smartPrompt}</div>}
                            </div>
                            <div className="m-step"><strong>2. Open AI Web</strong><br /><a href="https://gemini.google.com" target="_blank" rel="noreferrer" style={{ color: '#3b82f6', display: 'block', marginTop: '5px' }}>Open Gemini Web →</a></div>
                            <div className="m-step"><strong>3. Paste Results</strong><textarea placeholder="Paste JSON here..." value={jsonInput} onChange={e => setJsonInput(e.target.value)} /></div>
                            <button className="import-final" onClick={handleJSONImport}>Import & Audit</button>
                        </div>
                    </div>
                )}
            </main>

            <style>{`
                :root { --bg: #0b0e14; --panel: #161b22; --accent: #3b82f6; --text: #e6edf3; --text-dim: #7d8590; --border: #30363d; }
                .paint-app { min-height: 100vh; background: var(--bg); color: var(--text); font-family: 'Outfit', sans-serif; }
                .navbar { height: 90px; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; background: #0b0e14; border-bottom: 1px solid var(--border); }
                .nav-left { display: flex; align-items: center; gap: 15px; }
                .bar-logo { height: 45px; border-radius: 8px; box-shadow: 0 0 15px rgba(59, 130, 246, 0.3); }
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

                .hub-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
                .total-badge { background: var(--accent); color: white; padding: 20px 40px; border-radius: 20px; text-align: right; }
                .total-badge span { font-size: 2rem; font-weight: 800; }
                .audit-table { width: 100%; border-collapse: separate; border-spacing: 0 10px; }
                .audit-table td { background: var(--panel); padding: 20px; }
                .audit-table input[type="number"] { background: #0d1117; border: 1px solid var(--border); color: var(--accent); padding: 8px; border-radius: 6px; width: 80px; }
                .finish-btn { background: var(--accent); color: #fff; border: none; padding: 15px 40px; border-radius: 12px; font-weight: 700; cursor: pointer; }
                .is-excluded { opacity: 0.3; }
                
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
