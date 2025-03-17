const rangeInput = document.getElementById("rangeInput");
const rangeValue = document.getElementById("rangeValue");
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

rangeInput.addEventListener("input", function () {
  rangeValue.textContent = this.value;
});
valueTo.addEventListener("input", function () {
  rangeTo.textContent = this.value;
});
valueFrom.addEventListener("input", function () {
  rangeFrom.textContent = this.value;
});


