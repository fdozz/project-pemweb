document.addEventListener("DOMContentLoaded", () => {
  // ==== HERO SLIDER ====
  const slides = document.querySelectorAll(".hero-slide");
  const prevBtn = document.querySelector(".hero-nav.prev");
  const nextBtn = document.querySelector(".hero-nav.next");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((s, i) => {
      s.classList.toggle("active", i === index);
    });
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  // ==== MOVIE INFO MODAL ====
  const modal = document.getElementById("infoModal");
  const infoDetails = document.getElementById("infoDetails");

  const movieData = {
    starwars: {
      title: "Star Wars: The Force Awakens",
      synopsis:
        "Thirty years after the defeat of the Galactic Empire, a new threat arises from Kylo Ren and the First Order. A new hero, Rey, emerges to fight for the light.",
      trailer: "https://www.youtube.com/embed/sGbxmsDFVnE",
      genre: "Sci-Fi, Adventure",
      cast: ["daisy.webp", "harrison.webp", "john.webp"],
      recommendations: ["dune3.webp", "interstellar.jpg", "guardians.webp"],
    },
    avengers: {
      title: "Avengers: Endgame",
      synopsis:
        "After the devastating events of Infinity War, the Avengers unite once more to reverse Thanos’ actions.",
      trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
      genre: "Action, Superhero, Sci-Fi",
      cast: ["robert.webp", "chris.webp", "scarlett.webp"],
      recommendations: ["spiderman.webp", "guardians.webp", "blackpanther.webp"],
    },
  };

  function openInfo(movieKey) {
    const movie = movieData[movieKey];
    if (!movie) return;

    infoDetails.innerHTML = `
      <div class="info-section">
        <h2>${movie.title}</h2>
        <p>${movie.synopsis}</p>
      </div>
      <div class="info-section">
        <h2>🎬 Trailer</h2>
        <iframe width="100%" height="315" src="${movie.trailer}" frameborder="0" allowfullscreen></iframe>
      </div>
      <div class="info-section">
        <h2>ℹ More Details</h2>
        <p><strong>Genre:</strong> ${movie.genre}</p>
      </div>
      <div class="info-section">
        <h2>👥 Cast</h2>
        <div class="cast-grid">
          ${movie.cast.map((img) => `<img src="assets/cast/${img}" alt="Cast" />`).join("")}
        </div>
      </div>
      <div class="info-section">
        <h2>🎞 You Might Also Like</h2>
        <div class="recommendations">
          ${movie.recommendations
            .map((img) => `<img src="assets/movies/${img}" alt="Recommended" />`)
            .join("")}
        </div>
      </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  window.closeInfo = function () {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  document.querySelectorAll(".button-info").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const movieKey = e.target.getAttribute("data-movie");
      openInfo(movieKey);
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeInfo();
  });
});

const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach(container => {
  const carousel = container.querySelector('.carousel');
  const nextBtn = container.querySelector('.next');
  const prevBtn = container.querySelector('.prev');

  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: 400, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -400, behavior: 'smooth' });
  });
});

document.querySelectorAll(".movie-section").forEach(section => {
  const row = section.querySelector(".movie-row");
  const controls = section.querySelectorAll(".control-btn");

  if (!row || controls.length < 2) return; // skip kalau nggak lengkap

  const [prev, next] = controls;

  next.addEventListener("click", () => {
    row.scrollBy({ left: 400, behavior: "smooth" });
  });

  prev.addEventListener("click", () => {
    row.scrollBy({ left: -400, behavior: "smooth" });
  });
});

