document.addEventListener('DOMContentLoaded', function() {

    import('./data-undangan.js').then(({ allInvitations, videoJpgWeddingInvitations, videoJpgNonWeddingInvitations }) => {

        // Fungsi untuk menyimpan posisi scroll dan tipe yang dipilih ke localStorage
        function saveToLocalStorage(type) {
            localStorage.setItem('selectedType', type);
            localStorage.setItem('scrollPosition', window.scrollY);
        }

        // Fungsi untuk menampilkan undangan berdasarkan tipe yang dipilih
        window.showInvitations = function(type, searchTerm = '', limit = 10) {
            const container = document.getElementById('invitationCards');
            container.innerHTML = ''; // Hapus konten yang ada

            let invitations = [];
            if (type === 'Website') {
                // Tampilkan undangan website (pernikahan dan non-pernikahan)
                invitations = allInvitations.wedding.concat(allInvitations.nonWedding);
            } else if (type === 'Video/Jpg') {
                // Tampilkan undangan video/jpg (pernikahan dan non-pernikahan)
                invitations = videoJpgWeddingInvitations.concat(videoJpgNonWeddingInvitations);
            }

            if (searchTerm) {
                invitations = invitations.filter(invitation => invitation.name.toLowerCase().includes(searchTerm.toLowerCase()));
            }

            // Batasi jumlah undangan yang ditampilkan sesuai dengan limit
            const invitationsToShow = invitations.slice(0, limit);

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
                                <a href="${whatsappURL}" target="_blank" class="btn btn-primary col-sm-7"><i class="fas fa-shopping-cart"> Pesan</i></a>
                                <a href="#" class="btn btn-secondary">Preview</a>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += cardHTML;
            });

            // Tambahkan tombol "Show More" jika jumlah undangan melebihi limit
            if (invitations.length > limit) {
                const showMoreButton = document.createElement('button');
                showMoreButton.innerHTML = '<i class="fas fa-arrow-down"></i> Lihat Lebih Banyak';
                showMoreButton.classList.add('btn', 'mt-4');
                showMoreButton.addEventListener('click', function() {
                    showInvitations(type, searchTerm, limit + 10); // Tampilkan 10 undangan tambahan
                });
                container.appendChild(showMoreButton);
            }

            // Tambahkan tombol "Show Less" jika limit lebih dari 10
            if (limit > 10) {
                const showLessButton = document.createElement('button');
                showLessButton.innerHTML = '<i class="fas fa-arrow-up"></i> Lihat Lebih Sedikit';
                showLessButton.classList.add('btn', 'mt-4', 'ml-2');
                showLessButton.addEventListener('click', function() {
                    showInvitations(type, searchTerm, Math.max(limit - 10, 10)); // Kurangi 10 undangan
                });
                container.appendChild(showLessButton);
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
        };

        // Fungsi untuk menyimpan posisi scroll ke localStorage
        function saveScrollPosition() {
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

        // Event listeners
        window.addEventListener('scroll', saveScrollPosition);
        window.addEventListener('load', restoreFromLocalStorage);

        // Event listener untuk pencarian
        document.getElementById('searchInput').addEventListener('input', function() {
            const selectedType = localStorage.getItem('selectedType') || 'Website';
            const searchTerm = this.value;
            showInvitations(selectedType, searchTerm);
        });

        // Event listener untuk tombol scroll to top
        const scrollToTopBtn = document.getElementById("scrollToTopBtn");
        window.addEventListener("scroll", () => {
            if (window.scrollY > window.innerHeight / 2) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        showInvitations('Website');

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

});