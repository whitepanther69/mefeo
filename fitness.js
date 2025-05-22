// === MUSCLE BUTTON HANDLER ===
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".muscle-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", function () {
      buttons.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      const muscle = this.dataset.muscle;
      loadExercises(muscle);
    });
  });

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

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

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

  // === FITNESS FORM HANDLER ===
  const form = document.getElementById('fitnessForm');
  const cardContainer = document.getElementById('fitnessCard');
  const thankText = document.getElementById('fitnessThankText');
  const thankMsg = document.getElementById('fitnessThankMsg');
  const sendBtn = document.getElementById('sendBtn');

  if (form && cardContainer) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (sendBtn) sendBtn.classList.add("active");

      const formData = new FormData(form);

      fetch('submit-form.php', {
        method: 'POST',
        body: formData
      })
        .then(response => response.text())
        .then(data => {
          console.log("✅ Form submitted:", data);

          cardContainer.classList.add('card-flipped');

          thankText.textContent = "You're all set! 🚴";
          thankMsg.textContent = "Your personalized plan is being prepared.";

          form.reset();

          setTimeout(() => {
            cardContainer.classList.remove('card-flipped');
            sendBtn.classList.remove("active");
          }, 6000);
        })
        .catch(err => {
          console.error("❌ Submission error:", err);
          alert("Something went wrong. Please try again.");
        });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.querySelector(".fitness-form textarea");

  textarea.addEventListener("input", function () {
    this.style.height = "35px"; // Reset before growing
    this.style.height = this.scrollHeight + "px";
  });

  textarea.addEventListener("blur", function () {
    this.style.height = "35px"; // Shrink when not focused
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.querySelector(".fitness-form textarea");

  textarea.addEventListener("input", function () {
    this.style.height = "35px";               // Reset height
    this.style.height = this.scrollHeight + "px"; // Expand to fit
  });

  textarea.addEventListener("blur", function () {
    if (!this.value.trim()) {
      this.style.height = "35px"; // Reset to small if empty
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
      const form = document.getElementById("contactForm");
      const card = document.getElementById("formCard");

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        // Optional: Send data via fetch() here

        card.classList.add("card-flipped");
      });
    });
