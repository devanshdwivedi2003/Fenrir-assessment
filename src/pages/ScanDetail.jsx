import { useState, useEffect, useRef } from "react";
import { useTheme } from "../ThemeContext";

const LOG_LINES = [
  {
    time: "09:00:00",
    parts: [
      { text: "I'll begin a systematic penetration test on ", type: "normal" },
      { text: "helpdesk.democorp.com", type: "link" },
      {
        text: ". Let me start with reconnaissance and enumeration.",
        type: "normal",
      },
    ],
  },
  {
    time: "09:01:00",
    parts: [
      {
        text: "Good! target is online. Now let me perform port scanning to identify running services.",
        type: "normal",
      },
    ],
  },
  {
    time: "09:02:00",
    parts: [
      { text: "Excellent reconnaissance results:", type: "normal" },
      {
        text: "\n  - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)",
        type: "code",
      },
      {
        text: "\nLet me probe the web server on target first to understand its structure.",
        type: "normal",
      },
    ],
  },
  {
    time: "09:03:00",
    parts: [
      {
        text: "Great! I found a login page for a Help Desk Platform. I can see a useful comment: ",
        type: "normal",
      },
      {
        text: '"TODO: Delete the testing account (test:test)"',
        type: "string",
      },
      {
        text: ". Let me test this credential. The login redirects to ",
        type: "normal",
      },
      { text: "/password/test", type: "path" },
      { text: ". Let me follow that path and explore it.", type: "normal" },
    ],
  },
  {
    time: "09:04:00",
    parts: [
      {
        text: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to ",
        type: "normal",
      },
      { text: "'#'", type: "string" },
      {
        text: " which means the current page. Let me try a different approach.",
        type: "normal",
      },
    ],
  },
  {
    time: "09:05:00",
    parts: [
      {
        text: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the ",
        type: "normal",
      },
      { text: "test:test", type: "link" },
      { text: " password directly on other endpoints.", type: "normal" },
    ],
  },
  {
    time: "09:06:00",
    parts: [
      { text: "Great! I can access the dashboard using the ", type: "normal" },
      { text: "'X-UserId: 10032'", type: "highlight" },
      {
        text: ' header. The dashboard shows "Welcome, John Doe". This suggests an ',
        type: "normal",
      },
      { text: "**IDOR vulnerability**", type: "bold" },
      {
        text: " - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application...",
        type: "normal",
      },
    ],
  },
];

const VERIFICATION_LINES = [
  {
    time: "09:10:00",
    parts: [
      {
        text: "Verifying SQL injection on /api/users/profile endpoint...",
        type: "normal",
      },
    ],
  },
  {
    time: "09:11:00",
    parts: [
      { text: "Payload ", type: "normal" },
      { text: "' OR 1=1--", type: "path" },
      {
        text: " returned 200 OK with full user table. Confirmed time-based blind injection.",
        type: "normal",
      },
    ],
  },
  {
    time: "09:12:00",
    parts: [
      { text: "Rate limit test on ", type: "normal" },
      { text: "/api/search", type: "link" },
      {
        text: ": 1000 requests sent, 0 blocked. No throttling detected.",
        type: "normal",
      },
    ],
  },
  {
    time: "09:13:00",
    parts: [
      {
        text: "IDOR verification complete. 48 user records accessible via X-UserId header enumeration.",
        type: "normal",
      },
    ],
  },
];

const FINDINGS = [
  {
    severity: "Critical",
    time: "10:45:23",
    title: "SQL Injection in Authentication Endpoint",
    path: "/api/users/profile",
    desc: "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.",
  },
  {
    severity: "High",
    time: "10:45:23",
    title: "Unauthorized Access to User Metadata",
    path: "/api/auth/login",
    desc: "Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.",
  },
  {
    severity: "Medium",
    time: "10:45:23",
    title: "Broken Authentication Rate Limiting",
    path: "/api/search",
    desc: "No effective rate limiting detected on login attempts. Automated brute-force attempts possible.",
  },
];

const STEPS = ["Spidering", "Mapping", "Testing", "Validating", "Reporting"];

function GridIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function FolderIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function ScanIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function CalendarIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
function BellIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function SettingsIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
function SupportIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </svg>
  );
}
function XIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function ChevronDownIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function ChevronRightIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function MenuIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function HomeIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function SunIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function MoonIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SpiderIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}
function MapIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}
function TestIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v11m0 0a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1m7 1h10M15 8h.01M19 8h.01" />
      <path d="M5 8h.01" />
    </svg>
  );
}
function ValidateIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function ReportIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

const STEP_ICONS = [SpiderIcon, MapIcon, TestIcon, ValidateIcon, ReportIcon];

