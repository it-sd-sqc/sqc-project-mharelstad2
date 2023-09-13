function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark');
  
  // Save the user's preference in local storage
  const isDarkMode = body.classList.contains('dark');
  localStorage.setItem('darkMode', isDarkMode);
}

/
/ Check if the user has a dark mode preference in local storage
const storedDarkMode = localStorage.getItem('darkMode');

// Set the initial mode based on the user's preference or system preference
if (storedDarkMode === 'true' || (!storedDarkMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  toggleDarkMode();
}
