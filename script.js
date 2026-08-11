document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // AOS Animation
  // ==========================
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      once: true,
      offset: 60
    });
  }

  // ==========================
  // Navbar Scroll Effect
  // ==========================
  const nav = document.getElementById("mainNav");

  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    });
  }

  // ==========================
  // At-a-Glance Tabs
  // ==========================
  (function () {

    const panel = document.querySelector(".glance-panel");
    if (!panel) return;

    const tabs = [...panel.querySelectorAll(".glance-tab")];
    const slides = [...panel.querySelectorAll(".glance-slide")];
    const fill = panel.querySelector(".glance-rail-fill");

    if (!tabs.length || !slides.length) return;

    let active = 0;
    let timer;

    function setActive(index) {

      active = index;

      tabs.forEach((tab, i) => {
        tab.classList.toggle("is-active", i === index);
        tab.setAttribute("aria-selected", i === index);
      });

      slides.forEach((slide, i) => {
        slide.classList.toggle("is-active", i === index);
      });

      if (fill && tabs[index]) {
        fill.style.top = tabs[index].offsetTop + "px";
        fill.style.height = tabs[index].offsetHeight + "px";
      }

    }

    function next() {
      setActive((active + 1) % tabs.length);
    }

    function autoplay() {
      clearInterval(timer);
      timer = setInterval(next, 5000);
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => {
        setActive(i);
        autoplay();
      });
    });

    panel.addEventListener("mouseenter", () => clearInterval(timer));
    panel.addEventListener("mouseleave", autoplay);

    window.addEventListener("load", () => setActive(active));
    window.addEventListener("resize", () => setActive(active));

    setActive(0);
    autoplay();

  })();

  // ==========================
  // Contact Form
  // ==========================
  (function () {

    const form = document.getElementById("contactForm");
    const success = document.getElementById("ctaFormSuccess");

    if (!form) return;

    form.addEventListener("submit", function (e) {

      e.preventDefault();
      e.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      form.classList.remove("was-validated");

      if (success) {
        success.classList.add("is-visible");
      }

      form.reset();

      clearTimeout(form._successTimer);

      form._successTimer = setTimeout(() => {
        if (success) {
          success.classList.remove("is-visible");
        }
      }, 6000);

    });

  })();

  // ==========================
  // Stack Cards Animation
  // ==========================
  const stackCards = document.querySelectorAll(".stack-card");

  if (stackCards.length && "IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

      entries.forEach(entry => {
        entry.target.style.transform = entry.isIntersecting
          ? "scale(1)"
          : "scale(0.96)";
      });

    }, {
      threshold: [0, 0.6],
      rootMargin: "-100px 0px -20% 0px"
    });

    stackCards.forEach(card => observer.observe(card));

  }

  // ==========================
  // Counter Animation
  // ==========================
  (function () {

    const elements = document.querySelectorAll(".hero-stat-number, .cta-stat-num");

    if (!elements.length) return;

    const stats = [...elements].map(el => {

      const text = el.textContent.trim();
      const match = text.match(/^([\d,]+)(.*)$/);

      if (!match) return null;

      const value = parseInt(match[1].replace(/,/g, ""), 10);

      const suffix = match[2];

      el.textContent = "0" + suffix;

      return {
        el,
        value,
        suffix
      };

    }).filter(Boolean);

    function animate(stat) {

      const duration = 1400;
      const start = performance.now();

      function frame(now) {

        const progress = Math.min((now - start) / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        stat.el.textContent =
          Math.round(stat.value * eased).toLocaleString() + stat.suffix;

        if (progress < 1) {
          requestAnimationFrame(frame);
        }

      }

      requestAnimationFrame(frame);

    }

    if ("IntersectionObserver" in window) {

      const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const stat = stats.find(s => s.el === entry.target);

            if (stat) {
              animate(stat);
            }

            obs.unobserve(entry.target);

          }

        });

      }, {
        threshold: 0.4
      });

      stats.forEach(stat => observer.observe(stat.el));

    }

  })();

  // ==========================
  // Reasons Carousel
  // ==========================
  (function () {

    const track = document.querySelector(".reasons-track");
    const slides = document.querySelectorAll(".reasons-slide");
    const prevBtn = document.querySelector(".reasons-prev");
    const nextBtn = document.querySelector(".reasons-next");
    const dots = document.querySelectorAll(".reasons-dot");

    if (!track || !slides.length) return;

    function step() {

      const slide = slides[0];

      const style = getComputedStyle(track);

      const gap = parseFloat(style.columnGap || style.gap || 0);

      return slide.getBoundingClientRect().width + gap;

    }

    function current() {
      return Math.round(track.scrollLeft / step());
    }

    function go(index) {

      index = Math.max(0, Math.min(index, slides.length - 1));

      track.scrollTo({
        left: index * step(),
        behavior: "smooth"
      });

    }

    function updateDots() {

      const index = current();

      dots.forEach((dot, i) => {
        dot.classList.toggle("is-active", i === index);
      });

    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => go(current() - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => go(current() + 1));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => go(i));
    });

    let timer;

    track.addEventListener("scroll", () => {
      clearTimeout(timer);
      timer = setTimeout(updateDots, 100);
    });

    updateDots();

  })();

});

   /*
         * Get all service items
         */

        const accordionItems =
            document.querySelectorAll(".nevas-item");


        /*
         * Get image area
         */

        const serviceImage =
            document.getElementById("serviceImage");


        /*
         * Get floating card elements
         */

        const cardLabel =
            document.getElementById("cardLabel");

        const cardTitle =
            document.getElementById("cardTitle");

        const progressBar =
            document.getElementById("progressBar");

        const progressNumber =
            document.getElementById("progressNumber");

        const progressLabel =
            document.getElementById("progressLabel");


        /*
         * Change image + card
         */

        function changeService(item) {

            /*
             * Read information
             * from data attributes
             */

            const image =
                item.dataset.image;

            const label =
                item.dataset.label;

            const title =
                item.dataset.title;

            const progress =
                item.dataset.progress;

            const progressText =
                item.dataset.progressLabel;


            /*
             * Start fade animation
             */

            serviceImage.classList.add("changing");


            /*
             * Change content
             */

            setTimeout(function() {


                /*
                 * Change image
                 */

                serviceImage.style.backgroundImage =
                    `
                    linear-gradient(
                        rgba(5, 44, 105, 0.10),
                        rgba(5, 44, 105, 0.10)
                    ),
                    url("${image}")
                    `;


                /*
                 * Change floating card
                 */

                cardLabel.textContent =
                    label;


                cardTitle.textContent =
                    title;


                /*
                 * Change progress
                 */

                progressBar.style.width =
                    progress + "%";


                progressNumber.textContent =
                    progress + "%";


                progressLabel.textContent =
                    progressText;


                /*
                 * End fade animation
                 */

                serviceImage.classList.remove("changing");


            }, 250);

        }


        /*
         * Add click event
         * to every service
         */

        accordionItems.forEach(function(item) {


            const button =
                item.querySelector(
                    ".nevas-item-header"
                );


            button.addEventListener(
                "click",
                function() {


                    /*
                     * Check current state
                     */

                    const isActive =
                        item.classList.contains(
                            "active"
                        );


                    /*
                     * Close every item
                     */

                    accordionItems.forEach(
                        function(otherItem) {

                            otherItem.classList.remove(
                                "active"
                            );

                        }
                    );


                    /*
                     * Open clicked item
                     */

                    if (!isActive) {

                        item.classList.add(
                            "active"
                        );

                    }


                    /*
                     * Change left image
                     */

                    changeService(item);

                }
            );

        });


        /*
         * Load first service
         * when page opens
         */

        const firstService =
            document.querySelector(
                ".nevas-item.active"
            );


        if (firstService) {

            changeService(
                firstService
            );

        }


        document.addEventListener(
            "DOMContentLoaded",
            function () {


                /* =========================================
                   ELEMENTS
                ========================================== */

                const section =
                    document.getElementById(
                        "differenceScroll"
                    );


                const cards =
                    document.querySelectorAll(
                        ".difference-card"
                    );



                /* =========================================
                   ANIMATION FUNCTION
                ========================================== */

                function animateCards() {


                    const rect =
                        section.getBoundingClientRect();


                    /*
                        Total amount of scrolling
                        available inside this section.
                    */

                    const totalScroll =
                        section.offsetHeight -
                        window.innerHeight;


                    /*
                        Overall section progress
                        0 → 1
                    */

                    let progress =
                        -rect.top /
                        totalScroll;


                    /*
                        Keep between 0 and 1
                    */

                    progress =
                        Math.max(
                            0,
                            Math.min(
                                1,
                                progress
                            )
                        );



                    /* =====================================
                       EACH CARD
                    ====================================== */

                    cards.forEach(
                        function (
                            card,
                            index
                        ) {


                            /*
                                Every card gets
                                its own animation stage.

                                Card 1 → first
                                Card 2 → second
                                Card 3 → third
                                Card 4 → fourth
                            */

                            const start =
                                index *
                                0.17;


                            const end =
                                start +
                                0.30;



                            /*
                                Calculate this
                                card's progress.
                            */

                            let cardProgress =
                                (
                                    progress -
                                    start
                                ) /
                                (
                                    end -
                                    start
                                );


                            /*
                                Limit 0 → 1
                            */

                            cardProgress =
                                Math.max(
                                    0,
                                    Math.min(
                                        1,
                                        cardProgress
                                    )
                                );



                            /*
                                Smooth cubic
                                easing.
                            */

                            const eased =
                                1 -
                                Math.pow(
                                    1 -
                                    cardProgress,
                                    3
                                );



                            /* =================================
                               VERTICAL MOVEMENT
                            ================================= */

                            const startY =
                                110;


                            const endY =
                                0;


                            const y =
                                startY +
                                (
                                    endY -
                                    startY
                                ) *
                                eased;



                            /* =================================
                               HORIZONTAL MOVEMENT
                            ================================= */

                            /*
                                Even cards enter
                                slightly from left.

                                Odd cards enter
                                slightly from right.
                            */

                            let x;


                            if (
                                index % 2 === 0
                            ) {

                                x =
                                    -25 +
                                    (
                                        25 *
                                        eased
                                    );

                            } else {

                                x =
                                    25 -
                                    (
                                        25 *
                                        eased
                                    );

                            }



                            /* =================================
                               OPACITY
                            ================================= */

                            const opacity =
                                Math.min(
                                    1,
                                    eased * 1.5
                                );



                            /* =================================
                               APPLY TRANSFORM
                            ================================= */

                            card.style.transform =
                                `
                                translate3d(
                                    ${x}px,
                                    ${y}vh,
                                    0
                                )
                                `;


                            card.style.opacity =
                                opacity;



                            /* =================================
                               ACTIVE STATE
                            ================================= */

                            if (
                                cardProgress >
                                0.72
                            ) {

                                card.classList.add(
                                    "is-active"
                                );

                            } else {

                                card.classList.remove(
                                    "is-active"
                                );

                            }

                        }
                    );

                }



                /* =========================================
                   PERFORMANCE
                ========================================== */

                let ticking =
                    false;


                window.addEventListener(
                    "scroll",
                    function () {


                        if (
                            !ticking
                        ) {


                            window.requestAnimationFrame(
                                function () {


                                    animateCards();


                                    ticking =
                                        false;

                                }
                            );


                            ticking =
                                true;

                        }

                    },
                    {
                        passive: true
                    }
                );



                /* =========================================
                   INITIAL STATE
                ========================================== */

                animateCards();


            }
        );