function makeTheme(dark) {
  return {
    bg: dark ? "#111113" : "#F5F5F5",
    surface: dark ? "#1A1A1D" : "#FFFFFF",
    surface2: dark ? "#1E1E22" : "#F8F8F8",
    surface3: dark ? "#2C2C32" : "#E4E4E4",
    border: dark ? "#2A2A2F" : "#E5E5E5",
    text: dark ? "#F0F0F0" : "#111113",
    muted: dark ? "#888897" : "#6B7280",
    btnBg: dark ? "#222226" : "#FFFFFF",
    btnBorder: dark ? "#2A2A2F" : "#E5E5E5",
    consoleBg: dark ? "#131316" : "#F0F2F5",
    logText: dark ? "#C9C9D8" : "#374151",
    termBg: dark ? "#0F0F12" : "#F3F4F6",
  };
}

function SeverityBadge({ severity }) {
  const map = {
    Critical: { bg: "#EF4444", text: "#fff" },
    High: { bg: "#F97316", text: "#fff" },
    Medium: { bg: "#F59E0B", text: "#fff" },
    Low: { bg: "#22C55E", text: "#fff" },
  };
  const c = map[severity] || map.Low;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: 5,
        background: c.bg,
        color: c.text,
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      {severity}
    </span>
  );
}

