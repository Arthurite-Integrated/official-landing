(function () {
  try {
    var stored = window.localStorage.getItem("theme");
    var mode = stored === "light" || stored === "dark" ? stored : "light";
    var root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    root.setAttribute("data-theme", mode);
    root.style.colorScheme = mode;
  } catch (e) {}
})();
