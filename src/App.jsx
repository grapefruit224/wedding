import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const SPLASH_DURATION = 2600;

const navItems = [
  { id: "main", label: "메인" },
  { id: "message", label: "인사말" },
  { id: "intro", label: "소개" },
  { id: "calendar", label: "달력" },
  { id: "gallery", label: "갤러리" },
  { id: "location", label: "오시는 길" },
  { id: "accounts", label: "계좌번호" },
  { id: "rsvp", label: "참석여부" },
  { id: "guestbook", label: "방명록" },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80",
];

const groomAccounts = [
  { role: "신랑", bank: "국민", number: "720501-01-466685", name: "김동수" },
  { role: "신랑 아버지", bank: "국민", number: "287-21-0250-701", name: "김태일" },
  { role: "신랑 어머니", bank: "케이뱅크", number: "100-135-623282", name: "임희원" },
];

const brideAccounts = [
  { role: "신부", bank: "국민", number: "285101-04-202631", name: "박경은" },
  { role: "신부 아버지", bank: "우리", number: "350-089140-02-001", name: "박대용" },
  { role: "신부 어머니", bank: "국민", number: "285102-04-287022", name: "황일주" },
];

function SectionTitle({ children }) {
  return <h3 className="section-title">{children}</h3>;
}

function RevealSection({ id, children, className = "" }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function AccountSection({ title, items }) {
  return (
    <div>
      <h4 className="account-title">{title}</h4>
      <div className="account-list">
        {items.map((item) => (
          <motion.div
            key={`${title}-${item.role}`}
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55 }}
            className="account-card"
          >
            <div className="account-role">{item.role}</div>
            <div className="account-number">{item.number}</div>
            <div className="account-bank">{item.bank} {item.name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SplashOverlay({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="splash-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <div className="splash-bg" />

          <motion.div
            className="splash-copy-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="splash-copy">
              <p className="splash-eyebrow">Wedding Invitation</p>
              <h1 className="splash-title">We’re getting married.</h1>
            </div>
          </motion.div>

          <motion.div
            className="curtain left"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ delay: 0.15, duration: 1.0, ease: [0.7, 0, 0.3, 1] }}
          >
            <div className="curtain-line" />
            <div className="curtain-glow" />
          </motion.div>

          <motion.div
            className="curtain right"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ delay: 0.15, duration: 1.0, ease: [0.7, 0, 0.3, 1] }}
          >
            <div className="curtain-line" />
            <div className="curtain-glow" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showAllGallery, setShowAllGallery] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.12, 0.28], [0.92, 1, 1.04]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [0.45, 1, 1]);
  const heroImageScale = useTransform(scrollYProgress, [0, 0.12, 0.28], [1.12, 1.03, 0.98]);

  useEffect(() => {
    setShowSplash(true);
    setIsReady(true);

    const timerId = window.setTimeout(() => {
      setShowSplash(false);
    }, SPLASH_DURATION);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  const visibleGallery = useMemo(
    () => (showAllGallery ? galleryImages : galleryImages.slice(0, 4)),
    [showAllGallery]
  );

  if (!isReady) return null;

  return (
    <div className="app-shell">
      <SplashOverlay show={showSplash} />

      <nav className="sticky-nav">
        <div className="nav-inner">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav-item">
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="main-wrap">
        <motion.section
          id="main"
          className="hero-section"
          style={isMounted ? { scale: heroScale, opacity: heroOpacity } : undefined}
        >
          <motion.p
            className="couple-mark"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            동수 경은
          </motion.p>

          <motion.div
            className="hero-card"
            initial={{ opacity: 0, scale: 0.96, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
              alt="샘플 웨딩 메인"
              className="hero-image"
              style={isMounted ? { scale: heroImageScale } : undefined}
            />
          </motion.div>

          <motion.p
            className="hero-meta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            2026년 3월 28일 토요일 오후 1시 30분
          </motion.p>
          <motion.p
            className="hero-meta"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38 }}
          >
            DMC타워웨딩 4F 펠리체 홀
          </motion.p>
          <motion.div
            className="scroll-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            스크롤
          </motion.div>
        </motion.section>

        <RevealSection id="message" className="section no-border center-text">
          <SectionTitle>소중한 분들을 초대합니다.</SectionTitle>
          <div className="message-copy">
            <p>서로의 시간을 차곡차곡 쌓아온 지 1220일,</p>
            <p>이제 두 사람은 연인을 넘어</p>
            <p>부부라는 이름으로 같은 길을 걷고자 합니다.</p>
            <p className="message-gap">소중한 분들을 모시고</p>
            <p>그 시작의 순간을 함께하고 싶습니다.</p>
            <p>귀한 걸음으로 축복해 주시면 감사하겠습니다.</p>
          </div>
        </RevealSection>

        <RevealSection id="intro" className="section">
          <SectionTitle>소개</SectionTitle>
          <div className="intro-grid">
            <div>
              <div className="muted-sm">故 김태일 · 故 임희원</div>
              <div>의 아들</div>
              <div className="name-lg">김동수</div>
            </div>
            <div>
              <div className="muted-sm">故 박대용 · 故 황일주</div>
              <div>의 딸</div>
              <div className="name-lg">박경은</div>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="calendar" className="section center-text">
          <SectionTitle>예식 안내</SectionTitle>
          <div className="message-copy">
            <p>2026년 3월 28일 토요일 오후 1시 30분</p>
            <p>DMC타워웨딩 4F 펠리체 홀</p>
          </div>

          <motion.div
            className="calendar-card"
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <p className="calendar-month">3월</p>
            <div className="calendar-grid">
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <div key={day}>{day}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                const isWeddingDay = date === 28;
                return (
                  <div key={date} className="calendar-cell">
                    <div className={isWeddingDay ? "calendar-badge" : undefined}>{date}</div>
                    {isWeddingDay && <div className="calendar-note">오후1:30</div>}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="countdown">
            <p>동수 경은 결혼식까지</p>
            <strong>D-128</strong>
          </div>
        </RevealSection>

        <RevealSection id="gallery" className="section">
          <SectionTitle>갤러리</SectionTitle>
          <div className="gallery-grid">
            {visibleGallery.map((src, idx) => (
              <motion.div
                key={src}
                className={idx === 0 ? "gallery-span" : undefined}
                initial={{ opacity: 0, scale: 0.96, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: idx * 0.06 }}
              >
                <img
                  src={src}
                  alt={`웨딩 샘플 ${idx + 1}`}
                  className={idx === 0 ? "gallery-main" : "gallery-sub"}
                />
              </motion.div>
            ))}
          </div>

          {!showAllGallery && (
            <button type="button" onClick={() => setShowAllGallery(true)} className="full-button">
              더 보기
            </button>
          )}
        </RevealSection>

        <RevealSection id="location" className="section">
          <SectionTitle>오시는 길</SectionTitle>
          <div className="center-text message-copy">
            <p style={{ color: "#333" }}>DMC타워웨딩</p>
            <p>4F 펠리체 홀</p>
            <p>서울 마포구 성암로 189</p>
          </div>

          <motion.div
            className="white-card map-card"
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
              alt="샘플 지도"
              className="map-image"
            />
          </motion.div>

          <div className="button-row">
            {["티맵", "카카오내비", "네이버지도"].map((item) => (
              <button key={item} type="button" className="pill-button">
                {item}
              </button>
            ))}
          </div>

          <div className="info-stack">
            <div>
              <strong>지하철</strong>
              <p>[6호선, 공항철도, 경의중앙선]</p>
              <p>디지털미디어시티역(DMC) 8번 출구 연결</p>
            </div>
            <div>
              <strong>자가용</strong>
              <p>서울시 마포구 성암로 189 DMC 타워웨딩</p>
              <p>(2시간 무료)</p>
              <p>1주차장 : DMC 타워웨딩 건물 내 주차 가능</p>
              <p>2주차장 : 한샘상암사옥 건물 내 주차 가능</p>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="accounts" className="section">
          <SectionTitle>마음 전하실 곳</SectionTitle>
          <div className="accounts-grid">
            <AccountSection title="신랑 측" items={groomAccounts} />
            <AccountSection title="신부 측" items={brideAccounts} />
          </div>
        </RevealSection>

        <RevealSection id="rsvp" className="section center-text">
          <SectionTitle>참석 여부 전달</SectionTitle>
          <div className="rsvp-copy">
            <p>참석해주시는 소중한 분들을 정성껏 모시기 위해,</p>
            <p>신랑&신부에게 참석 여부를 꼭 전달해주시면 감사하겠습니다.</p>
          </div>

          <motion.div
            className="rsvp-card"
            initial={{ opacity: 0, scale: 0.97, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="toggle-row">
              <button type="button" className="dark-button">참석</button>
              <button type="button" className="light-button">불참석</button>
            </div>

            <input type="text" placeholder="성함" className="text-input" />

            <label className="checkbox-row">
              <input type="checkbox" />
              <span>개인정보 수집 및 활용 동의</span>
            </label>

            <button type="button" className="full-dark">전달</button>
          </motion.div>
        </RevealSection>

        <RevealSection id="guestbook" className="section center-text">
          <SectionTitle>방명록</SectionTitle>
          <div className="guestbook-actions">
            <button type="button" className="light-button" style={{ maxWidth: 120 }}>전체보기</button>
            <button type="button" className="dark-button" style={{ maxWidth: 120 }}>작성</button>
          </div>
        </RevealSection>
      </main>
    </div>
  );
}
