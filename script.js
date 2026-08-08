// Menunggu halaman selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // Ambil elemen tombol hamburger dan menu list
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    // Ketika tombol hamburger diklik
    // Pastikan elemen ada sebelum menambahkan event listener
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            // Tambahkan/Hapus class 'active' pada menu
            navList.classList.toggle('active');
        });
    }

    // Tambahan: Efek smooth scroll saat link diklik
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Tutup menu mobile jika link sudah diklik
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
        });
    });

    // --- Filter and Search Logic for games.html ---
    const searchBar = document.getElementById('search-bar');
    const gameCards = document.querySelectorAll('.game-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Get the filter section wrapper element
    const filterSection = document.getElementById('filter-section');

    // Ensure all necessary elements exist before proceeding
    if (searchBar && gameCards.length > 0 && filterBtns.length > 0 && filterSection) {
        
        let activeFilter = 'semua'; // Default filter

        // Function to perform filtering and searching
        const applyFilters = () => {
            const searchTerm = searchBar.value.toLowerCase().trim(); // Trim whitespace from search term

            // Logic to hide/show filter section based on search term
            if (searchTerm !== '') {
                filterSection.classList.add('hidden-by-search');
            } else {
                filterSection.classList.remove('hidden-by-search');
            }

            gameCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tag = card.querySelector('.tag').textContent.toLowerCase();

                // Condition 1: Does the card match the search term?
                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm) || tag.includes(searchTerm);
                
                // Condition 2: Does the card match the active filter?
                const matchesFilter = (activeFilter === 'semua') || (tag === activeFilter);

                // If searching, ignore filters. If not searching, use filters.
                if ((searchTerm !== '' && matchesSearch) || (searchTerm === '' && matchesFilter)) {
                    card.style.display = ''; // Menggunakan string kosong akan mengembalikan ke gaya display default dari CSS (yaitu 'block' atau 'grid item')
                } else {
                    card.style.display = 'none'; // Menyembunyikan elemen sepenuhnya dari layout
                }
            });

            // Otomatis scroll ke atas untuk menunjukkan hasil
            const resultsSection = document.querySelector('.section-title');
            if (resultsSection) {
                resultsSection.scrollIntoView({ behavior: 'smooth' });
            }
        };

        // Event listener for search bar
        searchBar.addEventListener('keyup', applyFilters);

        // Event listener for filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Only allow filtering if the search bar is empty
                if (searchBar.value.trim() === '') {
                document.querySelector('.filter-btn.active').classList.remove('active');
                btn.classList.add('active');
                activeFilter = btn.dataset.filter;
                applyFilters();
                }
            });
        });

        // Initial call to applyFilters to set the correct state on page load
        applyFilters();
    }

    // --- Lightbox Logic for galeri.html ---
    const lightbox = document.getElementById('myLightbox');
    if (lightbox) {
        const galleryImages = document.querySelectorAll('.gallery-card img');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeBtn = document.querySelector('.close-lightbox');

        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.classList.add('active');
                lightboxImg.src = img.src;
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
        };

        // Menutup saat tombol 'x' atau area luar gambar diklik
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById("backToTopBtn");

    if (backToTopButton) {
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        };

        backToTopButton.addEventListener("click", function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }

    // --- Card Load-in Animation on Page Load ---
    const gameGridForAnimation = document.querySelector('.game-grid');
    if (gameGridForAnimation) {
        const cardsToAnimate = gameGridForAnimation.querySelectorAll('.game-card');
        cardsToAnimate.forEach((card, index) => {
            card.style.animationDelay = `${index * 100}ms`;
        });
    }

    // --- Theme Toggler Logic ---
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // 1. Check for saved theme in localStorage on page load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'theme-agustus') {
        body.classList.add('theme-agustus');
    }

    if (themeToggleButton) {
        // 2. Add click event to the button
        themeToggleButton.addEventListener('click', () => {
            body.classList.toggle('theme-agustus');

            // 3. Save the current theme to localStorage
            if (body.classList.contains('theme-agustus')) {
                localStorage.setItem('theme', 'theme-agustus');
            } else {
                localStorage.removeItem('theme');
            }
        });
    }
});