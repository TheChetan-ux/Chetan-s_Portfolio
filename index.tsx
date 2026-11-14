  import { Suspense, lazy, useEffect, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  Braces,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Github,
  Globe2,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Network,
  Phone,
  Rocket,
  Send,
  Sparkles,
  Sun,
  Terminal,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { AIAssistant } from "./components/ai-assistant/AIAssistant";
import portrait from "./assets/chetan-profile.png";

const ImmersiveBackground = lazy(() => import("./components/immersive-background/ImmersiveBackground"));

const navigation = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "C.", href: "#home", logo: true },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Get Started", href: "#contact" },
];

const services: { icon: LucideIcon; number: string; title: string; description: string; tags: string[] }[] = [
  {
    icon: Braces,
    number: "01",
    title: "Full-stack development",
    description: "End-to-end web experiences, shaped from the first interface to the final API.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    icon: Layers3,
    number: "02",
    title: "Frontend experiences",
    description: "Thoughtful, responsive interfaces with a little more care in every detail.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    icon: Network,
    number: "03",
    title: "Backend & APIs",
    description: "Dependable services and REST APIs that keep products moving smoothly.",
    tags: ["Node.js", "Express", "REST"],
  },
  {
    icon: Database,
    number: "04",
    title: "Data & integrations",
    description: "Structured databases and useful integrations built around real needs.",
    tags: ["MongoDB", "MySQL", "APIs"],
  },
  {
    icon: Sparkles,
    number: "05",
    title: "AI-powered products",
    description: "Practical applications that give new technology a human purpose.",
    tags: ["Generative AI", "APIs", "Python"],
  },
  {
    icon: Rocket,
    number: "06",
    title: "Optimization & debugging",
    description: "Finding the little things that slow an experience down—and improving them.",
    tags: ["Debugging", "Performance", "Monitoring"],
  },
];

