const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
const checkedItem = document.querySelectorAll('.fa-check')


// req come from main.js, res from server
update.addEventListener('click', _ => {
  const replace = document.querySelector('#replace').value
  const itemUpdate = document.querySelector('#replacementItem').value
  const noteUpdate = document.querySelector('#replacementNote').value
  console.log("itemUpdate: " + itemUpdate, "noteUpdate: " + noteUpdate)
  fetch('/replace', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      item: replace,
      updatedItem: itemUpdate,
      note: noteUpdate
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(response => {
      window.location.reload(true)
    })
})

Array.from(checkedItem).forEach(function (element) {
  element.addEventListener('click', function () {
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const note = this.parentNode.parentNode.childNodes[3].innerText
    fetch('/quotes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'notes': note
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

// Array.from(checkedItem).forEach(function (element) {
//   element.addEventListener('click', function () {
//     const item = this.parentNode.parentNode.childNodes[1].innerText
//     const note = this.parentNode.parentNode.childNodes[3].innerText
//     fetch('/quotes', {
//       method: 'delete',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         'item': item,
//         'note': note
//       })
//     }).then(function (response) {
//       window.location.reload()
//     })
//   });
// });

deleteButton.addEventListener('click', _ => {
  fetch('/itemsAll', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
    })
  })
    .then(res => {
      if (res.ok) return res.json()
    })
    .then(data => {
      window.location.reload()
    })
})

