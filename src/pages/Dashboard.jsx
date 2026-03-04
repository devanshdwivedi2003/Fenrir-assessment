import { useState, useEffect } from "react";
import { useTheme } from "../ThemeContext";
import { useNavigate } from "react-router-dom";

const MOCK_SCANS = [
  {
    id: 1,
    name: "Web App Servers",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: [5, 12, 23, 18],
    lastScan: "4d ago",
  },
  {
    id: 2,
    name: "Web App Servers",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: [5, 12, 23, 18],
    lastScan: "4d ago",
  },
  {
    id: 3,
    name: "Web App Servers",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: [5, 12, 23, 18],
    lastScan: "4d ago",
  },
  {
    id: 4,
    name: "Web App Servers",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: [5, 12, 23, 18],
    lastScan: "4d ago",
  },
  {
    id: 5,
    name: "Web App Servers",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: [5, 12, 23, 18],
    lastScan: "4d ago",
  },
  {
    id: 6,
    name: "Web App Servers",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: [5, 12, 23, 18],
    lastScan: "4d ago",
  },
  {
    id: 7,
    name: "Web App Servers",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: [5, 12, 23, 18],
    lastScan: "4d ago",
  },
  {
    id: 8,
    name: "Web App Servers",
    type: "Greybox",
    status: "Scheduled",
    progress: 100,
    vuln: [5, 12],
    lastScan: "4d ago",
  },
  {
    id: 9,
    name: "Web App Servers",
    type: "Greybox",
    status: "Scheduled",
    progress: 100,
    vuln: [5, 12],
    lastScan: "4d ago",
  },
  {
    id: 10,
    name: "IoT Devices",
    type: "Blackbox",
    status: "Failed",
    progress: 10,
    vuln: [2, 4, 8, 1],
    lastScan: "3d ago",
  },
  {
    id: 11,
    name: "Temp Data",
    type: "Blackbox",
    status: "Failed",
    progress: 10,
    vuln: [2, 4, 8, 1],
    lastScan: "3d ago",
  },
  {
    id: 12,
    name: "API Gateway",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: [3, 8, 15, 22],
    lastScan: "2d ago",
  },
  {
    id: 13,
    name: "Auth Service",
    type: "Whitebox",
    status: "Completed",
    progress: 100,
    vuln: [1, 5, 9, 12],
    lastScan: "1d ago",
  },
  {
    id: 14,
    name: "Database Cluster",
    type: "Blackbox",
    status: "Scheduled",
    progress: 0,
    vuln: [],
    lastScan: "—",
  },
  {
    id: 15,
    name: "CDN Endpoints",
    type: "Greybox",
    status: "Completed",
    progress: 100,
    vuln: [2, 6, 11, 9],
    lastScan: "5d ago",
  },
];

const SEVERITY_STATS = [
  {
    label: "Critical Severity",
    value: 86,
    delta: "+2%",
    dir: "up",
    iconType: "critical",
  },
  {
    label: "High Severity",
    value: 16,
    delta: "+0.9%",
    dir: "up",
    iconType: "high",
  },
  {
    label: "Medium Severity",
    value: 26,
    delta: "-0.9%",
    dir: "down",
    iconType: "medium",
  },
  {
    label: "Low Severity",
    value: 16,
    delta: "+0.9%",
    dir: "up",
    iconType: "low",
  },
];

