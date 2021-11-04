let inputImage = document.getElementById('productImagen');

inputImage.addEventListener('change', function () {
  var preview = document.querySelector('#preview');

  if (this.files) {
    [].forEach.call(this.files, readAndPreview);
  }

  function readAndPreview(file) {


    var reader = new FileReader();
    preview.innerHTML = null;

    reader.addEventListener("load", function () {
      var image = new Image();
      image.height = 100;
      image.title = file.name;
      image.src = this.result;
      preview.appendChild(image);
    });

    reader.readAsDataURL(file);

  }
})

