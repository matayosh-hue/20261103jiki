import React, { useState } from 'react';
import { UnitData } from '../data/curriculumData';
import { CheckCircle2, ChevronRight, UserCheck, AlertCircle, HelpCircle, Lightbulb } from 'lucide-react';

interface Props {
  unit: UnitData;
}

export const HolisticComparisonView: React.FC<Props> = ({ unit }) => {
  const { problemScene, childrenComparison, processSteps } = unit.holisticApplication;
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedChild, setSelectedChild] = useState<number>(2); // Default to Child C

  return (
    <div className="space-y-8">
      {/* Problem Scenario Card */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border border-emerald-200/80 rounded-xl p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-600 text-white rounded-md">
              問題場面（教師が解法を指定しない課題）
            </span>
            <span className="text-xs text-emerald-800 font-medium">
              {problemScene.sourceNote || '探究的な学習課題'}
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            総合的な発揮の見取り場面
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2">
          {problemScene.title}
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed bg-white/80 p-3.5 rounded-lg border border-emerald-100 mb-3">
          {problemScene.description}
        </p>

        <div className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50/90 border border-amber-200/80 p-2.5 rounded-md">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">子供たちが直面するジレンマ：</span> {problemScene.dilemma}
          </div>
        </div>
      </div>

      {/* 3 Children Comparison Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            同じ問題に対する3人の子供の考えの比較
          </h4>
          <span className="text-xs text-slate-500">
            ※クリックで各児童の思考・つまずき・指導のポイントを確認できます
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {childrenComparison.map((item, idx) => {
            const isSelected = selectedChild === idx;
            const isChildC = idx === 2;

            return (
              <div
                key={idx}
                onClick={() => setSelectedChild(idx)}
                className={`cursor-pointer rounded-xl border p-4.5 transition-all flex flex-col justify-between ${
                  isSelected
                    ? isChildC
                      ? 'border-emerald-500 bg-emerald-50/30 ring-2 ring-emerald-300 shadow-md'
                      : 'border-slate-400 bg-slate-50 ring-2 ring-slate-200 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-1.5 bg-slate-100 rounded-lg">{item.avatar}</span>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{item.child}</div>
                        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded border mt-0.5 ${item.typeBadgeColor}`}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Thought content */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/80 mb-3 text-xs leading-relaxed text-slate-700 font-mono whitespace-pre-wrap">
                    {item.thought}
                  </div>

                  {/* Thought points if Child C */}
                  {item.thoughtPoints && item.thoughtPoints.length > 0 && (
                    <div className="space-y-1.5 mb-3 bg-white p-2.5 rounded-lg border border-emerald-100 text-[11px] text-emerald-950">
                      <div className="font-semibold text-emerald-800 text-xs mb-1">思考のステップ：</div>
                      {item.thoughtPoints.map((pt, pIdx) => (
                        <div key={pIdx} className="leading-tight text-slate-700 pl-1">
                          {pt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Analysis */}
                <div className="pt-3 border-t border-slate-200/70 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700 block mb-1">
                    {isChildC ? '★ 総合的な発揮である理由：' : '教員からの見取り：'}
                  </span>
                  {item.analysis}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5-Step Process Section */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h4 className="text-base font-bold text-slate-900">
              総合的な発揮のプロセス（子供の思考の流れ 5ステップ）
            </h4>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            中教審検討資料・子供の思考フロー
          </span>
        </div>

        {/* Stepper Interactive Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {processSteps.map((step) => {
            const isActive = activeStep === step.step;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`p-3 rounded-lg text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>STEP {step.step}</span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <div className="text-xs font-medium line-clamp-2 leading-tight">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detailed Card */}
        {processSteps.find((s) => s.step === activeStep) && (
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  {activeStep}
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {processSteps.find((s) => s.step === activeStep)?.title}
                </span>
              </div>
              <p className="text-xs text-slate-600 pl-8">
                {processSteps.find((s) => s.step === activeStep)?.desc}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeStep > 1 && (
                <button
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded hover:bg-slate-50"
                >
                  前のステップ
                </button>
              )}
              {activeStep < processSteps.length && (
                <button
                  onClick={() => setActiveStep((prev) => prev + 1)}
                  className="px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 rounded hover:bg-emerald-700 flex items-center gap-1"
                >
                  次のステップ <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 flex items-start gap-2 border border-slate-200/70">
          <HelpCircle className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <strong>指導の視点：</strong>
            教師がステップを教えてなぞらせるのではなく、児童自らが「①何と何を比べるべきか」を見いだし、
            「⑤結果を現実の問題に戻して判断する」までやり切れる課題設定と問いかけの工夫が求められます。
          </div>
        </div>
      </div>
    </div>
  );
};
