"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/mockData";
import {
  Search,
  Bell,
  Zap,
  ChevronDown,
} from "lucide-react";

export default function Header() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-md">
      {/* ── Search ─────────────────────────────────────────── */}
      <div className="relative flex-1 max-w-[560px]">
        <Search
          className={cn(
            "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-150",
            searchFocused ? "text-blue-500" : "text-slate-400"
          )}
        />
        <Input
          placeholder="프롬프트, 유즈케이스, 업무 키워드로 검색하세요..."
          className={cn(
            "h-10 pl-10 pr-4 bg-slate-50/80 border-slate-200/60 text-sm",
            "focus:bg-white focus:shadow-sm",
            searchFocused && "ring-2 ring-blue-500/20 border-blue-300"
          )}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* ── Right Section ─────────────────────────────────── */}
      <div className="flex items-center gap-2 ml-4">
        {/* Notification Bell */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[18px] w-[18px] text-slate-500" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
        </Button>

        {/* Divider */}
        <div className="mx-1 h-6 w-px bg-slate-200" />

        {/* Profile */}
        <button className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-slate-50">
          {/* Avatar */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white shadow-sm">
            {currentUser.name.charAt(0)}
          </div>

          {/* Name & Points */}
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm font-semibold text-slate-800 leading-tight">
              {currentUser.name}
            </span>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-amber-500" />
              <span className="text-[11px] font-medium text-amber-600">
                {currentUser.points.toLocaleString()} P
              </span>
            </div>
          </div>

          <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
}
