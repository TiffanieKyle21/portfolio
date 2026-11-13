import React, { useEffect, useRef, useState } from "react";

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("tg-theme") || "";
    } catch {
      return "";
    }
  });
  const [introVisible, setIntroVisible] = useState(() => {
    try {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        sessionStorage.getItem("tg-intro") !== "1";
    } catch {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("school");
  const [projectFilter, setProjectFilter] = useState("all");
  const [projectDetail, setProjectDetail] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [toast, setToast] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [activeDock, setActiveDock] = useState("home");
  const sheetRef = useRef(null);
  const certificateDialogRef = useRef(null);
  const toastTimerRef = useRef(null);
  const darkMode = theme === "dark" ||
    (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 2000);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.setAttribute("data-theme", theme);
      try {
        localStorage.setItem("tg-theme", theme);
      } catch {
        // The visual preference still applies when storage is unavailable.
      }
    } else {
      root.removeAttribute("data-theme");
    }
  }, [theme]);

  useEffect(() => {
    if (!introVisible) return undefined;
    try {
      sessionStorage.setItem("tg-intro", "1");
    } catch {
      // The intro remains dismissible even when session storage is unavailable.
    }
    const timer = window.setTimeout(() => setIntroVisible(false), 2700);
    return () => window.clearTimeout(timer);
  }, [introVisible]);

  useEffect(() => {
    document.documentElement.classList.toggle("drawer-open", sidebarOpen);
    return () => document.documentElement.classList.remove("drawer-open");
  }, [sidebarOpen]);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-dock]");
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          setActiveDock(entry.target.getAttribute("data-dock"));
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = sheetRef.current;
    if (!dialog) return;
    if (projectDetail && !dialog.open) dialog.showModal();
    if (!projectDetail && dialog.open) dialog.close();
  }, [projectDetail]);

  useEffect(() => {
    const dialog = certificateDialogRef.current;
    if (!dialog) return;
    if (certificate && !dialog.open) dialog.showModal();
    if (!certificate && dialog.open) dialog.close();
  }, [certificate]);

  useEffect(() => () => window.clearTimeout(toastTimerRef.current), []);

  const handleClick = async (event) => {
    const target = event.target.closest("button, a, .intro, .side-backdrop, dialog");
    if (!target) return;

    if (target.id === "intro") {
      setIntroVisible(false);
    } else if (target.id === "menu-btn") {
      setSidebarOpen(true);
    } else if (target.id === "side-close" || target.id === "side-backdrop") {
      setSidebarOpen(false);
      if (target.id === "side-close") document.getElementById("menu-btn")?.focus();
    } else if (target.id === "theme-btn") {
      setTheme(darkMode ? "light" : "dark");
    } else if (target.getAttribute("role") === "tab") {
      setActiveTab(target.id === "tab-work" ? "work" : "school");
    } else if (target.matches(".filter")) {
      setProjectFilter(target.dataset.filter);
    } else if (target.dataset.sheet) {
      const card = target.closest(".pcard");
      setProjectDetail({
        key: target.dataset.sheet,
        title: card?.querySelector("h3")?.textContent || "Project",
      });
    } else if (target.matches("a.cert")) {
      event.preventDefault();
      setCertificate({
        title: target.dataset.title,
        image: target.getAttribute("href"),
        meta: target.dataset.meta || "",
        verify: target.dataset.verify || "",
      });
    } else if (target.matches("button[data-copy]")) {
      const value = target.dataset.copy;
      try {
        await navigator.clipboard.writeText(value);
        showToast(`Copied: ${value}`);
      } catch {
        const content = document.getElementById(target.dataset.target);
        if (content) {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(content);
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
        showToast("Select the text and press Ctrl+C to copy.");
      }
    } else if (target.id === "sheet-close") {
      setProjectDetail(null);
    } else if (target.id === "cert-dialog-close") {
      setCertificate(null);
    } else if (target.matches(".sidebar .side-nav a")) {
      setSidebarOpen(false);
    } else if (target.matches("dialog") && event.target === target) {
      if (target === sheetRef.current) setProjectDetail(null);
      if (target === certificateDialogRef.current) setCertificate(null);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setSidebarOpen(false);
      setProjectDetail(null);
      setCertificate(null);
    }
    if (
      event.target.getAttribute("role") === "tab" &&
      (event.key === "ArrowRight" || event.key === "ArrowLeft")
    ) {
      event.preventDefault();
      const nextTab = activeTab === "school" ? "work" : "school";
      setActiveTab(nextTab);
      document.getElementById(`tab-${nextTab}`)?.focus();
    }
  };

  return (
    <div className="app-root" onClick={handleClick} onKeyDown={handleKeyDown}>
<div className={`intro${introVisible ? "" : " done"}`} id="intro" aria-hidden="true">
  <div className="intro-card">
    <span className="intro-name">
      Tiffanie Gutierrez
    </span>
    <svg viewBox="0 0 240 120">
      <path className="intro-grid" d="M0 30 H240 M0 60 H240 M0 90 H240">
      </path>
      <polygon className="intro-band" points="150,52 180,40 210,28 238,32 238,72 210,66 180,74 150,52">
      </polygon>
      <polyline className="intro-line" points="4,100 26,86 48,92 70,72 92,78 114,60 136,64 150,52">
      </polyline>
      <polyline className="intro-fc" points="150,52 180,56 210,46 238,52">
      </polyline>
      <circle className="intro-dot" cx="150" cy="52" r="6">
      </circle>
    </svg>
    <ol className="intro-steps">
      <li>
        Cleaning data
      </li>
      <li>
        Finding patterns
      </li>
      <li>
        Insights ready
      </li>
    </ol>
  </div>
</div>
<div className="side-backdrop" id="side-backdrop" hidden={!sidebarOpen}>
</div>
<aside className={`sidebar${sidebarOpen ? " open" : ""}`} id="sidebar" aria-label="Profile and menu">
  <button className="side-close" type="button" id="side-close" aria-label="Close menu">
    ×
  </button>
  <div className="side-top">
    <img className="side-photo" src="/photo.jpg" alt="Tiffanie Kyle R. Gutierrez" width="900" height="900" />
    <div className="side-name">
      Tiffanie Gutierrez
    </div>
    <div className="side-sub">
      BSIT · Data & Business Analytics
    </div>
  </div>
  <ul className="socials">
    <li>
      <a className="soc" href="https://www.facebook.com/tiffanie.kyle.2024" target="_blank" rel="noopener">
        <span className="circle">
          <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="9" cy="8" r="3.2">
            </circle>
            <path d="M3 19a6 6 0 0 1 12 0">
            </path>
            <circle cx="17" cy="9" r="2.4">
            </circle>
            <path d="M15.5 14.2A5 5 0 0 1 21 19">
            </path>
          </svg>
        </span>
        Facebook
      </a>
    </li>
    <li>
      <a className="soc" href="https://www.linkedin.com/in/tiffanie-gutierrez-517857404" target="_blank" rel="noopener">
        <span className="circle">
          <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2">
            </rect>
            <circle cx="8.5" cy="11" r="2">
            </circle>
            <path d="M5.5 16a3 3 0 0 1 6 0M14 10h4M14 13.5h4">
            </path>
          </svg>
        </span>
        LinkedIn
      </a>
    </li>
    <li>
      <a className="soc" href="https://github.com/TiffanieKyle21" target="_blank" rel="noopener">
        <span className="circle">
          <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14">
            </path>
          </svg>
        </span>
        GitHub
      </a>
    </li>
    <li>
      <button className="soc" type="button" id="theme-btn" aria-pressed={darkMode}>
        <span className="circle">
          <svg className="i moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z">
            </path>
          </svg>
          <svg className="i sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4">
            </circle>
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4">
            </path>
          </svg>
        </span>
        Dark mode
      </button>
    </li>
  </ul>
  <nav className="side-nav" aria-label="Sections">
    <a href="#home" data-nav="home" aria-current={activeSection === "home" ? "true" : undefined}>
      <svg className="nav-ic" viewBox="0 0 24 24" aria-hidden="true">
        <path className="a" d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z">
        </path>
        <rect className="b" x="8" y="16" width="8" height="2.4" rx="1.2">
        </rect>
      </svg>
      Home
    </a>
    <a href="#projects" data-nav="projects" aria-current={activeSection === "projects" ? "true" : undefined}>
      <svg className="nav-ic" viewBox="0 0 24 24" aria-hidden="true">
        <path className="a" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1H3z">
        </path>
        <path className="b" d="M3 10.5h18V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
        </path>
      </svg>
      Projects
    </a>
    <a href="#skills" data-nav="skills" aria-current={activeSection === "skills" ? "true" : undefined}>
      <svg className="nav-ic" viewBox="0 0 24 24" aria-hidden="true">
        <rect className="a" x="3.5" y="11" width="4.5" height="9" rx="1.2">
        </rect>
        <rect className="a" x="16" y="8" width="4.5" height="12" rx="1.2">
        </rect>
        <rect className="b" x="9.75" y="4" width="4.5" height="16" rx="1.2">
        </rect>
      </svg>
      Skills
    </a>
    <a href="#background" data-nav="background" aria-current={activeSection === "background" ? "true" : undefined}>
      <svg className="nav-ic" viewBox="0 0 24 24" aria-hidden="true">
        <rect className="a" x="3" y="7" width="18" height="13" rx="2.2">
        </rect>
        <path className="b" d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7h-1.7V5.7h-2.6V7z">
        </path>
        <rect className="b" x="3" y="11.5" width="18" height="2.2">
        </rect>
      </svg>
      Background
    </a>
    <a href="#certificates" data-nav="certificates" aria-current={activeSection === "certificates" ? "true" : undefined}>
      <svg className="nav-ic" viewBox="0 0 24 24" aria-hidden="true">
        <path className="b" d="m8.6 13.6-1.6 7.4 5-2.6 5 2.6-1.6-7.4z">
        </path>
        <circle className="a" cx="12" cy="9" r="6">
        </circle>
        <circle className="b" cx="12" cy="9" r="2.6">
        </circle>
      </svg>
      Certificates
    </a>
    <a href="#about" data-nav="about" aria-current={activeSection === "about" ? "true" : undefined}>
      <svg className="nav-ic" viewBox="0 0 24 24" aria-hidden="true">
        <path className="a" d="M4 21a8 8 0 0 1 16 0z">
        </path>
        <circle className="b" cx="12" cy="8" r="4">
        </circle>
      </svg>
      About
    </a>
    <a href="#contact" data-nav="contact" aria-current={activeSection === "contact" ? "true" : undefined}>
      <svg className="nav-ic" viewBox="0 0 24 24" aria-hidden="true">
        <rect className="a" x="3" y="5" width="18" height="14" rx="2.2">
        </rect>
        <path className="b" d="M3.6 7.2 12 13l8.4-5.8v2.5L12 15.6 3.6 9.7z">
        </path>
      </svg>
      Contact
    </a>
  </nav>
</aside>
<main id="home" data-dock="home">
  <header className="wrap profile">
    <img className="avatar" src="/photo.jpg" alt="Photo of Tiffanie Kyle R. Gutierrez" width="900" height="900" />
    <div className="who">
      <span className="who-name">
        Tiffanie Kyle R. Gutierrez
      </span>
      <span className="who-sub">
        BSIT · Data & Business Analytics · BulSU
      </span>
    </div>
    <button className="menu-btn" type="button" id="menu-btn" aria-label="Open menu" aria-expanded={sidebarOpen} aria-controls="sidebar">
      <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 7h16M4 12h16M4 17h10">
        </path>
      </svg>
    </button>
  </header>
  <section className="wrap hero" aria-labelledby="hero-h">
    <h1 id="hero-h">
      Data skills from school.
      <span>
        Business sense from work.
      </span>
    </h1>
    <p className="lede">
      I'm taking up BS Information Technology, major in Data and Business Analytics, at Bulacan State University, and I work in ads, social media, and sales. School teaches me to read the data. Work shows me what it means for a business.
    </p>
    <div className="card stats">
      <div className="stat">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="7" width="18" height="13" rx="2">
          </rect>
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
          </path>
        </svg>
        <strong>
          3
        </strong>
        <span>
          Work roles
        </span>
      </div>
      <div className="stat">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
          </path>
        </svg>
        <strong>
          3
        </strong>
        <span>
          Projects
        </span>
      </div>
      <div className="stat">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="9" r="5">
          </circle>
          <path d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5">
          </path>
        </svg>
        <strong>
          9
        </strong>
        <span>
          Certificates
        </span>
      </div>
    </div>
  </section>
  <section className="wrap sides" aria-label="At university and at work">
    <div className="seg" id="seg" data-active={activeTab} role="tablist" aria-label="Show">
      <span className="seg-thumb" aria-hidden="true">
      </span>
      <button type="button" role="tab" id="tab-school" aria-selected={activeTab === "school"} aria-controls="panel-school" tabIndex={activeTab === "school" ? 0 : -1}>
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2 9l10-5 10 5-10 5z">
          </path>
          <path d="M6 11v5c3 2 9 2 12 0v-5">
          </path>
        </svg>
        At university
      </button>
      <button type="button" role="tab" id="tab-work" aria-selected={activeTab === "work"} aria-controls="panel-work" tabIndex={activeTab === "work" ? 0 : -1}>
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="7" width="18" height="13" rx="2">
          </rect>
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
          </path>
        </svg>
        At work
      </button>
    </div>
    <div className="card side-panel" id="panel-school" role="tabpanel" aria-labelledby="tab-school" hidden={activeTab !== "school"}>
      <ul className="side-list">
        <li>
          <span className="ico">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 3v18h18">
              </path>
              <path d="m7 15 4-4 3 3 5-6">
              </path>
            </svg>
          </span>
          <div>
            <strong>
              Predictive analytics
            </strong>
            <span>
              Forecasting medicine demand for the BulSU Clinic
            </span>
          </div>
        </li>
        <li>
          <span className="ico">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 20v-9M12 20V5M19 20v-6M3 20h18">
              </path>
            </svg>
          </span>
          <div>
            <strong>
              Business dashboards
            </strong>
            <span>
              Coffee Motto sales analysis in Excel and OpenRefine
            </span>
          </div>
        </li>
        <li>
          <span className="ico">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <ellipse cx="12" cy="6" rx="7" ry="3">
              </ellipse>
              <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6">
              </path>
              <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3">
              </path>
            </svg>
          </span>
          <div>
            <strong>
              Systems and databases
            </strong>
            <span>
              Web systems built with PHP and MySQL
            </span>
          </div>
        </li>
        <li>
          <span className="ico amber">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z">
              </path>
            </svg>
          </span>
          <div>
            <strong>
              Dean's Lister
            </strong>
            <span>
              Bulacan State University, 2024–2025
            </span>
          </div>
        </li>
      </ul>
      <div className="side-foot">
        <span>
          BSIT, Class of 2027
        </span>
        <a href="#projects">
          See my projects →
        </a>
      </div>
    </div>
    <div className="card side-panel" id="panel-work" role="tabpanel" aria-labelledby="tab-work" hidden={activeTab !== "work"}>
      <ul className="side-list">
        <li>
          <span className="ico amber">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z">
              </path>
              <path d="M17 9a4 4 0 0 1 0 6">
              </path>
            </svg>
          </span>
          <div>
            <strong>
              Ads Specialist
            </strong>
            <span>
              2FR Moto Protection
            </span>
          </div>
        </li>
        <li>
          <span className="ico amber">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5h16v11H9l-5 4z">
              </path>
            </svg>
          </span>
          <div>
            <strong>
              Social Media Manager
            </strong>
            <span>
              2FR Ceramic Coating & Paint Protection Film
            </span>
          </div>
        </li>
        <li>
          <span className="ico amber">
            <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12V4h8l10 10-8 8z">
              </path>
              <circle cx="7.5" cy="7.5" r="1.5">
              </circle>
            </svg>
          </span>
          <div>
            <strong>
              Sales Manager
            </strong>
            <span>
              Gutci Egg Trading
            </span>
          </div>
        </li>
      </ul>
      <div className="side-foot">
        <span>
          Marketing and sales
        </span>
        <a href="#background">
          See my background →
        </a>
      </div>
    </div>
  </section>
  <section className="tools" aria-labelledby="tools-h">
    <div className="wrap">
      <h2 className="h-sm" id="tools-h">
        Tools I work with
      </h2>
    </div>
    <div className="wrap">
      <div className="marquee" id="marquee">
        <div className="marquee-track" id="marquee-track">
          <ul className="tool-set">
            <li className="tool">
              <span className="ico">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2">
                  </rect>
                  <path d="M3 10h18M3 15h18M9 4v16">
                  </path>
                </svg>
              </span>
              Microsoft Excel
              <em>
                Advanced
              </em>
            </li>
            <li className="tool">
              <span className="ico">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 20v-9M12 20V5M19 20v-6M3 20h18">
                  </path>
                </svg>
              </span>
              Power BI
            </li>
            <li className="tool">
              <span className="ico">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9">
                  </circle>
                  <path d="M12 3v9h9">
                  </path>
                </svg>
              </span>
              SPSS
            </li>
            <li className="tool">
              <span className="ico">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="5" r="2">
                  </circle>
                  <circle cx="6" cy="18" r="2">
                  </circle>
                  <circle cx="18" cy="18" r="2">
                  </circle>
                  <path d="M12 7v4M12 11l-5 5M12 11l5 5">
                  </path>
                </svg>
              </span>
              Weka
            </li>
            <li className="tool">
              <span className="ico amber">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 5h18l-7 8v6l-4 2v-8z">
                  </path>
                </svg>
              </span>
              OpenRefine
              <em className="lvl-int">
                Intermediate
              </em>
            </li>
            <li className="tool">
              <span className="ico amber">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <ellipse cx="12" cy="6" rx="7" ry="3">
                  </ellipse>
                  <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6">
                  </path>
                  <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3">
                  </path>
                </svg>
              </span>
              SQL
            </li>
            <li className="tool">
              <span className="ico amber">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <ellipse cx="12" cy="6" rx="7" ry="3">
                  </ellipse>
                  <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6">
                  </path>
                </svg>
              </span>
              Microsoft Access
            </li>
            <li className="tool">
              <span className="ico plain">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m8 8-4 4 4 4M16 8l4 4-4 4">
                  </path>
                </svg>
              </span>
              Python
            </li>
            <li className="tool">
              <span className="ico plain">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m8 8-4 4 4 4M16 8l4 4-4 4">
                  </path>
                </svg>
              </span>
              Java
            </li>
            <li className="tool">
              <span className="ico plain">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m8 8-4 4 4 4M16 8l4 4-4 4">
                  </path>
                </svg>
              </span>
              JavaScript
            </li>
            <li className="tool">
              <span className="ico plain">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m8 8-4 4 4 4M16 8l4 4-4 4">
                  </path>
                </svg>
              </span>
              HTML
            </li>
            <li className="tool">
              <span className="ico plain">
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m8 8-4 4 4 4M16 8l4 4-4 4">
                  </path>
                </svg>
              </span>
              CSS
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</main>
<section className="wrap section" id="projects" data-dock="projects" aria-labelledby="projects-h">
  <div className="section-head">
    <h2 id="projects-h">
      Projects
    </h2>
    <p>
      Analytics and systems work from my previous school years. Open a card for the full story.
    </p>
  </div>
  <div className="filters" role="group" aria-label="Filter projects">
    <button className="filter" type="button" data-filter="all" aria-pressed={projectFilter === "all"}>
      All
    </button>
    <button className="filter" type="button" data-filter="analytics" aria-pressed={projectFilter === "analytics"}>
      Analytics
    </button>
    <button className="filter" type="button" data-filter="systems" aria-pressed={projectFilter === "systems"}>
      Systems
    </button>
  </div>
  <div className="pcards">
    <article className="card pcard" data-cat="analytics systems">
      <div className="thumb">
        <svg viewBox="0 0 320 140" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration of a line chart that continues into a dashed forecast">
          <path className="s-grid" d="M30 38 H290 M30 72 H290 M30 106 H290">
          </path>
          <polygon className="s-band" points="200,62 230,52 260,38 290,42 290,80 260,72 230,82 200,62">
          </polygon>
          <line className="s-divider" x1="200" y1="26" x2="200" y2="128">
          </line>
          <text className="s-text" style={{"fontSize": "8.5px"}} x="192" y="20" textAnchor="end">
            HISTORY
          </text>
          <text className="s-text-amber" style={{"fontSize": "8.5px"}} x="208" y="20">
            FORECAST
          </text>
          <polyline className="s-amber-line" points="200,62 230,66 260,54 290,59">
          </polyline>
          <polyline className="s-accent-line" points="34,114 58,100 82,106 106,88 130,94 154,78 178,84 200,62">
          </polyline>
          <circle className="s-accent s-surface-stroke" cx="200" cy="62" r="5">
          </circle>
        </svg>
      </div>
      <div className="pcard-body">
        <span className="mono-label type">
          Predictive analytics · Web system
        </span>
        <h3>
          Medicine Demand Forecasting for BulSU Clinic Inventory Planning
        </h3>
        <p>
          Forecasts medicine demand from the clinic's dispensing records, so staff know what to restock and when.
        </p>
        <ul className="tags">
          <li className="tag">
            PHP
          </li>
          <li className="tag">
            MySQL
          </li>
          <li className="tag">
            JavaScript
          </li>
          <li className="tag">
            Forecasting
          </li>
        </ul>
        <div className="actions">
          <button className="btn btn-primary" type="button" data-sheet="medicine">
            Read the full story
          </button>
        </div>
      </div>
    </article>
    <article className="card pcard" data-cat="analytics" hidden={projectFilter !== "all" && projectFilter !== "analytics"}>
      <div className="thumb">
        <svg viewBox="0 0 320 140" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration of a bar chart with one highlighted bar">
          <path className="s-grid" d="M40 40 H280 M40 75 H280 M40 110 H280">
          </path>
          <rect className="s-accent" x="52" y="78" width="22" height="48" rx="3">
          </rect>
          <rect className="s-accent" x="86" y="88" width="22" height="38" rx="3">
          </rect>
          <rect className="s-accent" x="120" y="66" width="22" height="60" rx="3">
          </rect>
          <rect className="s-accent" x="154" y="72" width="22" height="54" rx="3">
          </rect>
          <rect className="s-accent" x="188" y="56" width="22" height="70" rx="3">
          </rect>
          <rect className="s-amber" x="222" y="30" width="22" height="96" rx="3">
          </rect>
          <rect className="s-accent" x="256" y="46" width="22" height="80" rx="3">
          </rect>
          <path className="s-muted-line" d="M40 126 H290">
          </path>
          <text className="s-text-amber" style={{"fontSize": "8.5px"}} x="233" y="22" textAnchor="middle">
            TOP
          </text>
        </svg>
      </div>
      <div className="pcard-body">
        <span className="mono-label type">
          Business analytics · Dashboard
        </span>
        <h3>
          Descriptive Analysis and Data Visualization for Coffee Motto Sales
        </h3>
        <p>
          Cleaned Coffee Motto's raw sales data and built a dashboard of top products, category sales, and revenue trends.
        </p>
        <ul className="tags">
          <li className="tag">
            Excel
          </li>
          <li className="tag">
            OpenRefine
          </li>
          <li className="tag">
            Dashboard
          </li>
        </ul>
        <div className="actions">
          <button className="btn btn-primary" type="button" data-sheet="coffee">
            Read the full story
          </button>
          <a className="btn btn-ghost" href="https://drive.google.com/open?id=1ADKWQbGcdUSvbKHm04IhX8j4J4cqRxvNA4P8w2NvLcs" target="_blank" rel="noopener">
            Open spreadsheet ↗
          </a>
        </div>
      </div>
    </article>
    <article className="card pcard" data-cat="systems" hidden={projectFilter !== "all" && projectFilter !== "systems"}>
      <div className="thumb">
        <svg viewBox="0 0 320 140" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustration of a records table in an application window">
          <rect className="s-surface" x="60" y="16" width="200" height="112" rx="8">
          </rect>
          <rect className="s-accent" x="60" y="16" width="200" height="20" rx="8">
          </rect>
          <rect className="s-accent" x="60" y="28" width="200" height="8">
          </rect>
          <circle className="s-surface" cx="72" cy="26" r="3">
          </circle>
          <circle className="s-surface" cx="82" cy="26" r="3">
          </circle>
          <circle className="s-soft" cx="80" cy="54" r="7">
          </circle>
          <rect className="s-line" x="94" y="50" width="70" height="7" rx="3.5">
          </rect>
          <rect className="s-line" x="176" y="50" width="34" height="7" rx="3.5">
          </rect>
          <rect className="s-amber-soft" x="220" y="47" width="30" height="13" rx="6.5">
          </rect>
          <path className="s-rule" d="M70 70 H250">
          </path>
          <circle className="s-soft" cx="80" cy="84" r="7">
          </circle>
          <rect className="s-line" x="94" y="80" width="58" height="7" rx="3.5">
          </rect>
          <rect className="s-line" x="176" y="80" width="40" height="7" rx="3.5">
          </rect>
          <rect className="s-soft" x="220" y="77" width="30" height="13" rx="6.5">
          </rect>
          <path className="s-rule" d="M70 100 H250">
          </path>
          <circle className="s-soft" cx="80" cy="113" r="7">
          </circle>
          <rect className="s-line" x="94" y="109" width="78" height="7" rx="3.5">
          </rect>
          <rect className="s-soft" x="220" y="106" width="30" height="13" rx="6.5">
          </rect>
        </svg>
      </div>
      <div className="pcard-body">
        <span className="mono-label type">
          Information system
        </span>
        <h3>
          Kasagana Multipurpose Cooperative System
        </h3>
        <p>
          A system developed for the Kasagana Multipurpose Cooperative.
        </p>
        <div className="actions">
          <button className="btn btn-primary" type="button" data-sheet="kasagana">
            Read the full story
          </button>
        </div>
      </div>
    </article>
  </div>
</section>
<section className="wrap section" id="skills" data-dock="projects" aria-labelledby="skills-h">
  <div className="section-head">
    <h2 id="skills-h">
      Skills
    </h2>
    <p>
      Where I'm strongest, and the tools I use to get there.
    </p>
  </div>
  <div className="skills">
    <div className="card">
      <div className="panel-head">
        <h3>
          Technical skills
        </h3>
        <span className="mono-label">
          Rating · 0–5
        </span>
      </div>
      <div className="bars" role="img" aria-label="Self-rated technical skills out of 5: Business Intelligence 5, Data Analytics and Statistics 4, Database Management and CRM 4, Web Development and Programming 3.">
        <div className="bar-row">
          <span className="bar-label">
            Business Intelligence
          </span>
          <span className="track">
            <span className="fill" style={{"--v": "5"}}>
            </span>
          </span>
          <span className="bar-value">
            5/5
          </span>
        </div>
        <div className="bar-row">
          <span className="bar-label">
            Data Analytics & Statistics
          </span>
          <span className="track">
            <span className="fill" style={{"--v": "4"}}>
            </span>
          </span>
          <span className="bar-value">
            4/5
          </span>
        </div>
        <div className="bar-row">
          <span className="bar-label">
            Database Management & CRM
          </span>
          <span className="track">
            <span className="fill" style={{"--v": "4"}}>
            </span>
          </span>
          <span className="bar-value">
            4/5
          </span>
        </div>
        <div className="bar-row">
          <span className="bar-label">
            Web Development & Programming
          </span>
          <span className="track">
            <span className="fill" style={{"--v": "3"}}>
            </span>
          </span>
          <span className="bar-value">
            3/5
          </span>
        </div>
      </div>
      <div className="axis" aria-hidden="true">
        <span>
        </span>
        <div className="ticks">
          <span style={{"left": "0%"}}>
            0
          </span>
          <span style={{"left": "20%"}}>
            1
          </span>
          <span style={{"left": "40%"}}>
            2
          </span>
          <span style={{"left": "60%"}}>
            3
          </span>
          <span style={{"left": "80%"}}>
            4
          </span>
          <span style={{"left": "100%"}}>
            5
          </span>
        </div>
        <span>
        </span>
      </div>
      <p className="chart-note" style={{"marginTop": "12px"}}>
        Self-assessed on a five-star scale.
      </p>
    </div>
    <div className="card tool-groups">
      <div className="tool-group">
        <span className="mono-label">
          Analysis & BI
        </span>
        <ul className="chips">
          <li className="chip">
            Microsoft Excel
            <em>
              Advanced
            </em>
          </li>
          <li className="chip">
            Power BI
          </li>
          <li className="chip">
            SPSS
          </li>
          <li className="chip">
            Weka
          </li>
        </ul>
      </div>
      <div className="tool-group">
        <span className="mono-label">
          Data prep & databases
        </span>
        <ul className="chips">
          <li className="chip">
            OpenRefine
            <em className="lvl-int">
              Intermediate
            </em>
          </li>
          <li className="chip">
            SQL
          </li>
          <li className="chip">
            Microsoft Access
          </li>
        </ul>
      </div>
      <div className="tool-group">
        <span className="mono-label">
          Programming & web
        </span>
        <ul className="chips">
          <li className="chip">
            Python
          </li>
          <li className="chip">
            Java
          </li>
          <li className="chip">
            JavaScript
          </li>
          <li className="chip">
            HTML
          </li>
          <li className="chip">
            CSS
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
<section className="wrap section" id="background" data-dock="about" aria-labelledby="background-h">
  <div className="section-head">
    <h2 id="background-h">
      Background
    </h2>
    <p>
      Where I work and where I've studied.
    </p>
  </div>
  <h3 className="sub-h">
    Work
  </h3>
  <ul className="card roles">
    <li>
      <span className="ico amber">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 11v2a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z">
          </path>
          <path d="M17 9a4 4 0 0 1 0 6">
          </path>
        </svg>
      </span>
      <div>
        <strong>
          Ads Specialist
        </strong>
        <span className="co">
          2FR Moto Protection
        </span>
      </div>
      <span className="mono-label">
        Marketing
      </span>
    </li>
    <li>
      <span className="ico amber">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5h16v11H9l-5 4z">
          </path>
        </svg>
      </span>
      <div>
        <strong>
          Social Media Manager
        </strong>
        <span className="co">
          2FR Ceramic Coating & Paint Protection Film
        </span>
      </div>
      <span className="mono-label">
        Marketing
      </span>
    </li>
    <li>
      <span className="ico amber">
        <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 12V4h8l10 10-8 8z">
          </path>
          <circle cx="7.5" cy="7.5" r="1.5">
          </circle>
        </svg>
      </span>
      <div>
        <strong>
          Sales Manager
        </strong>
        <span className="co">
          Gutci Egg Trading
        </span>
      </div>
      <span className="mono-label">
        Sales
      </span>
    </li>
  </ul>
  <h3 className="sub-h">
    Education
  </h3>
  <ol className="card timeline">
    <li>
      <span className="when">
        2023 – 2027
      </span>
      <div>
        <h4>
          Bulacan State University – Main Campus
        </h4>
        <p className="where">
          BS Information Technology, major in Data and Business Analytics
        </p>
        <ul>
          <li className="honor">
            Dean's Lister (2024–2025)
          </li>
        </ul>
      </div>
    </li>
    <li>
      <span className="when">
        Summer 2025
      </span>
      <div>
        <h4>
          I-Shou University – Kaohsiung, Taiwan
        </h4>
        <p className="where">
          Summer OJT Camp
        </p>
        <ul>
          <li>
            Technology and AI classes
          </li>
          <li>
            Mandarin classes
          </li>
          <li>
            Taiwan culture classes
          </li>
        </ul>
      </div>
    </li>
    <li>
      <span className="when">
        2019 – 2023
      </span>
      <div>
        <h4>
          Colegio de Calumpit Inc.
        </h4>
        <p className="where">
          Science, Technology, Engineering, and Mathematics (STEM)
        </p>
        <ul>
          <li className="honor">
            Graduated with High Honors (2022–2023)
          </li>
          <li>
            With Honors (2021–2022)
          </li>
          <li>
            With High Honors (2020–2021)
          </li>
        </ul>
      </div>
    </li>
    <li>
      <span className="when">
        2011 – 2018
      </span>
      <div>
        <h4>
          Holy Spirit School of Ilang-Ilang, Quezon City
        </h4>
        <p className="where">
          Primary education
        </p>
      </div>
    </li>
  </ol>
</section>
<section className="wrap section" id="certificates" data-dock="certificates" aria-labelledby="certificates-h">
  <div className="section-head">
    <h2 id="certificates-h">
      Certificates
    </h2>
    <p>
      Training and certifications in data, AI, and networking. Tap any of them to open it.
    </p>
  </div>
  <div className="cert-groups">
    <div className="card">
      <div className="panel-head">
        <h3>
          Data, AI & digital skills
        </h3>
        <span className="mono-label">
          6
        </span>
      </div>
      <ul className="cert-list">
        <li>
          <a className="cert" href="/sap-generative-ai-developer.jpg" target="_blank" rel="noopener" data-title="SAP Certified – SAP Generative AI Developer" data-meta="SAP · Issued Oct 14, 2026" data-verify="https://www.credly.com/badges/47503028-d78b-48b6-a259-21efda4d13fa">
            <span className="cert-main">
              <span className="mono-label">
                SAP
              </span>
              <strong>
                Generative AI Developer
              </strong>
            </span>
            <span className="cert-meta">
              <span className="cert-date">
                Oct 14, 2026
              </span>
              <span className="cert-view">
                View
              </span>
            </span>
          </a>
        </li>
        <li>
          <a className="cert" href="/dict-big-data-fundamentals.jpg" target="_blank" rel="noopener" data-title="Big Data Fundamentals" data-meta="DICT Digital Workforce Hub · Oct 13, 2026 · 8 hours">
            <span className="cert-main">
              <span className="mono-label">
                DICT
              </span>
              <strong>
                Big Data Fundamentals
              </strong>
            </span>
            <span className="cert-meta">
              <span className="cert-date">
                Oct 13, 2026
              </span>
              <span className="cert-view">
                View
              </span>
            </span>
          </a>
        </li>
        <li>
          <a className="cert" href="/it-specialist-ai.jpg" target="_blank" rel="noopener" data-title="IT Specialist – Artificial Intelligence" data-meta="Certiport / Pearson · Oct 6, 2026">
            <span className="cert-main">
              <span className="mono-label">
                Certiport · IT Specialist
              </span>
              <strong>
                Artificial Intelligence
              </strong>
            </span>
            <span className="cert-meta">
              <span className="cert-date">
                Oct 6, 2026
              </span>
              <span className="cert-view">
                View
              </span>
            </span>
          </a>
        </li>
        <li>
          <a className="cert" href="/tesda-conducting-data-analysis.jpg" target="_blank" rel="noopener" data-title="Conducting Data Analysis" data-meta="TESDA Online Program · Apr 20, 2026">
            <span className="cert-main">
              <span className="mono-label">
                TESDA
              </span>
              <strong>
                Conducting Data Analysis
              </strong>
            </span>
            <span className="cert-meta">
              <span className="cert-date">
                Apr 20, 2026
              </span>
              <span className="cert-view">
                View
              </span>
            </span>
          </a>
        </li>
        <li>
          <a className="cert" href="/tesda-microsoft-digital-literacy.jpg" target="_blank" rel="noopener" data-title="Microsoft Digital Literacy" data-meta="TESDA Online Program · Apr 20, 2026">
            <span className="cert-main">
              <span className="mono-label">
                TESDA
              </span>
              <strong>
                Microsoft Digital Literacy
              </strong>
            </span>
            <span className="cert-meta">
              <span className="cert-date">
                Apr 20, 2026
              </span>
              <span className="cert-view">
                View
              </span>
            </span>
          </a>
        </li>
        <li>
          <a className="cert" href="/salesforce-virtual-internship.jpg" target="_blank" rel="noopener" data-title="Salesforce Supported Virtual Internship Program 2025 – Philippines" data-meta="SmartBridge, Salesforce partner · 8 weeks, Aug–Nov 2025">
            <span className="cert-main">
              <span className="mono-label">
                SmartBridge · Salesforce
              </span>
              <strong>
                Virtual Internship Program 2025
              </strong>
            </span>
            <span className="cert-meta">
              <span className="cert-date">
                Jan 2, 2026
              </span>
              <span className="cert-view">
                View
              </span>
            </span>
          </a>
        </li>
      </ul>
    </div>
    <div className="card">
      <div className="panel-head">
        <h3>
          Networking
        </h3>
        <span className="mono-label">
          3
        </span>
      </div>
      <ul className="cert-list">
        <li>
          <a className="cert" href="/tesda-setting-up-computer-networks.jpg" target="_blank" rel="noopener" data-title="Setting Up Computer Networks" data-meta="TESDA Online Program · Apr 20, 2026">
            <span className="cert-main">
              <span className="mono-label">
                TESDA
              </span>
              <strong>
                Setting Up Computer Networks
              </strong>
            </span>
            <span className="cert-meta">
              <span className="cert-date">
                Apr 20, 2026
              </span>
              <span className="cert-view">
                View
              </span>
            </span>
          </a>
        </li>
        <li>
          <a className="cert" href="/cisco-networking-devices.jpg" target="_blank" rel="noopener" data-title="Networking Devices and Basic Configuration" data-meta="Cisco Networking Academy · Feb 28, 2025">
            <span className="cert-main">
              <span className="mono-label">
                Cisco
              </span>
              <strong>
                Networking Devices and Basic Configuration
              </strong>
            </span>
            <span className="cert-meta">
              <span className="cert-date">
                Feb 28, 2025
              </span>
              <span className="cert-view">
                View
              </span>
            </span>
          </a>
        </li>
        <li>
          <a className="cert" href="/cisco-networking-basics.jpg" target="_blank" rel="noopener" data-title="Networking Basics" data-meta="Cisco Networking Academy · Feb 6, 2025">
            <span className="cert-main">
              <span className="mono-label">
                Cisco
              </span>
              <strong>
                Networking Basics
              </strong>
            </span>
            <span className="cert-meta">
              <span className="cert-date">
                Feb 6, 2025
              </span>
              <span className="cert-view">
                View
              </span>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</section>
<section className="wrap section" id="about" data-dock="about" aria-labelledby="about-h">
  <div className="section-head">
    <h2 id="about-h">
      About me
    </h2>
  </div>
  <div className="card about">
    <img className="about-photo" src="/photo.jpg" alt="Tiffanie Kyle R. Gutierrez" width="900" height="900" loading="lazy" />
    <div className="about-text">
      <p>
        Hi, I'm Tiffanie. I am pursuing a Bachelor of Science in Information Technology, majoring in Data and Business Analytics, at Bulacan State University – Main Campus.
      </p>
      <p>
        I have a strong interest in business and data analytics, backed by hands-on work as an Ads Specialist and Social Media Manager. I am passionate about using data-driven insights to support strategic decision-making and improve business performance.
      </p>
    </div>
  </div>
  <ul className="highlights">
    <li className="card">
      <span className="mono-label">
        Academics
      </span>
      <strong>
        Dean's Lister
      </strong>
      <span>
        Bulacan State University, 2024–2025
      </span>
    </li>
    <li className="card">
      <span className="mono-label">
        International
      </span>
      <strong>
        Summer OJT Camp
      </strong>
      <span>
        I-Shou University, Kaohsiung, Taiwan, 2025
      </span>
    </li>
    <li className="card">
      <span className="mono-label">
        Work
      </span>
      <strong>
        Marketing and sales
      </strong>
      <span>
        Ads, social media, and sales roles
      </span>
    </li>
  </ul>
</section>
<section className="wrap section" id="contact" data-dock="contact" aria-labelledby="contact-h">
  <div className="contact-card">
    <div>
      <h2 id="contact-h">
        Get in touch
      </h2>
      <p className="lede">
        Have a question or an opportunity? Reach me through any of these.
      </p>
    </div>
    <ul className="contact-list">
      <li>
        <span className="mono-label">
          Email
        </span>
        <a className="contact-value" id="c-email" href="mailto:tiffaniegutierrez212004@gmail.com">
          tiffaniegutierrez212004@gmail.com
        </a>
        <button className="copy" type="button" data-copy="tiffaniegutierrez212004@gmail.com" data-target="c-email">
          Copy
        </button>
      </li>
      <li>
        <span className="mono-label">
          Phone
        </span>
        <span className="contact-value" id="c-phone">
          0934 413 4405
        </span>
        <button className="copy" type="button" data-copy="09344134405" data-target="c-phone">
          Copy
        </button>
      </li>
      <li>
        <span className="mono-label">
          Facebook
        </span>
        <a className="contact-value" href="https://www.facebook.com/tiffanie.kyle.2024" target="_blank" rel="noopener">
          tiffanie.kyle.2024
        </a>
        <a className="copy" href="https://www.facebook.com/tiffanie.kyle.2024" target="_blank" rel="noopener">
          Open ↗
        </a>
      </li>
      <li>
        <span className="mono-label">
          LinkedIn
        </span>
        <a className="contact-value" href="https://www.linkedin.com/in/tiffanie-gutierrez-517857404" target="_blank" rel="noopener">
          tiffanie-gutierrez-517857404
        </a>
        <a className="copy" href="https://www.linkedin.com/in/tiffanie-gutierrez-517857404" target="_blank" rel="noopener">
          Open ↗
        </a>
      </li>
      <li>
        <span className="mono-label">
          GitHub
        </span>
        <a className="contact-value" href="https://github.com/TiffanieKyle21" target="_blank" rel="noopener">
          TiffanieKyle21
        </a>
        <a className="copy" href="https://github.com/TiffanieKyle21" target="_blank" rel="noopener">
          Open ↗
        </a>
      </li>
    </ul>
  </div>
  <footer className="site-footer">
    <span>
      © 2026 Tiffanie Kyle R. Gutierrez
    </span>
    <a href="#home">
      Back to top ↑
    </a>
  </footer>
</section>
<nav className="dock" aria-label="Sections">
  <a href="#home" data-key="home" aria-current={activeDock === "home" ? "true" : undefined}>
    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z">
      </path>
    </svg>
    Home
  </a>
  <a href="#projects" data-key="projects" aria-current={activeDock === "projects" ? "true" : undefined}>
    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z">
      </path>
    </svg>
    Projects
  </a>
  <a href="#contact" data-key="contact" className="fab" aria-label="Contact" aria-current={activeDock === "contact" ? "true" : undefined}>
    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2">
      </rect>
      <path d="m3 7 9 6 9-6">
      </path>
    </svg>
  </a>
  <a href="#certificates" data-key="certificates" aria-current={activeDock === "certificates" ? "true" : undefined}>
    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9" r="5">
      </circle>
      <path d="M8.5 13.5 7 21l5-2.5 5 2.5-1.5-7.5">
      </path>
    </svg>
    Certs
  </a>
  <a href="#about" data-key="about" aria-current={activeDock === "about" ? "true" : undefined}>
    <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="8" r="4">
      </circle>
      <path d="M4 21a8 8 0 0 1 16 0">
      </path>
    </svg>
    About
  </a>
</nav>
<dialog
  className="sheet"
  id="sheet"
  ref={sheetRef}
  aria-labelledby="sheet-title"
  onClose={() => setProjectDetail(null)}
>
  <div className="sheet-body">
    <div className="sheet-grab" aria-hidden="true">
    </div>
    <div className="dlg-head">
      <h3 id="sheet-title">{projectDetail?.title || "Project"}</h3>
      <button className="dlg-close" type="button" id="sheet-close" aria-label="Close">
        ×
      </button>
    </div>
    <div className="sheet-content" id="sheet-content">
      {projectDetail?.key === "medicine" && (
        <>
          <p className="sub">A predictive analytics approach</p>
          <p>A web-based system that helps the Bulacan State University Clinic plan its medicine inventory. It uses historical dispensing records to find consumption patterns and forecast future demand, so clinic staff can make better purchasing and restocking decisions.</p>
          <p>The system covers data preprocessing, exploratory data analysis, medicine classification, demand forecasting, and an interactive dashboard for viewing medicine trends and forecasts.</p>
          <ProjectFacts
            builtWith={["PHP", "MySQL", "JavaScript", "HTML", "CSS"]}
            focus={["Predictive analytics", "Data analysis", "Demand forecasting", "Inventory planning", "Web development"]}
          />
        </>
      )}
      {projectDetail?.key === "coffee" && (
        <>
          <p>Turned Coffee Motto's raw sales transactions into business insights through data preprocessing, descriptive analysis, and an interactive dashboard covering sales performance, product and category trends, customer purchasing patterns, and revenue over time.</p>
          <p>I cleaned and prepared the dataset in Excel and OpenRefine: date transformation, data splitting, standardization, clustering, fixing product and category entries, and handling missing values. The dashboard shows top-selling products, category sales, weekly and monthly revenue patterns, and yearly revenue.</p>
          <ProjectFacts
            builtWith={["Microsoft Excel", "OpenRefine"]}
            focus={["Business analytics", "Data preprocessing", "Data visualization", "Descriptive analysis", "Dashboard development"]}
          />
          <p><a href="https://drive.google.com/open?id=1ADKWQbGcdUSvbKHm04IhX8j4J4cqRxvNA4P8w2NvLcs" target="_blank" rel="noopener">Open the dashboard spreadsheet ↗</a></p>
        </>
      )}
      {projectDetail?.key === "kasagana" && (
        <p>A system developed for the Kasagana Multipurpose Cooperative.</p>
      )}
    </div>
  </div>
</dialog>
<dialog
  className="cert-dialog"
  id="cert-dialog"
  ref={certificateDialogRef}
  aria-labelledby="cert-dialog-title"
  onClose={() => setCertificate(null)}
>
  <div className="dlg-body">
    <div className="dlg-head">
      <h3 id="cert-dialog-title">{certificate?.title || "Certificate"}</h3>
      <button className="dlg-close" type="button" id="cert-dialog-close" aria-label="Close">
        ×
      </button>
    </div>
    {certificate && <img className="dlg-img" id="cert-dialog-img" src={certificate.image} alt={`Certificate: ${certificate.title}`} />}
    <div className="dlg-foot">
      <span className="mono-label" id="cert-dialog-meta">{certificate?.meta || ""}</span>
      {certificate?.verify && <a id="cert-dialog-verify" href={certificate.verify} target="_blank" rel="noopener">Verify on Credly ↗</a>}
    </div>
  </div>
</dialog>
<div className="toast" id="toast" role="status" hidden={!toast}>{toast}</div>
    </div>
  );
}

function ProjectFacts({ builtWith, focus }) {
  return (
    <dl className="facts">
      <div>
        <dt className="mono-label">Built with</dt>
        <dd><ul className="chips">{builtWith.map((item) => <li className="chip" key={item}>{item}</li>)}</ul></dd>
      </div>
      <div>
        <dt className="mono-label">Focus</dt>
        <dd><ul className="chips">{focus.map((item) => <li className="chip" key={item}>{item}</li>)}</ul></dd>
      </div>
    </dl>
  );
}
