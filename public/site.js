// theme-toggle.js

// Function to toggle between light and dark mode
function toggleTheme() {
  const body = document.body;

  // Check if dark mode is enabled
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

// Check user's preferred theme from localStorage
const userPrefersDark = localStorage.getItem("theme") === "dark";

// Apply user's preferred theme
if (userPrefersDark) {
  document.body.classList.add("dark");
}

// Event listener for the theme toggle button
const themeToggleBtn = document.getElementById("theme-toggle-btn");
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", toggleTheme);
}
