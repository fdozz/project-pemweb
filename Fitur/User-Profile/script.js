document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-link");
  const grids = document.querySelectorAll(".movie-grid");
  if (tabs.length && grids.length) {
    tabs.forEach(tab => {
      tab.addEventListener("click", e => {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove("active"));
        grids.forEach(g => g.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(tab.dataset.tab).classList.add("active");
      });
    });
  }

  const avatar = document.getElementById("topAvatar");
  const dropdown = document.getElementById("avatarDropdown");
  if (avatar && dropdown) {
    avatar.addEventListener("click", () => dropdown.classList.toggle("show"));
    document.addEventListener("click", e => {
      if (!avatar.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("show");
      }
    });
  }

  const savedTheme = localStorage.getItem("theme") || "light";
  const savedLang = localStorage.getItem("language") || "en";
  const savedNotif = localStorage.getItem("notifications") === "true";

  applyTheme(savedTheme);
  applyLanguage(savedLang);

  function applyTheme(theme) {
    document.body.classList.toggle("dark-mode", theme === "dark");
    const themeSelect = document.getElementById("theme");
    if (themeSelect) themeSelect.value = theme;
  }

  function applyLanguage(lang) {
    const textMap = {
      en: {
        history: "History",
        wishlist: "Wishlist",
        recommendations: "Recommendations",
        settings: "Settings",
        logout: "Log Out",
        editProfile: "Edit Profile",
        save: "Save",
        user: "User",
      },
      id: {
        history: "Riwayat",
        wishlist: "Daftar Keinginan",
        recommendations: "Rekomendasi",
        settings: "Pengaturan",
        logout: "Keluar",
        editProfile: "Edit Profil",
        save: "Simpan",
        user: "Pengguna",
      },
    };

    const texts = textMap[lang];
    if (!texts) return;

    document.querySelectorAll(".tab-link").forEach(tab => {
      const key = tab.dataset.tab;
      if (texts[key]) tab.textContent = texts[key];
    });

    const menuItems = document.querySelectorAll("#avatarDropdown a");
    if (menuItems.length >= 2) {
      menuItems[0].textContent = texts.settings;
      menuItems[1].textContent = texts.logout;
    }

    const editBtn = document.querySelector(".edit-btn");
    if (editBtn) editBtn.textContent = texts.editProfile;

    const saveBtn = document.querySelector(".save-btn");
    if (saveBtn) saveBtn.textContent = texts.save;
  }

  const themeSelect = document.getElementById("theme");
  const langSelect = document.getElementById("language");
  const notifCheck = document.getElementById("notifications");
  const saveBtn = document.querySelector(".save-btn");

  if (themeSelect) themeSelect.value = savedTheme;
  if (langSelect) langSelect.value = savedLang;
  if (notifCheck) notifCheck.checked = savedNotif;

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const theme = themeSelect.value;
      const lang = langSelect.value;
      const notif = notifCheck.checked;

      localStorage.setItem("theme", theme);
      localStorage.setItem("language", lang);
      localStorage.setItem("notifications", notif);

      applyTheme(theme);
      applyLanguage(lang);

      alert(lang === "en" ? "Settings saved!" : "Pengaturan disimpan!");
      window.location.href = "hal_user.html";
    });
  }

  const editForm = document.getElementById("editForm");
  if (editForm) {
    const nameInput = document.getElementById("name");
    const usernameInput = document.getElementById("username");
    const avatarInput = document.getElementById("avatar");

    nameInput.value = localStorage.getItem("profileName") || "User";
    usernameInput.value = localStorage.getItem("profileUsername") || "@user_666";

    editForm.addEventListener("submit", e => {
      e.preventDefault();

      localStorage.setItem("profileName", nameInput.value);
      localStorage.setItem("profileUsername", usernameInput.value);

      if (avatarInput.files && avatarInput.files[0]) {
        const reader = new FileReader();
        reader.onload = e2 => {
          localStorage.setItem("profileAvatar", e2.target.result);
          alert("Profile updated!");
          window.location.href = "hal_user.html";
        };
        reader.readAsDataURL(avatarInput.files[0]);
      } else {
        alert("Profile updated!");
        window.location.href = "hal_user.html";
      }
    });
  }

  const profileName = localStorage.getItem("profileName") || "User";
  const profileUsername = localStorage.getItem("profileUsername") || "@user_666";
  const profileAvatar = localStorage.getItem("profileAvatar") || "assets/user_001.png";

  const nameText = document.querySelector(".profile-text h2");
  const usernameText = document.querySelector(".profile-text p");
  const mainAvatar = document.getElementById("mainAvatar");
  const topAvatarImg = document.getElementById("topAvatar");

  if (nameText) nameText.textContent = profileName;
  if (usernameText) usernameText.textContent = profileUsername;
  if (mainAvatar) mainAvatar.src = profileAvatar;
  if (topAvatarImg) topAvatarImg.src = profileAvatar;
});

const logoutLink = document.querySelector('#avatarDropdown a:last-child');
if (logoutLink) {
  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();

    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.clear();

      window.location.href = "../Login-Register Page/Login.html";
    }
  });
}