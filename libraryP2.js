
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Formani avto-yuborishni to'xtatish

    // Input qiymatlarini olish
    const studentId = document.getElementById("studentId").value.trim();
    const password = document.getElementById("password").value;

    // LocalStorage'dan saqlangan foydalanuvchilarni olish
    const users = JSON.parse(localStorage.getItem("libraryUsers")) || [];

    // Foydalanuvchini topish
    const user = users.find(u => u.studentId === studentId && u.password === password);

    if (user) {
        // Muvaffaqiyatli kirish
        //alert(`Xush kelibsiz, ${user.fullName || studentId}!`);
        
        // Kirgan foydalanuvchini saqlash (keyinchalik foydalanish uchun)
        localStorage.setItem("currentUser", JSON.stringify(user));
        
        // Kerakli sahifaga yo'naltirish (masalan: dashboard.html)
        window.location.href = "MainPage.html"; // Bu sahifa nomini o'zingizga moslashtiring
    } else {
        // Xato kirish
        alert("Noto‘g‘ri Student ID yoki parol! Iltimos, qaytadan urinib ko‘ring.");
        
        // Inputlarni tozalash (ixtiyoriy)
        document.getElementById("password").value = "";
    }
});