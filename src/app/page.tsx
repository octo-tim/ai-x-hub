import {
  dashboardStats,
  prompts,
  useCases,
} from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Users,
  FileText,
  ArrowUpRight,
  ArrowRight,
  Copy,
  Sparkles,
  TrendingUp,
  Flame,
  Trophy,
  Timer,
  Zap,
} from "lucide-react";

// ── AI Tool badge color ──────────────────────────────────────
function toolColor(tool: string) {
  switch (tool) {
    case "Claude":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "ChatGPT":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Perplexity":
      return "bg-blue-50 text-blue-700 border-blue-200";
    default:
      return "bg-slate-50 text-slate-600 border-slate-200";
  }
}

export default function DashboardPage() {
  const topPrompts = [...prompts]
    .sort((a, b) => b.copyCount - a.copyCount)
    .slice(0, 3);
  const topUseCases = [...useCases]
    .sort((a, b) => b.savedHours - a.savedHours)
    .slice(0, 3);

  const totalSaved = useCases.reduce((s, uc) => s + uc.savedHours, 0);
  const avgHourlyCost = 45_000; // 원
  const roiWon = totalSaved * avgHourlyCost;

  return (
    <div className="animate-fade-in space-y-8 max-w-[1200px]">
      {/* ═══════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 px-8 py-10 shadow-lg">
        {/* decorative circles */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute right-24 bottom-4 h-32 w-32 rounded-full bg-white/[0.03]" />

        <div className="relative z-10 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-blue-200 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            AI-X Hub · Enterprise AI Portal
          </div>
          <h1 className="mt-2 text-[28px] font-extrabold leading-tight text-white tracking-tight">
            당신의 AI 노하우가<br />
            회사의 경쟁력이 됩니다
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-blue-100/90">
            검증된 프롬프트를 복사하고, 성공 사례를 공유하세요.
            지금까지 전사적으로&nbsp;
            <span className="font-bold text-white">
              {totalSaved}시간
            </span>
            의 업무 시간을 절감했습니다.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="/prompts"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-blue-700 shadow-sm transition hover:shadow-md hover:bg-blue-50"
            >
              프롬프트 둘러보기
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/write"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
            >
              노하우 공유하기
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. AI 임팩트 현황판 (3-column KPI)
          ═══════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            AI 임팩트 현황판
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* ── Card 1: 총 누적 절감 시간 (HERO metric) ── */}
          <div className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            {/* glow ring */}
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-200/30" />

            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 shadow-sm">
                  <Clock className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">
                  총 누적 절감 시간
                </span>
              </div>
              <p className="mt-4 text-5xl font-black tracking-tight text-emerald-700">
                {totalSaved}
                <span className="ml-1 text-xl font-bold text-emerald-500">
                  시간
                </span>
              </p>
              <p className="mt-1.5 text-xs text-emerald-600/70">
                환산 비용 절감 약&nbsp;
                <span className="font-bold text-emerald-700">
                  {(roiWon / 10_000).toLocaleString()}만원
                </span>
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600">
                <Zap className="h-3 w-3" />
                전월 대비 +21.8%
              </div>
            </div>
          </div>

          {/* ── Card 2: 등록된 프롬프트 수 ─────────────── */}
          <div className="group relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-200/30" />
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 shadow-sm">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  누적 등록 프롬프트
                </span>
              </div>
              <p className="mt-4 text-5xl font-black tracking-tight text-blue-700">
                {dashboardStats.totalPrompts}
                <span className="ml-1 text-xl font-bold text-blue-500">
                  개
                </span>
              </p>
              <p className="mt-1.5 text-xs text-blue-600/70">
                총 복사 횟수&nbsp;
                <span className="font-bold text-blue-700">
                  {prompts
                    .reduce((s, p) => s + p.copyCount, 0)
                    .toLocaleString()}
                  회
                </span>
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-blue-600">
                <TrendingUp className="h-3 w-3" />
                이번 주 +3개 신규 등록
              </div>
            </div>
          </div>

          {/* ── Card 3: 활성 유저 수 ───────────────────── */}
          <div className="group relative overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-200/30" />
            <div className="relative z-10">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500 shadow-sm">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">
                  이번 달 활성 유저
                </span>
              </div>
              <p className="mt-4 text-5xl font-black tracking-tight text-violet-700">
                {dashboardStats.totalUsers}
                <span className="ml-1 text-xl font-bold text-violet-500">
                  명
                </span>
              </p>
              <p className="mt-1.5 text-xs text-violet-600/70">
                전체 임직원 대비&nbsp;
                <span className="font-bold text-violet-700">73%</span> 참여
              </p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-violet-600">
                <Users className="h-3 w-3" />
                신규 가입 +12명
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. 이주의 HOT 프롬프트 TOP 3
          ═══════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <h2 className="text-base font-bold text-slate-900">
              이주의 HOT 프롬프트
            </h2>
          </div>
          <a
            href="/prompts"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            전체 보기 <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPrompts.map((p, idx) => (
            <div
              key={p.id}
              className="group flex flex-col rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* rank ribbon */}
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black text-white shadow-sm ${
                    idx === 0
                      ? "bg-gradient-to-br from-amber-400 to-orange-500"
                      : idx === 1
                      ? "bg-gradient-to-br from-slate-400 to-slate-500"
                      : "bg-gradient-to-br from-amber-600 to-amber-700"
                  }`}
                >
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {p.title}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {p.author}
                  </p>
                </div>
              </div>

              {/* body */}
              <div className="flex-1 px-5 py-4">
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <Badge variant="default">{p.jobTag}</Badge>
                  <Badge variant="secondary">{p.purposeTag}</Badge>
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border ${toolColor(
                      p.aiTool
                    )}`}
                  >
                    {p.aiTool}
                  </span>
                </div>
              </div>

              {/* footer */}
              <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Copy className="h-3 w-3" />
                  <span className="font-semibold text-slate-600">
                    {p.copyCount.toLocaleString()}
                  </span>
                  회 복사됨
                </div>
                <a
                  href="/prompts"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition flex items-center gap-0.5"
                >
                  보기 <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. 베스트 성공 사례
          ═══════════════════════════════════════════════════ */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            <h2 className="text-base font-bold text-slate-900">
              베스트 성공 사례
            </h2>
          </div>
          <a
            href="/usecases"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition"
          >
            전체 보기 <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topUseCases.map((uc) => {
            const pct = Math.round(
              ((uc.beforeHours - uc.afterHours) / uc.beforeHours) * 100
            );
            return (
              <div
                key={uc.id}
                className="group flex flex-col rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* header */}
                <div className="px-5 pt-5 pb-3">
                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {uc.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {uc.resultSummary}
                  </p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <Badge variant="default">{uc.jobTag}</Badge>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border ${toolColor(
                        uc.aiTool
                      )}`}
                    >
                      {uc.aiTool}
                    </span>
                  </div>
                </div>

                {/* ── TIME IMPACT VISUAL ──────────────── */}
                <div className="mx-5 mt-2 rounded-lg bg-slate-50 border border-slate-100 p-4">
                  <div className="flex items-center justify-between gap-2">
                    {/* Before */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                        기존
                      </span>
                      <span className="mt-1 text-2xl font-black text-slate-400 line-through decoration-red-400/60 decoration-2">
                        {uc.beforeHours}h
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200">
                        <ArrowRight className="h-4 w-4 text-emerald-600" />
                      </div>
                    </div>

                    {/* After */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                        AI 도입 후
                      </span>
                      <span className="mt-1 text-2xl font-black text-emerald-600">
                        {uc.afterHours}h
                      </span>
                    </div>
                  </div>

                  {/* Saved highlight bar */}
                  <div className="mt-3 flex items-center gap-2 rounded-md bg-emerald-500/10 px-3 py-2 border border-emerald-200/50">
                    <Timer className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-bold text-emerald-700">
                      {uc.savedHours}시간 단축
                    </span>
                    <span className="ml-auto rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      -{pct}%
                    </span>
                  </div>
                </div>

                {/* footer */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 px-5 py-3 mt-4">
                  <span className="text-[11px] text-slate-400">
                    {uc.author}
                  </span>
                  <a
                    href="/usecases"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition flex items-center gap-0.5"
                  >
                    상세 <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. 월별 절감 시간 추이 차트
          ═══════════════════════════════════════════════════ */}
      <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="h-4 w-4 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            월별 누적 절감 시간 추이
          </h2>
        </div>
        <div className="flex items-end gap-4 h-44">
          {dashboardStats.monthlySavedHours.map((item, i) => {
            const maxH = Math.max(
              ...dashboardStats.monthlySavedHours.map((d) => d.hours)
            );
            const pct = (item.hours / maxH) * 100;
            return (
              <div
                key={item.month}
                className="group/bar flex flex-1 flex-col items-center gap-1.5"
              >
                <span className="text-xs font-bold text-blue-600 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                  {item.hours}h
                </span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-500 group-hover/bar:from-blue-700 group-hover/bar:to-blue-500 shadow-sm cursor-pointer"
                  style={{
                    height: `${pct}%`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
                <span className="text-[10px] font-medium text-slate-400 mt-1">
                  {item.month.split(".")[1]}월
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
