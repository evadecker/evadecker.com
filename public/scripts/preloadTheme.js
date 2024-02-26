function getUserPreference() {
  if (window.localStorage.getItem("theme")) {
    return window.localStorage.getItem("theme");
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const setTheme = () => {
  const userPreference = getUserPreference();

  if (userPreference === "light") document.body.classList.remove("dark");
  else document.body.classList.add("dark");

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme !== null)
    metaTheme.setAttribute(
      "content",
      userPreference === "dark" ? "#0D1512" : "#D6F1E3"
    );

  window.localStorage.setItem("theme", userPreference);
};

setTheme();
