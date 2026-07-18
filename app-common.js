(function(window, document){
  var STORE_KEY = "npml-guitar-auth";
  var THEME_KEY = "npml-guitar-theme";
  var MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
  var LOGIN_PAGE = "login.html";
  var ALLOWED_PAGES = {
    "index.html": true,
    "cronograma.html": true,
    "fundamentos.html": true,
    "diagramas.html": true,
    "acordes.html": true,
    "login.html": true
  };

  function currentPage(){
    return location.pathname.split("/").pop() || "index.html";
  }

  function getSavedTheme(){
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch(e) {}
    return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme){
    document.documentElement.dataset.theme = theme;
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.setAttribute("aria-label", theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro");
  }

  function initThemeEarly(){
    applyTheme(getSavedTheme());
  }

  function initThemeToggle(){
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    applyTheme(document.documentElement.dataset.theme || getSavedTheme());
    btn.addEventListener("click", function(){
      var next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem(THEME_KEY, next); } catch(e) {}
      applyTheme(next);
    });
  }

  function isAuthValid(){
    try {
      var saved = JSON.parse(localStorage.getItem(STORE_KEY) || "null");
      return !!(saved && saved.ok && (Date.now() - saved.ts) < MAX_AGE_MS);
    } catch(e) {
      return false;
    }
  }

  function getSafeNextFromQuery(){
    var params = new URLSearchParams(location.search);
    var next = params.get("next") || "index.html";
    return ALLOWED_PAGES[next] && next !== LOGIN_PAGE ? next : "index.html";
  }

  function enforceAuthGate(){
    var page = currentPage();
    if (page === LOGIN_PAGE) return;
    if (!ALLOWED_PAGES[page]) return;
    if (isAuthValid()) return;
    location.replace(LOGIN_PAGE + "?next=" + encodeURIComponent(page));
  }

  function initLogout(){
    var link = document.getElementById("logout");
    if (!link) return;
    link.addEventListener("click", function(ev){
      ev.preventDefault();
      try { localStorage.removeItem(STORE_KEY); } catch(e) {}
      location.href = LOGIN_PAGE;
    });
  }

  function initPageUi(){
    initThemeToggle();
    initLogout();
  }

  // Execute immediately in <head> for auth gate + initial theme.
  initThemeEarly();
  enforceAuthGate();

  window.NpmlGuitarApp = {
    STORE_KEY: STORE_KEY,
    MAX_AGE_MS: MAX_AGE_MS,
    initThemeToggle: initThemeToggle,
    initLogout: initLogout,
    initPageUi: initPageUi,
    isAuthValid: isAuthValid,
    getSafeNextFromQuery: getSafeNextFromQuery
  };
})(window, document);
