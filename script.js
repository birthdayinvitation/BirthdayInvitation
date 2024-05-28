window.jsPDF = window.jspdf.jsPDF;

function confirmarAsistencia() {
  const mensaje =
    '¡Hola! Confirmo mi asistencia a la celebración del 15º cumpleaños de Valentina el 29 de junio de 2024. ¡Nos vemos ahí! Mi nombre es:';
  const numeroTelefono = '+593958809186'; // Reemplaza con el número de teléfono real
  const whatsappUrl = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(
    mensaje
  )}`;
  window.open(whatsappUrl, '_blank');
  localStorage.setItem('asistenciaConfirmada', 'true');
  document.getElementById('confirmButton').style.display = 'none';
  document.getElementById('confirmationMessage').style.display = 'block';
}

function downloadPDF() {
  const element = document.getElementById('invitation-card');
  const countdown = document.getElementById('countdown');
  const buttons = element.querySelectorAll('button');

  // Hide the countdown and buttons before generating the PDF
  countdown.style.display = 'none';
  buttons.forEach((button) => (button.style.display = 'none'));

  html2canvas(element, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Adjust the height and position to ensure it fits well on one page
    const heightLeft = imgHeight <= pageHeight ? imgHeight : pageHeight;
    const position = (pageHeight - heightLeft) / 2;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('invitation.pdf');

    // Restore the countdown and buttons after generating the PDF
    countdown.style.display = 'block';
    buttons.forEach((button) => (button.style.display = 'inline-block'));
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  // Placeholder for any DOMContentLoaded related tasks if needed in the future.
  // Countdown timer
  const countDownDate = new Date('Jun 29, 2024 19:00:00').getTime();
  const countdownElement = document.getElementById('countdown');

  const updateCountdown = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
      clearInterval(updateCountdown);
      countdownElement.innerHTML = '¡Es hora de la fiesta!';
    }
  }, 1000);

  // Check if assistance is already confirmed
  if (localStorage.getItem('asistenciaConfirmada') === 'true') {
    document.getElementById('confirmButton').style.display = 'none';
    document.getElementById('confirmationMessage').style.display = 'block';
  }
});

function openGoogleMaps(location) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    location
  )}`;
  window.open(mapsUrl, '_blank');
}

function guardarEnCalendario() {
  const calUrl =
    'https://www.google.com/calendar/render?action=TEMPLATE&text=15%C2%BA%20Cumplea%C3%B1os%20de%20Valentina&dates=20240629T170000Z/20240629T230000Z&details=Celebraci%C3%B3n%20de%20misa%20y%20fiesta&location=Iglesia%20de%20San%20Francisco%2C%20Quito';
  window.open(calUrl, '_blank');
}
