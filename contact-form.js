const form = document.getElementById('contactForm');
const cardContainer = document.getElementById('formCard');
const thankText = document.getElementById('thankText');
const thankMsg = document.getElementById('thankMsg');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch('form-handler.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => {
      console.log("✅ Form sent:", data);

      // Flip card
      cardContainer.classList.add('card-flipped');

      // Reset previous animation (in case)
      thankText.classList.remove('animate-in');
      thankMsg.classList.remove('fade-in');

      // Trigger animation after slight delay
      setTimeout(() => {
        thankText.classList.add('animate-in');
        thankMsg.classList.add('fade-in');
      }, 300); // Ensure card has flipped

      // Flip back & reset
      setTimeout(() => {
        cardContainer.classList.remove('card-flipped');
        thankText.classList.remove('animate-in');
        thankMsg.classList.remove('fade-in');
        form.reset();
      }, 6000);
    })
    .catch(err => {
      console.error("❌ Error:", err);
    });
});
