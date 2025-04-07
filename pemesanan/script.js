const rangeFrom = document.getElementById("fromRange");
const rangeTo = document.getElementById("toRange");
const valueFrom = document.getElementById("fromSlider");
const valueTo = document.getElementById("toSlider");
function controlFromSlider(fromSlider, toSlider) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#0000ff", toSlider);
  if (from > to) {
    fromSlider.value = to;
  } else {
  }
}

function controlToSlider(fromSlider, toSlider) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "#C6C6C6", "#0000ff", toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
  } else {
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(
  fromSlider,
  toSlider,
  sliderColor,
  rangeColor,
  controlSlider
) {
  const rangeDistance = toSlider.max - toSlider.min;
  const fromPosition = fromSlider.value - toSlider.min;
  const toPosition = toSlider.value - toSlider.min;
  controlSlider.style.background = `linear-gradient(
            to right,
            ${sliderColor} 0%,
            ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
            ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
            ${rangeColor} ${(toPosition / rangeDistance) * 100}%,
            ${sliderColor} ${(toPosition / rangeDistance) * 100}%,
            ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector("#toSlider");
  if (Number(currentTarget.value) <= 0) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

const fromSlider = document.querySelector("#fromSlider");
const toSlider = document.querySelector("#toSlider");
fillSlider(fromSlider, toSlider, "#C6C6C6", "#0000ff", toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider);

valueTo.addEventListener("input", function () {
  rangeTo.textContent = this.value;
});
valueFrom.addEventListener("input", function () {
  rangeFrom.textContent = this.value;
});

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

function updateValue(value) {
  document.getElementById("rangeValue").textContent = formatCurrency(value);
}
updateValue(document.getElementById("rangeInput").value);

const rangeInput = document.getElementById("clockInput");
const rangeValue = document.getElementById("clockValue");

rangeInput.addEventListener("input", function () {
  rangeValue.textContent = this.value;
});

document.querySelectorAll(".toggleButton").forEach((button) => {
  button.addEventListener("click", function () {
    // Cari elemen konten yang sesuai dalam widget yang sama
    const content = this.nextElementSibling;

    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden");
    } else {
      content.classList.add("hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const datePicker = document.getElementById("date-picker");
  const prevWeekBtn = document.getElementById("prev-week");
  const nextWeekBtn = document.getElementById("next-week");

  let selectedDate = new Date(); // Tanggal yang sedang dipilih
  const daysToShow = 5; // Jumlah tombol yang ditampilkan (harus ganjil)
  const centerIndex = Math.floor(daysToShow / 2); // Index tombol tengah

  // Fungsi untuk mengupdate tampilan date picker
  function updateDatePicker() {
    datePicker.innerHTML = "";

    // Hitung tanggal untuk setiap tombol
    for (let i = 0; i < daysToShow; i++) {
      const offset = i - centerIndex; // -2, -1, 0, +1, +2
      const date = new Date(selectedDate);
      date.setDate(date.getDate() + offset);

      const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Okt",
        "Nov",
        "Des",
      ];

      const button = document.createElement("button");
      button.className = `date-button ${offset === 0 ? "selected" : ""}`;
      button.innerHTML = `
              <div class="day">${dayNames[date.getDay()]}</div>
              <div class="date">${date.getDate()}</div>
              <div class="month">${monthNames[date.getMonth()]}</div>
          `;

      button.addEventListener("click", function () {
        // Update selected date ketika tombol diklik
        selectedDate = new Date(date);
        updateDatePicker();
      });

      datePicker.appendChild(button);
    }
  }
  // Inisialisasi pertama kali
  updateDatePicker();
});
