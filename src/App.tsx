import React, { useState } from 'react';
import { PRESET_UNITS, UnitData } from './data/curriculumData';
import { JuiceRatioSimulator } from './components/JuiceRatioSimulator';
import { HolisticComparisonView } from './components/HolisticComparisonView';
import { OfficialMaterialsModal } from './components/OfficialMaterialsModal';
import { AiUnitPlannerModal } from './components/AiUnitPlannerModal';
import { PrintableLessonPlan } from './components/PrintableLessonPlan';
import { UnitEvaluationDashboard } from './components/UnitEvaluationDashboard';
import { UnifiedCyclePdfReport } from './components/UnifiedCyclePdfReport';
import { StudentReflectionWorksheet } from './components/StudentReflectionWorksheet';
import { ShareQrModal } from './components/ShareQrModal';
import {
  BookOpen,
  Sparkles,
  Layers,
  ArrowLeftRight,
  HelpCircle,
  FileText,
  Printer,
  ChevronRight,
  GraduationCap,
  MessageSquare,
  Award,
  Compass,
  Lightbulb,
  CheckCircle2,
  ListFilter,
  Plus,
  BarChart3,
  PenTool,
  QrCode
} from 'lucide-react';

export default function App() {
  const [units, setUnits] = useState<UnitData[]>(PRESET_UNITS);
  const [selectedUnitId, setSelectedUnitId] = useState<string>(PRESET_UNITS[0].id);

  // Filters
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');

  // Main Active Tab for Detail View
  const [activeTab, setActiveTab] = useState<'cycle' | 'integrated' | 'holistic' | 'teacher' | 'dashboard'>('cycle');

  // Modals
  const [isOfficialModalOpen, setIsOfficialModalOpen] = useState<boolean>(false);
  const [initialMaterialIdx, setInitialMaterialIdx] = useState<number>(0);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [isCyclePdfOpen, setIsCyclePdfOpen] = useState<boolean>(false);
  const [isStudentWorksheetOpen, setIsStudentWorksheetOpen] = useState<boolean>(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);

  // Active Selected Unit
  const currentUnit = units.find((u) => u.id === selectedUnitId) || units[0];

  // Deep linking: read ?unit= from URL on load
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const unitParam = params.get('unit');
      if (unitParam && units.some((u) => u.id === unitParam)) {
        setSelectedUnitId(unitParam);
      }
    }
  }, [units]);

  // Filtered unit list
  const filteredUnits = units.filter((u) => {
    const matchSubject = subjectFilter === 'all' || u.subject === subjectFilter;
    const matchGrade = gradeFilter === 'all' || u.grade.toString() === gradeFilter;
    return matchSubject && matchGrade;
  });

  const handleUnitGenerated = (newUnit: UnitData) => {
    setUnits((prev) => [newUnit, ...prev]);
    setSelectedUnitId(newUnit.id);
    setActiveTab('cycle');
  };

  const openMaterialAtIndex = (idx: number) => {
    setInitialMaterialIdx(idx);
    setIsOfficialModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* =========================================================================
          TOP BAR CONTRACT (1-Line Wordmark, Nav Links, 1 Primary Action)
      ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8 no-print">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            要領
          </div>
          <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
            次期指導要領 統合的理解・総合的発揮ナビ
          </span>
        </div>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('cycle')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'cycle' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            二つの一体化マップ
          </button>
          <button
            onClick={() => setActiveTab('integrated')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'integrated' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            統合的な理解の場面
          </button>
          <button
            onClick={() => setActiveTab('holistic')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'holistic' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            総合的な発揮の場面
          </button>
          <button
            onClick={() => setActiveTab('teacher')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'teacher' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            指導・発問の手引き
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`transition-colors whitespace-nowrap ${
              activeTab === 'dashboard' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            単元評価・分析ダッシュボード
          </button>
          <button
            onClick={() => openMaterialAtIndex(0)}
            className="text-slate-600 hover:text-indigo-600 transition-colors whitespace-nowrap flex items-center gap-1 font-medium"
          >
            <FileText className="w-4 h-4 text-slate-500" /> 原典資料 (7枚)
          </button>
        </nav>

        {/* Zone 3: Primary Action buttons */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title="単元構想シートを印刷またはPDF保存"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">構想シート</span>印刷
          </button>
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>自校の単元をAI生成</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Banner with Official Reference Note */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                文部科学省・中教審検討資料フレームワーク完全準拠
              </span>
              <span className="text-xs text-slate-500">
                小学校各教科・全学年対応
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              「知識がつながる（統合的な理解）」×「自分で判断に生かす（総合的な発揮）」
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              単元ごとに、子供のつぶやき・3つの往還場面・3人の子供の思考比較（児童A/B/C）・思考の5ステップ・指導の急所を具体化します。
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openMaterialAtIndex(0)}
              className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-200/80"
            >
              <FileText className="w-4 h-4 text-slate-600" />
              検討資料ギャラリー
            </button>
          </div>
        </div>

        {/* =========================================================================
            SUBJECT & GRADE SELECTOR (Interactive Filter Bar)
        ========================================================================= */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Subject Filter (Segmented control) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
              {[
                { key: 'all', label: '全教科' },
                { key: '算数', label: '算数' },
                { key: '理科', label: '理科' },
                { key: '社会', label: '社会' },
                { key: '国語', label: '国語' },
                { key: '生活', label: '生活' },
              ].map((subj) => (
                <button
                  key={subj.key}
                  onClick={() => setSubjectFilter(subj.key)}
                  className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                    subjectFilter === subj.key
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {subj.label}
                </button>
              ))}
            </div>

            {/* Grade Filter (Segmented control) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-medium">
              {[
                { key: 'all', label: '全学年' },
                { key: '2', label: '2年' },
                { key: '3', label: '3年' },
                { key: '4', label: '4年' },
                { key: '5', label: '5年' },
                { key: '6', label: '6年' },
              ].map((gr) => (
                <button
                  key={gr.key}
                  onClick={() => setGradeFilter(gr.key)}
                  className={`px-2.5 py-1.5 rounded-md transition-all whitespace-nowrap ${
                    gradeFilter === gr.key
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {gr.label}
                </button>
              ))}
            </div>
          </div>

          {/* Unit selection cards strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {filteredUnits.map((u) => {
              const isSelected = u.id === selectedUnitId;
              return (
                <button
                  key={u.id}
                  onClick={() => setSelectedUnitId(u.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-50/70 border-indigo-400 ring-2 ring-indigo-200 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-700">{u.subject}</span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{u.gradeLabel}</span>
                      </div>
                      {u.isOfficialDocumentCase && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
                          ★資料掲載
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {u.unitName}
                    </div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      {u.subtitle}
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
                    <span className="truncate max-w-[160px]">{u.domain}</span>
                    {isSelected && <ChevronRight className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                </button>
              );
            })}

            {/* Custom Unit Add Card */}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="p-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/30 text-slate-600 hover:text-indigo-600 transition-all flex flex-col items-center justify-center text-center gap-1 min-h-[90px]"
            >
              <Plus className="w-5 h-5 text-indigo-500" />
              <span className="text-xs font-semibold">自校の単元を追加・AI設計</span>
              <span className="text-[10px] text-slate-400">他学年や地域教材にも対応</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            SELECTED UNIT HEADER & VIEW TABS
        ========================================================================= */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs font-bold rounded">
                  {currentUnit.subject}
                </span>
                <span className="text-xs font-semibold text-slate-600">
                  {currentUnit.gradeLabel} ｜ 領域: {currentUnit.domain}
                </span>
                {currentUnit.isOfficialDocumentCase && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200 rounded">
                    ★ 中教審検討資料の事例
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsStudentWorksheetOpen(true)}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                  title="児童が統合的理解と総合的発揮を振り返るA4ワークシートを出力"
                >
                  <PenTool className="w-3.5 h-3.5 text-emerald-600" />
                  <span>児童用ふり返りシート</span>
                </button>
                <button
                  onClick={() => setIsCyclePdfOpen(true)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="校内研修用の二つの一体化マップPDFレポートを出力"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-600" />
                  <span>一体化マップPDF</span>
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(true)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  title="教員用単元構想シートをA4出力"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-500" />
                  <span>指導案シート</span>
                </button>
                <button
                  onClick={() => setIsQrModalOpen(true)}
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  title="この単元のQRコード・共有リンクを表示"
                >
                  <QrCode className="w-3.5 h-3.5 text-indigo-600" />
                  <span>QR共有</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {currentUnit.unitName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  {currentUnit.subtitle}
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-3 lg:max-w-md text-xs">
                <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-0.5">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  働かせる見方・考え方
                </div>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {currentUnit.perspective}
                </p>
              </div>
            </div>

            {/* View Mode Tabs (Segmented) */}
            <div className="flex flex-wrap items-center gap-1 mt-5 pt-3 border-t border-slate-100">
              {[
                { id: 'cycle', label: '二つの一体化マップ', icon: ArrowLeftRight },
                { id: 'integrated', label: '1. 統合的な理解の場面', icon: Layers },
                { id: 'holistic', label: '2. 総合的な発揮の場面', icon: Lightbulb },
                { id: 'teacher', label: '3. 指導・発問・評価の手引き', icon: GraduationCap },
                { id: 'dashboard', label: '4. 単元評価・分析ダッシュボード', icon: BarChart3 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              TAB CONTENT 1: 二つの一体化マップ（全体構造・循環サイクル）
          ========================================================================= */}
          {activeTab === 'cycle' && (
            <div className="space-y-6">
              {/* Dual Integration Framework Diagram */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-bold text-indigo-600 tracking-wider">
                      次期学習指導要領 中核コンセプト
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                      「統合的な理解」と「総合的な発揮」の往還サイクル
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      使うことで理解が深まり、理解が次の活用を支える。順番は固定ではなく行きつ戻りつしながら深まります。
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCyclePdfOpen(true)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 shrink-0"
                    title="職員室での研修・指導案検討会用のPDFレポートを出力"
                  >
                    <FileText className="w-4 h-4" />
                    <span>一体化マップをPDF出力（校内研修用）</span>
                  </button>
                </div>

                {/* 3-Column Visual Flow */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                  {/* Left: 統合的な理解 */}
                  <div className="lg:col-span-5 bg-sky-50/70 border-2 border-sky-200 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 bg-sky-600 text-white text-xs font-bold rounded">
                          【統合的な理解】
                        </span>
                        <span className="text-xs text-sky-800 font-mono">つながる</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">
                        学んできた知識がつながって見える状態
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed mb-4">
                        {currentUnit.integratedUnderstanding.definition}
                      </p>

                      <div className="bg-white p-3 rounded-lg border border-sky-100 text-xs space-y-1.5 shadow-2xs">
                        <div className="font-semibold text-sky-900 text-[11px]">
                          本単元で往還する場面・知識：
                        </div>
                        {currentUnit.integratedUnderstanding.scenes.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                            <span>{s.badge}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-sky-200/80">
                      <button
                        onClick={() => setActiveTab('integrated')}
                        className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1"
                      >
                        具体的な3場面とシミュレーターを見る <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Middle: 二つが一体となった子供の姿 */}
                  <div className="lg:col-span-2 bg-amber-50/80 border-2 border-amber-300 rounded-xl p-4 flex flex-col justify-between items-center text-center">
                    <div className="w-full">
                      <span className="text-[11px] font-bold px-2 py-0.5 bg-amber-500 text-white rounded block mb-2">
                        二つが一体となった子供の姿
                      </span>
                      <p className="text-xs font-medium text-slate-800 leading-snug">
                        {currentUnit.unifiedCycle.coreMessage}
                      </p>
                    </div>

                    {/* Bi-directional Interactive Arrows */}
                    <div className="my-4 py-2 w-full flex flex-col items-center gap-2 bg-white/80 rounded-lg p-2 border border-amber-200">
                      <div className="text-[10px] font-bold text-sky-800 flex items-center gap-1">
                        理解が活用を支える <ChevronRight className="w-3 h-3" />
                      </div>
                      <div className="w-full h-0.5 bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400" />
                      <div className="text-[10px] font-bold text-emerald-800 flex items-center gap-1">
                        活用で理解が深まる <ChevronRight className="w-3 h-3 rotate-180" />
                      </div>
                    </div>

                    <div className="text-[11px] text-amber-900 font-semibold">
                      行きつ戻りつの学び
                    </div>
                  </div>

                  {/* Right: 総合的な発揮 */}
                  <div className="lg:col-span-5 bg-emerald-50/70 border-2 border-emerald-200 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 bg-emerald-600 text-white text-xs font-bold rounded">
                          【総合的な発揮】
                        </span>
                        <span className="text-xs text-emerald-800 font-mono">生かす</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mb-2">
                        身に付けた考え方を、新しい場面で自分で働かせる状態
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed mb-4">
                        {currentUnit.holisticApplication.definition}
                      </p>

                      <div className="bg-white p-3 rounded-lg border border-emerald-100 text-xs space-y-1.5 shadow-2xs">
                        <div className="font-semibold text-emerald-900 text-[11px]">
                          総合的な発揮の思考プロセス（5ステップ）：
                        </div>
                        <div className="text-slate-600 text-[11px] space-y-0.5">
                          <div>① 見いだす → ② 限界に気付く</div>
                          <div>③ 関係として捉える → ④ 方法を選択</div>
                          <div>⑤ 現実の問題に戻して判断する</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-emerald-200/80">
                      <button
                        onClick={() => setActiveTab('holistic')}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                      >
                        3人の子供の思考比較と課題を見る <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Practical Outcome Card */}
                <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 flex items-start gap-3">
                  <Award className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">
                      日常生活・これからの社会でどう生きて働く力になるか：
                    </span>
                    <p className="mt-0.5 text-slate-600">{currentUnit.unifiedCycle.practicalOutcome}</p>
                  </div>
                </div>
              </div>

              {/* Official Material Image Preview Strip (if available) */}
              {currentUnit.officialMaterialImages && currentUnit.officialMaterialImages.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <h4 className="text-sm font-bold text-slate-900">
                        文科省検討資料の該当スライド
                      </h4>
                    </div>
                    <button
                      onClick={() => openMaterialAtIndex(0)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      全7枚をギャラリーで見る →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {currentUnit.officialMaterialImages.slice(0, 4).map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => openMaterialAtIndex(idx)}
                        className="cursor-pointer group rounded-lg overflow-hidden border border-slate-200 bg-slate-50 hover:border-indigo-400 transition-all"
                      >
                        <img
                          src={img.filename}
                          alt={img.caption}
                          className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="p-2 text-[10px] text-slate-600 font-medium truncate">
                          {img.caption}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB CONTENT 2: 1. 統合的な理解が見られる場面
          ========================================================================= */}
          {activeTab === 'integrated' && (
            <div className="space-y-6">
              {/* Children's Utterance Speech Bubble Banner */}
              <div className="bg-gradient-to-r from-sky-50 via-indigo-50 to-white border border-sky-200 rounded-xl p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-sky-600" />
                  <span className="text-xs font-bold text-sky-900">
                    気付いた子供のつぶやき（= 統合的な理解の姿）
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-sky-200 shadow-inner">
                  <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                    {currentUnit.integratedUnderstanding.childrenUtterance}
                  </p>
                </div>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {currentUnit.integratedUnderstanding.keyTakeaway}
                </p>
              </div>

              {/* Interactive Simulator if available (like Juice Ratio for math) */}
              {currentUnit.integratedUnderstanding.interactiveType === 'juice_ratio' && (
                <JuiceRatioSimulator />
              )}

              {/* 3 Scenes Cards */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-sky-600" />
                  統合を促す 往還的な3つの場面・表現
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentUnit.integratedUnderstanding.scenes.map((scene, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold px-2 py-0.5 bg-sky-100 text-sky-800 rounded">
                            {scene.badge}
                          </span>
                          <span className="text-xs font-mono text-slate-400">
                            場面 {idx + 1}
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 text-sm mb-2">
                          {scene.title}
                        </h5>
                        <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                          {scene.context}
                        </p>

                        {scene.calculation && (
                          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 whitespace-pre-wrap mb-3">
                            {scene.calculation}
                          </div>
                        )}
                      </div>

                      <div className="pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700 block mb-0.5">
                          ここで働く個別の知識・技能:
                        </span>
                        {scene.knowledgeUsed}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary note */}
              <div className="bg-slate-100/80 rounded-xl p-4 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong>先生方へのポイント：</strong>
                  それぞれの場面で教えた知識を孤立させず、授業の振り返りや発問で
                  「今日のジュースの比べ方と、前回の混み具合の比べ方、どこか似ているところはないかな？」
                  と問いかけ、児童自身の言葉で共通点（二つの数量の関係）を言語化させることが重要です。
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB CONTENT 3: 2. 総合的な発揮が見られる場面
          ========================================================================= */}
          {activeTab === 'holistic' && (
            <HolisticComparisonView unit={currentUnit} />
          )}

          {/* =========================================================================
              TAB CONTENT 4: 3. 指導・発問・評価の手引き
          ========================================================================= */}
          {activeTab === 'teacher' && (
            <div className="space-y-6">
              {/* Teacher Advice Cards */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <GraduationCap className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    先生方へ 〜授業改善と単元デザインの急所〜
                  </h3>
                </div>

                {/* 4 Core Points from MEXT Document */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentUnit.teacherAdvice.keyPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Questioning Examples */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-amber-500" />
                    思考を深める「教師の揺さぶりの問い・発問例」
                  </h4>
                  <div className="space-y-2">
                    {currentUnit.teacherAdvice.questioningExamples.map((q, idx) => (
                      <div
                        key={idx}
                        className="bg-amber-50/70 border border-amber-200/80 p-3 rounded-lg text-xs sm:text-sm text-amber-950 font-medium flex items-center gap-2"
                      >
                        <span className="font-bold text-amber-600 text-xs">発問{idx + 1}</span>
                        <span>{q}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assessment Rubric (A/B/C) */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    見取りと評価の具体規準（児童の姿の観点）
                  </h4>

                  <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                    <div className="p-3 bg-emerald-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                          A
                        </span>
                        十分満足できる状況（総合的な発揮の姿）
                      </div>
                      <span className="text-[11px] text-emerald-800">児童Cの姿</span>
                    </div>
                    <div className="p-3.5 bg-white text-slate-700 leading-relaxed">
                      {currentUnit.teacherAdvice.assessmentFocus.levelA}
                    </div>

                    <div className="p-3 bg-blue-50 border-y border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-bold text-blue-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                          B
                        </span>
                        おおむね満足できる状況（個別の知識・技能の適用）
                      </div>
                      <span className="text-[11px] text-blue-800">児童Bの姿</span>
                    </div>
                    <div className="p-3.5 bg-white text-slate-700 leading-relaxed">
                      {currentUnit.teacherAdvice.assessmentFocus.levelB}
                    </div>

                    <div className="p-3 bg-amber-50 border-y border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                          C
                        </span>
                        努力を要する状況（表層的・単一の数値のみでの判断）
                      </div>
                      <span className="text-[11px] text-amber-800">児童Aの姿（手立てが必要）</span>
                    </div>
                    <div className="p-3.5 bg-white text-slate-700 leading-relaxed">
                      {currentUnit.teacherAdvice.assessmentFocus.levelC}
                    </div>
                  </div>
                </div>

                {/* Print CTA */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      職員室での指導案検討会や校内研修用シート
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      本単元の指導案シートをA4サイズで綺麗に印刷・PDF化できます。
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPrintModalOpen(true)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
                  >
                    <Printer className="w-4 h-4" /> 構想シートを表示・印刷
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB CONTENT 5: 4. 単元評価・分析ダッシュボード
          ========================================================================= */}
          {activeTab === 'dashboard' && (
            <UnitEvaluationDashboard unit={currentUnit} />
          )}
        </div>
      </div>

      {/* =========================================================================
          MODALS
      ========================================================================= */}
      {/* Official Materials Modal */}
      <OfficialMaterialsModal
        isOpen={isOfficialModalOpen}
        onClose={() => setIsOfficialModalOpen(false)}
        initialIndex={initialMaterialIdx}
      />

      {/* AI Unit Planner Modal */}
      <AiUnitPlannerModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onUnitGenerated={handleUnitGenerated}
      />

      {/* Printable Sheet Modal */}
      <PrintableLessonPlan
        unit={currentUnit}
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />

      {/* Unified Cycle PDF Report Modal */}
      <UnifiedCyclePdfReport
        unit={currentUnit}
        isOpen={isCyclePdfOpen}
        onClose={() => setIsCyclePdfOpen(false)}
      />

      {/* Student Reflection Worksheet Modal */}
      <StudentReflectionWorksheet
        unit={currentUnit}
        isOpen={isStudentWorksheetOpen}
        onClose={() => setIsStudentWorksheetOpen(false)}
      />

      {/* Unit QR Code Share Modal */}
      <ShareQrModal
        unit={currentUnit}
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500 no-print">
        <p>
          文部科学省・中央教育審議会における次期学習指導要領改訂論点（統合的な理解・総合的な発揮）に基づく授業づくり支援プラットフォーム
        </p>
      </footer>
    </div>
  );
}