const skills: { label: string; status: string; icon: LucideIcon; items: string[] }[] = [
  { label: "Full-stack development", status: "Strongest focus", icon: Code2, items: ["HTML", "CSS", "JavaScript", "React.js", "Next.js", "Tailwind CSS", "Node.js", "Express.js", "REST APIs", "MongoDB", "MySQL"] },
  { label: "AI & emerging technology", status: "Learning", icon: Sparkles, items: ["Generative AI", "AI-powered applications", "Machine learning"] },
  { label: "Programming", status: "In practice", icon: Terminal, items: ["Java", "Python", "JavaScript"] },
  { label: "Cloud & DevOps", status: "Exploring", icon: Cloud, items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Grafana", "OpenTelemetry"] },
  { label: "Computer science", status: "Ongoing study", icon: Network, items: ["Data structures & algorithms", "Database systems", "Operating systems", "Computer networks", "Object-oriented programming"] },
];

const projects = [
  {
    title: "Car360",
    category: "Full-stack",
    description: "A used-car marketplace with browsing, seller listings, direct purchases, auction bidding and role-based dashboards.",
    stack: ["React", "Vite", "Tailwind", "Express", "MongoDB"],
    icon: Globe2,
    repo: "https://github.com/TheChetan-ux/Car360",
    live: "https://car360-plum.vercel.app",
    visual: "car",
  },
  {
    title: "VoteWise",
    category: "AI & data",
    description: "An AI-assisted guide to India's election process, with civic information and voter action resources.",
    stack: ["Python", "Flask", "Gemini", "JavaScript"],
    icon: Sparkles,
    repo: "https://github.com/TheChetan-ux/election-process-assistant",
    visual: "vote",
  },
  {
    title: "Energy Forecast",
    category: "AI & data",
    description: "A city electricity-demand dashboard with forecasts, grid connections and temperature analysis.",
    stack: ["React", "Flask", "scikit-learn"],
    icon: Network,
    repo: "https://github.com/TheChetan-ux/AI_SMART_ENERGY_CONSUMPTION_PREDICTION",
    live: "https://ai-smart-energy-consumption-predict.vercel.app",
    visual: "energy",
  },
  {
    title: "Reliable UDP",
    category: "Systems",
    description: "A Python transport benchmark comparing Reno-style congestion response and LD-HCC over simulated UDP links.",
    stack: ["Python", "UDP", "Networking"],
    icon: Network,
    repo: "https://github.com/TheChetan-ux/LD-HCC_Reliable_UDP_Project",
    visual: "network",
  },
  {
    title: "Future Interns Projects",
    category: "Full-stack",
    description: "A documented full-stack portfolio project created as part of the Future Interns March 2026 cohort.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
    icon: Code2,
    repo: "https://github.com/TheChetan-ux/FUTURE_FS_01",
    live: "https://future-fs-01-ebon-beta.vercel.app",
    visual: "code",
  },
  {
    title: "OG Coin",
    category: "Web3",
    description: "An ERC-20 token prototype with a React interface, token controls and local deployment scripts.",
    stack: ["Solidity", "React", "Hardhat"],
    icon: Layers3,
    repo: "https://github.com/TheChetan-ux/ogc-forge-vault",
    live: "https://ogc-forge-vault.vercel.app",
    visual: "vault",
  },
];

const filters = ["All work", "Full-stack", "AI & data", "Systems", "Web3"];

const pageStyles = `
  :root {
    color-scheme: dark;
    --bg: #060b13;
    --bg-elevated: rgba(15, 23, 33, 0.8);
    --panel: rgba(10, 15, 22, 0.76);
    --panel-strong: rgba(16, 19, 27, 0.9);
    --line: rgba(148, 163, 184, 0.16);
    --line-strong: rgba(148, 163, 184, 0.32);
    --text: #ebf3ff;
    --muted: #a8b7ce;
    --soft: #7d8aa5;
    --primary: #8be9fd;
    --primary-strong: #64d5ff;
    --accent: #e8d38e;
    --success: #60e4a7;
    --shadow: 0 24px 80px rgba(15, 23, 42, 0.6);
    --radius: 24px;
    --max-width: 1280px;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    min-height: 100vh;
    background:
      radial-gradient(circle at top, rgba(96, 165, 250, 0.18), transparent 32%),
      radial-gradient(circle at bottom right, rgba(45, 212, 191, 0.14), transparent 28%),
      var(--bg);
    color: var(--text);
    font-family: Inter, "Segoe UI", sans-serif;
  }
  a { color: inherit; text-decoration: none; }
  img { display: block; max-width: 100%; }
  button, input, textarea { font: inherit; }

  .portfolio-shell {
    position: relative;
    overflow: hidden;
    background: transparent;
    color: var(--text);
  }
  .portfolio-shell::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
  }

  .site-header,
  .hero,
  .content-section,
  .education-section,
  .services-section,
  .journey-section,
  .recognition-section,
  .contact-section {
    max-width: var(--max-width);
    margin: 0 auto;
    padding-left: clamp(18px, 2vw, 24px);
    padding-right: clamp(18px, 2vw, 24px);
  }

  .site-header {
    position: sticky;
    top: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding-top: 20px;
    padding-bottom: 18px;
    backdrop-filter: blur(14px);
  }
  .wordmark {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
  }
  .wordmark-mark {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 0.8rem;
    background: linear-gradient(135deg, rgba(139, 233, 253, 0.2), rgba(100, 213, 255, 0.05));
    border: 1px solid rgba(139, 233, 253, 0.3);
    color: var(--primary);
    font-size: 1.4rem;
    font-weight: 700;
    box-shadow: inset 0 0 24px rgba(139, 233, 253, 0.12);
  }
  .wordmark-mark span { color: var(--accent); }
  .wordmark-name {
    display: inline-flex;
    flex-direction: column;
    gap: 2px;
    font-size: 0.92rem;
    letter-spacing: 0.18em;
    text-transform: lowercase;
    color: var(--text);
  }
  .wordmark-name small {
    font-size: 0.58rem;
    letter-spacing: 0.28em;
    color: var(--muted);
  }

  .main-nav {
    display: flex;
    align-items: center;
    gap: 28px;
    padding: 10px 14px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: rgba(9, 14, 21, 0.56);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
  }
  .main-nav a {
    position: relative;
    font-size: 0.76rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    transition: color 0.2s ease;
  }
  .main-nav a:hover, .main-nav a:focus-visible {
    color: var(--text);
  }

  .header-contact {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.82rem 1.08rem;
    border: 1px solid rgba(139, 233, 253, 0.24);
    border-radius: 999px;
    background: rgba(139, 233, 253, 0.04);
    color: var(--text);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .header-contact:hover { transform: translateY(-1px); border-color: rgba(139,233,253,0.5); }
  .theme-toggle {
    display: inline-grid;
    flex: 0 0 auto;
    place-items: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 1px solid var(--line-strong);
    border-radius: 50%;
    background: rgba(9, 14, 21, 0.72);
    color: var(--primary-strong);
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
  }
  .theme-toggle:hover { transform: translateY(-1px); border-color: var(--accent); }
  .theme-toggle svg { width: 18px; height: 18px; }

  .hero {
    position: relative;
    padding-top: 30px;
    padding-bottom: 52px;
  }
  .hero-workspace {
    position: absolute;
    inset: 0 0 auto 0;
    width: 100%;
    height: min(76vh, 760px);
    object-fit: cover;
    opacity: 0.34;
    filter: saturate(0.85) contrast(1.08) brightness(0.64);
  }
  .hero-shade {
    position: absolute;
    inset: 0 0 auto 0;
    height: min(76vh, 760px);
    background: linear-gradient(90deg, rgba(5, 10, 16, 0.92) 0%, rgba(5, 10, 16, 0.78) 22%, rgba(5,10,16,0.42) 58%, rgba(5,10,16,0.86) 100%);
  }
  .hero-kicker,
  .hero-scroll,
  .hero-coordinate {
    position: relative;
    z-index: 2;
  }
  .hero-kicker {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-top: 26px;
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--primary);
  }
  .status-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--success);
    box-shadow: 0 0 18px rgba(96, 228, 167, 0.9);
  }
  .kicker-rule {
    display: inline-block;
    width: clamp(90px, 18vw, 180px);
    height: 1px;
    background: linear-gradient(90deg, rgba(139, 233, 253, 0.7), transparent);
  }

  .section-rail {
    position: absolute;
    left: clamp(0px, 1vw, 12px);
    top: 220px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding-left: 8px;
  }
  .section-rail a {
    white-space: nowrap;
  }
  .hero-coordinate { display: none; }
  .section-rail a {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    color: rgba(235, 243, 255, 0.72);
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .section-rail a span:first-child {
    display: inline-flex;
    width: 2.2rem;
    justify-content: center;
    color: var(--soft);
  }
  .section-rail a .rail-label {
    opacity: 0.8;
  }
  .rail-active {
    color: var(--text) !important;
  }
  .rail-active .rail-label { opacity: 1 !important; }

  .hero-content {
    position: relative;
    z-index: 2;
    max-width: 780px;
    padding-top: clamp(72px, 11vw, 170px);
    padding-left: clamp(0px, 8vw, 120px);
  }
  .hero-intro {
    margin: 0 0 22px;
    color: var(--primary);
    font-size: 0.74rem;
    letter-spacing: 0.34em;
    text-transform: uppercase;
  }
  h1 {
    margin: 0;
    font-size: clamp(3.2rem, 8vw, 8rem);
    line-height: 0.9;
    letter-spacing: -0.08em;
    font-weight: 800;
    text-transform: uppercase;
  }
  h1 span { display: block; }
  h1 em {
    display: block;
    color: transparent;
    -webkit-text-stroke: 1px rgba(235,243,255,0.8);
    text-shadow: 0 0 18px rgba(139, 233, 253, 0.12);
  }
  .hero-tagline {
    margin: 24px 0 14px;
    font-size: clamp(1.1rem, 2vw, 1.8rem);
    line-height: 1.4;
    letter-spacing: -0.04em;
    color: rgba(235,243,255,0.9);
  }
  .hero-tagline span { color: var(--primary); }
  .desktop-break { display: block; }
  .hero-description {
    max-width: 520px;
    margin: 0;
    color: var(--muted);
    font-size: 1.05rem;
    line-height: 1.7;
  }
  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 18px;
    margin-top: 32px;
  }
  .button-glow {
    background: linear-gradient(135deg, rgba(139,233,253,0.18), rgba(100,213,255,0.42)) !important;
    border: 1px solid rgba(139,233,253,0.38) !important;
    box-shadow: 0 10px 30px rgba(100, 213, 255, 0.18);
  }
  .button-glow a,
  .button-glow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--text) !important;
  }
  .text-link {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--text);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
  .text-link svg { color: var(--primary); }

  .portrait-frame {
    position: absolute;
    right: clamp(20px, 6vw, 90px);
    bottom: 16px;
    z-index: 2;
    width: min(30vw, 390px);
    min-width: 260px;
    padding: 16px 16px 0;
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 26px 26px 18px 18px;
    background: rgba(10, 15, 22, 0.1);
    backdrop-filter: blur(10px);
    box-shadow: var(--shadow);
  }
  .portrait-frame img {
    width: 100%;
    height: auto;
    border-radius: 18px 18px 8px 8px;
    object-fit: cover;
  }
  .portrait-caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 12px 10px 14px;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .hero-scroll {
    position: relative;
    z-index: 2;
    display: inline-flex;
    align-items: center;
    gap: 18px;
    margin-top: 34px;
    margin-left: clamp(0px, 8vw, 120px);
    color: rgba(235,243,255,0.8);
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  .hero-coordinate {
    position: absolute;
    right: clamp(18px, 5vw, 84px);
    bottom: 56px;
    z-index: 2;
    color: rgba(235,243,255,0.7);
    font-size: 0.64rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    transform: rotate(-90deg) translateY(-36px);
    transform-origin: right bottom;
  }

  .ticker {
    position: relative;
    overflow: hidden;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    background: rgba(7, 12, 18, 0.8);
  }
  .ticker-track {
    display: flex;
    align-items: center;
    gap: 26px;
    width: max-content;
    padding: 14px 0;
    white-space: nowrap;
    animation: ticker 24s linear infinite;
  }
  .ticker-track span {
    font-size: 0.72rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(235,243,255,0.84);
  }
  .ticker-track i { color: var(--primary); font-style: normal; }
  @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  .content-section,
  .education-section,
  .services-section,
  .journey-section,
  .recognition-section,
  .contact-section {
    position: relative;
    padding-top: 92px;
    padding-bottom: 90px;
  }
  .section-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 28px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--line);
  }
  .eyebrow {
    color: var(--primary);
    font-size: 0.68rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    font-weight: 700;
  }
  .section-aside {
    color: var(--soft);
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }

  .about-grid,
  .journey-grid,
  .recognition-grid,
  .contact-grid {
    display: grid;
    grid-template-columns: 1.1fr 1.35fr;
    gap: clamp(24px, 4vw, 64px);
    align-items: start;
  }
  .about-grid h2,
  .journey-grid h2,
  .recognition-grid h2,
  .contact-copy h2 {
    margin: 0;
    font-size: clamp(2.2rem, 4vw, 4.2rem);
    line-height: 0.96;
    letter-spacing: -0.06em;
    text-transform: uppercase;
  }
  .about-grid h2 em,
  .journey-grid h2 em,
  .recognition-grid h2 em,
  .contact-copy h2 em {
    color: transparent;
    -webkit-text-stroke: 1px rgba(235,243,255,0.8);
  }
  .about-copy {
    color: var(--muted);
    font-size: 1rem;
    line-height: 1.8;
  }
  .about-copy p { margin: 0 0 18px; }
  .about-copy .about-lede {
    font-size: 1.22rem;
    color: rgba(235,243,255,0.88);
    line-height: 1.6;
  }
  .about-values {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    margin-top: 30px;
  }
  .about-values span {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 18px 16px;
    border-radius: 18px;
    border: 1px solid var(--line);
    background: rgba(10,15,22,0.4);
    color: rgba(235,243,255,0.9);
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .about-values i {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background: rgba(139,233,253,0.1);
    color: var(--primary);
    font-style: normal;
  }

  .education-inner {
    display: grid;
    grid-template-columns: 0.95fr 1.6fr;
    gap: 28px;
    align-items: end;
  }
  .education-inner h2 {
    margin-top: 16px;
    margin-bottom: 0;
    font-size: clamp(2.3rem, 4vw, 4rem);
    line-height: 1;
    letter-spacing: -0.06em;
    text-transform: uppercase;
  }
  .education-inner h2 em {
    color: transparent;
    -webkit-text-stroke: 1px rgba(235,243,255,0.84);
  }
  .timeline {
    display: grid;
    gap: 18px;
  }
  .timeline-item {
    display: grid;
    grid-template-columns: 170px minmax(0, 1fr) 36px;
    gap: 18px;
    align-items: center;
    padding: 18px 20px;
    border: 1px solid var(--line);
    border-radius: 22px;
    background: linear-gradient(180deg, rgba(10,15,22,0.72), rgba(7,11,18,0.78));
  }
  .timeline-year {
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: var(--text);
  }
  .timeline-year span {
    color: var(--soft);
  }
  .timeline-entry h3 {
    margin: 0 0 8px;
    font-size: 1.3rem;
    letter-spacing: -0.05em;
  }
  .timeline-entry p {
    margin: 0 0 10px;
    color: var(--muted);
    line-height: 1.6;
  }
  .timeline-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--primary);
    font-size: 0.62rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .timeline-arrow {
    color: var(--primary);
  }
  .education-foot {
    display: flex;
    justify-content: space-between;
    gap: 18px;
    margin-top: 28px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
    color: rgba(235,243,255,0.8);
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .education-foot svg { vertical-align: middle; }

  .skills-title-row,
  .projects-title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 22px;
  }
  .skills-title-row h2,
  .projects-title-row h2,
  .services-intro h2 {
    margin: 0;
    font-size: clamp(2.4rem, 4vw, 4.1rem);
    line-height: 0.96;
    letter-spacing: -0.06em;
    text-transform: uppercase;
  }
  .skills-title-row h2 em,
  .projects-title-row h2 em,
  .services-intro h2 em {
    color: transparent;
    -webkit-text-stroke: 1px rgba(235,243,255,0.8);
  }
  .skill-switch,
  .project-filters {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 8px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: rgba(9,15,22,0.72);
  }
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    margin-top: 18px;
  }
  .skill-group {
    padding: 20px 18px 16px;
    background: linear-gradient(180deg, rgba(11,16,24,0.7), rgba(10,14,22,0.82));
    border: 1px solid var(--line);
    border-radius: 22px;
  }
  .skill-group-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: 14px;
    background: rgba(139,233,253,0.08);
    color: var(--primary);
    margin-bottom: 18px;
  }
  .skill-group-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 14px;
  }
  .skill-group-title h3 {
    margin: 0;
    font-size: 1.25rem;
    letter-spacing: -0.04em;
  }
  .skill-group-title span {
    color: var(--soft);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .skill-tags span,
  .project-stack span,
  .service-tags span {
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 0.72rem;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.06);
    border: 1px solid rgba(148, 163, 184, 0.12);
    color: rgba(235,243,255,0.86);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .skills-note {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
    color: var(--muted);
    font-size: 0.82rem;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .services-inner {
    display: grid;
    gap: 22px;
  }
  .services-intro {
    display: grid;
    grid-template-columns: 1fr 0.9fr;
    gap: 20px;
    align-items: end;
  }
  .services-intro p {
    margin: 0;
    color: var(--muted);
    font-size: 1.04rem;
    line-height: 1.8;
  }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    margin-top: 10px;
  }
  .service-item {
    position: relative;
    padding: 22px 20px 18px;
    border-radius: 24px;
    border: 1px solid var(--line);
    background: linear-gradient(180deg, rgba(14,19,28,0.82), rgba(8,12,17,0.86));
  }
  .service-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
    color: var(--primary);
  }
  .service-top span {
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--soft);
  }
  .service-item h3 {
    margin: 0 0 12px;
    font-size: 1.55rem;
    line-height: 1.1;
    letter-spacing: -0.05em;
  }
  .service-item p {
    margin: 0 0 18px;
    color: var(--muted);
    line-height: 1.7;
  }
  .service-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .github-profile {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--text);
    font-size: 0.72rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .project-filters {
    margin-left: auto;
  }
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
  }
  .project-card {
    overflow: hidden;
    border: 1px solid var(--line);
    border-radius: 26px;
    background: linear-gradient(180deg, rgba(11,14,21,0.76), rgba(8,11,17,0.86));
  }
  .project-art {
    position: relative;
    min-height: 280px;
    padding: 16px 16px 0;
    border-bottom: 1px solid rgba(148, 163, 184, 0.12);
    background: linear-gradient(135deg, rgba(18, 24, 31, 0.82), rgba(10, 13, 18, 0.92));
  }
  .project-art-energy { background: linear-gradient(135deg, rgba(10, 36, 41, 0.9), rgba(8, 12, 18, 0.96)); }
  .project-art-network { background: linear-gradient(135deg, rgba(18, 19, 42, 0.94), rgba(8, 12, 18, 0.98)); }
  .project-art-vote { background: linear-gradient(135deg, rgba(34, 20, 32, 0.92), rgba(9, 12, 20, 0.96)); }
  .project-art-car { background: linear-gradient(135deg, rgba(25, 28, 46, 0.9), rgba(11, 14, 20, 0.96)); }
  .project-art-vault { background: linear-gradient(135deg, rgba(19, 22, 35, 0.9), rgba(10, 13, 16, 0.96)); }
  .project-art-code { background: linear-gradient(135deg, rgba(16, 22, 28, 0.9), rgba(9, 13, 17, 0.96)); }
  .art-window {
    position: relative;
    height: 220px;
    border-radius: 18px 18px 10px 10px;
    border: 1px solid rgba(148,163,184,0.14);
    background: rgba(9, 12, 20, 0.65);
    overflow: hidden;
  }
  .art-window-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 32px;
    padding: 0 12px;
    border-bottom: 1px solid rgba(148,163,184,0.08);
    background: rgba(15, 22, 30, 0.72);
    color: rgba(235,243,255,0.82);
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .art-window-bar span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: rgba(148,163,184,0.4);
  }
  .art-window-bar i {
    margin-left: auto;
    font-style: normal;
    opacity: 0.7;
  }
  .project-index {
    position: absolute;
    right: 18px;
    bottom: 18px;
    color: rgba(255,255,255,0.7);
    font-size: 0.66rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .project-arrow {
    position: absolute;
    right: 18px;
    top: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 999px;
    background: rgba(9, 14, 21, 0.8);
    border: 1px solid rgba(148,163,184,0.14);
    color: var(--text);
  }

  .project-details {
    padding: 20px 18px 18px;
  }
  .project-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
  }
  .project-title span {
    color: var(--primary);
    font-size: 0.66rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .project-title h3 {
    margin: 0;
    font-size: 1.8rem;
    letter-spacing: -0.06em;
  }
  .project-details p {
    margin: 0 0 18px;
    color: var(--muted);
    line-height: 1.75;
  }
  .project-bottom {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 14px;
  }
  .project-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .project-links {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  .project-links a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 999px;
    background: rgba(148,163,184,0.06);
    border: 1px solid rgba(148,163,184,0.12);
  }

  .energy-visual,
  .network-visual,
  .vote-visual,
  .car-visual,
  .vault-visual,
  .code-visual {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .energy-visual { padding: 26px 24px; }
  .visual-stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: rgba(235,243,255,0.8);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .visual-stat b {
    color: var(--primary);
    font-size: 1.6rem;
    letter-spacing: -0.05em;
  }
  .energy-chart {
    position: relative;
    height: 120px;
    margin-top: 10px;
    border-radius: 18px;
    background: linear-gradient(180deg, rgba(12, 22, 28, 0.8), rgba(8, 12, 18, 0.68));
    overflow: hidden;
  }
  .energy-chart span {
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(148,163,184,0.12);
  }
  .energy-chart span:nth-child(1) { top: 12%; }
  .energy-chart span:nth-child(2) { top: 28%; }
  .energy-chart span:nth-child(3) { top: 44%; }
  .energy-chart span:nth-child(4) { top: 60%; }
  .energy-chart span:nth-child(5) { top: 76%; }
  .energy-chart span:nth-child(6) { top: 90%; }
  .energy-chart span:nth-child(7) { left: 4%; right: 4%; top: 24%; }
  .energy-chart span:nth-child(8) { left: 4%; right: 2%; top: 38%; }
  .energy-chart span:nth-child(9) { left: 2%; right: 8%; top: 52%; }
  .energy-chart span:nth-child(10) { left: 0%; right: 10%; top: 68%; }
  .energy-chart span:nth-child(11) { left: 8%; right: 12%; top: 82%; }
  .energy-chart span:nth-child(12) { left: 12%; right: 14%; top: 94%; }
  .energy-chart svg {
    position: absolute;
    inset: 10px 12px 8px 12px;
    width: calc(100% - 24px);
    height: calc(100% - 18px);
  }
  .energy-chart path {
    fill: none;
    stroke: rgba(139,233,253,0.9);
    stroke-width: 3;
    stroke-linecap: round;
  }
  .visual-legend {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-top: 18px;
    color: rgba(235,243,255,0.66);
    font-size: 0.58rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .visual-legend i { display: inline-block; width: 10px; height: 10px; border-radius: 999px; background: var(--primary); box-shadow: 0 0 18px rgba(139,233,253,0.8); }
  .visual-legend span { color: var(--accent); }

  .network-visual {
    display: grid;
    place-items: center;
    min-height: 190px;
  }
  .network-line {
    position: absolute;
    left: 18%;
    right: 18%;
    top: 48%;
    height: 2px;
    background: linear-gradient(90deg, rgba(139,233,253,0.1), rgba(139,233,253,0.8), rgba(139,233,253,0.1));
    box-shadow: 0 0 22px rgba(139,233,253,0.7);
  }
  .network-node {
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 999px;
    border: 1px solid rgba(139,233,253,0.34);
    background: rgba(13, 18, 24, 0.8);
    color: var(--primary);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .node-a { left: 16%; top: 30%; }
  .node-b { left: 52%; top: 18%; }
  .node-c { right: 18%; bottom: 24%; }
  .network-caption {
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 18px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    color: rgba(235,243,255,0.7);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
  }
  .network-caption b { color: var(--text); font-size: 0.7rem; letter-spacing: 0.09em; }

  .vote-visual {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    min-height: 190px;
  }
  .vote-orbit {
    position: relative;
    width: 150px;
    height: 150px;
  }
  .vote-core {
    position: absolute;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 68px;
    height: 68px;
    border-radius: 999px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(139,233,253,0.3);
    box-shadow: 0 0 30px rgba(139,233,253,0.12);
    color: var(--primary);
  }
  .vote-orbit i {
    position: absolute;
    inset: 0;
    border: 1px solid rgba(139,233,253,0.19);
    border-radius: 50%;
  }
  .vote-orbit i:nth-child(2) { transform: scale(1.18); }
  .vote-orbit i:nth-child(3) { transform: scale(1.34); }
  .vote-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--text);
    font-size: 1.38rem;
    letter-spacing: -0.05em;
    text-transform: uppercase;
  }
  .vote-label span {
    color: rgba(235,243,255,0.7);
    font-size: 0.55rem;
    letter-spacing: 0.18em;
  }
  .vote-chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
  }
  .vote-chips span {
    padding: 0.42rem 0.7rem;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.08);
    border: 1px solid rgba(148, 163, 184, 0.16);
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(235,243,255,0.8);
  }

  .car-visual {
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 22px 20px 18px;
    min-height: 190px;
  }
  .car-flag {
    display: inline-flex;
    margin-bottom: 8px;
    color: var(--primary);
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .car-icon {
    width: 56px;
    height: 56px;
    color: rgba(235,243,255,0.9);
    margin-bottom: 18px;
  }
  .car-detail {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .car-detail b {
    font-size: 1.3rem;
    letter-spacing: -0.05em;
  }
  .car-detail span {
    color: rgba(235,243,255,0.64);
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .vault-visual {
    display: grid;
    place-items: center;
    min-height: 190px;
    padding: 18px 20px;
    text-align: center;
  }
  .vault-orbit {
    display: grid;
    place-items: center;
    width: 84px;
    height: 84px;
    border-radius: 999px;
    border: 1px solid rgba(139,233,253,0.34);
    background: rgba(12,16,22,0.65);
    box-shadow: inset 0 0 30px rgba(139,233,253,0.08), 0 0 22px rgba(139,233,253,0.08);
    color: var(--primary);
    margin-bottom: 18px;
  }
  .vault-visual span {
    color: rgba(235,243,255,0.7);
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .vault-visual b {
    display: block;
    margin: 10px 0 12px;
    font-size: 1.55rem;
    letter-spacing: -0.05em;
  }
  .vault-address {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.5rem 0.8rem;
    border-radius: 999px;
    background: rgba(148,163,184,0.06);
    border: 1px solid rgba(148,163,184,0.12);
    font-size: 0.66rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .code-visual {
    display: grid;
    place-items: center;
    min-height: 190px;
    padding: 18px 20px;
  }
  .code-lines {
    display: grid;
    gap: 10px;
    width: 100%;
    margin-bottom: 24px;
  }
  .code-lines span {
    display: block;
    height: 8px;
    border-radius: 999px;
    background: linear-gradient(90deg, rgba(139,233,253,0.18), rgba(139,233,253,0.46), rgba(148,163,184,0.08));
  }
  .code-status {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: rgba(235,243,255,0.68);
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .code-status i {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: var(--success);
    box-shadow: 0 0 18px rgba(96,228,167,0.7);
  }
  .code-mark {
    position: absolute;
    right: 18px;
    bottom: 18px;
    color: var(--primary);
    width: 42px;
    height: 42px;
  }

  .journey-role {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    color: var(--primary);
    font-size: 0.66rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .journey-role span { color: var(--soft); }
  .journey-grid p {
    margin: 0 0 18px;
    color: var(--muted);
    font-size: 1.06rem;
    line-height: 1.8;
  }
  .journey-bottom {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 30px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
  }
  .journey-bottom span {
    display: inline-flex;
    align-items: center;
    padding: 0.7rem 0.9rem;
    border-radius: 999px;
    background: rgba(148,163,184,0.06);
    border: 1px solid rgba(148,163,184,0.14);
    color: rgba(235,243,255,0.8);
    font-size: 0.62rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .recognition-list {
    display: grid;
    gap: 16px;
  }
  .recognition-list article {
    display: grid;
    grid-template-columns: 54px minmax(0, 1fr) auto;
    gap: 16px;
    align-items: center;
    padding: 18px 20px;
    border-radius: 22px;
    border: 1px solid var(--line);
    background: rgba(9, 14, 21, 0.68);
  }
  .recognition-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: rgba(139,233,253,0.08);
    color: var(--primary);
  }
  .recognition-list h3 {
    margin: 0 0 4px;
    font-size: 1.3rem;
    letter-spacing: -0.05em;
  }
  .recognition-list p {
    margin: 0;
    color: var(--muted);
    line-height: 1.6;
  }
  .recognition-tag {
    color: var(--soft);
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .recognition-note {
    background: linear-gradient(180deg, rgba(14,20,27,0.88), rgba(8,13,18,0.94));
  }

  .contact-panel {
    padding: clamp(20px, 3vw, 30px);
    border: 1px solid var(--line);
    border-radius: 30px;
    background: linear-gradient(180deg, rgba(10,15,22,0.88), rgba(8,10,17,0.92));
    box-shadow: var(--shadow);
  }
  .contact-copy {
    display: flex;
    flex-direction: column;
  }
  .contact-availability {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--primary);
    font-size: 0.64rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  .contact-copy p {
    margin: 0 0 24px;
    color: var(--muted);
    line-height: 1.8;
  }
  .contact-email {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
    color: rgba(235,243,255,0.9);
    font-size: 1.1rem;
    line-height: 1.5;
  }
  .contact-socials {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .contact-socials a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.72rem 0.9rem;
    border-radius: 999px;
    background: rgba(148,163,184,0.06);
    border: 1px solid rgba(148,163,184,0.12);
    color: rgba(235,243,255,0.9);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .contact-form {
    display: grid;
    gap: 14px;
    padding: 16px 12px 0;
  }
  .contact-form label {
    color: rgba(235,243,255,0.8);
    font-size: 0.68rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 0.9rem 1rem;
    border: 1px solid rgba(148,163,184,0.16);
    border-radius: 16px;
    background: rgba(9, 14, 20, 0.7);
    color: var(--text);
    resize: vertical;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .contact-form input::placeholder,
  .contact-form textarea::placeholder { color: rgba(168,183,206,0.66); }
  .contact-form input:focus,
  .contact-form textarea:focus {
    outline: none;
    border-color: rgba(139,233,253,0.48);
    box-shadow: 0 0 0 4px rgba(100, 213, 255, 0.12);
  }
  .form-status {
    margin: 8px 0 0;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: var(--primary);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .site-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 30px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
    color: var(--muted);
    font-size: 0.64rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
  .footer-brand {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.2rem;
    height: 2.2rem;
    border-radius: 0.8rem;
    background: rgba(139,233,253,0.08);
    color: var(--primary);
    font-weight: 700;
  }
  .footer-brand span { color: var(--accent); }
  .footer-up { transform: rotate(180deg); }

  @media (max-width: 1180px) {
    .section-rail { display: none; }
    .hero-content { padding-left: 0; }
    .portrait-frame { width: min(40vw, 330px); }
  }

  @media (max-width: 980px) {
    .site-header {
      position: sticky;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .main-nav {
      order: 3;
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
      padding: 12px 14px;
    }
    .header-contact { display: none; }
    .hero { padding-top: 24px; }
    .hero-workspace, .hero-shade { height: 60vh; }
    .portrait-frame {
      position: relative;
      right: auto;
      bottom: auto;
      width: min(100%, 420px);
      margin: 26px auto 0;
    }
    .hero-coordinate { display: none; }
    .about-grid,
    .education-inner,
    .services-intro,
    .journey-grid,
    .recognition-grid,
    .contact-grid {
      grid-template-columns: 1fr;
    }
    .services-grid,
    .skills-grid,
    .projects-grid {
      grid-template-columns: 1fr 1fr;
    }
    .about-values { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 640px) {
    .wordmark-name small { display: none; }
    .main-nav { gap: 12px 18px; }
    .main-nav a { letter-spacing: 0.1em; }
    .hero-kicker { gap: 10px; font-size: 0.56rem; letter-spacing: 0.16em; }
    .hero-intro { letter-spacing: 0.2em; }
    .hero-scroll { margin-left: 0; }
    .projects-title-row,
    .skills-title-row,
    .section-heading,
    .education-foot {
      flex-direction: column;
      align-items: flex-start;
    }
    .services-grid,
    .projects-grid,
    .skills-grid,
    .about-values {
      grid-template-columns: 1fr;
    }
    .timeline-item {
      grid-template-columns: 1fr;
      gap: 8px;
    }
    .recognition-list article {
      grid-template-columns: 1fr;
      text-align: left;
    }
    .contact-form {
      padding: 0;
    }
  }

  body {
    background:
      radial-gradient(ellipse at 8% 34%, rgba(37, 99, 235, 0.62), transparent 36rem),
      radial-gradient(ellipse at 92% 70%, rgba(59, 130, 246, 0.48), transparent 38rem),
      radial-gradient(ellipse at 74% 8%, rgba(34, 211, 238, 0.2), transparent 27rem),
      linear-gradient(145deg, #173b87, #080b12 38%, #102653);
  }
  .portfolio-shell {
    width: min(1540px, calc(100% - 32px));
    max-width: 1540px;
    min-height: 100vh;
    margin: 16px auto;
    overflow: hidden;
    border: 1px solid rgba(148, 163, 184, 0.17);
    border-radius: 34px;
    background:
      radial-gradient(ellipse at 52% 0%, rgba(37, 99, 235, 0.13), transparent 36rem),
      linear-gradient(160deg, rgba(10, 15, 25, 0.96), rgba(7, 9, 15, 0.98) 50%, rgba(10, 10, 20, 0.97));
    box-shadow: 0 32px 120px rgba(0, 0, 0, 0.68), 0 0 90px rgba(37, 99, 235, 0.12);
  }
  .portfolio-shell::before {
    z-index: 0;
    opacity: 0.28;
    background-size: 64px 64px;
  }
  .portfolio-shell > * { position: relative; }
  .site-header {
    width: 100%;
    max-width: 1380px;
    min-height: 86px;
    padding-top: 16px;
    padding-bottom: 16px;
    background: linear-gradient(180deg, rgba(8, 11, 18, 0.84), rgba(8, 11, 18, 0.24));
  }
  .wordmark-mark { animation: logo-glow 4s ease-in-out infinite; }
  .main-nav {
    position: relative;
    gap: clamp(14px, 2.2vw, 30px);
    padding: 12px 20px;
  }
  .main-nav a.nav-center-logo {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
    padding: 0;
    border: 1px solid rgba(34, 211, 238, 0.42);
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.12);
    box-shadow: 0 0 22px rgba(34, 211, 238, 0.22);
    color: #22d3ee;
    font-weight: 700;
    font-size: 0.8rem;
    animation: logo-glow 4s ease-in-out infinite;
  }
  .main-nav a.nav-center-logo:hover { color: #22d3ee; }
  .main-nav a {
    white-space: nowrap;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
  }
  .header-contact {
    border-color: rgba(34, 211, 238, 0.4);
    background: linear-gradient(115deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.14));
  }
  .site-header .menu-toggle { display: none; }
  .hero {
    min-height: 800px;
    padding-top: 24px;
    padding-bottom: 44px;
  }
  .hero-workspace {
    height: 100%;
    min-height: 720px;
    opacity: 0.76;
    filter: saturate(0.9) contrast(1.08) brightness(0.82);
    background:
      radial-gradient(ellipse at 50% 43%, rgba(34, 211, 238, 0.28), transparent 22rem),
      radial-gradient(ellipse at 50% 47%, rgba(37, 99, 235, 0.34), transparent 36rem),
      linear-gradient(145deg, #102858, #080b12 62%, #101f43);
  }
  .hero-workspace::before {
    content: "";
    position: absolute;
    top: 24%;
    left: 52%;
    width: clamp(240px, 42vw, 560px);
    aspect-ratio: 1.65;
    transform: translateX(-50%);
    border: 1px solid rgba(103, 232, 249, 0.22);
    border-radius: 14px;
    background:
      linear-gradient(180deg, rgba(59, 130, 246, 0.18), rgba(8, 11, 18, 0.84)),
      repeating-linear-gradient(0deg, transparent 0 23px, rgba(34, 211, 238, 0.09) 24px),
      repeating-linear-gradient(90deg, transparent 0 34px, rgba(34, 211, 238, 0.08) 35px);
    box-shadow: 0 0 90px rgba(37, 99, 235, 0.3), inset 0 0 48px rgba(34, 211, 238, 0.1);
    opacity: 0.56;
  }
  .hero-workspace::after {
    content: "";
    position: absolute;
    left: 48%;
    top: 55%;
    width: clamp(100px, 17vw, 220px);
    height: clamp(100px, 19vw, 240px);
    transform: translate(-50%, -10%);
    border-radius: 48% 48% 15% 15%;
    background: linear-gradient(180deg, rgba(5, 10, 22, 0.82), rgba(5, 10, 22, 0.04));
    filter: blur(2px);
    opacity: 0.55;
  }
  .hero-shade {
    height: 100%;
    min-height: 720px;
    background:
      linear-gradient(90deg, rgba(5, 8, 14, 0.72), rgba(5, 8, 14, 0.34) 58%, rgba(5, 8, 14, 0.28)),
      linear-gradient(0deg, #080b12, transparent 30%, rgba(8, 11, 18, 0.06));
  }
  .hero-content {
    max-width: 790px;
    padding-top: clamp(100px, 12vw, 164px);
    padding-left: clamp(0px, 7vw, 92px);
  }
  .hero-intro { color: #22d3ee; }
  .hero-content h1 {
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(4.5rem, 9vw, 8.6rem);
    font-weight: 500;
    letter-spacing: -0.07em;
    line-height: 0.82;
    text-transform: none;
  }
  .hero-content h1 span,
  .hero-content h1 em {
    font-style: italic;
  }
  .hero-content h1 em {
    -webkit-text-stroke-color: rgba(255, 255, 255, 0.86);
  }
  .hero-tagline span { color: #22d3ee; }
  .button-glow {
    background: linear-gradient(110deg, #3b82f6, #22d3ee) !important;
    border-color: rgba(147, 197, 253, 0.54) !important;
    color: #fff !important;
    box-shadow: 0 10px 32px rgba(37, 99, 235, 0.3);
    transition: transform 180ms ease, box-shadow 180ms ease;
  }
  .button-glow:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba(34, 211, 238, 0.28);
  }
  .portrait-frame {
    right: clamp(30px, 7vw, 96px);
    bottom: 42px;
    width: min(29vw, 340px);
    padding: 12px 12px 0;
    border-color: rgba(147, 197, 253, 0.28);
    background: rgba(8, 11, 18, 0.58);
    animation: portrait-float 7s ease-in-out infinite;
  }
  .portrait-frame img {
    height: 236px;
    max-height: none;
    object-fit: cover;
    object-position: center 49%;
    filter: saturate(0.78) contrast(1.06) brightness(1.03);
    box-shadow: 0 0 34px rgba(59, 130, 246, 0.18);
  }
  .ticker { background: rgba(8, 11, 18, 0.7); }
  .ticker-track i { color: #a855f7; }
  .content-section,
  .education-section,
  .services-section,
  .journey-section,
  .recognition-section,
  .contact-section {
    scroll-margin-top: 96px;
  }
  .about-copy {
    padding: clamp(20px, 3vw, 34px);
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 24px;
    background: linear-gradient(140deg, rgba(15, 23, 42, 0.72), rgba(9, 13, 22, 0.76));
    box-shadow: 0 18px 55px rgba(0, 0, 0, 0.2);
    transform: perspective(1000px) rotateY(-2deg);
    transition: transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease;
  }
  .about-copy:hover {
    transform: perspective(1000px) rotateY(0deg) translateY(-3px);
    border-color: rgba(34, 211, 238, 0.28);
    box-shadow: 0 24px 60px rgba(37, 99, 235, 0.12);
  }
  .about-values span:hover,
  .skill-group:hover,
  .service-item:hover {
    border-color: rgba(34, 211, 238, 0.34);
    box-shadow: 0 20px 50px rgba(59, 130, 246, 0.12), 0 0 24px rgba(34, 211, 238, 0.06);
    transform: translateY(-4px);
  }
  .about-values span,
  .skill-group,
  .service-item,
  .project-card {
    transition: transform 260ms ease, border-color 260ms ease, box-shadow 260ms ease;
  }
  .skill-group-featured {
    grid-column: span 2;
    border-color: rgba(59, 130, 246, 0.36);
    background: linear-gradient(140deg, rgba(30, 58, 138, 0.2), rgba(10, 14, 22, 0.84));
  }
  .skill-switch {
    justify-content: flex-end;
    border-radius: 18px;
  }
  .skill-switch button { max-width: 210px; white-space: normal; }
  .project-card:hover {
    transform: perspective(1200px) rotateX(1deg) translateY(-5px);
    border-color: rgba(34, 211, 238, 0.32);
    box-shadow: 0 24px 65px rgba(0, 0, 0, 0.32), 0 0 28px rgba(59, 130, 246, 0.1);
  }
  .project-links a {
    width: auto;
    min-height: 36px;
    padding: 0 10px;
    gap: 5px;
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .project-links a:hover,
  .contact-socials a:hover,
  .github-profile:hover { color: #22d3ee; border-color: rgba(34, 211, 238, 0.38); }
  .services-grid { perspective: 1000px; }
  .service-item:hover { transform: perspective(900px) rotateX(1deg) translateY(-4px); }
  .recognition-list .text-link {
    margin-top: 12px;
    font-size: 0.62rem;
  }
  .form-status-success { color: #60e4a7; }
  .form-status-error { color: #fca5a5; }
  .portfolio-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 38px;
    padding: 0.62rem 0.92rem;
    border: 1px solid rgba(59, 130, 246, 0.36);
    border-radius: 12px;
    background: linear-gradient(120deg, rgba(37, 99, 235, 0.88), rgba(8, 145, 178, 0.88));
    color: #fff;
    font-size: 0.74rem;
    font-weight: 600;
    line-height: 1.2;
    cursor: pointer;
    transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
  }
  .portfolio-button:hover {
    transform: translateY(-1px);
    border-color: rgba(34, 211, 238, 0.62);
    box-shadow: 0 8px 22px rgba(37, 99, 235, 0.2);
  }
  .portfolio-button[data-variant="ghost"] {
    border-color: transparent;
    background: transparent;
    color: var(--muted);
  }
  .portfolio-button[data-variant="ghost"]:hover {
    background: rgba(59, 130, 246, 0.12);
    color: var(--text);
  }
  .portfolio-button[data-size="sm"] {
    min-height: 32px;
    padding: 0.46rem 0.72rem;
    font-size: 0.67rem;
  }
  .portfolio-button[data-size="icon"] {
    width: 40px;
    height: 40px;
    min-height: 40px;
    padding: 0;
  }
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 650ms ease, transform 650ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }
  .reveal-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
  :focus-visible {
    outline: 2px solid #22d3ee;
    outline-offset: 4px;
  }
  @keyframes logo-glow {
    0%, 100% { box-shadow: 0 0 12px rgba(34, 211, 238, 0.14); }
    50% { box-shadow: 0 0 24px rgba(168, 85, 247, 0.32); }
  }
  @keyframes portrait-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-9px); }
  }
  :root {
    color-scheme: light;
    --bg: #f3eee3;
    --bg-elevated: rgba(253, 250, 243, 0.9);
    --panel: rgba(250, 247, 239, 0.9);
    --panel-strong: rgba(255, 252, 245, 0.97);
    --line: rgba(65, 53, 39, 0.17);
    --line-strong: rgba(65, 53, 39, 0.32);
    --text: #201f1b;
    --muted: #5e6058;
    --soft: #858174;
    --primary: #bd4d2e;
    --primary-strong: #dd8134;
    --accent: #176d5c;
    --success: #16816a;
    --shadow: 0 24px 80px rgba(58, 45, 28, 0.15);
  }
  body {
    color: var(--text);
    background:
      radial-gradient(ellipse at 12% 40%, rgba(201, 111, 63, 0.2), transparent 34rem),
      radial-gradient(ellipse at 88% 62%, rgba(39, 121, 97, 0.2), transparent 36rem),
      linear-gradient(145deg, #eee4d2, #f8f4eb 46%, #e8e4d7);
  }
  .portfolio-shell {
    color: var(--text);
    border-color: rgba(77, 62, 42, 0.18);
    background:
      radial-gradient(ellipse at 52% 4%, rgba(191, 97, 56, 0.09), transparent 38rem),
      linear-gradient(155deg, rgba(250, 247, 239, 0.98), rgba(242, 238, 228, 0.98));
    box-shadow: 0 32px 100px rgba(57, 45, 29, 0.2), 0 0 70px rgba(36, 112, 88, 0.08);
  }
  .portfolio-shell::before {
    opacity: 0.22;
    background-image:
      linear-gradient(rgba(77, 62, 42, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(77, 62, 42, 0.08) 1px, transparent 1px);
  }
  .site-header {
    background: linear-gradient(180deg, rgba(248, 245, 237, 0.96), rgba(248, 245, 237, 0.72));
    border-bottom: 1px solid rgba(77, 62, 42, 0.1);
  }
  .wordmark-mark {
    border-color: rgba(189, 77, 46, 0.25);
    background: linear-gradient(135deg, rgba(189, 77, 46, 0.16), rgba(23, 109, 92, 0.1));
    color: var(--primary);
    box-shadow: inset 0 0 24px rgba(189, 77, 46, 0.08);
  }
  .wordmark-mark span { color: var(--accent); }
  .wordmark-name { color: var(--text); }
  .wordmark-name small { color: var(--soft); }
  .main-nav {
    border-color: var(--line);
    background: rgba(250, 247, 239, 0.88);
    box-shadow: 0 8px 26px rgba(71, 56, 36, 0.08), inset 0 1px 0 rgba(255,255,255,0.72);
  }
  .main-nav a { color: var(--muted); }
  .main-nav a:hover,
  .main-nav a:focus-visible { color: var(--text); }
  .main-nav a.nav-center-logo {
    border-color: rgba(23, 109, 92, 0.3);
    background: linear-gradient(140deg, rgba(189, 77, 46, 0.13), rgba(23, 109, 92, 0.14));
    box-shadow: 0 0 20px rgba(23, 109, 92, 0.16);
    color: var(--accent);
  }
  .main-nav a.nav-center-logo:hover { color: var(--accent); }
  .header-contact {
    border-color: rgba(189, 77, 46, 0.27);
    background: linear-gradient(115deg, rgba(189, 77, 46, 0.1), rgba(23, 109, 92, 0.1));
    color: var(--text);
  }
  .hero-workspace {
    opacity: 0.8;
    filter: none;
    background:
      radial-gradient(ellipse at 52% 45%, rgba(251, 238, 205, 0.7), transparent 23rem),
      radial-gradient(ellipse at 50% 48%, rgba(23, 109, 92, 0.12), transparent 34rem),
      linear-gradient(145deg, #eee5d6, #f7f2e7 56%, #e9e5d9);
  }
  .hero-workspace::before {
    top: 9%;
    left: 50%;
    width: clamp(370px, 56vw, 700px);
    aspect-ratio: 1;
    transform:
      translate3d(calc(-50% + var(--depth-x, 0px)), var(--depth-y, 0px), 0)
      rotateX(calc(58deg + var(--depth-rotate, 0deg)))
      rotateZ(-22deg);
    border: 0;
    border-radius: 50%;
    background:
      radial-gradient(ellipse at 32% 28%, rgba(255, 250, 231, 0.9), transparent 48%),
      radial-gradient(circle, rgba(189, 77, 46, 0.78) 1.15px, transparent 1.8px),
      radial-gradient(circle, rgba(23, 109, 92, 0.78) 1px, transparent 1.7px);
    background-size: 100% 100%, 13px 13px, 17px 17px;
    background-position: center, 0 0, 6px 8px;
    -webkit-mask-image: radial-gradient(ellipse, #000 48%, rgba(0,0,0,0.72) 58%, transparent 73%);
    mask-image: radial-gradient(ellipse, #000 48%, rgba(0,0,0,0.72) 58%, transparent 73%);
    box-shadow: none;
    opacity: 0.62;
    transition: transform 450ms cubic-bezier(0.2, 0.7, 0.2, 1);
    animation: orb-breathe 8s ease-in-out infinite;
  }
  .hero-workspace::after {
    background: linear-gradient(180deg, rgba(25, 45, 38, 0.24), rgba(25, 45, 38, 0.01));
    filter: blur(5px);
    opacity: 0.2;
  }
  .hero-shade {
    background:
      linear-gradient(90deg, rgba(246, 242, 232, 0.84), rgba(246, 242, 232, 0.46) 58%, rgba(246, 242, 232, 0.24)),
      linear-gradient(0deg, #f3eee3, transparent 30%, rgba(243, 238, 227, 0.08));
  }
  .hero-intro,
  .hero-kicker { color: var(--accent); }
  .hero-content h1 { color: var(--primary); }
  .hero-content h1 em {
    color: #176d5c;
    -webkit-text-stroke: 0;
    text-shadow: none;
  }
  .hero-tagline { color: var(--text); }
  .hero-tagline span { color: var(--accent); }
  .hero-description,
  .about-copy,
  .services-intro p,
  .timeline-entry p,
  .journey-grid p,
  .recognition-list p,
  .contact-copy p { color: var(--muted); }
  .hero-coordinate,
  .section-rail a { color: var(--soft); }
  .section-rail a span:first-child { color: var(--primary); }
  .status-dot {
    background: var(--success);
    box-shadow: 0 0 16px rgba(22, 129, 106, 0.36);
  }
  .kicker-rule { background: linear-gradient(90deg, rgba(23, 109, 92, 0.6), transparent); }
  .button-glow {
    border-color: rgba(189, 77, 46, 0.32) !important;
    background: linear-gradient(110deg, #bd4d2e, #dc8533) !important;
    box-shadow: 0 10px 28px rgba(189, 77, 46, 0.2);
  }
  .button-glow:hover { box-shadow: 0 14px 34px rgba(189, 77, 46, 0.23); }
  .text-link,
  .contact-email,
  .contact-socials a,
  .about-values span,
  .journey-bottom span { color: var(--text); }
  .text-link svg { color: var(--accent); }
  .portrait-frame {
    border-color: rgba(23, 109, 92, 0.26);
    background: rgba(250, 247, 239, 0.76);
    box-shadow: 0 24px 60px rgba(56, 45, 29, 0.18), 0 0 32px rgba(23, 109, 92, 0.11);
  }
  .portrait-frame img { box-shadow: 0 0 28px rgba(189, 77, 46, 0.13); }
  .portrait-caption { color: var(--muted); }
  .ticker {
    border-color: var(--line);
    background: rgba(232, 226, 213, 0.86);
  }
  .ticker-track span { color: var(--text); }
  .ticker-track i { color: var(--primary); }
  .eyebrow { color: var(--accent); }
  .section-aside { color: var(--soft); }
  .section-heading { border-color: var(--line); }
  .about-grid h2,
  .journey-grid h2,
  .recognition-grid h2,
  .contact-copy h2,
  .education-inner h2,
  .skills-title-row h2,
  .projects-title-row h2,
  .services-intro h2 { color: var(--text); }
  .about-grid h2 em,
  .journey-grid h2 em,
  .recognition-grid h2 em,
  .contact-copy h2 em,
  .education-inner h2 em,
  .skills-title-row h2 em,
  .projects-title-row h2 em,
  .services-intro h2 em {
    color: var(--primary);
    -webkit-text-stroke: 0;
  }
  .about-copy,
  .timeline-item,
  .skill-group,
  .service-item,
  .project-card,
  .recognition-list article {
    border-color: rgba(77, 62, 42, 0.16);
    background: linear-gradient(145deg, rgba(255, 252, 245, 0.94), rgba(242, 237, 226, 0.9));
    box-shadow: 0 14px 38px rgba(70, 53, 33, 0.08);
  }
  .about-copy { color: var(--muted); }
  .about-copy .about-lede { color: var(--text); }
  .about-values span,
  .journey-bottom span,
  .contact-socials a,
  .skill-switch,
  .project-filters {
    border-color: var(--line);
    background: rgba(255, 252, 245, 0.74);
  }
  .about-values i,
  .skill-group-icon,
  .recognition-icon {
    background: rgba(23, 109, 92, 0.1);
    color: var(--accent);
  }
  .education-foot {
    border-color: var(--line);
    color: var(--muted);
  }
  .timeline-year,
  .timeline-entry h3,
  .skill-group-title h3,
  .service-item h3,
  .project-title h3,
  .recognition-list h3 { color: var(--text); }
  .timeline-year span,
  .skill-group-title span,
  .recognition-tag { color: var(--soft); }
  .timeline-status { color: var(--accent); }
  .skill-group-featured {
    border-color: rgba(23, 109, 92, 0.26);
    background: linear-gradient(145deg, rgba(23, 109, 92, 0.1), rgba(255, 252, 245, 0.9));
  }
  .skill-tags span,
  .project-stack span,
  .service-tags span {
    border-color: rgba(77, 62, 42, 0.14);
    background: rgba(255, 255, 255, 0.62);
    color: var(--muted);
  }
  .skills-note { color: var(--muted); }
  .service-top,
  .project-title span,
  .github-profile { color: var(--accent); }
  .service-item:hover,
  .skill-group:hover,
  .about-values span:hover,
  .project-card:hover {
    border-color: rgba(23, 109, 92, 0.34);
    box-shadow: 0 24px 54px rgba(51, 74, 57, 0.14);
  }
  .project-art,
  .project-art-energy,
  .project-art-network,
  .project-art-vote,
  .project-art-car,
  .project-art-vault,
  .project-art-code {
    background:
      radial-gradient(ellipse at 50% 20%, rgba(184, 110, 63, 0.3), transparent 55%),
      linear-gradient(145deg, #34352e, #1d2723 62%, #29231f);
  }
  .art-window {
    border-color: rgba(233, 218, 183, 0.16);
    background: rgba(23, 31, 27, 0.8);
  }
  .art-window-bar { background: rgba(31, 39, 33, 0.82); }
  .project-details p { color: var(--muted); }
  .project-links a {
    border-color: var(--line);
    background: rgba(255, 252, 245, 0.78);
    color: var(--text);
  }
  .project-links a:hover,
  .contact-socials a:hover,
  .github-profile:hover { color: var(--accent); border-color: rgba(23, 109, 92, 0.38); }
  .journey-role { color: var(--accent); }
  .recognition-note {
    background: linear-gradient(145deg, rgba(23, 109, 92, 0.08), rgba(255, 252, 245, 0.96)) !important;
  }
  .contact-panel {
    border-color: var(--line);
    background: linear-gradient(145deg, rgba(255, 252, 245, 0.98), rgba(241, 236, 225, 0.96));
    box-shadow: 0 28px 80px rgba(63, 48, 30, 0.13);
  }
  .contact-form label { color: var(--muted); }
  .contact-form input,
  .contact-form textarea {
    border-color: rgba(77, 62, 42, 0.2);
    background: rgba(255, 255, 255, 0.62);
    color: var(--text);
  }
  .contact-form input::placeholder,
  .contact-form textarea::placeholder { color: var(--soft); }
  .contact-form input:focus,
  .contact-form textarea:focus {
    border-color: rgba(23, 109, 92, 0.48);
    box-shadow: 0 0 0 4px rgba(23, 109, 92, 0.1);
  }
  .site-footer { border-color: var(--line); color: var(--muted); }
  .footer-brand { background: rgba(23, 109, 92, 0.1); color: var(--accent); }
  .form-status-success { color: var(--success); }
  .form-status-error { color: #a63e2b; }
  .portfolio-button {
    border-color: rgba(189, 77, 46, 0.28);
    background: linear-gradient(120deg, #bd4d2e, #dc8533);
    color: #fff;
  }
  .portfolio-button:hover {
    border-color: rgba(189, 77, 46, 0.5);
    box-shadow: 0 8px 22px rgba(189, 77, 46, 0.18);
  }
  .portfolio-button[data-variant="ghost"] { color: var(--muted); }
  .portfolio-button[data-variant="ghost"]:hover {
    background: rgba(23, 109, 92, 0.1);
    color: var(--text);
  }
  :focus-visible { outline-color: var(--accent); }
  @keyframes orb-breathe {
    0%, 100% { opacity: 0.48; }
    50% { opacity: 0.7; }
  }
  @keyframes logo-glow {
    0%, 100% { box-shadow: 0 0 12px rgba(23, 109, 92, 0.12); }
    50% { box-shadow: 0 0 22px rgba(189, 77, 46, 0.24); }
  }
  :root {
    color-scheme: dark;
    --bg: #080b12;
    --bg-elevated: rgba(15, 23, 33, 0.8);
    --panel: rgba(10, 15, 22, 0.76);
    --panel-strong: rgba(16, 19, 27, 0.9);
    --line: rgba(148, 163, 184, 0.16);
    --line-strong: rgba(148, 163, 184, 0.32);
    --text: #ebf3ff;
    --muted: #a8b7ce;
    --soft: #7d8aa5;
    --primary: #3b82f6;
    --primary-strong: #22d3ee;
    --accent: #22d3ee;
    --success: #60e4a7;
    --shadow: 0 24px 80px rgba(15, 23, 42, 0.6);
  }
  body {
    color: var(--text);
    background:
      radial-gradient(ellipse at 8% 34%, rgba(37, 99, 235, 0.62), transparent 36rem),
      radial-gradient(ellipse at 92% 70%, rgba(59, 130, 246, 0.48), transparent 38rem),
      radial-gradient(ellipse at 74% 8%, rgba(34, 211, 238, 0.2), transparent 27rem),
      linear-gradient(145deg, #173b87, #080b12 38%, #102653);
  }
  .portfolio-shell {
    color: var(--text);
    border-color: rgba(148, 163, 184, 0.17);
    background:
      radial-gradient(ellipse at 52% 0%, rgba(37, 99, 235, 0.13), transparent 36rem),
      linear-gradient(160deg, rgba(10, 15, 25, 0.97), rgba(7, 9, 15, 0.98) 50%, rgba(10, 10, 20, 0.97));
    box-shadow: 0 32px 120px rgba(0, 0, 0, 0.68), 0 0 90px rgba(37, 99, 235, 0.14);
  }
  .portfolio-shell::before {
    opacity: 0.28;
    background-image:
      linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
  }
  .site-header {
    background: linear-gradient(180deg, rgba(8, 11, 18, 0.92), rgba(8, 11, 18, 0.54));
    border-bottom-color: rgba(148, 163, 184, 0.1);
  }
  .wordmark-mark {
    border-color: rgba(34, 211, 238, 0.3);
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(34, 211, 238, 0.06));
    color: #22d3ee;
    box-shadow: inset 0 0 24px rgba(34, 211, 238, 0.12);
  }
  .wordmark-mark span { color: #a855f7; }
  .wordmark-name { color: var(--text); }
  .wordmark-name small { color: var(--muted); }
  .main-nav {
    border-color: var(--line);
    background: rgba(9, 14, 21, 0.78);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.04);
  }
  .main-nav a { color: var(--muted); }
  .main-nav a:hover,
  .main-nav a:focus-visible { color: var(--text); }
  .main-nav a.nav-center-logo {
    border-color: rgba(34, 211, 238, 0.42);
    background: rgba(59, 130, 246, 0.12);
    box-shadow: 0 0 22px rgba(34, 211, 238, 0.22);
    color: #22d3ee;
  }
  .main-nav a.nav-center-logo:hover { color: #22d3ee; }
  .header-contact {
    border-color: rgba(34, 211, 238, 0.4);
    background: linear-gradient(115deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.14));
    color: var(--text);
  }
  .hero-workspace {
    opacity: 0.76;
    filter: saturate(0.9) contrast(1.08) brightness(0.82);
    background:
      radial-gradient(ellipse at 50% 43%, rgba(34, 211, 238, 0.28), transparent 22rem),
      radial-gradient(ellipse at 50% 47%, rgba(37, 99, 235, 0.34), transparent 36rem),
      linear-gradient(145deg, #102858, #080b12 62%, #101f43);
  }
  .hero-workspace::before {
    background:
      radial-gradient(ellipse at 32% 28%, rgba(219, 234, 254, 0.44), transparent 48%),
      radial-gradient(circle, rgba(59, 130, 246, 0.9) 1.15px, transparent 1.8px),
      radial-gradient(circle, rgba(34, 211, 238, 0.85) 1px, transparent 1.7px);
    opacity: 0.72;
  }
  .hero-workspace::after {
    background: linear-gradient(180deg, rgba(5, 10, 22, 0.82), rgba(5, 10, 22, 0.04));
    opacity: 0.38;
  }
  .hero-shade {
    background:
      linear-gradient(90deg, rgba(5, 8, 14, 0.72), rgba(5, 8, 14, 0.34) 58%, rgba(5, 8, 14, 0.28)),
      linear-gradient(0deg, #080b12, transparent 30%, rgba(8, 11, 18, 0.06));
  }
  .hero-intro,
  .hero-kicker { color: #22d3ee; }
  .hero-content h1 { color: #ebf3ff; }
  .hero-content h1 em {
    color: #22d3ee;
    -webkit-text-stroke: 0;
    text-shadow: 0 0 32px rgba(34, 211, 238, 0.16);
  }
  .hero-tagline { color: var(--text); }
  .hero-tagline span { color: #22d3ee; }
  .hero-description,
  .about-copy,
  .services-intro p,
  .timeline-entry p,
  .journey-grid p,
  .recognition-list p,
  .contact-copy p { color: var(--muted); }
  .hero-coordinate,
  .section-rail a { color: rgba(235, 243, 255, 0.72); }
  .section-rail a span:first-child { color: var(--soft); }
  .status-dot {
    background: var(--success);
    box-shadow: 0 0 18px rgba(96, 228, 167, 0.56);
  }
  .kicker-rule { background: linear-gradient(90deg, rgba(34, 211, 238, 0.7), transparent); }
  .button-glow {
    border-color: rgba(147, 197, 253, 0.54) !important;
    background: linear-gradient(110deg, #3b82f6, #22d3ee) !important;
    color: #fff !important;
    box-shadow: 0 10px 32px rgba(37, 99, 235, 0.3);
  }
  .button-glow:hover { box-shadow: 0 14px 36px rgba(34, 211, 238, 0.28); }
  .text-link,
  .contact-email,
  .contact-socials a,
  .about-values span,
  .journey-bottom span { color: var(--text); }
  .text-link svg { color: var(--accent); }
  .portrait-frame {
    border-color: rgba(147, 197, 253, 0.28);
    background: rgba(8, 11, 18, 0.7);
    box-shadow: var(--shadow), 0 0 34px rgba(37, 99, 235, 0.16);
  }
  .portrait-frame img { box-shadow: 0 0 28px rgba(59, 130, 246, 0.18); }
  .portrait-caption { color: var(--muted); }
  .ticker {
    border-color: var(--line);
    background: rgba(7, 12, 18, 0.88);
  }
  .ticker-track span { color: rgba(235, 243, 255, 0.84); }
  .ticker-track i { color: var(--accent); }
  .eyebrow { color: var(--accent); }
  .section-aside { color: var(--soft); }
  .section-heading { border-color: var(--line); }
  .about-grid h2,
  .journey-grid h2,
  .recognition-grid h2,
  .contact-copy h2,
  .education-inner h2,
  .skills-title-row h2,
  .projects-title-row h2,
  .services-intro h2 { color: var(--text); }
  .about-grid h2 em,
  .journey-grid h2 em,
  .recognition-grid h2 em,
  .contact-copy h2 em,
  .education-inner h2 em,
  .skills-title-row h2 em,
  .projects-title-row h2 em,
  .services-intro h2 em {
    color: #22d3ee;
    -webkit-text-stroke: 0;
  }
  .about-copy,
  .timeline-item,
  .skill-group,
  .service-item,
  .project-card,
  .recognition-list article {
    border-color: rgba(148, 163, 184, 0.16);
    background: linear-gradient(145deg, rgba(15, 23, 33, 0.9), rgba(8, 12, 19, 0.94));
    box-shadow: 0 14px 38px rgba(0, 0, 0, 0.24);
  }
  .about-copy { color: var(--muted); }
  .about-copy .about-lede { color: var(--text); }
  .about-values span,
  .journey-bottom span,
  .contact-socials a,
  .skill-switch,
  .project-filters {
    border-color: var(--line);
    background: rgba(9, 15, 23, 0.78);
  }
  .about-values i,
  .skill-group-icon,
  .recognition-icon {
    background: rgba(34, 211, 238, 0.1);
    color: var(--accent);
  }
  .education-foot {
    border-color: var(--line);
    color: rgba(235, 243, 255, 0.8);
  }
  .timeline-year,
  .timeline-entry h3,
  .skill-group-title h3,
  .service-item h3,
  .project-title h3,
  .recognition-list h3 { color: var(--text); }
  .timeline-year span,
  .skill-group-title span,
  .recognition-tag { color: var(--soft); }
  .timeline-status { color: var(--accent); }
  .skill-group-featured {
    border-color: rgba(59, 130, 246, 0.36);
    background: linear-gradient(140deg, rgba(30, 58, 138, 0.2), rgba(10, 14, 22, 0.92));
  }
  .skill-tags span,
  .project-stack span,
  .service-tags span {
    border-color: rgba(148, 163, 184, 0.12);
    background: rgba(148, 163, 184, 0.06);
    color: rgba(235, 243, 255, 0.86);
  }
  .skills-note { color: var(--muted); }
  .service-top,
  .project-title span,
  .github-profile { color: var(--accent); }
  .service-item:hover,
  .skill-group:hover,
  .about-values span:hover,
  .project-card:hover {
    border-color: rgba(34, 211, 238, 0.34);
    box-shadow: 0 24px 54px rgba(0, 0, 0, 0.36), 0 0 28px rgba(59, 130, 246, 0.1);
  }
  .project-art,
  .project-art-energy,
  .project-art-network,
  .project-art-vote,
  .project-art-car,
  .project-art-vault,
  .project-art-code {
    background:
      radial-gradient(ellipse at 50% 20%, rgba(59, 130, 246, 0.28), transparent 55%),
      linear-gradient(145deg, #111e37, #11151e 62%, #1c1730);
  }
  .art-window {
    border-color: rgba(148, 163, 184, 0.14);
    background: rgba(9, 12, 20, 0.82);
  }
  .art-window-bar { background: rgba(15, 22, 30, 0.88); }
  .project-details p { color: var(--muted); }
  .project-links a {
    border-color: var(--line);
    background: rgba(148, 163, 184, 0.06);
    color: var(--text);
  }
  .project-links a:hover,
  .contact-socials a:hover,
  .github-profile:hover { color: var(--accent); border-color: rgba(34, 211, 238, 0.38); }
  .journey-role { color: var(--accent); }
  .recognition-note {
    background: linear-gradient(180deg, rgba(14, 20, 27, 0.92), rgba(8, 13, 18, 0.96)) !important;
  }
  .contact-panel {
    border-color: var(--line);
    background: linear-gradient(160deg, rgba(10, 15, 22, 0.96), rgba(8, 10, 17, 0.98));
    box-shadow: var(--shadow);
  }
  .contact-form label { color: rgba(235, 243, 255, 0.8); }
  .contact-form input,
  .contact-form textarea {
    border-color: rgba(148, 163, 184, 0.16);
    background: rgba(9, 14, 20, 0.78);
    color: var(--text);
  }
  .contact-form input::placeholder,
  .contact-form textarea::placeholder { color: rgba(168, 183, 206, 0.66); }
  .contact-form input:focus,
  .contact-form textarea:focus {
    border-color: rgba(34, 211, 238, 0.48);
    box-shadow: 0 0 0 4px rgba(34, 211, 238, 0.1);
  }
  .site-footer { border-color: var(--line); color: var(--muted); }
  .footer-brand { background: rgba(34, 211, 238, 0.1); color: var(--accent); }
  .form-status-success { color: var(--success); }
  .form-status-error { color: #fca5a5; }
  .portfolio-button {
    border-color: rgba(59, 130, 246, 0.36);
    background: linear-gradient(120deg, rgba(37, 99, 235, 0.88), rgba(8, 145, 178, 0.88));
    color: #fff;
  }
  .portfolio-button:hover {
    border-color: rgba(34, 211, 238, 0.62);
    box-shadow: 0 8px 22px rgba(37, 99, 235, 0.2);
  }
  .portfolio-button[data-variant="ghost"] { color: var(--muted); }
  .portfolio-button[data-variant="ghost"]:hover {
    background: rgba(59, 130, 246, 0.12);
    color: var(--text);
  }
  :focus-visible { outline-color: #22d3ee; }
  @keyframes logo-glow {
    0%, 100% { box-shadow: 0 0 12px rgba(34, 211, 238, 0.14); }
    50% { box-shadow: 0 0 24px rgba(168, 85, 247, 0.32); }
  }
  @media (max-width: 980px) {
    .site-header {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 10px;
      padding-left: 24px;
      padding-right: 24px;
    }
    .site-header .menu-toggle {
      display: inline-flex;
      color: var(--text);
      border: 1px solid var(--line);
      border-radius: 12px;
    }
    .main-nav,
    .main-nav.is-open {
      order: 3;
      width: 100%;
      justify-content: center;
      gap: 16px;
      border-radius: 18px;
    }
    .main-nav { display: none; }
    .main-nav.is-open { display: flex; }
    .header-contact { display: none; }
    .hero { min-height: 0; }
    .hero-workspace,
    .hero-shade { min-height: 0; height: 100%; }
    .portrait-frame {
      width: min(100%, 360px);
      margin-top: 32px;
    }
    .skill-group-featured { grid-column: auto; }
  }
  @media (max-width: 640px) {
    .portfolio-shell {
      width: calc(100% - 16px);
      margin: 8px auto;
      border-radius: 24px;
    }
    .site-header { padding-left: 16px; padding-right: 16px; }
    .wordmark-mark { width: 2.2rem; height: 2.2rem; }
    .main-nav.is-open { display: grid; grid-template-columns: repeat(2, 1fr); }
    .main-nav a { padding: 8px; text-align: center; }
    .hero { padding-top: 8px; }
    .hero-content { padding-top: 92px; }
    .hero-content h1 { font-size: clamp(3.9rem, 17vw, 6rem); }
    .hero-description { font-size: 0.96rem; }
    .portrait-frame img { height: 220px; }
    .skill-switch { justify-content: flex-start; border-radius: 18px; }
    .project-bottom { align-items: flex-start; flex-direction: column; }
    .project-links { flex-wrap: wrap; }
    .reveal-on-scroll { opacity: 1; transform: none; }
  }
  @media (max-width: 1180px) {
    .section-rail { display: none; }
    .hero {
      min-height: 0;
      padding-top: 24px;
    }
    .hero-content {
      padding-top: clamp(72px, 8vw, 110px);
      padding-left: 0;
    }
    .portrait-frame {
      position: relative;
      top: auto;
      right: auto;
      bottom: auto;
      width: min(100%, 360px);
      margin: 38px 0 0 auto;
    }
  }
  @media (max-width: 980px) {
    .portrait-frame {
      width: min(100%, 360px);
      margin: 32px auto 0;
    }
  }
  @media (max-width: 640px) {
    .hero-content { padding-top: 48px; }
    .portrait-frame { margin-top: 42px; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .reveal-on-scroll { opacity: 1; transform: none; }
  }
  html[data-theme="light"] {
    color-scheme: light;
    --bg: #f3f7fc;
    --bg-elevated: rgba(255, 255, 255, 0.88);
    --panel: rgba(255, 255, 255, 0.82);
    --panel-strong: rgba(255, 255, 255, 0.96);
    --line: rgba(37, 67, 110, 0.14);
    --line-strong: rgba(37, 67, 110, 0.26);
    --text: #14243a;
    --muted: #52657d;
    --soft: #75869b;
    --primary: #2563eb;
    --primary-strong: #0891b2;
    --accent: #087e9b;
    --success: #07805b;
    --shadow: 0 24px 80px rgba(34, 62, 100, 0.12);
  }
  html[data-theme="light"] body {
    color: var(--text);
    background:
      radial-gradient(ellipse at 8% 34%, rgba(37, 99, 235, 0.16), transparent 36rem),
      radial-gradient(ellipse at 92% 70%, rgba(8, 145, 178, 0.13), transparent 38rem),
      linear-gradient(145deg, #e6effc, #f7faff 42%, #eaf3fb);
  }
  html[data-theme="light"] .portfolio-shell {
    color: var(--text);
    border-color: rgba(37, 67, 110, 0.16);
    background:
      radial-gradient(ellipse at 52% 0%, rgba(37, 99, 235, 0.08), transparent 36rem),
      linear-gradient(160deg, rgba(255, 255, 255, 0.98), rgba(242, 247, 253, 0.98) 50%, rgba(248, 251, 255, 0.98));
    box-shadow: 0 32px 100px rgba(41, 66, 104, 0.16), 0 0 90px rgba(37, 99, 235, 0.08);
  }
  html[data-theme="light"] .portfolio-shell::before {
    opacity: 0.18;
    background-image:
      linear-gradient(rgba(37, 67, 110, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(37, 67, 110, 0.06) 1px, transparent 1px);
  }
  html[data-theme="light"] .site-header {
    background: linear-gradient(180deg, rgba(248, 251, 255, 0.96), rgba(248, 251, 255, 0.76));
    border-bottom-color: rgba(37, 67, 110, 0.12);
  }
  html[data-theme="light"] .wordmark-name,
  html[data-theme="light"] .main-nav a:hover,
  html[data-theme="light"] .main-nav a:focus-visible,
  html[data-theme="light"] .header-contact { color: var(--text); }
  html[data-theme="light"] .wordmark-mark {
    border-color: rgba(37, 99, 235, 0.24);
    background: linear-gradient(135deg, rgba(37, 99, 235, 0.14), rgba(8, 145, 178, 0.08));
    color: var(--primary);
  }
  html[data-theme="light"] .wordmark-mark span { color: var(--accent); }
  html[data-theme="light"] .main-nav,
  html[data-theme="light"] .skill-switch,
  html[data-theme="light"] .project-filters {
    border-color: var(--line);
    background: rgba(255, 255, 255, 0.84);
    box-shadow: 0 8px 26px rgba(41, 66, 104, 0.06), inset 0 1px 0 rgba(255,255,255,0.8);
  }
  html[data-theme="light"] .main-nav a.nav-center-logo {
    border-color: rgba(8, 145, 178, 0.32);
    background: rgba(37, 99, 235, 0.1);
    box-shadow: 0 0 18px rgba(8, 145, 178, 0.12);
    color: var(--accent);
  }
  html[data-theme="light"] .header-contact,
  html[data-theme="light"] .theme-toggle {
    border-color: rgba(37, 99, 235, 0.24);
    background: rgba(37, 99, 235, 0.06);
  }
  html[data-theme="light"] .theme-toggle { color: var(--primary); }
  html[data-theme="light"] .hero-workspace {
    opacity: 0.44;
    filter: saturate(0.82) contrast(0.96) brightness(1.48);
  }
  html[data-theme="light"] .hero-workspace::after { opacity: 0.08; }
  html[data-theme="light"] .hero-shade {
    background:
      linear-gradient(90deg, rgba(246, 250, 255, 0.88), rgba(246, 250, 255, 0.56) 58%, rgba(246, 250, 255, 0.38)),
      linear-gradient(0deg, #f5f8fc, transparent 34%, rgba(245, 248, 252, 0.08));
  }
  html[data-theme="light"] .hero-intro,
  html[data-theme="light"] .hero-kicker,
  html[data-theme="light"] .eyebrow,
  html[data-theme="light"] .service-top,
  html[data-theme="light"] .journey-role,
  html[data-theme="light"] .github-profile { color: var(--accent); }
  html[data-theme="light"] .hero-content h1 { color: var(--text); }
  html[data-theme="light"] .hero-content h1 em,
  html[data-theme="light"] .hero-tagline span { color: var(--primary); }
  html[data-theme="light"] .hero-description,
  html[data-theme="light"] .about-copy,
  html[data-theme="light"] .services-intro p,
  html[data-theme="light"] .timeline-entry p,
  html[data-theme="light"] .journey-grid p,
  html[data-theme="light"] .recognition-list p,
  html[data-theme="light"] .contact-copy p,
  html[data-theme="light"] .skills-note,
  html[data-theme="light"] .project-details p { color: var(--muted); }
  html[data-theme="light"] .hero-coordinate,
  html[data-theme="light"] .section-rail a { color: var(--muted); }
  html[data-theme="light"] .section-rail a span:first-child,
  html[data-theme="light"] .ticker-track i { color: var(--primary); }
  html[data-theme="light"] .about-grid h2,
  html[data-theme="light"] .journey-grid h2,
  html[data-theme="light"] .recognition-grid h2,
  html[data-theme="light"] .contact-copy h2,
  html[data-theme="light"] .education-inner h2,
  html[data-theme="light"] .skills-title-row h2,
  html[data-theme="light"] .projects-title-row h2,
  html[data-theme="light"] .services-intro h2,
  html[data-theme="light"] .timeline-year,
  html[data-theme="light"] .timeline-entry h3,
  html[data-theme="light"] .skill-group-title h3,
  html[data-theme="light"] .service-item h3,
  html[data-theme="light"] .project-title h3,
  html[data-theme="light"] .recognition-list h3 { color: var(--text); }
  html[data-theme="light"] .about-grid h2 em,
  html[data-theme="light"] .journey-grid h2 em,
  html[data-theme="light"] .recognition-grid h2 em,
  html[data-theme="light"] .contact-copy h2 em,
  html[data-theme="light"] .education-inner h2 em,
  html[data-theme="light"] .skills-title-row h2 em,
  html[data-theme="light"] .projects-title-row h2 em,
  html[data-theme="light"] .services-intro h2 em { color: var(--primary); }
  html[data-theme="light"] .section-aside,
  html[data-theme="light"] .timeline-year span,
  html[data-theme="light"] .skill-group-title span,
  html[data-theme="light"] .recognition-tag { color: var(--soft); }
  html[data-theme="light"] .about-copy,
  html[data-theme="light"] .timeline-item,
  html[data-theme="light"] .skill-group,
  html[data-theme="light"] .service-item,
  html[data-theme="light"] .project-card,
  html[data-theme="light"] .recognition-list article,
  html[data-theme="light"] .contact-panel {
    border-color: var(--line);
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(242, 247, 253, 0.94));
    box-shadow: 0 14px 38px rgba(41, 66, 104, 0.08);
  }
  html[data-theme="light"] .about-copy .about-lede,
  html[data-theme="light"] .text-link,
  html[data-theme="light"] .contact-email,
  html[data-theme="light"] .contact-socials a,
  html[data-theme="light"] .about-values span,
  html[data-theme="light"] .journey-bottom span { color: var(--text); }
  html[data-theme="light"] .portrait-frame {
    border-color: var(--line-strong);
    background: rgba(255, 255, 255, 0.88);
    box-shadow: var(--shadow), 0 0 34px rgba(37, 99, 235, 0.1);
  }
  html[data-theme="light"] .portrait-frame img { box-shadow: 0 0 28px rgba(37, 99, 235, 0.12); }
  html[data-theme="light"] .portrait-caption { color: var(--muted); }
  html[data-theme="light"] .about-values span,
  html[data-theme="light"] .journey-bottom span,
  html[data-theme="light"] .contact-socials a {
    border-color: var(--line);
    background: rgba(255, 255, 255, 0.78);
  }
  html[data-theme="light"] .about-values i,
  html[data-theme="light"] .skill-group-icon,
  html[data-theme="light"] .recognition-icon,
  html[data-theme="light"] .footer-brand {
    background: rgba(37, 99, 235, 0.1);
    color: var(--primary);
  }
  html[data-theme="light"] .education-foot { border-color: var(--line); color: var(--muted); }
  html[data-theme="light"] .skill-group-featured {
    border-color: rgba(37, 99, 235, 0.28);
    background: linear-gradient(140deg, rgba(37, 99, 235, 0.09), rgba(255, 255, 255, 0.96));
  }
  html[data-theme="light"] .skill-tags span,
  html[data-theme="light"] .project-stack span,
  html[data-theme="light"] .service-tags span {
    border-color: var(--line);
    background: rgba(255, 255, 255, 0.76);
    color: var(--muted);
  }
  html[data-theme="light"] .project-art,
  html[data-theme="light"] .project-art-energy,
  html[data-theme="light"] .project-art-network,
  html[data-theme="light"] .project-art-vote,
  html[data-theme="light"] .project-art-car,
  html[data-theme="light"] .project-art-vault,
  html[data-theme="light"] .project-art-code {
    background:
      radial-gradient(ellipse at 50% 20%, rgba(37, 99, 235, 0.34), transparent 55%),
      linear-gradient(145deg, #1d355d, #101b2c 62%, #20264a);
  }
  html[data-theme="light"] .art-window { border-color: rgba(255, 255, 255, 0.14); background: rgba(11, 20, 35, 0.84); }
  html[data-theme="light"] .art-window-bar { background: rgba(20, 32, 49, 0.9); }
  html[data-theme="light"] .project-links a {
    border-color: var(--line);
    background: rgba(255, 255, 255, 0.78);
    color: var(--text);
  }
  html[data-theme="light"] .recognition-note {
    background: linear-gradient(180deg, rgba(235, 243, 253, 0.94), rgba(255, 255, 255, 0.98)) !important;
  }
  html[data-theme="light"] .contact-form label,
  html[data-theme="light"] .site-footer { color: var(--muted); }
  html[data-theme="light"] .contact-form input,
  html[data-theme="light"] .contact-form textarea {
    border-color: var(--line);
    background: rgba(255, 255, 255, 0.84);
    color: var(--text);
  }
  html[data-theme="light"] .contact-form input::placeholder,
  html[data-theme="light"] .contact-form textarea::placeholder { color: var(--soft); }
  html[data-theme="light"] .site-footer { border-color: var(--line); }
  html[data-theme="light"] .ticker {
    border-color: var(--line);
    background: rgba(238, 245, 253, 0.92);
  }
  html[data-theme="light"] .ticker-track span { color: var(--text); }
  html[data-theme="light"] .form-status-success { color: var(--success); }
  html[data-theme="light"] .form-status-error { color: #b42332; }
  html[data-theme="light"] .portfolio-button[data-variant="ghost"] { color: var(--muted); }
  html[data-theme="light"] .portfolio-button[data-variant="ghost"]:hover {
    background: rgba(8, 126, 155, 0.08);
    color: var(--text);
  }
  html[data-theme="light"] .site-header .menu-toggle {
    border-color: var(--line);
    background: rgba(255, 255, 255, 0.82);
    color: var(--text);
  }
  html[data-theme="light"] :focus-visible { outline-color: var(--primary); }
  html[data-theme="dark"] body { background: #02050b; }
  html[data-theme="light"] body { background: #f3f7fc; }
  html[data-theme="dark"] .portfolio-shell {
    background: linear-gradient(155deg, rgba(3, 7, 15, 0.66), rgba(4, 8, 16, 0.56) 54%, rgba(3, 6, 13, 0.64));
    backdrop-filter: blur(1px);
  }
  html[data-theme="light"] .portfolio-shell {
    background: linear-gradient(155deg, rgba(250, 252, 255, 0.78), rgba(243, 248, 255, 0.7) 54%, rgba(249, 252, 255, 0.76));
    backdrop-filter: blur(1px);
  }
  html[data-theme="dark"] .portfolio-shell::before { opacity: 0.08; }
  html[data-theme="light"] .portfolio-shell::before { opacity: 0.1; }
  .hero-workspace {
    opacity: 0 !important;
    background: none !important;
    filter: none !important;
  }
  .hero-workspace::before,
  .hero-workspace::after { display: none !important; }
  html[data-theme="dark"] .hero-shade {
    background: linear-gradient(90deg, rgba(2, 5, 11, 0.18), rgba(2, 5, 11, 0.04) 58%, transparent),
      linear-gradient(0deg, rgba(2, 5, 11, 0.32), transparent 44%);
  }
  html[data-theme="light"] .hero-shade {
    background: linear-gradient(90deg, rgba(245, 249, 255, 0.42), rgba(245, 249, 255, 0.1) 58%, transparent),
      linear-gradient(0deg, rgba(243, 248, 255, 0.48), transparent 44%);
  }
`;

export function Portfolio() {
  const [skillMode, setSkillMode] = useState("Full-stack development");
  const [projectFilter, setProjectFilter] = useState("All work");
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [showImmersiveBackground, setShowImmersiveBackground] = useState(false);
  const [contactStatus, setContactStatus] = useState<{ type: "success" | "error" | "pending"; message: string } | null>(null);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const visibleProjects = projects.filter(
    (project) => projectFilter === "All work" || project.category === projectFilter,
  );
  const visibleSkills = skillMode === "All skills" ? skills : skills.filter((group) => group.label === skillMode);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      "content",
      themeMode === "light" ? "#f5f8fc" : "#080b12",
    );
  }, [themeMode]);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowImmersiveBackground(true), 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll<HTMLElement>(".reveal-on-scroll");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim();

    if (!endpoint) {
      setContactStatus({
        type: "error",
        message: "Automatic delivery is not set up yet. Please email chetanbagaria0@gmail.com or configure the Formspree endpoint.",
      });
      return;
    }

    let endpointUrl: URL;
    try {
      endpointUrl = new URL(endpoint);
    } catch {
      setContactStatus({
        type: "error",
        message: "The Formspree endpoint is invalid. Check VITE_FORMSPREE_ENDPOINT and try again.",
      });
      return;
    }

    if (
      endpointUrl.protocol !== "https:" ||
      endpointUrl.hostname !== "formspree.io" ||
      !/^\/f\/[A-Za-z0-9]+$/.test(endpointUrl.pathname)
    ) {
      setContactStatus({
        type: "error",
        message: "The Formspree endpoint is invalid. Use a URL in the format https://formspree.io/f/your-form-id.",
      });
      return;
    }

    setContactSubmitting(true);
    setContactStatus({ type: "pending", message: "Sending your message…" });

    try {
      const response = await fetch(endpointUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _replyto: email,
          _subject: `Portfolio inquiry from ${name}`,
        }),
      });

      if (!response.ok) {
        setContactStatus({
          type: "error",
          message: `The email service could not accept your message (error ${response.status}). Please try again or email Chetan directly.`,
        });
        return;
      }

      form.reset();
      setContactStatus({
        type: "success",
        message: "Thanks! Your message was sent. Chetan will get back to you soon.",
      });
    } catch {
      setContactStatus({
        type: "error",
        message: "Could not reach the email service. Please check your connection and try again, or email Chetan directly.",
      });
    } finally {
      setContactSubmitting(false);
    }
  }

  function handleHeroPointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--depth-x", `${horizontal * 20}px`);
    event.currentTarget.style.setProperty("--depth-y", `${vertical * 14}px`);
    event.currentTarget.style.setProperty("--depth-rotate", `${horizontal * 8}deg`);
  }

  function resetHeroDepth(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--depth-x", "0px");
    event.currentTarget.style.setProperty("--depth-y", "0px");
    event.currentTarget.style.setProperty("--depth-rotate", "0deg");
  }

  return (
    <>
      <style>{pageStyles}</style>
      <main className="portfolio-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Chetan Bagaria, home">
          <span className="wordmark-mark">c<span>.</span></span>
          <span className="wordmark-name">chetan bagaria<small>CREATIVE DEVELOPER</small></span>
        </a>
        <Button
          variant="ghost"
          size="icon"
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
        <button
          className="theme-toggle"
          type="button"
          aria-label={themeMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={themeMode === "light"}
          title={themeMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
        >
          {themeMode === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </button>
        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={`${item.label}-${item.href}`}
              className={item.logo ? "nav-center-logo" : undefined}
              href={item.href}
              aria-label={item.logo ? "Chetan Bagaria, home" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contact">
          Let’s talk <ArrowUpRight aria-hidden="true" />
        </a>
      </header>

      <section
        className="hero"
        id="home"
        aria-labelledby="hero-title"
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={resetHeroDepth}
      >
        <div className="hero-workspace" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="hero-kicker"><span className="status-dot" /> AVAILABLE FOR THE NEXT GOOD IDEA <span className="kicker-rule" /></div>

        <div className="section-rail" aria-label="Page sections">
          {["Home", "About", "Portfolio"].map((label, i) => (
            <a className={i === 0 ? "rail-active" : ""} key={label} href={`#${["home", "about", "portfolio"][i]}`}>
              <span>0{i + 1}</span><span className="rail-label">{label}</span>
            </a>
          ))}
        </div>

        <div className="hero-content">
          <p className="hero-intro">IDEAS, THOUGHTFULLY BUILT.</p>
          <h1 id="hero-title"><span>Chetan</span><em>Bagaria</em></h1>
          <p className="hero-tagline">Creative thinker. <span>Full-stack developer.</span><br className="desktop-break" /> Problem solver.</p>
          <p className="hero-description">I’m a Computer Science student and Full-Stack Developer who enjoys untangling tricky problems, exploring new technology and turning curious ideas into useful digital experiences.</p>
          <div className="hero-actions">
            <a className="portfolio-button button-glow" href="#contact">Hire me <ArrowUpRight aria-hidden="true" /></a>
            <a className="text-link" href="#portfolio">View my work <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>

        <div className="portrait-frame">
          <img src={portrait} alt="Chetan Bagaria, computer science student and full-stack developer" width={720} height={1280} />
          <div className="portrait-caption"><span><i className="status-dot" /> VIT-AP UNIVERSITY</span><span>INDIA · ALWAYS LEARNING</span></div>
        </div>

        <a className="hero-scroll" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown aria-hidden="true" /></a>
        <div className="hero-coordinate">STUDENT · BUILDER · ALWAYS LEARNING</div>
      </section>

      <div className="ticker" aria-label="Creative development, thoughtful problem solving, always learning">
        <div className="ticker-track" aria-hidden="true"><span>CREATIVE DEVELOPMENT</span><i>✳</i><span>THOUGHTFUL PROBLEM SOLVING</span><i>✳</i><span>ALWAYS LEARNING</span><i>✳</i><span>CREATIVE DEVELOPMENT</span><i>✳</i><span>THOUGHTFUL PROBLEM SOLVING</span><i>✳</i><span>ALWAYS LEARNING</span><i>✳</i></div>
      </div>

      <section className="content-section about-section reveal-on-scroll" id="about">
        <div className="section-heading"><span className="eyebrow">01 — A LITTLE ABOUT ME</span><span className="section-aside">THE PERSON BEHIND THE PROJECTS</span></div>
        <div className="about-grid">
          <h2>Beyond<br />the <em>code.</em></h2>
          <div className="about-copy"><p className="about-lede">I’m a creative thinker who likes experimenting with technology and making practical things that solve real problems.</p><p>I’m happiest when there’s something new to figure out: tracing a bug, taking on a hard technical challenge, or trying an idea until it works. I’d rather keep creating and learning than do the same thing on repeat.</p><p>Outside the editor, Taekwondo keeps me curious, focused and ready for the next challenge.</p><a className="text-link" href="#education">A bit more about my path <ArrowDownRight aria-hidden="true" /></a></div>
        </div>
        <div className="about-values"><span><i>01</i> Creative thinking</span><span><i>02</i> Always curious</span><span><i>03</i> Hands-on problem solver</span><span><i>04</i> Taekwondo practitioner</span></div>
      </section>

      <section className="education-section reveal-on-scroll" id="education">
        <div className="education-inner"><div><span className="eyebrow">02 — WHERE I’M LEARNING</span><h2>Curiosity in<br /><em>good company.</em></h2></div>
          <div className="timeline"><div className="timeline-item"><div className="timeline-year">2024 <span>— 2028</span></div><div className="timeline-entry"><h3>VIT-AP University</h3><p>Bachelor of Technology · Computer Science &amp; Engineering (Core)</p><span className="timeline-status"><i className="status-dot" /> CURRENTLY STUDYING</span></div><ArrowUpRight className="timeline-arrow" aria-hidden="true" /></div><div className="timeline-item"><div className="timeline-year">MAR <span>2026</span></div><div className="timeline-entry"><h3>Future Interns</h3><p>Project-based full-stack development cohort · March 2026</p><span className="timeline-status">PRACTICAL PROJECT WORK</span></div><ArrowUpRight className="timeline-arrow" aria-hidden="true" /></div></div>
        </div>
        <div className="education-foot"><span>ALWAYS A STUDENT OF SOMETHING</span><span>VIT-AP · ANDHRA PRADESH <ArrowUpRight aria-hidden="true" /></span></div>
      </section>

      <section className="content-section skills-section reveal-on-scroll" id="skills">
        <div className="section-heading"><span className="eyebrow">03 — TOOLS OF THE TRADE</span><span className="section-aside">LEARNING IS PART OF THE WORK</span></div>
        <div className="skills-title-row"><h2>Built to keep<br /><em>building.</em></h2><div className="skill-switch" aria-label="Filter skills">{["All skills", ...skills.map((group) => group.label)].map((category) => <Button key={category} aria-pressed={skillMode === category} variant={skillMode === category ? "default" : "ghost"} size="sm" onClick={() => setSkillMode(category)}>{category}</Button>)}</div></div>
        <div className="skills-grid">{visibleSkills.map((group) => <article className={`skill-group${group.label === "Full-stack development" ? " skill-group-featured" : ""}`} key={group.label}><div className="skill-group-icon"><group.icon aria-hidden="true" /></div><div className="skill-group-title"><h3>{group.label}</h3><span>{group.status}</span></div><div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
        <p className="skills-note"><span className="status-dot" /> Full-stack development is my strongest focus. The rest is a work in progress—and that’s exactly how I like it.</p>
      </section>

      <section className="services-section reveal-on-scroll" id="services">
        <div className="services-inner"><div className="section-heading"><span className="eyebrow">04 — WHAT I CAN HELP WITH</span><span className="section-aside">LET’S MAKE SOMETHING USEFUL</span></div><div className="services-intro"><h2>Good ideas<br /><em>need good builders.</em></h2><p>From a first interface to the behind-the-scenes systems, I enjoy helping shape the whole experience.</p></div>
          <div className="services-grid">{services.map(({ icon: Icon, number, title, description, tags }) => <article className="service-item" key={number}><div className="service-top"><span>{number}</span><Icon aria-hidden="true" /></div><h3>{title}</h3><p>{description}</p><div className="service-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></article>)}</div>
        </div>
      </section>

      <section className="content-section projects-section reveal-on-scroll" id="portfolio">
        <div className="section-heading"><span className="eyebrow">05 — SELECTED PROJECTS</span><a className="github-profile" href="https://github.com/TheChetan-ux" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> More on GitHub <ArrowUpRight aria-hidden="true" /></a></div>
        <div className="projects-title-row"><h2>Made by<br /><em>making.</em></h2><div className="project-filters" aria-label="Filter projects">{filters.map((filter) => <Button key={filter} size="sm" variant={projectFilter === filter ? "default" : "ghost"} aria-pressed={projectFilter === filter} onClick={() => setProjectFilter(filter)}>{filter}</Button>)}</div></div>
        <div className="projects-grid">{visibleProjects.map((project, index) => { const Icon = project.icon; return <article className="project-card" key={project.title}><div className={`project-art project-art-${project.visual}`}><div className="art-window"><div className="art-window-bar"><span /><span /><span /><i>{project.title}</i></div><ProjectVisual type={project.visual} icon={Icon} /></div><span className="project-index">0{index + 1} / 0{visibleProjects.length}</span><a className="project-arrow" href={project.repo} target="_blank" rel="noreferrer" aria-label={`Open the ${project.title} GitHub repository`}><ArrowUpRight aria-hidden="true" /></a></div><div className="project-details"><div className="project-title"><span>{project.category}</span><h3>{project.title}</h3></div><p>{project.description}</p><div className="project-bottom"><div className="project-stack">{project.stack.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-links"><a href={project.repo} target="_blank" rel="noreferrer" aria-label={`View ${project.title} project details and source on GitHub`}>View details <ArrowUpRight aria-hidden="true" /></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Visit the ${project.title} live demo`}>Live demo <ArrowUpRight aria-hidden="true" /></a>}</div></div></div></article>})}</div>
      </section>

      <section className="journey-section reveal-on-scroll" id="journey">
        <div className="journey-inner"><div className="section-heading"><span className="eyebrow">06 — OUTSIDE THE CODE</span><span className="section-aside">GROWING TOGETHER</span></div><div className="journey-grid"><h2>Good work<br />is a <em>team sport.</em></h2><div><span className="journey-role">VICE PRESIDENT <span>·</span> RAJASTHAN ASSOCIATION</span><p>Coordinating cultural events and the people who make them happen has taught me a different kind of problem-solving: listening well, showing up for a team, and bringing an idea across the finish line together.</p><a className="text-link" href="#contact">Let’s make something together <ArrowRight aria-hidden="true" /></a></div></div><div className="journey-bottom"><span>TEAMWORK</span><span>COMMUNICATION</span><span>OWNERSHIP</span><span>CREATIVITY</span></div></div>
      </section>

      <section className="recognition-section reveal-on-scroll" id="recognition">
        <div className="recognition-inner"><div className="section-heading"><span className="eyebrow">07 — PROGRAMS &amp; RECOGNITION</span><span className="section-aside">ONLY PUBLICLY VERIFIED DETAILS</span></div><div className="recognition-grid"><h2>Learning<br /><em>in public.</em></h2><div className="recognition-list"><article><span className="recognition-icon"><Rocket aria-hidden="true" /></span><div><h3>Future Interns</h3><p>March 2026 · Project-based full-stack cohort, documented in the public project repository.</p><a className="text-link" href="https://github.com/TheChetan-ux/FUTURE_FS_01" target="_blank" rel="noreferrer">View cohort project <ArrowUpRight aria-hidden="true" /></a></div><span className="recognition-tag">PROGRAM</span></article><article className="recognition-note"><span className="recognition-icon"><Check aria-hidden="true" /></span><div><h3>Certificates, workshops &amp; hackathons</h3><p>No additional entries are listed without verifiable public details.</p></div></article></div></div></div>
      </section>

      <section className="contact-section reveal-on-scroll" id="contact">
        <div className="contact-panel"><div className="section-heading"><span className="eyebrow">08 — YOUR TURN</span><span className="section-aside">GOOD IDEAS START WITH A CONVERSATION</span></div><div className="contact-grid"><div className="contact-copy"><span className="contact-availability"><i className="status-dot" /> OPEN TO INTERESTING PROJECTS</span><h2>Have an idea?<br /><em>Let’s build it.</em></h2><p>Have a project in mind, a tricky problem, or just want to say hi? I’d love to hear about it.</p><a className="contact-email" href="mailto:chetanbagaria0@gmail.com"><AtSign aria-hidden="true" /> chetanbagaria0@gmail.com <ArrowUpRight aria-hidden="true" /></a><div className="contact-socials"><a href="https://github.com/TheChetan-ux" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub <ArrowUpRight aria-hidden="true" /></a><a href="https://www.linkedin.com/in/chetan-bagaria-124138318/" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn <ArrowUpRight aria-hidden="true" /></a><a href="tel:+918829847898"><Phone aria-hidden="true" /> Call <ArrowUpRight aria-hidden="true" /></a></div></div>
            <form className="contact-form" onSubmit={submitContact}><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="How should I call you?" required minLength={2} /><label htmlFor="contact-email">Your email</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /><label htmlFor="contact-message">A little about your idea</label><textarea id="contact-message" name="message" placeholder="What are you thinking about?" rows={4} required minLength={10} /><Button type="submit" className="button-glow" disabled={contactSubmitting}>{contactSubmitting ? "Sending…" : "Send me a note"} <Send aria-hidden="true" /></Button>{contactStatus && <p className={`form-status form-status-${contactStatus.type}`} role={contactStatus.type === "error" ? "alert" : "status"}><Mail aria-hidden="true" /> {contactStatus.message}</p>}</form>
          </div><footer className="site-footer"><a className="footer-brand" href="#home">C<span>.</span></a><span>MADE WITH CURIOSITY IN INDIA</span><a href="#home">BACK TO THE TOP <ChevronDown className="footer-up" aria-hidden="true" /></a><span>© 2026 CHETAN BAGARIA</span></footer>
        </div>
      </section>
    </main>
    {showImmersiveBackground && (
      <Suspense fallback={null}>
        <ImmersiveBackground />
      </Suspense>
    )}
    <AIAssistant />
    </>
  );
}

function ProjectVisual({ type, icon: Icon }: { type: string; icon: LucideIcon }) {
  if (type === "energy") return <div className="energy-visual"><div className="visual-stat"><span>CITY DEMAND</span><b>14-DAY FORECAST</b></div><div className="energy-chart"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><svg viewBox="0 0 320 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 69 C24 65 25 76 48 57 S82 68 105 44 143 57 163 31 194 43 212 27 241 38 260 19 287 28 320 5" /></svg></div><div className="visual-legend"><i /> CITY-WIDE FORECAST <span>MODEL OUTPUT</span></div></div>;
  if (type === "network") return <div className="network-visual"><div className="network-line" /><span className="network-node node-a">TX</span><span className="network-node node-b">ACK</span><span className="network-node node-c">RX</span><div className="network-caption">RELIABLE DATA TRANSFER <b>SEQUENCE · ACK · RECOVER</b></div></div>;
  if (type === "vote") return <div className="vote-visual"><div className="vote-orbit"><div className="vote-core"><Icon aria-hidden="true" /></div><i /><i /><i /></div><div className="vote-label">VOTY <span>YOUR ELECTION GUIDE</span></div><div className="vote-chips"><span>Voter ID</span><span>Voting day</span></div></div>;
  if (type === "car") return <div className="car-visual"><span className="car-flag">C360 / MARKETPLACE</span><Icon className="car-icon" aria-hidden="true" /><div className="car-detail"><b>FIND YOUR NEXT DRIVE</b><span>SEARCH · SELL · EXPLORE</span></div></div>;
  if (type === "vault") return <div className="vault-visual"><div className="vault-orbit"><Layers3 aria-hidden="true" /></div><span>ERC-20 TOKEN PROTOTYPE</span><b>OG COIN</b><div className="vault-address">SMART CONTRACT · REACT</div></div>;
  return <div className="code-visual"><div className="code-lines"><span /><span /><span /><span /><span /><span /><span /></div><div className="code-status"><Terminal aria-hidden="true" /> PROJECTS / FULL STACK <i /></div><Icon aria-hidden="true" className="code-mark" /></div>;
}