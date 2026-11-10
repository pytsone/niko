"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.querySelector("#progressBar");
  const snowLayer = document.querySelector("#snowLayer");
  const snowToggle = document.querySelector("#snowToggle");
  const menuToggle = document.querySelector("#menuToggle");
  const navLinks = document.querySelector("#navLinks");
  const textLarger = document.querySelector("#textLarger");
  const textSmaller = document.querySelector("#textSmaller");
  const printPage = document.querySelector("#printPage");

  const updateReadingProgress = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${Math.min(progress, 100)}%`;
  };
  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  window.addEventListener("resize", updateReadingProgress);
  updateReadingProgress();

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const createSnow = () => {
    if (!snowLayer || prefersReducedMotion) return;
    const count = window.innerWidth < 650 ? 22 : 42;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < count; i += 1) {
      const flake = document.createElement("span");
      flake.className = "snowflake";
      flake.textContent = Math.random() > 0.5 ? "•" : "✦";
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.fontSize = `${5 + Math.random() * 9}px`;
      flake.style.animationDuration = `${7 + Math.random() * 12}s`;
      flake.style.animationDelay = `${Math.random() * -18}s`;
      flake.style.opacity = `${0.25 + Math.random() * 0.65}`;
      fragment.appendChild(flake);
    }
    snowLayer.replaceChildren(fragment);
  };
  createSnow();

  if (snowToggle) {
    snowToggle.addEventListener("click", () => {
      const snowIsOff = document.body.classList.toggle("no-snow");
      snowToggle.setAttribute("aria-pressed", String(!snowIsOff));
      snowToggle.textContent = snowIsOff ? "❄ Śnieg: wyłączony" : "❄ Śnieg: włączony";
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });
  }

  let textScale = 1;
  const minScale = 0.9;
  const maxScale = 1.25;
  const step = 0.1;
  const applyTextScale = () => document.documentElement.style.setProperty("--text-size", textScale.toFixed(2));
  if (textLarger) {
    textLarger.addEventListener("click", () => {
      textScale = Math.min(maxScale, textScale + step);
      applyTextScale();
    });
  }
  if (textSmaller) {
    textSmaller.addEventListener("click", () => {
      textScale = Math.max(minScale, textScale - step);
      applyTextScale();
    });
  }
  if (printPage) printPage.addEventListener("click", () => window.print());
});
