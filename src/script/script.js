document.addEventListener('DOMContentLoaded', function() {
    const allInvitations = {
        wedding: [
            { name: 'Undangan Pernikahan Klasik', price: 'Rp 7.000', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Pernikahan Modern', price: 'Rp 8.000', image: './picture/modern.jpg' },
            { name: 'Undangan Pernikahan Elegan', price: 'Rp 9.000', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Pernikahan Minimalis', price: 'Rp 6.500', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Pernikahan Rustic', price: 'Rp 7.500', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Pernikahan Vintage', price: 'Rp 8.500', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Pernikahan Outdoor', price: 'Rp 7.800', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Pernikahan Beach', price: 'Rp 8.200', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Pernikahan Royal', price: 'Rp 9.500', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Pernikahan Simple', price: 'Rp 6.000', image: './picture/card/card-klasik1.jpg' }
        ],
        nonWedding: [
            { name: 'Undangan Ulang Tahun', price: 'Rp 3.000', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Seminar', price: 'Rp 4.000', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Workshop', price: 'Rp 3.500', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Peluncuran Produk', price: 'Rp 4.500', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Pameran Seni', price: 'Rp 3.800', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Konferensi', price: 'Rp 5.000', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Reuni', price: 'Rp 3.200', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Pembukaan Toko', price: 'Rp 4.300', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Acara Amal', price: 'Rp 3.900', image: './picture/card/card-klasik1.jpg' },
            { name: 'Undangan Festival', price: 'Rp 4.700', image: './picture/card/card-klasik1.jpg' }
        ]
    };

    const videoJpgWeddingInvitations = [
        { name: 'Undangan Video Wedding 1', price: 'Rp 15.000', image: './picture/video/wedding1.jpg' },
        { name: 'Undangan Video Wedding 2', price: 'Rp 18.000', image: './picture/video/wedding2.jpg' },
        { name: 'Undangan Video Wedding 3', price: 'Rp 20.000', image: './picture/video/wedding3.jpg' },
        { name: 'Undangan Video Wedding 4', price: 'Rp 16.000', image: './picture/video/wedding4.jpg' },
        { name: 'Undangan Video Wedding 5', price: 'Rp 14.000', image: './picture/video/wedding5.jpg' }
    ];
    
    const videoJpgNonWeddingInvitations = [
        { name: 'Undangan Video Non-Wedding 1', price: 'Rp 10.000', image: './picture/video/non-wedding1.jpg' },
        { name: 'Undangan Video Non-Wedding 2', price: 'Rp 12.000', image: './picture/video/non-wedding2.jpg' },
        { name: 'Undangan Video Non-Wedding 3', price: 'Rp 11.000', image: './picture/video/non-wedding3.jpg' },
        { name: 'Undangan Video Non-Wedding 4', price: 'Rp 9.000', image: './picture/video/non-wedding4.jpg' },
        { name: 'Undangan Video Non-Wedding 5', price: 'Rp 8.000', image: './picture/video/non-wedding5.jpg' }
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
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${invitation.image}" class="card-img-top" alt="${invitation.name}">
                    <div class="card-body">
                        <h5 class="card-title">${invitation.name}</h5>
                        <p class="card-text">Harga: ${invitation.price}</p>
                        <a href="${whatsappURL}" target="_blank" class="btn btn-primary">Pesan Sekarang</a>
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