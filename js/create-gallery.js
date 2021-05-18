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

let currentImg;
  let nextImg;

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
  currentImg = imageEl;

  showModalImage(imageEl);
  turnImagesRight(event);
  turnImagesLeft(event);


}

const modalEl = document.querySelector('.js-lightbox');
const modalCloseBtnEl = document.querySelector('[data-action="close-lightbox"]');

function openModal() {
  modalEl.classList.add('is-open');

}

const imageModalEl = document.querySelector('.lightbox__image');
// let imageModalEl = document.querySelector('.lightbox__image');

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

const arrayOfGalleryImages = document.querySelectorAll('.gallery__image');
console.log(arrayOfGalleryImages);
const arrayOfGalleryImagesUrl = [...arrayOfGalleryImages].map((image) => {
  return image.dataset.source;
});


// console.log(arrayOfGalleryImagesUrl);

function getSlider(array) {



  // const newUrl = array.forEach((element, index) => {

  //   if (currentImg === element) {
  //     console.log(currentImg);
  //     console.log(element);
  //     console.log(index);
  //     nextImg = array[index+1];
  //     // currentImg = array[index+1];
  //     console.log(nextImg);
  //     showModalImage(nextImg);
  //     // console.log(currentImg);
  //     // showModalImage(currentImg);
  //     // currentImg = nextImg;
  //     //  nextImg.src = element[index + 1];
  // //      imageModalEl.src = element[index + 1].dataset.source;
  // // imageModalEl.alt = element[index + 1].alt;
  //   }

  // });
  // return newUrl;

}

function getIndexOfImage(array) {
  const index = [...array].indexOf(currentImg);
  console.log(currentImg);
  console.log(index);
  return index;
}


function turnImagesRight(event) {
  if (event.code === 'ArrowRight') {
    console.log(event.code);
    // getSlider(arrayOfGalleryImagesUrl);
    // getSlider(arrayOfGalleryImages);
    // getSlider();
    let index = getIndexOfImage(arrayOfGalleryImages);
    // imageModalEl = arrayOfGalleryImages[i + 1];
    if ((index + 1) > (arrayOfGalleryImages.length - 1)) {
      currentImg = arrayOfGalleryImages[0];
    } else {
      currentImg = arrayOfGalleryImages[index + 1];
    }
    showModalImage(currentImg);

  //   imageModalEl.src = arrayOfGalleryImages[i+1].dataset.source;
  // imageModalEl.alt = arrayOfGalleryImages[i+1].alt;



    // closeModal();
  }

}
function turnImagesLeft(event) {
  if (event.code === 'ArrowLeft') {
    console.log(event.code);
    // closeModal();
    let index = getIndexOfImage(arrayOfGalleryImages);
    // imageModalEl = arrayOfGalleryImages[i + 1];
if ((index - 1) < 0) {
      currentImg = arrayOfGalleryImages[arrayOfGalleryImages.length - 1];
    } else {

      currentImg = arrayOfGalleryImages[index - 1];
    }

    showModalImage(currentImg);
}

}

