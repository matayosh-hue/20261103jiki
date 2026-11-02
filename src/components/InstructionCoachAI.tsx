import React, { useState } from 'react';
import { UnitData } from '../data/curriculumData';
import {
  Sparkles,
  Bot,
  MessageSquare,
  CheckCircle2,
  Copy,
  Check,
  Loader2,
  HelpCircle,
  Lightbulb,
  CornerDownRight,
  Send,
  User,
  GraduationCap
} from 'lucide-react';

interface Props {
  unit: UnitData;
  activeMetrics?: { axis: string; score: number }[];
}

interface CoachResponse {
  diagnosis: string;
  spokenFeedback: string;
  scaffoldingStep: string;
  worksheetComment: string;
  wholeClassStrategy: string;
}

export const InstructionCoachAI: React.FC<Props> = ({ unit }) => {
  const [targetType, setTargetType] = useState<string>('児童A（単一数量で直感判断）');
  const [situation, setSituation] = useState<string>('机間指導での個別声かけ');
  const [customObservation, setCustomObservation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [coachResult, setCoachResult] = useState<CoachResponse | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Offline default presets based on MEXT official guidelines
  const getOfflinePreset = (type: string, sit: string): CoachResponse => {
    if (type.includes('児童A')) {
      return {
        diagnosis: '参加人数（12人と11人）という目に見える単一の数値だけに飛びついており、学級全体の人数（母数）の違いという「二つの数量の関係性」に気付いていない状態です。',
        spokenFeedback: '「〇〇さん、12人と11人の人数の違いをすぐに見つけたのは素晴らしいね！じゃあちょっと意地悪な質問だけど、もし1組が100人いて12人参加、2組が12人中11人参加だったとしたら、どっちのクラスの方が『よく参加している』って言えるかな？」',
        scaffoldingStep: '極端な数値例（例: 100人中12人と12人中11人）を提示して認知の葛藤（不公平さ）を引き起こし、「人数だけじゃなくて、クラス全体の人数と比べないと公平じゃない！」という気付きを促します。',
        worksheetComment: '「人数に着目して素早く比べられました◎ クラスの全体の人数が違うときも、人数だけで比べられるかな？ 二つの関係を考えてみよう！」',
        wholeClassStrategy: '児童Aの「12人と11人だから1組！」という発言をあえて黒板に大きく書き、「Aさんのこの意見、みんなはどう思う？」と学級全体に投げかけることで、単元の課題設定（思考プロセス①〜②）へと一気に巻き込みます。'
      };
    } else if (type.includes('児童B')) {
      return {
        diagnosis: '公式「12÷30=0.4」「11÷25=0.44」を使って割合を算出する計算技能は身に付いていますが、得られた数値（44%）を元の現実の疑問（2組の参加状況はよくないと言えるか？）に戻して解釈・吟味する「総合的な発揮」が未完です。',
        spokenFeedback: '「計算バッチリだね！1組が40%、2組が44%と正確に出せたのはさすが！では、最初の問題の『2組の参加者は少ないから、2組の参加状況はよくない』って言っている友達に、この44%という数字を使ってどう答えてあげたらいいかな？」',
        scaffoldingStep: '「計算のゴール」で満足させず、「現実の問題文の言葉（参加状況はよくない？）」を指さして、「計算結果」と「現実の主張の真偽」をつなぐ架け橋の問いを投げかけます。',
        worksheetComment: '「割合を使って公平に比べることができました！計算して出た44%をもとに、友達の意見に対してどう言えるか、自分の言葉で判断を書いてみよう！」',
        wholeClassStrategy: '黒板に「計算の式と答え」を書かせた後、「この44%は、何を表している数なんだろう？」と問いかけ、ただの計算ではなく「判断の根拠」としての数学の有用性を学級で共有します。'
      };
    } else if (type.includes('児童C')) {
      return {
        diagnosis: '二つの数量の関係に着目し、適切な解法（割合）を選び、出た数値を現実の文脈に戻して多角的に判断できています。文科省が目指す「総合的な発揮」の最高水準の姿です。',
        spokenFeedback: '「すごい！『参加人数は1組が多いけれど、クラス全体の人数との関係で見ると2組の方が高いから、よくないとは言えない』と、筋道立てて説明できているね。この考え方、まだ迷っている友達にも図や言葉で伝わるようにアドバイスしてみてくれる？」',
        scaffoldingStep: '自分の思考プロセス（①何と何を比べるか → ②公平性 → ③割合の選択 → ④現実判断）を他の児童にも分かりやすい言葉や図（テープ図や数直線）で表現させ、他者への説明を通じたメタ認知深化を促します。',
        worksheetComment: '「二つの数量の関係に着目し、現実の問題に戻して公平に判断できていて素晴らしい！理由の書き方も論理的で完璧です★」',
        wholeClassStrategy: '児童Cの思考の4つのステップ（①〜④）を学級のまとめ（振り返り）で価値付け、「これが次期指導要領で目指す『考えを使って判断する』姿なんだよ」と子供たち全員の共有財産にします。'
      };
    } else {
      return {
        diagnosis: '個別知識（ジュースや混み具合）の学習を終え、未知の課題で自ら知識を選択・適用する過渡期にあります。一部の児童が公式のあてはめに迷っています。',
        spokenFeedback: '「みんな、これまでジュースの濃さや教室の混み具合で勉強してきたよね。あの時、みんなはどうやって比べていたっけ？今回の問題と、似ているところはあるかな？」',
        scaffoldingStep: '教室の掲示物や前時のノート（ジュースの濃さ、教室の混み具合）を振り返らせ、「二つの数量の関係を一つの数にする」という統合的な見方を想起させます。',
        worksheetComment: '「前回の学習で使った『見方』を思い出しながら、自分で比べ方を工夫してみよう！」',
        wholeClassStrategy: '教師が「割合で解きなさい」と指示を出してしまうのを我慢し、児童同士で「これって混み具合と同じじゃない？」とつぶやきが広がるようなペアトークの時間を確保します。'
      };
    }
  };

  // Initial load preset
  React.useEffect(() => {
    setCoachResult(getOfflinePreset(targetType, situation));
  }, [targetType, situation]);

  const handleConsultAI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/coach-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unit,
          targetType,
          situation,
          customObservation
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data: CoachResponse = await response.json();
      setCoachResult(data);
    } catch (err) {
      console.warn('Using offline preset coach response');
      setCoachResult(getOfflinePreset(targetType, situation));
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-indigo-200 shadow-sm overflow-hidden mt-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center text-indigo-200">
              <Bot className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-500/40 text-indigo-200 border border-indigo-400/30 rounded">
                  指導改善AIコーチ
                </span>
                <span className="text-xs text-indigo-200 font-mono">
                  Instructional Improvement AI Coach
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                学習者の見取り診断 & 最適フィードバック提案
              </h4>
            </div>
          </div>
          <span className="text-xs text-indigo-200 bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
            対象単元: {unit.unitName}
          </span>
        </div>
        <p className="text-xs text-indigo-100/90 mt-2 max-w-3xl leading-relaxed">
          レーダーチャートや児童のつぶやき・ノート記述から「今、目の前の児童にどんな言葉を投げかければ『総合的な発揮』へと高まるか」をAIが助言します。
        </p>
      </div>

      {/* Control Console */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/70 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Target Student Type */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600" />
              対象とする児童タイプ・学習状態
            </label>
            <select
              value={targetType}
              onChange={(e) => setTargetType(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-2xs font-medium"
            >
              <option value="児童A（単一数量で直感判断）">
                児童Aタイプ：単一の数量（人数）だけで判断している
              </option>
              <option value="児童B（個別知識・技能を使って比較）">
                児童Bタイプ：割合の計算はできるが、現実の吟味が不足
              </option>
              <option value="児童C（総合的な発揮の姿）">
                児童Cタイプ：総合的な発揮ができている（他者への説明・発展）
              </option>
              <option value="学級全体（統合から発揮への移行期）">
                学級全体：知識の統合から未知の課題解決への足がかり
              </option>
            </select>
          </div>

          {/* Guidance Situation */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
              フィードバックを返す指導場面
            </label>
            <select
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-2xs font-medium"
            >
              <option value="机間指導での個別声かけ">机間指導での個別声かけ（机の横での1対1）</option>
              <option value="全体検討・練り上げの発問">全体検討・練り上げ（黒板前での問いかけ）</option>
              <option value="ノート・振り返りシートへの記述コメント">ノート・振り返りシートへの赤ペン朱書き</option>
              <option value="ペア対話・小グループ活動の仕掛け">ペア対話・小グループ活動の仕掛け</option>
            </select>
          </div>
        </div>

        {/* Custom Observation */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
            先生が気になった児童の具体的な発言・ノート記述（任意・入力するとより最適化されます）
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customObservation}
              onChange={(e) => setCustomObservation(e.target.value)}
              placeholder="例: 「12人と11人だから1組の勝ち！」と言っている、44%と計算しただけで手が止まっている など"
              className="flex-1 text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 shadow-2xs"
            />
            <button
              onClick={handleConsultAI}
              disabled={loading}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  分析中...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  AIコーチに相談する
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AI Coach Feedback Output Deck */}
      {coachResult && (
        <div className="p-5 space-y-4">
          {/* 1. Diagnosis */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                【見立て診断】現在の学習者の認知状態の分析
              </span>
              <button
                onClick={() => copyToClipboard(coachResult.diagnosis, 'diag')}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                {copiedKey === 'diag' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                コピー
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {coachResult.diagnosis}
            </p>
          </div>

          {/* 2. Spoken Script (Hero Feedback) */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50/50 border-2 border-amber-300 rounded-xl p-4.5 space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                ★ その場で使える「児童への声かけ・問いかけ（セリフ形式）」
              </span>
              <button
                onClick={() => copyToClipboard(coachResult.spokenFeedback, 'spoken')}
                className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded border border-amber-200"
              >
                {copiedKey === 'spoken' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                セリフをコピー
              </button>
            </div>
            <div className="bg-white p-3.5 rounded-lg border border-amber-200 text-sm font-semibold text-slate-900 leading-relaxed shadow-inner">
              {coachResult.spokenFeedback}
            </div>
          </div>

          {/* 3 Grid Columns: Scaffolding, Worksheet Comment, Whole-class Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            {/* Scaffolding */}
            <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-sky-950 flex items-center gap-1">
                    <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
                    足場かけ（スキャフォールディング）
                  </span>
                  <button
                    onClick={() => copyToClipboard(coachResult.scaffoldingStep, 'scaff')}
                    className="text-[10px] text-sky-700 hover:text-sky-950"
                  >
                    {copiedKey === 'scaff' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {coachResult.scaffoldingStep}
                </p>
              </div>
            </div>

            {/* Worksheet Comment */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-emerald-950 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ノート・振り返りの朱書き例
                  </span>
                  <button
                    onClick={() => copyToClipboard(coachResult.worksheetComment, 'note')}
                    className="text-[10px] text-emerald-700 hover:text-emerald-950"
                  >
                    {copiedKey === 'note' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic font-medium">
                  {coachResult.worksheetComment}
                </p>
              </div>
            </div>

            {/* Whole Class Strategy */}
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-indigo-950 flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                    板書・練り上げへの生かし方
                  </span>
                  <button
                    onClick={() => copyToClipboard(coachResult.wholeClassStrategy, 'class')}
                    className="text-[10px] text-indigo-700 hover:text-indigo-950"
                  >
                    {copiedKey === 'class' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {coachResult.wholeClassStrategy}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
