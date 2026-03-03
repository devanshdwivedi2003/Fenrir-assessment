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
function SearchIcon({ size = 16 }) {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function FilterIcon({ size = 16 }) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function ColumnIcon({ size = 16 }) {
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
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
function PlusIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function SunIcon({ size = 16 }) {
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
function MoonIcon({ size = 16 }) {
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
function ChevronLeftIcon({ size = 14 }) {
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function RefreshIcon({ size = 14 }) {
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
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
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

function SeverityIcon({ type, size = 22 }) {
  if (type === "critical") {
    return (
      <svg
        width={size}
        height={size}
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
  }
  if (type === "high" || type === "medium") {
    const color = type === "high" ? "#F97316" : "#EAB308";
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
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
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

function makeTheme(dark) {
  return {
    bg: dark ? "#111113" : "#ffffff",
    surface: dark ? "#1A1A1D" : "#FFFFFF",
    surface2: dark ? "#222226" : "#F0F0F0",
    surface3: dark ? "#2C2C32" : "#E4E4E4",
    border: dark ? "#2A2A2F" : "#E5E5E5",
    borderSub: dark ? "#1E1E23" : "#F0F0F0",
    text: dark ? "#F0F0F0" : "#111113",
    muted: dark ? "#888897" : "#6B7280",
    inputBg: dark ? "#1A1A1D" : "#FFFFFF",
    inputBorder: dark ? "#2A2A2F" : "#E5E5E5",
    btnBg: dark ? "#222226" : "#FFFFFF",
    btnBorder: dark ? "#2A2A2F" : "#E5E5E5",
    rowHover: dark ? "#1F1F24" : "#F9FAFB",
    chip: {
      Completed: {
        bg: dark ? "rgba(34,197,94,0.14)" : "#DCFCE7",
        text: dark ? "#4ADE80" : "#15803D",
        border: dark ? "rgba(34,197,94,0.28)" : "#BBF7D0",
      },
      Scheduled: {
        bg: dark ? "rgba(156,163,175,0.14)" : "#F3F4F6",
        text: dark ? "#9CA3AF" : "#4B5563",
        border: dark ? "rgba(156,163,175,0.28)" : "#E5E7EB",
      },
      Failed: {
        bg: dark ? "rgba(239,68,68,0.14)" : "#FEE2E2",
        text: dark ? "#F87171" : "#DC2626",
        border: dark ? "rgba(239,68,68,0.28)" : "#FECACA",
      },
    },
    severityIcon: [
      dark ? "#3D1A1A" : "#FEE2E2",
      dark ? "#3D2A1A" : "#FFEDD5",
      dark ? "#3D3A1A" : "#FEF9C3",
      dark ? "#1A2A3D" : "#DBEAFE",
    ],
  };
}

function StatusChip({ status, t }) {
  const c = t.chip[status] || t.chip.Scheduled;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        borderRadius: 6,
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

function VulnBadge({ value, idx }) {
  const colors = ["#EF4444", "#F97316", "#EAB308", "#22C55E"];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 26,
        borderRadius: 6,
        background: colors[idx % 4],
        color: "#fff",
        fontSize: 11,
        fontWeight: 700,
        flexShrink: 0,
      }}
    >
      {value}
    </span>
  );
}

function ProgressBar({ progress, status, t }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 140 }}
    >
      <div
        style={{
          flex: 1,
          height: 6,
          background: t.surface3,
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: 99,
            background: status === "Failed" ? "#EF4444" : "#0CC8A8",
            transition: "width 0.6s ease",
          }}
        />
      </div>
      <span
        style={{ fontSize: 12, color: t.muted, width: 34, textAlign: "right" }}
      >
        {progress}%
      </span>
    </div>
  );
}

function Toast({ msg, onClose }) {
  useEffect(() => {
    const id = setTimeout(onClose, 3000);
    return () => clearTimeout(id);
  }, [onClose]);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "#18181B",
        color: "#F4F4F5",
        padding: "11px 16px",
        borderRadius: 12,
        boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        fontSize: 13,
        fontWeight: 500,
        border: "1px solid #27272A",
        animation: "apsSlideUp 0.25s ease-out",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#0CC8A8",
          flexShrink: 0,
        }}
      />
      {msg}
      <button
        onClick={onClose}
        style={{
          marginLeft: 6,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#71717A",
          display: "flex",
          padding: 2,
        }}
      >
        <XIcon size={13} />
      </button>
    </div>
  );
}

function SkeletonRow({ t }) {
  return (
    <tr>
      {[90, 60, 80, 130, 110, 55].map((w, i) => (
        <td key={i} style={{ padding: "14px 20px", background: t.surface }}>
          <div
            style={{
              height: 13,
              width: w,
              background: t.surface3,
              borderRadius: 6,
              animation: "apsPulse 1.5s ease-in-out infinite",
            }}
          />
        </td>
      ))}
    </tr>
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
  const [selectedScan, setSelectedScan] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const PER_PAGE = 15;

  const t = makeTheme(dark);

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

  const baseBtnStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 14px",
    borderRadius: 8,
    background: t.btnBg,
    border: `1px solid ${t.btnBorder}`,
    color: t.text,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "filter 0.15s",
  };
  const iconBtnStyle = { ...baseBtnStyle, padding: "7px 9px" };

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

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: t.bg,
        color: t.text,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        transition: "background 0.2s, color 0.2s",
        position: "relative",
      }}
    >
      

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 30,
            background: "rgba(0,0,0,0.58)",
            backdropFilter: "blur(2px)",
          }}
        />
      )}

      <aside
        className={`aps-sidebar${sidebarOpen ? " open" : ""}`}
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
              className="aps-nav-btn"
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
              className="aps-nav-btn"
              onClick={() => {
                setActiveNav(id);
                setSidebarOpen(false);
              }}
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
            {/* Breadcrumb */}
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

          <div
            className="aps-header-actions"
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <button
              className="aps-btn-hover"
              onClick={() => setDark(!dark)}
              style={iconBtnStyle}
              aria-label="Toggle theme"
            >
              {dark ? <SunIcon size={15} /> : <MoonIcon size={15} />}
            </button>
            <button
              className="aps-btn-hover aps-export-btn"
              onClick={() => showToast("Report exported successfully!")}
              style={baseBtnStyle}
            >
              Export Report
            </button>
            <button
              className="aps-red-btn aps-stop-btn"
              onClick={() => showToast("Scan stopped.")}
              style={{
                ...baseBtnStyle,
                background: "rgba(239,68,68,0.08)",
                borderColor: "rgba(239,68,68,0.45)",
                color: "#EF4444",
              }}
            >
              Stop Scan
            </button>
          </div>
        </header>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            padding: "14px 28px",
            borderBottom: `1px solid ${t.border}`,
            background: t.bg,
            gap: 0,
            flexShrink: 0,
          }}
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12,
                paddingRight: 20,
                marginRight: 20,
              }}
            >
              <span style={{ color: t.muted }}>{k}</span>
              <span style={{ fontWeight: 700, color: t.text }}>{v}</span>
              {i < arr.length - 1 && (
                <span
                  style={{
                    color: t.border,
                    marginLeft: 20,
                    fontSize: 18,
                    lineHeight: 1,
                    opacity: 0.6,
                  }}
                >
                  |
                </span>
              )}
            </div>
          ))}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: t.muted,
            }}
          >
            <span style={{ color: "#0CC8A8", display: "flex" }}>
              <RefreshIcon size={14} />
            </span>
            <span>10 mins ago</span>
          </div>
        </div>

        <div
          className="aps-severity-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderBottom: `1px solid ${t.border}`,
            background: t.bg,
            flexShrink: 0,
          }}
        >
          {SEVERITY_STATS.map((s, i) => (
            <div key={i} style={{ padding: "24px 28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 500, color: t.text }}>
                  {s.label}
                </span>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: t.severityIcon[i],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <SeverityIcon type={s.iconType} size={20} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    lineHeight: 1,
                    color: t.text,
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: s.dir === "up" ? "#EF4444" : "#22C55E",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <span style={{ fontSize: 13 }}>
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
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 28px",
            borderBottom: `1px solid ${t.border}`,
            background: t.bg,
            flexShrink: 0,
          }}
        >
          <div style={{ position: "relative", flex: 1 }}>
            <span
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: t.muted,
                display: "flex",
                pointerEvents: "none",
              }}
            >
              <SearchIcon size={15} />
            </span>
            <input
              className="aps-input"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search scans by name or type..."
              style={{
                width: "100%",
                paddingLeft: 40,
                paddingRight: 16,
                paddingTop: 11,
                paddingBottom: 11,
                borderRadius: 10,
                border: `1px solid ${t.inputBorder}`,
                background: t.inputBg,
                color: t.text,
                fontSize: 14,
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
            />
          </div>
          <button
            className="aps-btn-hover"
            onClick={() => showToast("Filter panel coming soon")}
            style={{
              ...baseBtnStyle,
              padding: "10px 18px",
              fontSize: 14,
              borderRadius: 10,
              gap: 8,
            }}
          >
            <FilterIcon size={15} /> Filter
          </button>
          <button
            className="aps-btn-hover"
            onClick={() => showToast("Column config coming soon")}
            style={{
              ...baseBtnStyle,
              padding: "10px 18px",
              fontSize: 14,
              borderRadius: 10,
              gap: 8,
            }}
          >
            <ColumnIcon size={15} /> Column
          </button>
          <button
            className="aps-teal-btn"
            onClick={() => showToast("New scan created!")}
            style={{
              ...baseBtnStyle,
              padding: "10px 22px",
              fontSize: 14,
              borderRadius: 999,
              background: "#0CC8A8",
              borderColor: "#0CC8A8",
              color: "#fff",
              fontWeight: 600,
              gap: 8,
              flexShrink: 0,
            }}
          >
            <PlusIcon size={15} /> New scan
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", background: t.bg }}>
          <table
            style={{ width: "100%", minWidth: 680, borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ borderBottom: `1px solid ${t.border}` }}>
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
                    style={{
                      padding: "10px 20px",
                      textAlign: "left",
                      fontSize: 11.5,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: t.muted,
                      background: t.surface,
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonRow key={i} t={t} />
                  ))
                : paginated.map((scan) => {
                    const isHovered = hoveredRow === scan.id;
                    const tdStyle = {
                      padding: "13px 20px",
                      background: isHovered ? t.rowHover : "transparent",
                      transition: "background 0.1s",
                    };
                    return (
                      <tr
                        key={scan.id}
                        onClick={() => navigate(`/scan/2`)}
                        onMouseEnter={() => setHoveredRow(scan.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        style={{
                          borderBottom: `1px solid ${t.borderSub}`,
                          cursor: "pointer",
                        }}
                      >
                        <td
                          style={{
                            ...tdStyle,
                            fontSize: 13.5,
                            fontWeight: 500,
                            color: t.text,
                          }}
                        >
                          {scan.name}
                        </td>
                        <td
                          style={{ ...tdStyle, fontSize: 13, color: t.muted }}
                        >
                          {scan.type}
                        </td>
                        <td style={tdStyle}>
                          <StatusChip status={scan.status} t={t} />
                        </td>
                        <td style={tdStyle}>
                          <ProgressBar
                            progress={scan.progress}
                            status={scan.status}
                            t={t}
                          />
                        </td>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", gap: 5 }}>
                            {scan.vuln.map((v, i) => (
                              <VulnBadge key={i} value={v} idx={i} />
                            ))}
                          </div>
                        </td>
                        <td
                          style={{ ...tdStyle, fontSize: 13, color: t.muted }}
                        >
                          {scan.lastScan}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {!loading && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
              borderTop: `1px solid ${t.border}`,
              background: t.surface,
              fontSize: 12.5,
              color: t.muted,
              flexShrink: 0,
            }}
          >
            <span>
              Showing {paginated.length} of {MOCK_SCANS.length} Scans
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className="aps-btn-hover"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{ ...iconBtnStyle, opacity: page === 1 ? 0.4 : 1 }}
              >
                <ChevronLeftIcon size={14} />
              </button>
              <button
                className="aps-btn-hover"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  ...iconBtnStyle,
                  opacity: page === totalPages ? 0.4 : 1,
                }}
              >
                <ChevronRightIcon size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedScan && (
        <div
          onClick={() => setSelectedScan(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 520,
              background: t.surface,
              borderRadius: 20,
              border: `1px solid ${t.border}`,
              padding: 24,
              boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
              animation: "apsFadeIn 0.25s ease-out",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    marginBottom: 6,
                    color: t.text,
                    margin: "0 0 6px 0",
                  }}
                >
                  {selectedScan.name}
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 12.5,
                    color: t.muted,
                  }}
                >
                  <span>{selectedScan.type}</span>
                  <span>·</span>
                  <StatusChip status={selectedScan.status} t={t} />
                </div>
              </div>
              <button
                className="aps-btn-hover"
                onClick={() => setSelectedScan(null)}
                style={{ ...iconBtnStyle, flexShrink: 0 }}
              >
                <XIcon size={15} />
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  background: t.surface2,
                  borderRadius: 12,
                  padding: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: t.muted,
                    marginBottom: 10,
                  }}
                >
                  Progress
                </div>
                <ProgressBar
                  progress={selectedScan.progress}
                  status={selectedScan.status}
                  t={t}
                />
              </div>
              <div
                style={{
                  background: t.surface2,
                  borderRadius: 12,
                  padding: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: t.muted,
                    marginBottom: 8,
                  }}
                >
                  Last Scan
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, color: t.text }}>
                  {selectedScan.lastScan}
                </div>
              </div>
            </div>

            <div
              style={{
                background: t.surface2,
                borderRadius: 12,
                padding: 14,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: t.muted,
                  marginBottom: 12,
                }}
              >
                Vulnerability Breakdown
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["Critical", "High", "Medium", "Low"].map((label, i) => (
                  <div key={label} style={{ flex: 1, textAlign: "center" }}>
                    <div
                      style={{ fontSize: 11, color: t.muted, marginBottom: 4 }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        color: ["#EF4444", "#F97316", "#EAB308", "#22C55E"][i],
                      }}
                    >
                      {selectedScan.vuln[i] ?? 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: t.surface2,
                borderRadius: 12,
                padding: 14,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: t.muted,
                  marginBottom: 10,
                }}
              >
                Recent Log Entries
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {[
                  `Scan initiated — target: ${selectedScan.name}`,
                  "Port discovery completed — 12 open ports found",
                  "Vulnerability assessment in progress...",
                  "Finding: SQL injection risk detected (High)",
                  "Generating report artifacts...",
                ].map((log, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 12,
                      display: "flex",
                      gap: 8,
                      color: t.muted,
                    }}
                  >
                    <span
                      style={{
                        color: "#0CC8A8",
                        fontFamily: "monospace",
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="aps-teal-btn"
                onClick={() => {
                  showToast(`Re-running scan on ${selectedScan.name}`);
                  setSelectedScan(null);
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: "#0CC8A8",
                  border: "1px solid #0CC8A8",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Re-run Scan
              </button>
              <button
                className="aps-btn-hover"
                onClick={() => {
                  showToast("Report exported!");
                  setSelectedScan(null);
                }}
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  padding: "10px 16px",
                  borderRadius: 12,
                  background: t.btnBg,
                  border: `1px solid ${t.btnBorder}`,
                  color: t.text,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Export Report
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
