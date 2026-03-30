"use client";

import { useState } from "react";

// =========================================================
// Nuflaat Mobile Homepage — Wireframe
// Next.js 14 (App Router) + Tailwind CSS
// Responsive: mobile-first (375px base) → tablet/desktop
// =========================================================

export default function NuflaatWireframe() {
  const [email, setEmail] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { label: "Slide 1" },
    { label: "Slide 2" },
    { label: "Slide 3" },
    { label: "Slide 4" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-black">

      {/* ── Announcement Bar ── */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
        <span className="text-xs text-gray-600">
          플러스친구 추가하고 최신 소식을 받아보세요
        </span>
        <button
          aria-label="닫기"
          className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-gray-500 hover:bg-gray-200"
        >
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b border-gray-200 bg-white px-4">
        {/* Hamburger */}
        <button aria-label="메뉴 열기" className="flex flex-col gap-1">
          <span className="block h-px w-4 bg-black" />
          <span className="block h-px w-4 bg-black" />
          <span className="block h-px w-4 bg-black" />
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <div className="h-4 w-20 rounded bg-gray-300" aria-label="Nuflaat 로고" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button aria-label="검색">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>
          {/* Cart */}
          <button aria-label="장바구니" className="relative">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[8px] text-white">
              0
            </span>
          </button>
        </div>
      </nav>

      {/* ── Hero Carousel ── */}
      <section className="relative overflow-hidden">
        {/* Placeholder image area */}
        <div className="relative aspect-[375/573] w-full bg-gray-200 md:aspect-[16/9]">
          {/* Slide indicator */}
          <div className="absolute left-4 top-4 rounded bg-white/80 px-2 py-1 text-xs text-gray-500">
            Hero Banner (슬라이드 {activeSlide + 1}/{slides.length})
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-gray-400/60 to-transparent" />

          {/* Hero content */}
          <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-4 px-4">
            <p className="text-center text-lg font-semibold tracking-widest text-white drop-shadow">
              Cracker Collection
            </p>
            <div className="flex w-full max-w-sm gap-2">
              <button className="flex-1 rounded border border-black bg-white py-2.5 text-xs font-medium text-black hover:bg-gray-50 active:bg-gray-100">
                AI 스티커 만들기
              </button>
              <button className="flex-1 rounded border border-black bg-white py-2.5 text-xs font-medium text-black hover:bg-gray-50 active:bg-gray-100">
                구매하기
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`슬라이드 ${i + 1}`}
                  onClick={() => setActiveSlide(i)}
                  className={`h-1 rounded-full transition-all ${
                    i === activeSlide ? "w-6 bg-white" : "w-3 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Package Section (Yellow BG) ── */}
      <section className="relative overflow-hidden bg-amber-100">
        <div className="relative aspect-[375/281] w-full bg-amber-200 md:aspect-[16/7]">
          <div className="absolute left-4 top-4 rounded bg-white/80 px-2 py-1 text-xs text-gray-500">
            패키지 이미지 영역
          </div>
          {/* Nuflaat package image placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-36 w-48 rounded border-2 border-dashed border-amber-400 bg-amber-50/50 flex items-center justify-center">
              <span className="text-xs text-amber-600">Nuflaat 패키지</span>
            </div>
          </div>
          {/* Top/Bottom gradient overlays */}
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-amber-200 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-amber-200 to-transparent" />
        </div>
      </section>

      {/* ── AI Sticker / Oven Section ── */}
      <section className="relative overflow-hidden">
        <div className="relative aspect-square w-full bg-gray-300 md:aspect-[16/9]">
          <div className="absolute left-4 top-4 rounded bg-white/80 px-2 py-1 text-xs text-gray-500">
            오븐/제품 이미지 영역
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-500/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <button className="rounded border border-black bg-white px-10 py-2.5 text-xs font-medium hover:bg-gray-50 active:bg-gray-100">
              AI 스티커 만들기
            </button>
          </div>
        </div>
      </section>

      {/* ── Collection / Model Section ── */}
      <section className="relative overflow-hidden">
        <div className="relative aspect-square w-full bg-gray-200 md:aspect-[16/9]">
          <div className="absolute left-4 top-4 rounded bg-white/80 px-2 py-1 text-xs text-gray-500">
            컬렉션 모델 이미지 영역
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-400/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-6 flex justify-center">
            <a
              href="#"
              className="rounded border border-black bg-white px-10 py-2.5 text-xs font-medium hover:bg-gray-50 active:bg-gray-100"
            >
              컬렉션 보기
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white px-4 pt-8 pb-6">

        {/* Newsletter */}
        <div className="mb-8">
          <h2 className="mb-1 text-xs font-semibold">뉴스레터</h2>
          <p className="mb-3 text-xs leading-relaxed text-gray-600">
            누플랏의 새로운 소식을 정기적으로 받아 보시려면 뉴스레터를
            구독해주세요.
          </p>
          <div className="flex overflow-hidden rounded border border-black">
            <input
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2.5 text-xs outline-none placeholder:text-gray-400"
            />
            <button className="border-l border-black px-4 py-2.5 text-xs font-medium hover:bg-gray-50">
              구독하기
            </button>
          </div>
        </div>

        {/* Links grid */}
        <div className="mb-8 grid grid-cols-2 gap-y-5 text-xs">
          <a href="#" className="hover:underline">문의하기</a>
          <a href="#" className="hover:underline">법적 고지</a>
          <a href="#" className="hover:underline">주문 조회</a>
          <a href="#" className="font-semibold hover:underline">개인정보 처리방침</a>
          <a href="#" className="hover:underline">매장 위치</a>
          <span />
          <a href="#" className="hover:underline">FAQ</a>
        </div>

        {/* Social */}
        <div className="mb-8 border-t border-gray-100 pt-6">
          <div className="flex flex-col gap-4 text-xs">
            <a href="#" className="hover:underline">인스타그램</a>
            <a href="#" className="hover:underline">카카오톡</a>
          </div>
        </div>

        {/* Business info */}
        <div className="border-t border-gray-100 pt-6 text-[10px] leading-relaxed text-gray-400">
          <p>
            ㈜아이아이컴바인드 | 대표자명: 김한국 | 주소: 서울특별시 성동구 뚝섬로 433 |
            대표번호: 1644-5792 | 이메일 문의: service.kr@nuflaat.com |
            사업자번호: 119-86-38589 | 통신판매신고번호: 제 2014-서울마포-1050 호
          </p>
          <p className="mt-2">
            <a href="#" className="underline">사업자정보확인</a>
            {" | "}
            <a href="#" className="underline">개인정보처리방침</a>
            {" | "}
            <a href="#" className="underline">이용약관</a>
            {" | 개인정보보호책임자: 정태호"}
          </p>
          <p className="mt-2">
            고객님의 안전한 현금자산 거래를 위하여 하나은행과 채무지급보증계약을
            체결하여 보장해드리고 있습니다.{" "}
            <a href="#" className="underline">서비스 가입사실 확인</a>
          </p>
          <p className="mt-4 font-medium text-gray-500">© 2025 Nuflaat</p>
        </div>
      </footer>
    </div>
  );
}