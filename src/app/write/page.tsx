"use client";

import React, { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PenSquare,
  FileText,
  Rocket,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Zap,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

// ── Constants ────────────────────────────────────────────────
const JOB_CATEGORIES = [
  "영업",
  "기획",
  "마케팅",
  "개발",
  "HR",
  "CS",
  "법무",
  "재무",
  "디자인",
  "기타",
];

const AI_TOOLS = ["Claude", "ChatGPT", "Perplexity", "Gemini", "Copilot", "Midjourney", "기타"];

// ── Toast ────────────────────────────────────────────────────
function SuccessToast({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onHide, 4000);
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
          <p className="text-sm font-bold text-slate-900">등록 완료!</p>
          <p className="text-xs text-emerald-600 font-semibold">
            소중한 지식 공유 감사합니다 (+50 포인트 지급) 🎉
          </p>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// MAIN
// ═════════════════════════════════════════════════════════════
export default function WritePage() {
  const [activeTab, setActiveTab] = useState<"prompt" | "usecase">("prompt");
  const [showToast, setShowToast] = useState(false);

  // ── Prompt Tab State ───────────────────────────────────────
  const [pTitle, setPTitle] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pTools, setPTools] = useState<string[]>([]);
  const [pContent, setPContent] = useState("");
  const [pDescription, setPDescription] = useState("");

  // ── UseCase Tab State ──────────────────────────────────────
  const [ucTitle, setUcTitle] = useState("");
  const [ucJob, setUcJob] = useState("");
  const [ucTool, setUcTool] = useState("");
  const [ucBefore, setUcBefore] = useState("");
  const [ucAfter, setUcAfter] = useState("");
  const [ucSummary, setUcSummary] = useState("");

  // ── Shared ─────────────────────────────────────────────────
  const [agreed, setAgreed] = useState(false);

  // ── Prompt tool toggle ─────────────────────────────────────
  const toggleTool = (tool: string) => {
    setPTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  // ── Prompt variable detection (live) ───────────────────────
  const detectedVars = useMemo(() => {
    const matches = pContent.match(/\[[^\]]+\]/g) || [];
    return Array.from(new Set(matches));
  }, [pContent]);

  // ── ROI auto calc ──────────────────────────────────────────
  const beforeNum = parseFloat(ucBefore) || 0;
  const afterNum = parseFloat(ucAfter) || 0;
  const savedHours = beforeNum > afterNum ? +(beforeNum - afterNum).toFixed(1) : 0;
  const savePct = beforeNum > 0 ? Math.round((savedHours / beforeNum) * 100) : 0;

  // ── Validation ─────────────────────────────────────────────
  const promptValid =
    pTitle.trim() && pCategory && pTools.length > 0 && pContent.trim() && agreed;
  const usecaseValid =
    ucTitle.trim() &&
    ucJob &&
    ucTool &&
    ucBefore &&
    ucAfter &&
    beforeNum > afterNum &&
    ucSummary.trim() &&
    agreed;

  const canSubmit = activeTab === "prompt" ? promptValid : usecaseValid;

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = () => {
    if (!canSubmit) return;
    setShowToast(true);
    // Reset everything
    if (activeTab === "prompt") {
      setPTitle("");
      setPCategory("");
      setPTools([]);
      setPContent("");
      setPDescription("");
    } else {
      setUcTitle("");
      setUcJob("");
      setUcTool("");
      setUcBefore("");
      setUcAfter("");
      setUcSummary("");
    }
    setAgreed(false);
  };

  return (
    <>
      <SuccessToast show={showToast} onHide={() => setShowToast(false)} />

      <div className="animate-fade-in max-w-[820px] mx-auto space-y-6">
        {/* ── Page Header ──────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2">
            <PenSquare className="h-5 w-5 text-blue-600" />
            <h1 className="text-2xl font-extrabold text-slate-900">
              새 글 쓰기
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            나의 AI 활용 노하우를 구조화된 양식으로 공유하고, 포인트를 획득하세요.
          </p>
        </div>

        {/* ── Tabs ──────────────────────────────────────────── */}
        <div className="rounded-xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
          {/* Tab Buttons */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => { setActiveTab("prompt"); setAgreed(false); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all border-b-2",
                activeTab === "prompt"
                  ? "border-blue-600 text-blue-700 bg-blue-50/40"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              <FileText className="h-4 w-4" />
              프롬프트 템플릿 공유
            </button>
            <button
              onClick={() => { setActiveTab("usecase"); setAgreed(false); }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all border-b-2",
                activeTab === "usecase"
                  ? "border-blue-600 text-blue-700 bg-blue-50/40"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              <Rocket className="h-4 w-4" />
              업무 혁신 사례 공유
            </button>
          </div>

          {/* ═══════════════════════════════════════════════════
              TAB 1: 프롬프트 템플릿
              ═══════════════════════════════════════════════════ */}
          {activeTab === "prompt" && (
            <div className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  프롬프트 제목 <span className="text-red-500">*</span>
                </label>
                <Input
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  placeholder="예: 고객 미팅 사전 브리핑 자료 생성"
                  className="bg-slate-50/50"
                />
              </div>

              {/* Category + Description row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    직무 카테고리 <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                  >
                    <option value="">선택하세요</option>
                    {JOB_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    용도 설명 (선택)
                  </label>
                  <Input
                    value={pDescription}
                    onChange={(e) => setPDescription(e.target.value)}
                    placeholder="이 프롬프트의 활용 목적을 짧게"
                  />
                </div>
              </div>

              {/* AI Tools (multi-select badges) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  사용 AI 툴 <span className="text-red-500">*</span>
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    (복수 선택 가능)
                  </span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {AI_TOOLS.map((tool) => {
                    const active = pTools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => toggleTool(tool)}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold border transition-all duration-150",
                          active
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                        )}
                      >
                        {active && <CheckCircle2 className="h-3 w-3" />}
                        {tool}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prompt Content */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  프롬프트 본문 <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={pContent}
                  onChange={(e) => setPContent(e.target.value)}
                  placeholder={`예:\n당신은 B2B 영업 전략 전문가입니다.\n아래 정보를 바탕으로 [고객사] 미팅에 필요한 사전 브리핑 자료를 작성해 주세요.\n- 담당 직무: [직무]\n- 미팅 목적: [주제]`}
                  className="min-h-[200px] bg-slate-50/50 font-mono text-[13px] leading-relaxed"
                />

                {/* Helper text */}
                <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
                  <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700 leading-relaxed">
                    <span className="font-bold">💡 변수 작성 가이드:</span>{" "}
                    다른 직원이 빈칸만 채워 쓸 수 있도록, 사용자 입력 변수는{" "}
                    <code className="rounded bg-amber-100 px-1 py-0.5 text-amber-800 font-semibold">
                      [고객사]
                    </code>
                    ,{" "}
                    <code className="rounded bg-amber-100 px-1 py-0.5 text-amber-800 font-semibold">
                      [주제]
                    </code>{" "}
                    처럼 대괄호로 묶어주세요. 자동으로 입력 폼이 생성됩니다.
                  </p>
                </div>

                {/* Detected variables preview */}
                {detectedVars.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-500">
                      감지된 변수:
                    </span>
                    {detectedVars.map((v) => (
                      <span
                        key={v}
                        className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200"
                      >
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              TAB 2: 업무 혁신 사례
              ═══════════════════════════════════════════════════ */}
          {activeTab === "usecase" && (
            <div className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  사례 제목 <span className="text-red-500">*</span>
                </label>
                <Input
                  value={ucTitle}
                  onChange={(e) => setUcTitle(e.target.value)}
                  placeholder="예: RFP 응답서 초안 작성 자동화"
                  className="bg-slate-50/50"
                />
              </div>

              {/* Job + Tool */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    직무 <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={ucJob}
                    onChange={(e) => setUcJob(e.target.value)}
                  >
                    <option value="">선택하세요</option>
                    {JOB_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    활용 AI 툴 <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={ucTool}
                    onChange={(e) => setUcTool(e.target.value)}
                  >
                    <option value="">선택하세요</option>
                    {AI_TOOLS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* ── ROI Calculator ────────────────────────── */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 border border-blue-200">
                    <Zap className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      ROI 자동 계산기
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      소요 시간을 입력하면 절감 효과가 자동으로 계산됩니다
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      ⏱️ 기존 소요 시간 (시간){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step="0.5"
                      value={ucBefore}
                      onChange={(e) => setUcBefore(e.target.value)}
                      placeholder="예: 16"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      ⚡ AI 도입 후 소요 시간 (시간){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      min="0"
                      step="0.5"
                      value={ucAfter}
                      onChange={(e) => setUcAfter(e.target.value)}
                      placeholder="예: 3"
                      className="bg-white"
                    />
                  </div>
                </div>

                {/* ── ROI Result (live) ────────────────────── */}
                {beforeNum > 0 && afterNum >= 0 && (
                  <div
                    className={cn(
                      "rounded-lg p-4 border transition-all duration-300",
                      savedHours > 0
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-red-50 border-red-200"
                    )}
                  >
                    {savedHours > 0 ? (
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                          {/* Before */}
                          <div className="text-center">
                            <p className="text-[10px] font-semibold text-slate-400 uppercase">
                              기존
                            </p>
                            <p className="text-xl font-black text-slate-400 line-through decoration-red-400/60 decoration-2">
                              {beforeNum}h
                            </p>
                          </div>
                          {/* Arrow */}
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-200 border border-emerald-300">
                            <ArrowRight className="h-3.5 w-3.5 text-emerald-700" />
                          </div>
                          {/* After */}
                          <div className="text-center">
                            <p className="text-[10px] font-semibold text-slate-400 uppercase">
                              AI 후
                            </p>
                            <p className="text-xl font-black text-emerald-600">
                              {afterNum}h
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="rounded-lg bg-emerald-600 px-3 py-1.5 shadow-sm">
                            <p className="text-xs text-emerald-100">
                              예상 절감
                            </p>
                            <p className="text-lg font-black text-white leading-tight">
                              {savedHours}시간
                            </p>
                          </div>
                          <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                            -{savePct}%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">
                          AI 도입 후 시간이 기존보다 작아야 합니다
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  결과물 요약 및 주의사항{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={ucSummary}
                  onChange={(e) => setUcSummary(e.target.value)}
                  placeholder="AI 도입 전후의 구체적인 변화, 정량적 성과, 주의할 점 등을 작성해 주세요."
                  className="min-h-[140px] bg-slate-50/50"
                />
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              SHARED: 보안 서약 + 등록 버튼
              ═══════════════════════════════════════════════════ */}
          <div className="border-t border-slate-200 px-6 py-5 space-y-4 bg-slate-50/30">
            {/* Security Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <Checkbox
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck
                    className={cn(
                      "h-4 w-4 transition-colors",
                      agreed ? "text-emerald-600" : "text-slate-400"
                    )}
                  />
                  <span className="text-sm font-semibold text-slate-700">
                    보안 서약 (필수)
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">
                  본 게시물에 사내 대외비, 고객 개인정보, 소스코드 등
                  보안에 민감한 정보가 포함되지 않았음을 확인합니다.
                </p>
              </div>
            </label>

            {/* Submit Button */}
            <Button
              size="lg"
              className={cn(
                "w-full h-12 text-sm font-bold shadow-md transition-all duration-200",
                canSubmit
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200"
              )}
              disabled={!canSubmit}
              onClick={handleSubmit}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {activeTab === "prompt"
                ? "프롬프트 등록하기"
                : "사례 등록하기"}
            </Button>

            {!agreed && (
              <p className="text-center text-[11px] text-slate-400">
                보안 서약에 동의해야 등록할 수 있습니다
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
