// Activate muscle buttons
const buttons = document.querySelectorAll(".muscle-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", function () {
    // Remove red from all
    buttons.forEach(b => b.classList.remove("active"));
    
    // Make this one red
    this.classList.add("active");

    // Load exercises
    const muscle = this.dataset.muscle;
    loadExercises(muscle);
  });
});

// Load exercises by body part from API
async function loadExercises(bodyPart) {
  const list = document.getElementById('exerciseList');
  list.innerHTML = '<p>Loading exercises...</p>';

  try {
    const response = await fetch(
      `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
          'x-rapidapi-key': '926848c2bbmsh77a004f0d43482bp1ca434jsn0342f7d35593'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    list.innerHTML = '';

    if (data.length === 0) {
      list.innerHTML = '<p>No exercises found for this body part.</p>';
      return;
    }

    data.slice(0, 12).forEach(exercise => {
      const card = document.createElement('div');
      card.className = 'exercise-card';
      card.innerHTML = `
        <img src="${exercise.gifUrl}" alt="${exercise.name}" />
        <h3>${exercise.name}</h3>
        <p><strong>Target:</strong> ${exercise.target}</p>
      `;
      list.appendChild(card);
    });
  } catch (err) {
    console.error('❌ Failed to fetch exercises:', err);
    list.innerHTML = '<p style="color:red;">Failed to load exercises. Please try again later.</p>';
  }
}
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

      cardContainer.classList.add('card-flipped');

      thankText.classList.remove('animate-in');
      thankMsg.classList.remove('fade-in');

      setTimeout(() => {
        thankText.classList.add('animate-in');
        thankMsg.classList.add('fade-in');
      }, 300);

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
