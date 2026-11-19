import React, { useEffect, useRef, useState } from "react";

/* ---------- Content ---------- */

const NAV = [
  ["home", "Home"],
  ["about", "About"],
  ["projects", "Works"],
  ["skills", "Skills"],
  ["background", "Journey"],
  ["certificates", "Certs"],
];

const SOCIALS = [
  {
    key: "in",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tiffanie-gutierrez-517857404",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452z",
  },
  {
    key: "fb",
    label: "Facebook",
    href: "https://www.facebook.com/tiffanie.kyle.2024",
    icon: "M13.6 22v-8.4h2.8l.45-3.3H13.6V8.2c0-.95.27-1.6 1.65-1.6h1.75V3.65C16.7 3.6 15.65 3.5 14.45 3.5c-2.55 0-4.3 1.55-4.3 4.4v2.4H7.3v3.3h2.85V22z",
  },
  {
    key: "gh",
    label: "GitHub",
    href: "https://github.com/TiffanieKyle21",
    icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
];

const STATS = [
  ["4", "Work roles"],
  ["6", "Projects"],
  ["9", "Certificates"],
];

const FOCUS = [
  ["Predictive analytics", "yellow"],
  ["Business dashboards", "green"],
  ["Systems & databases", "pink"],
  ["Ads & social media", "blue"],
];

const HIGHLIGHTS = [
  { label: "Academics", title: "Dean's Lister", text: "Bulacan State University, 2024–2025" },
  { label: "International", title: "Summer OJT Camp", text: "I-Shou University, Kaohsiung, Taiwan, 2025" },
  { label: "Work", title: "Marketing and sales", text: "Ads, social media, and sales roles" },
];

const TOOL_GROUPS = [
  {
    label: "Analysis & BI",
    tools: [["Microsoft Excel", "Advanced"], ["Power BI"], ["SPSS"], ["Weka"]],
  },
  {
    label: "Data prep & databases",
    tools: [["OpenRefine", "Intermediate"], ["SQL"], ["Microsoft Access"]],
  },
  {
    label: "Programming & web",
    tools: [["Python"], ["Java"], ["JavaScript"], ["HTML"], ["CSS"]],
  },
  {
    label: "Networking",
    tools: [["Cisco Packet Tracer"], ["PuTTY"], ["VirtualBox"]],
  },
];

const ALL_TOOLS = TOOL_GROUPS.flatMap((group) => group.tools.map(([name]) => name));

const SKILLS = [
  ["Business Intelligence", 5],
  ["Data Analytics & Statistics", 4],
  ["Database Management & CRM", 4],
  ["Web Development & Programming", 4],
  ["Networking & System Build-Up", 3],
];

// Paste the view-only Google Sheets link of the demo here to show an "Open demo" button.
const AUTO_COSTING_DEMO_URL = "";

const PROJECTS = [
  {
    key: "medicine",
    cats: ["analytics", "systems"],
    tone: "cream",
    art: "forecast",
    type: "Predictive analytics · Web system",
    title: "Medicine Demand Forecasting for BulSU Clinic Inventory Planning",
    blurb: "Forecasts medicine demand from the clinic's dispensing records, so staff know what to restock and when.",
    tags: ["PHP", "MySQL", "JavaScript", "Forecasting"],
    sub: "A predictive analytics approach",
    story: [
      "A web-based system that helps the Bulacan State University Clinic plan its medicine inventory. It uses historical dispensing records to find consumption patterns and forecast future demand, so clinic staff can make better purchasing and restocking decisions.",
      "The system covers data preprocessing, exploratory data analysis, medicine classification, demand forecasting, and an interactive dashboard for viewing medicine trends and forecasts.",
    ],
    shots: [
      { src: "/medicine-login.jpg", alt: "Login page of the BulSU Health Services Unit system, with the campus building and a sign-in form for clinic staff", caption: "Login: the sign-in page for clinic staff" },
      { src: "/medicine-dashboard.jpg", alt: "Dashboard of historical medicine demand from January 2023 to April 2026: units given, patients treated, monthly demand, consumption by generic name and by diagnosis, top five categories and top departments", caption: "Dashboard: monthly demand from 2023 to 2026, by medicine, diagnosis, category and department" },
      { src: "/medicine-forecast.jpg", alt: "Demand forecast for Analgesic medicines in 2026: forecasted units, average monthly demand, historical and forecasted demand with a 95% confidence interval, and a stock planning note", caption: "Demand Forecast: forecast by category with a 95% confidence interval and a stock planning tip" },
      { src: "/medicine-categories.jpg", alt: "Medicine Categories page with a search bar and cards for Analgesic, Antacid, Anti-Asthma, Anti-Colds, Anti-Fibrinolytics, Anti-Histamine and more", caption: "Medicine: searchable categories, each opening its specific medicines" },
    ],
    builtWith: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    focus: ["Predictive analytics", "Data analysis", "Demand forecasting", "Inventory planning", "Web development"],
  },
  {
    key: "coffee",
    cats: ["analytics"],
    tone: "ink",
    art: "coffee",
    type: "Business analytics · Dashboard",
    title: "Descriptive Analysis and Data Visualization for Coffee Shop Sales",
    blurb: "Cleaned a coffee shop's raw sales data and built a dashboard of top products, category sales, and revenue trends.",
    tags: ["Excel", "OpenRefine", "Dashboard"],
    shots: [
      { src: "/coffee-sales-dashboard.jpg", alt: "Coffee shop sales dashboard: transactions, total quantity sold, total revenue, quantity sold per category, weekly sales, top 10 products, monthly revenue, revenue per year and category revenue share", caption: "Sales dashboard: KPIs, category and product sales, and weekly, monthly and yearly revenue" },
    ],
    story: [
      "Turned a coffee shop's raw sales transactions into business insights through data preprocessing, descriptive analysis, and an interactive dashboard covering sales performance, product and category trends, customer purchasing patterns, and revenue over time.",
      "I cleaned and prepared the dataset in Excel and OpenRefine: date transformation, data splitting, standardization, clustering, fixing product and category entries, and handling missing values. The dashboard shows top-selling products, category sales, weekly and monthly revenue patterns, and yearly revenue.",
    ],
    builtWith: ["Microsoft Excel", "OpenRefine"],
    focus: ["Business analytics", "Data preprocessing", "Data visualization", "Descriptive analysis", "Dashboard development"],
  },
  {
    key: "kasagana",
    cats: ["systems"],
    tone: "yellow",
    art: "table",
    type: "Information system",
    title: "Kasagana Multipurpose Cooperative System",
    blurb: "A system developed for the Kasagana Multipurpose Cooperative.",
    tags: ["PHP", "JavaScript", "CSS", "MySQL"],
    story: ["A system developed for the Kasagana Multipurpose Cooperative."],
    builtWith: ["PHP", "JavaScript", "CSS", "MySQL"],
  },
  {
    key: "2fr",
    cats: ["systems"],
    tone: "mint",
    art: "website",
    type: "Business website · Live",
    title: "2FR Ceramic Website",
    blurb: "A website for 2FR Ceramic, a paint protection and coating studio, with its services, photo gallery, two branches, and inquiry links for cars and motorcycles.",
    tags: ["React", "Vite", "JavaScript", "CSS"],
    links: [
      { href: "https://2frceramic.vercel.app", label: "Visit site" },
      { href: "https://github.com/TiffanieKyle21/2FR", label: "View code" },
    ],
    story: [
      "A single-page website for 2FR Ceramic, a studio that does paint protection film, graphene coating, nano ceramic tint, detailing and repaint for cars and motorcycles.",
      "It presents the five services with the studio's own photos, a gallery that switches between cars and motorcycles, both branches with Google Maps and Waze directions, and separate inquiry buttons that send car owners and motorcycle owners to the right Facebook page. The layout adapts from desktop down to phones.",
    ],
    shots: [
      { src: "/project-2fr.jpg", alt: "Home page of the 2FR Ceramic website with a red sports car in the studio", caption: "Home page of the live website" },
    ],
    builtWith: ["React", "Vite", "JavaScript", "CSS"],
    focus: ["Web development", "Responsive design", "Business website", "Deployment on Vercel"],
  },
  {
    key: "auto-costing",
    cats: ["analytics", "systems"],
    tone: "ink",
    art: "costing",
    type: "Business system · Google Sheets",
    title: "Auto Costing and Sales Report System",
    blurb: "A spreadsheet system for a car and motorcycle detailing shop. Each job is entered once, and the supplies cost, profit, balances and sales reports fill in by themselves.",
    tags: ["Google Sheets", "Excel", "Formulas", "Automation"],
    ...(AUTO_COSTING_DEMO_URL && { links: [{ href: AUTO_COSTING_DEMO_URL, label: "Open demo" }] }),
    sub: "Demo with made-up data",
    story: [
      "A spreadsheet system for a car and motorcycle detailing shop. Each job is entered once on the Records tab (date, vehicle, unit, service, amount, initial payment and release), and everything else is calculated from there.",
      "Each job's supplies cost is matched from a costing table by service and vehicle type, giving the gross and net profit per job. Shop expenses are logged on their own tab, and the reports total sales, costs, profit, balances still to collect and cash on hand by day, by 5-day and 10-day periods, and by the 11th-to-10th cut-off, with a month picker on each report.",
      "Dropdowns keep entries consistent, and color rules mark units still in the shop, days with no jobs, and jobs that need a second look. It started in Excel and was moved to Google Sheets so the team can use it online.",
    ],
    shots: [
      { src: "/auto-costing-5days.jpg", alt: "5-days report with sales, supplies costing, expenses and net profit for each 5-day period of October", caption: "5-days report: each period of the month, totaled automatically" },
      { src: "/auto-costing-records.jpg", alt: "Records tab with job entries, balances and a summary of total sales, balance and cash on hand", caption: "Records tab: where each job is entered, with a running summary" },
    ],
    builtWith: ["Microsoft Excel", "Google Sheets"],
    focus: ["Business analytics", "Process automation", "Cost and profit tracking", "Sales reporting", "Data validation"],
  },  {
    key: "netflix",
    cats: ["analytics"],
    tone: "cream",
    art: "netflix",
    type: "Business intelligence · Power BI",
    title: "Netflix Content Analysis Report",
    blurb: "An interactive Power BI report on 8,797 Netflix movies and TV shows: genres, ratings, runtimes, seasons, monthly additions and countries.",
    tags: ["Power BI", "Power Query", "Star schema"],
    story: [
      "An interactive Power BI report on the Netflix catalog: 8,797 titles (6,131 movies and 2,666 TV shows) added from 2008 to 2021. It has five pages (Home, Movies, TV Shows, Titles and Media Details) with a page navigator, a filter panel for year added and rating, and a button that clears all filters.",
      "I cleaned the data in Power Query, splitting each title's duration into a number and a unit so movie runtimes in minutes and TV shows' number of seasons can be analyzed separately, and pulling out the year and month each title was added. I then modeled it as a star schema, with dimension tables for date, genre, country, cast and director, and bridge tables for titles with more than one genre, country, cast member or director.",
      "The pages show the movie and TV show split, the most common genres, ratings, movie length in minutes, TV shows by number of seasons, titles added per month, genres by country on a map, and lists of titles with their cast, director, genre and country of origin.",
    ],
    shots: [
      { src: "/netflix-home.jpg", alt: "Home page: total movies and TV shows, average movie length and series length, movies by minutes, TV shows by seasons, show type split and media by rating", caption: "Home: totals, movie length, seasons, show type and ratings" },
      { src: "/netflix-movies.jpg", alt: "Movies page: treemap of the most frequent movie genres, movies added per month, and a map of genres by country", caption: "Movies: top genres, monthly additions and a map by country" },
      { src: "/netflix-tv-shows.jpg", alt: "TV Shows page: most frequent TV show genres, TV shows added per month, and a map of genres by country", caption: "TV Shows: genres, monthly additions and a map by country" },
      { src: "/netflix-media-details.jpg", alt: "Media Details page showing one title with its country, genres, cast and director", caption: "Media Details: one title's country, genres, cast and director" },
    ],
    builtWith: ["Power BI", "Power Query"],
    focus: ["Business intelligence", "Data cleaning", "Data modeling", "Star schema", "Interactive reporting"],
  },
];

const FILTERS = [
  ["all", "All"],
  ["analytics", "Analytics"],
  ["systems", "Systems"],
];

const ROLES = [
  { role: "Ads Specialist", company: "2FR Moto Protection", tag: "Marketing" },
  { role: "Social Media Manager", company: "2FR Ceramic Coating & Paint Protection Film", tag: "Marketing" },
  { role: "Social Media Manager", company: "Slim & Glow", tag: "Marketing" },
  { role: "Sales Manager", company: "Gutci Egg Trading", tag: "Sales" },
];

const EDUCATION = [
  {
    when: "2023 – 2027",
    school: "Bulacan State University – Main Campus",
    course: "BS Information Technology, major in Data and Business Analytics",
    notes: [["Dean's Lister (2024–2025)", true]],
  },
  {
    when: "Summer 2025",
    school: "I-Shou University – Kaohsiung, Taiwan",
    course: "Summer OJT Camp",
    notes: [["Technology and AI classes"], ["Mandarin classes"], ["Taiwan culture classes"]],
  },
  {
    when: "2019 – 2023",
    school: "Colegio de Calumpit Inc.",
    course: "Science, Technology, Engineering, and Mathematics (STEM)",
    notes: [["Graduated with High Honors (2022–2023)", true], ["With Honors (2021–2022)"], ["With High Honors (2020–2021)"]],
  },
  {
    when: "2011 – 2018",
    school: "Holy Spirit School of Ilang-Ilang, Quezon City",
    course: "Primary education",
    notes: [],
  },
];

const CERT_GROUPS = [
  {
    title: "Data, AI & digital skills",
    certs: [
      {
        image: "/sap-generative-ai-developer.jpg",
        issuer: "SAP",
        name: "Generative AI Developer",
        date: "Oct 14, 2026",
        title: "SAP Certified – SAP Generative AI Developer",
        meta: "SAP · Issued Oct 14, 2026",
        verify: "https://www.credly.com/badges/47503028-d78b-48b6-a259-21efda4d13fa",
      },
      {
        image: "/dict-big-data-fundamentals.jpg",
        issuer: "DICT",
        name: "Big Data Fundamentals",
        date: "Oct 13, 2026",
        title: "Big Data Fundamentals",
        meta: "DICT Digital Workforce Hub · Oct 13, 2026 · 8 hours",
      },
      {
        image: "/it-specialist-ai.jpg",
        issuer: "Certiport · IT Specialist",
        name: "Artificial Intelligence",
        date: "Oct 6, 2026",
        title: "IT Specialist – Artificial Intelligence",
        meta: "Certiport / Pearson · Oct 6, 2026",
      },
      {
        image: "/tesda-conducting-data-analysis.jpg",
        issuer: "TESDA",
        name: "Conducting Data Analysis",
        date: "Apr 20, 2026",
        title: "Conducting Data Analysis",
        meta: "TESDA Online Program · Apr 20, 2026",
      },
      {
        image: "/tesda-microsoft-digital-literacy.jpg",
        issuer: "TESDA",
        name: "Microsoft Digital Literacy",
        date: "Apr 20, 2026",
        title: "Microsoft Digital Literacy",
        meta: "TESDA Online Program · Apr 20, 2026",
      },
      {
        image: "/salesforce-virtual-internship.jpg",
        issuer: "SmartBridge · Salesforce",
        name: "Virtual Internship Program 2025",
        date: "Jan 2, 2026",
        title: "Salesforce Supported Virtual Internship Program 2025 – Philippines",
        meta: "SmartBridge, Salesforce partner · 8 weeks, Aug–Nov 2025",
      },
    ],
  },
  {
    title: "Networking",
    certs: [
      {
        image: "/tesda-setting-up-computer-networks.jpg",
        issuer: "TESDA",
        name: "Setting Up Computer Networks",
        date: "Apr 20, 2026",
        title: "Setting Up Computer Networks",
        meta: "TESDA Online Program · Apr 20, 2026",
      },
      {
        image: "/cisco-networking-devices.jpg",
        issuer: "Cisco",
        name: "Networking Devices and Basic Configuration",
        date: "Feb 28, 2025",
        title: "Networking Devices and Basic Configuration",
        meta: "Cisco Networking Academy · Feb 28, 2025",
      },
      {
        image: "/cisco-networking-basics.jpg",
        issuer: "Cisco",
        name: "Networking Basics",
        date: "Feb 6, 2025",
        title: "Networking Basics",
        meta: "Cisco Networking Academy · Feb 6, 2025",
      },
    ],
  },
];

const EMAIL = "tiffaniegutierrez212004@gmail.com";

/* ---------- Small drawings ---------- */

function ForecastArt() {
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label="Line chart that continues into a dashed forecast">
      <path className="a-grid" d="M30 42 H290 M30 76 H290 M30 110 H290" />
      <polygon className="a-band" points="200,66 230,56 260,42 290,46 290,84 260,76 230,86 200,66" />
      <line className="a-divider" x1="200" y1="28" x2="200" y2="132" />
      <text className="a-text" x="192" y="22" textAnchor="end">HISTORY</text>
      <text className="a-text a-text-hot" x="208" y="22">FORECAST</text>
      <polyline className="a-dash" points="200,66 230,70 260,58 290,63" />
      <polyline className="a-line" points="34,118 58,104 82,110 106,92 130,98 154,82 178,88 200,66" />
      <circle className="a-dot" cx="200" cy="66" r="5.5" />
    </svg>
  );
}

