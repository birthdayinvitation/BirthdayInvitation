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

  countdown.style.display = 'none';
  buttons.forEach((button) => (button.style.display = 'none'));

  html2canvas(element, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const heightLeft = imgHeight <= pageHeight ? imgHeight : pageHeight;
    const position = (pageHeight - heightLeft) / 2;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('invitation.pdf');

    countdown.style.display = 'block';
    buttons.forEach((button) => (button.style.display = 'inline-block'));
  });
}

function guardarFecha() {
  const event = {
    summary: 'Celebración de Cumpleaños de Valentina',
    location: 'Iglesia de San Francisco, Quito',
    description: 'Fiesta de 15 años de Valentina.',
    start: {
      dateTime: '2024-06-29T17:00:00',
      timeZone: 'America/Guayaquil',
    },
    end: {
      dateTime: '2024-06-29T23:00:00',
      timeZone: 'America/Guayaquil',
    },
  };

  const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
  const params = new URLSearchParams({
    text: event.summary,
    location: event.location,
    details: event.description,
    dates: `${event.start.dateTime.replace(
      /[-:]/g,
      ''
    )}/${event.end.dateTime.replace(/[-:]/g, '')}`,
  });

  const googleCalendarUrl = `${baseUrl}&${params.toString()}`;
  window.open(googleCalendarUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', (event) => {
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

    countdownElement.innerHTML = `Faltan ${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
      clearInterval(updateCountdown);
      countdownElement.innerHTML = '¡Es hora de la fiesta!';
    }
  }, 1000);

  function createConfetti() {
    confetti({
      particleCount: 50,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        y: Math.random(),
      },
      colors: ['#ffffff', '#ffdd99'],
      opacity: 0.6,
    });
  }

  setInterval(createConfetti, 4000);

  const options = {
    strings: ['¡Te invito a celebrar mis 15 años!'],
    typeSpeed: 50,
    showCursor: false,
    onComplete: (self) => {
      const cursor = document.querySelector('.typed-cursor');
      if (cursor) {
        cursor.style.display = 'none';
      }
    },
  };

  new Typed('#typed-text', options);
});
