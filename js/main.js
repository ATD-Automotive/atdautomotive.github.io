/* ATD Mobile Automotive — footer year + tap-to-reveal phone. Edit phone parts in the array below. */

document.getElementById('year').textContent = new Date().getFullYear();

(function () {
  var p = ['027', '515', '1399'];
  var tel = p.join('');
  var display = p.join(' ');
  document.querySelectorAll('.js-reveal-phone').forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (el.classList.contains('revealed')) return;
      e.preventDefault();
      el.classList.add('revealed');
      el.href = 'tel:' + tel;
      var text = el.querySelector('.js-phone-text');
      if (text) text.textContent = display;
    });
  });
})();
