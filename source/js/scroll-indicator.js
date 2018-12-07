    'use strict';

    var DEBOUNCE_INTERVAL = 100;
    var INDICATOR_CLASSES = {normal: 'indicator__link--normal', line: 'indicator__link--line', current: 'indicator__link--current'};
    var DIRECTIONS = {down: 'DOWN', up: 'UP', stopped: 'STOPPED'};

    var getCurrentClassName =  function () {
      return INDICATOR_CLASSES.current;
    };

    var getNotCurrentClassName = function (ind) {
      return (ind >= 2 && ind <= 4 ) ? INDICATOR_CLASSES.line : INDICATOR_CLASSES.normal;
    };

    var replaceClassName = function (obj, className, classSet) {
      if (obj) {
        removeAlternatives(obj, classSet);
        addClassName(obj, className);
      }
    };

    var removeClassName = function (element, className) {
      if (element && element.classList.contains(className)) {
        element.classList.remove(className);
      }
    };

    var addClassName = function (element, className) {
      if (element && !element.classList.contains(className)) {
        element.classList.add(className);
      }
    };

    var removeAlternatives = function (obj, classSet) {
      if (Array.isArray(classSet)) {
        classSet.forEach(function (item) {
          removeClassName(obj, item);
        });
      } else {
        Object.keys(classSet).map(function (el) {
          return el;
        }).forEach(function (item) {
          removeClassName(obj, classSet[item]);
        });
      }
    };

    var debounce = function (action) {
      var lastTimeout = null;
      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          action.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    };

    var onIndicatorClick = function (evt) {
      var element = evt.target;
      if (element.tagName !== 'A') {
        return false;
      }
      if (element.hasAttribute('id')) {
        var index = indicators.indexOf(indicators.filter(function (item) {
          return item.id === element.getAttribute('id');
      })[0]);
        direction = DIRECTIONS.stopped;
        changeIndicatorState(index);
      };
      return false;
    };

    var checkFirstVisible = function () {
      for (var i = 0; i < elements.length; i++) {
        var rect = elements[i].getBoundingClientRect();
        var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        if (!(rect.bottom < 0 || rect.top - viewHeight >= 0)) {
          var current = i;
          if (i < elements.length - 1) {
            var rectNext = elements[i + 1].getBoundingClientRect();
            if (!(rectNext.bottom < 0 || rectNext.top - viewHeight >= 0)) {
              current = (direction === DIRECTIONS.down) ? i + 1 : i;
            }
          }
          return current;
        }
      }
      return -1;
    };

    var getCurrentScroll = function () {
      return document.documentElement.scrollTop;
    };

    var changeIndicatorState = function (newIndex) {
      replaceClassName(indicators[newIndex], getCurrentClassName(), INDICATOR_CLASSES);
      replaceClassName(indicators[currentIndex], getNotCurrentClassName(currentIndex), INDICATOR_CLASSES);
      currentIndex = newIndex;
    };

    var onWindowScroll = debounce(function () {
      if (direction !== DIRECTIONS.stopped) {
        var currentScroll = getCurrentScroll();
        if (currentScroll === 0) {
          var newIndex = 0;
        } else if (currentScroll >= totalYScroll) {
          newIndex = elements.length - 1;
        } else {
          var newIndex =  checkFirstVisible();
        }
        if ((newIndex >=0 && currentIndex !== newIndex)) {
          changeIndicatorState(newIndex);
        }
      }
    });

    var onDocumentWheel = function (evtWheel) {
      direction = (evtWheel.deltaY > 0) ? DIRECTIONS.down : DIRECTIONS.up;
    };

    var blockLinks = document.querySelectorAll('header, .about, .service__item, .reviews, .faq, footer');
    var indicatorLinks = document.querySelectorAll('.indicator__link');
    var indicatorArea = document.querySelector('.indicator');
    var elements = blockLinks ? Array.prototype.slice.call(blockLinks) : [];
    var indicators = indicatorLinks ? Array.prototype.slice.call(indicatorLinks) : [];
    var currentIndex = 0;
    var direction = DIRECTIONS.down;
    var totalYScroll = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.scrollTop = 0;
    removeClassName(indicatorArea, 'indicator--nojs')

    window.addEventListener('scroll', onWindowScroll);
    document.addEventListener('wheel', onDocumentWheel);

    if (indicatorArea) {
      indicatorArea.addEventListener('click', onIndicatorClick);
    }
