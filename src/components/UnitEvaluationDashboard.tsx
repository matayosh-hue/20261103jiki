import React, { useState } from 'react';
import { UnitData } from '../data/curriculumData';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import {
  TrendingUp,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Sliders,
  RotateCcw,
  BarChart3,
  Compass
} from 'lucide-react';

interface Props {
  unit: UnitData;
}

interface MetricItem {
  axis: string;
  shortLabel: string;
  category: '統合的な理解' | '総合的な発揮' | '基盤';
  description: string;
  childA: number;
  childB: number;
  childC: number;
  initial: number;
  midIntegrated: number;
  finalHolistic: number;
}

export const UnitEvaluationDashboard: React.FC<Props> = ({ unit }) => {
  // Mode: 'comparison' (Child A vs B vs C) or 'progression' (Initial vs Mid vs Final) or 'interactive' (Teacher custom slider)
  const [viewMode, setViewMode] = useState<'comparison' | 'progression' | 'interactive'>('comparison');

  // Interactive slider custom scores
  const [customScores, setCustomScores] = useState<number[]>([70, 65, 80, 60, 75, 85]);

  // Active highlighted metric for detail card
  const [activeMetricIdx, setActiveMetricIdx] = useState<number>(2);

  // Class distribution simulation state
  const [ratioA, setRatioA] = useState<number>(20);
  const [ratioB, setRatioB] = useState<number>(55);
  const [ratioC, setRatioC] = useState<number>(25);

  // 6 Core Metrics tailored for the unit
  const metrics: MetricItem[] = [
    {
      axis: '個別知識・技能の習得',
      shortLabel: '知識・技能',
      category: '基盤',
      description: `${unit.subject}の単元における計算や用語・公式などの個別知識を正確に理解・処理できる力。`,
      childA: 35,
      childB: 85,
      childC: 95,
      initial: 40,
      midIntegrated: 75,
      finalHolistic: 95
    },
    {
      axis: '複数場面の往還・比較',
      shortLabel: '場面の往還',
      category: '統合的な理解',
      description: '複数の異なる場面や具体例を行きつ戻りつしながら、共通する構造や見方に気付く力。',
      childA: 20,
      childB: 50,
      childC: 90,
      initial: 25,
      midIntegrated: 85,
      finalHolistic: 90
    },
    {
      axis: '本質的な関係の統合',
      shortLabel: '統合的な理解',
      category: '統合的な理解',
      description: `${unit.perspective}を働かせ、別々に習った知識が1つの本質としてつながって見える状態。`,
      childA: 15,
      childB: 55,
      childC: 95,
      initial: 20,
      midIntegrated: 90,
      finalHolistic: 95
    },
    {
      axis: '問題の見いだし・批判的検討',
      shortLabel: '問題の見いだし',
      category: '総合的な発揮',
      description: '表面的な単一の数値や思い込みでは不十分であることに自ら気付き、探究の問いを立てる力。',
      childA: 30,
      childB: 45,
      childC: 90,
      initial: 30,
      midIntegrated: 60,
      finalHolistic: 92
    },
    {
      axis: '方法の自律的選択',
      shortLabel: '方法の自律選択',
      category: '総合的な発揮',
      description: '教師が「この方法で解きなさい」と指示しなくても、目的に応じて最適な解法・見方を自ら選ぶ力。',
      childA: 15,
      childB: 40,
      childC: 95,
      initial: 20,
      midIntegrated: 50,
      finalHolistic: 95
    },
    {
      axis: '現実文脈への適用・判断',
      shortLabel: '現実への判断',
      category: '総合的な発揮',
      description: '求めた計算結果や導いた結論を、現実の問題文脈や生活の文脈に戻して批判的・多角的に判断する力。',
      childA: 20,
      childB: 45,
      childC: 95,
      initial: 20,
      midIntegrated: 55,
      finalHolistic: 95
    }
  ];

  // Chart data format
  const chartData = metrics.map((m, idx) => ({
    axis: m.shortLabel,
    fullName: m.axis,
    category: m.category,
    childA: m.childA,
    childB: m.childB,
    childC: m.childC,
    initial: m.initial,
    midIntegrated: m.midIntegrated,
    finalHolistic: m.finalHolistic,
    custom: customScores[idx]
  }));

  const resetCustomScores = () => {
    setCustomScores([70, 65, 80, 60, 75, 85]);
  };

  const currentMetric = metrics[activeMetricIdx];

  // Custom tooltip for recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 text-white p-3 rounded-lg shadow-lg text-xs space-y-1.5 border border-slate-700 min-w-[180px]">
          <div className="font-bold border-b border-slate-700 pb-1 text-slate-200">
            {data.fullName}
          </div>
          <div className="text-[10px] text-slate-400">領域: {data.category}</div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center gap-3">
              <span style={{ color: entry.color }} className="font-medium">
                {entry.name}:
              </span>
              <span className="font-mono font-bold">{entry.value}点</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded">
              指導と評価の一体化支援
            </span>
            <span className="text-xs text-slate-500 font-mono">
              レーダーチャート分析
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            単元評価・変容分析ダッシュボード：{unit.unitName}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            「統合的な理解」から「総合的な発揮」へ至る生徒の認知の変容（Shift in Student Understanding）を多角的に可視化します。
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold shrink-0">
          <button
            onClick={() => setViewMode('comparison')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              viewMode === 'comparison'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3人の児童比較（A/B/C）
          </button>
          <button
            onClick={() => setViewMode('progression')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              viewMode === 'progression'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            単元の時間的変容（導入→終末）
          </button>
          <button
            onClick={() => setViewMode('interactive')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              viewMode === 'interactive'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            自クラス診断・調整
          </button>
        </div>
      </div>

      {/* Main Grid: Radar Chart + Metric Inspection Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Radar Chart Visual Stage (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                {viewMode === 'comparison' && '児童A・B・Cの資質・能力バランス比較'}
                {viewMode === 'progression' && '単元の学びの深まり（導入期 → 展開期 → 終末期）'}
                {viewMode === 'interactive' && '自クラスの児童見取りシミュレーション'}
              </h4>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">100点満点基準</span>
          </div>

          {/* Recharts Radar Canvas */}
          <div className="w-full h-[360px] sm:h-[400px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  stroke="#94a3b8"
                  tick={{ fontSize: 10 }}
                />
                <Tooltip content={<CustomTooltip />} />

                {viewMode === 'comparison' && (
                  <>
                    <Radar
                      name="児童A（一つの数量のみ）"
                      dataKey="childA"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.25}
                    />
                    <Radar
                      name="児童B（個別の知識・技能）"
                      dataKey="childB"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.25}
                    />
                    <Radar
                      name="児童C（総合的な発揮）"
                      dataKey="childC"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.35}
                    />
                  </>
                )}

                {viewMode === 'progression' && (
                  <>
                    <Radar
                      name="導入期（素朴概念）"
                      dataKey="initial"
                      stroke="#94a3b8"
                      fill="#94a3b8"
                      fillOpacity={0.2}
                    />
                    <Radar
                      name="展開期（統合的な理解）"
                      dataKey="midIntegrated"
                      stroke="#0284c7"
                      fill="#0284c7"
                      fillOpacity={0.3}
                    />
                    <Radar
                      name="終末期（総合的な発揮）"
                      dataKey="finalHolistic"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.4}
                    />
                  </>
                )}

                {viewMode === 'interactive' && (
                  <>
                    <Radar
                      name="目指す姿（総合的な発揮 基準）"
                      dataKey="childC"
                      stroke="#cbd5e1"
                      fill="#cbd5e1"
                      fillOpacity={0.15}
                      strokeDasharray="4 4"
                    />
                    <Radar
                      name="現在の見取りスコア"
                      dataKey="custom"
                      stroke="#6366f1"
                      fill="#6366f1"
                      fillOpacity={0.4}
                    />
                  </>
                )}

                <Legend
                  wrapperStyle={{ paddingTop: '10px', fontSize: '12px' }}
                  iconType="circle"
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Interpretation Caption */}
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
            <Compass className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              {viewMode === 'comparison' && (
                <span>
                  <strong>チャートの解釈：</strong>
                  児童B（青）は知識・技能が高いものの、「問題の見いだし」「解法の自律的選択」「現実への判断」という総合的な発揮の軸で凹みが見られます。
                  児童C（緑）のように6軸すべてが大きく膨らむことで、学んだ知識が社会や生活で生きて働く力となります。
                </span>
              )}
              {viewMode === 'progression' && (
                <span>
                  <strong>変容のプロセス：</strong>
                  単元前半（灰）から中盤（青）で「統合的な理解（場面往還・関係統合）」が急伸し、
                  単元終末（緑）の未指定課題で「総合的な発揮（自律選択・現実判断）」が完成するダイナミックな変容が確認できます。
                </span>
              )}
              {viewMode === 'interactive' && (
                <span>
                  <strong>診断モード：</strong>
                  右パネルのスライダーを動かして、担当クラスや特定グループの児童の現在の状態を設定し、
                  どの評価軸（統合 vs 発揮）に支援の手立てが必要かを分析できます。
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Deck: 6 Metrics Selector & Deep Inspection (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Axis Selector Buttons */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                6つの評価軸（クリックで詳細確認）
              </h5>
              <span className="text-[10px] text-slate-400">文科省観点対応</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {metrics.map((m, idx) => {
                const isSelected = activeMetricIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveMetricIdx(idx)}
                    className={`p-2.5 rounded-lg text-left text-xs transition-all border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-950 font-bold ring-1 ring-indigo-200 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] mb-1">
                      <span className={`px-1.5 py-0.2 rounded font-medium ${
                        m.category === '統合的な理解'
                          ? 'bg-sky-100 text-sky-800'
                          : m.category === '総合的な発揮'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {m.category}
                      </span>
                      <span className="font-mono text-slate-500">#{idx + 1}</span>
                    </div>
                    <div className="truncate font-semibold">{m.shortLabel}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Metric Detail Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4.5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 block">
                  軸 #{activeMetricIdx + 1} 評価基準の解説
                </span>
                <h4 className="font-bold text-slate-900 text-sm">
                  {currentMetric.axis}
                </h4>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-100 text-slate-700">
                {currentMetric.category}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {currentMetric.description}
            </p>

            {/* Score Comparison Bars */}
            <div className="space-y-2 pt-1 border-t border-slate-100 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-500" /> 児童A（一つの数量のみ）:
                </span>
                <span className="font-mono font-bold text-amber-700">{currentMetric.childA} 点</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full" style={{ width: `${currentMetric.childA}%` }} />
              </div>

              <div className="flex justify-between items-center text-slate-600 pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-500" /> 児童B（個別の知識・技能）:
                </span>
                <span className="font-mono font-bold text-blue-700">{currentMetric.childB} 点</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: `${currentMetric.childB}%` }} />
              </div>

              <div className="flex justify-between items-center text-slate-600 pt-1">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> 児童C（総合的な発揮）:
                </span>
                <span className="font-mono font-bold text-emerald-700">{currentMetric.childC} 点</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${currentMetric.childC}%` }} />
              </div>
            </div>

            {/* Teacher Guidance for this metric */}
            <div className="bg-indigo-50/70 p-3 rounded-lg border border-indigo-100 text-xs text-indigo-950 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                この軸を高める教師の指導援助：
              </div>
              <p className="leading-relaxed text-[11px] text-slate-700">
                {currentMetric.category === '統合的な理解'
                  ? '「計算手続きを急がせず、前の単元や別場面との『似ているところ』を子供たちに言葉や図で往還させる声かけ」が有効です。'
                  : currentMetric.category === '総合的な発揮'
                  ? '「教師が解法（例: 割合を使って比べなさい）を指定せず、不揃いな条件を提示して子供自ら『何と何を比べるか』を見いださせる課題設定」が鍵となります。'
                  : '基礎・基本の知識をしっかり定着させつつ、暗記にとどまらない意味理解を伴わせます。'}
              </p>
            </div>
          </div>

          {/* Interactive Custom Sliders if in interactive mode */}
          {viewMode === 'interactive' && (
            <div className="bg-white rounded-xl border border-indigo-200 p-4.5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-indigo-600" />
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                    スコア調整スライダー
                  </h5>
                </div>
                <button
                  onClick={resetCustomScores}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> リセット
                </button>
              </div>

              <div className="space-y-3">
                {metrics.map((m, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>{m.shortLabel}</span>
                      <span className="font-mono font-bold text-indigo-600">
                        {customScores[idx]}点
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={customScores[idx]}
                      onChange={(e) => {
                        const newScores = [...customScores];
                        newScores[idx] = Number(e.target.value);
                        setCustomScores(newScores);
                      }}
                      className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Class Level Assessment & Transformation Forecast */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              学級全体の分布見取りと、次期指導要領が目指す「育ちの姿」
            </h4>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            児童3タイプの変容予測
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Child A Group */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded">
                児童Aタイプ（単一数量で判断）
              </span>
              <span className="text-xs font-mono font-bold text-amber-700">{ratioA}%</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              目に見える単一の数値（人数など）だけで直感的に判断してしまう状態。
            </p>
            <div className="pt-2 border-t border-amber-200/60 text-[11px] text-amber-900">
              <strong>指導の手立て：</strong>
              「もしクラスの人数が違ったら、人数だけで比べて公平かな？」と揺さぶり、関係に着目させる。
            </div>
          </div>

          {/* Child B Group */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                児童Bタイプ（個別知識の適用）
              </span>
              <span className="text-xs font-mono font-bold text-blue-700">{ratioB}%</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              公式や計算（割合など）は使えるが、機械的な計算で終わってしまう状態。
            </p>
            <div className="pt-2 border-t border-blue-200/60 text-[11px] text-blue-900">
              <strong>指導の手立て：</strong>
              「計算して出た44%という数字は、元の疑問（2組はよくない？）に対してどう言えるかな？」と現実の問題に戻させる。
            </div>
          </div>

          {/* Child C Group */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                児童Cタイプ（総合的な発揮）
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">{ratioC}%</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              二つの数量の関係に着目し、自ら比べ方を選び、現実の問題に戻して批判的・多角的に判断できる状態。
            </p>
            <div className="pt-2 border-t border-emerald-200/60 text-[11px] text-emerald-900">
              <strong>目指すゴール：</strong>
              この児童Cの姿を学級全体で共有・称賛し、他の子供たちの思考のモデルとします。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
