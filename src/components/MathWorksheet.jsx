import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, Award, HelpCircle, FileText, ArrowRight, RefreshCw, ShieldAlert } from 'lucide-react';

const MATH_PROBLEMS = [
  {
    id: 'p1',
    topic: 'Algebra II - Quadratic Formula',
    question: 'Solve for x in the equation: 2x² - 8x + 6 = 0',
    options: ['x = 1, x = 3', 'x = -1, x = -3', 'x = 2, x = 4', 'x = 0, x = 3'],
    correctIndex: 0,
    explanation: 'Divide by 2: x² - 4x + 3 = 0. Factoring gives (x - 1)(x - 3) = 0, so x = 1 and x = 3.',
    difficulty: 'Easy'
  },
  {
    id: 'p2',
    topic: 'AP Calculus BC - Derivatives',
    question: 'What is the derivative of f(x) = x³ · sin(x) with respect to x?',
    options: [
      "f'(x) = 3x² · cos(x)",
      "f'(x) = 3x² · sin(x) + x³ · cos(x)",
      "f'(x) = x³ · cos(x) - 3x²",
      "f'(x) = 3x² · sin(x) - x³ · cos(x)"
    ],
    correctIndex: 1,
    explanation: "Using the product rule (u·v)' = u'v + uv': d/dx[x³]·sin(x) + x³·d/dx[sin(x)] = 3x²sin(x) + x³cos(x).",
    difficulty: 'Medium'
  },
  {
    id: 'p3',
    topic: 'Trigonometry - Fundamental Identities',
    question: 'Simplify the trigonometric expression: sin²(θ) + cos²(θ) + tan²(θ)',
    options: ['sec²(θ)', 'csc²(θ)', '1 + sin(θ)', '2 tan(θ)'],
    correctIndex: 0,
    explanation: 'Since sin²(θ) + cos²(θ) = 1, the expression becomes 1 + tan²(θ). By Pythagorean identity, 1 + tan²(θ) = sec²(θ).',
    difficulty: 'Medium'
  },
  {
    id: 'p4',
    topic: 'Euclidean Geometry - Circle Theorems',
    question: 'A circle has an area of 36π cm². What is the perimeter (circumference) of the circle?',
    options: ['12π cm', '18π cm', '6π cm', '36π cm'],
    correctIndex: 0,
    explanation: 'Area = πr² = 36π => r² = 36 => r = 6 cm. Circumference = 2πr = 2π(6) = 12π cm.',
    difficulty: 'Easy'
  },
  {
    id: 'p5',
    topic: 'Calculus - Definite Integrals',
    question: 'Evaluate the integral: ∫₀² (3x² - 2x + 1) dx',
    options: ['6', '8', '10', '4'],
    correctIndex: 0,
    explanation: 'Antiderivative F(x) = x³ - x² + x. F(2) = 2³ - 2² + 2 = 8 - 4 + 2 = 6. F(0) = 0. So F(2) - F(0) = 6.',
    difficulty: 'Hard'
  }
];

export const MathWorksheet = ({
  isPanicOverlay = false,
  onClosePanic,
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [score, setScore] = useState(0);

  const handleSelect = (problemId, optionIdx) => {
    if (submitted[problemId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [problemId]: optionIdx }));
  };

  const handleSubmit = (problem) => {
    const chosen = selectedAnswers[problem.id];
    if (chosen === undefined) return;

    setSubmitted((prev) => ({ ...prev, [problem.id]: true }));
    if (chosen === problem.correctIndex) {
      setScore((prev) => prev + 10);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted({});
    setScore(0);
  };

  return (
    <div className={`p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl max-w-5xl mx-auto my-6 text-slate-100 ${isPanicOverlay ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-950 rounded-none max-w-none my-0 border-none p-8' : ''}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-800 gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">Official Practice Sheet</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white mt-1">AP Calculus & Advanced Mathematics Worksheet #4</h2>
          <p className="text-xs text-slate-400 mt-0.5">Section 4.2: Quadratic Functions, Derivatives, and Definite Integrals</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/80 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-200">Score: <strong className="text-amber-400">{score} pts</strong></span>
          </div>
          <button
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-all text-xs font-medium flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Answers
          </button>
          {isPanicOverlay && onClosePanic && (
            <button
              onClick={onClosePanic}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
            >
              Resume Lesson (Exit Shield)
            </button>
          )}
        </div>
      </div>

      {isPanicOverlay && (
        <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-300 text-xs flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <ShieldAlert className="w-4 h-4 text-blue-400" /> MathWhiz Stealth Shield Activated. Displaying Standard Calculus Exercise Sheet.
          </span>
          <span className="text-[11px] text-slate-400">Press Esc or click button top right to exit mask</span>
        </div>
      )}

      {/* Formulas Quick Sheet */}
      <div className="mb-8 p-4 bg-slate-950/80 border border-slate-800 rounded-xl">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-sky-400" /> Core Mathematical Formulas Reference
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-300">
          <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800/80">
            <span className="text-sky-400 font-semibold block text-[11px]">Quadratic Formula</span>
            <span>x = (-b ± √(b² - 4ac)) / (2a)</span>
          </div>
          <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800/80">
            <span className="text-sky-400 font-semibold block text-[11px]">Calculus Product Rule</span>
            <span>d/dx [u · v] = u'v + uv'</span>
          </div>
          <div className="bg-slate-900/90 p-2.5 rounded border border-slate-800/80">
            <span className="text-sky-400 font-semibold block text-[11px]">Pythagorean Trig</span>
            <span>sin²(θ) + cos²(θ) = 1</span>
          </div>
        </div>
      </div>

      {/* Practice Problems List */}
      <div className="space-y-6">
        {MATH_PROBLEMS.map((prob, idx) => {
          const isDone = submitted[prob.id];
          const selected = selectedAnswers[prob.id];
          const isCorrect = selected === prob.correctIndex;

          return (
            <div key={prob.id} className="p-5 bg-slate-950/70 border border-slate-800 rounded-xl transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Question {idx + 1} • {prob.topic}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    prob.difficulty === 'Easy'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : prob.difficulty === 'Medium'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}
                >
                  {prob.difficulty}
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-100 mb-4">{prob.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {prob.options.map((opt, optionIdx) => {
                  const isThisSelected = selected === optionIdx;
                  let btnStyle = 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-850';

                  if (isDone) {
                    if (optionIdx === prob.correctIndex) {
                      btnStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold';
                    } else if (isThisSelected) {
                      btnStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-300';
                    } else {
                      btnStyle = 'bg-slate-900/50 text-slate-500 border-slate-800/50';
                    }
                  } else if (isThisSelected) {
                    btnStyle = 'bg-blue-600/30 border-blue-500 text-blue-200 font-semibold';
                  }

                  return (
                    <button
                      key={optionIdx}
                      disabled={isDone}
                      onClick={() => handleSelect(prob.id, optionIdx)}
                      className={`p-3 text-left rounded-lg text-xs border transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span className="font-mono">{opt}</span>
                      {isDone && optionIdx === prob.correctIndex && <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                      {isDone && isThisSelected && optionIdx !== prob.correctIndex && <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {!isDone ? (
                <button
                  disabled={selected === undefined}
                  onClick={() => handleSubmit(prob)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    selected !== undefined
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <div className={`p-3 rounded-lg border text-xs ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-rose-500/10 border-rose-500/30 text-rose-200'}`}>
                  <span className="font-bold block mb-1">{isCorrect ? 'Correct! +10 Points' : 'Incorrect Solution'}</span>
                  <p className="text-slate-300 text-[11px]">{prob.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
