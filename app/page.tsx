"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// =========================================================
// Nuflaat Mobile Homepage — Wireframe
// Next.js 14 (App Router) + Tailwind CSS
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
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [activeIndex, duration, hasMultiple]);

  useEffect(() => {
    if (!hasMultiple) return;
    if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    slideTimerRef.current = setTimeout(goNext, duration);
    return () => {
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    };
  }, [activeIndex, duration, goNext, hasMultiple]);

  return (
    <section className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="relative w-full shrink-0"
            style={{ aspectRatio: "375 / 573", backgroundColor: banner.bgColor }}
          >
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
            <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-black/55 to-transparent" />

            {/* 하단 콘텐츠 */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-4 pb-10">
              {hasMultiple && (
                <div className="flex w-full gap-[3px]">
                  {banners.map((_, i) => (
                    <div key={i} className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/30">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-white"
                        style={{
                          width: i < activeIndex ? "100%" : i === activeIndex ? `${progress}%` : "0%",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
              <p className="w-full text-center text-lg font-semibold tracking-[0.08em] text-white drop-shadow-md">
                {banner.title}
              </p>
              {banner.ctas.length > 0 && (
                <div className="flex w-full gap-2">
                  {banner.ctas.slice(0, 2).map((cta, i) => (
                    <a
                      key={i}
                      href={cta.href}
                      className="flex flex-1 items-center justify-center rounded border border-black bg-white py-2.5 text-xs font-medium text-black hover:bg-gray-50 active:bg-gray-100"
                    >
                      {cta.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 데스크탑 좌우 화살표 */}
      {hasMultiple && (
        <>
          <button
            onClick={() => goToSlide((activeIndex - 1 + banners.length) % banners.length)}
            aria-label="이전 슬라이드"
            className="absolute left-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/20 p-1.5 hover:bg-black/40 md:flex"
          >
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((activeIndex + 1) % banners.length)}
            aria-label="다음 슬라이드"
            className="absolute right-2 top-1/2 z-20 hidden -translate-y-1/2 rounded-full bg-black/20 p-1.5 hover:bg-black/40 md:flex"
          >
            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}

export default function NuflaatWireframe() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white font-sans text-black">

      {/* ── Announcement Bar ── */}
      <div className="flex items-center justify-between bg-gray-100 px-4 py-2">
        <span className="text-xs text-gray-600">플러스친구 추가하고 최신 소식을 받아보세요</span>
        <button aria-label="닫기" className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-400 text-gray-500 hover:bg-gray-200">
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>
      </div>

      {/* ── GNB ── */}
      <nav className="sticky top-0 z-50 flex h-12 items-center justify-between border-b border-gray-200 bg-white px-4">
        <button aria-label="메뉴 열기" className="flex flex-col gap-1">
          <span className="block h-px w-4 bg-black" />
          <span className="block h-px w-4 bg-black" />
          <span className="block h-px w-4 bg-black" />
        </button>
        <span className="text-sm font-semibold tracking-widest">Nuflaat</span>
        <div className="flex items-center gap-3">
          <button aria-label="검색">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>
          <button aria-label="장바구니" className="relative">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
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
      <section className="relative overflow-hidden bg-[#edcb60]">
        <div className="relative aspect-[375/281] w-full md:aspect-[16/7]">
          <div className="absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-[#f0cf67] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-[#f0cf67] to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-44 w-56 flex-col items-center justify-center gap-2 rounded border-2 border-dashed border-yellow-700/30 bg-yellow-200/40">
              <svg className="h-10 w-10 text-yellow-800/40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="text-xs text-yellow-900/50">제품컷 이미지</span>
            </div>
          </div>
          <div className="absolute left-3 top-3 z-20 rounded bg-white/70 px-2 py-0.5 text-[10px] text-gray-500">
            제품컷 이미지 영역
          </div>
        </div>
      </section>

      {/* ── 오븐 섹션 — AI 스티커 만들기 ── */}
      {/* 피그마: 375×375, 다크 배경, 하단 중앙 버튼 */}
      <section className="relative overflow-hidden">
        <div className="relative aspect-square w-full bg-[#797979] md:aspect-[16/9]">
          <div className="absolute left-3 top-3 z-10 rounded bg-white/70 px-2 py-0.5 text-[10px] text-gray-500">
            이미지/영상 영역
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded border-2 border-dashed border-white/30 bg-white/10">
              <svg className="h-8 w-8 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          </div>
          {/* 피그마와 동일: 버튼이 배경 위에 플로팅, 하단 중앙 */}
          <div className="absolute inset-x-0 bottom-5 flex justify-center">
            <button className="w-[168px] rounded border border-black bg-white py-2.5 text-xs font-medium text-black hover:bg-gray-50">
              AI 스티커 만들기
            </button>
          </div>
        </div>
      </section>

      {/* ── 모델 섹션 — 컬렉션 보기 ── */}
      {/* 피그마: 375×375, 모델 이미지, 하단 중앙 버튼 */}
      <section className="relative overflow-hidden">
        <div className="relative aspect-square w-full bg-[#9e9e9e] md:aspect-[16/9]">
          <div className="absolute left-3 top-3 z-10 rounded bg-white/70 px-2 py-0.5 text-[10px] text-gray-500">
            이미지/영상 영역
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded border-2 border-dashed border-white/30 bg-white/10">
              <svg className="h-8 w-8 text-white/40" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          </div>
          {/* 피그마와 동일: 버튼이 배경 위에 플로팅, 하단 중앙 */}
          <div className="absolute inset-x-0 bottom-5 flex justify-center">
            <a
              href="https://www.nuflaat.com/kr/ko/category/collection/cracker"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[168px] items-center justify-center rounded border border-black bg-white py-2.5 text-xs font-medium text-black hover:bg-gray-50"
            >
              컬렉션 보기
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white px-4 pb-6 pt-8">
        <div className="mb-8">
          <h2 className="mb-1 text-xs font-semibold">뉴스레터</h2>
          <p className="mb-3 text-xs leading-relaxed text-gray-600">누플랏의 새로운 소식을 정기적으로 받아 보시려면 뉴스레터를 구독해주세요.</p>
          <div className="flex overflow-hidden rounded border border-black">
            <input type="email" placeholder="이메일 입력" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 px-3 py-2.5 text-xs outline-none placeholder:text-gray-400" />
            <button className="border-l border-black px-4 py-2.5 text-xs font-medium hover:bg-gray-50">구독하기</button>
          </div>
        </div>
        <div className="mb-8 grid grid-cols-2 gap-y-5 text-xs">
          <a href="#" className="hover:underline">문의하기</a>
          <a href="#" className="hover:underline">법적 고지</a>
          <a href="#" className="hover:underline">주문 조회</a>
          <a href="#" className="font-semibold hover:underline">개인정보 처리방침</a>
          <a href="#" className="hover:underline">매장 위치</a>
          <span />
          <a href="#" className="hover:underline">FAQ</a>
        </div>
        <div className="mb-8 border-t border-gray-100 pt-6">
          <div className="flex flex-col gap-4 text-xs">
            <a href="#" className="hover:underline">인스타그램</a>
            <a href="#" className="hover:underline">카카오톡</a>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6 text-[10px] leading-relaxed text-gray-400">
          <p>㈜아이아이컴바인드 | 대표자명: 김한국 | 주소: 서울특별시 성동구 뚝섬로 433 | 대표번호: 1644-5792 | 이메일 문의: service.kr@nuflaat.com | 사업자번호: 119-86-38589 | 통신판매신고번호: 제 2014-서울마포-1050 호</p>
          <p className="mt-2">
            <a href="#" className="underline">사업자정보확인</a>{" | "}
            <a href="#" className="underline">개인정보처리방침</a>{" | "}
            <a href="#" className="underline">이용약관</a>{" | 개인정보보호책임자: 정태호"}
          </p>
          <p className="mt-2">고객님의 안전한 현금자산 거래를 위하여 하나은행과 채무지급보증계약을 체결하여 보장해드리고 있습니다.{" "}<a href="#" className="underline">서비스 가입사실 확인</a></p>
          <p className="mt-4 font-medium text-gray-500">© 2025 Nuflaat</p>
        </div>
      </footer>
    </div>
  );
}