const Icon = ({ d, children, size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {d ? <path d={d} /> : children}
  </svg>
);

function GridIcon() {
  return (
    <Icon size={16}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </Icon>
  );
}
function FolderIcon() {
  return (
    <Icon
      size={16}
      d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
    />
  );
}
function ScanIcon() {
  return (
    <Icon size={16}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </Icon>
  );
}
function CalendarIcon() {
  return (
    <Icon size={16}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </Icon>
  );
}
function BellIcon() {
  return (
    <Icon size={16}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </Icon>
  );
}
function SettingsIcon() {
  return (
    <Icon size={16}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </Icon>
  );
}
function SupportIcon() {
  return (
    <Icon size={16}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
      <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
      <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
    </Icon>
  );
}
function SearchIcon() {
  return (
    <Icon size={15}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Icon>
  );
}
function FilterIcon() {
  return (
    <Icon size={15}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </Icon>
  );
}
function ColumnIcon() {
  return (
    <Icon size={15}>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </Icon>
  );
}
function PlusIcon() {
  return (
    <Icon size={15} strokeWidth={2.5}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </Icon>
  );
}
function SunIcon() {
  return (
    <Icon size={15}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </Icon>
  );
}
function MoonIcon() {
  return <Icon size={15} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />;
}
function ChevronRightIcon() {
  return (
    <Icon size={14}>
      <polyline points="9 18 15 12 9 6" />
    </Icon>
  );
}
function ChevronLeftIcon() {
  return (
    <Icon size={14}>
      <polyline points="15 18 9 12 15 6" />
    </Icon>
  );
}
function RefreshIcon() {
  return (
    <Icon size={14}>
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </Icon>
  );
}
function MenuIcon() {
  return (
    <Icon size={20}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </Icon>
  );
}
function XIcon() {
  return (
    <Icon size={13}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  );
}
function HomeIcon() {
  return (
    <Icon size={14}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </Icon>
  );
}

function SeverityIconComp({ type }) {
  if (type === "critical")
    return (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#EF4444"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    );
  if (type === "high")
    return (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F97316"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  if (type === "medium")
    return (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#EAB308"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B82F6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

const SEVERITY_ICON_BG = {
  dark: ["bg-[#3D1A1A]", "bg-[#3D2A1A]", "bg-[#3D3A1A]", "bg-[#1A2A3D]"],
  light: ["bg-red-100", "bg-orange-100", "bg-yellow-100", "bg-blue-100"],
};

const STATUS_CHIP = {
  Completed: {
    dark: "bg-green-500/15 text-green-400 border border-green-500/30",
    light: "bg-green-100 text-green-700 border border-green-200",
  },
  Scheduled: {
    dark: "bg-gray-500/15 text-gray-400 border border-gray-500/30",
    light: "bg-gray-100 text-gray-600 border border-gray-200",
  },
  Failed: {
    dark: "bg-red-500/15 text-red-400 border border-red-500/30",
    light: "bg-red-100 text-red-600 border border-red-200",
  },
};

const VULN_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-yellow-500",
  "bg-green-500",
];

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

function Toast({ msg, onClose }) {
  useEffect(() => {
    const id = setTimeout(onClose, 3000);
    return () => clearTimeout(id);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 bg-[#18181B] text-[#F4F4F5] px-4 py-3 rounded-xl shadow-2xl text-[13px] font-medium border border-[#27272A]">
      <span className="w-2 h-2 rounded-full bg-[#0CC8A8] shrink-0" />
      {msg}
      <button
        onClick={onClose}
        className="ml-1.5 bg-transparent border-none cursor-pointer text-[#71717A] flex p-0.5"
      >
        <XIcon />
      </button>
    </div>
  );
}

export default function Dashboard() {
  const { dark, setDark } = useTheme();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [hoveredRow, setHoveredRow] = useState(null);
  const PER_PAGE = 15;

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(id);
  }, []);

  const showToast = (msg) => setToast(msg);

  const filtered = MOCK_SCANS.filter((s) =>
    [s.name, s.type, s.status].some((v) =>
      v.toLowerCase().includes(search.toLowerCase()),
    ),
  );
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));

  const bg = dark ? "bg-[#111113]" : "bg-white";
  const surface = dark ? "bg-[#1A1A1D]" : "bg-white";
  const border = dark ? "border-[#2A2A2F]" : "border-[#E5E5E5]";
  const text = dark ? "text-[#F0F0F0]" : "text-[#111113]";
  const muted = dark ? "text-[#888897]" : "text-gray-500";
  const inputBg = dark
    ? "bg-[#1A1A1D] border-[#2A2A2F]"
    : "bg-white border-[#E5E5E5]";
  const btnBase = `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-[13px] font-medium cursor-pointer transition-all ${dark ? "bg-[#222226] border-[#2A2A2F] text-[#F0F0F0]" : "bg-white border-[#E5E5E5] text-[#111113]"}`;
  const navActive = "bg-[rgba(12,200,168,0.12)] text-[#0CC8A8]";
  const navInactive = `bg-transparent ${muted} hover:bg-[rgba(12,200,168,0.08)] hover:text-[#0CC8A8]`;
  const rowHover = dark ? "hover:bg-[#1F1F24]" : "hover:bg-gray-50";

  return (
    <div
      className={`min-h-screen flex ${bg} ${text} font-sans transition-colors`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * { font-family: 'Inter', system-ui, sans-serif; box-sizing: border-box; }
        body { margin: 0; }
        @keyframes apsPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes apsFadeIn { from{opacity:0;transform:scale(0.97)} to{opacity:1;transform:scale(1)} }
        .aps-input:focus { outline:none; border-color:#0CC8A8 !important; box-shadow:0 0 0 3px rgba(12,200,168,0.18) !important; }
        .aps-input::placeholder { color: ${dark ? "#555563" : "#9CA3AF"}; }
        .aps-skeleton { animation: apsPulse 1.5s ease-in-out infinite; }
        @media (max-width:1023px) { .aps-sidebar { position:fixed !important; z-index:40; transform:translateX(-100%); transition:transform 0.28s ease; } .aps-sidebar.open { transform:translateX(0); } }
        @media (min-width:1024px) { .aps-sidebar { position:sticky !important; top:0; transform:none !important; } }
      `}</style>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        />
      )}

      <aside
        className={`aps-sidebar${sidebarOpen ? " open" : ""} w-[220px] h-screen flex flex-col ${surface} border-r ${border} shrink-0`}
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
            <ChevronRightIcon />
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              className={`${btnBase} px-2.5`}
              aria-label="Toggle theme"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => showToast("Report exported!")}
              className={btnBase}
            >
              Export Report
            </button>
            <button
              onClick={() => showToast("Scan stopped.")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-red-500/45 bg-red-500/10 text-red-500 text-[13px] font-medium cursor-pointer"
            >
              Stop Scan
            </button>
          </div>
        </header>

        <div
          className={`flex flex-wrap items-center px-7 py-3.5 border-b ${border} ${bg} gap-0 shrink-0`}
        >
          {[
            { k: "Org:", v: "Project X" },
            { k: "Owner:", v: "Nammagiri" },
            { k: "Total Scans:", v: "100" },
            { k: "Scheduled:", v: "1000" },
            { k: "Rescans:", v: "100" },
            { k: "Failed Scans:", v: "100" },
          ].map(({ k, v }, i, arr) => (
            <div
              key={i}
              className="flex items-center gap-1.5 text-xs pr-5 mr-5"
            >
              <span className={muted}>{k}</span>
              <span className={`font-bold ${text}`}>{v}</span>
              {i < arr.length - 1 && (
                <span className={`${muted} ml-5 text-lg opacity-60`}>|</span>
              )}
            </div>
          ))}
          <div
            className={`ml-auto flex items-center gap-1.5 text-[13px] ${muted}`}
          >
            <span className="text-[#0CC8A8]">
              <RefreshIcon />
            </span>
            <span>10 mins ago</span>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 lg:grid-cols-4 border-b ${border} ${bg} shrink-0`}
        >
          {SEVERITY_STATS.map((s, i) => (
            <div
              key={i}
              className={`px-7 py-6 ${i < 3 ? `border-r ${border}` : ""}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[14px] font-medium ${text}`}>
                  {s.label}
                </span>
                <div
                  className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${dark ? SEVERITY_ICON_BG.dark[i] : SEVERITY_ICON_BG.light[i]}`}
                >
                  <SeverityIconComp type={s.iconType} />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-[22px] font-semibold leading-none ${text}`}
                >
                  {s.value}
                </span>
                <span
                  className={`text-[11px] font-medium flex items-center gap-0.5 ${s.dir === "up" ? "text-red-500" : "text-green-500"}`}
                >
                  <span className="text-[13px]">
                    {s.dir === "up" ? "↑" : "↓"}
                  </span>
                  {s.delta} {s.dir === "down" ? "decrease" : "increase"} than
                  yesterday
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`flex items-center gap-3 px-7 py-3.5 border-b ${border} ${bg} shrink-0`}
        >
          <div className="relative flex-1">
            <span
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${muted} pointer-events-none`}
            >
              <SearchIcon />
            </span>
            <input
              className={`aps-input w-full pl-10 pr-4 py-2.5 rounded-[10px] border text-[14px] transition-all ${inputBg} ${text}`}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search scans by name or type..."
            />
          </div>
          <button
            onClick={() => showToast("Filter panel coming soon")}
            className={`${btnBase} px-4 py-2.5 text-[14px] rounded-[10px] gap-2`}
          >
            <FilterIcon /> Filter
          </button>
          <button
            onClick={() => showToast("Column config coming soon")}
            className={`${btnBase} px-4 py-2.5 text-[14px] rounded-[10px] gap-2`}
          >
            <ColumnIcon /> Column
          </button>
          <button
            onClick={() => showToast("New scan created!")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0CC8A8] hover:bg-[#0aaf93] border border-[#0CC8A8] text-white text-[14px] font-semibold cursor-pointer transition-colors shrink-0"
          >
            <PlusIcon /> New scan
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto ${bg}`}>
          <table className="w-full min-w-[680px] border-collapse">
            <thead>
              <tr className={`border-b ${border}`}>
                {[
                  "Scan Name",
                  "Type",
                  "Status",
                  "Progress",
                  "Vulnerability",
                  "Last Scan",
                ].map((col) => (
                  <th
                    key={col}
                    className={`px-5 py-2.5 text-left text-[11.5px] font-semibold uppercase tracking-widest ${muted} ${surface} sticky top-0 z-10`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i} className={`border-b ${border}`}>
                      {[90, 60, 80, 130, 110, 55].map((w, j) => (
                        <td key={j} className={`px-5 py-3.5 ${surface}`}>
                          <div
                            className={`aps-skeleton h-3 rounded-md ${dark ? "bg-[#2C2C32]" : "bg-gray-200"}`}
                            style={{ width: w }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                : paginated.map((scan) => (
                    <tr
                      key={scan.id}
                      onClick={() => navigate(`/scan/${scan.id}`)}
                      onMouseEnter={() => setHoveredRow(scan.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`border-b ${dark ? "border-[#1E1E23]" : "border-[#F0F0F0]"} cursor-pointer ${rowHover} transition-colors`}
                    >
                      <td
                        className={`px-5 py-3.5 text-[13.5px] font-medium ${text}`}
                      >
                        {scan.name}
                      </td>
                      <td className={`px-5 py-3.5 text-[13px] ${muted}`}>
                        {scan.type}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium whitespace-nowrap ${STATUS_CHIP[scan.status]?.[dark ? "dark" : "light"] || ""}`}
                        >
                          {scan.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2 min-w-[140px]">
                          <div
                            className={`flex-1 h-1.5 rounded-full overflow-hidden ${dark ? "bg-[#2C2C32]" : "bg-gray-200"}`}
                          >
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: `${scan.progress}%`,
                                background:
                                  scan.status === "Failed"
                                    ? "#EF4444"
                                    : "#0CC8A8",
                              }}
                            />
                          </div>
                          <span className={`text-xs ${muted} w-8 text-right`}>
                            {scan.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex gap-1">
                          {scan.vuln.map((v, i) => (
                            <span
                              key={i}
                              className={`inline-flex items-center justify-center w-[26px] h-[26px] rounded-md ${VULN_COLORS[i % 4]} text-white text-[11px] font-bold`}
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className={`px-5 py-3.5 text-[13px] ${muted}`}>
                        {scan.lastScan}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {!loading && (
          <div
            className={`flex items-center justify-between px-5 py-2.5 border-t ${border} ${surface} text-[12.5px] ${muted} shrink-0`}
          >
            <span>
              Showing {paginated.length} of {MOCK_SCANS.length} Scans
            </span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`${btnBase} px-2.5 py-1.5 ${page === 1 ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className={`${btnBase} px-2.5 py-1.5 ${page === totalPages ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        )}
      </div>

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
