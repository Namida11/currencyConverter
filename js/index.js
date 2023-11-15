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

const url = "http://api.exchangerate.host/convert";
const key = "be847e0a717e240985d4dfa2033bb229";

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

      console.log(valyuta2);
    }
  });
});
//actice class right side end

//input validation function start
const regexFunc = (input) => {
  let currencyRegex = /^\s*[0-9]*(\.[0-9]{1,6})?\s*$/;
  return currencyRegex.test(input);
};
//input validation function end

//default 1 currency amount start
const render = () => {
  fetch(`${url}?access_key=${key}&from=${valyuta1}&to=${valyuta2}&amount=10`)
    .then((res) => res.json())
    .then((data) => {
      note1.innerHTML = `1 ${valyuta1} = ${data.info.quote} ${valyuta2}`;
      note2.innerHTML = `1 ${valyuta2} = ${(1 / data.info.quote).toFixed(
        5
      )} ${valyuta1}`;

      console.log(data);
    })
    .catch((err) => console.log(err));
};
//default 1 currency amount start

//first converterFunc start
const firstConvertFunc = () => {
  if (regexFunc(firstInput.value)) {
    fetch(
      `${url}?access_key=${key}&from=${valyuta1}&to=${valyuta2}&amount=${firstInput.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        secondInput.value = data.result;
        note1.innerHTML = `1 ${valyuta1} = ${data.info.quote} ${valyuta2}`;
        note2.innerHTML = `1 ${valyuta2} =  ${(1 / data.info.quote).toFixed(
          5
        )} ${valyuta1}`;

        console.log(data);
      })
      .catch((err) => console.log(err));
  } else {
    secondInput.value = "NaN";
    alert("please enter a valid number");
  }
};
//first converterFunc end

//second converterFunc start
const secondConvertFunc = () => {
  if (regexFunc(secondInput.value)) {
    fetch(
      `${url}?access_key=${key}&from=${valyuta2}&to=${valyuta1}&amount=${secondInput.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        firstInput.value = data.result;
        note1.innerHTML = `1 ${valyuta2} = ${data.info.quote} ${valyuta1}`;
        note2.innerHTML = `1 ${valyuta1} = ${(1 / data.info.quote).toFixed(
          5
        )} ${valyuta1}`;

        console.log(data);
      })
      .catch((err) => console.log(err));
  } else {
    firstInput.value = "NaN";
    alert("please enter a valid number");
  }
};
//second converterFunc end

render();
firstInput.addEventListener("input", firstConvertFunc);
secondInput.addEventListener("input", secondConvertFunc);
