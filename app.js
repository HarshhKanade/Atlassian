const body = document.body;
const themeToggle = document.getElementById('themeToggle');

const savedTheme = localStorage.getItem('docs-theme');
if (savedTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
  themeToggle.innerHTML = '<span class="toggle-icon">☀️</span>';
}

themeToggle.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';
  body.setAttribute('data-theme', nextTheme);
  localStorage.setItem('docs-theme', nextTheme);
  themeToggle.innerHTML = nextTheme === 'dark' ? '<span class="toggle-icon">☀️</span>' : '<span class="toggle-icon">🌙</span>';
});

document.querySelectorAll('.copy-btn').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = button.closest('.code-block').querySelector('code');
    const text = code.innerText;

    try {
      await navigator.clipboard.writeText(text);
      const originalText = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => {
        button.textContent = originalText;
      }, 1200);
    } catch (error) {
      button.textContent = 'Copy failed';
      setTimeout(() => {
        button.textContent = 'Copy';
      }, 1200);
    }
  });
});