function BarsArt() {
  const bars = [[52, 48], [86, 38], [120, 60], [154, 54], [188, 70], [222, 96], [256, 80]];
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label="Bar chart with the top seller highlighted">
      <path className="a-grid" d="M40 44 H284 M40 79 H284 M40 114 H284" />
      {bars.map(([x, h]) => (
        <rect key={x} className={h === 96 ? "a-bar a-bar-top" : "a-bar"} x={x} y={130 - h} width="22" height={h} />
      ))}
      <path className="a-axis" d="M40 130 H290" />
      <text className="a-text a-text-hot" x="233" y="26" textAnchor="middle">TOP</text>
    </svg>
  );
}

function TableArt() {
  const rows = [[54, 70, 34, "a-chip-hot"], [84, 58, 40, "a-chip"], [113, 78, 0, "a-chip"]];
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label="Records table in an application window">
      <rect className="a-window" x="56" y="16" width="208" height="120" />
      <rect className="a-window-bar" x="56" y="16" width="208" height="22" />
      <circle className="a-window-dot" cx="70" cy="27" r="3" />
      <circle className="a-window-dot" cx="81" cy="27" r="3" />
      {rows.map(([y, w1, w2, chip], index) => (
        <g key={y}>
          {index > 0 && <path className="a-rule" d={`M68 ${y - 14} H252`} />}
          <circle className="a-avatar" cx="80" cy={y + 4} r="7" />
          <rect className="a-cell" x="94" y={y} width={w1} height="7" />
          {w2 > 0 && <rect className="a-cell" x="178" y={y} width={w2} height="7" />}
          <rect className={chip} x="222" y={y - 3} width="30" height="13" />
        </g>
      ))}
    </svg>
  );
}

