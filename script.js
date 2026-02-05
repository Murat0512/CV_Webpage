(function () {
  const root = document.documentElement;
  const btnTheme = document.getElementById("btnTheme");
  const btnPrint = document.getElementById("btnPrint");
  const btnCopyEmail = document.getElementById("btnCopyEmail");
  const emailLink = document.getElementById("emailLink");
  const toast = document.getElementById("toast");

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
  }

  function setTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      btnTheme?.setAttribute("aria-pressed", "true");
    } else {
      root.removeAttribute("data-theme");
      btnTheme?.setAttribute("aria-pressed", "false");
    }
    localStorage.setItem("cv_theme", theme);
  }

  // Load saved theme
  const saved = localStorage.getItem("cv_theme");
  if (saved === "light") setTheme("light");

  btnTheme?.addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    setTheme(isLight ? "dark" : "light");
    showToast(isLight ? "Dark theme enabled" : "Light theme enabled");
  });

  btnPrint?.addEventListener("click", () => {
    window.print();
  });

  btnCopyEmail?.addEventListener("click", async () => {
    const email = emailLink?.textContent?.trim() || "";
    if (!email) return;

    try {
      await navigator.clipboard.writeText(email);
      showToast("Email copied");
    } catch {
      // Fallback
      const tmp = document.createElement("textarea");
      tmp.value = email;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      document.body.removeChild(tmp);
      showToast("Email copied");
    }
  });
})();
