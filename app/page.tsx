"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// =========================================================
// Nuflaat Homepage — Wireframe
// Next.js 14 (App Router) + Tailwind CSS
// 모바일(375px) / 태블릿(768px) / 데스크탑(1280px+) 반응형
// =========================================================

type BannerItem = {
  id: number;
  type: "image" | "video";
  bgColor: string;
  label: string;
  title: string;
  ctas: { label: string; href: string }[];
  videoDuration?: number;
};

const DUMMY_BANNERS: BannerItem[] = [
  {
    id: 1,
    type: "image",
    bgColor: "#c9b8b0",
    label: "Banner Image 1",
    title: "Cracker Collection",
    ctas: [
      { label: "AI 스티커 만들기", href: "#" },
      { label: "구매하기", href: "#" },
    ],
  },
  {
    id: 2,
    type: "video",
    bgColor: "#b0bcc9",
    label: "Banner Video 1",
    title: "Cracker Collection",
    ctas: [
      { label: "AI 스티커 만들기", href: "#" },
      { label: "구매하기", href: "#" },
    ],
    videoDuration: 12,
  },
  {
    id: 3,
    type: "image",
    bgColor: "#c9c4b0",
    label: "Banner Image 2",
    title: "Cracker Collection",
    ctas: [
      { label: "AI 스티커 만들기", href: "#" },
      { label: "구매하기", href: "#" },
    ],
  },
  {
    id: 4,
    type: "video",
    bgColor: "#b8c9b0",
    label: "Banner Video 2",
    title: "Cracker Collection",
    ctas: [
      { label: "AI 스티커 만들기", href: "#" },
      { label: "구매하기", href: "#" },
    ],
    videoDuration: 8,
  },
];

function getSlideDuration(slide: BannerItem): number {
  if (slide.type === "video" && slide.videoDuration) {
    return slide.videoDuration * 1000;
  }
  return 6000;
}

