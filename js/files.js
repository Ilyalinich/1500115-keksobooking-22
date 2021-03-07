const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

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

const photoChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

photoChooser.addEventListener('change', () => {
  const files = Array.from(photoChooser.files);
  /*eslint-disable*/
  console.log(files)

  files.forEach((file) => {
    const fileType = file.type;
    const matches = FILE_TYPES.some((type) => fileType.endsWith(type));

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const photo = document.createElement('img');
        photo.width = 70;
        photo.height = 70;
        photo.src = reader.result;
        photoPreview.appendChild(photo);
        photo.style.marginRight = 4 +'px';
      });

      reader.readAsDataURL(file)

      console.log(file.type)
    }
  });

});




// /*eslint-disable*/
// console.log(matches)










