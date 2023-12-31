const amounts = document.querySelectorAll(".first .valyuta");
let amountsTwo = document.querySelectorAll(".second .valyuta");
let firstInput = document.getElementById("firstInput");
let secondInput = document.getElementById("secondInput");
const note1 = document.getElementById("note1");
const note2 = document.getElementById("note2");
let valyuta1 = document.querySelector(".first .active").innerHTML;
let valyuta2 = document.querySelector(".second .active").innerHTML;

firstInput.value = "";
secondInput.value = "";

const url = "https://v6.exchangerate-api.com/v6/";
const key = "e158cd98f7384d574b36646e";

//actice class left side start
amounts.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (!item.classList.contains("active")) {
      amounts.forEach(function (el) {
        el.classList.remove("active");
      });
      item.classList.add("active");
      valyuta1 = e.target.innerHTML;
      firstConvertFunc();
      render();
      console.log(valyuta1);
    }
  });
});

//actice class left side end

//actice class right side start
amountsTwo.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (!item.classList.contains("active")) {
      amountsTwo.forEach(function (el) {
        el.classList.remove("active");
      });
      item.classList.add("active");
      valyuta2 = e.target.innerHTML;
      secondConvertFunc();
      render();
      console.log(valyuta2);
    }
  });
});
//actice class right side end

//input validation function start
const regexFunc = (input) => {
  let regexValue = input.value.replace(/[^0-9.,]/g, "");

  regexValue = regexValue.replace(/,/g, ".");

  let dotCount = regexValue.split(".").length - 1;
  if (dotCount > 1) {
    regexValue = regexValue.slice(0, -1);
  }
  return (input.value = regexValue);
};

//input validation function end

//default 1 currency amount start
const render = () => {
  fetch(`${url}/${key}/pair/${valyuta1}/${valyuta2}/10`)
    .then((res) => res.json())
    .then((data) => {
      note1.innerHTML = `1 ${valyuta1} = ${data.conversion_rate} ${valyuta2}`;
      note2.innerHTML = `1 ${valyuta2} = ${(1 / data.conversion_rate).toFixed(
        5
      )} ${valyuta1}`;

      console.log(data);
    })
    .catch((err) => console.log(err));
};
//default 1 currency amount start

//first converterFunc start
const firstConvertFunc = () => {
  regexFunc(firstInput);
  fetch(`${url}/${key}/pair/${valyuta1}/${valyuta2}/${firstInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      secondInput.value = data.conversion_result.toFixed(6);
      note1.innerHTML = `1 ${valyuta1} = ${data.conversion_rate} ${valyuta2}`;
      note2.innerHTML = `1 ${valyuta2} =  ${(1 / data.conversion_rate).toFixed(
        5
      )} ${valyuta1}`;

      console.log(data);
    })
    .catch((err) => console.log(err));
};
//first converterFunc end

//second converterFunc start
const secondConvertFunc = () => {
  regexFunc(secondInput);
  fetch(`${url}/${key}/pair/${valyuta2}/${valyuta1}/${secondInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      firstInput.value = data.conversion_result.toFixed(6);
      note1.innerHTML = `1 ${valyuta2} = ${data.conversion_rate} ${valyuta1}`;
      note2.innerHTML = `1 ${valyuta1} = ${(1 / data.conversion_rate).toFixed(
        5
      )} ${valyuta2}`;
      console.log(valyuta2);
      console.log(data);
    })
    .catch((err) => console.log(err));
};
//second converterFunc end

render();
firstInput.addEventListener("input", firstConvertFunc);
secondInput.addEventListener("input", secondConvertFunc);