function CoffeeArt() {
  // bar heights follow the dashboard's quantity sold per category (Iced first)
  const bars = [52, 17, 15, 14, 12, 9, 7, 7];
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label="Coffee shop sales dashboard with a coffee cup, summary tiles and a bar chart of category sales">
      <rect className="a-window" x="40" y="14" width="240" height="122" />
      <rect className="a-window-bar" x="40" y="14" width="240" height="20" />
      <circle className="a-window-dot" cx="53" cy="24" r="3" />
      <circle className="a-window-dot" cx="64" cy="24" r="3" />
      <path className="a-steam" d="M70 55 c-5 -3 5 -6 0 -9 c-5 -3 5 -6 0 -9 M80 55 c-5 -3 5 -6 0 -9 c-5 -3 5 -6 0 -9 M90 55 c-5 -3 5 -6 0 -9 c-5 -3 5 -6 0 -9" />
      <path className="a-f-ink" d="M60 60 H96 V80 Q96 94 84 94 H72 Q60 94 60 80 Z" />
      <path className="a-handle" d="M96 66 h5 a7 7 0 0 1 0 14 h-5" />
      <rect className="a-f-sand" x="54" y="98" width="48" height="5" rx="2.5" />
      <text className="a-text" x="78" y="120" textAnchor="middle">SALES</text>
      {[118, 170, 222].map((x) => (
        <g key={x}>
          <rect className="a-tile" x={x} y="42" width="46" height="18" />
          <rect className="a-f-ink" x={x + 8} y="47" width="22" height="4" />
          <rect className="a-cell" x={x + 8} y="54" width="30" height="2.5" />
        </g>
      ))}
      {bars.map((h, i) => (
        <rect key={i} className={i === 0 ? "a-bar a-bar-top" : "a-bar"} x={122 + i * 18} y={126 - h} width="12" height={h} />
      ))}
      <path className="a-axis" d="M116 126 H272" />
      <text className="a-text a-text-hot" x="142" y="80">TOP SELLER</text>
    </svg>
  );
}

