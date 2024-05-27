document.addEventListener('DOMContentLoaded', function() {
    let scrollToTopBtn = document.getElementById("scrollToTopBtn"); // Deklarasi tombol scrollToTopBtn
    import('./data-undangan.js').then(({ allInvitations, videoJpgWeddingInvitations, videoJpgNonWeddingInvitations }) => {
        // Fungsi untuk menampilkan undangan
        function showInvitations(type, searchTerm = '', limit = 10) {
            const container = document.getElementById('invitationCards');
            container.innerHTML = ''; // Kosongkan kontainer

            let invitations = [];

            // Menentukan undangan berdasarkan tipe
            if (type === 'Website') {
                invitations = allInvitations.wedding.concat(allInvitations.nonWedding);
            } else if (type === 'Video/Jpg') {
                invitations = videoJpgWeddingInvitations.concat(videoJpgNonWeddingInvitations);
            }

            // Filter undangan berdasarkan pencarian jika ada
            if (searchTerm) {
                invitations = invitations.filter(invitation => invitation.name.toLowerCase().includes(searchTerm.toLowerCase()));
            }

            // Batasi jumlah undangan yang ditampilkan sesuai dengan limit
            const invitationsToShow = invitations.slice(0, limit);

            // Tampilkan undangan
            invitationsToShow.forEach(invitation => {
                const whatsappMessage = `Halo, saya tertarik dengan ${invitation.name} yang berharga ${invitation.price}. Bisa dibantu?`;
                const whatsappURL = `https://wa.me/6285163594245?text=${encodeURIComponent(whatsappMessage)}`;

                const cardHTML = `
                    <div class="card2 col-xm-6 col-md-6 col-lg-4 col-xl-3 col-sm-6 mb-4" data-aos="fade-right">
                        <div class="card">
                            <img src="${invitation.image}" class="card-img-top" alt="${invitation.name}">
                            <div class="card-body col-sm-12">
                                <h5 class="card-title">${invitation.name}</h5>
                                <p class="card-text">${invitation.price}</p>
                                <a href="${whatsappURL}" target="_blank" class="btn btn-primary col-sm-7"><i class="fas fa-shopping-cart"></i> Pesan</a>
                                <a href="#" class="btn btn-secondary">Preview</a>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHTML;
            });

            // Tambahkan tombol "Selengkapnya" jika jumlah undangan melebihi limit
            if (invitations.length > limit) {
                // Tambahkan ikon Font Awesome dan atur latar belakang bulat
                const showMoreButton = document.createElement('button');
                showMoreButton.innerHTML = '<i class="fas fa-arrow-circle-down"></i>';
                showMoreButton.classList.add('btn', 'btn-primary', 'rounded-circle'); // Tambahkan kelas 'rounded-circle' untuk latar belakang bulat
                showMoreButton.addEventListener('click', function() {
                    showInvitations(type, searchTerm, limit + 10); // Menampilkan 10 undangan tambahan
                });
                container.appendChild(showMoreButton);
            }

            // Set efek aktif pada tombol layanan
            const allServicesButtons = document.querySelectorAll('.layanan button');
            allServicesButtons.forEach(button => {
                button.classList.remove('active');
                if (button.textContent.trim() === type) {
                    button.classList.add('active');
                }
            });

            // Perbarui judul katalog berdasarkan tombol yang dipilih
            document.querySelector('.judul-katalog').textContent = `Katalog Undangan ${type}`;

            // Simpan tipe yang dipilih ke localStorage
            saveToLocalStorage(type);
        }
        function showMoreInvitations(type, searchTerm, limit) {
            showInvitations(type, searchTerm, limit);
        
            // Tambahkan kelas slide-in ke setiap kartu undangan yang baru ditambahkan
            const newCards = document.querySelectorAll('.card2');
            newCards.forEach(card => {
                card.classList.add('slide-in');
            });
        }

        // Fungsi untuk menyimpan posisi scroll dan tipe yang dipilih ke localStorage
        function saveToLocalStorage(type) {
            localStorage.setItem('selectedType', type);
            localStorage.setItem('scrollPosition', window.scrollY);
        }

        // Fungsi untuk memulihkan posisi scroll dan tipe yang dipilih dari localStorage
        function restoreFromLocalStorage() {
            const selectedType = localStorage.getItem('selectedType');
            const scrollPosition = localStorage.getItem('scrollPosition');

            if (selectedType) {
                showInvitations(selectedType);
            }

            if (scrollPosition) {
                window.scrollTo(0, scrollPosition);
            }
        }

        // Panggil fungsi untuk memulihkan posisi scroll dan tipe yang dipilih dari localStorage
        restoreFromLocalStorage();

        // Panggil fungsi untuk menampilkan undangan dengan tipe dan limit awal
        showInvitations('Website', '', 10);

        // Fungsi untuk menyimpan posisi scroll ke localStorage
        function saveScrollPosition() {
            localStorage.setItem('scrollPosition', window.scrollY);
        }

        // Event listener untuk scroll
        window.addEventListener('scroll', saveScrollPosition);
        // Event listener untuk scroll
        window.addEventListener('scroll', () => {
            // Logika event scroll
            saveScrollPosition();

            if (window.scrollY > window.innerHeight / 2) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        // Event listener untuk klik pada tombol
        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        // Event listener untuk pencarian
        document.getElementById('searchInput').addEventListener('input', function() {
            const selectedType = localStorage.getItem('selectedType') || 'Website';
            const searchTerm = this.value;
            showInvitations(selectedType, searchTerm);
        });
    });
});

// Dapatkan elemen logo
const logo = document.querySelector('.logo');

// Fungsi untuk menambahkan border bulat pada logo saat di-scroll
function addRoundedBorder() {
    logo.classList.add('scrolled');
}

// Fungsi untuk menghapus border bulat pada logo saat berada di atas
function removeRoundedBorder() {
    logo.classList.remove('scrolled');
}

// Event listener untuk event scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        addRoundedBorder();
    } else {
        removeRoundedBorder();
    }
});
