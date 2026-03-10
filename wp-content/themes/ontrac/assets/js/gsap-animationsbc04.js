gsap.registerPlugin(ScrollTrigger);

function init() {
  const elementsToAnimate = [
    { id: "#gsap-v01", animation: { y: -100 } },
    { id: "#gsap-h01", animation: { x: -100 } },
    { id: "#gsap-h02", animation: { y: -100 }, trigger: "#gsap-h02" },
    { id: "#gsap-h03", animation: { x: -100 }, trigger: "#gsap-h03" },
    { id: "#gsap-h04", animation: { x: -100 }, trigger: "#gsap-h04" },
    { id: "#gsap-h05", animation: { x: -100 }, trigger: "#gsap-h05" },
    { id: "#gsap-h06", animation: { x: -100 }, trigger: "#gsap-h06" },
    { id: "#gsap-h07", animation: { x: -100 }, trigger: "#gsap-h07" },
    { id: "#gsap-h08", animation: { x: -100 }, trigger: "#gsap-h08" },
    { id: "#gsap-p01", animation: { y: -100 } },
    { id: "#gsap-p02", animation: { y: -100 }, trigger: "#gsap-h02" },
    { id: "#gsap-p03", animation: { y: -100 }, trigger: "#gsap-h03" },
    { id: "#gsap-p04", animation: { y: -100 }, trigger: "#gsap-h04" },
    { id: "#gsap-p05", animation: { y: -100 }, trigger: "#gsap-h05" },
    { id: "#gsap-p06", animation: { y: -100 }, trigger: "#gsap-h06" },
    { id: "#gsap-p07", animation: { y: -100 }, trigger: "#gsap-h07" },
    { id: "#gsap-p08", animation: { y: -100 }, trigger: "#gsap-h08" },
    {
      id: "#gsap-sec01",
      animation: { x: 100 },
      trigger: "#gsap-sec01",
      start: "0% 75%",
    },
    {
      id: "#gsap-a01",
      animation: { scale: 0, delay: 0.5, ease: "back.out(1.7)" },
    },
    {
      id: "#gsap-a06",
      animation: { scale: 0, delay: 0.5, ease: "back.out(1.7)" },
    },
    {
      id: "#gsap-a07",
      animation: { scale: 0, delay: 0.5, ease: "back.out(1.7)" },
    },
    {
      id: "#gsap-a08",
      animation: { scale: 0, delay: 0.5, ease: "back.out(1.7)" },
    },
    { id: "#gsap-img01", animation: { x: 100 } },
    { id: "#gsap-img06", animation: { x: 100 } },
    { id: "#gsap-img07", animation: { x: 100 } },
    { id: "#gsap-img08", animation: { x: 100 } },
  ];

  elementsToAnimate.forEach(({ id, animation, trigger, start = "50% 75%" }) => {
    const element = document.querySelector(id);
    if (element) {
      gsap.from(id, {
        autoAlpha: 0,
        delay: 0,
        duration: 0.5,
        ease: "power2.out",
        ...animation,
        ...(trigger && {
          scrollTrigger: {
            trigger,
            start,
            toggleActions: "play none none none",
          },
        }),
      });
    }
  });

  const counters = [
    { id: "#gsap-stat01", targetValue: 35 },
    { id: "#gsap-stat02", targetValue: 98 },
    { id: "#gsap-stat03", targetValue: 1.9, decimalPlaces: 1 },
  ];

  counters.forEach(({ id, targetValue, decimalPlaces = 0 }) => {
    const element = document.querySelector(id);
    if (element) {
      const counter = { val: 0 };
      gsap.to(counter, {
        val: targetValue,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: "#gsap-sec01",
          start: "50% 75%",
          toggleActions: "play none none none",
        },
        onUpdate: function () {
          element.innerText = counter.val.toFixed(decimalPlaces);
        },
      });
    }
  });

  const logos = gsap.utils.toArray(".customer-logo");
  if (logos.length) {
    gsap.from(logos, {
      scrollTrigger: {
        trigger: ".logo-container",
        start: "50% 75%",
        toggleActions: "play none none none",
      },
      autoAlpha: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "power1.out",
      stagger: 0.1,
    });
  }

  const cards = gsap.utils.toArray(".card");
  if (cards.length) {
    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: "#gsap-card01",
          start: "50% 75%",
          toggleActions: "play none none none",
        },
        autoAlpha: 0,
        y: 50,
        duration: 1,
        delay: i * 0.1,
        ease: "power2.out",
      });
    });
  }
}

window.addEventListener("load", function () {
  init();
});
