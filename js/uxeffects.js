// Smooth scroll for anchor links
// Adapted from https://medium.com/@gurjitmehta/smooth-scroll-with-javascript-571283e9a3cd
const easeInCubic = function (t) { return t * t * t }

const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
  const runtime = currentTime - startTime;
  let progress = runtime / duration;

  progress = Math.min(progress, 1);

  const ease = easeInCubic(progress);

  window.scroll(0, startScrollOffset + (scrollEndElemTop * ease));

  if (runtime < duration) {
    requestAnimationFrame((timestamp) => {
      const currentTime = timestamp || new Date().getTime();
      scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
    })
  }
}

var listenForUXEffectClick = function (e) {
  if (e.target.matches('*[data-uxeffect]')) {
    e.preventDefault();

    var scrollElemId = e.target.href.split('#')[1];

    var scrollEndElem = document.getElementById(scrollElemId);

    var anim = requestAnimationFrame((timestamp) => {
      var stamp = timestamp || new Date().getTime();
      var duration = 600;
      var start = stamp;

      var startScrollOffset = window.pageYOffset;
      var headerBarHeight = document.querySelector('.site-header-layout').offsetHeight;
      var scrollEndElemTop = scrollEndElem.getBoundingClientRect().top - headerBarHeight;

      scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
    })
  }
}

window.addEventListener('click', listenForUXEffectClick);