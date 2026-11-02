import React, { useState } from 'react';
import { X, ExternalLink, ChevronLeft, ChevronRight, FileText, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const OfficialMaterialsModal: React.FC<Props> = ({ isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);

  const materials = [
    {
      path: '/assets/aistudio/t_b0fa75ec.JPG',
      title: '資料1：統合的な理解と総合的な発揮「二つが一体となった子供の姿」',
      desc: '【統合的な理解】と【総合的な発揮】の双方向の矢印。「使うことで理解が深まり、理解が次の活用を支える」。割合・単位量当たり・比を二つの数量の関係として捉える全体構想図。'
    },
    {
      path: '/assets/aistudio/tt_a33f6a52.JPG',
      title: '資料2：1 統合的な理解が見られる場面 〜どちらが濃い？から見えてくるつながり〜',
      desc: 'A: 果汁200mL+水300mL、B: 果汁300mL+水500mL。「果汁の量ではなく、『果汁と全体（あるいは水）の関係』を見なければ比較できない！」という子供の気付きと個別知識の働き。'
    },
    {
      path: '/assets/aistudio/tttt_9582b9e4.JPG',
      title: '資料3：場面1〜3（割合・混み具合・比）と気付いた子供のつぶやき',
      desc: '場面1: 割合での比較 / 場面2: 教室の混み具合（単位量当たり） / 場面3: 同じ味のジュース（比）。子供のつぶやき「二つの間の関係を一つの数で表して、比べているんじゃない？」。'
    },
    {
      path: '/assets/aistudio/ttttt_606bddcb.JPG',
      title: '資料4：ここまでのまとめ（統合的な理解・総合的な発揮）＆ 先生方へ',
      desc: '学んできた知識がつながって見える状態（統合的な理解）と、身に付けた考え方を新しい場面で自分で働かせていく状態（総合的な発揮）。「先生方へ」の4つの指導助言。'
    },
    {
      path: '/assets/aistudio/tttttttt_e61530d9.JPG',
      title: '資料5：2 総合的な発揮が見られる場面 〜自分で比べ方を考え、判断に生かす〜',
      desc: '場面: クラスの参加状況は、どちらがよい？ 1組（30人中12人）と2組（25人中11人）。「参加者が少ないから2組の方がよくない」に対する批判的検討。'
    },
    {
      path: '/assets/aistudio/tttttt_74cbe6f9.JPG',
      title: '資料6：同じ問題に対する3人の子供の考え（児童A・児童B・児童C）',
      desc: '児童A（一つの数量だけ見て判断）、児童B（個別の知識・技能を使って比較）、児童C（比べるべき二つの数量を見いだし適切な方法を選び現実の問題に戻して判断する総合的な発揮）。'
    },
    {
      path: '/assets/aistudio/ttttttt_e3c18637.JPG',
      title: '資料7：総合的な発揮のプロセス（子供の思考の流れ ①〜⑤）',
      desc: '①何と何を比べるべきかを見いだす → ②人数だけでは適切に比較できないと判断する → ③二つの数量の関係として捉える → ④適切な方法を選択して比べる → ⑤結果を現実の問題に戻して判断する。'
    }
  ];

  if (!isOpen) return null;

  const current = materials[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              次期学習指導要領 検討資料ギャラリー（全7枚）
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Main Selected Image */}
          <div className="bg-slate-100 rounded-xl overflow-hidden border border-slate-200 flex flex-col items-center justify-center min-h-[300px] max-h-[550px] relative group">
            <img
              src={current.path}
              alt={current.title}
              className="max-h-[500px] w-auto object-contain mx-auto transition-transform group-hover:scale-[1.01]"
            />
            {/* Nav Arrows */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : materials.length - 1))}
              className="absolute left-3 p-2 rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white hover:text-slate-950 transition-all"
              aria-label="前の資料"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev < materials.length - 1 ? prev + 1 : 0))}
              className="absolute right-3 p-2 rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white hover:text-slate-950 transition-all"
              aria-label="次の資料"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Description */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-indigo-600 font-mono">
                資料 {currentIndex + 1} / {materials.length}
              </span>
              <a
                href={current.path}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1"
              >
                画像単体を別タブで拡大 <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <h4 className="font-bold text-slate-800 text-sm sm:text-base mb-1">
              {current.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {current.desc}
            </p>
          </div>

          {/* Thumbnail list */}
          <div className="grid grid-cols-7 gap-2 pt-2">
            {materials.map((mat, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all aspect-video ${
                  currentIndex === idx ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-slate-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={mat.path} alt={`サムネイル${idx + 1}`} className="w-full h-full object-cover" />
                <span className="absolute bottom-0 right-0 bg-slate-900/80 text-[9px] text-white px-1 font-mono">
                  {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg text-xs font-semibold hover:bg-slate-900 transition-colors"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};
