// Registratsiya formasi uchun JS
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Formani avto-yuborishni oldini olish

    // Input qiymatlarini olish
    const phone = document.getElementById("phone").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validatsiya
    if (!phone || !firstName || !lastName || !studentId || !password || !confirmPassword) {
        alert("Iltimos, barcha maydonlarni to‘ldiring!");
        return;
    }

    if (password.length < 6) {
        alert("Parol kamida 6 ta belgidan iborat bo‘lishi kerak!");
        return;
    }

    if (password !== confirmPassword) {
        alert("Parollar mos kelmadi! Iltimos, qayta kiriting.");
        document.getElementById("confirmPassword").value = "";
        return;
    }

    if (studentId.length < 11) {
        alert("Student ID juda qisqa!");
        return;
    }

    // LocalStorage'dan mavjud foydalanuvchilarni olish
    let users = JSON.parse(localStorage.getItem("libraryUsers")) || [];

    // Student ID allaqachon ishlatilganmi?
    const userExists = users.some(user => user.studentId === studentId);
    if (userExists) {
        alert("Bu Student ID allaqachon ro‘yxatdan o‘tgan! Boshqa ID kiriting.");
        return;
    }

    // Yangi foydalanuvchi yaratish
    const fullName = `${firstName} ${lastName}`;
    const newUser = {
        phone,
        firstName,
        lastName,
        fullName,
        studentId,
        password // Real loyihada parolni hash qilish kerak (lekin o‘quv loyihasi uchun oddiy saqlaymiz)
    };

    // Foydalanuvchini saqlash
    users.push(newUser);
    localStorage.setItem("libraryUsers", JSON.stringify(users));

    // Avtomatik kirish (login qilish)
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // Muvaffaqiyat xabari va sahifaga o'tish
    //alert(`Tabriklaymiz, ${fullName}! Ro‘yxatdan muvaffaqiyatli o‘tdingiz 🎉`);
    
    // Dashboard yoki bosh sahifaga yo‘naltirish
    window.location.href = "libraryP2.html"; // O‘zingiz xohlagan sahifa
});