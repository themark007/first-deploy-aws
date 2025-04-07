window.onload = () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.2}s`;
    el.classList.add('opacity-0');
    setTimeout(() => el.classList.remove('opacity-0'), i * 200);
  });
};
