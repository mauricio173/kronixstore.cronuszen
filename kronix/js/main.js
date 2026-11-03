document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : '☰';
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = '☰';
  }));
  document.querySelectorAll('[data-product]').forEach(link => {
    link.addEventListener('click', () => {
      try { sessionStorage.setItem('kronix_selected_product', link.dataset.product); } catch (_) {}
    });
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  // Revela a seção de jogos suavemente quando ela entra na área visível.
  const gameSection = document.querySelector('.game-section');
  if (gameSection && 'IntersectionObserver' in window) {
    gameSection.classList.add('game-reveal-ready');
    const gameObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('game-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    gameObserver.observe(gameSection);
  }
  // Mantém o contador sincronizado caso a loja já grave itens no carrinho.
  try {
    const cart = JSON.parse(localStorage.getItem('kronix_cart') || '[]');
    document.getElementById('cart-count').textContent = Array.isArray(cart)
      ? cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0) : 0;
  } catch (_) {}
});

/* Entrada suave da seção de jogos */
.game-reveal-ready .game-copy,
.game-reveal-ready .game-art {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .65s ease, transform .65s ease;
}
.game-reveal-ready .game-art { transition-delay: .12s; }
.game-visible .game-copy,
.game-visible .game-art {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .game-reveal-ready .game-copy,
  .game-reveal-ready .game-art { transition: none; transform: none; }
}
