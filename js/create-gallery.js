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
    console.log(imageEl);
    console.log(imageLargeUrl);
    // return imageLargeUrl;
    openModal();


}

const modalEl = document.querySelector('.js-lightbox');
const modalCloseBtnEl = document.querySelector('[data-action="close-lightbox"]');

function openModal() {
    modalEl.classList.add('is-open');



}

modalCloseBtnEl.addEventListener('click', closeModal)
function closeModal() {
    modalEl.classList.remove('is-open')

}


// galleryListEl.addEventListener('click', getUrlOfBigImage);

// function getUrlOfBigImage() {
//     const UrlOfBigImage =
// }

