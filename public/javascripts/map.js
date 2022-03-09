let geo;


ymaps.ready(init);

// const placeMarkCache =[]
function init() {

  var myPlacemark,
    myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 9
    }, {
      searchControlProvider: 'yandex#search'
    });

  myMap.events.add('click', function (e) {
    var coords = e.get('coords');

    // Если метка уже создана – просто передвигаем ее.
    if (myPlacemark) {
      myPlacemark.geometry.setCoordinates(coords);
    }
    // Если нет – создаем.
    else {
      myPlacemark = createPlacemark(coords);
      console.log('myPlacemark=======>>>', myPlacemark)
      const { _coordinates } = myPlacemark.geometry;
      console.log('_coordinates=======>>>>', _coordinates);
      geo = _coordinates;
      console.log('GEO =====>>>', geo);
      // placeMarkCache.push(myPlacemark)
      myMap.geoObjects.add(myPlacemark);
      // placeMarkCache.forEach(placeMark=>{
      //   myMap.geoObjects.add(placeMark)
      // })
      // console.log('----------', placeMarkCache);

      // Слушаем событие окончания перетаскивания на метке.
      myPlacemark.events.add('dragend', function () {
        getAddress(myPlacemark.geometry.getCoordinates());
      });
    }
    getAddress(coords);
  });



  // Создание метки.
  function createPlacemark(coords) {


    return new ymaps.Placemark(coords, {
      iconCaption: 'поиск...',
      balloonContentHeader: '<a href = "#">Вкусный Кебаб</a><br>' +
        '<span class="description">Дели-вери Кебаб</span>',
      balloonContentBody: '<img src="../images/кебаб.jpeg" height="100" width="150"> <br/> ' +
        '<a href="tel:+7-123-456-78-90">+7 (123) 456-78-90</a><br/>' +
        '<b>Цена: 500p</b> <br/> Скидка: 10%.',
      balloonContentFooter: '<button>Заказать</button>',

    }, {
      preset: 'islands#violetDotIconWithCaption',
      draggable: true,

    });
  }

  // Определяем адрес по координатам (обратное геокодирование).
  function getAddress(coords) {
    myPlacemark.properties.set('iconCaption', 'поиск...');
    ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);

      myPlacemark.properties
        .set({


          // Формируем строку с данными об объекте.
          iconCaption: [
            // Название населенного пункта или вышестоящее административно-территориальное образование.
            firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
            // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
            firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
          ].filter(Boolean).join(', '),
          // В качестве контента балуна задаем строку с адресом объекта.
          balloonContent: firstGeoObject.getAddressLine()
        });
    });
  }

}


// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
// Создание карты.
// Координаты центра карты.
// Порядок по умолчанию: «широта, долгота».
// Чтобы не определять координаты центра карты вручную,
// воспользуйтесь инструментом Определение координат.
// Уровень масштабирования. Допустимые значения:
// от 0 (весь мир) до 19.

const $form = document.forms.add;
const $cardTest = document.querySelector('.container');


console.log('==>', $cardTest);

$form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target))
  console.log('formData ------!!!!', formData);
  const formGeo = `${geo[0]}, ${geo[1]}`
  formData.geo = formGeo
  console.log('formGeo=========>>>', formGeo);

  const res = await fetch('/courier', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(formData)
  });
  if (res.ok) {
    document.getElementById('addPr').reset();
    const datafromback = await res.json()
    $cardTest.insertAdjacentHTML('afterbegin', createCard(datafromback))
  }
})