// ── 메인 배너 ────────────────────────────────────────────────
function MainBanner({ banners }: { banners: BannerItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const hasMultiple = banners.length > 1;
  const current = banners[activeIndex];
  const duration = getSlideDuration(current);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % banners.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, [banners.length]);

  useEffect(() => {
    if (!hasMultiple) return;
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    startTimeRef.current = Date.now();
    setProgress(0);
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setProgress(Math.min((elapsed / duration) * 100, 100));
    }, 50);
    return () => { if (progressIntervalRef.current) clearInterval(progressIntervalRef.current); };
  }, [activeIndex, duration, hasMultiple]);

  useEffect(() => {
    if (!hasMultiple) return;
    if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    slideTimerRef.current = setTimeout(goNext, duration);
    return () => { if (slideTimerRef.current) clearTimeout(slideTimerRef.current); };
  }, [activeIndex, duration, goNext, hasMultiple]);

  return (
    <section className="relative overflow-hidden">
      {/* 슬라이드 트랙 */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative w-full shrink-0"
            style={{
              // 모바일: 375:573 비율 / 데스크탑: 100vh 풀스크린
              aspectRatio: "375 / 573",
              backgroundColor: banner.bgColor,
            }}
          >
            {/* 데스크탑에서는 aspect-ratio 무시하고 100vh 사용 */}
            <style>{`
              @media (min-width: 1024px) {
                .banner-slide { aspect-ratio: unset !important; height: 100vh; }
              }
            `}</style>

            {/* 와이어프레임 레이블 */}
            <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded bg-white/70 px-2 py-0.5 text-[10px] text-gray-500">
              {banner.label}
              {banner.type === "video" && (
                <span className="rounded bg-gray-200 px-1 text-[9px]">VIDEO {banner.videoDuration}s</span>
              )}
            </div>

            {/* 미디어 플레이스홀더 */}
            <div className="absolute inset-0 flex items-center justify-center">
              {banner.type === "video" ? (
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/60 bg-black/20">
                  <svg className="ml-1 h-7 w-7 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded border-2 border-dashed border-white/40 bg-white/10">
                  <svg className="h-8 w-8 text-white/50" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
              )}
            </div>

            {/* 하단 그라디언트 */}
            <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/55 to-transparent lg:h-80" />

            {/* 콘텐츠 영역 */}
            {/* 모바일: 좌우 패딩 16px, 버튼 전체 너비 / 데스크탑: 중앙 정렬, 버튼 고정 너비 */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 pb-10 lg:pb-16">
              <p className="w-full text-center text-lg font-semibold tracking-[0.08em] text-white drop-shadow-md lg:text-2xl">
                {banner.title}
              </p>
              {banner.ctas.length > 0 && (
                <div className="flex w-full gap-2 lg:w-auto lg:gap-3">
                  {banner.ctas.slice(0, 2).map((cta, i) => (
                    <a
                      key={i}
                      href={cta.href}
                      className="flex flex-1 items-center justify-center rounded border border-black bg-white py-2.5 text-xs font-medium text-black hover:bg-gray-50 lg:flex-none lg:w-40 lg:py-3 lg:text-sm"
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              )}
              {/* 프로그래스 바 (배너 2개 이상일 때만) */}
              {hasMultiple && (
                <div className="flex w-full gap-[3px] lg:max-w-sm">
                  {banners.map((_, i) => (
                    <div key={i} className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/30">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-white"
                        style={{ width: i < activeIndex ? "100%" : i === activeIndex ? `${progress}%` : "0%" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 좌우 화살표 (데스크탑) */}
      {hasMultiple && (
        <>
          <button
            onClick={() => goToSlide((activeIndex - 1 + banners.length) % banners.length)}
            aria-label="이전"
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/20 p-2 hover:bg-black/40 lg:flex"
          >
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((activeIndex + 1) % banners.length)}
            aria-label="다음"
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/20 p-2 hover:bg-black/40 lg:flex"
          >
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}

// ── 메인 페이지 ───────────────────────────────────────────────
export default function NuflaatWireframe() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans text-black">

      {/* ── Announcement Bar ── */}
      <div className="relative flex items-center justify-center bg-gray-100 px-8 py-2">
        <span className="text-center text-xs text-gray-600">
          플러스친구 추가하고 최신 소식을 받아보세요
        </span>
        <button aria-label="닫기" className="absolute right-4 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-gray-400 text-gray-500 hover:bg-gray-200">
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>
      </div>

      {/* ── GNB ── */}
      <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b border-gray-200 bg-white px-4 lg:h-[60px] lg:px-8">

        {/* 모바일: 햄버거 | 데스크탑: 좌측 메뉴 */}
        <div className="flex items-center">
          {/* 햄버거 (모바일만) */}
          <button aria-label="메뉴 열기" className="flex flex-col gap-1 lg:hidden">
            <span className="block h-px w-4 bg-black" />
            <span className="block h-px w-4 bg-black" />
            <span className="block h-px w-4 bg-black" />
          </button>
          {/* 텍스트 메뉴 (데스크탑만) */}
          <div className="hidden items-center gap-6 text-sm lg:flex">
            {["세트", "커트러리", "테이블웨어", "컬렉션", "스타일링"].map((item) => (
              <a key={item} href="#" className="hover:opacity-60 transition-opacity">{item}</a>
            ))}
          </div>
        </div>

        {/* 로고: 모바일 중앙 / 데스크탑 절대 중앙 */}
        <span className="text-sm font-semibold tracking-widest lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:text-base">
          Nuflaat
        </span>

        {/* 우측 아이콘 */}
        <div className="flex items-center gap-3 lg:gap-5">
          {/* 검색 */}
          <button aria-label="검색" className="hidden lg:flex text-sm hover:opacity-60">
            검색
          </button>
          <button aria-label="검색" className="lg:hidden">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>
          {/* 로그인 (데스크탑만) */}
          <a href="#" className="hidden text-sm hover:opacity-60 lg:block">로그인</a>
          {/* 위시리스트 (데스크탑만) */}
          <button aria-label="위시리스트" className="hidden lg:flex">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
          {/* 장바구니 */}
          <button aria-label="장바구니" className="relative">
            <svg className="h-4 w-4 lg:h-5 lg:w-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[8px] text-white">0</span>
          </button>
        </div>
      </nav>

      {/* ── 메인 배너 ── */}
      <MainBanner banners={DUMMY_BANNERS} />

      {/* ── 제품컷 단독 영역 ── */}
      {/* 모바일: 375:281 비율 / 데스크탑: 50vh */}
      <section className="relative overflow-hidden bg-[#edcb60]">
        <div
          className="relative w-full"
          style={{ aspectRatio: "375 / 281" }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .product-shot { aspect-ratio: unset !important; height: 50vh; min-height: 320px; }
            }
          `}</style>
          <div className="absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[#f0cf67] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#f0cf67] to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-yellow-700/30 bg-yellow-200/40 px-8 py-6 lg:px-16 lg:py-12">
              <svg className="h-10 w-10 text-yellow-800/40 lg:h-16 lg:w-16" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="text-xs text-yellow-900/50 lg:text-sm">제품컷 이미지</span>
            </div>
          </div>
          <div className="absolute left-3 top-3 z-20 rounded bg-white/70 px-2 py-0.5 text-[10px] text-gray-500">
            제품컷 이미지 영역
          </div>
        </div>
      </section>

      {/* ── 오븐 + 모델 섹션 ── */}
      {/* 모바일: 세로로 쌓임 / 데스크탑: 좌우 50:50 나란히 */}
      <section className="flex flex-col lg:flex-row">

        {/* 오븐 — AI 스티커 만들기 */}
        <div className="relative aspect-square w-full bg-[#797979] lg:aspect-auto lg:h-[60vh] lg:w-1/2">
          <div className="absolute left-3 top-3 z-10 rounded bg-white/70 px-2 py-0.5 text-[10px] text-gray-500">이미지/영상 영역</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded border-2 border-dashed border-white/30 bg-white/10 lg:h-32 lg:w-32">
              <svg className="h-8 w-8 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-5 flex justify-center lg:bottom-8">
            <button className="w-[168px] rounded border border-black bg-white py-2.5 text-xs font-medium text-black hover:bg-gray-50 lg:w-48 lg:py-3 lg:text-sm">
              AI 스티커 만들기
            </button>
          </div>
        </div>

        {/* 모델 — 컬렉션 보기 */}
        <div className="relative aspect-square w-full bg-[#9e9e9e] lg:aspect-auto lg:h-[60vh] lg:w-1/2">
          <div className="absolute left-3 top-3 z-10 rounded bg-white/70 px-2 py-0.5 text-[10px] text-gray-500">이미지/영상 영역</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded border-2 border-dashed border-white/30 bg-white/10 lg:h-32 lg:w-32">
              <svg className="h-8 w-8 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-5 flex justify-center lg:bottom-8">
            <a
              href="https://www.nuflaat.com/kr/ko/category/collection/cracker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[168px] items-center justify-center rounded border border-black bg-white py-2.5 text-xs font-medium text-black hover:bg-gray-50 lg:w-48 lg:py-3 lg:text-sm"
            >
              컬렉션 보기
            </a>
          </div>
        </div>

      </section>

      {/* ── Footer ── */}
      {/* 모바일: 단일 컬럼 / 데스크탑: 1920px 기준 가로 레이아웃 */}
      <footer className="border-t border-gray-100 bg-white px-4 pb-6 pt-8 lg:px-8 xl:px-[30px]">

        {/* 데스크탑 푸터 상단: 링크 가로 배치 */}
        <div className="mb-6 hidden items-start gap-16 lg:flex">
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:underline">문의하기</a>
            <a href="#" className="hover:underline">주문 조회</a>
            <a href="#" className="hover:underline">매장 위치</a>
            <a href="#" className="hover:underline">FAQ</a>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:underline">법적 고지</a>
            <a href="#" className="font-semibold hover:underline">개인정보 처리방침</a>
          </div>
          <div className="ml-auto flex gap-6 text-sm">
            <a href="#" className="hover:underline">인스타그램</a>
            <a href="#" className="hover:underline">카카오톡</a>
          </div>
        </div>

        {/* 모바일 링크 그리드 */}
        <div className="mb-8 grid grid-cols-2 gap-y-5 text-xs lg:hidden">
          <a href="#" className="hover:underline">문의하기</a>
          <a href="#" className="hover:underline">법적 고지</a>
          <a href="#" className="hover:underline">주문 조회</a>
          <a href="#" className="font-semibold hover:underline">개인정보 처리방침</a>
          <a href="#" className="hover:underline">매장 위치</a>
          <span />
          <a href="#" className="hover:underline">FAQ</a>
        </div>
        <div className="mb-8 border-t border-gray-100 pt-6 lg:hidden">
          <div className="flex flex-col gap-4 text-xs">
            <a href="#" className="hover:underline">인스타그램</a>
            <a href="#" className="hover:underline">카카오톡</a>
          </div>
        </div>

        {/* 뉴스레터 + 구분선 */}
        <div className="mb-8 border-t border-gray-100 pt-6 lg:flex lg:items-start lg:justify-between lg:gap-16">
          <div className="lg:max-w-md">
            <h2 className="mb-1 text-xs font-semibold lg:text-sm">뉴스레터</h2>
            <p className="mb-3 text-xs leading-relaxed text-gray-600 lg:text-sm">
              누플랏의 새로운 소식을 정기적으로 받아 보시려면 뉴스레터를 구독해주세요.
            </p>
            <div className="flex overflow-hidden rounded border border-black">
              <input
                type="email"
                placeholder="이메일 입력"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2.5 text-xs outline-none placeholder:text-gray-400 lg:text-sm"
              />
              <button className="border-l border-black px-4 py-2.5 text-xs font-medium hover:bg-gray-50 lg:text-sm">
                구독하기
              </button>
            </div>
          </div>
        </div>

        {/* 사업자 정보 */}
        <div className="border-t border-gray-100 pt-6 text-[10px] leading-relaxed text-gray-400 lg:flex lg:items-start lg:justify-between lg:text-[11px]">
          <div>
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
          </div>
          <p className="mt-4 font-medium text-gray-500 lg:mt-0 lg:ml-8 lg:flex-shrink-0">© 2025 Nuflaat</p>
        </div>
      </footer>
    </div>
  );
}