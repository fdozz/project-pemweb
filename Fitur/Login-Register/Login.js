// === Toggle antara Sign In dan Sign Up ===
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

if (registerBtn && loginBtn && container) {
  registerBtn.addEventListener('click', () => {
    container.classList.add('active');
  });

  loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
  });
}

// === Handle Sign Up ===
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(registerForm);
    try {
      const response = await fetch("SignUp.php", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      alert(data.message);
    } catch (error) {
      alert("Terjadi kesalahan saat Sign Up.");
      console.error(error);
    }
  });
}

// === Handle Sign In ===
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(loginForm);
    try {
      const response = await fetch("SignIn.php", {
        method: "POST",
        body: formData
      });
      const data = await response.json();

      alert(data.message);
      if (data.success) {
        window.location.href = "welcome.html";
      }
    } catch (error) {
      alert("Terjadi kesalahan saat Sign In.");
      console.error(error);
    }
  });
}
