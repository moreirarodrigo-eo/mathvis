import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calculator, Shapes, Lightbulb, PieChart } from 'lucide-react';

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
const Fraction = ({ children, className = "" }) => {
  const [numerator, denominator] = React.Children.toArray(children);
  return (
    <motion.div layout transition={springAnim} className={`flex flex-col items-center justify-center gap-1 mx-2 ${className}`}>
      {numerator}
      <motion.div
        layout
        layoutId="fraction-line"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        exit={{ scaleX: 0, opacity: 0 }}
        transition={springAnim}
        className="w-full h-1.5 md:h-2 bg-slate-800 rounded-full min-w-[50px]"
      />
      {denominator}
    </motion.div>
  );
};

export default function MathVisualizer() {
  const [activeTab, setActiveTab] = useState('fractions');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8 font-sans text-slate-800 selection:bg-blue-200">
      
      {/* HEADER PRINCIPAL */}
      <header className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="flex items-center gap-3 text-blue-600">
          <PieChart size={36} className="drop-shadow-sm" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Math Flow</h1>
        </div>
        
        {/* TAB SELECTOR */}
        <div className="flex flex-wrap justify-center bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
          <button 
            onClick={() => setActiveTab('equations')} 
            className={`px-4 md:px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'equations' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Equações
          </button>
          <button 
            onClick={() => setActiveTab('geometry')} 
            className={`px-4 md:px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'geometry' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Geometria
          </button>
          <button 
            onClick={() => setActiveTab('fractions')} 
            className={`px-4 md:px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'fractions' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            Frações
          </button>
        </div>
      </header>

      {/* RENDERIZAÇÃO DAS ABAS */}
      <div className="w-full flex justify-center">
        {activeTab === 'equations' && <EquationsApp />}
        {activeTab === 'geometry' && <GeometryApp />}
        {activeTab === 'fractions' && <FractionsApp />}
      </div>
      
    </div>
  );
}

// ==========================================
// ABA 1: EQUAÇÕES (Mantida igual)
// ==========================================
const EquationsApp = () => {
  const [step, setStep] = useState(0);
  const maxSteps = 4;

  const handleNext = () => step < maxSteps && setStep(step + 1);
  const handlePrev = () => step > 0 && setStep(step - 1);

  const explanations = [
    "Vamos resolver a equação: 3x - 2 = x + 4",
    "Agrupamos letras de um lado, números do outro. O 'x' e o '-2' voam e trocam de sinal!",
    "Simplificamos os dois lados da igualdade.",
    "O 2 que está multiplicando passa para o outro lado dividindo.",
    "Pronto! Encontramos o valor de x."
  ];

  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
      <div className="w-full flex-1 min-h-[450px] bg-white rounded-[3rem] shadow-xl shadow-blue-900/5 border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden px-4 py-20 mb-8">
        <div className="flex items-center justify-center w-full">
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
              {step === 4 && <Term key="val-3" layoutId="val-4" className="text-orange-500 !text-7xl">3</Term>}
            </AnimatePresence>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 w-full px-8 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-blue-50 text-blue-800 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm border border-blue-100 max-w-2xl text-center">
              <Lightbulb size={24} className="text-amber-500 shrink-0" />
              <span className="font-medium text-lg md:text-xl">{explanations[step]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

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
// ABA 2: GEOMETRIA (Mantida igual)
// ==========================================
const GeometryApp = () => {
  const [shape, setShape] = useState('rectangle');
  const [mode, setMode] = useState('area');
  const [step, setStep] = useState(0);

  useEffect(() => { setStep(0); }, [shape, mode]);

  const maxSteps = 2;

  const handleNext = () => step < maxSteps && setStep(step + 1);
  const handlePrev = () => step > 0 && setStep(step - 1);

  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 w-full">
        {['square', 'rectangle', 'triangle', 'circle'].map(s => (
          <button 
            key={s} 
            onClick={() => { setShape(s); if((s === 'triangle' || s === 'circle') && mode === 'perimeter') setMode('area'); }} 
            className={`px-5 py-2.5 rounded-xl font-bold capitalize transition-all ${shape === s ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500 shadow-sm' : 'bg-white text-slate-500 border-2 border-transparent shadow-sm hover:bg-slate-50'}`}
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

      <div className="w-full bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 flex flex-col items-center justify-center min-h-[450px] mb-8 relative overflow-hidden">
        <div className="h-64 flex items-center justify-center relative w-full mb-12 mt-4">
            <AnimatePresence mode="popLayout">
            {shape === 'rectangle' && (
               <motion.div key="rect" initial={{scale:0}} animate={{scale:1}} className="relative w-64 h-32 border-4 border-emerald-500 bg-emerald-50">
                  <div className="absolute -bottom-14 w-full flex justify-center items-center">
                    {step === 0 ? <Term layoutId="rect-base" className="text-emerald-600 !text-4xl">8</Term> : <motion.span className="text-emerald-300 text-3xl font-bold">b</motion.span>}
                  </div>
                  <div className="absolute -right-14 h-full flex justify-center items-center">
                    {step === 0 ? <Term layoutId="rect-height" className="text-emerald-600 !text-4xl">4</Term> : <motion.span className="text-emerald-300 text-3xl font-bold">h</motion.span>}
                  </div>
               </motion.div>
            )}
            </AnimatePresence>
        </div>

        <div className="flex items-center justify-center w-full min-h-[120px] bg-slate-50/50 rounded-3xl p-4">
           <AnimatePresence mode="popLayout">
             {shape === 'rectangle' && mode === 'area' && (
               <motion.div className="flex items-center gap-2" key="rect-area">
                 <Term className="text-slate-700">A</Term><Term className="text-slate-400">=</Term>
                 {step === 0 && <><Term className="text-slate-400">b</Term><Term className="text-slate-300 text-3xl">×</Term><Term className="text-slate-400">h</Term></>}
                 {step === 1 && <><Term layoutId="rect-base" className="text-emerald-600">8</Term><Term className="text-slate-300 text-3xl">×</Term><Term layoutId="rect-height" className="text-emerald-600">4</Term></>}
                 {step === 2 && <Term layoutId="rect-base" className="text-purple-600 !text-7xl">32</Term>}
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      <div className="w-full max-w-2xl flex justify-between items-center">
        <button onClick={handlePrev} disabled={step===0} className={`px-6 py-3 rounded-2xl font-bold flex gap-2 items-center transition-all ${step===0?'opacity-50 cursor-not-allowed bg-slate-200 text-slate-400':'bg-white shadow-sm text-slate-600 hover:bg-slate-50 active:scale-95'}`}><ChevronLeft/> Voltar</button>
        <div className="flex items-center gap-3">
          {Array.from({ length: maxSteps + 1 }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${i === step ? 'bg-emerald-500 scale-150' : i < step ? 'bg-emerald-300' : 'bg-slate-200'}`} />
          ))}
        </div>
        <button onClick={handleNext} disabled={step===maxSteps} className={`px-6 py-3 rounded-2xl font-bold flex gap-2 items-center transition-all ${step===maxSteps?'opacity-50 cursor-not-allowed bg-slate-200 text-slate-400':'bg-emerald-500 shadow-md shadow-emerald-500/30 text-white hover:bg-emerald-600 active:scale-95'}`}>Avançar <ChevronRight/></button>
      </div>
    </div>
  );
};


// ==========================================
// ABA 3: FRAÇÕES (NOVA)
// ==========================================
const FractionsApp = () => {
  const [operation, setOperation] = useState('add'); // add, sub, mult, div
  const [baseType, setBaseType] = useState('same'); // same, diff
  const [step, setStep] = useState(0);

  // Reinicia ao trocar de abas internas
  useEffect(() => { setStep(0); }, [operation, baseType]);

  // Calcula total de passos
  let maxSteps = 2;
  if ((operation === 'add' || operation === 'sub') && baseType === 'diff') maxSteps = 4;
  if (operation === 'div') maxSteps = 3;

  const handleNext = () => step < maxSteps && setStep(step + 1);
  const handlePrev = () => step > 0 && setStep(step - 1);

  // Textos Explicativos
  const getExplanation = () => {
    if (operation === 'add' && baseType === 'same') return ["Vamos somar frações com denominadores iguais.", "Mantemos o denominador comum e somamos apenas os numeradores.", "Resultado simplificado!"][step];
    if (operation === 'add' && baseType === 'diff') return ["Bases diferentes! Não podemos somar diretamente. Precisamos do MMC.", "Calculamos o MMC (Mínimo Múltiplo Comum) entre 2 e 3.", "Substituímos pelas frações equivalentes usando o novo denominador (6).", "Agora que as bases são iguais, somamos os numeradores.", "Resultado final!"][step];
    if (operation === 'sub' && baseType === 'same') return ["Vamos subtrair frações com denominadores iguais.", "Mantemos a base e subtraímos os numeradores.", "Resultado simplificado!"][step];
    if (operation === 'sub' && baseType === 'diff') return ["Bases diferentes! Precisamos do MMC entre 4 e 6.", "Calculamos o MMC dividindo pelos números primos.", "Substituímos pelas frações equivalentes com base 12.", "Agora com a mesma base, subtraímos os numeradores.", "Resultado final!"][step];
    if (operation === 'mult') return ["Multiplicação de frações: direto ao assunto!", "Multiplicamos o de cima com o de cima, e o de baixo com o de baixo.", "Resultado encontrado!"][step];
    if (operation === 'div') return ["Divisão de frações.", "Regra de ouro: mantemos a primeira fração, invertemos a segunda e multiplicamos! Observe os números a voar.", "Agora multiplicamos os numeradores e os denominadores.", "Resultado da divisão!"][step];
    return "";
  };

  return (
    <div className="w-full max-w-5xl flex flex-col items-center">
      
      {/* SELETORES DE FRAÇÕES */}
      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-4 w-full">
        {[
          { id: 'add', label: 'Soma', symbol: '+' },
          { id: 'sub', label: 'Subtração', symbol: '-' },
          { id: 'mult', label: 'Multiplicação', symbol: '×' },
          { id: 'div', label: 'Divisão', symbol: '÷' }
        ].map(op => (
          <button 
            key={op.id} 
            onClick={() => setOperation(op.id)} 
            className={`px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${operation === op.id ? 'bg-purple-100 text-purple-700 border-2 border-purple-500 shadow-sm' : 'bg-white text-slate-500 border-2 border-transparent shadow-sm hover:bg-slate-50'}`}
          >
            <span className="text-xl leading-none">{op.symbol}</span> {op.label}
          </button>
        ))}
      </div>
      
      {/* SELETOR DE BASES (Apenas para Soma e Subtração) */}
      <div className="flex gap-4 mb-8 h-10">
         <AnimatePresence>
           {(operation === 'add' || operation === 'sub') && (
             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex gap-4">
               <button onClick={() => setBaseType('same')} className={`px-6 py-2 rounded-full font-bold transition-all shadow-sm ${baseType === 'same' ? 'bg-purple-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Bases Iguais</button>
               <button onClick={() => setBaseType('diff')} className={`px-6 py-2 rounded-full font-bold transition-all shadow-sm ${baseType === 'diff' ? 'bg-purple-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>Bases Diferentes</button>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      {/* QUADRO PRINCIPAL DE FRAÇÕES */}
      <div className="w-full bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center justify-center min-h-[450px] mb-8 relative overflow-hidden px-4">
        
        <div className="flex items-center justify-center w-full min-h-[200px]">
           <AnimatePresence mode="popLayout">
             
             {/* 1. SOMA - BASES IGUAIS (1/5 + 2/5 = 3/5) */}
             {operation === 'add' && baseType === 'same' && (
               <motion.div key="add-same" className="flex items-center">
                 {step === 0 && (
                   <>
                     <Fraction><Term layoutId="fn1" className="text-emerald-500">1</Term><Term layoutId="fd" className="text-slate-600">5</Term></Fraction>
                     <Term layoutId="fop" className="text-slate-300 mx-4">+</Term>
                     <Fraction><Term layoutId="fn2" className="text-emerald-500">2</Term><Term className="text-slate-600">5</Term></Fraction>
                   </>
                 )}
                 {step === 1 && (
                   <Fraction>
                      <div className="flex items-center"><Term layoutId="fn1" className="text-emerald-500">1</Term><Term layoutId="fop" className="text-slate-300 mx-2">+</Term><Term layoutId="fn2" className="text-emerald-500">2</Term></div>
                      <Term layoutId="fd" className="text-slate-600">5</Term>
                   </Fraction>
                 )}
                 {step === 2 && <Fraction><Term layoutId="fn1" className="text-purple-600 !text-7xl">3</Term><Term layoutId="fd" className="text-slate-600 !text-7xl">5</Term></Fraction>}
               </motion.div>
             )}

             {/* 2. SUBTRAÇÃO - BASES IGUAIS (4/7 - 1/7 = 3/7) */}
             {operation === 'sub' && baseType === 'same' && (
               <motion.div key="sub-same" className="flex items-center">
                 {step === 0 && (
                   <>
                     <Fraction><Term layoutId="fn1" className="text-rose-500">4</Term><Term layoutId="fd" className="text-slate-600">7</Term></Fraction>
                     <Term layoutId="fop" className="text-slate-300 mx-4">-</Term>
                     <Fraction><Term layoutId="fn2" className="text-rose-500">1</Term><Term className="text-slate-600">7</Term></Fraction>
                   </>
                 )}
                 {step === 1 && (
                   <Fraction>
                      <div className="flex items-center"><Term layoutId="fn1" className="text-rose-500">4</Term><Term layoutId="fop" className="text-slate-300 mx-2">-</Term><Term layoutId="fn2" className="text-rose-500">1</Term></div>
                      <Term layoutId="fd" className="text-slate-600">7</Term>
                   </Fraction>
                 )}
                 {step === 2 && <Fraction><Term layoutId="fn1" className="text-purple-600 !text-7xl">3</Term><Term layoutId="fd" className="text-slate-600 !text-7xl">7</Term></Fraction>}
               </motion.div>
             )}

             {/* 3. SOMA - BASES DIFERENTES (1/2 + 1/3 = 3/6 + 2/6 = 5/6) */}
             {operation === 'add' && baseType === 'diff' && (
               <motion.div key="add-diff" className="flex items-center">
                 {step === 0 && (
                   <>
                     <Fraction><Term layoutId="fn1" className="text-emerald-500">1</Term><Term layoutId="fd1" className="text-slate-600">2</Term></Fraction>
                     <Term layoutId="fop" className="text-slate-300 mx-4">+</Term>
                     <Fraction><Term layoutId="fn2" className="text-emerald-500">1</Term><Term layoutId="fd2" className="text-slate-600">3</Term></Fraction>
                   </>
                 )}
                 {step === 1 && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex font-mono text-4xl font-bold bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
                        <div className="flex flex-col items-end pr-4 border-r-4 border-slate-800 gap-4">
                            <span className="tracking-[0.3em]">2,3</span>
                            <span className="tracking-[0.3em]">1,3</span>
                            <span className="tracking-[0.3em]">1,1</span>
                        </div>
                        <div className="flex flex-col items-center pl-4 text-purple-600 gap-4">
                            <span>2</span>
                            <span>3</span>
                            <span className="mt-2 pt-2 border-t-4 border-purple-300">6</span>
                        </div>
                    </motion.div>
                 )}
                 {step === 2 && (
                   <>
                     <Fraction><Term layoutId="fn1" className="text-emerald-500">3</Term><Term layoutId="fd1" className="text-purple-600">6</Term></Fraction>
                     <Term layoutId="fop" className="text-slate-300 mx-4">+</Term>
                     <Fraction><Term layoutId="fn2" className="text-emerald-500">2</Term><Term layoutId="fd2" className="text-purple-600">6</Term></Fraction>
                   </>
                 )}
                 {step === 3 && (
                   <Fraction>
                      <div className="flex items-center"><Term layoutId="fn1" className="text-emerald-500">3</Term><Term layoutId="fop" className="text-slate-300 mx-2">+</Term><Term layoutId="fn2" className="text-emerald-500">2</Term></div>
                      <Term layoutId="fd1" className="text-purple-600">6</Term>
                   </Fraction>
                 )}
                 {step === 4 && <Fraction><Term layoutId="fn1" className="text-orange-500 !text-7xl">5</Term><Term layoutId="fd1" className="text-orange-500 !text-7xl">6</Term></Fraction>}
               </motion.div>
             )}

             {/* 4. SUBTRAÇÃO - BASES DIFERENTES (3/4 - 1/6 = 9/12 - 2/12 = 7/12) */}
             {operation === 'sub' && baseType === 'diff' && (
               <motion.div key="sub-diff" className="flex items-center">
                 {step === 0 && (
                   <>
                     <Fraction><Term layoutId="fn1" className="text-rose-500">3</Term><Term layoutId="fd1" className="text-slate-600">4</Term></Fraction>
                     <Term layoutId="fop" className="text-slate-300 mx-4">-</Term>
                     <Fraction><Term layoutId="fn2" className="text-rose-500">1</Term><Term layoutId="fd2" className="text-slate-600">6</Term></Fraction>
                   </>
                 )}
                 {step === 1 && (
                    <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="flex font-mono text-4xl font-bold bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
                        <div className="flex flex-col items-end pr-4 border-r-4 border-slate-800 gap-4">
                            <span className="tracking-[0.3em]">4,6</span>
                            <span className="tracking-[0.3em]">2,3</span>
                            <span className="tracking-[0.3em]">1,3</span>
                            <span className="tracking-[0.3em]">1,1</span>
                        </div>
                        <div className="flex flex-col items-center pl-4 text-purple-600 gap-4">
                            <span>2</span>
                            <span>2</span>
                            <span>3</span>
                            <span className="mt-2 pt-2 border-t-4 border-purple-300">12</span>
                        </div>
                    </motion.div>
                 )}
                 {step === 2 && (
                   <>
                     <Fraction><Term layoutId="fn1" className="text-rose-500">9</Term><Term layoutId="fd1" className="text-purple-600">12</Term></Fraction>
                     <Term layoutId="fop" className="text-slate-300 mx-4">-</Term>
                     <Fraction><Term layoutId="fn2" className="text-rose-500">2</Term><Term layoutId="fd2" className="text-purple-600">12</Term></Fraction>
                   </>
                 )}
                 {step === 3 && (
                   <Fraction>
                      <div className="flex items-center"><Term layoutId="fn1" className="text-rose-500">9</Term><Term layoutId="fop" className="text-slate-300 mx-2">-</Term><Term layoutId="fn2" className="text-rose-500">2</Term></div>
                      <Term layoutId="fd1" className="text-purple-600">12</Term>
                   </Fraction>
                 )}
                 {step === 4 && <Fraction><Term layoutId="fn1" className="text-orange-500 !text-7xl">7</Term><Term layoutId="fd1" className="text-orange-500 !text-7xl">12</Term></Fraction>}
               </motion.div>
             )}

             {/* 5. MULTIPLICAÇÃO (3/4 * 2/5 = 6/20) */}
             {operation === 'mult' && (
               <motion.div key="mult" className="flex items-center">
                 {step === 0 && (
                   <>
                     <Fraction><Term layoutId="n1" className="text-blue-500">3</Term><Term layoutId="d1" className="text-indigo-600">4</Term></Fraction>
                     <Term layoutId="fop" className="text-slate-300 mx-4">×</Term>
                     <Fraction><Term layoutId="n2" className="text-blue-500">2</Term><Term layoutId="d2" className="text-indigo-600">5</Term></Fraction>
                   </>
                 )}
                 {step === 1 && (
                   <Fraction>
                      <div className="flex items-center"><Term layoutId="n1" className="text-blue-500">3</Term><Term layoutId="fop" className="text-slate-300 mx-2">×</Term><Term layoutId="n2" className="text-blue-500">2</Term></div>
                      <div className="flex items-center"><Term layoutId="d1" className="text-indigo-600">4</Term><Term className="text-slate-300 mx-2">×</Term><Term layoutId="d2" className="text-indigo-600">5</Term></div>
                   </Fraction>
                 )}
                 {step === 2 && <Fraction><Term layoutId="n1" className="text-purple-600 !text-7xl">6</Term><Term layoutId="d1" className="text-purple-600 !text-7xl">20</Term></Fraction>}
               </motion.div>
             )}

             {/* 6. DIVISÃO COM INVERSÃO ANIMADA (2/3 / 4/5 = 2/3 * 5/4 = 10/12) */}
             {operation === 'div' && (
               <motion.div key="div" className="flex items-center">
                 {step === 0 && (
                   <>
                     <Fraction><Term layoutId="n1" className="text-blue-500">2</Term><Term layoutId="d1" className="text-indigo-600">3</Term></Fraction>
                     <Term layoutId="fop" className="text-slate-300 mx-4">÷</Term>
                     {/* O segredo da animação: n2 está em cima, d2 está em baixo */}
                     <Fraction><Term layoutId="n2" className="text-emerald-500">4</Term><Term layoutId="d2" className="text-emerald-600">5</Term></Fraction>
                   </>
                 )}
                 {step === 1 && (
                   <>
                     <Fraction><Term layoutId="n1" className="text-blue-500">2</Term><Term layoutId="d1" className="text-indigo-600">3</Term></Fraction>
                     <Term layoutId="fop" className="text-rose-400 mx-4">×</Term>
                     {/* Inversão: d2 subiu para o numerador, n2 desceu para o denominador */}
                     <Fraction><Term layoutId="d2" className="text-emerald-600">5</Term><Term layoutId="n2" className="text-emerald-500">4</Term></Fraction>
                   </>
                 )}
                 {step === 2 && (
                   <Fraction>
                      <div className="flex items-center"><Term layoutId="n1" className="text-blue-500">2</Term><Term layoutId="fop" className="text-rose-400 mx-2">×</Term><Term layoutId="d2" className="text-emerald-600">5</Term></div>
                      <div className="flex items-center"><Term layoutId="d1" className="text-indigo-600">3</Term><Term className="text-rose-400 mx-2">×</Term><Term layoutId="n2" className="text-emerald-500">4</Term></div>
                   </Fraction>
                 )}
                 {step === 3 && <Fraction><Term layoutId="n1" className="text-purple-600 !text-7xl">10</Term><Term layoutId="d1" className="text-purple-600 !text-7xl">12</Term></Fraction>}
               </motion.div>
             )}

           </AnimatePresence>
        </div>

        {/* TEXTO EXPLICATIVO */}
        <div className="absolute bottom-6 md:bottom-10 left-0 w-full px-8 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={step + operation + baseType} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-purple-50 text-purple-800 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm border border-purple-100 max-w-2xl text-center">
              <Lightbulb size={24} className="text-amber-500 shrink-0" />
              <span className="font-medium text-lg md:text-xl">{getExplanation()}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CONTROLES DA ANIMAÇÃO */}
      <div className="w-full max-w-2xl flex justify-between items-center">
        <button onClick={handlePrev} disabled={step===0} className={`px-6 py-3 rounded-2xl font-bold flex gap-2 items-center transition-all ${step===0?'opacity-50 cursor-not-allowed bg-slate-200 text-slate-400':'bg-white shadow-sm text-slate-600 hover:bg-slate-50 active:scale-95'}`}><ChevronLeft/> Voltar</button>
        <div className="flex items-center gap-3">
          {Array.from({ length: maxSteps + 1 }).map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all duration-500 ${i === step ? 'bg-purple-600 scale-150' : i < step ? 'bg-purple-300' : 'bg-slate-200'}`} />
          ))}
        </div>
        <button onClick={handleNext} disabled={step===maxSteps} className={`px-6 py-3 rounded-2xl font-bold flex gap-2 items-center transition-all ${step===maxSteps?'opacity-50 cursor-not-allowed bg-slate-200 text-slate-400':'bg-purple-600 shadow-md shadow-purple-500/30 text-white hover:bg-purple-700 active:scale-95'}`}>Avançar <ChevronRight/></button>
      </div>

    </div>
  );
};