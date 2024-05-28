window.jsPDF = window.jspdf.jsPDF;

function confirmarAsistencia() {
  const mensaje =
    'Confirmo mi asistencia a la celebración de cumpleaños de Valentina';
  const numeroTelefono = '1234567890'; // Replace with actual phone number
  const whatsappUrl = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(
    mensaje
  )}`;
  window.open(whatsappUrl, '_blank');
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

  // Confetti effect
  const confettiContainer = document.createElement('div');
  confettiContainer.classList.add('confetti');
  document.body.appendChild(confettiContainer);

  for (let i = 0; i < 100; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti-piece');
    confettiPiece.style.left = Math.random() * 100 + 'vw';
    confettiPiece.style.backgroundColor = `hsl(${
      Math.random() * 360
    }, 100%, 50%)`;
    confettiPiece.style.animationDelay = Math.random() * 5 + 's';
    confettiContainer.appendChild(confettiPiece);
  }
});
