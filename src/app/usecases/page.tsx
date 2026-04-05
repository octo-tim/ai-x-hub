"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCases } from "@/lib/mockData";
import {
  Rocket,
  Search,
  Filter,
  ArrowRight,
  Clock,
  Timer,
  BarChart3,
  User,
  Trophy,
} from "lucide-react";

// ── Tool badge color ─────────────────────────────────────────
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

// ── Filter chip data ─────────────────────────────────────────
const jobTags = [
  "전체",
  ...Array.from(new Set(useCases.map((uc) => uc.jobTag))),
];
const toolTags = [
  "전체",
  ...Array.from(new Set(useCases.map((uc) => uc.aiTool))),
];
const sortOptions = [
  { value: "saved", label: "절감 시간순" },
  { value: "pct", label: "절감 비율순" },
  { value: "before", label: "기존 소요시간순" },
];

export default function UseCasesPage() {
  const [search, setSearch] = useState("");
  const [activeJob, setActiveJob] = useState("전체");
  const [activeTool, setActiveTool] = useState("전체");
  const [sortBy, setSortBy] = useState("saved");

  // ── Aggregate stats ────────────────────────────────────────
  const totalSaved = useCases.reduce((s, uc) => s + uc.savedHours, 0);
  const avgPct = Math.round(
    useCases.reduce(
      (s, uc) =>
        s + ((uc.beforeHours - uc.afterHours) / uc.beforeHours) * 100,
      0
    ) / useCases.length
  );

  // ── Filter & Sort ──────────────────────────────────────────
  const filtered = useMemo(() => {
    const list = useCases.filter((uc) => {
      const matchSearch =
        !search ||
        uc.title.includes(search) ||
        uc.resultSummary.includes(search) ||
        uc.jobTag.includes(search);
      const matchJob = activeJob === "전체" || uc.jobTag === activeJob;
      const matchTool = activeTool === "전체" || uc.aiTool === activeTool;
      return matchSearch && matchJob && matchTool;
    });

    return list.sort((a, b) => {
      if (sortBy === "saved") return b.savedHours - a.savedHours;
      if (sortBy === "pct") {
        const pctA = (a.savedHours / a.beforeHours) * 100;
        const pctB = (b.savedHours / b.beforeHours) * 100;
        return pctB - pctA;
      }
      return b.beforeHours - a.beforeHours;
    });
  }, [search, activeJob, activeTool, sortBy]);

  return (
    <div className="animate-fade-in max-w-[1200px] space-y-6">
      {/* ── Header ──────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2">
          <Rocket className="h-5 w-5 text-blue-600" />
          <h1 className="text-2xl font-extrabold text-slate-900">
            우수 유즈케이스
          </h1>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          AI 도입으로 업무 시간을 절감한 실제 성공 사례를 확인하고 벤치마킹하세요.
        </p>
      </div>

      {/* ── Summary KPI Banner ──────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-4 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 p-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 shadow-sm">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wide">
              총 절감 시간
            </p>
            <p className="text-2xl font-black text-emerald-700 tracking-tight">
              {totalSaved}
              <span className="text-sm font-bold text-emerald-500 ml-0.5">
                시간
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 shadow-sm">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">
              평균 절감률
            </p>
            <p className="text-2xl font-black text-blue-700 tracking-tight">
              {avgPct}
              <span className="text-sm font-bold text-blue-500 ml-0.5">%</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50 p-4 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500 shadow-sm">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-violet-600 uppercase tracking-wide">
              등록 사례
            </p>
            <p className="text-2xl font-black text-violet-700 tracking-tight">
              {useCases.length}
              <span className="text-sm font-bold text-violet-500 ml-0.5">
                건
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Search & Filters ────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="사례 제목, 요약, 직무 키워드로 검색..."
            className="pl-10 h-10 bg-slate-50/80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Job filter */}
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 mr-1">
              직무:
            </span>
            {jobTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveJob(tag)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                  activeJob === tag
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Tool filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 mr-1">
              AI 툴:
            </span>
            {toolTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTool(tag)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                  activeTool === tag
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-xs font-semibold text-slate-500">정렬:</span>
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-all",
                  sortBy === opt.value
                    ? "bg-slate-800 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────── */}
      <p className="text-xs text-slate-400">
        총{" "}
        <span className="font-bold text-slate-600">{filtered.length}</span>
        건의 성공 사례
      </p>

      {/* ── Card List ───────────────────────────────────────── */}
      <div className="space-y-4">
        {filtered.map((uc, idx) => {
          const pct = Math.round(
            ((uc.beforeHours - uc.afterHours) / uc.beforeHours) * 100
          );
          const barWidth = pct;

          return (
            <div
              key={uc.id}
              className="group rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex flex-col lg:flex-row">
                {/* ── Left: Content ──────────────────────── */}
                <div className="flex-1 p-6">
                  <div className="flex items-start gap-3">
                    {/* Rank */}
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black text-white shadow-sm",
                        idx === 0
                          ? "bg-gradient-to-br from-amber-400 to-orange-500"
                          : idx === 1
                          ? "bg-gradient-to-br from-slate-400 to-slate-500"
                          : idx === 2
                          ? "bg-gradient-to-br from-amber-600 to-amber-700"
                          : "bg-gradient-to-br from-slate-300 to-slate-400"
                      )}
                    >
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {uc.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                        {uc.resultSummary}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Badge variant="default">{uc.jobTag}</Badge>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border",
                            toolColor(uc.aiTool)
                          )}
                        >
                          {uc.aiTool}
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {uc.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Right: Time Impact Visual ──────────── */}
                <div className="lg:w-[340px] shrink-0 border-t lg:border-t-0 lg:border-l border-slate-100 p-6 flex flex-col justify-center">
                  {/* Before → After */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-center">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                        기존
                      </p>
                      <p className="mt-1 text-3xl font-black text-slate-300 line-through decoration-red-400/50 decoration-2">
                        {uc.beforeHours}
                        <span className="text-base ml-0.5">h</span>
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 border border-emerald-200 shrink-0">
                      <ArrowRight className="h-4 w-4 text-emerald-600" />
                    </div>

                    <div className="text-center">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                        AI 도입 후
                      </p>
                      <p className="mt-1 text-3xl font-black text-emerald-600">
                        {uc.afterHours}
                        <span className="text-base ml-0.5">h</span>
                      </p>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-semibold text-slate-400">
                        절감률
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600">
                        {pct}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>

                  {/* Saved badge */}
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 border border-emerald-200/50">
                    <Timer className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span className="text-sm font-bold text-emerald-700">
                      {uc.savedHours}시간 단축
                    </span>
                    <span className="ml-auto rounded bg-emerald-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      -{pct}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Search className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-500">
            검색 결과가 없습니다
          </p>
          <p className="mt-1 text-xs text-slate-400">
            다른 키워드나 필터를 사용해 보세요
          </p>
        </div>
      )}
    </div>
  );
}
