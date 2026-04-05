"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Library,
  Rocket,
  PenSquare,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const navItems = [
  {
    label: "대시보드",
    href: "/",
    icon: LayoutDashboard,
    description: "전사 AI 활용 현황",
  },
  {
    label: "프롬프트 라이브러리",
    href: "/prompts",
    icon: Library,
    description: "검증된 프롬프트 모음",
  },
  {
    label: "우수 유즈케이스",
    href: "/usecases",
    icon: Rocket,
    description: "시간 절감 사례",
  },
  {
    label: "새 글 쓰기",
    href: "/write",
    icon: PenSquare,
    description: "프롬프트·사례 공유",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-slate-200/80 bg-white">
      {/* ── Logo ─────────────────────────────────────────── */}
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] font-bold tracking-tight text-slate-900">
            AI-X Hub
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">
            Enterprise AI Portal
          </span>
        </div>
      </div>

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          메뉴
        </p>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-[18px] w-[18px] flex-shrink-0 transition-colors",
                  isActive
                    ? "text-blue-600"
                    : "text-slate-400 group-hover:text-slate-600"
                )}
              />
              <div className="flex flex-1 flex-col">
                <span>{item.label}</span>
              </div>
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 text-blue-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom Info ───────────────────────────────────── */}
      <div className="border-t border-slate-100 px-4 py-4">
        <div className="rounded-lg bg-gradient-to-br from-slate-50 to-blue-50/50 p-3">
          <p className="text-[11px] font-semibold text-slate-500">
            전사 누적 절감 시간
          </p>
          <p className="mt-0.5 text-xl font-bold tracking-tight text-blue-700">
            475<span className="ml-0.5 text-sm font-medium text-blue-500">시간</span>
          </p>
          <p className="mt-1 text-[10px] text-slate-400">
            2025년 3월 기준
          </p>
        </div>
      </div>
    </aside>
  );
}
