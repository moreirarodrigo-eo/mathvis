import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calculator, Shapes, Lightbulb } from 'lucide-react';

// Configuração da animação: mola lenta e fluida para acompanhamento visual
const springAnim = { type: 'spring', stiffness: 40, damping: 12 };

// Componente utilitário para cada termo da equação
const Term = ({ id, children, className = "", layoutId }) => (
  <motion.div
    layout
    layoutId={layoutId || id}
    transition={springAnim}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
    className={`flex items-center justify-center font-black text-5xl md:text-6xl tracking-tighter mx-1 ${className}`}
  >
    {children}
  </motion.div>
);

// Componente para a fração (divisão)
const Fraction = ({ children }) => {
  const [numerator, denominator] = React.Children.toArray(children);
  return (
    <motion.div layout transition={springAnim} className="flex flex-col items-center justify-center gap-1 mx-2">
      {numerator}
      <motion.div
        layout
        layoutId="fraction-line"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        transition={springAnim}
        className="w-full h-1.5 md:h-2 bg-slate-800 rounded-full min-w-[60px]"
      />
      {denominator}
    </motion.div>
  );
};

export default function MathVisualizer() {
  const [activeTab, setActiveTab] = useState('geometry');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8 font-sans text-slate-800 selection:bg-blue-200">
      
      {/* HEADER PRINCIPAL */}
      <header className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3 text-blue-600">
          <Shapes size={36} className="drop-shadow-sm" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Math Flow</h1>
        </div>
        
        {/* TAB SELECTOR */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
          <button 
            onClick={() => setActiveTab('equations')} 
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'equations' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Equações
          </button>
          <button 
            onClick={() => setActiveTab('geometry')} 
            className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'geometry' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Geometria
          </button>
        </div>
      </header>

      {/* RENDERIZAÇÃO DAS ABAS */}
      <div className="w-full flex justify-center">
        {activeTab === 'equations' ? <EquationsApp /> : <GeometryApp />}
      </div>
      
    </div>
  );
}

