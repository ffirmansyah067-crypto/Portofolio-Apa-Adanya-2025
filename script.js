document.addEventListener('DOMContentLoaded', () => {
    // 1. Fungsi Smooth Scrolling untuk Navigasi
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Fungsi Typing Effect (Efek Mengetik)
    const typingElement = document.getElementById('typing-text');
    const roleTexts = ["Web Developer", "Frontend Expert", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100; // ms
    const deletingSpeed = 50; // ms
    const delayBetweenRoles = 1500; // ms

    function type() {
        const currentRole = roleTexts[roleIndex];
        if (charIndex < currentRole.length) {
            typingElement.textContent += currentRole.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            // Selesai mengetik, tunggu sebentar, lalu hapus
            setTimeout(erase, delayBetweenRoles);
        }
    }

    function erase() {
        const currentRole = roleTexts[roleIndex];
        if (charIndex > 0) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, deletingSpeed);
        } else {
            // Selesai menghapus, pindah ke peran berikutnya
            roleIndex = (roleIndex + 1) % roleTexts.length;
            setTimeout(type, typingSpeed + 500); // Tunggu sebentar sebelum mulai mengetik lagi
        }
    }

    // Mulai efek mengetik
    type();

    // 3. Observer untuk Animasi Scroll (Opsional: Animasi muncul saat di-scroll)
    const observerOptions = {
        root: null,
        threshold: 0.1, // Muncul saat 10% elemen terlihat
    };

    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Tambahkan kelas untuk memicu animasi saat bagian terlihat
                entry.target.querySelectorAll('.fade-in').forEach(element => {
                    element.style.opacity = 1;
                    // Hapus kelas 'fade-in' agar tidak dianimasikan ulang saat scroll
                    // element.classList.remove('fade-in'); 
                });
                // Hentikan pengamatan setelah animasi dipicu
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});