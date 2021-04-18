import Modal from './modal.js';

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

const cards = document.querySelectorAll('.cards .card')
const deleteForm = document.querySelector('#delete-profile')
const selectForm = document.querySelector('#select-profile')

for (let card of cards) {
  const cardId = card.dataset.id
  const deleteButton = card.querySelector('button.delete')
  if(deleteButton) {
    deleteButton.onclick = () => {
      modal.open()
      deleteForm.setAttribute('action', '/profile/delete/' + cardId)
    }
  }

  const selectButton = card.querySelector('button.select')
  if(selectButton) {
    selectButton.onclick = () => {
      selectForm.setAttribute('action', '/profile/select/' + cardId)
      selectForm.submit();
    }
  }
}