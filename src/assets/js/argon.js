/*!

=========================================================
* Argon Dashboard - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard
* Copyright 2018 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import styleColors from '../scss/_variables.scss';

//
// Bootstrap Datepicker
//

('use strict');

const Datepicker = (function() {
  // Variables

  const $datepicker = $('.datepicker');

  // Methods

  function init($this) {
    const options = {
      disableTouchKeyboard: true,
      autoclose: false,
    };

    $this.datepicker(options);
  }

  // Events

  if ($datepicker.length) {
    $datepicker.each(function() {
      init($(this));
    });
  }
})();

//
// Icon code copy/paste
//

('use strict');

const CopyIcon = (function() {
  // Variables

  const $element = '.btn-icon-clipboard';
  const $btn = $($element);

  // Methods

  function init($this) {
    $this.tooltip().on('mouseleave', function() {
      // Explicitly hide tooltip, since after clicking it remains
      // focused (as it's a button), so tooltip would otherwise
      // remain visible until focus is moved away
      $this.tooltip('hide');
    });

    const clipboard = new ClipboardJS($element);

    clipboard.on('success', function(e) {
      $(e.trigger)
        .attr('title', 'Copied!')
        .tooltip('_fixTitle')
        .tooltip('show')
        .attr('title', 'Copy to clipboard')
        .tooltip('_fixTitle');

      e.clearSelection();
    });
  }

  // Events
  if ($btn.length) {
    init($btn);
  }
})();

//
// Form control
//

('use strict');

const FormControl = (function() {
  // Variables

  const $input = $('.form-control');

  // Methods

  function init($this) {
    $this
      .on('focus blur', function(e) {
        $(this)
          .parents('.form-group')
          .toggleClass('focused', e.type === 'focus' || this.value.length > 0);
      })
      .trigger('blur');
  }

  // Events

  if ($input.length) {
    init($input);
  }
})();

//
// Google maps
//

const $map = $('#map-canvas');
let map;
let lat;
let lng;
const color = '#5e72e4';

function initMap() {
  map = document.getElementById('map-canvas');
  lat = map.getAttribute('data-lat');
  lng = map.getAttribute('data-lng');

  const myLatlng = new google.maps.LatLng(lat, lng);
  const mapOptions = {
    zoom: 12,
    scrollwheel: false,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#444444' }],
      },
      {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{ color: '#f2f2f2' }],
      },
      {
        featureType: 'poi',
        elementType: 'all',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'road',
        elementType: 'all',
        stylers: [{ saturation: -100 }, { lightness: 45 }],
      },
      {
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [{ visibility: 'simplified' }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'all',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'water',
        elementType: 'all',
        stylers: [{ color }, { visibility: 'on' }],
      },
    ],
  };

  map = new google.maps.Map(map, mapOptions);

  const marker = new google.maps.Marker({
    position: myLatlng,
    map,
    animation: google.maps.Animation.DROP,
    title: 'Hello World!',
  });

  const contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' + '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
}

if ($map.length) {
  google.maps.event.addDomListener(window, 'load', initMap);
}

// //
// // Headroom - show/hide navbar on scroll
// //
//
// 'use strict';
//
// var Headroom = (function() {
//
// 	// Variables
//
// 	var $headroom = $('#navbar-main');
//
//
// 	// Methods
//
// 	function init($this) {
//
//     var headroom = new Headroom(document.querySelector("#navbar-main"), {
//         offset: 300,
//         tolerance: {
//             up: 30,
//             down: 30
//         },
//     });
//
//
//
// 	// Events
//
// 	if ($headroom.length) {
// 		headroom.init();
// 	}
//
// })();

//
// Navbar
//

('use strict');

const Navbar = (function() {
  // Variables

  const $nav = $('.navbar-nav, .navbar-nav .nav');
  const $collapse = $('.navbar .collapse');
  const $dropdown = $('.navbar .dropdown');

  // Methods

  function accordion($this) {
    $this
      .closest($nav)
      .find($collapse)
      .not($this)
      .collapse('hide');
  }

  function closeDropdown($this) {
    const $dropdownMenu = $this.find('.dropdown-menu');

    $dropdownMenu.addClass('close');

    setTimeout(function() {
      $dropdownMenu.removeClass('close');
    }, 200);
  }

  // Events

  $collapse.on({
    'show.bs.collapse': function() {
      accordion($(this));
    },
  });

  $dropdown.on({
    'hide.bs.dropdown': function() {
      closeDropdown($(this));
    },
  });
})();

//
// Navbar collapse
//

const NavbarCollapse = (function() {
  // Variables

  const $nav = $('.navbar-nav');
  const $collapse = $('.navbar .collapse');

  // Methods

  function hideNavbarCollapse($this) {
    $this.addClass('collapsing-out');
  }

  function hiddenNavbarCollapse($this) {
    $this.removeClass('collapsing-out');
  }

  // Events

  if ($collapse.length) {
    $collapse.on({
      'hide.bs.collapse': function() {
        hideNavbarCollapse($collapse);
      },
    });

    $collapse.on({
      'hidden.bs.collapse': function() {
        hiddenNavbarCollapse($collapse);
      },
    });
  }
})();

//
// Form control
//

('use strict');

var noUiSlider = (function() {
  // Variables

  // var $sliderContainer = $('.input-slider-container'),
  // 		$slider = $('.input-slider'),
  // 		$sliderId = $slider.attr('id'),
  // 		$sliderMinValue = $slider.data('range-value-min');
  // 		$sliderMaxValue = $slider.data('range-value-max');;

  // // Methods
  //
  // function init($this) {
  // 	$this.on('focus blur', function(e) {
  //       $this.parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
  //   }).trigger('blur');
  // }
  //
  //
  // // Events
  //
  // if ($input.length) {
  // 	init($input);
  // }

  if ($('.input-slider-container')[0]) {
    $('.input-slider-container').each(function() {
      const slider = $(this).find('.input-slider');
      const sliderId = slider.attr('id');
      const minValue = slider.data('range-value-min');
      const maxValue = slider.data('range-value-max');

      const sliderValue = $(this).find('.range-slider-value');
      const sliderValueId = sliderValue.attr('id');
      const startValue = sliderValue.data('range-value-low');

      const c = document.getElementById(sliderId);
      const d = document.getElementById(sliderValueId);

      noUiSlider.create(c, {
        start: [parseInt(startValue)],
        connect: [true, false],
        // step: 1000,
        range: {
          min: [parseInt(minValue)],
          max: [parseInt(maxValue)],
        },
      });

      c.noUiSlider.on('update', function(a, b) {
        d.textContent = a[b];
      });
    });
  }

  if ($('#input-slider-range')[0]) {
    const c = document.getElementById('input-slider-range');
    const d = document.getElementById('input-slider-range-value-low');
    const e = document.getElementById('input-slider-range-value-high');
    const f = [d, e];

    noUiSlider.create(c, {
      start: [parseInt(d.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
      connect: !0,
      range: {
        min: parseInt(c.getAttribute('data-range-value-min')),
        max: parseInt(c.getAttribute('data-range-value-max')),
      },
    }),
      c.noUiSlider.on('update', function(a, b) {
        f[b].textContent = a[b];
      });
  }
})();

//
// Popover
//

('use strict');

const Popover = (function() {
  // Variables

  const $popover = $('[data-toggle="popover"]');
  let $popoverClass = '';

  // Methods

  function init($this) {
    if ($this.data('color')) {
      $popoverClass = `popover-${$this.data('color')}`;
    }

    const options = {
      trigger: 'focus',
      template: `<div class="popover ${$popoverClass}" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>`,
    };

    $this.popover(options);
  }

  // Events

  if ($popover.length) {
    $popover.each(function() {
      init($(this));
    });
  }
})();

//
// Scroll to (anchor links)
//

('use strict');

const ScrollTo = (function() {
  //
  // Variables
  //

  const $scrollTo = $('.scroll-me, [data-scroll-to], .toc-entry a');

  //
  // Methods
  //

  function scrollTo($this) {
    const $el = $this.attr('href');
    const offset = $this.data('scroll-to-offset') ? $this.data('scroll-to-offset') : 0;
    const options = {
      scrollTop: $($el).offset().top - offset,
    };

    // Animate scroll to the selected section
    $('html, body')
      .stop(true, true)
      .animate(options, 600);

    event.preventDefault();
  }

  //
  // Events
  //

  if ($scrollTo.length) {
    $scrollTo.on('click', function(event) {
      scrollTo($(this));
    });
  }
})();

//
// Tooltip
//

('use strict');

const Tooltip = (function() {
  // Variables

  const $tooltip = $('[data-toggle="tooltip"]');

  // Methods

  function init() {
    $tooltip.tooltip();
  }

  // Events

  if ($tooltip.length) {
    init();
  }
})();

//
// Charts
//

('use strict');

const Charts = (function() {
  // Variable

  const $toggle = $('[data-toggle="chart"]');
  const mode = 'light'; // (themeMode) ? themeMode : 'light';
  const fonts = {
    base: 'Open Sans',
  };

  // Colors
  const colors = {
    gray: {
      100: '#f6f9fc',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#8898aa',
      700: '#525f7f',
      800: '#32325d',
      900: '#212529',
    },
    theme: {
      default: styleColors.default,
      primary: styleColors.primary,
      secondary: styleColors.secondary,
      info: styleColors.info,
      success: styleColors.success,
      danger: styleColors.danger,
      warning: styleColors.warning,
    },
    black: '#12263F',
    white: '#FFFFFF',
    transparent: 'transparent',
  };

  // Methods

  // Chart.js global options
  function chartOptions() {
    // Options
    const options = {
      defaults: {
        global: {
          responsive: true,
          maintainAspectRatio: false,
          defaultFontFamily: fonts.base,
          defaultFontSize: 13,
          scaleStartValue: 0,
          layout: {
            padding: 10,
          },
          legend: {
            display: false,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 16,
            },
          },
          elements: {
            point: {
              radius: 3,
              hitRadius: 15,
              backgroundColor: colors.theme.primary,
            },
            line: {
              tension: 0,
              borderWidth: 2,
              borderColor: colors.theme.primary,
              backgroundColor: colors.transparent,
              borderCapStyle: 'rounded',
            },
            rectangle: {
              backgroundColor: colors.theme.warning,
            },
            arc: {
              backgroundColor: colors.theme.primary,
              borderColor: mode == 'dark' ? colors.gray[800] : colors.white,
              borderWidth: 4,
            },
          },
          tooltips: {
            custom(tooltip) {
              if (!tooltip) return;
              // disable displaying the color box;
              tooltip.displayColors = false;
            },
            callbacks: {
              // use label callback to return the desired label
              label(tooltipItem, data) {
                return [tooltipItem.xLabel, `Total de compras: ${tooltipItem.yLabel}`];
              },
              // remove title
              title(tooltipItem, data) {},
            },
          },
        },
        doughnut: {
          cutoutPercentage: 83,
          tooltips: {
            callbacks: {
              title(item, data) {
                const title = data.labels[item[0].index];
                return title;
              },
              label(item, data) {
                const value = data.datasets[0].data[item.index];
                let content = '';

                content += `<span class="popover-body-value">${value}</span>`;
                return content;
              },
            },
          },
          legendCallback(chart) {
            const { data } = chart;
            let content = '';

            data.labels.forEach(function(label, index) {
              const bgColor = data.datasets[0].backgroundColor[index];

              content += '<span class="chart-legend-item">';
              content += `<i class="chart-legend-indicator" style="background-color: ${bgColor}"></i>`;
              content += label;
              content += '</span>';
            });

            return content;
          },
        },
      },
    };

    // yAxes
    Chart.scaleService.updateScaleDefaults('linear', {
      gridLines: {
        drawTicks: false,
        borderDash: [2],
        borderDashOffset: [2],
        zeroLineWidth: 0,
      },
      ticks: {
        beginAtZero: true,
        callback(value) {
          if (!(value % 1)) {
            return value;
          }
        },
      },
    });

    // xAxes
    Chart.scaleService.updateScaleDefaults('category', {
      gridLines: {
        drawBorder: true,
        drawOnChartArea: false,
        drawTicks: false,
      },
      ticks: {
        padding: 20,
        autoSkip: true,
        maxTicksLimit: 10,
        maxRotation: 0,
      },
      maxBarThickness: 10,
    });

    return options;
  }

  // Parse global options
  function parseOptions(parent, options) {
    for (const item in options) {
      if (typeof options[item] !== 'object') {
        parent[item] = options[item];
      } else {
        parseOptions(parent[item], options[item]);
      }
    }
  }

  // Push options
  function pushOptions(parent, options) {
    for (var item in options) {
      if (Array.isArray(options[item])) {
        options[item].forEach(function(data) {
          parent[item].push(data);
        });
      } else {
        pushOptions(parent[item], options[item]);
      }
    }
  }

  // Pop options
  function popOptions(parent, options) {
    for (var item in options) {
      if (Array.isArray(options[item])) {
        options[item].forEach(function(data) {
          parent[item].pop();
        });
      } else {
        popOptions(parent[item], options[item]);
      }
    }
  }

  // Toggle options
  function toggleOptions(elem) {
    const options = elem.data('add');
    const $target = $(elem.data('target'));
    const $chart = $target.data('chart');

    if (elem.is(':checked')) {
      // Add options
      pushOptions($chart, options);

      // Update chart
      $chart.update();
    } else {
      // Remove options
      popOptions($chart, options);

      // Update chart
      $chart.update();
    }
  }

  // Update options
  function updateOptions(elem) {
    const options = elem.data('update');
    const $target = $(elem.data('target'));
    const $chart = $target.data('chart');

    // Parse options
    parseOptions($chart, options);

    // Toggle ticks
    toggleTicks(elem, $chart);

    // Update chart
    $chart.update();
  }

  // Toggle ticks
  function toggleTicks(elem, $chart) {
    if (elem.data('prefix') !== undefined || elem.data('prefix') !== undefined) {
      const prefix = elem.data('prefix') ? elem.data('prefix') : '';
      const suffix = elem.data('suffix') ? elem.data('suffix') : '';

      // Update ticks
      $chart.options.scales.yAxes[0].ticks.callback = function(value) {
        if (!(value % 10)) {
          return prefix + value + suffix;
        }
      };

      // Update tooltips
      $chart.options.tooltips.callbacks.label = function(item, data) {
        const label = data.datasets[item.datasetIndex].label || '';
        const { yLabel } = item;
        let content = '';

        if (data.datasets.length > 1) {
          content += `<span class="popover-body-label mr-auto">${label}</span>`;
        }

        content += `<span class="popover-body-value">${prefix}${yLabel}${suffix}</span>`;
        return content;
      };
    }
  }

  // Events

  // Parse global options
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  // Toggle options
  $toggle.on({
    change() {
      const $this = $(this);

      if ($this.is('[data-add]')) {
        toggleOptions($this);
      }
    },
    click() {
      const $this = $(this);

      if ($this.is('[data-update]')) {
        updateOptions($this);
      }
    },
  });

  // Return

  return {
    colors,
    fonts,
    mode,
  };
})();

//
// Orders chart
//

const OrdersChart = (function() {
  //
  // Variables
  //

  const $chart = $('#chart-orders');
  const $ordersSelect = $('[name="ordersSelect"]');

  //
  // Methods
  //

  // Init chart
  function initChart($chart) {
    // Create chart
    const ordersChart = new Chart($chart, {
      type: 'bar',
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                callback(value) {
                  if (!(value % 10)) {
                    // return '$' + value + 'k'
                    return value;
                  }
                },
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label(item, data) {
              const label = data.datasets[item.datasetIndex].label || '';
              const { yLabel } = item;
              let content = '';

              if (data.datasets.length > 1) {
                content += `<span class="popover-body-label mr-auto">${label}</span>`;
              }

              content += `<span class="popover-body-value">${yLabel}</span>`;

              return content;
            },
          },
        },
      },
      data: {
        labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Sales',
            data: [25, 20, 30, 22, 17, 29],
          },
        ],
      },
    });

    // Save to jQuery object
    $chart.data('chart', ordersChart);
  }

  // Init chart
  if ($chart.length) {
    initChart($chart);
  }
})();

//
// Charts
//

('use strict');

//
// Sales chart
//

const SalesChart = (function() {
  // Variables

  const $chart = $('#chart-sales');

  // Methods

  function init($chart) {
    const salesChart = new Chart($chart, {
      type: 'line',
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                color: Charts.colors.gray[900],
                zeroLineColor: Charts.colors.gray[900],
              },
              ticks: {
                callback(value) {
                  if (!(value % 10)) {
                    return `$${value}k`;
                  }
                },
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label(item, data) {
              const label = data.datasets[item.datasetIndex].label || '';
              const { yLabel } = item;
              let content = '';

              if (data.datasets.length > 1) {
                content += `<span class="popover-body-label mr-auto">${label}</span>`;
              }

              content += `<span class="popover-body-value">$${yLabel}k</span>`;
              return content;
            },
          },
        },
      },
      data: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Performance',
            data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
          },
        ],
      },
    });

    // Save to jQuery object

    $chart.data('chart', salesChart);
  }

  // Events

  if ($chart.length) {
    init($chart);
  }
})();
