const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAX_PHOTO_COUNT = 10;

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const setAvatarChangeHandler = () => {
  avatarChooser.addEventListener('change', () => {
    const file = avatarChooser.files[0];
    const fileType = file.type;

    const matches = FILE_TYPES.some((type) => fileType.endsWith(type))

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file)
    }
  });
}


const photoChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

const setPhotoChangeHandler = () => {
  photoChooser.addEventListener('change', () => {
    const files = photoChooser.files;

    for (let file of files) {
      const fileType = file.type;
      const matches = FILE_TYPES.some((type) => fileType.endsWith(type));

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          const photo = document.createElement('img');
          photo.width = 70;
          photo.height = 70;
          photo.src = reader.result;
          photo.addEventListener('click', () => photo.remove())

          if (photoPreview.children.length < MAX_PHOTO_COUNT) {
            photoPreview.appendChild(photo);
          }
        });

        reader.readAsDataURL(file)
      }
    }
  });
}

const resetFilesPreviews = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.innerHTML = '';
}

export {setAvatarChangeHandler, setPhotoChangeHandler, resetFilesPreviews}











