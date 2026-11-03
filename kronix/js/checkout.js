document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const requested = (params.get('product') || 'DS8 AI').trim();
  const catalog = window.KRONIX_PRODUCTS || {};
  const matchedName = Object.keys(catalog).find(name => name.toLowerCase() === requested.toLowerCase());
  const product = matchedName || requested;
  const data = matchedName ? catalog[matchedName] : null;
  const nameEl = document.getElementById('product-name');
  const priceEl = document.getElementById('product-price');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const warning = document.getElementById('price-warning');
  const submit = document.getElementById('checkout-submit');
  const form = document.getElementById('checkout-form');
  const message = document.getElementById('success-message');
  const money = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value / 100);

  nameEl.textContent = product;
  const validPrice = data && Number.isInteger(data.price) && data.price > 0;
  if (validPrice) {
    const formatted = money(data.price);
    priceEl.textContent = formatted;
    subtotalEl.textContent = formatted;
    totalEl.textContent = formatted;
    warning.textContent = 'Preço informado pela loja. O pagamento ainda depende da integração com um provedor seguro.';
    submit.disabled = false;
  } else {
    priceEl.textContent = 'Preço não definido';
    subtotalEl.textContent = '—';
    totalEl.textContent = '—';
    warning.textContent = matchedName ? 'Este produto ainda está sem preço cadastrado. A loja precisa definir o valor antes de aceitar pedidos.' : 'Produto não encontrado no catálogo. Volte à loja e selecione um produto válido.';
    submit.disabled = true;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!validPrice) return;
    if (!form.reportValidity()) return;
    const customer = document.getElementById('name').value.trim();
    message.hidden = false;
    message.textContent = `Obrigado, ${customer}! Sua solicitação sobre ${product}, no valor de ${money(data.price)}, foi validada nesta demonstração. Nenhum pagamento foi processado.`;
    message.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
