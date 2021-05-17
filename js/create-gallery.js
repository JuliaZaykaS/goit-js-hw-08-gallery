import images from './gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');

const galleryMarkup = createGallery(images);
galleryListEl.insertAdjacentHTML('afterbegin', galleryMarkup);

function createGallery(images) {
    return images.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`
    })
    .join('');

};

galleryListEl.addEventListener('click', OnImageOfGalleryClick);

function OnImageOfGalleryClick(event) {
    const isImageEl = event.target.classList.contains('gallery__image');
    if (!isImageEl) return;

    const imageEl = event.target;
  const imageLargeUrl = imageEl.dataset.source;
  window.addEventListener('keydown', closeModalByEscape);
  window.addEventListener('keydown', turnImagesRight);
  window.addEventListener('keydown', turnImagesLeft);

  openModal();

  imageEl.src = imageLargeUrl;

  showModalImage(imageEl);


}

const modalEl = document.querySelector('.js-lightbox');
const modalCloseBtnEl = document.querySelector('[data-action="close-lightbox"]');

function openModal() {
  modalEl.classList.add('is-open');

}

const imageModalEl = document.querySelector('.lightbox__image');

modalCloseBtnEl.addEventListener('click', closeModal);

// const modalOverlay = document.querySelector('.lightbox__overlay');
modalEl.addEventListener('click', OnOverlayClick);

function OnOverlayClick(event) {
  const isOverlayEl = event.target.classList.contains('lightbox__overlay');
  if (!isOverlayEl) return;
  closeModal();

}



function closeModalByEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
}

}

function turnImagesRight(event) {
  if (event.code === 'ArrowRight') {
    console.log(event.code);
    // closeModal();
  }

}
function turnImagesLeft(event) {
  if (event.code === 'ArrowLeft') {
    console.log(event.code);
    // closeModal();
}

}


function closeModal() {
  window.removeEventListener('keyup', closeModalByEscape);
  window.removeEventListener('keyup', turnImagesRight);
  window.removeEventListener('keyup', turnImagesLeft);
  modalEl.classList.remove('is-open');
  imageModalEl.src = '';

}


function showModalImage(image) {
  imageModalEl.src = image.dataset.source;
  imageModalEl.alt = image.alt;
};

