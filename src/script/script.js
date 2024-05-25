document.addEventListener('DOMContentLoaded', function() {
    const allInvitations = {
        wedding: [
            { name: 'Undangan Pernikahan Klasik', price: 'IDR 7.000', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pernikahan Modern', price: 'IDR 8.000', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pernikahan Elegan', price: 'IDR 9.000', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pernikahan Minimalis', price: 'IDR 6.500', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pernikahan Rustic', price: 'IDR 7.500', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pernikahan Vintage', price: 'IDR 8.500', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pernikahan Outdoor', price: 'IDR 7.800', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pernikahan Beach', price: 'IDR 8.200', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pernikahan Royal', price: 'IDR 9.500', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pernikahan Simple', price: 'IDR 6.000', image: './picture/card/card-klasik1.webp' }
        ],
        nonWedding: [
            { name: 'Undangan Ulang Tahun', price: 'IDR 3.000', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Seminar', price: 'IDR 4.000', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Workshop', price: 'IDR 3.500', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Peluncuran Produk', price: 'IDR 4.500', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pameran Seni', price: 'IDR 3.800', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Konferensi', price: 'IDR 5.000', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Reuni', price: 'IDR 3.200', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Pembukaan Toko', price: 'IDR 4.300', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Acara Amal', price: 'IDR 3.900', image: './picture/card/card-klasik1.webp' },
            { name: 'Undangan Festival', price: 'IDR 4.700', image: './picture/card/card-klasik1.webp' }
        ]
    };

    const videoJpgWeddingInvitations = [
        { name: 'Undangan Video Wedding 1', price: 'IDR 15.000', image: './picture/card/card-klasik1.webp' },
        { name: 'Undangan Video Wedding 2', price: 'IDR 18.000', image: './picture/card/card-klasik1.webp' },
        { name: 'Undangan Video Wedding 3', price: 'IDR 20.000', image: './picture/card/card-klasik1.webp' },
        { name: 'Undangan Video Wedding 4', price: 'IDR 16.000', image: './picture/card/card-klasik1.webp' },
        { name: 'Undangan Video Wedding 5', price: 'IDR 14.000', image: './picture/card/card-klasik1.webp' }
    ];
    
    const videoJpgNonWeddingInvitations = [
        { name: 'Undangan Video Non-Wedding 1', price: 'IDR 10.000', image: './picture/card/card-klasik1.webp'},
        { name: 'Undangan Video Non-Wedding 2', price: 'IDR 12.000', image: './picture/card/card-klasik1.webp' },
        { name: 'Undangan Video Non-Wedding 3', price: 'IDR 11.000', image: './picture/card/card-klasik1.webp' },
        { name: 'Undangan Video Non-Wedding 4', price: 'IDR 9.000', image: './picture/card/card-klasik1.webp' },
        { name: 'Undangan Video Non-Wedding 5', price: 'IDR 8.000', image: './picture/card/card-klasik1.webp' }
    ];

    // Function to save scroll position and selected type to localStorage
    function saveToLocalStorage(type) {
        localStorage.setItem('selectedType', type);
        localStorage.setItem('scrollPosition', window.scrollY);
    }

    // Function to show invitations based on the selected type
    window.showInvitations = function(type) {
        const container = document.getElementById('invitationCards');
        container.innerHTML = ''; // Clear existing content

        let invitations = [];

        if (type === 'Website') {
            // Display website invitations (wedding and non-wedding)
            invitations = allInvitations.wedding.concat(allInvitations.nonWedding);
        } else if (type === 'Video/Jpg') {
            // Display video/jpg invitations (wedding and non-wedding)
            invitations = videoJpgWeddingInvitations.concat(videoJpgNonWeddingInvitations);
        }

        invitations.forEach(invitation => {
            const whatsappMessage = `Halo, saya tertarik dengan ${invitation.name} yang berharga ${invitation.price}. Bisa dibantu?`;
            const whatsappURL = `https://wa.me/6285163594245?text=${encodeURIComponent(whatsappMessage)}`;

            const cardHTML = `
                <div class="card2 col-xm-6 col-md-6 col-lg-4 col-xl-3 col-sm-6 mb-4" data-aos="fade-right">
                    <div class="card">
                        <img src="${invitation.image}" class="card-img-top" alt="${invitation.name}">
                        <div class="card-body col-sm-12">
                            <h5 class="card-title">${invitation.name}</h5>
                            <p class="card-text"> ${invitation.price}</p>
                            <a href="${whatsappURL}" target="_blank" class="btn btn-primary col-sm-7"><i class="fas fa-shopping-cart">  Pesan</i></a>
                            <a href="#" class="btn btn-secondary">Preview</a>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += cardHTML;
        });

        // Set active effect on service buttons
        const allServicesButtons = document.querySelectorAll('.layanan button');
        allServicesButtons.forEach(button => {
            button.classList.remove('active');
            if (button.textContent.trim() === type) {
                button.classList.add('active');
            }
        });

        // Update catalog title based on the selected button
        document.querySelector('.judul-katalog').textContent = `Katalog Undangan ${type}`;

        // Save selected type to localStorage
        saveToLocalStorage(type);
    };

    // Function to save scroll position to localStorage
    function saveScrollPosition() {
        localStorage.setItem('scrollPosition', window.scrollY);
    }

    // Function to restore scroll position and selected type from localStorage
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
});

// Get the logo element
const logo = document.querySelector('.logo');

// Function to add rounded border to logo when scrolled
function addRoundedBorder() {
    logo.classList.add('scrolled');
}

// Function to remove rounded border from logo when at the top
function removeRoundedBorder() {
    logo.classList.remove('scrolled');
}

// Event listener for scroll event
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        addRoundedBorder();
    } else {
        removeRoundedBorder();
    }
});