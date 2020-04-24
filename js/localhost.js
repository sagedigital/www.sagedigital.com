


var trianglifyBackground = function() {
  var randomHexColor = function () {
    var returnColor = '';

    while (returnColor.length < 6) {
      var returnColor = Math.floor(Math.random() * 16777215).toString(16);
    }

    return '#' + returnColor;
  }

  function shadeColor(color, percent) {
    var f = parseInt(color.slice(1), 16),
      t = percent < 0 ? 0 : 255,
      p = percent < 0 ? percent * -1 : percent,
      R = f >> 16,
      G = f >> 8 & 0x00FF,
      B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
  }

  var colorA = randomHexColor();
  var colorB = randomHexColor();
  var pattern = Trianglify({
    width: document.documentElement.offsetWidth,
    height: document.documentElement.offsetHeight,
    cell_size: 150,
    variance: 1,
    x_colors: [shadeColor(colorA, -0.75), colorA],
    y_colors: [shadeColor(colorB, 0.75), colorB, shadeColor(colorB, -0.75)],
  });

  var background = document.createElement('div');
  background.className = 'body-background';
  background.style.backgroundImage = ' url(' + pattern.png() + ')';

  document.body.appendChild(background);
};

(function (g, d, s) {
  var f = d.getElementsByTagName(s)[0],
    m = d.createElement(s);

  m.async = true;
  m.defer = true;
  m.src = 'https://cdnjs.cloudflare.com/ajax/libs/trianglify/1.2.0/trianglify.min.js';
  m.onload = trianglifyBackground;

  f.parentNode.insertBefore(m, f);
})(window, document, 'script');

