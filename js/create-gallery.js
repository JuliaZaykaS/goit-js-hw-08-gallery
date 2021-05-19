import images from './gallery-items.js';

const galleryListEl = document.querySelector('.js-gallery');

const galleryMarkup = createGallery(images);
galleryListEl.insertAdjacentHTML('afterbegin', galleryMarkup);

let currentModalShownImg;


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
const imageModalEl = document.querySelector('.lightbox__image');

const modalEl = document.querySelector('.js-lightbox');
const modalCloseBtnEl = document.querySelector('[data-action="close-lightbox"]');

function OnImageOfGalleryClick(event) {
    const isImageEl = event.target.classList.contains('gallery__image');
    if (!isImageEl) return;

  const imageEl = event.target;
  const imageLargeUrl = imageEl.dataset.source;
  event.preventDefault();

  openModal();

  imageModalEl.src = imageLargeUrl;
  currentModalShownImg = imageEl;

  showModalImage(imageEl);

}

function openModal() {
  modalEl.classList.add('is-open');
  window.addEventListener('keydown', OnCloseModalByEscape);
  window.addEventListener('keydown', OnTurnImagesRight);
  window.addEventListener('keydown', OnTurnImagesLeft);
}

modalCloseBtnEl.addEventListener('click', OnCloseModal);

modalEl.addEventListener('click', OnOverlayClick);

function OnOverlayClick(event) {
  const isOverlayEl = event.target.classList.contains('lightbox__overlay');
  if (!isOverlayEl) return;
  OnCloseModal();
}


function OnCloseModalByEscape(event) {
  if (event.code === 'Escape') {
    OnCloseModal();
}
}

function OnCloseModal() {
  window.removeEventListener('keyup', OnCloseModalByEscape);
  window.removeEventListener('keyup', OnTurnImagesRight);
  window.removeEventListener('keyup', OnTurnImagesLeft);
  modalEl.classList.remove('is-open');
  imageModalEl.src = '';

}


function showModalImage(image) {
  imageModalEl.src = image.dataset.source;
  imageModalEl.alt = image.alt;
}

const arrayOfGalleryImages = document.querySelectorAll('.gallery__image');

function getIndexOfImage(array) {
  return [...array].indexOf(currentModalShownImg);
}


function OnTurnImagesRight(event) {
  if (event.code === 'ArrowRight') {

    let index = getIndexOfImage(arrayOfGalleryImages);

    if ((index + 1) > (arrayOfGalleryImages.length - 1)) {
      currentModalShownImg = arrayOfGalleryImages[0];
    } else {
      currentModalShownImg = arrayOfGalleryImages[index + 1];
    }
    showModalImage(currentModalShownImg);

  }

}
function OnTurnImagesLeft(event) {
  if (event.code === 'ArrowLeft') {

    let index = getIndexOfImage(arrayOfGalleryImages);

    if ((index - 1) < 0) {
      currentModalShownImg = arrayOfGalleryImages[arrayOfGalleryImages.length - 1];
    } else {
      currentModalShownImg = arrayOfGalleryImages[index - 1];
    }

    showModalImage(currentModalShownImg);
}
}

