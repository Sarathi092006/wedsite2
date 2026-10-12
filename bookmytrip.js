document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Horizontal carousel scroll for Popular Hotels
  const hotelsRow = document.getElementById('hotelsRow');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (hotelsRow && prevBtn && nextBtn) {
    const getScrollOffset = () => {
      const card = hotelsRow.querySelector('.hotel-item');
      return card ? card.offsetWidth + 24 : 354;
    };

    nextBtn.addEventListener('click', () => {
      hotelsRow.scrollBy({ left: getScrollOffset(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      hotelsRow.scrollBy({ left: -getScrollOffset(), behavior: 'smooth' });
    });
  }

  // Interactive hotel selection updating the Hero background and details
  const heroSection = document.getElementById('heroSection');
  const heroTitle = document.getElementById('heroTitle');
  const heroPrice = document.getElementById('heroPrice');

  document.querySelectorAll('.hotel-item').forEach((item) => {
    item.addEventListener('click', () => {
      const title = item.getAttribute('data-title');
      const location = item.getAttribute('data-location');
      const price = item.getAttribute('data-price');
      const imagePath = item.getAttribute('data-img');

      if (heroTitle) heroTitle.textContent = `${title}, ${location}`;
      if (heroPrice) heroPrice.textContent = price;
      if (heroSection && imagePath) {
        heroSection.style.backgroundImage = `url('${imagePath}')`;
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Trip date minimum restriction to prevent past selections
  const tripDate = document.getElementById('tripDate');
  if (tripDate) {
    tripDate.min = new Date().toISOString().split('T')[0];
  }

  // Booking form submission handler
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('bookType').value;
      const destination = document.getElementById('bookDestination').value;
      const date = tripDate.value;

      if (!destination) {
        alert('Please choose a destination location.');
        return;
      }
      if (!date) {
        alert('Please select your travel date.');
        return;
      }

      alert(`Inquiry Confirmed!\nBooking: ${type}\nDestination: ${destination}\nDate: ${date}`);
    });
  }

  // Newsletter subscription validation
  const subForm = document.getElementById('subForm');
  const subEmail = document.getElementById('subEmail');
  const subMsg = document.getElementById('subMsg');

  if (subForm && subEmail && subMsg) {
    subForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = subEmail.value.trim();
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (isValid) {
        subMsg.textContent = 'Thanks for subscribing to our offers!';
        subMsg.className = 'form-feedback success';
        subForm.reset();
      } else {
        subMsg.textContent = 'Please enter a valid email address.';
        subMsg.className = 'form-feedback error';
      }
    });
  }
});