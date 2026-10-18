
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

// Fungsi untuk menampilkan pesan error
function showError(id, text, input = null) {
    document.getElementById(id).textContent = text;

    if (input) {
        input.classList.toggle("invalid", text !== "");
    }
}

// Validasi nama
function validateNama() {
    const nama = document.getElementById("nama");
    let error = "";

    if (nama.value.trim() === "") {
        error = "Nama lengkap wajib diisi.";
    }

    showError("namaError", error, nama);
    return error === "";
}

// Validasi email
function validateEmail() {
    const email = document.getElementById("email");
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = "";

    if (email.value.trim() === "") {
        error = "Email wajib diisi.";
    } else if (!polaEmail.test(email.value.trim())) {
        error = "Format email tidak valid.";
    }

    showError("emailError", error, email);
    return error === "";
}

// Validasi password
function validatePassword() {
    const password = document.getElementById("password");
    let error = "";

    if (password.value === "") {
        error = "Password wajib diisi.";
    } else if (password.value.length < 6) {
        error = "Password minimal 6 karakter.";
    }

    showError("passwordError", error, password);

    if (document.getElementById("confirmPassword").value !== "") {
        validateConfirmPassword();
    }

    return error === "";
}

// Validasi konfirmasi password
function validateConfirmPassword() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    let error = "";

    if (confirmPassword.value === "") {
        error = "Konfirmasi password wajib diisi.";
    } else if (confirmPassword.value !== password.value) {
        error = "Password tidak sama.";
    }

    showError("confirmPasswordError", error, confirmPassword);
    return error === "";
}

// Validasi nomor telepon
function validateTelepon() {
    const telepon = document.getElementById("telepon");
    let error = "";

    if (telepon.value !== "" && !/^\d{10,}$/.test(telepon.value)) {
        error = "Nomor telepon harus berupa angka minimal 10 digit.";
    }

    showError("teleponError", error, telepon);
    return error === "";
}

// Validasi jenis kelamin
function validateGender() {
    const gender = document.querySelector(
        'input[name="gender"]:checked'
    );

    let error = "";

    if (!gender) {
        error = "Pilih jenis kelamin.";
    }

    showError("genderError", error);
    return error === "";
}

// Validasi hobi
function validateHobi() {
    const hobi = document.querySelectorAll(
        'input[name="hobi"]:checked'
    );

    let error = "";

    if (hobi.length === 0) {
        error = "Pilih minimal satu hobi.";
    }

    showError("hobiError", error);
    return error === "";
}

// Validasi negara
function validateNegara() {
    const negara = document.getElementById("negara");
    let error = "";

    if (negara.value === "") {
        error = "Silakan pilih negara.";
    }

    showError("negaraError", error, negara);
    return error === "";
}

// Validasi langsung saat pengguna mengetik
document.getElementById("nama").addEventListener("input", validateNama);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("password").addEventListener("input", validatePassword);
document.getElementById("confirmPassword").addEventListener("input", validateConfirmPassword);
document.getElementById("telepon").addEventListener("input", validateTelepon);
document.getElementById("negara").addEventListener("change", validateNegara);

// Event untuk radio button
document.querySelectorAll('input[name="gender"]').forEach(function(input) {
    input.addEventListener("change", validateGender);
});

// Event untuk checkbox
document.querySelectorAll('input[name="hobi"]').forEach(function(input) {
    input.addEventListener("change", validateHobi);
});

// Validasi saat form dikirim
form.addEventListener("submit", function(event) {
    event.preventDefault();

    message.textContent = "";
    message.className = "";

    const validNama = validateNama();
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    const validConfirmPassword = validateConfirmPassword();
    const validTelepon = validateTelepon();
    const validGender = validateGender();
    const validHobi = validateHobi();
    const validNegara = validateNegara();

    if (
        validNama &&
        validEmail &&
        validPassword &&
        validConfirmPassword &&
        validTelepon &&
        validGender &&
        validHobi &&
        validNegara
    ) {
        message.textContent = "Pendaftaran berhasil! Semua data valid.";
        message.classList.add("success");
        form.reset();

        document.querySelectorAll(".invalid").forEach(function(input) {
            input.classList.remove("invalid");
        });

        document.querySelectorAll(".error").forEach(function(error) {
            error.textContent = "";
        });
    } else {
        message.textContent = "Form belum valid. Periksa kembali data Anda.";
        message.classList.add("failed");
    }
});
