// WhatsApp number in international format without "+" or spaces, e.g. "9665XXXXXXXX".
// While empty, the WhatsApp button stays hidden.
const WHATSAPP_NUMBER = '966533985587';
const WHATSAPP_MESSAGE = 'مرحبًا Webora، أريد موقعًا لمشروعي.';

document.documentElement.classList.add('js');
document.getElementById('year').textContent = new Date().getFullYear();

const whatsappBtn = document.getElementById('whatsappBtn');
if (WHATSAPP_NUMBER) {
  whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  whatsappBtn.hidden = false;
}

const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
const setMenu = open => {
  links.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
};
toggle.addEventListener('click', () => setMenu(!links.classList.contains('is-open')));
links.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  }
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});
