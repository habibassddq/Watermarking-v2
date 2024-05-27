// Function to add watermark
function addWatermark() {
    const imageInput = document.getElementById('imageInput');
    const watermarkText = document.getElementById('watermarkText').value;
    const positionX = parseInt(document.getElementById('positionX').value);
    const positionY = parseInt(document.getElementById('positionY').value);

    if (!imageInput.files || !imageInput.files[0]) {
        alert('Silahkan pilih gambar terlebih dahulu');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);

            // Add watermark text
            context.font = '20px Arial';
            context.fillStyle = 'rgba(255, 255, 255, 0.5)';
            context.fillText(watermarkText, positionX, positionY);

            // Display watermarked image
            const watermarkedImage = document.createElement('img');
            watermarkedImage.src = canvas.toDataURL();
            document.getElementById('imagePreview').innerHTML = '';
            document.getElementById('imagePreview').appendChild(watermarkedImage);

            // Enable download button and set download action
            const downloadButton = document.getElementById('downloadButton');
            downloadButton.style.display = 'block'; // Show the button
            downloadButton.onclick = function() {
                const link = document.createElement('a');
                link.download = 'watermarked_image.png';
                link.href = canvas.toDataURL();
                link.click();
            };
        };
    };
    reader.readAsDataURL(imageInput.files[0]);
}