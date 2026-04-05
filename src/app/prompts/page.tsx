"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prompts } from "@/lib/mockData";
import {
  Search,
  Copy,
  ArrowRight,
  User,
  Sparkles,
  Filter,
  Library,
} from "lucide-react";

// ── Tool color helper ────────────────────────────────────────
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

// ── Variable highlight ───────────────────────────────────────
function highlightVars(text: string, limit: number) {
  const truncated = text.length > limit ? text.slice(0, limit) + "…" : text;
  const parts = truncated.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) =>
    /^\[[^\]]+\]$/.test(part) ? (
      <span
        key={i}
        className="rounded bg-amber-100 px-1 py-0.5 text-amber-800 font-semibold border border-amber-200/60 text-[12px]"
      >
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// ── Filter chip data ─────────────────────────────────────────
const jobTags = ["전체", ...Array.from(new Set(prompts.map((p) => p.jobTag)))];
const toolTags = ["전체", ...Array.from(new Set(prompts.map((p) => p.aiTool)))];

export default function PromptsPage() {
  const [search, setSearch] = useState("");
  const [activeJob, setActiveJob] = useState("전체");
  const [activeTool, setActiveTool] = useState("전체");

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      const matchSearch =
        !search ||
        p.title.includes(search) ||
        p.description.includes(search) ||
        p.jobTag.includes(search);
      const matchJob = activeJob === "전체" || p.jobTag === activeJob;
      const matchTool = activeTool === "전체" || p.aiTool === activeTool;
      return matchSearch && matchJob && matchTool;
    });
  }, [search, activeJob, activeTool]);

  return (
    <div className="animate-fade-in max-w-[1200px] space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Library className="h-5 w-5 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              프롬프트 라이브러리
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            검증된 변수형 프롬프트를 선택하고, 빈칸만 채워서 바로 사용하세요.
          </p>
        </div>
        <Link href="/write">
          <Button size="sm" className="shrink-0">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            프롬프트 공유하기
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="프롬프트 제목, 설명, 직무 키워드로 검색..."
            className="pl-10 h-10 bg-slate-50/80"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Job tag filter */}
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
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-400">
        총{" "}
        <span className="font-bold text-slate-600">{filtered.length}</span>
        개의 프롬프트
      </p>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const vars = Array.from(
            new Set(p.content.match(/\[[^\]]+\]/g) || [])
          );
          return (
            <Link
              key={p.id}
              href={`/prompts/${p.id}`}
              className="group flex flex-col rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-slate-300"
            >
              {/* Header */}
              <div className="flex items-start gap-3 p-5 pb-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-slate-900 leading-snug truncate group-hover:text-blue-700 transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 px-5">
                <Badge variant="default">{p.jobTag}</Badge>
                <Badge variant="secondary">{p.purposeTag}</Badge>
                <span
                  className={cn(
                    "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border",
                    toolColor(p.aiTool)
                  )}
                >
                  {p.aiTool}
                </span>
              </div>

              {/* Preview */}
              <div className="mx-5 mt-3 rounded-lg bg-slate-50 border border-slate-100 p-3">
                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-3 whitespace-pre-line">
                  {highlightVars(p.content, 150)}
                </p>
              </div>

              {/* Variables */}
              {vars.length > 0 && (
                <div className="flex flex-wrap items-center gap-1 px-5 mt-2.5">
                  <span className="text-[10px] font-medium text-slate-400 mr-1">
                    변수:
                  </span>
                  {vars.slice(0, 4).map((v) => (
                    <span
                      key={v}
                      className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 border border-amber-100"
                    >
                      {v}
                    </span>
                  ))}
                  {vars.length > 4 && (
                    <span className="text-[10px] text-slate-400">
                      +{vars.length - 4}
                    </span>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between border-t border-slate-100 px-5 py-3 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <User className="h-3 w-3" />
                  <span>{p.author}</span>
                  <span className="mx-1">·</span>
                  <Copy className="h-3 w-3" />
                  <span>{p.copyCount.toLocaleString()}</span>
                </div>
                <span className="flex items-center gap-0.5 text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  실행하기 <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
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