function WebsiteArt() {
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label="Business website in a browser window with a hero banner, a car and a photo gallery">
      <rect className="a-window" x="40" y="14" width="240" height="122" />
      <rect className="a-window-bar" x="40" y="14" width="240" height="20" />
      <circle className="a-window-dot" cx="53" cy="24" r="3" />
      <circle className="a-window-dot" cx="64" cy="24" r="3" />
      <rect className="a-f-paper" x="96" y="19" width="128" height="10" rx="5" />
      <rect className="a-f-red" x="50" y="39" width="24" height="6" />
      {[206, 226, 246].map((x) => <rect key={x} className="a-cell" x={x} y="40" width="15" height="4" />)}
      <rect className="a-f-ink" x="50" y="50" width="220" height="52" />
      <rect className="a-f-paper" x="60" y="60" width="60" height="6" />
      <rect className="a-f-paper" x="60" y="70" width="44" height="6" />
      <rect className="a-f-yellow" x="60" y="84" width="30" height="9" />
      <path className="a-f-red" d="M150 91 L154 82 Q160 76 176 74 L192 66 Q206 61 222 64 L240 72 Q256 74 260 80 L262 91 Z" />
      <path className="a-f-dim" d="M196 68 Q207 64 220 66 L232 73 L194 74 Z" />
      <circle className="a-wheel" cx="174" cy="92" r="6.5" />
      <circle className="a-wheel" cx="242" cy="92" r="6.5" />
      {[50, 107, 164, 221].map((x, i) => (
        <rect key={x} className={i % 2 ? "a-f-mint" : "a-f-sand"} x={x} y="108" width="49" height="20" />
      ))}
    </svg>
  );
}