function LogLine({ line }) {
  return (
    <div
      style={{
        marginBottom: 16,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: 12.5,
        lineHeight: 1.7,
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      <span style={{ color: "#888897" }}>[{line.time}]</span>{" "}
      {line.parts.map((p, i) => {
        if (p.type === "link")
          return (
            <span key={i} style={{ color: "#0CC8A8" }}>
              {p.text}
            </span>
          );
        if (p.type === "path")
          return (
            <span
              key={i}
              style={{
                color: "#0CC8A8",
                background: "rgba(12,200,168,0.1)",
                padding: "1px 5px",
                borderRadius: 4,
              }}
            >
              {p.text}
            </span>
          );
        if (p.type === "string")
          return (
            <span key={i} style={{ color: "#F59E0B" }}>
              {p.text}
            </span>
          );
        if (p.type === "highlight")
          return (
            <span
              key={i}
              style={{
                color: "#0CC8A8",
                background: "rgba(12,200,168,0.15)",
                padding: "1px 6px",
                borderRadius: 4,
              }}
            >
              {p.text}
            </span>
          );
        if (p.type === "bold")
          return (
            <span key={i} style={{ color: "#EF4444", fontWeight: 700 }}>
              {p.text}
            </span>
          );
        if (p.type === "code")
          return (
            <span
              key={i}
              style={{ color: "#9CA3AF", display: "block", paddingLeft: 12 }}
            >
              {p.text}
            </span>
          );
        return (
          <span key={i} style={{ color: "inherit" }}>
            {p.text}
          </span>
        );
      })}
    </div>
  );
}

export default function ScanDetail() {
  const { dark, setDark } = useTheme();
  const [activeNav, setActiveNav] = useState("scans");
  const [activeTab, setActiveTab] = useState("activity");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [consoleOpen, setConsoleOpen] = useState(true);
  const logRef = useRef(null);

  const t = makeTheme(dark);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [activeTab]);

  const NAV_PRIMARY = [
    { id: "dashboard", label: "Dashboard", Icon: GridIcon },
    { id: "projects", label: "Projects", Icon: FolderIcon },
    { id: "scans", label: "Scans", Icon: ScanIcon },
    { id: "schedule", label: "Schedule", Icon: CalendarIcon },
  ];
  const NAV_SECONDARY = [
    { id: "notifications", label: "Notifications", Icon: BellIcon },
    { id: "settings", label: "Settings", Icon: SettingsIcon },
    { id: "support", label: "Support", Icon: SupportIcon },
  ];

  const baseBtnStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 18px",
    borderRadius: 8,
    background: t.btnBg,
    border: `1px solid ${t.btnBorder}`,
    color: t.text,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  };

  const navBtn = (active) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    background: active ? "rgba(12,200,168,0.12)" : "transparent",
    color: active ? "#0CC8A8" : t.muted,
    fontSize: 13.5,
    fontWeight: 500,
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.15s, color 0.15s",
  });

  const activeLines = activeTab === "activity" ? LOG_LINES : VERIFICATION_LINES;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: t.bg,
        color: t.text,
        fontFamily: "'Inter', system-ui, sans-serif",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30,
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      <aside
        className={`sd-sidebar${sidebarOpen ? " open" : ""}`}
        style={{
          width: 220,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          background: t.surface,
          borderRight: `1px solid ${t.border}`,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 18px",
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#0CC8A8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ⚪
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "-0.02em",
                color: t.text,
              }}
            >
              aps
            </span>
          </div>
          
        </div>

        <nav
          style={{
            flex: 1,
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {NAV_PRIMARY.map(({ id, label, Icon }) => (
            <button
              key={id}
              className="sd-nav-btn"
              onClick={() => {
                setActiveNav(id);
                setSidebarOpen(false);
              }}
              style={navBtn(activeNav === id)}
              aria-current={activeNav === id ? "page" : undefined}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div
          style={{
            padding: "10px 10px",
            borderTop: `1px solid ${t.border}`,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {NAV_SECONDARY.map(({ id, label, Icon }) => (
            <button
              key={id}
              className="sd-nav-btn"
              onClick={() => setActiveNav(id)}
              style={navBtn(activeNav === id)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "13px 16px",
            borderTop: `1px solid ${t.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#FB923C,#EF4444)",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
              }}
            >
              A
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: t.text,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                admin@edu.com
              </div>
              <div style={{ fontSize: 11, color: t.muted }}>Security Lead</div>
            </div>
          </div>
          <span style={{ color: t.muted, display: "flex" }}>
            <ChevronRightIcon size={14} />
          </span>
        </div>
      </aside>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            borderBottom: `1px solid ${t.border}`,
            background: t.surface,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              className="sd-hamburger sd-btn"
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: t.text,
                display: "none",
                padding: 4,
              }}
              aria-label="Open menu"
            >
              <MenuIcon size={20} />
            </button>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: t.muted,
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 15, color: t.text }}>
                Scan
              </span>
              <HomeIcon size={13} />
              <span style={{ opacity: 0.4 }}>/</span>
              <span>Private Assets</span>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: "#0CC8A8", fontWeight: 500 }}>
                New Scan
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              className="sd-btn"
              onClick={() => setDark(!dark)}
              style={{ ...baseBtnStyle, padding: "7px 10px", fontWeight: 500 }}
              aria-label="Toggle theme"
            >
              {dark ? <SunIcon size={15} /> : <MoonIcon size={15} />}
            </button>
            <button
              className="sd-btn"
              style={{
                ...baseBtnStyle,
                background: dark ? "#1E1E22" : "#FFFFFF",
                border: `1px solid ${t.border}`,
              }}
            >
              Export Report
            </button>
            <button
              className="sd-btn"
              style={{
                ...baseBtnStyle,
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.5)",
                color: "#EF4444",
              }}
            >
              Stop Scan
            </button>
          </div>
        </header>

        <div
          style={{
            background: t.surface,
            borderBottom: `1px solid ${t.border}`,
            padding: "28px 32px",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "stretch", gap: 0 }}>
            <div
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                paddingRight: 36,
                marginRight: 36,
                borderRight: `1px solid ${t.border}`,
              }}
            >
              <div style={{ position: "relative", width: 100, height: 100 }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: dark ? "#1A1A1F" : "#F0F0F0",
                    border: `2px solid ${dark ? "#2A2A2F" : "#E0E0E0"}`,
                  }}
                />
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  style={{
                    position: "absolute",
                    inset: 0,
                    transform: "rotate(-90deg)",
                  }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke={dark ? "#2C2C38" : "#DCDCDC"}
                    strokeWidth="4"

                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="#0CC8A8"
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 44}`}
                    strokeDashoffset={`${2 * Math.PI * 44 * 1}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#0CC8A8",
                      lineHeight: 1,
                    }}
                  >
                    0%
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: t.muted,
                      marginTop: 4,
                      letterSpacing: "0.02em",
                    }}
                  >
                    In Progress
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 24,
              }}
            >
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 28,
                    left: 28,
                    right: 28,
                    height: 1,
                    background: dark ? "#2A2A2F" : "#DCDCDC",
                    zIndex: 0,
                  }}
                />

                {STEPS.map((step, i) => {
                  const isActive = i === 0;
                  const IconComp = STEP_ICONS[i];
                  return (
                    <div
                      key={step}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 10,
                        zIndex: 1,
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: isActive
                            ? "#0CC8A8"
                            : dark
                              ? "#1C1C22"
                              : "#ffffff",
                          border: `2px solid ${isActive ? "#0CC8A8" : dark ? "#2A2A2F" : "#DCDCDC"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: isActive
                            ? "0 0 0 5px rgba(12,200,168,0.22), 0 0 16px rgba(12,200,168,0.3)"
                            : "none",
                          transition: "all 0.2s",
                          flexShrink: 0,
                        }}
                      >
                        <IconComp
                          size={20}
                          color={isActive ? "#fff" : dark ? "#666677" : "#999"}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 12.5,
                          whiteSpace: "nowrap",
                          color: isActive ? "#0CC8A8" : t.muted,
                          fontWeight: isActive ? 600 : 400,
                        }}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 0,
                  paddingTop: 4,
                  borderTop: `1px solid ${t.border}`,
                }}
              >
                {[
                  { label: "Scan Type", value: "Grey Box" },
                  { label: "Targets", value: "google.com" },
                  { label: "Started At", value: "Nov 22, 09:00AM" },
                  { label: "Credentials", value: "2 Active" },
                  { label: "Files", value: "Control.pdf" },
                  { label: "Checklists", value: "40/350", teal: true },
                ].map(({ label, value, teal }, i) => (
                  <div key={i} style={{ flex: 1, paddingTop: 12 }}>
                    <div
                      style={{
                        fontSize: 11,
                        color: t.muted,
                        marginBottom: 5,
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: teal ? "#0CC8A8" : t.text,
                      }}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
              borderBottom: `1px solid ${t.border}`,
              background: t.surface,
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                className="sd-running-dot"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#0CC8A8",
                  display: "inline-block",
                }}
              />
              <span style={{ fontWeight: 600, fontSize: 14, color: t.text }}>
                Live Scan Console
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "3px 12px",
                  borderRadius: 999,
                  background: dark ? "#1E1E22" : "#F0F0F0",
                  border: `1px solid ${t.border}`,
                  fontSize: 12,
                  color: t.muted,
                }}
              >
                <span
                  className="sd-running-dot"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#0CC8A8",
                    display: "inline-block",
                  }}
                />
                Running...
              </span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className="sd-btn"
                onClick={() => setConsoleOpen(!consoleOpen)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: t.muted,
                  display: "flex",
                  padding: 4,
                }}
              >
                <ChevronDownIcon size={16} />
              </button>
              <button
                className="sd-btn"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: t.muted,
                  display: "flex",
                  padding: 4,
                }}
              >
                <XIcon size={15} />
              </button>
            </div>
          </div>
          {consoleOpen && (
            <div
              style={{
                flex: 1,
                display: "flex",
                overflow: "hidden",
                minHeight: 0,
              }}
            >
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  borderRight: `1px solid ${t.border}`,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 0,
                    padding: "0 20px",
                    borderBottom: `1px solid ${t.border}`,
                    background: t.surface2,
                    flexShrink: 0,
                  }}
                >
                  {[
                    { id: "activity", label: "Activity Log" },
                    { id: "verification", label: "Verification Loops" },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      style={{
                        padding: "12px 4px",
                        marginRight: 24,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 500,
                        color: activeTab === id ? "#0CC8A8" : t.muted,
                        borderBottom:
                          activeTab === id
                            ? "2px solid #0CC8A8"
                            : "2px solid transparent",
                        transition: "color 0.15s, border-color 0.15s",
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div
                  ref={logRef}
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px 24px",
                    background: t.consoleBg,
                    color: t.logText,
                  }}
                >
                  {activeLines.map((line, i) => (
                    <LogLine key={i} line={line} />
                  ))}
                </div>
              </div>
              <div
                style={{
                  width: 400,
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "14px 20px",
                    borderBottom: `1px solid ${t.border}`,
                    background: t.surface2,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{ fontWeight: 600, fontSize: 14, color: t.text }}
                  >
                    Finding Log
                  </span>
                </div>
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "16px",
                    background: t.bg,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  {FINDINGS.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        background: t.surface,
                        border: `1px solid ${t.border}`,
                        borderRadius: 12,
                        padding: "14px 16px",
                        cursor: "pointer",
                        transition: "border-color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = "#0CC8A8")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = t.border)
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 8,
                        }}
                      >
                        <SeverityBadge severity={f.severity} />
                        <span
                          style={{
                            fontSize: 11,
                            color: t.muted,
                            fontFamily: "monospace",
                          }}
                        >
                          {f.time}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: t.text,
                          marginBottom: 5,
                        }}
                      >
                        {f.title}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "#0CC8A8",
                          fontFamily: "monospace",
                          marginBottom: 7,
                        }}
                      >
                        {f.path}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: t.muted,
                          lineHeight: 1.5,
                        }}
                      >
                        {f.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            padding: "8px 20px",
            borderTop: `1px solid ${t.border}`,
            background: t.surface,
            fontSize: 12,
            color: t.muted,
            flexShrink: 0,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: t.muted,
                display: "inline-block",
              }}
            />
            Sub-Agents: 0
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: t.muted,
                display: "inline-block",
              }}
            />
            Parallel Executions: 2
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: t.muted,
                display: "inline-block",
              }}
            />
            Operations: 1
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 20 }}>
            <span>
              Critical:{" "}
              <span style={{ color: "#EF4444", fontWeight: 600 }}>0</span>
            </span>
            <span>
              High: <span style={{ color: "#F97316", fontWeight: 600 }}>0</span>
            </span>
            <span>
              Medium:{" "}
              <span style={{ color: "#F59E0B", fontWeight: 600 }}>0</span>
            </span>
            <span>
              Low: <span style={{ color: "#22C55E", fontWeight: 600 }}>0</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
