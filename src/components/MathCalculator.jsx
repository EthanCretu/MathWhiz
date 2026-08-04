import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Activity, RotateCcw, HelpCircle, Check, Play } from 'lucide-react';

export const MathCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);
  const [functionStr, setFunctionStr] = useState('Math.sin(x)');
  const [graphPreset, setGraphPreset] = useState('sin');
  const canvasRef = useRef(null);

  const handleBtn = (val) => {
    if (val === 'C') {
      setDisplay('0');
    } else if (val === '⌫') {
      setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else if (val === '=') {
      try {
        let expr = display
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/sqrt\(/g, 'Math.sqrt(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(')
          .replace(/\^/g, '**');

        // Safe evaluation
        // eslint-disable-next-line no-new-func
        const res = Function(`"use strict"; return (${expr})`)();
        const formattedRes = Number.isInteger(res) ? res.toString() : Number(res).toFixed(6).replace(/\.?0+$/, '');
        setHistory((prev) => [`${display} = ${formattedRes}`, ...prev.slice(0, 7)]);
        setDisplay(formattedRes);
      } catch (err) {
        setDisplay('Syntax Error');
      }
    } else {
      setDisplay((prev) => (prev === '0' || prev === 'Syntax Error' ? val : prev + val));
    }
  };

  // Draw Function Plot on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;

    const scale = 30; // pixels per unit
    const originX = width / 2;
    const originY = height / 2;

    // Draw Grid
    for (let x = 0; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    // X axis
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();
    // Y axis
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Plot Curve
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    let started = false;
    for (let pixelX = 0; pixelX < width; pixelX += 2) {
      const xVal = (pixelX - originX) / scale;
      let yVal = 0;

      try {
        if (graphPreset === 'sin') yVal = Math.sin(xVal);
        else if (graphPreset === 'cos') yVal = Math.cos(xVal);
        else if (graphPreset === 'parabola') yVal = xVal * xVal - 3;
        else if (graphPreset === 'cubic') yVal = 0.2 * Math.pow(xVal, 3) - xVal;
        else if (graphPreset === 'tan') yVal = Math.tan(xVal);
        else {
          // eslint-disable-next-line no-new-func
          yVal = Function('x', `"use strict"; return (${functionStr})`)(xVal);
        }

        const pixelY = originY - yVal * scale;

        if (isNaN(pixelY) || !isFinite(pixelY) || Math.abs(pixelY) > height * 2) {
          started = false;
        } else {
          if (!started) {
            ctx.moveTo(pixelX, pixelY);
            started = true;
          } else {
            ctx.lineTo(pixelX, pixelY);
          }
        }
      } catch (e) {
        // Skip rendering errors
      }
    }
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px sans-serif';
    ctx.fillText('x', width - 15, originY - 8);
    ctx.fillText('y', originX + 8, 15);
  }, [graphPreset, functionStr]);

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 max-w-5xl mx-auto my-8">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">MathWhiz Scientific Engine & Function Plotter</h2>
            <p className="text-xs text-slate-400">Interactive K-12 Numerical Solver & Graphical Analysis</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Mode: Active Precision
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scientific Calculator Panel */}
        <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">Input Matrix</span>
              <div className="mt-1 bg-slate-900 p-3.5 rounded-lg border border-slate-800 text-right min-h-[64px] flex flex-col justify-end overflow-hidden">
                <span className="text-2xl font-mono font-bold tracking-tight text-blue-400 break-all">{display}</span>
              </div>
            </div>

            {/* Calc Buttons Grid */}
            <div className="grid grid-cols-4 gap-2 text-sm font-semibold">
              {['sin(', 'cos(', 'tan(', 'C', 'log(', 'ln(', '^', '⌫', 'sqrt(', 'π', 'e', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '(', ')'].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleBtn(btn)}
                  className={`p-2.5 rounded-lg border transition-all duration-150 active:scale-95 ${
                    btn === 'C'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30'
                      : ['÷', '×', '-', '+'].includes(btn)
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30'
                      : ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(', '^', 'π', 'e'].includes(btn)
                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30 text-xs'
                      : 'bg-slate-800/80 text-slate-200 border-slate-700/50 hover:bg-slate-700/80'
                  }`}
                >
                  {btn}
                </button>
              ))}
              <button
                onClick={() => handleBtn('=')}
                className="col-span-4 p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98] mt-1"
              >
                Calculate Answer (=)
              </button>
            </div>
          </div>

          {/* History Snippet */}
          {history.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Recent Solutions</span>
              <div className="mt-1 space-y-1 max-h-20 overflow-y-auto text-xs font-mono text-slate-400">
                {history.map((h, idx) => (
                  <div key={idx} className="flex justify-between border-b border-slate-800/40 pb-0.5">
                    <span>{h.split('=')[0]}</span>
                    <span className="text-emerald-400 font-bold">= {h.split('=')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2D Interactive Function Plotter Panel */}
        <div className="lg:col-span-7 bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-white">2D Coordinate Graphing Canvas</h3>
            </div>
            <div className="flex gap-1.5 text-xs">
              {[
                { label: 'f(x) = sin(x)', val: 'sin' },
                { label: 'f(x) = cos(x)', val: 'cos' },
                { label: 'Parabola', val: 'parabola' },
                { label: 'Cubic Curve', val: 'cubic' },
              ].map((p) => (
                <button
                  key={p.val}
                  onClick={() => setGraphPreset(p.val)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${
                    graphPreset === p.val
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 font-semibold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex-1 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center min-h-[260px]">
            <canvas ref={canvasRef} width={460} height={260} className="w-full h-full object-cover" />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-mono text-sky-400 font-bold">f(x) =</span>
              <input
                type="text"
                value={functionStr}
                onChange={(e) => {
                  setFunctionStr(e.target.value);
                  setGraphPreset('custom');
                }}
                placeholder="Math.sin(x) * x"
                className="bg-slate-950 border border-slate-700 text-white font-mono text-xs px-2.5 py-1 rounded focus:outline-none focus:border-sky-500 w-48"
              />
            </div>
            <span className="text-[11px] text-slate-500">Grid Scale: 1 unit = 30px</span>
          </div>
        </div>
      </div>
    </div>
  );
};
