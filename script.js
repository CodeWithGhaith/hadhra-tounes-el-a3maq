(() => {
  "use strict";

  // Dynamic copyright year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Toast helper
  const toast = document.getElementById("toast");
  let toastTimer;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  };

  // Clipboard fallback (works on older in-app browsers too)
  const copyLink = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (_) {
      const input = document.createElement("textarea");
      input.value = url;
      input.setAttribute("readonly", "");
      input.style.cssText = "position:fixed;opacity:0;";
      document.body.appendChild(input);
      input.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (_) { /* ignore */ }
      input.remove();
      return ok;
    }
  };

  // Share page
  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const data = {
        title: "حضرة تونس الأعماق",
        text: "نفحات من التراث الصوفي التونسي بقيادة الفنان والمنشد عبد الله الذوادي",
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(data);
          return;
        } catch (err) {
          if (err && err.name === "AbortError") return; // user cancelled
        }
      }

      const ok = await copyLink(data.url);
      showToast(ok ? "تم نسخ رابط الصفحة" : "تعذّر النسخ، يرجى نسخ الرابط يدويًا");
    });
  }
})();
