import React from 'react';
import { UnitData } from '../data/curriculumData';
import { Printer, X, Download } from 'lucide-react';

interface Props {
  unit: UnitData;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableLessonPlan: React.FC<Props> = ({ unit, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[96vh] flex flex-col overflow-hidden shadow-2xl border border-slate-300">
        {/* Modal Controls (No print) */}
        <div className="no-print px-6 py-3.5 border-b border-slate-200 bg-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-0.5 bg-slate-800 text-white rounded">
              校内研修・指導案用
            </span>
            <span className="text-sm font-bold text-slate-800">
              単元構想シート（統合的な理解・総合的な発揮）
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" /> 印刷 / PDF保存
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-8 text-slate-900 text-xs sm:text-sm space-y-6 bg-white font-sans">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="text-xs font-bold text-slate-500 tracking-wider">
                次期学習指導要領 授業づくり単元構想シート
              </div>
              <h1 className="text-xl sm:text-2xl font-bold mt-1 text-slate-950">
                小学校{unit.gradeLabel} {unit.subject}科 「{unit.unitName}」
              </h1>
              <div className="text-xs text-slate-600 mt-0.5 font-medium">
                領域: {unit.domain} ｜ 主題: {unit.subtitle}
              </div>
            </div>
            <div className="text-right text-xs text-slate-500 border border-slate-300 p-2 rounded">
              <div>検討日: {new Date().toLocaleDateString('ja-JP')}</div>
              <div>対象: 小学校{unit.grade}年</div>
            </div>
          </div>

          {/* Perspective */}
          <div className="bg-slate-50 border border-slate-300 p-3 rounded">
            <div className="text-xs font-bold text-slate-700">■ 働かせる見方・考え方</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">
              {unit.perspective}
            </div>
          </div>

          {/* Integrated Understanding Section */}
          <div className="border border-slate-300 rounded overflow-hidden">
            <div className="bg-sky-100/70 border-b border-slate-300 px-3.5 py-1.5 font-bold text-sky-950 flex justify-between items-center text-xs sm:text-sm">
              <span>Ⅰ. 【統合的な理解】（学んできた知識がつながって見える状態）</span>
              <span className="text-[11px] font-normal text-sky-900">※共通する見方に気付く</span>
            </div>
            <div className="p-3.5 space-y-3 bg-white text-xs">
              <div>
                <span className="font-bold text-slate-800">● 定義・目標：</span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{unit.integratedUnderstanding.definition}</p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-2 text-slate-800">
                <span className="font-bold text-amber-900">● 気付いた子供のつぶやき（統合の姿）：</span>
                <p className="italic font-medium mt-0.5">{unit.integratedUnderstanding.childrenUtterance}</p>
              </div>
              <div>
                <span className="font-bold text-slate-800">● 往還する3つの場面（事例）：</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-1">
                  {unit.integratedUnderstanding.scenes.map((s, idx) => (
                    <div key={idx} className="border border-slate-200 p-2 rounded bg-slate-50">
                      <div className="font-bold text-slate-900 text-[11px]">{s.title}</div>
                      <div className="text-[10px] text-slate-600 mt-1">{s.context}</div>
                      {s.calculation && (
                        <div className="text-[10px] text-slate-800 font-mono mt-1 pt-1 border-t border-slate-200">
                          {s.calculation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Holistic Application Section */}
          <div className="border border-slate-300 rounded overflow-hidden">
            <div className="bg-emerald-100/70 border-b border-slate-300 px-3.5 py-1.5 font-bold text-emerald-950 flex justify-between items-center text-xs sm:text-sm">
              <span>Ⅱ. 【総合的な発揮】（身に付けた考え方を、新しい場面で自ら働かせる状態）</span>
              <span className="text-[11px] font-normal text-emerald-900">※教師が方法を指定しない問題</span>
            </div>
            <div className="p-3.5 space-y-3 bg-white text-xs">
              <div className="border border-slate-200 p-2.5 rounded bg-slate-50">
                <div className="font-bold text-slate-900 text-xs">● 問題場面：{unit.holisticApplication.problemScene.title}</div>
                <p className="text-slate-700 mt-1 leading-relaxed">
                  {unit.holisticApplication.problemScene.description}
                </p>
                <div className="text-[11px] text-amber-800 mt-1">
                  <strong>ジレンマ:</strong> {unit.holisticApplication.problemScene.dilemma}
                </div>
              </div>

              {/* Children Comparison Table */}
              <div>
                <div className="font-bold text-slate-800 mb-1">● 同じ問題に対する3人の子供の考え（見取りと支援）：</div>
                <table className="w-full border-collapse border border-slate-300 text-[11px]">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="border border-slate-300 p-1.5 w-1/5 text-left">児童タイプ</th>
                      <th className="border border-slate-300 p-1.5 w-2/5 text-left">児童の思考・つぶやき</th>
                      <th className="border border-slate-300 p-1.5 w-2/5 text-left">認知状態の分析・評価</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unit.holisticApplication.childrenComparison.map((c, idx) => (
                      <tr key={idx} className={idx === 2 ? 'bg-emerald-50/60 font-semibold' : ''}>
                        <td className="border border-slate-300 p-1.5 align-top">
                          <div>{c.child}</div>
                          <div className="text-[10px] text-slate-500 font-normal">{c.type}</div>
                        </td>
                        <td className="border border-slate-300 p-1.5 align-top whitespace-pre-wrap font-mono">
                          {c.thought}
                        </td>
                        <td className="border border-slate-300 p-1.5 align-top text-slate-700">
                          {c.analysis}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 5 Process Steps */}
              <div>
                <div className="font-bold text-slate-800 mb-1">● 総合的な発揮のプロセス（子供の思考の流れ 5ステップ）：</div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-1 text-[10px]">
                  {unit.holisticApplication.processSteps.map((st) => (
                    <div key={st.step} className="border border-slate-300 p-1.5 rounded bg-slate-50">
                      <div className="font-bold text-emerald-800">STEP {st.step}</div>
                      <div className="font-semibold text-slate-900 mt-0.5">{st.title}</div>
                      <div className="text-slate-600 mt-0.5">{st.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Unified Cycle & Teacher Advice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Unified Cycle */}
            <div className="border border-slate-300 rounded p-3 bg-slate-50">
              <div className="font-bold text-slate-900 mb-1">Ⅲ. 二つが一体となった子供の姿（学びの循環）</div>
              <p className="text-slate-700 leading-relaxed">{unit.unifiedCycle.interactionText}</p>
              <div className="mt-2 text-indigo-900 font-medium text-[11px]">
                実生活への生かし方: {unit.unifiedCycle.practicalOutcome}
              </div>
            </div>

            {/* Assessment */}
            <div className="border border-slate-300 rounded p-3 bg-slate-50">
              <div className="font-bold text-slate-900 mb-1">Ⅳ. 見取りと評価規準（ルーブリック）</div>
              <div className="space-y-1 text-[11px]">
                <div><span className="font-bold text-emerald-700">A基準（十分満足）:</span> {unit.teacherAdvice.assessmentFocus.levelA}</div>
                <div><span className="font-bold text-blue-700">B基準（おおむね満足）:</span> {unit.teacherAdvice.assessmentFocus.levelB}</div>
                <div><span className="font-bold text-amber-700">C基準（努力を要する）:</span> {unit.teacherAdvice.assessmentFocus.levelC}</div>
              </div>
            </div>
          </div>

          {/* Teacher Questioning tips */}
          <div className="border-t border-slate-300 pt-3 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800">■ 指導における発問・揺さぶりの工夫：</span>
            <ul className="list-disc list-inside space-y-0.5 pl-1">
              {unit.teacherAdvice.questioningExamples.map((q, qIdx) => (
                <li key={qIdx}>{q}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
