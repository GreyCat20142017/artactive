'use strict';

(function(){
// карта  ----------------------------------------
var initMap = function () {
  var myMap = new ymaps.Map("id-map-api", {
    center: [57.656628, 39.846121],
    zoom: 16
  });

  myMap.controls.remove('searchControl').remove('trafficControl').remove('geolocationControl');

  // myMap.behaviors.disable(['drag', 'scrollZoom']);

  var myPin = new ymaps.GeoObjectCollection({}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/pin.svg',
    iconImageSize: [28, 38],
    iconImageOffset: [0, -38]
  });

  var myPlacemark = new ymaps.Placemark([57.656628, 39.846121], {
    balloonContentHeader: '<img class="baloon__img" src="img/pin.svg" width="30" height="30" alt="-" title="Декоративная иконка"><span class="baloon__header">ArtActive</span>',
    balloonContentBody: '<span class="baloon__body">Ярославль</span>',
    balloonContentFooter: '<span class="baloon__footer">проспект Октября, 88</span>',
    hintContent: 'Просмотр подробной информации об объекте'
  });

  myPin.add(myPlacemark);
  myMap.geoObjects.add(myPin);
}

var toggleMaps = function (mapAPI, mapImg) {
  mapAPI.classList.toggle('map__image--hide');
  mapAPI.classList.toggle('map__image--show');
  mapImg.classList.toggle('map__image--hide');
  mapImg.classList.toggle('map__image--show');
}

var mapAPI = document.querySelector('#id-map-api');
var mapImg = document.querySelector('#id-map-static');
var mapLinks = document.querySelectorAll('.js__link');

if (!(mapLinks === null) && !(mapAPI === null)  && !(mapImg === null))  {


  if (mapAPI.classList.contains('map__image--nojs')) {
    mapAPI.classList.remove('map__image--nojs');
  }

  toggleMaps(mapAPI, mapImg);


  for (var i = 0; i < mapLinks.length; i++) {
    mapLinks[i].onselectstart = function(e) {
      e.preventDefault();
    }

    mapLinks[i].addEventListener('dblclick', function (e) {
      e.preventDefault();
      toggleMaps(mapAPI, mapImg);
    });
  }
}

window.ymaps.ready(initMap);


})();