function CostingArt() {
  const rows = [69, 80, 91, 102, 113, 124];
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label="Spreadsheet with a formula bar, highlighted job rows and a summary panel">
      <rect className="a-window" x="36" y="14" width="248" height="122" />
      <rect className="a-window-bar" x="36" y="14" width="248" height="20" />
      <circle className="a-window-dot" cx="49" cy="24" r="3" />
      <circle className="a-window-dot" cx="60" cy="24" r="3" />
      <text className="a-fx" x="46" y="46">fx</text>
      <rect className="a-cell" x="64" y="40" width="124" height="5" />
      <path className="a-rule" d="M36 51 H284" />
      <rect className="a-f-red" x="44" y="57" width="156" height="9" />
      {rows.map((y, i) => (
        <g key={y}>
          {i === 2 && <rect className="a-f-sand" x="44" y={y - 3} width="156" height="10" />}
          {i === 4 && <rect className="a-f-blush" x="44" y={y - 3} width="156" height="10" />}
          {i !== 4 && (
            <>
              <rect className="a-cell" x="50" y={y} width="24" height="4" />
              <rect className="a-cell" x="82" y={y} width="42" height="4" />
              <rect className="a-cell" x="132" y={y} width="28" height="4" />
              <rect className="a-cell" x="168" y={y} width="26" height="4" />
            </>
          )}
          {i === 4 && <rect className="a-cell" x="50" y={y} width="24" height="4" />}
        </g>
      ))}
      <rect className="a-panel" x="210" y="57" width="64" height="72" />
      <rect className="a-f-ink" x="210" y="57" width="64" height="10" />
      <text className="a-text" x="218" y="80">TOTAL</text>
      <rect className="a-f-ink" x="218" y="86" width="40" height="5" />
      <rect className="a-cell" x="218" y="97" width="48" height="4" />
      <rect className="a-cell" x="218" y="106" width="36" height="4" />
      <rect className="a-chip-hot" x="218" y="115" width="30" height="8" />
    </svg>
  );
}

function NetflixArt() {
  // donut: movies are about 70% of titles; bars follow the ratings chart (TV-MA first)
  const ring = 113.1;
  const bars = [36, 24, 10, 9, 6, 4, 3.5, 3, 2.5, 1.5];
  return (
    <svg viewBox="0 0 320 150" role="img" aria-label="Streaming report page with a dark header, summary tiles, a donut chart of movies and TV shows and a bar chart of ratings">
      <rect className="a-window" x="36" y="14" width="248" height="122" />
      <rect className="a-window-bar" x="36" y="14" width="248" height="20" />
      <rect className="a-f-red" x="46" y="20" width="24" height="8" />
      {[84, 104, 124, 144].map((x) => <rect key={x} className="a-f-dim" x={x} y="23" width="14" height="3" />)}
      {[19, 23, 27].map((y) => <rect key={y} className="a-f-red" x="262" y={y} width="12" height="2" />)}
      {[46, 104, 162, 220].map((x) => (
        <g key={x}>
          <rect className="a-kpi" x={x} y="40" width="54" height="20" rx="3" />
          <rect className="a-f-red" x={x + 15} y="45" width="24" height="5" />
          <rect className="a-cell" x={x + 12} y="53" width="30" height="2.5" />
        </g>
      ))}
      <circle className="a-ring-rest" cx="80" cy="100" r="18" />
      <circle className="a-ring" cx="80" cy="100" r="18" strokeDasharray={`${ring * 0.697} ${ring}`} transform="rotate(-90 80 100)" />
      <path className="a-rule" d="M116 66 V130" />
      {bars.map((h, i) => (
        <rect key={i} className="a-f-red" x={128 + i * 14} y={126 - h} width="9" height={h} />
      ))}
      <path className="a-axis" d="M124 126 H272" />
    </svg>
  );
}

const ART = {
  forecast: ForecastArt,
  bars: BarsArt,
  table: TableArt,
  coffee: CoffeeArt,
  website: WebsiteArt,
  costing: CostingArt,
  netflix: NetflixArt,
};

function Arrow({ className }) {
  return (
    <svg className={className} viewBox="0 0 46 34" aria-hidden="true">
      <path d="M3 4c9 1 22 5 30 20" />
      <path d="M24 22l10 3 2-10" />
    </svg>
  );
}

function Burst({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5l2.3 5.2 5.4-2.1-2.1 5.4 5 2-5 2 2.1 5.4-5.4-2.1L12 22.5l-2.3-5.2-5.4 2.1 2.1-5.4-5-2 5-2-2.1-5.4 5.4 2.1z" />
    </svg>
  );
}

/* ---------- Page ---------- */

