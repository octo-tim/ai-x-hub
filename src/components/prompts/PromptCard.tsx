"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Prompt } from "@/lib/mockData";
import {
  Copy,
  Check,
  Eye,
  User,
  Sparkles,
} from "lucide-react";

// ── Variable highlighter ─────────────────────────────────────
// [변수명] 패턴을 감지하여 인터랙티브 하이라이트로 렌더링
function highlightVariables(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) => {
    if (/^\[[^\]]+\]$/.test(part)) {
      return (
        <span
          key={i}
          className="inline-flex items-center gap-0.5 rounded bg-amber-100 px-1.5 py-0.5 text-amber-800 font-semibold border border-amber-200/60 text-[13px] leading-tight"
        >
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ── AI Tool badge colors ─────────────────────────────────────
function getToolColor(tool: string) {
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

interface PromptCardProps {
  prompt: Prompt;
  onOpenDetail: (prompt: Prompt) => void;
}

export default function PromptCard({ prompt, onOpenDetail }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = prompt.content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 프롬프트 content에서 변수 목록 추출
  const variables = Array.from(
    new Set(prompt.content.match(/\[[^\]]+\]/g) || [])
  );

  return (
    <div className="group relative flex flex-col rounded-xl border border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300/80">
      {/* ── Header ──────────────────────────────────── */}
      <div className="flex items-start gap-3 p-5 pb-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
          <Sparkles className="h-4 w-4 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-bold text-slate-900 leading-snug truncate">
            {prompt.title}
          </h3>
          <p className="mt-0.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {prompt.description}
          </p>
        </div>
      </div>

      {/* ── Tags ────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-1.5 px-5">
        <Badge variant="default">{prompt.jobTag}</Badge>
        <Badge variant="secondary">{prompt.purposeTag}</Badge>
        <span
          className={cn(
            "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium border",
            getToolColor(prompt.aiTool)
          )}
        >
          {prompt.aiTool}
        </span>
      </div>

      {/* ── Prompt Preview ──────────────────────────── */}
      <div className="mx-5 mt-3 rounded-lg bg-slate-50 border border-slate-100 p-3">
        <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 whitespace-pre-line">
          {highlightVariables(
            prompt.content.length > 180
              ? prompt.content.slice(0, 180) + "…"
              : prompt.content
          )}
        </p>
      </div>

      {/* ── Variables ───────────────────────────────── */}
      {variables.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 px-5 mt-2.5">
          <span className="text-[10px] font-medium text-slate-400 mr-1">
            변수:
          </span>
          {variables.slice(0, 4).map((v) => (
            <span
              key={v}
              className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 border border-amber-100"
            >
              {v}
            </span>
          ))}
          {variables.length > 4 && (
            <span className="text-[10px] text-slate-400">
              +{variables.length - 4}
            </span>
          )}
        </div>
      )}

      {/* ── Footer ──────────────────────────────────── */}
      <div className="mt-auto flex items-center justify-between border-t border-slate-100 px-5 py-3 mt-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <User className="h-3 w-3" />
          <span>{prompt.author}</span>
          <span className="mx-1">·</span>
          <Copy className="h-3 w-3" />
          <span>{prompt.copyCount.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs text-slate-500 hover:text-slate-700"
            onClick={() => onOpenDetail(prompt)}
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            상세
          </Button>
          <Button
            size="sm"
            className={cn(
              "h-7 px-3 text-xs",
              copied && "bg-emerald-600 hover:bg-emerald-600"
            )}
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 mr-1" />
                복사됨
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1" />
                복사
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
