const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let uploadedImage = null;

// عرض الصورة بعد رفعها
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      uploadedImage = new Image();
      uploadedImage.onload = function() {
        preview.src = uploadedImage.src;
      }
      uploadedImage.src = event.target.result;
    }
    reader.readAsDataURL(file);
  }
});

// حساب عدد البكسلات السوداء
function calculateArea() {
  if (!uploadedImage) {
    alert("رجاءً ارفع صورة أولاً!");
    return;
  }

  canvas.width = uploadedImage.width;
  canvas.height = uploadedImage.height;
  ctx.drawImage(uploadedImage, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  let blackPixels = 0;
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    if (r < 50 && g < 50 && b < 50) {
      blackPixels++;
    }
  }

  document.getElementById('result').innerText = 
    `عدد البكسلات السوداء: ${blackPixels.toLocaleString()}`;
}
