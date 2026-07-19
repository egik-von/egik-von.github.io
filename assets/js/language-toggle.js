document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("language-toggle");
  const label = document.getElementById("language-toggle-label");
  const storageKey = "homepage-language";

  if (!button || !label) return;

  function applyLanguage(language) {
    const lang = language === "zh" ? "zh" : "en";

    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    // 切换中英文内容块
    document.querySelectorAll(".lang-block[data-lang]").forEach((element) => {
      element.hidden = element.dataset.lang !== lang;
    });

    // 替换中英文短文本
    document.querySelectorAll("[data-en][data-zh]").forEach((element) => {
      element.textContent =
        lang === "zh" ? element.dataset.zh : element.dataset.en;
    });

    // 中文模式使用 Bilibili，英文模式使用 YouTube
    document
      .querySelectorAll(".platform-link[data-youtube][data-bilibili]")
      .forEach((link) => {
        link.href =
          lang === "zh" ? link.dataset.bilibili : link.dataset.youtube;
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

  const savedLanguage = localStorage.getItem(storageKey);

  const browserLanguage = navigator.language
    .toLowerCase()
    .startsWith("zh")
    ? "zh"
    : "en";

  applyLanguage(savedLanguage || browserLanguage);

  button.addEventListener("click", () => {
    const currentLanguage =
      document.documentElement.lang === "zh-CN" ? "zh" : "en";

    applyLanguage(currentLanguage === "zh" ? "en" : "zh");
  });
});
