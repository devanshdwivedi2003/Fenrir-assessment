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
        text: "Great! I found a login page. I can see a useful comment: ",
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
      { text: ". Let me follow that path.", type: "normal" },
    ],
  },
  {
    time: "09:04:00",
    parts: [
      {
        text: "The POST method is not allowed on /password/test. It posts to ",
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
        text: "It redirects back to /password/test. Let me also try exploring with the ",
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
        text: " - I can access any user's dashboard by just changing the X-UserId header.",
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

const SvgIcon = ({ size = 16, children, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...p}
  >
    {children}
  </svg>
);

function GridIcon() {
  return (
    <SvgIcon size={16}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </SvgIcon>
  );
}
function FolderIcon() {
  return (
    <SvgIcon size={16}>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </SvgIcon>
  );
}
function ScanIcon() {
  return (
    <SvgIcon size={16}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </SvgIcon>
  );
}
function CalendarIcon() {
  return (
    <SvgIcon size={16}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </SvgIcon>
  );
}
function BellIcon() {
  return (
    <SvgIcon size={16}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </SvgIcon>
  );
}
function SettingsIcon() {
  return (
    <SvgIcon size={16}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </SvgIcon>
  );
}
function SupportIcon() {
  return (
    <SvgIcon size={16}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </SvgIcon>
  );
}
function XIcon() {
  return (
    <SvgIcon size={15}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </SvgIcon>
  );
}
function ChevDownIcon() {
  return (
    <SvgIcon size={14}>
      <polyline points="6 9 12 15 18 9" />
    </SvgIcon>
  );
}
function ChevRightIcon() {
  return (
    <SvgIcon size={14}>
      <polyline points="9 18 15 12 9 6" />
    </SvgIcon>
  );
}
function MenuIcon() {
  return (
    <SvgIcon size={20}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </SvgIcon>
  );
}
function HomeIcon() {
  return (
    <SvgIcon size={14}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </SvgIcon>
  );
}
function SunIcon() {
  return (
    <SvgIcon size={15}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </SvgIcon>
  );
}
function MoonIcon() {
  return (
    <SvgIcon size={15}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </SvgIcon>
  );
}

function SpiderIcon({ color }) {
  return (
    <svg
      width={20}
      height={20}
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
function MapIcon({ color }) {
  return (
    <svg
      width={20}
      height={20}
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
function TestIcon({ color }) {
  return (
    <svg
      width={20}
      height={20}
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
function ValidateIcon({ color }) {
  return (
    <svg
      width={20}
      height={20}
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
function ReportIcon({ color }) {
  return (
    <svg
      width={20}
      height={20}
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

const SEVERITY_BADGE = {
  Critical: "bg-red-500 text-white",
  High: "bg-orange-500 text-white",
  Medium: "bg-amber-500 text-white",
  Low: "bg-green-500 text-white",
};

function LogLine({ line, logText }) {
  return (
    <div className="mb-4 font-mono text-[12.5px] leading-[1.7] whitespace-pre-wrap break-words">
      <span className="text-[#888897]">[{line.time}]</span>{" "}
      {line.parts.map((p, i) => {
        if (p.type === "link")
          return (
            <span key={i} className="text-[#0CC8A8]">
              {p.text}
            </span>
          );
        if (p.type === "path")
          return (
            <span
              key={i}
              className="text-[#0CC8A8] bg-[rgba(12,200,168,0.1)] px-1 rounded"
            >
              {p.text}
            </span>
          );
        if (p.type === "string")
          return (
            <span key={i} className="text-amber-400">
              {p.text}
            </span>
          );
        if (p.type === "highlight")
          return (
            <span
              key={i}
              className="text-[#0CC8A8] bg-[rgba(12,200,168,0.15)] px-1.5 rounded"
            >
              {p.text}
            </span>
          );
        if (p.type === "bold")
          return (
            <span key={i} className="text-red-400 font-bold">
              {p.text}
            </span>
          );
        if (p.type === "code")
          return (
            <span key={i} className="text-gray-400 block pl-3">
              {p.text}
            </span>
          );
        return (
          <span key={i} style={{ color: logText }}>
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

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [activeTab]);

  const bg = dark ? "bg-[#111113]" : "bg-[#F5F5F5]";
  const surface = dark ? "bg-[#1A1A1D]" : "bg-white";
  const surface2 = dark ? "bg-[#1E1E22]" : "bg-[#F8F8F8]";
  const border = dark ? "border-[#2A2A2F]" : "border-[#E5E5E5]";
  const text = dark ? "text-[#F0F0F0]" : "text-[#111113]";
  const muted = dark ? "text-[#888897]" : "text-gray-500";
  const btnBase = `inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border text-[13px] font-semibold cursor-pointer transition-all ${dark ? "bg-[#222226] border-[#2A2A2F] text-[#F0F0F0]" : "bg-white border-[#E5E5E5] text-[#111113]"}`;
  const navActive = "bg-[rgba(12,200,168,0.12)] text-[#0CC8A8]";
  const navInactive = `bg-transparent ${muted} hover:bg-[rgba(12,200,168,0.08)] hover:text-[#0CC8A8]`;
  const consoleBg = dark ? "bg-[#131316]" : "bg-[#F0F2F5]";
  const logText = dark ? "#C9C9D8" : "#374151";

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

  const activeLines = activeTab === "activity" ? LOG_LINES : VERIFICATION_LINES;

  return (
    <div
      className={`min-h-screen flex ${dark ? "bg-[#111113] text-[#F0F0F0]" : "bg-[#F5F5F5] text-[#111113]"} font-sans transition-colors`}
    >

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        />
      )}

      <aside
        className={`sd-sidebar${sidebarOpen ? " open" : ""} w-[220px] h-screen flex flex-col ${surface} border-r ${border} shrink-0`}
      >
        <div
          className={`flex items-center justify-between px-4 py-3.5 border-b ${border}`}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#0CC8A8] flex items-center justify-center text-white text-xs font-bold">
              a
            </div>
            <span className={`font-bold text-[18px] tracking-tight ${text}`}>
              aps
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="bg-transparent border-none cursor-pointer flex p-1"
          >
            <XIcon />
          </button>
        </div>

        <nav className="flex-1 p-2.5 flex flex-col gap-0.5">
          {NAV_PRIMARY.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveNav(id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border-none text-[13.5px] font-medium cursor-pointer transition-all ${activeNav === id ? navActive : navInactive}`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </nav>

        <div className={`p-2.5 border-t ${border} flex flex-col gap-0.5`}>
          {NAV_SECONDARY.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveNav(id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border-none text-[13.5px] font-medium cursor-pointer transition-all ${activeNav === id ? navActive : navInactive}`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>

        <div
          className={`flex items-center justify-between px-4 py-3 border-t ${border}`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 shrink-0 flex items-center justify-center text-white font-bold text-[13px]">
              A
            </div>
            <div className="min-w-0">
              <div className={`text-xs font-medium ${text} truncate`}>
                admin@edu.com
              </div>
              <div className={`text-[11px] ${muted}`}>Security Lead</div>
            </div>
          </div>
          <span className={muted}>
            <ChevRightIcon />
          </span>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header
          className={`flex items-center justify-between px-5 py-2.5 border-b ${border} ${surface} shrink-0`}
        >
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden bg-transparent border-none cursor-pointer flex p-1"
            >
              <MenuIcon />
            </button>
            <div className={`flex items-center gap-1.5 text-[13px] ${muted}`}>
              <span className={`font-semibold text-[15px] ${text}`}>Scan</span>
              <HomeIcon />
              <span className="opacity-40">/</span>
              <span>Private Assets</span>
              <span className="opacity-40">/</span>
              <span className="text-[#0CC8A8] font-medium">New Scan</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setDark(!dark)}
              className={`${btnBase} px-2.5`}
              aria-label="Toggle theme"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button className={btnBase}>Export Report</button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-500/50 bg-red-500/[0.08] text-red-500 text-[13px] font-semibold cursor-pointer">
              Stop Scan
            </button>
          </div>
        </header>

        <div className={`${surface} border-b ${border} px-8 py-7 shrink-0`}>
          <div className="flex items-stretch gap-0">
            <div
              className={`shrink-0 flex flex-col items-center justify-center pr-9 mr-9 border-r ${border}`}
            >
              <div className="relative w-[100px] h-[100px]">
                <div
                  className={`absolute inset-0 rounded-full border-2 ${dark ? "bg-[#1A1A1F] border-[#2A2A2F]" : "bg-[#F0F0F0] border-[#E0E0E0]"}`}
                />
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  className="absolute inset-0"
                  style={{ transform: "rotate(-90deg)" }}
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
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[24px] font-bold text-[#0CC8A8] leading-none">
                    0%
                  </span>
                  <span className={`text-[10px] ${muted} mt-1 tracking-wide`}>
                    In Progress
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between gap-6">
              <div className="relative flex items-start justify-between">
                <div
                  className={`absolute top-7 left-7 right-7 h-px ${dark ? "bg-[#2A2A2F]" : "bg-[#DCDCDC]"} z-0`}
                />
                {STEPS.map((step, i) => {
                  const isActive = i === 0;
                  const IconComp = STEP_ICONS[i];
                  const iconColor = isActive
                    ? "#fff"
                    : dark
                      ? "#666677"
                      : "#999";
                  return (
                    <div
                      key={step}
                      className="flex flex-col items-center gap-2.5 z-10 flex-1"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all"
                        style={{
                          background: isActive
                            ? "#0CC8A8"
                            : dark
                              ? "#1C1C22"
                              : "#EBEBEB",
                          border: `2px solid ${isActive ? "#0CC8A8" : dark ? "#2A2A2F" : "#DCDCDC"}`,
                          boxShadow: isActive
                            ? "0 0 0 5px rgba(12,200,168,0.22), 0 0 16px rgba(12,200,168,0.3)"
                            : "none",
                        }}
                      >
                        <IconComp color={iconColor} />
                      </div>
                      <span
                        className={`text-[12.5px] whitespace-nowrap font-${isActive ? "semibold" : "normal"} ${isActive ? "text-[#0CC8A8]" : muted}`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className={`flex gap-0 pt-1 border-t ${border}`}>
                {[
                  { label: "Scan Type", value: "Grey Box" },
                  { label: "Targets", value: "google.com" },
                  { label: "Started At", value: "Nov 22, 09:00AM" },
                  { label: "Credentials", value: "2 Active" },
                  { label: "Files", value: "Control.pdf" },
                  { label: "Checklists", value: "40/350", teal: true },
                ].map(({ label, value, teal }, i) => (
                  <div key={i} className="flex-1 pt-3">
                    <div className={`text-[11px] ${muted} mb-1 font-medium`}>
                      {label}
                    </div>
                    <div
                      className={`text-[14px] font-bold ${teal ? "text-[#0CC8A8]" : text}`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div
            className={`flex items-center justify-between px-5 py-2.5 border-b ${border} ${surface} shrink-0`}
          >
            <div className="flex items-center gap-2.5">
              <span className="sd-pulse w-2 h-2 rounded-full bg-[#0CC8A8] inline-block" />
              <span className={`font-semibold text-[14px] ${text}`}>
                Live Scan Console
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs ${muted} border ${border} ${dark ? "bg-[#1E1E22]" : "bg-[#F0F0F0]"}`}
              >
                <span className="sd-pulse w-1.5 h-1.5 rounded-full bg-[#0CC8A8] inline-block" />
                Running...
              </span>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => setConsoleOpen(!consoleOpen)}
                className={`bg-transparent border-none cursor-pointer flex p-1 ${muted}`}
              >
                <ChevDownIcon />
              </button>
              <button
                className={`bg-transparent border-none cursor-pointer flex p-1 ${muted}`}
              >
                <XIcon />
              </button>
            </div>
          </div>

          {consoleOpen && (
            <div className="flex-1 flex overflow-hidden min-h-0">
              <div
                className={`flex-1 flex flex-col border-r ${border} min-w-0`}
              >
                <div
                  className={`flex gap-0 px-5 border-b ${border} ${surface2} shrink-0`}
                >
                  {[
                    { id: "activity", label: "Activity Log" },
                    { id: "verification", label: "Verification Loops" },
                  ].map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`py-3 mr-6 bg-transparent border-none border-b-2 cursor-pointer text-[13px] font-medium transition-colors ${activeTab === id ? "text-[#0CC8A8] border-[#0CC8A8]" : `${muted} border-transparent`}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {/* Log output */}
                <div
                  ref={logRef}
                  className={`flex-1 overflow-y-auto px-6 py-5 ${consoleBg}`}
                  style={{ color: logText }}
                >
                  {activeLines.map((line, i) => (
                    <LogLine key={i} line={line} logText={logText} />
                  ))}
                </div>
              </div>

              <div className="w-[400px] shrink-0 flex flex-col overflow-hidden">
                <div
                  className={`px-5 py-3.5 border-b ${border} ${surface2} shrink-0`}
                >
                  <span className={`font-semibold text-[14px] ${text}`}>
                    Finding Log
                  </span>
                </div>
                <div
                  className={`flex-1 overflow-y-auto p-4 ${bg} flex flex-col gap-3`}
                >
                  {FINDINGS.map((f, i) => (
                    <div
                      key={i}
                      className={`${surface} border ${border} rounded-xl p-4 cursor-pointer transition-colors hover:border-[#0CC8A8]`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold ${SEVERITY_BADGE[f.severity] || "bg-gray-500 text-white"}`}
                        >
                          {f.severity}
                        </span>
                        <span className={`text-[11px] ${muted} font-mono`}>
                          {f.time}
                        </span>
                      </div>
                      <div
                        className={`text-[13.5px] font-semibold ${text} mb-1`}
                      >
                        {f.title}
                      </div>
                      <div className="text-[12px] text-[#0CC8A8] font-mono mb-1.5">
                        {f.path}
                      </div>
                      <div className={`text-[12px] ${muted} leading-relaxed`}>
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
          className={`flex items-center gap-6 flex-wrap px-5 py-2 border-t ${border} ${surface} text-xs ${muted} shrink-0`}
        >
          {[
            ["Sub-Agents", "0"],
            ["Parallel Executions", "2"],
            ["Operations", "1"],
          ].map(([label, val]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full inline-block ${dark ? "bg-[#888897]" : "bg-gray-400"}`}
              />
              {label}: {val}
            </div>
          ))}
          <div className="ml-auto flex gap-5">
            <span>
              Critical: <span className="text-red-500 font-semibold">0</span>
            </span>
            <span>
              High: <span className="text-orange-500 font-semibold">0</span>
            </span>
            <span>
              Medium: <span className="text-amber-500 font-semibold">0</span>
            </span>
            <span>
              Low: <span className="text-green-500 font-semibold">0</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
