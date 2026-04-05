"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prompts } from "@/lib/mockData";
import {
  ArrowLeft,
  Copy,
  Check,
  Sparkles,
  User,
  Zap,
  Terminal,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Lightbulb,
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

// ── Toast Component ──────────────────────────────────────────
function Toast({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onHide, 3000);
      return () => clearTimeout(t);
    }
  }, [show, onHide]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-5 py-4 shadow-xl">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">복사 완료!</p>
          <p className="text-xs text-emerald-600 font-semibold">
            +10 포인트 지급 🎉
          </p>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═════════════════════════════════════════════════════════════
export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const promptId = params.id as string;

  const prompt = prompts.find((p) => p.id === promptId);

  // ── Extract unique variables from content ────────────────
  const variables = useMemo(() => {
    if (!prompt) return [];
    const matches = prompt.content.match(/\[([^\]]+)\]/g) || [];
    return Array.from(new Set(matches)); // e.g. ["[직무]", "[주제]"]
  }, [prompt]);

  // ── Variable input state ─────────────────────────────────
  const [values, setValues] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = useCallback((variable: string, value: string) => {
    setValues((prev) => ({ ...prev, [variable]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setValues({});
  }, []);

  // ── Build final text (with replacements) ─────────────────
  const finalText = useMemo(() => {
    if (!prompt) return "";
    let text = prompt.content;
    for (const [key, val] of Object.entries(values)) {
      if (val.trim()) {
        text = text.replaceAll(key, val);
      }
    }
    return text;
  }, [prompt, values]);

  // ── Render preview with highlights ───────────────────────
  const previewElements = useMemo(() => {
    if (!prompt) return null;
    const parts = prompt.content.split(/(\[[^\]]+\])/g);
    return parts.map((part, i) => {
      if (/^\[[^\]]+\]$/.test(part)) {
        const filled = values[part];
        if (filled && filled.trim()) {
          // ✅ Filled: green highlight
          return (
            <span
              key={i}
              className="rounded bg-emerald-400/20 px-1 py-0.5 text-emerald-300 font-semibold border-b-2 border-emerald-400/50"
            >
              {filled}
            </span>
          );
        }
        // ⏳ Unfilled: amber placeholder
        return (
          <span
            key={i}
            className="rounded bg-amber-400/15 px-1 py-0.5 text-amber-400 font-semibold animate-pulse"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }, [prompt, values]);

  // ── Copy handler ─────────────────────────────────────────
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalText);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = finalText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ── Filled count ─────────────────────────────────────────
  const filledCount = variables.filter(
    (v) => values[v] && values[v].trim()
  ).length;
  const allFilled = filledCount === variables.length && variables.length > 0;

  // ── 404 ──────────────────────────────────────────────────
  if (!prompt) {
    return (
      <div className="animate-fade-in flex flex-col items-center justify-center py-20">
        <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
        <p className="text-lg font-bold text-slate-600">
          프롬프트를 찾을 수 없습니다
        </p>
        <Link
          href="/prompts"
          className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          ← 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <>
      <Toast show={showToast} onHide={() => setShowToast(false)} />

      <div className="animate-fade-in max-w-[1280px] space-y-5">
        {/* ── Breadcrumb ──────────────────────────────────── */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로 가기
          </button>
          <span className="text-slate-300">/</span>
          <Link
            href="/prompts"
            className="text-sm text-slate-500 hover:text-blue-600 transition"
          >
            프롬프트 라이브러리
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-medium text-slate-800 truncate max-w-[300px]">
            {prompt.title}
          </span>
        </div>

        {/* ═══════════════════════════════════════════════════
            MAIN GRID: 5:5 SPLIT
            ═══════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ─────────────────────────────────────────────────
              LEFT: Meta + Variable Input Form
              ───────────────────────────────────────────────── */}
          <div className="space-y-5">
            {/* ── Prompt Meta Card ────────────────────────── */}
            <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl font-extrabold text-slate-900 leading-snug">
                    {prompt.title}
                  </h1>
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                    {prompt.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Badge variant="default">{prompt.jobTag}</Badge>
                <Badge variant="secondary">{prompt.purposeTag}</Badge>
                <span
                  className={cn(
                    "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border",
                    toolColor(prompt.aiTool)
                  )}
                >
                  {prompt.aiTool}
                </span>
              </div>

              {/* Author & Stats */}
              <div className="mt-4 flex items-center gap-4 pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <User className="h-3.5 w-3.5" />
                  <span>{prompt.author}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Copy className="h-3.5 w-3.5" />
                  <span>{prompt.copyCount.toLocaleString()}회 복사됨</span>
                </div>
              </div>
            </div>

            {/* ── Variable Input Form ────────────────────── */}
            <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 border border-amber-200">
                    <Zap className="h-3.5 w-3.5 text-amber-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">
                      변수 입력
                    </h2>
                    <p className="text-[11px] text-slate-400">
                      빈칸을 채우면 우측에서 실시간으로 결과를 확인할 수 있어요
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition"
                >
                  <RotateCcw className="h-3 w-3" />
                  초기화
                </button>
              </div>

              {/* Progress */}
              <div className="px-6 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500">
                    입력 진행률
                  </span>
                  <span
                    className={cn(
                      "text-xs font-bold",
                      allFilled ? "text-emerald-600" : "text-slate-400"
                    )}
                  >
                    {filledCount} / {variables.length}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      allFilled
                        ? "bg-emerald-500"
                        : "bg-blue-500"
                    )}
                    style={{
                      width: `${
                        variables.length
                          ? (filledCount / variables.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Input Fields */}
              <div className="p-6 pt-4 space-y-4">
                {variables.map((variable, idx) => {
                  const label = variable.replace(/[\[\]]/g, "");
                  const isFilled =
                    values[variable] && values[variable].trim();
                  return (
                    <div key={variable}>
                      <label className="flex items-center gap-2 mb-1.5">
                        <span
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold",
                            isFilled
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-slate-100 text-slate-400"
                          )}
                        >
                          {isFilled ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            idx + 1
                          )}
                        </span>
                        <span className="text-sm font-semibold text-slate-700">
                          {label}
                        </span>
                        <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600 border border-amber-100">
                          {variable}
                        </span>
                      </label>
                      <Input
                        value={values[variable] || ""}
                        onChange={(e) =>
                          handleChange(variable, e.target.value)
                        }
                        placeholder={`${label}을(를) 입력하세요`}
                        className={cn(
                          "h-10 text-sm transition-all",
                          isFilled &&
                            "border-emerald-300 bg-emerald-50/50 focus:ring-emerald-500"
                        )}
                      />
                    </div>
                  );
                })}

                {/* Tip */}
                {!allFilled && (
                  <div className="flex items-start gap-2 rounded-lg bg-blue-50 border border-blue-100 p-3">
                    <Lightbulb className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-600 leading-relaxed">
                      <span className="font-semibold">Tip:</span>{" "}
                      모든 변수를 입력하면 우측 미리보기에서 완성된 프롬프트를 확인하고 바로 복사할 수 있어요.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────
              RIGHT: Live Preview (Terminal Style)
              ───────────────────────────────────────────────── */}
          <div className="space-y-4">
            <div className="sticky top-20 rounded-xl border border-slate-700 bg-slate-900 shadow-xl overflow-hidden">
              {/* ── Terminal Header ──────────────────────── */}
              <div className="flex items-center justify-between border-b border-slate-700/80 bg-slate-800 px-5 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 ml-3">
                    <Terminal className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-400">
                      실시간 미리보기
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {allFilled && (
                    <span className="flex items-center gap-1 rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      모든 변수 입력 완료
                    </span>
                  )}
                </div>
              </div>

              {/* ── Preview Body ─────────────────────────── */}
              <div className="p-5 max-h-[calc(100vh-260px)] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-[1.85] text-slate-300">
                  {previewElements}
                </pre>
              </div>

              {/* ── Action Footer ────────────────────────── */}
              <div className="border-t border-slate-700/80 bg-slate-800/50 px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">
                      문자 수:&nbsp;
                      <span className="font-semibold text-slate-400">
                        {finalText.length.toLocaleString()}
                      </span>
                    </span>
                    <span className="text-slate-700">|</span>
                    <span className="text-[11px] text-slate-500">
                      변수:&nbsp;
                      <span
                        className={cn(
                          "font-semibold",
                          allFilled
                            ? "text-emerald-400"
                            : "text-amber-400"
                        )}
                      >
                        {filledCount}/{variables.length}
                      </span>
                    </span>
                  </div>
                  {!allFilled && (
                    <span className="text-[10px] text-amber-400/70">
                      미입력 변수가 있어요
                    </span>
                  )}
                </div>

                <Button
                  size="lg"
                  className={cn(
                    "w-full h-12 text-sm font-bold shadow-lg transition-all duration-200",
                    copied
                      ? "bg-emerald-600 hover:bg-emerald-600"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  )}
                  onClick={handleCopy}
                >
                  {copied ? (
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      복사 완료! (+10 포인트 지급)
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Copy className="h-4 w-4" />
                      최종 프롬프트 복사하기
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
