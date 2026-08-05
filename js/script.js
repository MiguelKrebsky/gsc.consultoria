/* ==========================================================================
   GSC CONSULTORIA — Script Principal
   --------------------------------------------------------------------------
   Responsável por:
   01. Injeção de componentes reutilizáveis (Header, Footer, Banner CTA)
   02. Navbar — redução e blur ao rolar
   03. Menu mobile (drawer + backdrop)
   04. Inicialização do AOS (Animate On Scroll)
   05. Contadores animados
   06. Slider de depoimentos
   07. Filtro e pesquisa do blog
   08. Envio do formulário de contato
   09. Botão voltar ao topo
   ========================================================================== */

/* --------------------------------------------------------------------------
   00. Auxiliar — aguarda o DOM estar pronto
   -------------------------------------------------------------------------- */
(function () {
  'use strict';

  // Se o DOM ainda não carregou, aguarda o evento; caso contrário executa já.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    buildHeader();
    buildFooter();
    buildCtaBanner();

    initHeaderScroll();
    initMobileMenu();
    initAos();
    initCounters();
    initTestimonialSlider();
    initPostsFilters();
    initContactForm();
    initBackToTop();
  }

  /* ------------------------------------------------------------------------
     01. COMPONENTES REUTILIZÁVEIS
     Injetam header, footer e banner CTA em todos os "pages"
     a partir de um único modelo (evita código duplicado).
     A página ativa é detectada pelo atributo data-page do <body>.
     ------------------------------------------------------------------------ */
  function buildHeader() {
    var host = document.getElementById('site-header');
    if (!host) return;

    var page = (document.body && document.body.getAttribute('data-page')) || '';

    var links = [
      { key: 'home',     label: 'Home',          href: 'index.html' },
      { key: 'quem',     label: 'Quem Somos',    href: 'quem-somos.html' },
      { key: 'servicos', label: 'Serviços',      href: 'servicos.html' },
      { key: 'metodo',   label: 'Método',        href: 'metodo.html' },
      { key: 'time',     label: 'Time',          href: 'time.html' },
      { key: 'eventos',  label: 'Eventos',       href: 'eventos.html' },
      { key: 'contato',  label: 'Contato',       href: 'contato.html' }
    ];

    var navItems = links.map(function (item) {
      var active = item.key === page ? ' class="nav-link is-active"' : ' class="nav-link"';
      return '<li><a' + active + ' href="' + item.href + '" data-nav="' + item.key + '">' + item.label + '</a></li>';
    }).join('');

    host.innerHTML =
      '<div class="container">' +
        '<div class="header-inner">' +
          '<a href="index.html" class="brand" aria-label="GSC Consultoria de Investimentos — Início">' +
            '<span class="brand-mark">G</span>' +
            '<span class="brand-text">' +
              '<span class="brand-name">GS<em>C</em></span>' +
              '<span class="brand-sub">Consultoria</span>' +
            '</span>' +
          '</a>' +

          '<nav class="main-nav" id="main-nav" aria-label="Navegação principal">' +
            '<ul class="nav-list">' + navItems +
              '<li class="nav-cta"><a class="btn btn-gold" href="contato.html">Agendar uma conversa</a></li>' +
            '</ul>' +
          '</nav>' +

          '<button class="nav-toggle" id="nav-toggle" aria-label="Abrir menu" aria-expanded="false">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>';
  }

  function buildFooter() {
    var host = document.getElementById('site-footer');
    if (!host) return;

    host.innerHTML =
      '<div class="container">' +
        '<div class="footer-top">' +
          '<div class="row g-5">' +

            /* Marca + resumo + redes sociais */
            '<div class="col-lg-4 col-md-6">' +
              '<div class="footer-brand brand mb-3">' +
                '<span class="brand-mark">G</span>' +
                '<span class="brand-text">' +
                  '<span class="brand-name">GS<em>C</em></span>' +
                  '<span class="brand-sub">Consultoria</span>' +
                '</span>' +
              '</div>' +
              '<p class="footer-about">Consultoria independente de investimentos e planejamento patrimonial, guiada por estratégia, discrição e resultados de longo prazo.</p>' +
              '<div class="social-row mt-4">' +
                '<a href="#" class="social-icon" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>' +
                '<a href="#" class="social-icon" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>' +
                '<a href="#" class="social-icon" aria-label="YouTube"><i class="fa-brands fa-youtube"></i></a>' +
                '<a href="#" class="social-icon" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a>' +
              '</div>' +
            '</div>' +

            /* Menu rápido */
            '<div class="col-lg-2 col-md-6">' +
              '<h4 class="footer-title">Institucional</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="quem-somos.html">Quem Somos</a></li>' +
                '<li><a href="metodo.html">Nosso Método</a></li>' +
                '<li><a href="time.html">Time</a></li>' +
                '<li><a href="eventos.html">Eventos</a></li>' +
                '<li><a href="contato.html">Contato</a></li>' +
              '</ul>' +
            '</div>' +

            /* Serviços */
            '<div class="col-lg-2 col-md-6">' +
              '<h4 class="footer-title">Serviços</h4>' +
              '<ul class="footer-links">' +
                '<li><a href="servicos.html">Planejamento Financeiro</a></li>' +
                '<li><a href="servicos.html">Investimentos</a></li>' +
                '<li><a href="servicos.html">Proteção Patrimonial</a></li>' +
                '<li><a href="servicos.html">Sucessão Patrimonial</a></li>' +
                '<li><a href="servicos.html">Consultoria Tributária</a></li>' +
              '</ul>' +
            '</div>' +

            /* Contato */
            '<div class="col-lg-4 col-md-6">' +
              '<h4 class="footer-title">Contato</h4>' +
              '<ul class="footer-contact">' +
                '<li><i class="fa-solid fa-location-dot"></i><span>Av. Paulista, 1578 — 12º andar, São Paulo/SP</span></li>' +
                '<li><i class="fa-solid fa-phone"></i><span>+55 (11) 4002-8922</span></li>' +
                '<li><i class="fa-solid fa-envelope"></i><span>contato@gscconsultoria.com.br</span></li>' +
                '<li><i class="fa-regular fa-clock"></i><span>Seg a Sex, das 9h às 18h</span></li>' +
              '</ul>' +
            '</div>' +
          '</div>' +
        '</div>' +

        '<div class="footer-bottom">' +
          '<span>© <span id="footer-year"></span> GSC Consultoria de Investimentos. Todos os direitos reservados.</span>' +
          '<span>Consultoria de investimentos com <a href="#">política de transparência</a> e <a href="#">aviso legal</a>.</span>' +
        '</div>' +
      '</div>';

    // Ano automático no copyright
    var year = document.getElementById('footer-year');
    if (year) year.textContent = new Date().getFullYear();
  }

  function buildCtaBanner() {
    var host = document.getElementById('cta-banner');
    if (!host) return;

    host.innerHTML =
      '<div class="container text-center">' +
        '<span class="section-label is-centered" data-aos="fade-up">Comece hoje</span>' +
        '<h2 class="cta-title" data-aos="fade-up" data-aos-delay="100">Uma conversa pode mudar o rumo do seu <span class="accent">patrimônio</span></h2>' +
        '<p class="cta-text" data-aos="fade-up" data-aos-delay="200">Agende uma conversa confidencial com nossos especialistas. Sem compromisso, sem pressão — apenas clareza sobre o seu futuro financeiro.</p>' +
        '<div class="mt-4" data-aos="fade-up" data-aos-delay="300">' +
          '<a href="contato.html" class="btn btn-gold btn-lg-lux me-2 mb-2"><i class="fa-regular fa-calendar-check me-2"></i>Agendar uma conversa</a>' +
          '<a href="servicos.html" class="btn btn-outline-light-lux btn-lg-lux mb-2">Conhecer serviços</a>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------------
     02. NAVBAR — redução e blur ao rolar
     ------------------------------------------------------------------------ */
  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ------------------------------------------------------------------------
     03. MENU MOBILE — drawer lateral + backdrop + fechar ao navegar
     ------------------------------------------------------------------------ */
  function initMobileMenu() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    // Cria o backdrop escuro que acompanha o menu
    var backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    function setMenu(open) {
      toggle.classList.toggle('is-open', open);
      nav.classList.toggle('is-open', open);
      backdrop.classList.toggle('is-visible', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });

    backdrop.addEventListener('click', function () {
      setMenu(false);
    });

    // Fecha o menu ao clicar em qualquer link interno
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    // Fecha com a tecla Esc
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ------------------------------------------------------------------------
     04. AOS — Animate On Scroll
     Configuração global leve e consistente.
     ------------------------------------------------------------------------ */
  function initAos() {
    if (window.AOS) {
      AOS.init({
        duration: 800,      // duração suave
        easing: 'ease-out-cubic',
        once: true,          // anima apenas uma vez
        offset: 60
      });
    }
  }

  /* ------------------------------------------------------------------------
     05. CONTADORES ANIMADOS
     Anima números a partir do elemento [data-count] quando visíveis.
     Suporte a prefixo, sufixo e casas decimais.
     ------------------------------------------------------------------------ */
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    function animateCounter(el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var prefix = el.getAttribute('data-prefix') || '';
      var suffix = el.getAttribute('data-suffix') || '';
      var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var duration = 1800;
      var start = null;

      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        // easing: desacelera no final
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = target * eased;

        el.textContent = prefix + value.toFixed(decimals).replace('.', ',') + suffix;

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = prefix + target.toFixed(decimals).replace('.', ',') + suffix;
        }
      }

      window.requestAnimationFrame(step);
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  /* ------------------------------------------------------------------------
     06. SLIDER DE DEPOIMENTOS
     Carrossel simples com autoplay, setas e indicadores.
     ------------------------------------------------------------------------ */
  function initTestimonialSlider() {
    var slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    var track = slider.querySelector('.testimonial-track');
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = slider.querySelector('.slider-dots');
    var prevBtn = slider.querySelector('.slider-btn.prev');
    var nextBtn = slider.querySelector('.slider-btn.next');

    var index = 0;
    var timer = null;
    var interval = 6000; // 6s por slide

    // Monta os indicadores dinamicamente
    var dots = slides.map(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' is-active' : '');
      dot.setAttribute('aria-label', 'Depoimento ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + index * 100 + '%)';
      dots.forEach(function (d, k) {
        d.classList.toggle('is-active', k === index);
      });
    }

    function restart() {
      clearInterval(timer);
      timer = setInterval(function () { goTo(index + 1); }, interval);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); restart(); });

    // Pausa o autoplay com o mouse
    slider.addEventListener('mouseenter', function () { clearInterval(timer); });
    slider.addEventListener('mouseleave', restart);

    restart();
  }

  /* ------------------------------------------------------------------------
     07. FILTRO POR CATEGORIA + PESQUISA (posts / eventos)
     Reutilizado nas páginas de conteúdo e agenda de eventos.
     ------------------------------------------------------------------------ */
  function initPostsFilters() {
    var container = document.getElementById('posts-grid');
    if (!container) return;

    var posts = Array.prototype.slice.call(container.querySelectorAll('.post-card'));
    var filterBtns = document.querySelectorAll('.filter-btn');
    var searchInput = document.getElementById('posts-search');
    var emptyState = document.getElementById('posts-empty');

    // Filtro por categoria (data-category no card)
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        applyFilters();
      });
    });

    // Pesquisa por título/resumo
    if (searchInput) {
      searchInput.addEventListener('input', applyFilters);
    }

    function applyFilters() {
      var activeBtn = document.querySelector('.filter-btn.is-active');
      var activeCat = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
      var query = searchInput ? searchInput.value.toLowerCase().trim() : '';

      var visible = 0;
      posts.forEach(function (post) {
        var cat = post.getAttribute('data-category');
        var haystack = (post.textContent || '').toLowerCase();

        var matchCat = activeCat === 'all' || cat === activeCat;
        var matchQuery = !query || haystack.indexOf(query) !== -1;

        var show = matchCat && matchQuery;
        post.style.display = show ? '' : 'none';
        if (show) visible++;
      });

      if (emptyState) emptyState.style.display = visible ? 'none' : 'block';
    }

    applyFilters();
  }

  /* ------------------------------------------------------------------------
     08. FORMULÁRIO DE CONTATO
     Validação simples e mensagem de sucesso (sem backend).
     ------------------------------------------------------------------------ */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validação nativa do HTML (required + type email)
        if (!form.checkValidity()) {
          form.classList.add('was-validated');
          return;
        }

        var feedback = document.getElementById('form-feedback');
        if (feedback) {
          feedback.classList.add('is-visible');
          feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        form.reset();
        form.classList.remove('was-validated');
      });
    }

    // Newsletter — evita recarregar a página e confirma a assinatura
    var newsletter = document.getElementById('newsletter-form');
    if (newsletter) {
      newsletter.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = newsletter.querySelector('input[type="email"]');
        if (input && input.value) {
          var btn = newsletter.querySelector('button[type="submit"]');
          if (btn) btn.textContent = 'Assinado!';
          newsletter.reset();
          setTimeout(function () {
            if (btn) btn.textContent = 'Assinar';
          }, 3000);
        }
      });
    }
  }

  /* ------------------------------------------------------------------------
     09. BOTÃO VOLTAR AO TOPO
     ------------------------------------------------------------------------ */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    function onScroll() {
      if (window.scrollY > 600) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
  }

})();
