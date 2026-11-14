import { Suspense, lazy, useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { Bot, Minus, Send, Sparkles, X } from "lucide-react";
import "./AIAssistant.css";
import type { OrbState } from "./AssistantOrb";

const AssistantOrb = lazy(() => import("./AssistantOrb"));

type Message = { id: number; role: "assistant" | "user"; text: string };
type ChatPhase = "idle" | "thinking" | "responding";

const welcomeMessage =
  "Hey! I'm Chetan's AI assistant. Ask me anything about his projects, technical skills, experience or background. I'm here to help!";

const suggestedQuestions = [
  "Who is Chetan?",
  "What technologies does he know?",
  "Tell me about his projects.",
  "How can I contact him?",
];

const portfolioProjects = [
  "Car360 — a used-car marketplace with listings, purchases, bidding, and role-based dashboards.",
  "VoteWise — an AI-assisted guide to India's election process and voter resources.",
  "Energy Forecast — a city electricity-demand dashboard with forecasts and temperature analysis.",
  "Reliable UDP — a Python transport benchmark for congestion response over simulated UDP links.",
  "Future Interns Projects — a full-stack portfolio project from the March 2026 project-based cohort.",
  "OG Coin — an ERC-20 token prototype with a React interface and local deployment scripts.",
];

function answerQuestion(question: string) {
  const query = question.toLowerCase();

  if (/project|build|made|portfolio/.test(query)) {
    return `Featured projects in Chetan's portfolio:\n${portfolioProjects.join("\n")}\n\nYou can browse their details and available repositories in the Portfolio section.`;
  }
  if (/who|introduc|background|about (chetan|him|his background)/.test(query)) {
    return "Chetan Bagaria is a Computer Science and Engineering student at VIT-AP University, pursuing a B.Tech expected in 2028. He focuses on full-stack development and enjoys building, debugging, and learning by experimenting.";
  }
  if (/strongest|best skill|expert|good at/.test(query)) {
    return "Full-stack development is Chetan's strongest focus. His listed tools include React, Next.js, Node.js, Express, REST APIs, MongoDB, and MySQL. AI/ML, cloud tools, and core CS subjects are learning areas—not claims of expert-level proficiency.";
  }
  if (/technolog|tech stack|skills|know/.test(query)) {
    return "His full-stack toolkit includes HTML, CSS, JavaScript, React, Next.js, Tailwind CSS, Node.js, Express, REST APIs, MongoDB, and MySQL. He also uses Java and Python. AWS, Google Cloud, Docker, Kubernetes, Grafana, and OpenTelemetry are listed as areas he is exploring; Machine Learning is currently a learning focus.";
  }
  if (/ai|machine learning|\bml\b|gemini/.test(query)) {
    return "Chetan is exploring Generative AI and AI-powered application development, and Machine Learning is currently a learning area. VoteWise is described as an AI-assisted election guide; the portfolio does not claim that he is an AI/ML expert.";
  }
  if (/contact|email|phone|github|linkedin|reach/.test(query)) {
    return "You can reach Chetan at chetanbagaria0@gmail.com or +91 8829847898. GitHub: https://github.com/TheChetan-ux\nLinkedIn: https://www.linkedin.com/in/chetan-bagaria-124138318/";
  }
  if (/experience|job|employment|intern/.test(query)) {
    return "The portfolio highlights project work, including a Future Interns project-based cohort, rather than conventional employment. Chetan also serves as Vice President of the Rajasthan Association, helping coordinate cultural events.";
  }
  if (/different|personality|outside|taekwondo|sports|why/.test(query)) {
    return "Chetan describes himself as a curious, creative builder who enjoys debugging, taking on challenging problems, and experimenting with new ideas. Outside technology, he is especially interested in Taekwondo and physical sports.";
  }
  if (/educat|degree|university|study|college/.test(query)) {
    return "Chetan is pursuing a Bachelor of Technology in Computer Science and Engineering (Core) at VIT-AP University, with expected graduation in 2028.";
  }

  return "I can help with Chetan's background, education, full-stack skills, learning areas, featured projects, experience, or contact details. Try one of the suggested questions, or browse the matching section of the portfolio.";
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([{ id: 0, role: "assistant", text: welcomeMessage }]);
  const [phase, setPhase] = useState<ChatPhase>("idle");
  const [lightweight, setLightweight] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const nextId = useRef(1);
  const timer = useRef<number | null>(null);
  const history = useRef<HTMLDivElement>(null);

  const orbState: OrbState = phase === "thinking" || phase === "responding"
    ? phase
    : isOpen
      ? "listening"
      : "idle";

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallOrTouch = window.matchMedia("(max-width: 700px), (pointer: coarse)");

    const updateRenderingMode = () => {
      const useFallback = motionPreference.matches || smallOrTouch.matches;
      setLightweight(useFallback);
      if (useFallback) setSceneReady(false);
    };

    updateRenderingMode();
    motionPreference.addEventListener("change", updateRenderingMode);
    smallOrTouch.addEventListener("change", updateRenderingMode);

    return () => {
      motionPreference.removeEventListener("change", updateRenderingMode);
      smallOrTouch.removeEventListener("change", updateRenderingMode);
    };
  }, []);

  useEffect(() => {
    if (history.current) history.current.scrollTop = history.current.scrollHeight;
  }, [messages, phase]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  function sendQuestion(question: string) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || trimmedQuestion.length > 500 || phase === "thinking") return;

    setMessages((current) => [...current, { id: nextId.current++, role: "user", text: trimmedQuestion }]);
    setMessage("");
    setPhase("thinking");
    timer.current = window.setTimeout(() => {
      const response = answerQuestion(trimmedQuestion);
      setMessages((current) => [...current, { id: nextId.current++, role: "assistant", text: response }]);
      setPhase("responding");
      timer.current = window.setTimeout(() => setPhase("idle"), 950);
    }, 720);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendQuestion(message);
  }

  function closeChat() {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    setIsOpen(false);
    setMessage("");
    setMessages([{ id: 0, role: "assistant", text: welcomeMessage }]);
    setPhase("idle");
  }

  function followPointer(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse" || lightweight) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2)),
      y: Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2)),
    });
  }

  function loadOrbScene() {
    if (!lightweight) setSceneReady(true);
  }

  return (
    <div className={`ai-assistant${isOpen ? " is-open" : ""}`}>
      {isOpen && (
        <section className="ai-chat-panel" role="dialog" aria-labelledby="ai-chat-title" aria-describedby="ai-chat-description">
          <header className="ai-chat-header">
            <span className="ai-avatar"><Sparkles aria-hidden="true" /></span>
            <span className="ai-chat-identity">
              <strong id="ai-chat-title">Chetan AI</strong>
              <span id="ai-chat-description"><i /> Online · Portfolio assistant</span>
            </span>
            <button type="button" className="ai-window-control" aria-label="Minimize chat" title="Minimize chat" onClick={() => setIsOpen(false)}>
              <Minus aria-hidden="true" />
            </button>
            <button type="button" className="ai-window-control" aria-label="Close chat" title="Close chat" onClick={closeChat}>
              <X aria-hidden="true" />
            </button>
          </header>

          <div className="ai-chat-history" ref={history} role="log" aria-live="polite" aria-relevant="additions">
            {messages.map((entry) => (
              <div className={`ai-message ai-message-${entry.role}`} key={entry.id}>
                {entry.role === "assistant" && <span className="ai-message-mark"><Bot aria-hidden="true" /></span>}
                <p>{entry.text}</p>
              </div>
            ))}
            {phase === "thinking" && (
              <div className="ai-message ai-message-assistant" role="status" aria-label="Chetan AI is thinking">
                <span className="ai-message-mark"><Bot aria-hidden="true" /></span>
                <span className="ai-typing"><i /><i /><i /></span>
              </div>
            )}
            {messages.length === 1 && phase === "idle" && (
              <div className="ai-suggestions" aria-label="Suggested questions">
                {suggestedQuestions.map((question) => (
                  <button key={question} type="button" onClick={() => sendQuestion(question)}>{question}</button>
                ))}
              </div>
            )}
          </div>

          <form className="ai-chat-form" onSubmit={handleSubmit}>
            <label className="ai-visually-hidden" htmlFor="ai-chat-message">Ask Chetan AI a question</label>
            <input
              id="ai-chat-message"
              name="message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask about projects, skills..."
              maxLength={500}
              required
              disabled={phase === "thinking"}
              autoComplete="off"
            />
            <button type="submit" aria-label="Send message" title="Send message" disabled={phase === "thinking" || !message.trim()}>
              <Send aria-hidden="true" />
            </button>
          </form>
          <p className="ai-chat-footnote">Answers are based on information in this portfolio.</p>
        </section>
      )}

      <button
        type="button"
        className="ai-launcher"
        aria-label={isOpen ? "Chetan AI assistant, chat open" : "Open Chetan AI assistant"}
        aria-expanded={isOpen}
        onClick={() => {
          loadOrbScene();
          setIsOpen((open) => !open);
        }}
        onPointerEnter={loadOrbScene}
        onFocus={loadOrbScene}
        onPointerMove={followPointer}
        onPointerLeave={() => setPointer({ x: 0, y: 0 })}
      >
        <span className="ai-orb-shell" aria-hidden="true">
          <span className={`ai-orb-fallback ai-orb-${orbState}`}><i /><i /><i /></span>
          {sceneReady && !lightweight && (
            <Suspense fallback={null}>
              <span className="ai-orb-canvas"><AssistantOrb state={orbState} pointer={pointer} /></span>
            </Suspense>
          )}
        </span>
        <span className="ai-launcher-label">{isOpen ? "AI assistant" : "Ask Chetan AI"}</span>
      </button>
    </div>
  );
}
