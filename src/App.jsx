import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { orcamentoLimpeza } from './limpeza.mjs';
import { orcamentoDemolicao } from './demolicao.mjs';
import { orcamentoPintura } from './pintura.mjs';
import { gerarPropostaHTML } from './generator.mjs';
import logoImg from './logo.jpg';

const SCOPES = [
    { id: 'painting', label: 'Painting & Finishing', icon: '🎨', data: orcamentoPintura, color: '#3b82f6', tag: 'High-End Finish', bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
    { id: 'demolition', label: 'Selective Demolition', icon: '🏗️', data: orcamentoDemolicao, color: '#f59e0b', tag: 'Interior Prep', bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
    { id: 'cleaning', label: 'Post-Construction cleaning', icon: '✨', data: orcamentoLimpeza, color: '#10b981', tag: 'Turnover Ready', bg: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
];

const AI_ENGINES = [
    { id: 'gemini-15', label: 'Gemini 1.5 Pro', icon: '♊', provider: 'Google', model: 'gemini-1.5-pro' },
    { id: 'gemini', label: 'Gemini 2.0 Flash', icon: '⚡', provider: 'Google', model: 'gemini-2.0-flash' },
    { id: 'gpt4', label: 'GPT-4o Premium', icon: '🤖', provider: 'OpenAI', model: 'gpt-4o' },
];

const COMPANY_INFO = {
    name: 'Mardegan Construction',
    sub: 'Advanced Construction Solutions',
    estimator: 'Eduardo Moulin Mardegan',
    phone: '214-650-4381',
    address: '904 Valleybrook Dr. Lewisville - TX, 75067'
};

const MARKET_COSTS = {
    painting: {
        'Standard Level 4 Drywall Finish': { min: 1.50, max: 2.00, avg: 1.85, unit: 'sq.ft' },
        'Interior Wall Painting (2 Coats)': { min: 0.65, max: 1.15, avg: 1.10, unit: 'sq.ft' },
        'Exposed Ceiling Structure Spray Paint': { min: 1.75, max: 2.25, avg: 1.95, unit: 'sq.ft' },
        'Premium Storefront Metal Painting': { min: 3500, max: 5000, avg: 4200, unit: 'lot' },
        'Door & Frame Detail Finishes': { min: 150, max: 250, avg: 185, unit: 'unit' }
    },
    demolition: {
        'Non-Load Bearing Partition Removal': { min: 4.50, max: 7.50, avg: 5.50, unit: 'sq.ft' },
        'Acoustic Ceiling Tile & Grid Demo': { min: 1.00, max: 1.50, avg: 1.25, unit: 'sq.ft' },
        'Carpet & VCT Flooring Removal': { min: 1.50, max: 2.50, avg: 2.15, unit: 'sq.ft' },
        'Construction Debris Disposal (Roll-off)': { min: 650, max: 850, avg: 725, unit: 'haul' },
        'Heavy Equipment & Scaffolding Rental': { min: 2000, max: 3000, avg: 2400, unit: 'lot' }
    },
    cleaning: {
        'Phase 1: Rough Clean (Debris & Sweep)': { min: 0.12, max: 0.22, avg: 0.18, unit: 'sq.ft' },
        'Phase 2: Progress Clean (Detail Dusting)': { min: 0.18, max: 0.35, avg: 0.25, unit: 'sq.ft' },
        'Phase 3: Final Clean (Turnover Ready)': { min: 0.35, max: 0.75, avg: 0.45, unit: 'sq.ft' },
        'Phase 4: Puff Clean (Touch-up)': { min: 800, max: 1500, avg: 1200, unit: 'lot' },
        'Restroom Deep Scrub & Sanitization': { min: 75, max: 125, avg: 95, unit: 'unit' }
    }
};

const COMMON_SCALES = [
    '1/4" = 1\'-0"',
    '1/8" = 1\'-0"',
    '3/16" = 1\'-0"',
    '3/32" = 1\'-0"',
    '1/2" = 1\'-0"',
    '3/4" = 1\'-0"',
    '1" = 1\'-0"',
    '1 1/2" = 1\'-0"',
    '3" = 1\'-0"',
    '1" = 10\'-0" (Eng)',
    '1" = 20\'-0" (Eng)',
    'Other (Custom)...'
];

function App() {
    const [view, setView] = useState('launcher'); // 'launcher', 'dashboard'
    const [currentScope, setCurrentScope] = useState(null);
    const [currentEngine, setCurrentEngine] = useState(AI_ENGINES[0]);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisStep, setAnalysisStep] = useState(0); // 0: Upload, 1: Audit, 2: Preview
    const [showFacilitator, setShowFacilitator] = useState(false);
    const [includeScaleInPrompt, setIncludeScaleInPrompt] = useState(false);
    const [scaleValue, setScaleValue] = useState(COMMON_SCALES[0]);
    const [showCustomScale, setShowCustomScale] = useState(false);
    const [jsonInput, setJsonInput] = useState('');
    const [editableVars, setEditableVars] = useState([]);
    const [projectedTotal, setProjectedTotal] = useState(0);
    const [proposalHtml, setProposalHtml] = useState('');
    const [engineDropdownOpen, setEngineDropdownOpen] = useState(false);
    const [smartPrompt, setSmartPrompt] = useState('');
    const [generatingSmart, setGeneratingSmart] = useState(false);
    const [showMarketModal, setShowMarketModal] = useState(false);
    const [scaleFactor, setScaleFactor] = useState(1.0);
    const [opMarkup, setOpMarkup] = useState(0);
    const [projectDescription, setProjectDescription] = useState("");
    const [clientName, setClientName] = useState("Premium Client");
    const [clientAddress, setClientAddress] = useState("Project Site Address");
    const [originalVars, setOriginalVars] = useState([]);

    const fileInputRef = useRef(null);
    const apiKeys = {
        google: import.meta.env.VITE_GEMINI_API_KEY || '',
        anthropic: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
        openai: import.meta.env.VITE_OPENAI_API_KEY || ''
    };

    useEffect(() => {
        const base = editableVars
            .filter(v => v.included !== false)
            .reduce((acc, curr) => acc + (curr.qty * curr.unitCost), 0);
        const opAmount = base * (opMarkup / 100);
        setProjectedTotal(base + opAmount);
    }, [editableVars, opMarkup]);

    const handleSelectScope = (scope) => {
        setCurrentScope(scope);
        setEditableVars([]);
        setAnalysisStep(0);
        setView('dashboard');
    };

    const handleUpload = () => {
        if (!apiKeys.google) {
            alert("VITE_GEMINI_API_KEY is missing from .env");
            return;
        }
        fileInputRef.current.click();
    };

    const processAI = async (file) => {
        setAnalyzing(true);
        try {
            const genAI = new GoogleGenerativeAI(apiKeys.google);
            const model = genAI.getGenerativeModel({ model: currentEngine.model });

            const reader = new FileReader();
            const base64Data = await new Promise(r => {
                reader.onload = () => r(reader.result.split(',')[1]);
                reader.readAsDataURL(file);
            });

            const prompt = `Act as a Senior Construction Estimator specializing in ${currentScope.label}. 
            ${includeScaleInPrompt && scaleValue ? `IMPORTANT: The blueprint scale is ${scaleValue}. Please use this for all spatial calculations.` : ''}
            Analyze this blueprint for ${currentScope.label} specific quantities and materials.
            IMPORTANT: Ensure all pricing is HIGHLY COMPETITIVE and reflects the CHEAPEST viable market rates.
            Return ONLY a JSON array: [{"id": 1, "label": "Item Description", "qty": 100, "unit": "sq.ft", "unitCost": 12.50}].
            Provide a COMPREHENSIVE list of all high-value variables found.`;

            const result = await model.generateContent([{
                inlineData: { data: base64Data, mimeType: file.type }
            }, prompt]);

            const text = await result.response.text();
            const jsonStr = text.match(/\[.*\]/s)?.[0] || text;
            const parsed = JSON.parse(jsonStr);

            const finalData = parsed.map(v => ({ ...v, included: true }));
            setEditableVars(finalData);
            setOriginalVars(JSON.parse(JSON.stringify(finalData))); // Deep copy for reset
            setProjectDescription(generateNarrative(finalData));
            setAnalysisStep(1);
        } catch (err) {
            console.error(err);
            alert("AI Analysis failed. Falling back to trade simulation data.");
            const fallback = currentScope.data.items.map(v => ({ ...v, included: true }));
            setEditableVars(fallback);
            setOriginalVars(JSON.parse(JSON.stringify(fallback)));
            setProjectDescription(generateNarrative(fallback));
            setAnalysisStep(1);
        } finally {
            setAnalyzing(false);
        }
    };

    const generateNarrative = (items) => {
        if (!items || items.length === 0) return "";
        const names = items.slice(0, 3).map(i => i.label.toLowerCase()).join(", ");
        return `This professional engagement covers comprehensive services for ${names}${items.length > 3 ? ' and associated scope items' : ''}. All work will be executed following Mardegan Construction's premium standards for elite quality, precision, and architectural integrity.`;
    };

    const handleGenerateProposal = () => {
        const allData = {
            cleaning: orcamentoLimpeza,
            demolition: orcamentoDemolicao,
            painting: orcamentoPintura
        };
        const baseBid = editableVars
            .filter(v => v.included !== false)
            .reduce((acc, curr) => acc + (curr.qty * curr.unitCost), 0);

        allData[currentScope.id].items = editableVars.filter(v => v.included);
        allData[currentScope.id].totalBaseBid = baseBid;
        allData[currentScope.id].opMarkup = opMarkup;
        allData[currentScope.id].opAmount = baseBid * (opMarkup / 100);
        allData[currentScope.id].totalWithOp = projectedTotal;
        allData[currentScope.id].projectDescription = projectDescription;
        allData[currentScope.id].clientName = clientName;
        allData[currentScope.id].clientAddress = clientAddress;

        const html = gerarPropostaHTML(allData, currentScope.id);
        setProposalHtml(html);
        setAnalysisStep(2);
    };

    const getExternalPrompt = () => {
        return `Act as a Senior Construction Project Manager and Lead Estimator for Mardegan Construction. 
Your objective is to conduct an exhaustive Deep Spatial Analysis and Material Takeoff of the attached blueprint for ${currentScope.label}.
${includeScaleInPrompt && scaleValue ? `\nCRITICAL CONTEXT: The blueprint scale is ${scaleValue}. All measurements should be derived using this scale factor.\n` : ''}
MASTER ESTIMATOR PROTOCOL:
1. QUANTITATIVE ANALYSIS: Extract every measurable quantity with high precision (Sq.ft, Linear Ft, Counts).
2. MATERIAL SCHEDULE: Identify all specific material types, grades, and finishes mentioned.
3. LABOR ESTIMATION: Apply the MOST COMPETITIVE industrial market rates for professional labor in this scope.
4. COST OPTIMIZATION: Target the CHEAPEST viable prices for all materials and labor to ensure a winning bid.
5. LOGISTICAL AUDIT: Account for mobilization, debris removal, and overhead costs.

OUTPUT:
Return ONLY a valid JSON array of objects. EVERY row MUST be a critical project variable.
Fields: id, label, qty, unit, unitCost.
PROVIDE A COMPREHENSIVE LIST of all items found. NO LIMIT ON ITEMS.`;
    };

    const handleGenerateSmartPrompt = async () => {
        if (!apiKeys.google) { alert("API Key missing"); return; }
        setGeneratingSmart(true);
        try {
            const genAI = new GoogleGenerativeAI(apiKeys.google);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const masterPromptPrompt = `Act as an Elite Prompt Engineer & Senior Construction Estimator. 
            Write the ULTIMATE MASTER PROMPT for ${currentScope.label}. 
            ${includeScaleInPrompt && scaleValue ? `The blueprint being analyzed has a scale of ${scaleValue}. Make sure the generated prompt explicitly instructs the AI to use this scale for all calculations.` : ''}
            This prompt will be used by a contractor to analyze multi-page blueprints in Gemini/ChatGPT.
            The master prompt you write must:
            1. Use professional architectural and trade-specific terminology.
            2. Instruct the AI to perform a 'Zero-Error Takeoff' of all materials for ${currentScope.label}.
            3. MANDATORY: Explicitly instruct the AI to provide the MOST COMPETITIVE pricing and seek the CHEAPEST viable prices for all line items to ensure a successful bid.
            4. Demand a breakdown of labor, materials, and logistical fees.
            5. Force the output into a STRICT JSON ARRAY with fields: id, label, qty, unit, unitCost.
            6. Ensure the AI does not truncate results and looks at EVERY detail.
            Write the prompt in a way that makes the AI feel like it's a $200k/year Lead Estimator.`;

            const result = await model.generateContent(masterPromptPrompt);
            setSmartPrompt(await result.response.text());
        } catch (err) {
            console.error(err);
            setSmartPrompt(getExternalPrompt());
        } finally {
            setGeneratingSmart(false);
        }
    };

    const handleJSONImport = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            if (!Array.isArray(parsed)) throw new Error("Input must be a JSON array");

            // Explicitly clear state before adding new data to prevent mixing
            setEditableVars([]);
            setProposalHtml('');
            setProjectedTotal(0);

            const cleaned = parsed.map((item, idx) => ({
                id: item.id || idx + 1,
                label: item.label || 'Unknown Variable',
                qty: parseFloat(item.qty) || 0,
                unit: item.unit || 'units',
                unitCost: parseFloat(item.unitCost) || 0,
                included: true
            }));

            // Short timeout to ensure state cycle for "clearing cache" effect if desired, 
            // but React batching handles it. Forced reset by setting after clear.
            setEditableVars(cleaned);
            setOriginalVars(JSON.parse(JSON.stringify(cleaned)));
            setProjectDescription(generateNarrative(cleaned));
            setShowFacilitator(false);
            setAnalysisStep(1);
            setJsonInput('');
            setScaleFactor(1.0);
        } catch (err) {
            alert("Invalid JSON format! Please copy the exact array from the AI.");
        }
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
        <div className="unified-app">
            <nav className="top-bar">
                <div className="bar-left" onClick={() => { setView('launcher'); setAnalysisStep(0); }}>
                    <img src={logoImg} alt="Mardegan Logo" className="bar-logo" />
                    <div>
                        <span className="bar-title">MARDEGAN CONSTRUCTION</span>
                        <span className="bar-sub">Digital Estimator Hub</span>
                    </div>
                </div>
                {view === 'dashboard' && (
                    <div className="bar-center">
                        <span className="current-trade">{currentScope.icon} {currentScope.label}</span>
                    </div>
                )}
                <div className="bar-right">
                    <div className="engine-picker">
                        <button onClick={() => setEngineDropdownOpen(!engineDropdownOpen)}>
                            {currentEngine.icon} {currentEngine.label} ▾
                        </button>
                        {engineDropdownOpen && (
                            <div className="e-dropdown">
                                {AI_ENGINES.map(e => (
                                    <div key={e.id} className="e-opt" onClick={() => { setCurrentEngine(e); setEngineDropdownOpen(false); }}>
                                        {e.icon} {e.label}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="content">
                {view === 'launcher' && (
                    <div className="launcher fade-in">
                        <header className="launcher-hero">
                            <h1>Master Construction Portal</h1>
                            <p>Choose your trade to begin deep spatial analysis and bid modeling.</p>
                        </header>
                        <div className="scope-grid">
                            {SCOPES.map(s => (
                                <div key={s.id} className="scope-card" onClick={() => handleSelectScope(s)}>
                                    <div className="scope-icon" style={{ color: s.color }}>{s.icon}</div>
                                    <div className="scope-badge" style={{ background: s.color + '20', color: s.color }}>{s.tag}</div>
                                    <h3>{s.label}</h3>
                                    <p>AI-driven takeoff for major project variables.</p>
                                    <button className="select-btn">Select Trade →</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'dashboard' && (
                    <div className="dashboard fade-in">
                        {analysisStep === 0 && (
                            <div className="upload-view">
                                <div className="discovery-grid">
                                    <div className={`dropzone main-path ${analyzing ? 'is-analyzing' : ''}`} onClick={handleUpload}>
                                        <input type="file" ref={fileInputRef} hidden accept=".pdf" onChange={e => e.target.files.length && processAI(e.target.files[0])} />
                                        {analyzing ? (
                                            <div className="analyzer-status">
                                                <div className="spinner-v2"></div>
                                                <p>AI Engine Scanning Blueprint...</p>
                                                <span>Extracting {currentScope.label} schedules</span>
                                            </div>
                                        ) : (
                                            <div className="upload-prompt">
                                                <div className="hint-icon">📄</div>
                                                <h3>Direct AI Scan</h3>
                                                <p>Analyze with {currentEngine.label}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="web-helper-card side-path" onClick={() => setShowFacilitator(true)}>
                                        <div className="helper-badge">ALTERNATE</div>
                                        <div className="helper-icon">🌐</div>
                                        <h3>Manual Web AI Scan</h3>
                                        <p>Use Gemini/ChatGPT web with our custom prompt</p>
                                        <button className="helper-btn">Open Facilitator →</button>
                                    </div>
                                </div>
                                <button className="back-btn" onClick={() => setView('launcher')}>← Return to Portal</button>
                            </div>
                        )}

                        {analysisStep === 1 && (
                            <div className="audit-view">
                                <header className="audit-header">
                                    <h2>Audit Hub</h2>
                                    <div className="project-total">
                                        <label>Project Bid</label>
                                        <span>{formatCurrency(projectedTotal)}</span>
                                    </div>
                                </header>

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
                                            <label>O&P Markup %</label>
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
                                    <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--tm)', fontWeight: 900, textTransform: 'uppercase', marginBottom: '8px' }}>Project Narrative / Description</label>
                                    <textarea
                                        value={projectDescription}
                                        onChange={(e) => setProjectDescription(e.target.value)}
                                        style={{ width: '100%', padding: '20px', borderRadius: '16px', background: '#0b0e14', border: '1px solid var(--border)', color: '#fff', fontSize: '0.9rem', fontFamily: 'Inter', minHeight: '100px', lineHeight: '1.6', resize: 'vertical' }}
                                        placeholder="Describe the scope of work for the proposal..."
                                    />
                                </div>

                                <table className="audit-table">
                                    <thead>
                                        <tr>
                                            <th>Incl.</th>
                                            <th>Variable</th>
                                            <th>Qty</th>
                                            <th>Unit</th>
                                            <th>Unit Cost</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {editableVars.map(v => (
                                            <tr key={v.id} className={v.included ? '' : 'is-excluded'}>
                                                <td><input type="checkbox" checked={v.included} onChange={() => setEditableVars(prev => prev.map(x => x.id === v.id ? { ...x, included: !x.included } : x))} /></td>
                                                <td>{v.label}</td>
                                                <td><input type="number" value={v.qty} onChange={e => setEditableVars(prev => prev.map(x => x.id === v.id ? { ...x, qty: parseFloat(e.target.value) || 0 } : x))} /></td>
                                                <td>{v.unit}</td>
                                                <td>$ <input type="number" value={v.unitCost} onChange={e => setEditableVars(prev => prev.map(x => x.id === v.id ? { ...x, unitCost: parseFloat(e.target.value) || 0 } : x))} /></td>
                                                <td className="st">{formatCurrency(v.qty * v.unitCost)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="audit-footer">
                                    <button className="secondary" onClick={() => {
                                        setEditableVars([]);
                                        setProposalHtml('');
                                        setAnalysisStep(0);
                                    }}>← New Scan (Clear All)</button>
                                    <button className="market-btn" onClick={() => setShowMarketModal(true)}>📈 Check Market Costs (DFW)</button>
                                    <button className="primary" onClick={handleGenerateProposal}>Build Proposal →</button>
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
                                    <p style={{ color: 'var(--tm)', fontSize: '0.8rem', marginBottom: '20px' }}>Reference rates for ${currentScope.label} specialized services in Dallas-Fort Worth area.</p>
                                    <div className="market-list">
                                        {Object.entries(MARKET_COSTS[currentScope.id]).map(([label, data]) => (
                                            <div key={label} className="market-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                                                <div style={{ flex: 1 }}>
                                                    <strong style={{ display: 'block', fontSize: '0.9rem' }}>{label}</strong>
                                                    <span style={{ fontSize: '0.7rem', color: 'var(--tm)' }}>{data.unit} basis</span>
                                                </div>
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ color: 'var(--a)', fontWeight: '800' }}>Avg: {formatCurrency(data.avg)}</div>
                                                    <div style={{ fontSize: '0.7rem' }}>Range: {formatCurrency(data.min)} - {formatCurrency(data.max)}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="import-btn" style={{ marginTop: '20px' }} onClick={() => setShowMarketModal(false)}>Close Reference</button>
                                </div>
                            </div>
                        )}

                        {analysisStep === 2 && (
                            <div className="preview-view">
                                <div className="preview-bar">
                                    <button onClick={() => setAnalysisStep(1)}>← Edit Audit</button>
                                    <button className="accent" onClick={() => {
                                        const win = window.open('', '_blank');
                                        win.document.write(proposalHtml);
                                        win.document.close();
                                    }}>Print Document</button>
                                </div>
                                <div className="doc-frame" style={{ height: '800px', background: '#fff', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                    <iframe title="Proposal" srcDoc={proposalHtml} style={{ width: '100%', height: '100%', border: 'none' }} />
                                </div>
                            </div>
                        )}

                        {showFacilitator && (
                            <div className="modal-overlay" onClick={() => setShowFacilitator(false)}>
                                <div className="modal-content" onClick={e => e.stopPropagation()}>
                                    <div className="modal-header">
                                        <h2>Master Scout AI Helper</h2>
                                        <button className="close-btn" onClick={() => setShowFacilitator(false)}>×</button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="step">
                                            <span className="num">1</span>
                                            <div className="s-body">
                                                <strong>Develop Expert Prompt</strong>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '15px', padding: '15px', background: '#0b0e14', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <input
                                                            type="checkbox"
                                                            id="includeScale"
                                                            checked={includeScaleInPrompt}
                                                            onChange={e => setIncludeScaleInPrompt(e.target.checked)}
                                                            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                                        />
                                                        <label htmlFor="includeScale" style={{ fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }}>Include Blueprint Scale</label>
                                                    </div>
                                                    {includeScaleInPrompt && (
                                                        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                            <div>
                                                                <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--tm)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Select Standard Scale</label>
                                                                <select
                                                                    value={showCustomScale ? 'Other (Custom)...' : scaleValue}
                                                                    onChange={e => {
                                                                        const val = e.target.value;
                                                                        if (val === 'Other (Custom)...') {
                                                                            setShowCustomScale(true);
                                                                            if (scaleValue === val || COMMON_SCALES.includes(scaleValue)) setScaleValue('');
                                                                        } else {
                                                                            setShowCustomScale(false);
                                                                            setScaleValue(val);
                                                                        }
                                                                    }}
                                                                    style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', background: '#161b22', border: '1px solid var(--border)', color: '#fff', fontSize: '0.9rem', cursor: 'pointer' }}
                                                                >
                                                                    {COMMON_SCALES.map(s => <option key={s} value={s}>{s}</option>)}
                                                                </select>
                                                            </div>

                                                            {showCustomScale && (
                                                                <div className="fade-in">
                                                                    <label style={{ display: 'block', fontSize: '0.65rem', color: 'var(--tm)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>Custom Scale Value</label>
                                                                    <input
                                                                        type="text"
                                                                        value={scaleValue}
                                                                        onChange={e => setScaleValue(e.target.value)}
                                                                        placeholder='Enter custom scale (e.g. 1:50)...'
                                                                        style={{ width: '100%', padding: '12px 15px', borderRadius: '10px', background: '#161b22', border: '1px solid var(--border)', color: '#fff', fontSize: '0.9rem' }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                                    <button className="prompt-btn" onClick={handleGenerateSmartPrompt} disabled={generatingSmart}>
                                                        {generatingSmart ? '🤖 Crafting...' : '✨ Generate Smart Deep Prompt'}
                                                    </button>
                                                    <button className="prompt-btn" style={{ width: 'auto' }} onClick={() => { navigator.clipboard.writeText(smartPrompt || getExternalPrompt()); alert("Prompt copied!"); }}>
                                                        📋 Copy
                                                    </button>
                                                </div>
                                                {smartPrompt && (
                                                    <div style={{ padding: '10px', background: '#0b0e14', borderRadius: '8px', fontSize: '0.7rem', maxHeight: '100px', overflowY: 'auto', border: '1px solid var(--border)', color: '#10b981' }}>
                                                        {smartPrompt}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="step">
                                            <span className="num">2</span>
                                            <div className="s-body">
                                                <strong>Open AI Web</strong>
                                                <div className="link-row">
                                                    <a href="https://gemini.google.com" target="_blank" rel="noreferrer" className="l-gemini">Gemini</a>
                                                    <a href="https://chatgpt.com" target="_blank" rel="noreferrer" className="l-gpt">ChatGPT</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="step">
                                            <span className="num">3</span>
                                            <div className="s-body">
                                                <strong>Paste & Import Results</strong>
                                                <textarea
                                                    className="import-area"
                                                    placeholder='Paste JSON array here...'
                                                    value={jsonInput}
                                                    onChange={e => setJsonInput(e.target.value)}
                                                />
                                                <button className="import-btn" onClick={handleJSONImport}>Import & Audit Data</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <style>{`
                :root { --p: #0f172a; --a: #3b82f6; --t: #e2e8f0; --tm: #94a3b8; --b: #1e293b; --border: #334155; }
                .unified-app { min-height: 100vh; background: #0b0e14; color: var(--t); font-family: 'Outfit', sans-serif; }
                
                .top-bar { height: 90px; display: flex; align-items: center; justify-content: space-between; padding: 0 50px; background: #0b0e14; border-bottom: 2px solid var(--border); }
                .bar-left { display: flex; align-items: center; gap: 15px; cursor: pointer; }
                .bar-logo { height: 45px; border-radius: 10px; box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); }
                .bar-title { display: block; font-weight: 900; font-size: 1.1rem; letter-spacing: -0.5px; }
                .bar-sub { display: block; font-size: 0.6rem; color: var(--tm); text-transform: uppercase; font-weight: 800; letter-spacing: 1px; }
                
                .engine-picker { position: relative; }
                .engine-picker button { background: var(--b); border: 1px solid var(--border); color: #fff; padding: 8px 16px; border-radius: 8px; cursor: pointer; }
                .e-dropdown { position: absolute; top:110%; right:0; background: #161b22; border:1px solid var(--border); border-radius: 12px; padding: 8px; z-index: 1000; min-width: 180px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
                .e-opt { padding: 10px; cursor: pointer; border-radius: 8px; }
                .e-opt:hover { background: var(--b); color: var(--a); }

                .content { max-width: 1100px; margin: 0 auto; padding: 80px 20px; }
                .launcher-hero { text-align: center; margin-bottom: 60px; }
                .launcher-hero h1 { font-size: 3.5rem; font-weight: 900; letter-spacing: -2px; }
                .launcher-hero p { color: var(--tm); font-size: 1.2rem; }

                .scope-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
                .scope-card { background: #161b22; border: 1px solid var(--border); padding: 40px; border-radius: 40px; text-align: center; cursor: pointer; transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden; background: linear-gradient(145deg, #1c2128, #161b22); }
                .scope-card::before { content: ''; position: absolute; top:0; left:0; width:100%; height:4px; opacity:0; transition:0.3s; }
                .scope-card:hover { transform: scale(1.05); border-color: var(--a); box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
                .scope-card:hover::before { opacity:1; background: var(--a); }
                .scope-icon { font-size: 4rem; margin-bottom: 20px; }
                .scope-badge { display: inline-block; padding: 4px 12px; border-radius: 50px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; margin-bottom: 15px; }
                .scope-card h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 10px; }
                .scope-card p { font-size: 0.9rem; color: var(--tm); margin-bottom: 25px; }
                .select-btn { width: 100%; border: 1px solid var(--border); background: var(--b); color: #fff; padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer; }
                .scope-card:hover .select-btn { background: var(--a); border: none; }

                .dropzone { background: #161b22; border: 2px dashed var(--border); border-radius: 40px; padding: 100px; text-align: center; cursor: pointer; transition: 0.3s; }
                .dropzone:hover { border-color: var(--a); background: #1c2128; }
                .hint-icon { font-size: 4rem; margin-bottom: 20px; }
                .spinner-v2 { width: 50px; height: 50px; border: 4px solid var(--border); border-top-color: var(--a); border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
                @keyframes spin { to { transform: rotate(360deg); } }

                .audit-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
                .project-total { background: var(--a); padding: 20px 40px; border-radius: 20px; text-align: right; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3); }
                .project-total label { display: block; font-size: 0.7rem; font-weight: 800; opacity: 0.8; }
                .project-total span { font-size: 2.2rem; font-weight: 900; color: #fff; }

                .audit-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; }
                .audit-table th { text-align: left; padding: 0 20px; color: var(--tm); font-size: 0.7rem; text-transform: uppercase; }
                .audit-table td { background: #161b22; padding: 24px 20px; }
                .audit-table td:first-child { border-radius: 16px 0 0 16px; }
                .audit-table td:last-child { border-radius: 0 16px 16px 0; }
                .audit-table input[type="number"] { background: #0b0e14; border: 1px solid var(--border); color: var(--a); padding: 8px; border-radius: 8px; width: 90px; font-weight: 800; }
                .st { font-weight: 800; color: #fff; text-align: right; font-size: 1.1rem; }
                .is-excluded { opacity: 0.3; }

                .audit-footer { display: flex; justify-content: space-between; margin-top: 40px; gap: 15px; }
                .audit-footer button { padding: 15px 30px; border-radius: 16px; font-weight: 800; cursor: pointer; border: none; flex: 1; }
                .audit-footer .primary { background: var(--a); color: #fff; }
                .audit-footer .secondary { background: #21262d; color: var(--tm); border: 1px solid var(--border); }
                .audit-footer .market-btn { background: #161b22; color: #10b981; border: 1px solid #10b981; }
                .audit-footer .market-btn:hover { background: #10b98110; }

                .scale-bar { background: #161b22; border: 1px solid var(--border); border-radius: 24px; padding: 25px 30px; margin-bottom: 30px; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
                .scale-info strong { display: block; font-size: 1.1rem; color: #fff; margin-bottom: 4px; }
                .scale-info span { font-size: 0.8rem; color: var(--tm); }
                .scale-controls { display: flex; align-items: center; gap: 15px; }
                .scale-field label { display: block; font-size: 0.65rem; color: var(--tm); text-transform: uppercase; font-weight: 800; margin-bottom: 6px; }
                .scale-field input { background: #0b0e14; border: 1px solid var(--border); color: var(--a); padding: 10px 15px; border-radius: 10px; width: 100px; font-weight: 800; font-size: 1rem; }
                .apply-scale-btn { background: var(--a); color: #fff; border: none; padding: 12px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.3s; }
                .apply-scale-btn:hover { filter: brightness(1.2); }
                .reset-scale-btn { background: #21262d; color: var(--tm); border: 1px solid var(--border); padding: 12px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; }

                .discovery-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 30px; }
                .web-helper-card { background: #161b22; border: 1px solid var(--border); padding: 40px; border-radius: 32px; text-align: center; cursor: pointer; transition: 0.3s; position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .web-helper-card:hover { border-color: #10b981; transform: translateY(-5px); }
                .helper-badge { position: absolute; top: 20px; right: 20px; background: #10b98120; color: #10b981; padding: 4px 10px; border-radius: 50px; font-size: 0.6rem; font-weight: 800; }
                .helper-icon { font-size: 3rem; margin-bottom: 20px; }
                .helper-btn { margin-top: 20px; width: 100%; padding: 12px; background: #21262d; border: 1px solid var(--border); color: #fff; border-radius: 12px; cursor: pointer; font-weight: 700; }
                .web-helper-card:hover .helper-btn { background: #10b981; border: none; }

                .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
                .modal-content { background: #161b22; width: 100%; max-width: 500px; border-radius: 32px; border: 1px solid var(--border); padding: 40px; }
                .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .close-btn { background: none; border: none; font-size: 2rem; color: var(--tm); cursor: pointer; }
                
                .step { display: flex; gap: 20px; margin-bottom: 24px; }
                .num { width: 32px; height: 32px; background: var(--a); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; flex-shrink: 0; }
                .s-body { flex: 1; }
                .s-body strong { display: block; margin-bottom: 8px; }
                .prompt-btn { width: 100%; padding: 12px; background: #21262d; border: 1px dashed var(--border); color: var(--a); border-radius: 10px; cursor: pointer; font-weight: 600; }
                .link-row { display: flex; gap: 10px; }
                .link-row a { flex: 1; padding: 12px; text-decoration: none; border-radius: 10px; text-align: center; color: #fff; font-weight: 700; }
                .l-gemini { background: #4285f4; }
                .l-gpt { background: #10a37f; }
                
                .import-area { width: 100%; height: 100px; background: #0b0e14; border: 1px solid var(--border); border-radius: 12px; color: var(--t); padding: 12px; font-family: monospace; font-size: 0.8rem; margin: 12px 0; resize: none; }
                .import-btn { width: 100%; padding: 14px; background: var(--a); border: none; color: #fff; border-radius: 12px; font-weight: 800; cursor: pointer; }

                .preview-view { }

                .fade-in { animation: fadeIn 0.6s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                .back-btn { margin-top: 40px; background: none; border: none; color: var(--tm); cursor: pointer; font-size: 1rem; }
            `}</style>
        </div>
    );
}

export default App;
