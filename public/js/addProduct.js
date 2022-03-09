console.log('ya fetch dobavlyator');

const $card = document.querySelector('.container');
// const $form = document.forms.add;

function createCard(data) {
  return `<div class="demo-card-square mdl-card mdl-shadow--2dp">
  <div style="background: url('${data.img}')" class="mdl-card__title mdl-card--expand">

  </div>

  <div class="mdl-card__supporting-text">
    <p class="title">Блюдо: ${data.name}</p>
    <p class="price">Цена: ${data.price}</p>
    <p class="price">Cкидка: ${data.discount}</p>
  </div>

  <div class="mdl-card__actions mdl-card--border">
    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
      View Updates
    </a>
  </div>
</div>`;
}

// $form.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const formData = Object.fromEntries(new FormData(event.target));
//   console.log(formData);
//   const result = await fetch('/courier', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(formData),
//   });
//   if (result.ok) {
//     const datafromback = await result.json();
//     // console.log('datafromback', datafromback);
//     $card.insertAdjacentHTML('afterbegin', createCard(datafromback));
//   }
// });
