import React from 'react';
import { UnitData } from '../data/curriculumData';
import { Printer, X, Download, FileText, ArrowRight, ArrowLeftRight, CheckCircle2, Compass } from 'lucide-react';

interface Props {
  unit: UnitData;
  isOpen: boolean;
  onClose: () => void;
}

export const UnifiedCyclePdfReport: React.FC<Props> = ({ unit, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[96vh] flex flex-col overflow-hidden shadow-2xl border border-slate-300">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print px-6 py-3.5 border-b border-slate-200 bg-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 bg-indigo-700 text-white rounded-md">
              校内研修・職員会議 配布用
            </span>
            <span className="text-sm font-bold text-slate-800">
              「二つの一体化マップ」公式PDFレポート
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" /> PDF保存 / A4印刷
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Sheet (A4 Landscape / Portrait Optimized) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-slate-900 text-xs sm:text-sm space-y-5 bg-white font-sans print:p-4 print:text-black">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-[11px] font-bold text-indigo-700 tracking-wider">
                文部科学省・次期学習指導要領 授業改善研究資料
              </div>
              <h1 className="text-xl sm:text-2xl font-black mt-0.5 text-slate-950">
                【二つの一体化マップ】 {unit.subject}科（{unit.gradeLabel}） 「{unit.unitName}」
              </h1>
              <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-3">
                <span><strong>領域:</strong> {unit.domain}</span>
                <span>·</span>
                <span><strong>主題:</strong> {unit.subtitle}</span>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-500 border border-slate-300 p-2 rounded bg-slate-50 print:bg-transparent">
              <div>校内研究推進委員会 / 指導案検討会</div>
              <div>発行日: {new Date().toLocaleDateString('ja-JP')}</div>
            </div>
          </div>

          {/* Perspective Bar */}
          <div className="bg-slate-50 border border-slate-300 p-2.5 rounded flex items-center gap-2 print:bg-slate-50">
            <Compass className="w-4 h-4 text-indigo-600 shrink-0 print:text-black" />
            <div className="text-xs">
              <span className="font-bold text-slate-800">働かせる見方・考え方：</span>{' '}
              <span className="text-slate-900 font-semibold">{unit.perspective}</span>
            </div>
          </div>

          {/* Core Concept Banner */}
          <div className="bg-amber-50/80 border border-amber-300 p-3 rounded-lg text-center space-y-0.5 print:border-slate-400 print:bg-slate-50">
            <div className="text-xs font-bold text-amber-900 print:text-black">
              ★ 中教審の核となるメッセージ：使うことで理解が深まり、理解が次の活用を支える
            </div>
            <p className="text-[11px] text-slate-700 leading-snug">
              「統合的な理解」と「総合的な発揮」は別々の段階ではなく、相互に行きつ戻りつしながら一体として深まる資質・能力です。
            </p>
          </div>

          {/* =========================================================================
              3-COLUMN FLOW DIAGRAM (THE HEART OF THE REPORT)
          ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch border border-slate-300 rounded-xl p-3 bg-slate-50/50 print:bg-white print:border-slate-400">
            {/* Left Column: 統合的な理解 (5 cols) */}
            <div className="md:col-span-5 bg-sky-50/90 border-2 border-sky-300 rounded-xl p-3.5 flex flex-col justify-between print:border-slate-400 print:bg-slate-50">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-sky-200 pb-1.5 print:border-slate-300">
                  <span className="px-2 py-0.5 bg-sky-700 text-white text-[11px] font-bold rounded print:bg-black">
                    【統合的な理解】
                  </span>
                  <span className="text-[10px] text-sky-900 font-bold">知識がつながる</span>
                </div>

                <div className="text-xs text-slate-800 leading-relaxed">
                  <span className="font-bold block text-slate-900 mb-0.5">定義・ねらい：</span>
                  {unit.integratedUnderstanding.definition}
                </div>

                {/* Children Utterance Bubble */}
                <div className="bg-white p-2.5 rounded-lg border border-sky-200 shadow-2xs print:border-slate-300">
                  <div className="text-[10px] font-bold text-sky-800 mb-0.5">気付いた子供のつぶやき（姿）：</div>
                  <p className="text-xs font-bold text-slate-900 italic leading-snug">
                    {unit.integratedUnderstanding.childrenUtterance}
                  </p>
                </div>

                {/* 3 Scenes */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-sky-950 block">往還する3つの場面（事例）：</span>
                  {unit.integratedUnderstanding.scenes.map((s, idx) => (
                    <div key={idx} className="bg-white/90 border border-sky-200 p-2 rounded text-[11px] space-y-0.5 print:border-slate-200">
                      <div className="font-bold text-slate-900">
                        {idx + 1}. {s.title}
                      </div>
                      <div className="text-slate-600 leading-tight text-[10px]">{s.context}</div>
                      {s.calculation && (
                        <div className="font-mono text-[10px] text-slate-800 pt-0.5 border-t border-sky-100">
                          {s.calculation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-sky-200 text-[10px] text-slate-600">
                <strong>指導の要点：</strong> 場面や表現を行き来させ、共通する見方に気付かせる。
              </div>
            </div>

            {/* Middle Column: 二つが一体となった子供の姿 (2 cols) */}
            <div className="md:col-span-2 bg-amber-50/90 border-2 border-amber-300 rounded-xl p-3 flex flex-col justify-between items-center text-center print:border-slate-400 print:bg-slate-50">
              <div className="w-full space-y-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-600 text-white rounded block print:bg-black">
                  二つが一体となった姿
                </span>
                <p className="text-[11px] font-bold text-slate-900 leading-tight">
                  {unit.unifiedCycle.coreMessage}
                </p>
              </div>

              {/* Bi-directional Visual Flow */}
              <div className="my-3 w-full bg-white p-2 rounded-lg border border-amber-200 text-[10px] space-y-2 print:border-slate-300">
                <div className="text-sky-800 font-bold flex items-center justify-center gap-0.5">
                  理解が活用を支える <ArrowRight className="w-3 h-3" />
                </div>
                <div className="w-full h-1 bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400 rounded print:bg-black" />
                <div className="text-emerald-800 font-bold flex items-center justify-center gap-0.5">
                  <ArrowRight className="w-3 h-3 rotate-180" /> 活用で理解が深まる
                </div>
              </div>

              <div className="w-full text-[10px] text-amber-950 font-bold bg-amber-100/60 p-1.5 rounded print:bg-transparent">
                行きつ戻りつの往還
              </div>
            </div>

            {/* Right Column: 総合的な発揮 (5 cols) */}
            <div className="md:col-span-5 bg-emerald-50/90 border-2 border-emerald-300 rounded-xl p-3.5 flex flex-col justify-between print:border-slate-400 print:bg-slate-50">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-emerald-200 pb-1.5 print:border-slate-300">
                  <span className="px-2 py-0.5 bg-emerald-700 text-white text-[11px] font-bold rounded print:bg-black">
                    【総合的な発揮】
                  </span>
                  <span className="text-[10px] text-emerald-900 font-bold">判断に生かす</span>
                </div>

                <div className="text-xs text-slate-800 leading-relaxed">
                  <span className="font-bold block text-slate-900 mb-0.5">定義・ねらい：</span>
                  {unit.holisticApplication.definition}
                </div>

                {/* Problem Scene */}
                <div className="bg-white p-2.5 rounded-lg border border-emerald-200 shadow-2xs print:border-slate-300">
                  <div className="text-[10px] font-bold text-emerald-800 mb-0.5">
                    未指定の課題場面: {unit.holisticApplication.problemScene.title}
                  </div>
                  <p className="text-[11px] text-slate-700 leading-snug">
                    {unit.holisticApplication.problemScene.description}
                  </p>
                </div>

                {/* 5 Process Steps */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald-950 block">子供の思考プロセス（5ステップ）：</span>
                  <div className="space-y-1">
                    {unit.holisticApplication.processSteps.map((step) => (
                      <div key={step.step} className="bg-white/90 border border-emerald-200 p-1.5 rounded text-[10px] flex items-start gap-1.5 print:border-slate-200">
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] shrink-0 print:bg-black">
                          {step.step}
                        </span>
                        <div>
                          <strong className="text-slate-900">{step.title}</strong>
                          <span className="text-slate-600 ml-1">… {step.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-emerald-200 text-[10px] text-slate-600">
                <strong>指導の要点：</strong> 教師が解法を指定せず、結果を現実の問題に戻して判断させる。
              </div>
            </div>
          </div>

          {/* Student Thought Comparison Strip (A/B/C) */}
          <div className="border border-slate-300 rounded-xl p-3 bg-white space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 print:text-black" />
              同じ問題に対する3人の子供の考え（見取りと変容の指標）
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
              {unit.holisticApplication.childrenComparison.map((c, idx) => (
                <div
                  key={idx}
                  className={`border rounded-lg p-2.5 ${
                    idx === 2 ? 'border-emerald-400 bg-emerald-50/50 print:bg-white' : 'border-slate-200 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800">{c.child}</span>
                    <span className="text-[10px] text-slate-500">{c.type}</span>
                  </div>
                  <div className="text-slate-800 font-mono text-[10px] bg-white p-1.5 rounded border border-slate-200 mb-1 leading-snug">
                    {c.thought}
                  </div>
                  <div className="text-[10px] text-slate-600 leading-tight">
                    {c.analysis}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Guidance for Teachers in Staff Meetings */}
          <div className="border-t border-slate-300 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              <strong>研修での協議ポイント：</strong> 単元末の課題で「子供たちに方法を教えすぎない工夫」と「複数の場面を往還させる発問」をどう仕組むか。
            </div>
            <div className="text-[10px] text-slate-400 font-mono shrink-0">
              AI Studio Curriculum Guideline Report
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