export default function App() {
  const [introVisible, setIntroVisible] = useState(() => {
    try {
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        sessionStorage.getItem("tg-intro") !== "1";
    } catch {
      return false;
    }
  });
  const [projectFilter, setProjectFilter] = useState("all");
  const [projectDetail, setProjectDetail] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [toast, setToast] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const sheetRef = useRef(null);
  const certDialogRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    if (!introVisible) return undefined;
    try {
      sessionStorage.setItem("tg-intro", "1");
    } catch {
      // The intro still closes on its own when session storage is unavailable.
    }
    const timer = window.setTimeout(() => setIntroVisible(false), 2400);
    return () => window.clearTimeout(timer);
  }, [introVisible]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("[data-sec]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = sheetRef.current;
    if (!dialog) return;
    if (projectDetail && !dialog.open) dialog.showModal();
    if (!projectDetail && dialog.open) dialog.close();
  }, [projectDetail]);

  useEffect(() => {
    const dialog = certDialogRef.current;
    if (!dialog) return;
    if (certificate && !dialog.open) dialog.showModal();
    if (!certificate && dialog.open) dialog.close();
  }, [certificate]);

  useEffect(() => () => window.clearTimeout(toastTimerRef.current), []);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 2200);
  };

  const copy = async (value, targetId) => {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`Copied: ${value}`);
    } catch {
      const content = document.getElementById(targetId);
      if (content) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(content);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
      showToast("Select the text and press Ctrl+C to copy.");
    }
  };

  const closeOnBackdrop = (event, close) => {
    if (event.target === event.currentTarget) close();
  };

  const shownProjects = PROJECTS.filter(
    (project) => projectFilter === "all" || project.cats.includes(projectFilter),
  );
  let certIndex = 0;

  return (
    <div className="app-root">
      {introVisible && (
        <div className="intro" aria-hidden="true" onClick={() => setIntroVisible(false)}>
          <div className="intro-card">
            <span className="intro-name">Tiffanie Gutierrez</span>
            <svg viewBox="0 0 240 120">
              <path className="intro-grid" d="M0 30 H240 M0 60 H240 M0 90 H240" />
              <polyline className="intro-line" points="4,100 26,86 48,92 70,72 92,78 114,60 136,64 150,52" />
              <polyline className="intro-fc" points="150,52 180,56 210,46 238,52" />
              <circle className="intro-dot" cx="150" cy="52" r="6" />
            </svg>
            <ol className="intro-steps">
              <li>Cleaning data</li>
              <li>Finding patterns</li>
              <li>Insights ready</li>
            </ol>
          </div>
        </div>
      )}

      <header className="topbar">
        <div className="topbar-in">
          <a className="logo" href="#home" aria-label="Back to top"><img src="/avatar.png" alt="" width="256" height="256" /></a>
          <nav className="nav" aria-label="Sections">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} aria-current={activeSection === id ? "true" : undefined}>
                {label}
              </a>
            ))}
          </nav>
          <div className="top-right">
            {SOCIALS.map((social) => (
              <a key={social.key} className={`soc soc-${social.key}`} href={social.href} target="_blank" rel="noopener" aria-label={social.label} title={social.label}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d={social.icon} /></svg>
              </a>
            ))}
            <a className="contact-pill" href="#contact" aria-current={activeSection === "contact" ? "true" : undefined}>
              Contact
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="wrap hero" id="home" data-sec aria-labelledby="hero-h">
          <div className="hero-row hero-row-top">
            <span className="tag tag-mint tilt-l">Reads the data</span>
            <span className="hand hero-hello">my name is</span>
            <span className="tag tag-sand tilt-r">Knows the business</span>
          </div>
          <div className="name-wrap">
            <h1 className="name-box" id="hero-h">Tiffanie</h1>
          </div>
          <div className="hero-row hero-row-bottom">
            <span className="note note-yellow tilt-l">
              Data &amp; Business Analytics
              <Arrow className="arrow arrow-l" />
            </span>
            <span className="status"><i aria-hidden="true" />Open to questions and opportunities</span>
            <span className="note note-mint tilt-r">
              <Arrow className="arrow arrow-r" />
              BulSU, Class of 2027
            </span>
          </div>

          <div className="pitch">
            <img className="face" src="/photo.jpg" alt="Photo of Tiffanie Kyle R. Gutierrez" width="900" height="900" />
            <p className="pitch-text">
              Data skills from school.{" "}
              <span>Business sense from work. <Burst className="burst" /></span>
            </p>
            <span className="face face-doodle" aria-hidden="true">
              <svg viewBox="0 0 40 40">
                <path d="M9 30V20M17 30V12M25 30v-7M33 30V16" />
              </svg>
            </span>
          </div>
          <p className="lede">
            I'm taking up BS Information Technology, major in Data and Business Analytics, at Bulacan State University, and I work in ads, social media, and sales. School teaches me to read the data. Work shows me what it means for a business.
          </p>
          <div className="hero-actions">
            <a className="btn" href="#contact"><i aria-hidden="true" />Contact me</a>
            <a className="btn btn-line" href="#projects">See my work</a>
            <a className="btn btn-line" href="/Tiffanie-Gutierrez-Resume.pdf" target="_blank" rel="noopener">Resume ↗</a>
          </div>
          <ul className="stats">
            {STATS.map(([value, label]) => (
              <li key={label}><strong>{value}</strong><span>{label}</span></li>
            ))}
          </ul>
        </section>

        {/* Tools ticker */}
        <div className="ticker" aria-label="Tools I work with">
          <div className="ticker-track">
            {[0, 1].map((copyIndex) => (
              <ul key={copyIndex} aria-hidden={copyIndex === 1 ? "true" : undefined}>
                {ALL_TOOLS.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            ))}
          </div>
        </div>

        {/* About */}
        <section className="wrap section about" id="about" data-sec aria-labelledby="about-h">
          <span className="hand section-note">about me!</span>
          <div className="about-grid">
            <figure className="polaroid polaroid-a">
              <img src="/photo.jpg" alt="Tiffanie Kyle R. Gutierrez" width="900" height="900" loading="lazy" />
              <figcaption className="hand">me, hi!</figcaption>
            </figure>
            <div className="about-main">
              <h2 className="boxed" id="about-h">what's up</h2>
              <p className="hand about-text">
                Hi, I'm Tiffanie. I am pursuing a Bachelor of Science in Information Technology, majoring in Data and Business Analytics, at Bulacan State University – Main Campus.
              </p>
              <p className="hand about-text">
                I have a strong interest in business and data analytics, backed by hands-on work as an Ads Specialist and Social Media Manager. I am passionate about using data-driven insights to support strategic decision-making and improve business performance.
              </p>
              <ul className="stickers">
                {FOCUS.map(([label, color]) => (
                  <li key={label} className={`sticker sticker-${color}`}>{label}</li>
                ))}
              </ul>
            </div>
            <figure className="polaroid polaroid-b">
              <div className="polaroid-art"><ForecastArt /></div>
              <figcaption className="hand">my kind of view</figcaption>
            </figure>
          </div>
          <ul className="highlights">
            {HIGHLIGHTS.map((item) => (
              <li key={item.title}>
                <span className="mono">{item.label}</span>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Projects */}
        <section className="wrap section" id="projects" data-sec aria-labelledby="projects-h">
          <span className="hand section-note">explore my work!</span>
          <h2 className="pixel-h" id="projects-h">Featured works</h2>
          <p className="section-lede">Analytics and systems work from my previous school years. Open a folder for the full story.</p>
          <div className="filters" role="group" aria-label="Filter projects">
            {FILTERS.map(([key, label]) => (
              <button key={key} type="button" className="filter" aria-pressed={projectFilter === key} onClick={() => setProjectFilter(key)}>
                {label}
              </button>
            ))}
          </div>
          <div className="folders">
            {shownProjects.map((project) => {
              const Art = ART[project.art];
              const number = String(PROJECTS.indexOf(project) + 1).padStart(2, "0");
              return (
                <article key={project.key} className={`folder folder-${project.tone}`}>
                  <div className="folder-tab mono"><i aria-hidden="true" />Project {number}</div>
                  <div className="folder-body">
                    <div className="folder-art">
                      {project.image
                        ? <img src={project.image} alt={project.imageAlt} width="960" height="450" loading="lazy" />
                        : <Art />}
                    </div>
                    <span className="mono folder-type">{project.type}</span>
                    <h3>{project.title}</h3>
                    <p>{project.blurb}</p>
                    {project.tags.length > 0 && (
                      <ul className="tags">
                        {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                      </ul>
                    )}
                    <div className="folder-actions">
                      <button type="button" className="text-link" onClick={() => setProjectDetail(project)}>
                        View project ↗
                      </button>
                      {(project.links || []).map((link) => (
                        <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noopener">
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Skills */}
        <section className="wrap section" id="skills" data-sec aria-labelledby="skills-h">
          <span className="hand section-note">what I'm good at</span>
          <h2 className="pixel-h" id="skills-h">Skills</h2>
          <p className="section-lede">Where I'm strongest, and the tools I use to get there.</p>
          <div className="skills-grid">
            <div className="sheet-card">
              <div className="card-head">
                <h3>Technical skills</h3>
                <span className="mono">Rating · 0–5</span>
              </div>
              <div className="bars" role="img" aria-label="Self-rated technical skills out of 5: Business Intelligence 5, Data Analytics and Statistics 4, Database Management and CRM 4, Web Development and Programming 4, Networking and System Build-Up 3.">
                {SKILLS.map(([label, value]) => (
                  <div className="bar-row" key={label}>
                    <span className="bar-label">{label}</span>
                    <span className="track"><span className="fill" style={{ "--v": value }} /></span>
                    <span className="bar-value">{value}/5</span>
                  </div>
                ))}
              </div>
              <div className="axis" aria-hidden="true">
                <span />
                <div className="ticks">
                  {[0, 1, 2, 3, 4, 5].map((tick) => <span key={tick} style={{ left: `${tick * 20}%` }}>{tick}</span>)}
                </div>
                <span />
              </div>
              <p className="hand chart-note">self-assessed on a five-star scale</p>
            </div>
            <div className="sheet-card tool-groups">
              {TOOL_GROUPS.map((group) => (
                <div className="tool-group" key={group.label}>
                  <span className="mono">{group.label}</span>
                  <ul className="chips">
                    {group.tools.map(([name, level]) => (
                      <li key={name}>{name}{level && <em>{level}</em>}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Background */}
        <section className="wrap section" id="background" data-sec aria-labelledby="background-h">
          <span className="hand section-note">where I've been</span>
          <h2 className="pixel-h" id="background-h">Journey</h2>
          <p className="section-lede">Where I work and where I've studied.</p>
          <h3 className="boxed boxed-sm">Work</h3>
          <ul className="roles">
            {ROLES.map((item) => (
              <li key={`${item.role} ${item.company}`}>
                <span className="mono">{item.tag}</span>
                <strong>{item.role}</strong>
                <span>{item.company}</span>
              </li>
            ))}
          </ul>
          <h3 className="boxed boxed-sm">Education</h3>
          <ol className="timeline">
            {EDUCATION.map((item) => (
              <li key={item.school}>
                <span className="mono when">{item.when}</span>
                <div>
                  <h4>{item.school}</h4>
                  <p>{item.course}</p>
                  {item.notes.length > 0 && (
                    <ul>
                      {item.notes.map(([note, honor]) => (
                        <li key={note} className={honor ? "honor" : undefined}>{note}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Certificates */}
        <section className="wrap section" id="certificates" data-sec aria-labelledby="certificates-h">
          <span className="hand section-note">pinned to my wall</span>
          <h2 className="pixel-h" id="certificates-h">Certificates</h2>
          <p className="section-lede">Training and certifications in data, AI, and networking. Tap any of them to open it.</p>
          {CERT_GROUPS.map((group) => (
            <div className="cert-group" key={group.title}>
              <h3 className="boxed boxed-sm">{group.title} <span className="mono">{group.certs.length}</span></h3>
              <ul className="certs">
                {group.certs.map((cert) => {
                  certIndex += 1;
                  return (
                    <li key={cert.image}>
                      <button type="button" className={`cert cert-${certIndex % 3}`} onClick={() => setCertificate(cert)}>
                        <img src={cert.image} alt="" loading="lazy" />
                        <span className="mono">{cert.issuer}</span>
                        <strong>{cert.name}</strong>
                        <span className="cert-date">{cert.date}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </section>

        {/* Contact */}
        <section className="wrap section" id="contact" data-sec aria-labelledby="contact-h">
          <div className="folder folder-ink contact">
            <div className="folder-tab mono"><i aria-hidden="true" />Say hi</div>
            <div className="folder-body">
              <h2 className="pixel-h" id="contact-h">Get in touch</h2>
              <p className="contact-lede">Have a question or an opportunity? Reach me through any of these.</p>
              <ul className="contact-list">
                <li>
                  <span className="mono">Email</span>
                  <a className="contact-value" id="c-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  <button type="button" className="chip-btn" onClick={() => copy(EMAIL, "c-email")}>Copy</button>
                </li>
                <li>
                  <span className="mono">Phone</span>
                  <span className="contact-value" id="c-phone">0934 413 4405</span>
                  <button type="button" className="chip-btn" onClick={() => copy("09344134405", "c-phone")}>Copy</button>
                </li>
                <li>
                  <span className="mono">Facebook</span>
                  <a className="contact-value" href="https://www.facebook.com/tiffanie.kyle.2024" target="_blank" rel="noopener">tiffanie.kyle.2024</a>
                  <a className="chip-btn" href="https://www.facebook.com/tiffanie.kyle.2024" target="_blank" rel="noopener">Open ↗</a>
                </li>
                <li>
                  <span className="mono">LinkedIn</span>
                  <a className="contact-value" href="https://www.linkedin.com/in/tiffanie-gutierrez-517857404" target="_blank" rel="noopener">tiffanie-gutierrez-517857404</a>
                  <a className="chip-btn" href="https://www.linkedin.com/in/tiffanie-gutierrez-517857404" target="_blank" rel="noopener">Open ↗</a>
                </li>
                <li>
                  <span className="mono">GitHub</span>
                  <a className="contact-value" href="https://github.com/TiffanieKyle21" target="_blank" rel="noopener">TiffanieKyle21</a>
                  <a className="chip-btn" href="https://github.com/TiffanieKyle21" target="_blank" rel="noopener">Open ↗</a>
                </li>
              </ul>
            </div>
          </div>
          <footer className="site-footer mono">
            <span>© 2026 Tiffanie Kyle R. Gutierrez</span>
            <a href="#home">Back to top ↑</a>
          </footer>
        </section>
      </main>

      <dialog
        className={`dialog${projectDetail?.shots ? " dialog-wide" : ""}`}
        ref={sheetRef}
        aria-labelledby="sheet-title"
        onClose={() => setProjectDetail(null)}
        onClick={(event) => closeOnBackdrop(event, () => setProjectDetail(null))}
      >
        <div className="dialog-body">
          <div className="dialog-head">
            <h3 id="sheet-title">{projectDetail?.title || "Project"}</h3>
            <button className="dialog-close" type="button" aria-label="Close" onClick={() => setProjectDetail(null)}>×</button>
          </div>
          {projectDetail && (
            <div className="dialog-content">
              {projectDetail.sub && <p className="hand dialog-sub">{projectDetail.sub}</p>}
              {projectDetail.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {projectDetail.shots && projectDetail.shots.map((shot) => (
                <figure key={shot.src} className="dialog-shot">
                  <a href={shot.src} target="_blank" rel="noopener" aria-label={`Open full size: ${shot.caption}`}>
                    <img className="dialog-img" src={shot.src} alt={shot.alt} loading="lazy" />
                  </a>
                  <figcaption className="mono">{shot.caption}</figcaption>
                </figure>
              ))}
              {projectDetail.builtWith && (
                <dl className="facts">
                  <div>
                    <dt className="mono">Built with</dt>
                    <dd><ul className="chips">{projectDetail.builtWith.map((item) => <li key={item}>{item}</li>)}</ul></dd>
                  </div>
                  {projectDetail.focus && (
                    <div>
                      <dt className="mono">Focus</dt>
                      <dd><ul className="chips">{projectDetail.focus.map((item) => <li key={item}>{item}</li>)}</ul></dd>
                    </div>
                  )}
                </dl>
              )}
              {projectDetail.links && (
                <p className="dialog-links">
                  {projectDetail.links.map((link) => (
                    <a key={link.href} className="text-link" href={link.href} target="_blank" rel="noopener">
                      {link.label} ↗
                    </a>
                  ))}
                </p>
              )}
            </div>
          )}
        </div>
      </dialog>

      <dialog
        className="dialog dialog-wide"
        ref={certDialogRef}
        aria-labelledby="cert-dialog-title"
        onClose={() => setCertificate(null)}
        onClick={(event) => closeOnBackdrop(event, () => setCertificate(null))}
      >
        <div className="dialog-body">
          <div className="dialog-head">
            <h3 id="cert-dialog-title">{certificate?.title || "Certificate"}</h3>
            <button className="dialog-close" type="button" aria-label="Close" onClick={() => setCertificate(null)}>×</button>
          </div>
          {certificate && <img className="dialog-img" src={certificate.image} alt={`Certificate: ${certificate.title}`} />}
          <div className="dialog-foot">
            <span className="mono">{certificate?.meta || ""}</span>
            {certificate?.verify && (
              <a className="text-link" href={certificate.verify} target="_blank" rel="noopener">Verify on Credly ↗</a>
            )}
          </div>
        </div>
      </dialog>

      <div className="toast" role="status" hidden={!toast}>{toast}</div>
    </div>
  );
}
