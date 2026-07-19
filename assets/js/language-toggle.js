document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("language-toggle");
  const label = document.getElementById("language-toggle-label");

  if (!button || !label) return;

  const storageKey = "homepage-language";

  function applyLanguage(language) {
    const lang = language === "zh" ? "zh" : "en";

    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    document.querySelectorAll(".lang-block[data-lang]").forEach((element) => {
      element.hidden = element.dataset.lang !== lang;
    });

    document.querySelectorAll("[data-en][data-zh]").forEach((element) => {
      element.textContent =
        lang === "zh" ? element.dataset.zh : element.dataset.en;
    });

    label.textContent = lang === "zh" ? "EN" : "中文";

    button.title =
      lang === "zh" ? "Switch to English" : "切换为中文";

    button.setAttribute(
      "aria-label",
      lang === "zh" ? "Switch to English" : "切换为中文"
    );

    localStorage.setItem(storageKey, lang);
  }

  const savedLanguage = localStorage.getItem(storageKey) || "en";
  applyLanguage(savedLanguage);

  button.addEventListener("click", () => {
    const currentLanguage =
      document.documentElement.lang === "zh-CN" ? "zh" : "en";

    applyLanguage(currentLanguage === "zh" ? "en" : "zh");
  });
});
