// Pemilihan elemen mana yang akan ditampilkan
const radioButtons = document.querySelectorAll('input[name="btnradio"]');

// Mendapatkan semua elemen konten
const contents = document.querySelectorAll(".content");

// Menampilkan konten pertama saat halaman dimuat
document.getElementById("content1").style.display = "block";

// Menambahkan event listener untuk setiap radio button
radioButtons.forEach((radio) => {
  radio.addEventListener("change", function () {
    // Menyembunyikan semua konten
    contents.forEach((content) => {
      content.style.display = "none";
    });

    // Menampilkan konten yang sesuai dengan radio button yang dipilih
    const selectedContent = document.getElementById(
      "content" + this.value
    );
    selectedContent.style.display = "block";
  });
});

// search dan penampilan rekomendasi
 // Data rekomendasi contoh (bisa diganti dengan data dinamis dari API)
 const addressRecommendations = [
    "Jakarta Pusat, DKI Jakarta",
    "Jakarta Selatan, DKI Jakarta",
    "Jakarta Barat, DKI Jakarta",
    "Jakarta Timur, DKI Jakarta",
    "Jakarta Utara, DKI Jakarta",
    "Bandung, Jawa Barat",
    "Surabaya, Jawa Timur",
    "Medan, Sumatera Utara",
    "Bekasi, Jawa Barat",
    "Tangerang, Banten"
];

const destinationRecommendations = [
    "Monas (Monumen Nasional)",
    "TMII (Taman Mini Indonesia Indah)",
    "Ancol Dreamland",
    "Kota Tua Jakarta",
    "Ragunan Zoo",
    "Taman Mini Indonesia Indah",
    "Dufan (Dunia Fantasi)",
    "Museum Nasional Indonesia",
    "Kebun Binatang Ragunan",
    "Pantai Ancol"
];

// Elemen DOM
const fromInput = document.getElementById('from-input');
const toInput = document.getElementById('to-input');
const fromRec = document.getElementById('from-recommendations');
const toRec = document.getElementById('to-recommendations');
const swapBtn = document.getElementById('swap-btn');
const fromBox = document.getElementById('from-box');
const toBox = document.getElementById('to-box');

// Tampilkan rekomendasi dengan animasi
function showRecommendations(input, recElement, data) {
    const value = input.value.toLowerCase();
    
    // Highlight input box yang aktif
    if (input === fromInput) {
        fromBox.classList.add('active');
        toBox.classList.remove('active');
    } else {
        toBox.classList.add('active');
        fromBox.classList.remove('active');
    }
    
    if (value.length === 0) {
        recElement.innerHTML = '';
        recElement.classList.remove('visible');
        return;
    }
    
    const filtered = data.filter(item => 
        item.toLowerCase().includes(value)
    );
    
    recElement.innerHTML = filtered.map(item => 
        `<div class="recommendation-item">${item}</div>`
    ).join('');
    
    if (filtered.length) {
        recElement.classList.add('visible');
    } else {
        recElement.classList.remove('visible');
    }
    
    // Tambahkan event listener untuk item rekomendasi
    document.querySelectorAll('.recommendation-item').forEach(item => {
        item.addEventListener('click', () => {
            input.value = item.textContent;
            recElement.classList.remove('visible');
        });
    });
}

// Event listeners
fromInput.addEventListener('input', () => {
    showRecommendations(fromInput, fromRec, addressRecommendations);
});

fromInput.addEventListener('focus', () => {
    if (fromInput.value) {
        showRecommendations(fromInput, fromRec, addressRecommendations);
    }
    fromBox.classList.add('active');
});

toInput.addEventListener('input', () => {
    showRecommendations(toInput, toRec, destinationRecommendations);
});

toInput.addEventListener('focus', () => {
    if (toInput.value) {
        showRecommendations(toInput, toRec, destinationRecommendations);
    }
    toBox.classList.add('active');
});

// Swap pencarian
swapBtn.addEventListener('click', () => {
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
    
    // Update rekomendasi jika perlu
    if (fromInput.value) showRecommendations(fromInput, fromRec, addressRecommendations);
    else fromRec.classList.remove('visible');
    
    if (toInput.value) showRecommendations(toInput, toRec, destinationRecommendations);
    else toRec.classList.remove('visible');
});

// Sembunyikan rekomendasi saat klik di luar
document.addEventListener('click', (e) => {
    if (!fromBox.contains(e.target) && e.target !== swapBtn) {
        fromRec.classList.remove('visible');
        fromBox.classList.remove('active');
    }
    if (!toBox.contains(e.target) && e.target !== swapBtn) {
        toRec.classList.remove('visible');
        toBox.classList.remove('active');
    }
});