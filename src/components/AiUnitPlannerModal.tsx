import React, { useState } from 'react';
import { UnitData } from '../data/curriculumData';
import { X, Sparkles, Loader2, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUnitGenerated: (newUnit: UnitData) => void;
}

export const AiUnitPlannerModal: React.FC<Props> = ({ isOpen, onClose, onUnitGenerated }) => {
  const [subject, setSubject] = useState<'算数' | '理科' | '社会' | '国語' | '生活'>('理科');
  const [grade, setGrade] = useState<number>(3);
  const [domain, setDomain] = useState<string>('エネルギー');
  const [unitName, setUnitName] = useState<string>('風やゴムのはたらき');
  const [challengeTopic, setChallengeTopic] = useState<string>('もっと遠くまで走る車を作るには？ゴムの伸ばし方や風の強さと走る距離の関係');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Domain presets depending on subject
  const domainPresets: Record<string, string[]> = {
    '算数': ['数と計算', '図形', '測定', '変化と関係', 'データの活用'],
    '理科': ['エネルギー', '粒子', '生命', '地球'],
    '社会': ['身近な地域と市', '地域の産業と生活', '我が国の産業と貿易', '我が国の歴史と伝統', '政治・国際'],
    '国語': ['話すこと・聞くこと', '書くこと', '読むこと', '言葉の特徴・語彙'],
    '生活': ['学校と友達', '町探検・地域の公共施設', '動植物の飼育・栽培', '身近な自然・季節']
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-unit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          grade,
          domain,
          unitName,
          challengeTopic
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'AI生成リクエストに失敗しました');
      }

      const generated: UnitData = await response.json();
      
      // Ensure required properties
      generated.id = `custom-${Date.now()}`;
      generated.gradeLabel = `第${grade}学年`;
      
      onUnitGenerated(generated);
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message?.includes('GEMINI_API_KEY')
          ? 'GEMINI_API_KEY が未設定です。ローカル環境設定、または下の「オフラインテンプレート追加」をお試しください。'
          : `エラーが発生しました: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApplyQuickTemplate = (preset: {
    subject: '算数' | '理科' | '社会' | '国語' | '生活';
    grade: number;
    domain: string;
    unitName: string;
    topic: string;
  }) => {
    setSubject(preset.subject);
    setGrade(preset.grade);
    setDomain(preset.domain);
    setUnitName(preset.unitName);
    setChallengeTopic(preset.topic);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/80 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              AI単元プランナー（自校の単元・課題から具体例を自動生成）
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleGenerate} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed bg-indigo-50/50 p-3 rounded-lg border border-indigo-100">
            文科省中教審資料の枠組みに完全準拠し、任意の小学校教科・学年・単元名から
            <strong>「統合的な理解（つぶやき・3場面）」</strong>、
            <strong>「総合的な発揮（児童A/B/Cの思考比較・5ステップ）」</strong>、
            <strong>「教師の発問・評価基準」</strong>をAIが設計します。
          </p>

          {/* Quick Preset Buttons */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              よく検討される単元のおすすめ候補：
            </label>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() =>
                  handleApplyQuickTemplate({
                    subject: '理科',
                    grade: 3,
                    domain: 'エネルギー',
                    unitName: '風やゴムのはたらき',
                    topic: 'ゴムカーレースでゴールぴったりに止めるには？'
                  })
                }
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200"
              >
                3年理科：風とゴム
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApplyQuickTemplate({
                    subject: '社会',
                    grade: 3,
                    domain: '身近な地域と市',
                    unitName: '農家の仕事と地産地消',
                    topic: '直売所とスーパーで売る野菜の違いと立地条件'
                  })
                }
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200"
              >
                3年社会：農家の仕事
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApplyQuickTemplate({
                    subject: '算数',
                    grade: 3,
                    domain: '数と計算',
                    unitName: '小数と分数',
                    topic: '1より小さい端数の量を計量カップと数直線で表す'
                  })
                }
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200"
              >
                3年算数：小数と分数
              </button>
              <button
                type="button"
                onClick={() =>
                  handleApplyQuickTemplate({
                    subject: '社会',
                    grade: 6,
                    domain: '政治・国際',
                    unitName: '日本国憲法と人々のくらし',
                    topic: '災害時の避難所運営で憲法三原則をどう生かすか'
                  })
                }
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md border border-slate-200"
              >
                6年社会：日本国憲法
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Subject */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                教科
              </label>
              <select
                value={subject}
                onChange={(e) => {
                  const s = e.target.value as any;
                  setSubject(s);
                  setDomain(domainPresets[s][0]);
                }}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="算数">算数</option>
                <option value="理科">理科</option>
                <option value="社会">社会</option>
                <option value="国語">国語</option>
                <option value="生活">生活（1・2年）</option>
              </select>
            </div>

            {/* Grade */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                学年
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value={1}>小学校第1学年</option>
                <option value={2}>小学校第2学年</option>
                <option value={3}>小学校第3学年</option>
                <option value={4}>小学校第4学年</option>
                <option value={5}>小学校第5学年</option>
                <option value={6}>小学校第6学年</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Domain */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                領域・分野
              </label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="例: エネルギー, 変化と関係"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Unit Name */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                単元名・題材名
              </label>
              <input
                type="text"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="例: 風やゴムのはたらき"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Challenge Topic */}
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              扱いたい課題や文脈（任意・地域教材や学校の実態）
            </label>
            <textarea
              value={challengeTopic}
              onChange={(e) => setChallengeTopic(e.target.value)}
              placeholder="例: 地域の川の増水とハザードマップ、体育館の避難所づくり、商店街の看板づくりなど"
              rows={2}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Footer inside form */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800"
              disabled={loading}
            >
              キャンセル
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  中教審フレームで生成中...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  具体例と指導案を生成する
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
