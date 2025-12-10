// Modal functions
function showRegistration() {
  document.getElementById('registrationModal').style.display = 'block';
}

function closeRegistration() {
  document.getElementById('registrationModal').style.display = 'none';
}

function closeQR() {
  document.getElementById('qrModal').style.display = 'none';
}

// Photo preview
document.getElementById('photo')?.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const preview = document.getElementById('photoPreview');
      preview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
  }
});

// Form submission
function handleSubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const telegram = document.getElementById('telegram').value;
  
  // Close registration modal
  closeRegistration();
  
  // Generate QR code data
  const qrData = JSON.stringify({
    name: name,
    phone: phone,
    telegram: telegram,
    timestamp: new Date().getTime(),
    event: 'Вечер в Замке'
  });
  
  // Generate QR code
  generateQRCode(qrData);
  
  // Show QR modal
  document.getElementById('qrModal').style.display = 'block';
}

// QR Code generation using QRCode.js library
function generateQRCode(data) {
  const container = document.getElementById('qrCodeContainer');
  container.innerHTML = ''; // Clear previous QR code
  
  // Create QR code
  new QRCode(container, {
    text: data,
    width: 300,
    height: 300,
    colorDark: "#8b0000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

// Download QR code
function downloadQR() {
  const container = document.getElementById('qrCodeContainer');
  const canvas = container.querySelector('canvas');
  
  if (canvas) {
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'invitation-qr-code.png';
    link.href = url;
    link.click();
  }
}

// Close modal when clicking outside
window.onclick = function(event) {
  const regModal = document.getElementById('registrationModal');
  const qrModal = document.getElementById('qrModal');
  
  if (event.target === regModal) {
    closeRegistration();
  }
  if (event.target === qrModal) {
    closeQR();
  }
}

// Load QRCode.js library dynamically
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
document.head.appendChild(script);


