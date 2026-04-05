import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "AI-X Hub | 사내 AI 지식 포털",
  description:
    "임직원의 AI 활용 노하우를 자산화하고 공유하는 엔터프라이즈 AI 지식 포털",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50 antialiased">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Area (offset by sidebar width) */}
        <div className="pl-[260px]">
          {/* Header */}
          <Header />

          {/* Content */}
          <main className="min-h-[calc(100vh-64px)] px-6 py-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
