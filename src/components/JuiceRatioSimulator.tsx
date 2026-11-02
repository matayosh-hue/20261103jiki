import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

export const JuiceRatioSimulator: React.FC = () => {
  // Orange Juice A
  const [juiceA, setJuiceA] = useState<number>(200);
  const [waterA, setWaterA] = useState<number>(300);

  // Orange Juice B
  const [juiceB, setJuiceB] = useState<number>(300);
  const [waterB, setWaterB] = useState<number>(500);

  // Active view tab in simulator
  const [simMode, setSimMode] = useState<'juice' | 'classroom' | 'ratio'>('juice');

  // Classroom state
  const [areaA] = useState<number>(60);
  const [peopleA] = useState<number>(30);
  const [areaB] = useState<number>(60);
  const [peopleB] = useState<number>(36);

  // Calculations for Juice
  const totalA = juiceA + waterA;
  const totalB = juiceB + waterB;
  const ratioA = totalA > 0 ? (juiceA / totalA) : 0;
  const ratioB = totalB > 0 ? (juiceB / totalB) : 0;
  const percentA = (ratioA * 100).toFixed(1);
  const percentB = (ratioB * 100).toFixed(1);

  // Calculations for Classroom
  const densityA = (peopleA / areaA).toFixed(2);
  const densityB = (peopleB / areaB).toFixed(2);

  const resetDefaults = () => {
    setJuiceA(200);
    setWaterA(300);
    setJuiceB(300);
    setWaterB(500);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6">
      {/* Simulator Mode Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          <h4 className="text-base font-semibold text-slate-800">
            統合的な理解を体感するインタラクティブ実験室
          </h4>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium text-slate-600">
          <button
            onClick={() => setSimMode('juice')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              simMode === 'juice' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'hover:text-slate-900'
            }`}
          >
            場面1：どちらが濃い？（ジュース）
          </button>
          <button
            onClick={() => setSimMode('classroom')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              simMode === 'classroom' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'hover:text-slate-900'
            }`}
          >
            場面2：混み具合（単位量当たり）
          </button>
          <button
            onClick={() => setSimMode('ratio')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              simMode === 'ratio' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'hover:text-slate-900'
            }`}
          >
            場面3：同じ味？（比の等しさ）
          </button>
        </div>
      </div>

      {simMode === 'juice' && (
        <div className="space-y-6">
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-900">問いの場面：</span>
              Aのジュースは果汁{juiceA}mL＋水{waterA}mL、Bのジュースは果汁{juiceB}mL＋水{waterB}mL。
              「果汁の量はB（{juiceB}mL）の方が多いけれど、どちらがオレンジの味が濃いだろう？」
            </div>
          </div>

          {/* Glasses Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Glass A */}
            <div className={`p-4 rounded-xl border transition-all ${
              ratioA > ratioB ? 'bg-orange-50/50 border-orange-300 ring-2 ring-orange-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-800 text-lg">グラス A</span>
                {ratioA > ratioB && (
                  <span className="text-xs font-semibold px-2 py-0.5 bg-orange-600 text-white rounded">
                    ★ こちらが濃い！
                  </span>
                )}
              </div>

              {/* Graphic Glass */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-24 h-36 border-2 border-slate-400 border-t-0 rounded-b-xl overflow-hidden bg-slate-100 flex flex-col justify-end shadow-inner">
                  <div
                    className="w-full transition-all duration-300"
                    style={{
                      height: `${Math.min(100, (totalA / 900) * 100)}%`,
                      backgroundColor: `rgba(249, 115, 22, ${Math.max(0.25, Math.min(0.95, ratioA * 1.8))})`,
                    }}
                  />
                  <div className="absolute top-2 left-0 right-0 text-center text-[10px] text-slate-500 font-mono">
                    計 {totalA}mL
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>オレンジ果汁:</span>
                    <span className="font-mono font-bold text-orange-600">{juiceA} mL</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>水:</span>
                    <span className="font-mono font-bold text-sky-600">{waterA} mL</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <span className="font-semibold text-slate-700">全体に対する果汁割合:</span>
                    <span className="font-mono font-bold text-base text-slate-900">{percentA}%</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    式: {juiceA} ÷ ({juiceA} + {waterA}) = {ratioA.toFixed(3)}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3 pt-3 border-t border-slate-200/60">
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>果汁の量</span>
                    <span className="font-mono">{juiceA} mL</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="50"
                    value={juiceA}
                    onChange={(e) => setJuiceA(Number(e.target.value))}
                    className="w-full accent-orange-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>水の量</span>
                    <span className="font-mono">{waterA} mL</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="600"
                    step="50"
                    value={waterA}
                    onChange={(e) => setWaterA(Number(e.target.value))}
                    className="w-full accent-sky-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Glass B */}
            <div className={`p-4 rounded-xl border transition-all ${
              ratioB > ratioA ? 'bg-orange-50/50 border-orange-300 ring-2 ring-orange-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-800 text-lg">グラス B</span>
                {ratioB > ratioA && (
                  <span className="text-xs font-semibold px-2 py-0.5 bg-orange-600 text-white rounded">
                    ★ こちらが濃い！
                  </span>
                )}
              </div>

              {/* Graphic Glass */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-24 h-36 border-2 border-slate-400 border-t-0 rounded-b-xl overflow-hidden bg-slate-100 flex flex-col justify-end shadow-inner">
                  <div
                    className="w-full transition-all duration-300"
                    style={{
                      height: `${Math.min(100, (totalB / 900) * 100)}%`,
                      backgroundColor: `rgba(249, 115, 22, ${Math.max(0.25, Math.min(0.95, ratioB * 1.8))})`,
                    }}
                  />
                  <div className="absolute top-2 left-0 right-0 text-center text-[10px] text-slate-500 font-mono">
                    計 {totalB}mL
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>オレンジ果汁:</span>
                    <span className="font-mono font-bold text-orange-600">{juiceB} mL</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>水:</span>
                    <span className="font-mono font-bold text-sky-600">{waterB} mL</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                    <span className="font-semibold text-slate-700">全体に対する果汁割合:</span>
                    <span className="font-mono font-bold text-base text-slate-900">{percentB}%</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    式: {juiceB} ÷ ({juiceB} + {waterB}) = {ratioB.toFixed(3)}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-3 pt-3 border-t border-slate-200/60">
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>果汁の量</span>
                    <span className="font-mono">{juiceB} mL</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="50"
                    value={juiceB}
                    onChange={(e) => setJuiceB(Number(e.target.value))}
                    className="w-full accent-orange-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs text-slate-600 mb-1">
                    <span>水の量</span>
                    <span className="font-mono">{waterB} mL</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="600"
                    step="50"
                    value={waterB}
                    onChange={(e) => setWaterB(Number(e.target.value))}
                    className="w-full accent-sky-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={resetDefaults}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> 資料の初期値（A: 200/300, B: 300/500）に戻す
            </button>
            <div className="text-xs text-slate-600 font-medium">
              果汁の量だけでなく「果汁と全体（または水）の関係」を見なければ比較できない！
            </div>
          </div>
        </div>
      )}

      {simMode === 'classroom' && (
        <div className="space-y-5">
          <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3.5 text-xs sm:text-sm text-slate-700">
            <span className="font-semibold text-blue-900">場面2：教室の混み具合（単位量当たりの大きさ）</span>
            <p className="mt-1">
              広さが同じでも人数が違う場合、あるいは広さも人数も違う場合、「1㎡当たりの人数」という二つの数量の関係（単位量当たり）を求めることで、公平に混み具合を比較できます。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <h5 className="font-semibold text-slate-800 mb-2">A 教室（60㎡ に 30人）</h5>
              <div className="text-xs space-y-1 text-slate-600 font-mono">
                <div>面積: {areaA} ㎡</div>
                <div>人数: {peopleA} 人</div>
                <div className="pt-2 text-sm font-bold text-slate-900">
                  1㎡当たり: 30 ÷ 60 = <span className="text-blue-600">{densityA} 人/㎡</span>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <h5 className="font-semibold text-slate-800 mb-2">B 教室（60㎡ に 36人）</h5>
              <div className="text-xs space-y-1 text-slate-600 font-mono">
                <div>面積: {areaB} ㎡</div>
                <div>人数: {peopleB} 人</div>
                <div className="pt-2 text-sm font-bold text-slate-900">
                  1㎡当たり: 36 ÷ 60 = <span className="text-blue-600">{densityB} 人/㎡</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-xs text-slate-700">
            <span className="font-bold text-amber-900">つながりの発見：</span>
            ジュースの「全体に対する果汁の割合（0.4）」も、教室の「1㎡当たりの人数（0.5人/㎡）」も、
            <strong>『2つの数量をひとまとめにした1つの数』</strong>を作って比べている共通点があります！
          </div>
        </div>
      )}

      {simMode === 'ratio' && (
        <div className="space-y-5">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 text-xs sm:text-sm text-slate-700">
            <span className="font-semibold text-emerald-900">場面3：同じ味のジュース？（比の等しさ）</span>
            <p className="mt-1">
              果汁2と水3で作ったジュース（2 : 3）と、果汁4と水6で作ったジュース（4 : 6）。
              分量全体の多さは違っても、比の値（2÷3 = 0.666...、4÷6 = 0.666...）が等しいため、同じ味の濃さになります。
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-lg bg-slate-50 flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
            <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="text-xs text-slate-500 font-medium">ジュース A</div>
              <div className="text-lg font-bold text-slate-800 mt-1">果汁 2 : 水 3</div>
              <div className="text-xs text-emerald-700 font-mono mt-1">比の値: 2/3 (0.67)</div>
            </div>

            <div className="text-slate-400 font-bold flex items-center gap-1">
              <span className="text-xs text-slate-500 font-sans">両方に×2</span>
              <ArrowRight className="w-5 h-5 text-emerald-600" />
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
              <div className="text-xs text-slate-500 font-medium">ジュース B</div>
              <div className="text-lg font-bold text-slate-800 mt-1">果汁 4 : 水 6</div>
              <div className="text-xs text-emerald-700 font-mono mt-1">比の値: 4/6 = 2/3 (0.67)</div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-slate-700">
            <span className="font-bold text-emerald-900">統合のゴール：</span>
            「割合」「単位量当たりの大きさ」「比」の3つが、それぞれ別個の計算単元ではなく、
            <strong>『2つの数量の関係を表すツール』</strong>として頭の中で1本の線につながります。
          </div>
        </div>
      )}
    </div>
  );
};
