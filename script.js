"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const progressBar = document.getElementById("progressBar");
  const snowLayer = document.getElementById("snowLayer");
  const snowToggle = document.getElementById("snowToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const textSmaller = document.getElementById("textSmaller");
  const textLarger = document.getElementById("textLarger");
  const printPage = document.getElementById("printPage");

  const updateProgress = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    if (progressBar) progressBar.style.width = `${Math.min(progress, 100)}%`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  const createSnow = () => {
    if (!snowLayer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const flakeCount = window.innerWidth < 700 ? 20 : 42;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < flakeCount; i++) {
      const flake = document.createElement("span");
      flake.className = "snowflake";
      flake.textContent = i % 2 === 0 ? "✦" : "•";
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.animationDuration = `${10 + Math.random() * 12}s`;
      flake.style.animationDelay = `${Math.random() * -20}s`;
      flake.style.fontSize = `${8 + Math.random() * 12}px`;
      flake.style.opacity = `${0.3 + Math.random() * 0.7}`;
      fragment.appendChild(flake);
    }
    snowLayer.textContent = "";
    snowLayer.appendChild(fragment);
  };
  createSnow();

  if (snowToggle) {
    snowToggle.addEventListener("click", () => {
      const off = document.body.classList.toggle("no-snow");
      snowToggle.textContent = off ? "❄ Śnieg: wyłączony" : "❄ Śnieg: włączony";
      if (off && snowLayer) snowLayer.style.display = "none";
      else if (snowLayer) snowLayer.style.display = "block";
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  let size = 1;
  const applySize = () => document.documentElement.style.setProperty("--text-size", size.toFixed(2));
  if (textSmaller) {
    textSmaller.addEventListener("click", () => {
      size = Math.max(0.9, size - 0.08);
      applySize();
    });
  }
  if (textLarger) {
    textLarger.addEventListener("click", () => {
      size = Math.min(1.25, size + 0.08);
      applySize();
    });
  }
  if (printPage) {
    printPage.addEventListener("click", () => window.print());
  }
});
