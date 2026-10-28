// =========================
// 1. MENU NAVIGASI MOBILE
// =========================
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Buka menu");
    });
  });
}

// =========================
// 2. MODAL PROFIL
// =========================
const profileModal = document.querySelector("#profileModal");
const openProfile = document.querySelector("#openProfile");
const closeProfile = document.querySelector("#closeProfile");
const modalDone = document.querySelector("#modalDone");

function showModal() {
  if (profileModal) {
    profileModal.classList.add("is-open");
    profileModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeProfile) closeProfile.focus();
  }
}

function hideModal() {
  if (profileModal) {
    profileModal.classList.remove("is-open");
    profileModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (openProfile) openProfile.focus();
  }
}

if (openProfile) openProfile.addEventListener("click", showModal);
if (closeProfile) closeProfile.addEventListener("click", hideModal);
if (modalDone) modalDone.addEventListener("click", hideModal);

if (profileModal) {
  profileModal.addEventListener("click", (event) => {
    if (event.target === profileModal) hideModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && profileModal && profileModal.classList.contains("is-open")) {
    hideModal();
  }
});

// =========================
// 3. VALIDASI FORM KONTAK
// =========================
const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const formFeedback = document.querySelector("#formFeedback");

function showFieldError(input, errorId, message) {
  if (!input) return;
  const errorElement = document.querySelector(`#${errorId}`);
  if (errorElement) errorElement.textContent = message;
  input.classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm && nameInput && emailInput && messageInput && formFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    const nameError = name.length < 2 ? "Nama minimal terdiri dari 2 karakter." : "";
    const emailError = !isValidEmail(email) ? "Masukkan alamat email yang valid." : "";
    const messageError = message.length < 10 ? "Pesan minimal terdiri dari 10 karakter." : "";

    showFieldError(nameInput, "nameError", nameError);
    showFieldError(emailInput, "emailError", emailError);
    showFieldError(messageInput, "messageError", messageError);

    if (nameError || emailError || messageError) {
      formFeedback.textContent = "Periksa kembali isian yang ditandai sebelum mengirim.";
      formFeedback.className = "form-feedback error";

      if (nameError) nameInput.focus();
      else if (emailError) emailInput.focus();
      else messageInput.focus();
      return;
    }

    formFeedback.textContent = `Terima kasih, ${name}! Formulir berhasil divalidasi. Ini demo, jadi pesan belum dikirim ke email/server.`;
    formFeedback.className = "form-feedback success";
    contactForm.reset();

    [nameInput, emailInput, messageInput].forEach((input) => {
      input.classList.remove("invalid");
      input.setAttribute("aria-invalid", "false");
    });
  });

  [
    [nameInput, "nameError"],
    [emailInput, "emailError"],
    [messageInput, "messageError"]
  ].forEach(([input, errorId]) => {
    if (input) {
      input.addEventListener("input", () => {
        showFieldError(input, errorId, "");
        formFeedback.textContent = "";
        formFeedback.className = "form-feedback";
      });
    }
  });
}

// =========================
// 4. MODAL DETAIL PROYEK (DIREVISI AGAR TOMBOL SILANG PASTI BISA DIKLIK)
// =========================
const projectModal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDesc = document.querySelector("#modalDesc");
const detailButtons = document.querySelectorAll(".project-info a, .project-link");

// Ambil tombol silang khusus di dalam modal proyek
const closeProjectModalBtn = document.querySelector("#projectModal .modal-close");

detailButtons.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (index === 0) {
      if (modalTitle) modalTitle.textContent = "Portofolio Pribadi";
      if (modalDesc) modalDesc.textContent = "Website pribadi interaktif yang dirancang untuk memperkenalkan profil, menampilkan daftar karya, serta memuat informasi seputar minat dan proses belajar saya.";
    } else if (index === 1) {
      if (modalTitle) modalTitle.textContent = "Aplikasi Pencarian Kos";
      if (modalDesc) modalDesc.textContent = "Aplikasi dirancang untuk membantu pengguna mencari tempat kos di Majene dengan mudah berdasarkan lokasi, kisaran harga, serta fasilitas yang sesuai dengan kebutuhan.";
    } else if (index === 2) {
      if (modalTitle) modalTitle.textContent = "Sensor Palang Otomatis Berbasis Arduino Uno";
      if (modalDesc) modalDesc.textContent = "Sistem cerdas menggunakan mikrokontroler Arduino Uno dan sensor untuk mendeteksi objek kendaraan secara otomatis serta mengatur buka-tutup palang pintu.";
    }

    if (projectModal) {
      projectModal.classList.add("is-open");
      projectModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  });
});

function hideProjectModal() {
  if (projectModal) {
    projectModal.classList.remove("is-open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
}

// Pastikan event klik langsung terpasang ke tombol silang
if (closeProjectModalBtn) {
  closeProjectModalBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Mencegah bentrok dengan event lain
    hideProjectModal();
  });
}

// Tutup modal jika area gelap di luar kotak putih diklik
if (projectModal) {
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
      hideProjectModal();
    }
  });
}
