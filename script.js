window.jsPDF = window.jspdf.jsPDF;

function confirmarAsistencia() {
  const mensaje =
    'Confirmo mi asistencia a la celebración de cumpleaños de Valentina';
  const numeroTelefono = '958687531'; // Updated phone number
  const whatsappUrl = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(
    mensaje
  )}`;
  window.open(whatsappUrl, '_blank');

  const confirmButton = document.getElementById('confirmar-btn');
  confirmButton.textContent = 'Asistencia Confirmada';
  confirmButton.classList.remove('btn-success');
  confirmButton.classList.add('btn-confirmed');
  confirmButton.disabled = true;
}


function guardarFecha() {
  const event = {
    summary: 'Celebración de Cumpleaños de Valentina',
    location: 'Evento',
    description: 'Recepciones Vista al Valle, Quito Collasuyo y Av. Simón Bolívar, Barrio Miravalle #1 / Sector Argelia Alta',
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

  document.addEventListener('click', function (event) {
    createConfetti(event.clientX, event.clientY);
  });

  // Automatic confetti trigger, 3 times
  let confettiCount = 0;
  const confettiInterval = setInterval(() => {
    if (confettiCount < 3) {
      createConfetti(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
      confettiCount++;
    } else {
      clearInterval(confettiInterval);
    }
  }, 2000);

  const options = {
    strings: ['¡Mis 15 años!'],
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

function createConfetti(x, y) {
  confetti({
    particleCount: 50,
    startVelocity: 30,
    spread: 360,
    origin: {
      x: x / window.innerWidth,
      y: y / window.innerHeight,
    },
    colors: ['#ffffff', '#ffdd99'],
    opacity: 0.6,
  });
}