// ==========================================
// ABA 1: EQUAÇÕES
// ==========================================
const EquationsApp = () => {
  const [step, setStep] = useState(0);
  const maxSteps = 4;

  const handleNext = () => step < maxSteps && setStep(step + 1);
  const handlePrev = () => step > 0 && setStep(step - 1);

  const explanations = [
    "Vamos resolver a equação: 3x - 2 = x + 4",
    "Agrupamos letras de um lado, números do outro. Observe o 'x' e o '-2' voando e trocando de sinal!",
    "Simplificamos os dois lados da igualdade.",
    "O 2 que está multiplicando passa para o outro lado dividindo.",
    "Pronto! Encontramos o valor de x."
  ];

  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
      <div className="w-full flex-1 min-h-[450px] bg-white rounded-[3rem] shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden px-4 py-20 mb-8">
        
        <div className="flex items-center justify-center w-full">
          {/* LADO ESQUERDO */}
          <motion.div layout transition={springAnim} className="flex items-center justify-end min-w-[150px]">
            <AnimatePresence mode="popLayout">
              {step <= 1 && <Term key="coeff-3" layoutId="coeff" className="text-blue-500">3</Term>}
              {step === 2 && <Term key="coeff-2" layoutId="coeff" className="text-blue-600">2</Term>}
              <Term key="x-base" layoutId="x-base" className="text-slate-800">x</Term>
              {step === 0 && <Term key="sign-2" layoutId="sign-2" className="text-rose-500 ml-4">-</Term>}
              {step === 0 && <Term key="val-2" layoutId="val-2" className="text-rose-500">2</Term>}
              {step === 1 && <Term key="sign-x" layoutId="sign-x" className="text-indigo-500 ml-4">-</Term>}
              {step === 1 && <Term key="val-x" layoutId="moving-x" className="text-indigo-500">x</Term>}
            </AnimatePresence>
          </motion.div>

          <Term layoutId="equals" className="text-slate-300 mx-6 md:mx-10">=</Term>

          {/* LADO DIREITO */}
          <motion.div layout transition={springAnim} className="flex items-center justify-start min-w-[150px]">
            <AnimatePresence mode="popLayout">
              {step === 0 && <Term key="val-x-right" layoutId="moving-x" className="text-indigo-500 mr-4">x</Term>}
              {step === 0 && <Term key="sign-4" layoutId="sign-4" className="text-emerald-500 mr-2">+</Term>}
              {step <= 1 && <Term key="val-4" layoutId="val-4" className="text-emerald-500">4</Term>}
              {step === 1 && <Term key="sign-2-right" layoutId="sign-2" className="text-rose-500 ml-4">+</Term>}
              {step === 1 && <Term key="val-2-right" layoutId="val-2" className="text-rose-500">2</Term>}
              {step === 2 && <Term key="val-6" layoutId="val-4" className="text-purple-600">6</Term>}
              {step === 3 && (
                <Fraction>
                  <Term key="val-6-frac" layoutId="val-4" className="text-purple-600">6</Term>
                  <Term key="coeff-2-frac" layoutId="coeff" className="text-blue-600">2</Term>
                </Fraction>
              )}
              {step === 4 && <Term key="val-3" layoutId="val-4" className="text-orange-500 !text-7xl md:!text-8xl">3</Term>}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* TEXTO EXPLICATIVO */}
        <div className="absolute bottom-10 left-0 w-full px-8 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-blue-50 text-blue-800 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm border border-blue-100 max-w-2xl text-center"
            >
              <Lightbulb size={24} className="text-amber-500 shrink-0" />
              <span className="font-medium text-lg md:text-xl">{explanations[step]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CONTROLES DA EQUAÇÃO */}
      <div className="w-full max-w-2xl flex justify-between">
        <button onClick={handlePrev} disabled={step===0} className={`px-6 py-3 rounded-2xl font-bold flex gap-2 items-center transition-all ${step===0?'opacity-50 cursor-not-allowed bg-slate-200 text-slate-400':'bg-white shadow-sm text-slate-600 hover:bg-slate-50 active:scale-95'}`}><ChevronLeft/> Voltar</button>
        <div className="flex items-center gap-3">
          {Array.from({ length: maxSteps + 1 }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${i === step ? 'bg-blue-600 scale-150' : i < step ? 'bg-blue-300' : 'bg-slate-200'}`} />
          ))}
        </div>
        <button onClick={handleNext} disabled={step===maxSteps} className={`px-6 py-3 rounded-2xl font-bold flex gap-2 items-center transition-all ${step===maxSteps?'opacity-50 cursor-not-allowed bg-slate-200 text-slate-400':'bg-blue-600 shadow-md shadow-blue-500/30 text-white hover:bg-blue-700 active:scale-95'}`}>Avançar <ChevronRight/></button>
      </div>
    </div>
  );
};

// ==========================================
// ABA 2: GEOMETRIA
// ==========================================
const GeometryApp = () => {
  const [shape, setShape] = useState('rectangle');
  const [mode, setMode] = useState('area');
  const [step, setStep] = useState(0);

  // Reinicia a animação quando troca de figura ou modo
  useEffect(() => { setStep(0); }, [shape, mode]);

  const maxSteps = 2;

  const handleNext = () => step < maxSteps && setStep(step + 1);
  const handlePrev = () => step > 0 && setStep(step - 1);

  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
      
      {/* SELETORES DE GEOMETRIA */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 w-full">
        {['square', 'rectangle', 'triangle', 'circle'].map(s => (
          <button 
            key={s} 
            onClick={() => { setShape(s); if((s === 'triangle' || s === 'circle') && mode === 'perimeter') setMode('area'); }} 
            className={`px-5 py-2.5 rounded-xl font-bold capitalize transition-all ${shape === s ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500 shadow-sm' : 'bg-white text-slate-500 border-2 border-transparent shadow-sm hover:bg-slate-50'}`}
          >
            {s === 'square' ? 'Quadrado' : s === 'rectangle' ? 'Retângulo' : s === 'triangle' ? 'Triângulo' : 'Círculo'}
          </button>
        ))}
      </div>
      
      <div className="flex gap-4 mb-8">
         <button onClick={() => setMode('area')} className={`px-6 py-2 rounded-full font-bold transition-all shadow-sm ${mode === 'area' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Área</button>
         {(shape === 'square' || shape === 'rectangle') && (
           <button onClick={() => setMode('perimeter')} className={`px-6 py-2 rounded-full font-bold transition-all shadow-sm ${mode === 'perimeter' ? 'bg-emerald-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Perímetro</button>
         )}
      </div>

      <div className="w-full bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 flex flex-col items-center justify-center min-h-[500px] mb-8 relative overflow-hidden">
        
        {/* PALCO DA FIGURA */}
        <div className="h-64 flex items-center justify-center relative w-full mb-12 mt-4">
            <AnimatePresence mode="popLayout">
            
            {shape === 'rectangle' && (
               <motion.div key="rect" initial={{scale:0}} animate={{scale:1}} className="relative w-64 h-32 border-4 border-indigo-500 bg-indigo-50">
                  <div className="absolute -bottom-14 w-full flex justify-center items-center">
                    {step === 0 ? <Term layoutId="rect-base" className="text-indigo-600 !text-4xl">8</Term> : <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-indigo-300 text-3xl font-bold">b</motion.span>}
                  </div>
                  <div className="absolute -right-14 h-full flex justify-center items-center">
                    {step === 0 ? <Term layoutId="rect-height" className="text-indigo-600 !text-4xl">4</Term> : <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-indigo-300 text-3xl font-bold">h</motion.span>}
                  </div>
               </motion.div>
            )}

            {shape === 'square' && (
               <motion.div key="sq" initial={{scale:0}} animate={{scale:1}} className="relative w-40 h-40 border-4 border-amber-500 bg-amber-50">
                  <div className="absolute -bottom-14 w-full flex justify-center items-center">
                    {step === 0 ? <Term layoutId="sq-side1" className="text-amber-600 !text-4xl">5</Term> : <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-amber-300 text-3xl font-bold">L</motion.span>}
                  </div>
                  <div className="absolute -right-14 h-full flex justify-center items-center">
                    {step === 0 ? <Term layoutId="sq-side2" className="text-amber-600 !text-4xl">5</Term> : <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-amber-300 text-3xl font-bold">L</motion.span>}
                  </div>
               </motion.div>
            )}

            {shape === 'triangle' && (
               <motion.div key="tri" initial={{scale:0}} animate={{scale:1}} className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible text-rose-500">
                     <polygon points="10,90 90,90 50,10" fill="none" stroke="currentColor" strokeWidth="4" className="fill-rose-50"/>
                     <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                  </svg>
                  <div className="absolute -bottom-14 w-full flex justify-center items-center">
                    {step === 0 ? <Term layoutId="tri-base" className="text-rose-600 !text-4xl">6</Term> : <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-rose-300 text-3xl font-bold">b</motion.span>}
                  </div>
                  <div className="absolute top-1/2 left-[55%] -translate-y-1/2 flex justify-center items-center">
                    {step === 0 ? <Term layoutId="tri-height" className="text-rose-600 !text-4xl">4</Term> : <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-rose-300 text-3xl font-bold">h</motion.span>}
                  </div>
               </motion.div>
            )}

            {shape === 'circle' && (
               <motion.div key="circ" initial={{scale:0}} animate={{scale:1}} className="relative w-48 h-48 rounded-full border-4 border-cyan-500 bg-cyan-50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full z-10"></div>
                  <div className="w-24 h-1 bg-cyan-500 absolute left-1/2 top-1/2 -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-[70%] -mt-10 flex justify-center items-center">
                    {step === 0 ? <Term layoutId="circ-rad" className="text-cyan-600 !text-4xl">3</Term> : <motion.span initial={{opacity:0}} animate={{opacity:1}} className="text-cyan-400 text-3xl font-bold">r</motion.span>}
                  </div>
               </motion.div>
            )}

            </AnimatePresence>
        </div>

        {/* PALCO DA FÓRMULA */}
        <div className="flex items-center justify-center w-full min-h-[120px] bg-slate-50/50 rounded-3xl p-4">
           <AnimatePresence mode="popLayout">
             
             {/* RETÂNGULO - ÁREA */}
             {shape === 'rectangle' && mode === 'area' && (
               <motion.div className="flex items-center gap-2" key="rect-area">
                 <Term className="text-slate-700">A</Term><Term className="text-slate-400">=</Term>
                 {step === 0 && <><Term className="text-slate-400">b</Term><Term className="text-slate-300 text-3xl">×</Term><Term className="text-slate-400">h</Term></>}
                 {step === 1 && <><Term layoutId="rect-base" className="text-indigo-600">8</Term><Term className="text-slate-300 text-3xl">×</Term><Term layoutId="rect-height" className="text-indigo-600">4</Term></>}
                 {step === 2 && <Term layoutId="rect-base" className="text-emerald-500 !text-7xl md:!text-8xl">32</Term>}
               </motion.div>
             )}

             {/* RETÂNGULO - PERÍMETRO */}
             {shape === 'rectangle' && mode === 'perimeter' && (
               <motion.div className="flex items-center gap-1 md:gap-2" key="rect-perim">
                 <Term className="text-slate-700">P</Term><Term className="text-slate-400">=</Term>
                 {step === 0 && <><Term className="text-slate-400 text-4xl">2</Term><Term className="text-slate-400">b</Term><Term className="text-slate-300">+</Term><Term className="text-slate-400 text-4xl">2</Term><Term className="text-slate-400">h</Term></>}
                 {step === 1 && <><Term className="text-slate-400 text-4xl">2</Term><Term className="text-slate-400 text-4xl">(</Term><Term layoutId="rect-base" className="text-indigo-600">8</Term><Term className="text-slate-400 text-4xl">)</Term><Term className="text-slate-300">+</Term><Term className="text-slate-400 text-4xl">2</Term><Term className="text-slate-400 text-4xl">(</Term><Term layoutId="rect-height" className="text-indigo-600">4</Term><Term className="text-slate-400 text-4xl">)</Term></>}
                 {step === 2 && <Term layoutId="rect-base" className="text-emerald-500 !text-7xl md:!text-8xl">24</Term>}
               </motion.div>
             )}

             {/* QUADRADO - ÁREA */}
             {shape === 'square' && mode === 'area' && (
               <motion.div className="flex items-center gap-2" key="sq-area">
                 <Term className="text-slate-700">A</Term><Term className="text-slate-400">=</Term>
                 {step === 0 && <><Term className="text-slate-400">L</Term><Term className="text-slate-300 text-3xl">×</Term><Term className="text-slate-400">L</Term></>}
                 {step === 1 && <><Term layoutId="sq-side1" className="text-amber-600">5</Term><Term className="text-slate-300 text-3xl">×</Term><Term layoutId="sq-side2" className="text-amber-600">5</Term></>}
                 {step === 2 && <Term layoutId="sq-side1" className="text-emerald-500 !text-7xl md:!text-8xl">25</Term>}
               </motion.div>
             )}

             {/* QUADRADO - PERÍMETRO */}
             {shape === 'square' && mode === 'perimeter' && (
               <motion.div className="flex items-center gap-2" key="sq-perim">
                 <Term className="text-slate-700">P</Term><Term className="text-slate-400">=</Term>
                 {step === 0 && <><Term className="text-slate-400 text-4xl">4</Term><Term className="text-slate-300 text-3xl">×</Term><Term className="text-slate-400">L</Term></>}
                 {step === 1 && <><Term className="text-slate-400 text-4xl">4</Term><Term className="text-slate-300 text-3xl">×</Term><Term layoutId="sq-side1" className="text-amber-600">5</Term></>}
                 {step === 2 && <Term layoutId="sq-side1" className="text-emerald-500 !text-7xl md:!text-8xl">20</Term>}
               </motion.div>
             )}

             {/* TRIÂNGULO - ÁREA */}
             {shape === 'triangle' && mode === 'area' && (
               <motion.div className="flex items-center gap-2" key="tri-area">
                 <Term className="text-slate-700">A</Term><Term className="text-slate-400">=</Term>
                 
                 <div className="flex flex-col items-center mx-2">
                    <div className="flex items-center justify-center">
                       {step === 0 && <><Term className="text-slate-400">b</Term><Term className="text-slate-300 text-3xl mx-2">×</Term><Term className="text-slate-400">h</Term></>}
                       {step === 1 && <><Term layoutId="tri-base" className="text-rose-600">6</Term><Term className="text-slate-300 text-3xl mx-2">×</Term><Term layoutId="tri-height" className="text-rose-600">4</Term></>}
                       {step === 2 && <Term layoutId="tri-base" className="text-slate-500">24</Term>}
                    </div>
                    <div className="w-full h-1 md:h-1.5 bg-slate-400 rounded-full my-2"></div>
                    <Term className="text-slate-400 text-4xl">2</Term>
                 </div>

                 {step === 2 && <><Term className="text-slate-400 ml-4">=</Term><Term layoutId="tri-height" className="text-emerald-500 !text-7xl md:!text-8xl">12</Term></>}
               </motion.div>
             )}

             {/* CÍRCULO - ÁREA */}
             {shape === 'circle' && mode === 'area' && (
               <motion.div className="flex items-center gap-2" key="circ-area">
                 <Term className="text-slate-700">A</Term><Term className="text-slate-400">=</Term>
                 {step === 0 && <><Term className="text-slate-400">π</Term><Term className="text-slate-300 text-3xl mx-2">×</Term><Term className="text-slate-400">r</Term><Term className="text-slate-400 text-2xl -ml-2 -mt-6">2</Term></>}
                 {step === 1 && <><Term className="text-slate-400">π</Term><Term className="text-slate-300 text-3xl mx-2">×</Term><Term layoutId="circ-rad" className="text-cyan-600">3</Term><Term className="text-cyan-600 text-2xl -ml-2 -mt-6">2</Term></>}
                 {step === 2 && <><Term layoutId="circ-rad" className="text-emerald-500 !text-7xl md:!text-8xl">9</Term><Term className="text-slate-400 !text-6xl">π</Term></>}
               </motion.div>
             )}

           </AnimatePresence>
        </div>
      </div>

      {/* CONTROLES DE GEOMETRIA */}
      <div className="w-full max-w-2xl flex justify-between items-center">
        <button 
          onClick={handlePrev} 
          disabled={step===0} 
          className={`px-6 py-3 rounded-2xl font-bold flex gap-2 items-center transition-all ${step===0?'opacity-50 cursor-not-allowed bg-slate-200 text-slate-400':'bg-white shadow-sm text-slate-600 hover:bg-slate-50 active:scale-95'}`}
        >
          <ChevronLeft/> Voltar
        </button>

        <div className="flex items-center gap-3">
          {Array.from({ length: maxSteps + 1 }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${i === step ? 'bg-emerald-500 scale-150' : i < step ? 'bg-emerald-300' : 'bg-slate-200'}`} />
          ))}
        </div>

        <button 
          onClick={handleNext} 
          disabled={step===maxSteps} 
          className={`px-6 py-3 rounded-2xl font-bold flex gap-2 items-center transition-all ${step===maxSteps?'opacity-50 cursor-not-allowed bg-slate-200 text-slate-400':'bg-emerald-500 shadow-md shadow-emerald-500/30 text-white hover:bg-emerald-600 active:scale-95'}`}
        >
          Avançar <ChevronRight/>
        </button>
      </div>

    </div>
  );
};