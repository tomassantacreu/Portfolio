const container = document.querySelector('.container');
const sections = document.querySelectorAll('.section');
const dotsContainer = document.querySelector('.scroll-dots');


// Generar los dots dinámicamente
sections.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.dataset.index = index;
  if (index === 0) dot.classList.add('active'); // primer dot activo
  dotsContainer.appendChild(dot);
});

// Seleccionar los dots ya creados
const dots = document.querySelectorAll('.scroll-dots span');

// Intersection Observer para detectar sección visible
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Array.from(sections).indexOf(entry.target);
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }
  });
}, {
  root: container,
  threshold: 0.6 // 60% de la sección visible
});

// Observar todas las secciones
sections.forEach(section => observer.observe(section));

// Click en dot para saltar a sección
dotsContainer.addEventListener('click', e => {
  if (e.target.tagName === 'SPAN') {
    const index = parseInt(e.target.dataset.index);
    sections[index].scrollIntoView({ behavior: 'smooth' });
  }
});