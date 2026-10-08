// WhatsApp number in international format without "+" or spaces, e.g. "9665XXXXXXXX".
// While empty, the WhatsApp buttons stay hidden.
const WHATSAPP_NUMBER = '966533985587';
const WHATSAPP_MESSAGE = {
  ar: 'مرحبًا Webora، أريد موقعًا لمشروعي.',
  en: "Hello Webora, I'd like a website for my project.",
};

// English copy, keyed by data-i18n. The Arabic copy is the page's own markup.
const EN = {
  'nav.services': 'Services', 'nav.process': 'How we work', 'nav.work': 'Our work', 'nav.faq': 'FAQ', 'nav.cta': 'Start your project',
  'hero.title': 'Get your business <span class="grad">online</span>',
  'hero.lead': 'We design and build professional websites and online stores that help customers find you easily and trust you from the first visit.',
  'hero.cta': 'Start your project now', 'hero.work': 'See our work',
  'tag.design': 'Design', 'tag.dev': 'Development', 'tag.stores': 'Online stores',
  'badge.ready': 'Ready ✓', 'badge.fast': 'Fast & responsive',
  'services.title': 'Everything your business needs to show up online',
  'services.sub': 'From the idea to a working site that brings in customers.',
  's1.title': 'Web design', 's1.text': 'Modern interfaces that reflect your brand and get your message across clearly.',
  's1.a': 'A design tailored to your brand and colors', 's1.b': 'Responsive on mobile and tablet', 's1.c': 'A clear, easy user experience',
  's2.title': 'Web development', 's2.text': 'We turn the design into a fast, stable site that works on every device.',
  's2.a': 'Fast performance and light loading', 's2.b': 'Basic search engine setup', 's2.c': 'Contact forms and WhatsApp integration',
  's3.title': 'Online stores', 's3.text': "A store that's ready to sell, from product display to receiving the order.",
  's3.a': 'Organized products and categories', 's3.b': 'Cart and smooth checkout', 's3.c': 'Easy product and order management',
  'process.title': 'Four steps from idea to launch',
  'p1.title': 'We learn your business', 'p1.text': 'We get to know your business, your audience and what you want from the site.',
  'p2.title': 'We design', 'p2.text': 'We prepare a design that expresses your identity and show it to you before building.',
  'p3.title': 'We build', 'p3.text': 'We build the site and test it on mobile and desktop.',
  'p4.title': 'We launch', 'p4.text': 'We publish the site and hand it over ready to work.',
  'work.title': 'Projects we delivered', 'work.visit': 'Visit site →',
  'w1.title': 'Real estate website', 'w1.text': 'A professional site for a real estate company showing its services and properties, with consultation booking.',
  'w2.title': 'ElMaha Travel', 'w2.text': 'A site for a travel company showing destinations and services with trip booking, in Arabic and English.',
  'faq.title': 'Questions we hear before starting',
  'q1.q': 'What do I need to get started?', 'q1.a': "An idea of your business, plus your logo and photos if you have them. We'll sort out the rest with you step by step.",
  'q2.q': 'Will the site work on mobile?', 'q2.a': 'Yes. Every site we design is responsive and displays correctly on mobile, tablet and desktop.',
  'q3.q': 'Can I order a complete online store?', 'q3.a': 'Yes. We build online stores with product listings, a shopping cart and checkout.',
  'q4.q': 'How much does a site cost and how long does it take?', 'q4.a': 'It depends on the size of the project and its requirements. Contact us and tell us about your project so we can send you a suitable offer.',
  'cta.title': 'Ready to get your business <span class="grad">online</span>?',
  'cta.text': "Tell us about your project and we'll get back to you with the next step.",
  'cta.whatsapp': 'Chat on WhatsApp', 'cta.instagram': 'Instagram', 'cta.tiktok': 'TikTok',
  'footer.tag': 'Get your business online',
};
const META = {
  ar: { title: document.title, description: document.querySelector('meta[name="description"]').content },
  en: { title: 'Webora | Professional websites & online stores', description: 'Webora — we design and build professional websites and online stores for your business. Get your business online.' },
};

document.documentElement.classList.add('js');
document.getElementById('year').textContent = new Date().getFullYear();

const translatable = [...document.querySelectorAll('[data-i18n]')];
const AR = {};
translatable.forEach(el => { AR[el.dataset.i18n] = el.innerHTML; });
const langToggle = document.getElementById('langToggle');

function setLang(lang) {
  const dict = lang === 'en' ? EN : AR;
  translatable.forEach(el => { el.innerHTML = dict[el.dataset.i18n] ?? AR[el.dataset.i18n]; });
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'en' ? 'ltr' : 'rtl';
  document.title = META[lang].title;
  document.querySelector('meta[name="description"]').content = META[lang].description;
  langToggle.textContent = lang === 'en' ? 'عربي' : 'EN';
  if (WHATSAPP_NUMBER) {
    document.querySelectorAll('[data-whatsapp]').forEach(a => {
      a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE[lang])}`;
      a.hidden = false;
    });
  }
  try { localStorage.setItem('lang', lang); } catch {}
}
function savedLang() {
  if (new URLSearchParams(location.search).get('lang') === 'en') return 'en';
  try { return localStorage.getItem('lang') === 'en' ? 'en' : 'ar'; } catch { return 'ar'; }
}
setLang(savedLang());
langToggle.addEventListener('click', () => setLang(document.documentElement.lang === 'en' ? 'ar' : 'en'));

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
