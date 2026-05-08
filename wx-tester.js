/* ═══════════════════════════════════════
   wx-tester.js — Weather Theme Tester
   استدعيه في آخر الـ index.html هكذا:
   <script src="wx-tester.js"></script>
═══════════════════════════════════════ */

(function () {

  /* ── الثيمات المتاحة ── */
  const THEMES = [
    { id: 'night',   icon: '✦', label: 'Night',   color: '#9b7fd4' },
    { id: 'rain',    icon: '◦', label: 'Rain',    color: '#6ab0e0' },
    { id: 'winter',  icon: '❄', label: 'Winter',  color: '#a8d8f0' },
    { id: 'default', icon: '✿', label: 'Default', color: '#c9a84c' },
  ];

  /* ── تطبيق الثيم وإعادة تحميل الصفحة ── */
  function setTheme(id) {
    localStorage.setItem('wx_state_v2', JSON.stringify({ theme: id, ts: Date.now() }));
    location.reload();
  }

  /* ── بناء الـ UI ── */
  function buildUI() {
    /* Container */
    const panel = document.createElement('div');
    panel.id = 'wx-tester-panel';
    panel.style.cssText = `
      position: fixed;
      bottom: 90px;
      left: 16px;
      z-index: 99999;
      display: flex;
      flex-direction: column;
      gap: 8px;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity .35s ease, transform .35s ease;
      pointer-events: none;
    `;

    /* زرار كل ثيم */
    THEMES.forEach(t => {
      const btn = document.createElement('button');
      btn.textContent = t.icon + '  ' + t.label;
      btn.style.cssText = `
        background: rgba(10,8,13,0.88);
        border: 1px solid ${t.color};
        color: ${t.color};
        font-family: 'Cormorant Garamond', serif;
        font-size: 12px;
        letter-spacing: 2px;
        padding: 8px 16px;
        border-radius: 20px;
        cursor: pointer;
        backdrop-filter: blur(10px);
        box-shadow: 0 0 14px ${t.color}33;
        transition: background .25s, transform .2s, box-shadow .25s;
        white-space: nowrap;
        text-align: left;
      `;
      btn.addEventListener('pointerover', () => {
        btn.style.background = t.color;
        btn.style.color = '#0a080d';
        btn.style.transform = 'scale(1.05)';
        btn.style.boxShadow = `0 0 22px ${t.color}88`;
      });
      btn.addEventListener('pointerout', () => {
        btn.style.background = 'rgba(10,8,13,0.88)';
        btn.style.color = t.color;
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = `0 0 14px ${t.color}33`;
      });
      btn.addEventListener('click', () => setTheme(t.id));
      panel.appendChild(btn);
    });

    /* زرار التبديل (FAB) */
    const fab = document.createElement('button');
    fab.id = 'wx-tester-fab';
    fab.textContent = '🌤';
    fab.title = 'Weather Tester';
    fab.style.cssText = `
      position: fixed;
      bottom: 32px;
      left: 16px;
      z-index: 99999;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background: rgba(10,8,13,0.88);
      border: 1px solid rgba(201,168,76,0.5);
      color: #c9a84c;
      font-size: 20px;
      cursor: pointer;
      backdrop-filter: blur(10px);
      box-shadow: 0 0 18px rgba(201,168,76,0.2);
      transition: transform .3s ease, box-shadow .3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    let open = false;

    fab.addEventListener('click', () => {
      open = !open;
      panel.style.opacity        = open ? '1'      : '0';
      panel.style.transform      = open ? 'translateY(0)' : 'translateY(12px)';
      panel.style.pointerEvents  = open ? 'all'    : 'none';
      fab.style.transform        = open ? 'rotate(20deg) scale(1.1)' : '';
      fab.style.boxShadow        = open
        ? '0 0 28px rgba(201,168,76,0.5)'
        : '0 0 18px rgba(201,168,76,0.2)';
    });

    /* Active theme label على الـ FAB */
    try {
      const cached = JSON.parse(localStorage.getItem('wx_state_v2') || '{}');
      if (cached.theme) {
        const active = THEMES.find(t => t.id === cached.theme);
        if (active) fab.textContent = active.icon;
      }
    } catch (e) {}

    document.body.appendChild(panel);
    document.body.appendChild(fab);
  }

  /* ── شغّل بعد تحميل الصفحة ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildUI);
  } else {
    buildUI();
  }

})();
