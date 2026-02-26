import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #080c14;
    --surface: #0d1424;
    --surface2: #111d30;
    --border: #1e2d45;
    --accent: #00d4ff;
    --accent2: #7c3aed;
    --accent3: #10b981;
    --danger: #ef4444;
    --warning: #f59e0b;
    --text: #e2e8f0;
    --text-muted: #64748b;
    --text-dim: #94a3b8;
    --glow: 0 0 20px rgba(0,212,255,0.3);
  }

  body { background: var(--bg); font-family: 'DM Sans', sans-serif; color: var(--text); overflow-x: hidden; }

  .app { display: flex; min-height: 100vh; }

  /* Sidebar */
  .sidebar {
    width: 240px; min-height: 100vh; background: var(--surface);
    border-right: 1px solid var(--border); display: flex; flex-direction: column;
    position: fixed; top: 0; left: 0; z-index: 100;
    transition: all 0.3s;
  }

  .sidebar-logo {
    padding: 24px 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 12px;
  }

  .logo-icon {
    width: 36px; height: 36px; background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    font-size: 18px; box-shadow: var(--glow);
  }

  .logo-text { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 18px;
    background: linear-gradient(to right, var(--accent), var(--accent2));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

  .sidebar-nav { padding: 16px 12px; flex: 1; overflow-y: auto; }

  .nav-section-title {
    font-family: 'Space Mono', monospace; font-size: 10px; color: var(--text-muted);
    text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 8px 4px;
  }

  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: 8px; cursor: pointer; transition: all 0.2s;
    font-size: 14px; font-weight: 500; color: var(--text-dim);
    margin-bottom: 2px;
  }

  .nav-item:hover { background: var(--surface2); color: var(--text); }
  .nav-item.active {
    background: rgba(0,212,255,0.1); color: var(--accent);
    border: 1px solid rgba(0,212,255,0.2);
  }

  .nav-item .icon { font-size: 16px; width: 20px; text-align: center; }

  .nav-badge {
    margin-left: auto; background: var(--accent2); color: white;
    font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: 700;
  }

  .sidebar-footer {
    padding: 16px 12px; border-top: 1px solid var(--border);
  }

  .user-card {
    display: flex; align-items: center; gap: 10px; padding: 10px;
    background: var(--surface2); border-radius: 10px; cursor: pointer;
  }

  .avatar {
    width: 32px; height: 32px; border-radius: 8px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700;
  }

  .user-info { flex: 1; }
  .user-name { font-size: 13px; font-weight: 600; }
  .user-plan { font-size: 11px; color: var(--accent); }

  /* Main content */
  .main { flex: 1; margin-left: 240px; min-height: 100vh; display: flex; flex-direction: column; }

  .topbar {
    height: 60px; background: var(--surface); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; padding: 0 24px; gap: 16px;
    position: sticky; top: 0; z-index: 50;
  }

  .topbar-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 16px; flex: 1; }

  .topbar-btn {
    padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600;
    transition: all 0.2s;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--accent), #0099cc);
    color: #000; box-shadow: var(--glow);
  }

  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(0,212,255,0.5); }

  .btn-ghost {
    background: transparent; color: var(--text-dim); border: 1px solid var(--border);
  }

  .btn-ghost:hover { background: var(--surface2); color: var(--text); }

  .btn-danger { background: rgba(239,68,68,0.1); color: var(--danger); border: 1px solid rgba(239,68,68,0.3); }

  .content { padding: 24px; flex: 1; }

  /* Cards */
  .card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 20px;
  }

  .card-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; margin-bottom: 16px; }

  /* Stats Grid */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }

  .stat-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 20px; position: relative; overflow: hidden;
  }

  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }
  .stat-card.cyan::before { background: var(--accent); }
  .stat-card.purple::before { background: var(--accent2); }
  .stat-card.green::before { background: var(--accent3); }
  .stat-card.yellow::before { background: var(--warning); }

  .stat-label { font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
  .stat-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin: 8px 0 4px; }
  .stat-value.cyan { color: var(--accent); }
  .stat-value.purple { color: var(--accent2); }
  .stat-value.green { color: var(--accent3); }
  .stat-value.yellow { color: var(--warning); }
  .stat-change { font-size: 12px; color: var(--accent3); }
  .stat-icon { position: absolute; top: 16px; right: 16px; font-size: 24px; opacity: 0.3; }

  /* Bots grid */
  .bots-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  .bot-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 20px; cursor: pointer;
    transition: all 0.3s; position: relative; overflow: hidden;
  }

  .bot-card:hover { border-color: var(--accent); transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4); }

  .bot-card-header { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px; }

  .bot-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center; font-size: 22px;
    flex-shrink: 0;
  }

  .bot-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; }
  .bot-type { font-size: 12px; color: var(--text-muted); margin-top: 2px; }

  .bot-status {
    margin-left: auto; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;
  }
  .status-active { background: rgba(16,185,129,0.1); color: var(--accent3); border: 1px solid rgba(16,185,129,0.3); }
  .status-stopped { background: rgba(239,68,68,0.1); color: var(--danger); border: 1px solid rgba(239,68,68,0.3); }
  .status-draft { background: rgba(245,158,11,0.1); color: var(--warning); border: 1px solid rgba(245,158,11,0.3); }

  .bot-stats { display: flex; gap: 16px; margin-bottom: 16px; }
  .bot-stat { }
  .bot-stat-val { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; }
  .bot-stat-key { font-size: 11px; color: var(--text-muted); }

  .bot-actions { display: flex; gap: 8px; }
  .bot-action {
    flex: 1; padding: 7px; border-radius: 7px; border: 1px solid var(--border);
    background: var(--surface2); color: var(--text-dim); cursor: pointer;
    font-size: 12px; font-family: 'DM Sans', sans-serif; font-weight: 500;
    transition: all 0.2s; text-align: center;
  }
  .bot-action:hover { border-color: var(--accent); color: var(--accent); }
  .bot-action.primary { background: rgba(0,212,255,0.1); color: var(--accent); border-color: rgba(0,212,255,0.3); }

  /* Flow Builder */
  .builder-container { display: flex; height: calc(100vh - 120px); gap: 0; overflow: hidden; }

  .builder-sidebar {
    width: 260px; background: var(--surface); border-right: 1px solid var(--border);
    overflow-y: auto; flex-shrink: 0;
  }

  .builder-canvas {
    flex: 1; background: var(--bg);
    background-image:
      radial-gradient(circle, rgba(30,45,69,0.4) 1px, transparent 1px);
    background-size: 24px 24px;
    position: relative; overflow: hidden;
  }

  .canvas-nodes { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }

  .node {
    position: absolute; background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 16px; min-width: 180px; cursor: grab;
    transition: border-color 0.2s, box-shadow 0.2s;
    user-select: none;
  }

  .node:hover { border-color: var(--accent); box-shadow: var(--glow); }
  .node.selected { border-color: var(--accent); box-shadow: var(--glow); }

  .node-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .node-dot { width: 8px; height: 8px; border-radius: 50%; }
  .node-dot.cyan { background: var(--accent); }
  .node-dot.purple { background: var(--accent2); }
  .node-dot.green { background: var(--accent3); }
  .node-dot.yellow { background: var(--warning); }
  .node-label { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 12px; }
  .node-text { font-size: 12px; color: var(--text-dim); line-height: 1.5; }

  .node-port {
    position: absolute; width: 10px; height: 10px; border-radius: 50%;
    background: var(--border); border: 2px solid var(--surface);
    cursor: crosshair;
  }
  .node-port:hover { background: var(--accent); }
  .node-port.out { right: -5px; top: 50%; transform: translateY(-50%); }
  .node-port.in { left: -5px; top: 50%; transform: translateY(-50%); }

  svg.connections { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }

  .node-palette { padding: 16px; }
  .palette-title { font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .palette-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    background: var(--surface2); border: 1px solid var(--border); border-radius: 8px;
    margin-bottom: 6px; cursor: grab; font-size: 13px; transition: all 0.2s;
  }
  .palette-item:hover { border-color: var(--accent); color: var(--accent); }
  .palette-item .pi { font-size: 16px; }

  .builder-props {
    width: 280px; background: var(--surface); border-left: 1px solid var(--border);
    overflow-y: auto; flex-shrink: 0; padding: 20px;
  }

  /* Forms */
  .form-group { margin-bottom: 16px; }
  .form-label { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; display: block; text-transform: uppercase; letter-spacing: 0.5px; }
  .form-input {
    width: 100%; background: var(--surface2); border: 1px solid var(--border);
    border-radius: 8px; padding: 10px 12px; color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
    transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--accent); }
  .form-textarea { resize: vertical; min-height: 80px; }
  .form-select { appearance: none; }

  /* Plans */
  .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

  .plan-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 28px; position: relative; overflow: hidden;
    transition: all 0.3s;
  }

  .plan-card.featured {
    border-color: var(--accent); background: rgba(0,212,255,0.05);
  }

  .plan-card.featured::before {
    content: 'محبوب‌ترین'; position: absolute; top: 16px; right: -8px;
    background: var(--accent); color: #000; font-size: 11px; font-weight: 700;
    padding: 4px 16px; border-radius: 20px 0 0 20px;
  }

  .plan-name { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px; margin-bottom: 8px; }
  .plan-price { font-family: 'Space Mono', monospace; font-size: 36px; font-weight: 700; color: var(--accent); }
  .plan-period { font-size: 13px; color: var(--text-muted); }
  .plan-desc { font-size: 13px; color: var(--text-dim); margin: 16px 0; line-height: 1.6; }
  .plan-feature { display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 6px 0; border-bottom: 1px solid var(--border); }
  .plan-feature .check { color: var(--accent3); }
  .plan-feature .cross { color: var(--danger); }

  /* Analytics */
  .analytics-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }

  .chart-placeholder {
    height: 200px; background: var(--surface2); border-radius: 8px;
    display: flex; align-items: flex-end; gap: 4px; padding: 16px;
    position: relative; overflow: hidden;
  }

  .chart-bar {
    flex: 1; border-radius: 4px 4px 0 0; min-width: 8px;
    transition: opacity 0.2s; background: linear-gradient(to top, var(--accent2), var(--accent));
    opacity: 0.8;
  }
  .chart-bar:hover { opacity: 1; }

  .mini-chart {
    height: 60px; background: var(--surface2); border-radius: 6px;
    display: flex; align-items: flex-end; gap: 2px; padding: 8px;
  }
  .mini-bar { flex: 1; border-radius: 2px 2px 0 0; }
  .mini-bar.green { background: var(--accent3); }
  .mini-bar.cyan { background: var(--accent); }

  /* Table */
  .data-table { width: 100%; border-collapse: collapse; }
  .data-table th { text-align: left; padding: 10px 12px; font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border); font-weight: 600; }
  .data-table td { padding: 12px 12px; font-size: 13px; border-bottom: 1px solid rgba(30,45,69,0.5); }
  .data-table tr:hover td { background: var(--surface2); }
  .data-table tr:last-child td { border-bottom: none; }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 200;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }

  .modal {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 28px; width: 520px; max-width: 95vw;
    max-height: 90vh; overflow-y: auto;
  }

  .modal-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 20px; margin-bottom: 24px; }
  .modal-footer { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; }

  /* Bot type grid */
  .bot-types-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
  .bot-type-item {
    padding: 14px 10px; background: var(--surface2); border: 2px solid var(--border);
    border-radius: 10px; text-align: center; cursor: pointer; transition: all 0.2s;
  }
  .bot-type-item:hover, .bot-type-item.selected {
    border-color: var(--accent); background: rgba(0,212,255,0.08);
  }
  .bot-type-item .emoji { font-size: 24px; display: block; margin-bottom: 6px; }
  .bot-type-item .label { font-size: 11px; font-weight: 600; color: var(--text-dim); }

  /* Tag */
  .tag {
    display: inline-block; padding: 3px 10px; border-radius: 20px;
    font-size: 11px; font-weight: 600;
  }
  .tag-cyan { background: rgba(0,212,255,0.1); color: var(--accent); border: 1px solid rgba(0,212,255,0.2); }
  .tag-purple { background: rgba(124,58,237,0.1); color: var(--accent2); border: 1px solid rgba(124,58,237,0.2); }
  .tag-green { background: rgba(16,185,129,0.1); color: var(--accent3); border: 1px solid rgba(16,185,129,0.2); }

  /* Notification dot */
  .notif { width: 8px; height: 8px; background: var(--danger); border-radius: 50%; display: inline-block; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  /* Admin */
  .admin-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

  .log-item {
    display: flex; align-items: center; gap: 12px; padding: 10px 0;
    border-bottom: 1px solid rgba(30,45,69,0.5); font-size: 13px;
  }
  .log-time { font-family: 'Space Mono', monospace; font-size: 11px; color: var(--text-muted); white-space: nowrap; }
  .log-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .log-dot.info { background: var(--accent); }
  .log-dot.warn { background: var(--warning); }
  .log-dot.error { background: var(--danger); }

  .progress-bar { height: 6px; background: var(--surface2); border-radius: 3px; overflow: hidden; margin-top: 6px; }
  .progress-fill { height: 100%; border-radius: 3px; background: linear-gradient(to right, var(--accent2), var(--accent)); }

  /* Toast */
  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 999;
    background: var(--surface); border: 1px solid var(--accent3);
    border-radius: 10px; padding: 14px 20px; font-size: 14px;
    display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* Responsive adjustments */
  @media (max-width: 1200px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .bots-grid { grid-template-columns: repeat(2, 1fr); }
    .plans-grid { grid-template-columns: 1fr; }
  }
`;

const NAV_ITEMS = [
  { section: "اصلی" },
  { id: "dashboard", label: "داشبورد", icon: "📊" },
  { id: "bots", label: "ربات‌های من", icon: "🤖", badge: "5" },
  { id: "builder", label: "سازنده ربات", icon: "⚡" },
  { section: "مدیریت" },
  { id: "analytics", label: "آنالیتیکس", icon: "📈" },
  { id: "users", label: "کاربران", icon: "👥" },
  { id: "messages", label: "پیام‌ها", icon: "💬", badge: "12" },
  { section: "سیستم" },
  { id: "plans", label: "پلن‌ها و قیمت‌گذاری", icon: "💎" },
  { id: "admin", label: "پنل مدیریت", icon: "🔧" },
];

const BOT_TYPES = [
  { emoji: "🛒", label: "فروشگاهی" },
  { emoji: "🎓", label: "آموزشی" },
  { emoji: "💬", label: "پشتیبانی" },
  { emoji: "💳", label: "پرداخت" },
  { emoji: "📝", label: "فرم‌ساز" },
  { emoji: "📊", label: "نظرسنجی" },
  { emoji: "🔐", label: "عضویت" },
  { emoji: "💰", label: "اشتراکی" },
  { emoji: "🤖", label: "هوش مصنوعی" },
  { emoji: "📢", label: "کانال" },
  { emoji: "🎁", label: "گیمیفیکیشن" },
  { emoji: "⚙️", label: "سفارشی" },
];

const SAMPLE_BOTS = [
  { id: 1, name: "فروشگاه دیجیتال", type: "فروشگاهی", emoji: "🛒", status: "active", users: 4821, msgs: "12.3k", color: "linear-gradient(135deg,#00d4ff22,#00d4ff11)" },
  { id: 2, name: "پشتیبانی ۲۴ساعته", type: "پشتیبانی", emoji: "💬", status: "active", users: 2103, msgs: "8.7k", color: "linear-gradient(135deg,#7c3aed22,#7c3aed11)" },
  { id: 3, name: "دوره آموزش طراحی", type: "آموزشی", emoji: "🎓", status: "active", users: 967, msgs: "3.1k", color: "linear-gradient(135deg,#10b98122,#10b98111)" },
  { id: 4, name: "نظرسنجی محصولات", type: "نظرسنجی", emoji: "📊", status: "stopped", users: 312, msgs: "890", color: "linear-gradient(135deg,#f59e0b22,#f59e0b11)" },
  { id: 5, name: "ربات هوشمند GPT", type: "هوش مصنوعی", emoji: "🤖", status: "active", users: 7654, msgs: "45.2k", color: "linear-gradient(135deg,#ef444422,#ef444411)" },
  { id: 6, name: "اشتراک ماهانه", type: "اشتراکی", emoji: "💰", status: "draft", users: 0, msgs: "0", color: "linear-gradient(135deg,#64748b22,#64748b11)" },
];

const chartData = [40,65,45,80,55,90,70,85,60,95,75,100];

// ─── Components ─────────────────────────────────────────────

function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return <div className="toast">✅ {msg}</div>;
}

function CreateBotModal({ onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(null);
  const [name, setName] = useState("");
  const [token, setToken] = useState("");

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-title">🤖 ساخت ربات جدید</div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["انتخاب نوع", "اطلاعات ربات", "راه‌اندازی"].map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 12,
              padding: "8px 0", borderRadius: 8,
              background: step === i+1 ? "rgba(0,212,255,0.15)" : "var(--surface2)",
              color: step === i+1 ? "var(--accent)" : "var(--text-muted)",
              border: `1px solid ${step === i+1 ? "rgba(0,212,255,0.3)" : "var(--border)"}` }}>
              {i+1}. {s}
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <div className="bot-types-grid">
              {BOT_TYPES.map(bt => (
                <div key={bt.label} className={`bot-type-item ${type === bt.label ? "selected" : ""}`}
                  onClick={() => setType(bt.label)}>
                  <span className="emoji">{bt.emoji}</span>
                  <span className="label">{bt.label}</span>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button className="topbar-btn btn-ghost" onClick={onClose}>انصراف</button>
              <button className="topbar-btn btn-primary" onClick={() => type && setStep(2)}
                style={{ opacity: type ? 1 : 0.5 }}>ادامه ←</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="form-group">
              <label className="form-label">نام ربات</label>
              <input className="form-input" placeholder="مثال: فروشگاه دیجیتال من" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">توکن BotFather</label>
              <input className="form-input" placeholder="123456:ABC-DEF..." value={token} onChange={e => setToken(e.target.value)} style={{ fontFamily: "monospace", fontSize: 13 }} />
            </div>
            <div className="form-group">
              <label className="form-label">توضیحات (اختیاری)</label>
              <textarea className="form-input form-textarea" placeholder="درباره این ربات توضیح دهید..." />
            </div>
            <div className="modal-footer">
              <button className="topbar-btn btn-ghost" onClick={() => setStep(1)}>← قبلی</button>
              <button className="topbar-btn btn-primary" onClick={() => (name && token) && setStep(3)}
                style={{ opacity: (name && token) ? 1 : 0.5 }}>ادامه ←</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🚀</div>
              <div style={{ fontFamily: "Syne", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>آماده راه‌اندازی!</div>
              <div style={{ color: "var(--text-dim)", fontSize: 14, marginBottom: 24 }}>
                ربات <strong style={{ color: "var(--accent)" }}>{name}</strong> با موفقیت پیکربندی شد.
                الان می‌توانید ربات را فعال کرده یا وارد سازنده گرافیکی شوید.
              </div>
              <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 10, padding: 16, textAlign: "left", fontSize: 13 }}>
                <div style={{ color: "var(--text-muted)", marginBottom: 8, fontSize: 11, textTransform: "uppercase" }}>اطلاعات</div>
                <div>نوع: <span className="tag tag-cyan">{type}</span></div>
                <div style={{ marginTop: 6 }}>وضعیت: <span className="tag tag-green">آماده</span></div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="topbar-btn btn-ghost" onClick={onClose}>بعداً تنظیم می‌کنم</button>
              <button className="topbar-btn btn-primary" onClick={() => { onSave(name, type); onClose(); }}>فعال‌سازی ربات ✓</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────

function Dashboard({ bots, setPage }) {
  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card cyan">
          <div className="stat-icon">🤖</div>
          <div className="stat-label">کل ربات‌ها</div>
          <div className="stat-value cyan">6</div>
          <div className="stat-change">▲ 2 ربات جدید این ماه</div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">👥</div>
          <div className="stat-label">کل کاربران</div>
          <div className="stat-value purple">15,857</div>
          <div className="stat-change">▲ +1,240 این هفته</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">💬</div>
          <div className="stat-label">پیام‌های امروز</div>
          <div className="stat-value green">3,241</div>
          <div className="stat-change">▲ +18% نسبت به دیروز</div>
        </div>
        <div className="stat-card yellow">
          <div className="stat-icon">💰</div>
          <div className="stat-label">درآمد ماه</div>
          <div className="stat-value yellow">₿4,200</div>
          <div className="stat-change">▲ +32% رشد</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
        <div className="card">
          <div className="card-title">📈 فعالیت ۳۰ روز اخیر</div>
          <div className="chart-placeholder">
            {chartData.map((v, i) => (
              <div key={i} className="chart-bar" style={{ height: `${v}%` }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            {[["پیام‌ها", "45.2k", "cyan"], ["کاربران جدید", "3.8k", "purple"], ["تراکنش", "890", "green"]].map(([l, v, c]) => (
              <div key={l}>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{l}</div>
                <div style={{ fontFamily: "Syne", fontWeight: 700, color: `var(--accent${c === "cyan" ? "" : c === "purple" ? "2" : "3"})` }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">🏆 ربات‌های برتر</div>
          {SAMPLE_BOTS.filter(b => b.status === "active").slice(0, 4).map(b => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontSize: 20 }}>{b.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{b.users.toLocaleString()} کاربر</div>
              </div>
              <div style={{ height: 30, width: 50 }}>
                <div className="mini-chart">
                  {[40, 60, 45, 80, 65, 90, 75].map((v, i) => (
                    <div key={i} className="mini-bar cyan" style={{ height: `${v}%` }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div className="card-title" style={{ margin: 0 }}>🤖 ربات‌های فعال</div>
          <button className="topbar-btn btn-ghost" style={{ fontSize: 12, padding: "6px 12px" }}
            onClick={() => setPage("bots")}>مشاهده همه</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ربات</th>
              <th>نوع</th>
              <th>کاربران</th>
              <th>پیام‌ها</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_BOTS.map(b => (
              <tr key={b.id}>
                <td style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span>{b.emoji}</span> <strong>{b.name}</strong>
                </td>
                <td><span className="tag tag-cyan">{b.type}</span></td>
                <td style={{ fontFamily: "Space Mono", fontSize: 12 }}>{b.users.toLocaleString()}</td>
                <td style={{ fontFamily: "Space Mono", fontSize: 12 }}>{b.msgs}</td>
                <td>
                  <span className={`bot-status status-${b.status}`}>
                    {b.status === "active" ? "فعال" : b.status === "stopped" ? "متوقف" : "پیش‌نویس"}
                  </span>
                </td>
                <td>
                  <button className="topbar-btn btn-ghost" style={{ fontSize: 11, padding: "4px 10px" }}
                    onClick={() => setPage("builder")}>ویرایش</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BotsPage({ bots, onNew }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22 }}>🤖 ربات‌های من</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{bots.length} ربات تعریف شده</div>
        </div>
        <button className="topbar-btn btn-primary" onClick={onNew}>+ ساخت ربات جدید</button>
      </div>
      <div className="bots-grid">
        {bots.map(b => (
          <div key={b.id} className="bot-card" style={{ background: b.color }}>
            <div className="bot-card-header">
              <div className="bot-icon" style={{ background: "var(--surface2)" }}>{b.emoji}</div>
              <div>
                <div className="bot-name">{b.name}</div>
                <div className="bot-type">{b.type}</div>
              </div>
              <span className={`bot-status status-${b.status}`}>
                {b.status === "active" ? "فعال" : b.status === "stopped" ? "متوقف" : "پیش‌نویس"}
              </span>
            </div>
            <div className="bot-stats">
              <div className="bot-stat">
                <div className="bot-stat-val">{b.users.toLocaleString()}</div>
                <div className="bot-stat-key">کاربر</div>
              </div>
              <div className="bot-stat">
                <div className="bot-stat-val">{b.msgs}</div>
                <div className="bot-stat-key">پیام</div>
              </div>
            </div>
            <div className="bot-actions">
              <div className="bot-action primary">⚡ سازنده</div>
              <div className="bot-action">📊 آمار</div>
              <div className="bot-action">⚙️ تنظیمات</div>
            </div>
          </div>
        ))}
        <div className="bot-card" style={{ border: "2px dashed var(--border)", background: "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 180, cursor: "pointer" }}
          onClick={onNew}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>➕</div>
          <div style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 15 }}>ربات جدید بساز</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>در چند دقیقه</div>
        </div>
      </div>
    </div>
  );
}

const NODES_INIT = [
  { id: 1, type: "start", label: "شروع", dot: "green", text: "نقطه ورود کاربر", x: 60, y: 100 },
  { id: 2, type: "message", label: "خوش‌آمدگویی", dot: "cyan", text: "سلام! به ربات خوش آمدید 👋", x: 280, y: 100 },
  { id: 3, type: "condition", label: "شرط‌گذاری", dot: "yellow", text: "کاربر عضو است؟", x: 500, y: 100 },
  { id: 4, type: "message", label: "منوی اصلی", dot: "cyan", text: "لطفاً یکی از گزینه‌ها را انتخاب کنید", x: 500, y: 260 },
  { id: 5, type: "api", label: "اتصال API", dot: "purple", text: "دریافت اطلاعات از سرور", x: 280, y: 260 },
];

const PALETTE_NODES = [
  { icon: "💬", label: "ارسال پیام", color: "cyan" },
  { icon: "❓", label: "سوال / فرم", color: "cyan" },
  { icon: "🔀", label: "شرط‌گذاری", color: "yellow" },
  { icon: "🔌", label: "اتصال API", color: "purple" },
  { icon: "💳", label: "پرداخت", color: "green" },
  { icon: "📁", label: "ذخیره متغیر", color: "purple" },
  { icon: "⏱️", label: "تأخیر زمانی", color: "cyan" },
  { icon: "🔁", label: "حلقه", color: "yellow" },
  { icon: "🤖", label: "هوش مصنوعی", color: "purple" },
  { icon: "📤", label: "ارسال فایل", color: "cyan" },
  { icon: "👥", label: "بررسی عضویت", color: "green" },
  { icon: "🔚", label: "پایان جریان", color: "yellow" },
];

function BuilderPage() {
  const [nodes, setNodes] = useState(NODES_INIT);
  const [selected, setSelected] = useState(null);
  const [dragging, setDragging] = useState(null);
  const canvasRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const selNode = nodes.find(n => n.id === selected);

  const onMouseDown = (e, id) => {
    e.stopPropagation();
    setSelected(id);
    const node = nodes.find(n => n.id === id);
    dragOffset.current = { x: e.clientX - node.x, y: e.clientY - node.y };
    setDragging(id);
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(0, e.clientX - rect.left - dragOffset.current.x + rect.left - rect.left);
    const nx = e.clientX - dragOffset.current.x;
    const ny = e.clientY - dragOffset.current.y;
    setNodes(prev => prev.map(n => n.id === dragging ? { ...n, x: Math.max(10, nx - rect.left + 10), y: Math.max(10, ny - rect.top + 10) } : n));
  };

  const onMouseUp = () => setDragging(null);

  const connections = [
    { from: nodes[0], to: nodes[1] },
    { from: nodes[1], to: nodes[2] },
    { from: nodes[2], to: nodes[3] },
    { from: nodes[1], to: nodes[4] },
  ];

  return (
    <div style={{ margin: "-24px", height: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "12px 20px", background: "var(--surface)", borderBottom: "1px solid var(--border)", display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ fontFamily: "Syne", fontWeight: 700 }}>⚡ سازنده گرافیکی</span>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>فروشگاه دیجیتال</span>
        <div style={{ flex: 1 }} />
        <button className="topbar-btn btn-ghost" style={{ fontSize: 12, padding: "6px 12px" }}>پیش‌نمایش</button>
        <button className="topbar-btn btn-primary" style={{ fontSize: 12, padding: "6px 14px" }}>ذخیره ✓</button>
      </div>
      <div className="builder-container" style={{ flex: 1 }}>
        <div className="builder-sidebar">
          <div className="node-palette">
            <div className="palette-title">نودها</div>
            {PALETTE_NODES.map(p => (
              <div key={p.label} className="palette-item">
                <span className="pi">{p.icon}</span> {p.label}
              </div>
            ))}
          </div>
        </div>

        <div className="builder-canvas" ref={canvasRef}
          onMouseMove={onMouseMove} onMouseUp={onMouseUp}
          onClick={() => setSelected(null)}>
          <svg className="connections">
            {connections.map((c, i) => c.from && c.to ? (
              <path key={i}
                d={`M ${c.from.x + 185} ${c.from.y + 36} C ${c.from.x + 240} ${c.from.y + 36}, ${c.to.x - 30} ${c.to.y + 36}, ${c.to.x} ${c.to.y + 36}`}
                stroke="var(--accent)" strokeWidth="1.5" fill="none" strokeDasharray="4,4" opacity="0.6"
              />
            ) : null)}
          </svg>
          <div className="canvas-nodes">
            {nodes.map(n => (
              <div key={n.id} className={`node ${selected === n.id ? "selected" : ""}`}
                style={{ left: n.x, top: n.y, maxWidth: 200 }}
                onMouseDown={e => onMouseDown(e, n.id)}>
                <div className="node-port in" />
                <div className="node-header">
                  <div className={`node-dot ${n.dot}`} />
                  <div className="node-label">{n.label}</div>
                </div>
                <div className="node-text">{n.text}</div>
                <div className="node-port out" />
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 16, right: 16, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "var(--text-muted)" }}>
            🖱️ درگ برای حرکت دادن نودها
          </div>
        </div>

        <div className="builder-props">
          <div className="card-title">
            {selNode ? `✏️ ${selNode.label}` : "⚙️ تنظیمات"}
          </div>
          {selNode ? (
            <>
              <div className="form-group">
                <label className="form-label">عنوان نود</label>
                <input className="form-input" defaultValue={selNode.label} />
              </div>
              <div className="form-group">
                <label className="form-label">محتوا / پیام</label>
                <textarea className="form-input form-textarea" defaultValue={selNode.text} />
              </div>
              {selNode.type === "condition" && (
                <div className="form-group">
                  <label className="form-label">نوع شرط</label>
                  <select className="form-input form-select">
                    <option>عضویت کاربر</option>
                    <option>مقدار متغیر</option>
                    <option>زمان</option>
                    <option>پاسخ کاربر</option>
                  </select>
                </div>
              )}
              {selNode.type === "api" && (
                <>
                  <div className="form-group">
                    <label className="form-label">آدرس API</label>
                    <input className="form-input" placeholder="https://api.example.com/..." style={{ fontFamily: "monospace", fontSize: 12 }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">متد</label>
                    <select className="form-input form-select">
                      <option>GET</option><option>POST</option><option>PUT</option>
                    </select>
                  </div>
                </>
              )}
              <button className="topbar-btn btn-primary" style={{ width: "100%", marginTop: 8 }}>اعمال تغییرات</button>
              <button className="topbar-btn btn-danger" style={{ width: "100%", marginTop: 8, fontSize: 13 }}>حذف نود</button>
            </>
          ) : (
            <div style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.8 }}>
              روی یک نود کلیک کنید تا تنظیمات آن را ببینید.
              <br/><br/>
              می‌توانید نودها را:<br/>
              • درگ کنید<br/>
              • اتصال دهید<br/>
              • ویرایش کنید<br/>
              • حذف کنید
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AnalyticsPage() {
  const bigChartData = [30,45,35,60,50,75,65,80,60,90,78,95,70,88,82,95];
  return (
    <div>
      <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, marginBottom: 20 }}>📈 آنالیتیکس</div>
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {[
          ["پیام‌های امروز", "3,241", "cyan", "+18%"],
          ["کاربر جدید", "142", "purple", "+7%"],
          ["نرخ پاسخ", "98.2%", "green", "+0.3%"],
          ["متوسط جلسه", "4م 23ث", "yellow", "-2%"],
        ].map(([l, v, c, ch]) => (
          <div key={l} className={`stat-card ${c}`}>
            <div className="stat-label">{l}</div>
            <div className={`stat-value ${c}`}>{v}</div>
            <div className="stat-change">{ch}</div>
          </div>
        ))}
      </div>

      <div className="analytics-grid">
        <div className="card">
          <div className="card-title">💬 پیام‌ها (۱۶ روز اخیر)</div>
          <div className="chart-placeholder" style={{ height: 180 }}>
            {bigChartData.map((v, i) => (
              <div key={i} className="chart-bar" style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title">🔥 محبوب‌ترین دستورات</div>
          {[
            { cmd: "/start", count: 2341, pct: 100 },
            { cmd: "/shop", count: 1820, pct: 78 },
            { cmd: "/help", count: 890, pct: 38 },
            { cmd: "/order", count: 654, pct: 28 },
            { cmd: "/status", count: 421, pct: 18 },
          ].map(({ cmd, count, pct }) => (
            <div key={cmd} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontFamily: "Space Mono", color: "var(--accent)" }}>{cmd}</span>
                <span style={{ color: "var(--text-muted)" }}>{count.toLocaleString()}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 20 }}>
        <div className="card-title">👥 کاربران جدید امروز</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>کاربر</th><th>ربات</th><th>زمان عضویت</th><th>تعداد پیام</th><th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["@ali_dev", "فروشگاه دیجیتال", "۲ ساعت پیش", 14, "active"],
              ["@sara_x", "ربات GPT", "۳ ساعت پیش", 32, "active"],
              ["@m.hosseini", "پشتیبانی ۲۴ساعته", "۵ ساعت پیش", 7, "active"],
              ["@nikoo99", "فروشگاه دیجیتال", "۶ ساعت پیش", 21, "active"],
              ["@test_user", "نظرسنجی", "۸ ساعت پیش", 3, "stopped"],
            ].map(([u, b, t, m, s]) => (
              <tr key={u}>
                <td style={{ fontFamily: "Space Mono", fontSize: 12, color: "var(--accent)" }}>{u}</td>
                <td>{b}</td>
                <td style={{ color: "var(--text-muted)" }}>{t}</td>
                <td>{m}</td>
                <td><span className={`bot-status status-${s}`}>{s === "active" ? "فعال" : "غیرفعال"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22 }}>👥 مدیریت کاربران</div>
        <div style={{ display: "flex", gap: 10 }}>
          <input className="form-input" placeholder="🔍 جستجو..." style={{ width: 200 }} />
          <button className="topbar-btn btn-ghost">خروجی Excel</button>
          <button className="topbar-btn btn-primary">ارسال پیام گروهی</button>
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3,1fr)", marginBottom: 20 }}>
        <div className="stat-card purple">
          <div className="stat-label">کل کاربران</div>
          <div className="stat-value purple">15,857</div>
        </div>
        <div className="stat-card green">
          <div className="stat-label">کاربران فعال</div>
          <div className="stat-value green">11,204</div>
        </div>
        <div className="stat-card cyan">
          <div className="stat-label">مسدود شده</div>
          <div className="stat-value cyan">43</div>
        </div>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>کاربر تلگرام</th><th>نام</th><th>ربات</th><th>عضویت</th><th>پیام</th><th>وضعیت</th><th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {[
              { u: "@ali_dev", name: "علی احمدی", bot: "فروشگاه", date: "۱۴۰۳/۰۱/۱۵", msgs: 214, status: "active" },
              { u: "@sara_x", name: "سارا رضایی", bot: "ربات GPT", date: "۱۴۰۳/۰۲/۰۵", msgs: 892, status: "active" },
              { u: "@hosseini.m", name: "محمد حسینی", bot: "پشتیبانی", date: "۱۴۰۳/۰۲/۱۸", msgs: 45, status: "active" },
              { u: "@nikoo99", name: "نیکو ف.", bot: "فروشگاه", date: "۱۴۰۳/۰۳/۰۲", msgs: 321, status: "active" },
              { u: "@spam_bot", name: "—", bot: "فروشگاه", date: "۱۴۰۳/۰۳/۰۷", msgs: 4521, status: "blocked" },
              { u: "@maryam.k", name: "مریم کریمی", bot: "آموزشی", date: "۱۴۰۳/۰۳/۱۲", msgs: 178, status: "active" },
            ].map(r => (
              <tr key={r.u}>
                <td style={{ fontFamily: "Space Mono", fontSize: 12, color: "var(--accent)" }}>{r.u}</td>
                <td>{r.name}</td>
                <td><span className="tag tag-cyan">{r.bot}</span></td>
                <td style={{ color: "var(--text-muted)", fontSize: 12 }}>{r.date}</td>
                <td style={{ fontFamily: "Space Mono", fontSize: 12 }}>{r.msgs}</td>
                <td>
                  <span className={r.status === "active" ? "bot-status status-active" : "bot-status status-stopped"}>
                    {r.status === "active" ? "فعال" : "مسدود"}
                  </span>
                </td>
                <td>
                  <button className="topbar-btn btn-ghost" style={{ fontSize: 11, padding: "4px 8px" }}>💬</button>
                  <button className="topbar-btn btn-danger" style={{ fontSize: 11, padding: "4px 8px", marginLeft: 4 }}>🚫</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PlansPage() {
  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 28, marginBottom: 8 }}>💎 پلن‌های اشتراک</div>
        <div style={{ color: "var(--text-muted)", fontSize: 14 }}>برای هر مقیاس کسب‌وکاری گزینه مناسب وجود دارد</div>
      </div>
      <div className="plans-grid">
        {[
          { name: "رایگان", price: "0", period: "ماهانه", desc: "مناسب برای آزمایش و یادگیری", featured: false, features: [
            ["2 ربات", true], ["500 کاربر", true], ["پشتیبانی پایه", true], ["سازنده گرافیکی", true],
            ["اتصال API", false], ["هوش مصنوعی", false], ["پشتیبانی اولویت‌دار", false],
          ]},
          { name: "حرفه‌ای", price: "۱۹۹,۰۰۰", period: "ماهانه (تومان)", desc: "ایده‌آل برای کسب‌وکارهای در حال رشد", featured: true, features: [
            ["۲۰ ربات", true], ["۱۰,۰۰۰ کاربر", true], ["پشتیبانی ۲۴ساعته", true], ["سازنده گرافیکی پیشرفته", true],
            ["اتصال API", true], ["هوش مصنوعی پایه", true], ["پشتیبانی اولویت‌دار", false],
          ]},
          { name: "سازمانی", price: "۴۹۹,۰۰۰", period: "ماهانه (تومان)", desc: "برای سازمان‌ها و پلتفرم‌های بزرگ", featured: false, features: [
            ["نامحدود ربات", true], ["کاربران نامحدود", true], ["پشتیبانی اختصاصی", true], ["تمام امکانات", true],
            ["اتصال API نامحدود", true], ["هوش مصنوعی پیشرفته", true], ["White-label", true],
          ]},
        ].map(plan => (
          <div key={plan.name} className={`plan-card ${plan.featured ? "featured" : ""}`}>
            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">{plan.price}</div>
            <div className="plan-period">{plan.period}</div>
            <div className="plan-desc">{plan.desc}</div>
            {plan.features.map(([f, ok]) => (
              <div key={f} className="plan-feature">
                <span className={ok ? "check" : "cross"}>{ok ? "✓" : "✗"}</span> {f}
              </div>
            ))}
            <button className="topbar-btn btn-primary" style={{ width: "100%", marginTop: 20 }}>
              {plan.name === "رایگان" ? "شروع رایگان" : "انتخاب پلن"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPage() {
  const logs = [
    { time: "14:32:01", level: "info", msg: "ربات @shopbot راه‌اندازی شد" },
    { time: "14:29:45", level: "warn", msg: "تلاش ناموفق ورود به پنل — IP: 45.67.x.x" },
    { time: "14:21:18", level: "info", msg: "کاربر جدید ثبت‌نام کرد: @ali_dev" },
    { time: "14:15:33", level: "error", msg: "خطا در ارتباط با API تلگرام: timeout" },
    { time: "14:10:00", level: "info", msg: "پرداخت موفق — پلن حرفه‌ای: ۱۹۹,۰۰۰ تومان" },
    { time: "14:05:44", level: "warn", msg: "ربات @ai_bot نزدیک به حد مجاز پیام" },
  ];
  return (
    <div>
      <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, marginBottom: 20 }}>🔧 پنل مدیریت سیستم</div>
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {[
          ["کل کاربران پلتفرم", "1,247", "cyan"],
          ["ربات‌های فعال", "89", "green"],
          ["درآمد این ماه", "₮14.2M", "yellow"],
          ["مشکلات باز", "3", "purple"],
        ].map(([l, v, c]) => (
          <div key={l} className={`stat-card ${c}`}>
            <div className="stat-label">{l}</div>
            <div className={`stat-value ${c}`}>{v}</div>
          </div>
        ))}
      </div>

      <div className="admin-grid">
        <div className="card">
          <div className="card-title">📋 لاگ‌های سیستم (Real-time)</div>
          {logs.map((l, i) => (
            <div key={i} className="log-item">
              <div className={`log-dot ${l.level}`} />
              <div style={{ flex: 1, fontSize: 13 }}>{l.msg}</div>
              <div className="log-time">{l.time}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card">
            <div className="card-title">💾 منابع سرور</div>
            {[
              ["CPU", "34%", 34],
              ["RAM", "61%", 61],
              ["Storage", "45%", 45],
              ["Network", "22%", 22],
            ].map(([n, v, p]) => (
              <div key={n} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                  <span>{n}</span><span style={{ fontFamily: "Space Mono", color: "var(--accent)" }}>{v}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${p}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-title">⚙️ عملیات سریع</div>
            {[
              ["🔄 ریستارت همه ربات‌ها", "warn"],
              ["🗑️ پاک کردن کش", "ghost"],
              ["📦 بک‌آپ دیتابیس", "ghost"],
              ["🔒 قفل سیستم", "danger"],
            ].map(([label, type]) => (
              <button key={label} className={`topbar-btn btn-${type}`}
                style={{ display: "block", width: "100%", marginBottom: 8, textAlign: "right" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MessagesPage() {
  return (
    <div>
      <div style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 22, marginBottom: 20 }}>💬 مدیریت پیام‌ها</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, height: "70vh" }}>
        <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div className="card-title">گفتگوها</div>
          <input className="form-input" placeholder="🔍 جستجو..." style={{ marginBottom: 12 }} />
          <div style={{ flex: 1, overflowY: "auto" }}>
            {[
              { u: "@ali_dev", msg: "سلام، وضعیت سفارشم چیه؟", time: "الان", unread: 2 },
              { u: "@sara_x", msg: "ممنون از راهنمایی‌تون", time: "۵ دقیقه", unread: 0 },
              { u: "@hosseini.m", msg: "این محصول موجوده؟", time: "۱۲ دقیقه", unread: 1 },
              { u: "@maryam.k", msg: "درس جدید آپلود شد؟", time: "۲۳ دقیقه", unread: 0 },
              { u: "@reza.t", msg: "چطور پرداخت کنم؟", time: "۴۵ دقیقه", unread: 3 },
            ].map(c => (
              <div key={c.u} style={{ display: "flex", gap: 10, padding: "12px 8px", borderBottom: "1px solid var(--border)", cursor: "pointer", borderRadius: 8 }}>
                <div className="avatar">{c.u[1].toUpperCase()}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{c.u}</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{c.msg}</div>
                </div>
                {c.unread > 0 && <div style={{ background: "var(--accent)", color: "#000", borderRadius: "50%", width: 18, height: 18, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.unread}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 16, borderBottom: "1px solid var(--border)", marginBottom: 16 }}>
            <div className="avatar">A</div>
            <div>
              <div style={{ fontWeight: 700 }}>@ali_dev</div>
              <div style={{ fontSize: 12, color: "var(--accent3)" }}>● آنلاین</div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { from: "user", msg: "سلام! می‌خوام سفارش بدم", time: "14:20" },
              { from: "bot", msg: "سلام! خوش اومدید 👋 لطفاً محصول مورد نظرتون رو انتخاب کنید", time: "14:20" },
              { from: "user", msg: "محصول A رو می‌خوام", time: "14:21" },
              { from: "bot", msg: "قیمت: ۱۵۰,۰۰۰ تومان — برای تأیید سفارش روی دکمه زیر کلیک کنید ✅", time: "14:21" },
              { from: "user", msg: "سلام، وضعیت سفارشم چیه؟", time: "14:32" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "bot" ? "flex-start" : "flex-end" }}>
                <div style={{ maxWidth: "70%", padding: "10px 14px", borderRadius: 12, fontSize: 13,
                  background: m.from === "bot" ? "var(--surface2)" : "rgba(0,212,255,0.15)",
                  border: `1px solid ${m.from === "bot" ? "var(--border)" : "rgba(0,212,255,0.3)"}` }}>
                  <div>{m.msg}</div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4, textAlign: "right" }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <input className="form-input" placeholder="پاسخ دستی..." style={{ flex: 1 }} />
            <button className="topbar-btn btn-primary">ارسال</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [bots, setBots] = useState(SAMPLE_BOTS);
  const [showCreate, setShowCreate] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = msg => setToast(msg);

  const handleSaveBot = (name, type) => {
    const newBot = {
      id: bots.length + 1, name, type, emoji: "🤖", status: "active",
      users: 0, msgs: "0", color: "linear-gradient(135deg,#00d4ff22,#00d4ff11)"
    };
    setBots(prev => [...prev, newBot]);
    showToast(`ربات "${name}" با موفقیت ساخته شد!`);
  };

  const titles = {
    dashboard: "داشبورد اصلی", bots: "ربات‌های من", builder: "سازنده گرافیکی",
    analytics: "آنالیتیکس", users: "کاربران", messages: "پیام‌ها",
    plans: "پلن‌ها", admin: "پنل مدیریت",
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app" dir="rtl">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">⚡</div>
            <div className="logo-text">BotForge</div>
          </div>
          <nav className="sidebar-nav">
            {NAV_ITEMS.map((item, i) =>
              item.section ? (
                <div key={i} className="nav-section-title">{item.section}</div>
              ) : (
                <div key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`}
                  onClick={() => setPage(item.id)}>
                  <span className="icon">{item.icon}</span>
                  {item.label}
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </div>
              )
            )}
          </nav>
          <div className="sidebar-footer">
            <div className="user-card">
              <div className="avatar">ع</div>
              <div className="user-info">
                <div className="user-name">علی احمدی</div>
                <div className="user-plan">پلن حرفه‌ای 💎</div>
              </div>
              <span style={{ fontSize: 12, color: "var(--text-muted)" }}>⚙️</span>
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div className="topbar-title">{titles[page] || ""}</div>
            {(page === "bots" || page === "dashboard") && (
              <button className="topbar-btn btn-primary" onClick={() => setShowCreate(true)}>
                + ربات جدید
              </button>
            )}
            <div style={{ width: 32, height: 32, background: "var(--surface2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>🔔</div>
          </div>

          {page !== "builder" ? (
            <div className="content">
              {page === "dashboard" && <Dashboard bots={bots} setPage={setPage} />}
              {page === "bots" && <BotsPage bots={bots} onNew={() => setShowCreate(true)} />}
              {page === "analytics" && <AnalyticsPage />}
              {page === "users" && <UsersPage />}
              {page === "messages" && <MessagesPage />}
              {page === "plans" && <PlansPage />}
              {page === "admin" && <AdminPage />}
            </div>
          ) : (
            <BuilderPage />
          )}
        </main>
      </div>

      {showCreate && (
        <CreateBotModal onClose={() => setShowCreate(false)} onSave={handleSaveBot} />
      )}

      {toast && <Toast msg={toast} onClose={() => setToast(null)} />}
    </>
  );
}
