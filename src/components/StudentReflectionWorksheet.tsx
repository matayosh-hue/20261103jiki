import React from 'react';
import { UnitData } from '../data/curriculumData';
import { Printer, X, Download, FileText, CheckCircle2, MessageSquare, Lightbulb, Star, Award, Compass, Heart } from 'lucide-react';

interface Props {
  unit: UnitData;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentReflectionWorksheet: React.FC<Props> = ({ unit, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[96vh] flex flex-col overflow-hidden shadow-2xl border border-slate-300">
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print px-6 py-3.5 border-b border-slate-200 bg-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-700 text-white rounded-md">
              児童配信用 / A4印刷
            </span>
            <span className="text-sm font-bold text-slate-800">
              児童用「学びのふり返りワークシート」（統合的理解・総合的発揮）
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" /> ワークシートをA4印刷 / PDF保存
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Student Worksheet Body (A4 Portrait format) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 text-slate-900 text-xs sm:text-sm space-y-4 bg-white font-sans print:p-2 print:text-black">
          {/* Worksheet Header Box */}
          <div className="border-2 border-slate-900 rounded-xl p-3 bg-slate-50/50 print:bg-transparent">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-900 text-white text-[11px] font-bold rounded print:bg-black">
                  {unit.subject}科 ふり返りシート
                </span>
                <h1 className="text-base sm:text-lg font-black text-slate-950">
                  単元名：「{unit.unitName}」
                </h1>
              </div>
              <div className="text-[11px] text-slate-600 font-medium">
                小学校{unit.gradeLabel}
              </div>
            </div>

            {/* Student Name Strip */}
            <div className="grid grid-cols-12 gap-2 text-xs">
              <div className="col-span-3 border border-slate-400 rounded p-1.5 flex items-center bg-white">
                <span className="text-[10px] text-slate-500 mr-2">実施日:</span>
                <span className="font-mono text-slate-800">　年　月　日</span>
              </div>
              <div className="col-span-3 border border-slate-400 rounded p-1.5 flex items-center bg-white">
                <span className="text-[10px] text-slate-500 mr-2">学年・組:</span>
                <span className="font-mono text-slate-800">{unit.grade} 年　　組</span>
              </div>
              <div className="col-span-6 border-2 border-slate-900 rounded p-1.5 flex items-center justify-between bg-white">
                <span className="text-[11px] font-bold text-slate-600">なまえ:</span>
                <span className="text-slate-400 font-mono">（ふりがな）</span>
              </div>
            </div>
          </div>

          {/* Perspective Goal Box */}
          <div className="bg-amber-50/60 border border-amber-300 rounded-lg p-2.5 text-xs flex items-center gap-2 print:border-slate-400 print:bg-slate-50">
            <Compass className="w-4 h-4 text-amber-700 shrink-0 print:text-black" />
            <div>
              <span className="font-bold text-amber-950 print:text-black">この単元でつかった「見方・考え方」：</span>{' '}
              <span className="text-slate-800 font-medium">{unit.perspective}</span>
            </div>
          </div>

          {/* =========================================================================
              PART 1: 統合的な理解のふり返り（知識がつながった！）
          ========================================================================= */}
          <div className="border-2 border-sky-400 rounded-xl overflow-hidden bg-white print:border-slate-500">
            <div className="bg-sky-100 px-3 py-1.5 border-b border-sky-300 flex items-center justify-between print:bg-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-sky-950 text-xs sm:text-sm print:text-black">
                <span className="w-5 h-5 rounded-full bg-sky-700 text-white flex items-center justify-center text-[10px] print:bg-black">
                  1
                </span>
                【統合的な理解】学んできたことが「つながって見えた」かな？
              </div>
              <span className="text-[10px] font-bold text-sky-800 print:text-black">
                ★ べつべつに習ったことの「共通点」
              </span>
            </div>

            <div className="p-3 space-y-2.5 text-xs">
              {/* Scene Checklist */}
              <div className="text-slate-700 leading-snug">
                この単元では、いくつかの場面をべんきょうしました。
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 mt-1.5">
                  {unit.integratedUnderstanding.scenes.map((s, idx) => (
                    <div key={idx} className="border border-sky-200 bg-sky-50/50 p-1.5 rounded flex items-center gap-1.5 text-[11px] print:border-slate-300">
                      <input type="checkbox" className="w-3.5 h-3.5 rounded border-slate-300 accent-sky-600 cursor-pointer" />
                      <span className="font-semibold text-slate-800">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Children Utterance Bubble Area */}
              <div className="space-y-1">
                <label className="font-bold text-slate-900 block text-xs">
                  ◆ 「あれ？これって全部〇〇なんじゃない？」と、頭の中でつながったことや気付いたことを書こう！
                </label>
                <div className="relative border-2 border-dashed border-sky-300 rounded-lg p-3 min-h-[70px] bg-sky-50/20 text-slate-500 text-xs print:border-slate-400">
                  <div className="text-[10px] text-sky-700 font-bold mb-0.5">【ヒント：友達のつぶやき例】</div>
                  <div className="text-[10px] text-slate-600 italic mb-2">
                    {unit.integratedUnderstanding.childrenUtterance}
                  </div>
                  <div className="border-b border-dotted border-slate-300 h-5" />
                  <div className="border-b border-dotted border-slate-300 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              PART 2: 総合的な発揮のふり返り（自分で考えて判断できた！）
          ========================================================================= */}
          <div className="border-2 border-emerald-400 rounded-xl overflow-hidden bg-white print:border-slate-500">
            <div className="bg-emerald-100 px-3 py-1.5 border-b border-emerald-300 flex items-center justify-between print:bg-slate-200">
              <div className="flex items-center gap-1.5 font-bold text-emerald-950 text-xs sm:text-sm print:text-black">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px] print:bg-black">
                  2
                </span>
                【総合的な発揮】先生に言われなくても、自分で考えを使って判断できたかな？
              </div>
              <span className="text-[10px] font-bold text-emerald-800 print:text-black">
                ★ 新しい問題に自ら生かす
              </span>
            </div>

            <div className="p-3 space-y-3 text-xs">
              {/* Challenge Problem Context */}
              <div className="bg-slate-50 p-2 rounded border border-slate-200 text-[11px] leading-relaxed">
                <span className="font-bold text-slate-800">挑戦した問題：</span>{' '}
                {unit.holisticApplication.problemScene.title}
                <div className="text-slate-600 mt-0.5 text-[10px]">
                  {unit.holisticApplication.problemScene.description}
                </div>
              </div>

              {/* 5 Process Steps Checklist */}
              <div>
                <span className="font-bold text-slate-800 text-xs block mb-1">
                  ◆ あなたはどのように考えて判断しましたか？ 当てはまるものにチェック（☑）をしよう：
                </span>
                <div className="space-y-1">
                  {unit.holisticApplication.processSteps.map((step) => (
                    <div key={step.step} className="flex items-center justify-between p-1.5 rounded border border-slate-200 bg-white text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px] print:bg-black">
                          {step.step}
                        </span>
                        <span className="font-bold text-slate-800">{step.title}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-slate-500 shrink-0">
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="checkbox" className="accent-emerald-600" /> よくできた
                        </label>
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input type="checkbox" className="accent-emerald-600" /> もう少し
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decision & Reasoning Writing Field */}
              <div className="space-y-1">
                <label className="font-bold text-slate-900 block text-xs">
                  ◆ 自分の考えと、その考えを使って「どう判断したか（結論）」を書こう！
                </label>
                <div className="border-2 border-slate-300 rounded-lg p-2.5 min-h-[85px] bg-white print:border-slate-400">
                  <div className="text-[10px] text-slate-400 mb-1">
                    （例：人数だけ見ると〇〇だけど、全体の人数との関係を割合で比べると〜だから、△△だと判断した。）
                  </div>
                  <div className="border-b border-dotted border-slate-300 h-5" />
                  <div className="border-b border-dotted border-slate-300 h-5" />
                  <div className="border-b border-dotted border-slate-300 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              PART 3: これからの生活や学習へ & 自己評価（3段階）
          ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
            {/* Future Living / Connection (8 cols) */}
            <div className="sm:col-span-8 border-2 border-indigo-300 rounded-xl p-3 bg-white space-y-1.5 print:border-slate-400">
              <div className="font-bold text-indigo-950 flex items-center gap-1.5 text-xs print:text-black">
                <Lightbulb className="w-4 h-4 text-indigo-600 print:text-black" />
                3. 【これからの自分へ】毎日の生活やこれからの勉強でどう生かせそうかな？
              </div>
              <div className="border border-slate-200 rounded p-2 min-h-[55px] bg-slate-50/50 print:bg-white">
                <div className="text-[10px] text-slate-400 mb-1">
                  （例：買い物でどっちがお得か比べるとき、理科の実験、他の教科での比べ方など）
                </div>
                <div className="border-b border-dotted border-slate-300 h-4" />
                <div className="border-b border-dotted border-slate-300 h-4" />
              </div>
            </div>

            {/* Self-Rating Star Box (4 cols) */}
            <div className="sm:col-span-4 border-2 border-amber-300 rounded-xl p-3 bg-amber-50/40 flex flex-col justify-between print:border-slate-400 print:bg-white">
              <div>
                <div className="font-bold text-amber-950 text-xs flex items-center gap-1 mb-1 print:text-black">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 print:text-black" />
                  今日のじぶんの学び
                </div>
                <div className="space-y-1 text-[11px] text-slate-700">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="accent-amber-500" />
                    <span>★★★ とてもよくできた</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="accent-amber-500" />
                    <span>★★　 できた</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" className="accent-amber-500" />
                    <span>★　　 もう少し</span>
                  </label>
                </div>
              </div>

              {/* Teacher Comment Box */}
              <div className="mt-2 pt-1.5 border-t border-amber-200 text-[10px] text-slate-500">
                <span>先生からのひとこと：</span>
                <div className="h-6 border border-dashed border-slate-300 rounded mt-0.5 bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
