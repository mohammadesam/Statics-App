import Mean from "./Mean.js";
import Median from "./Median.js";
import Mode from "./Mode.js";
let samplesContainer = document.getElementsByClassName("sample-list")[0];
let inputFeild = document.getElementById("input_feild");
let addNumberBtn = document.getElementById("add_number_btn");
let typesContainer = document.getElementsByClassName("calc-types")[0];
let calcBtn = document.getElementsByClassName("calc-btn")[0];
let resultScreen = document.getElementsByClassName("screen")[0];
let showDetailsBtn = document.getElementsByClassName("showDetails")[0];

let selectedType = "Mean";
let specificType = "";
let sample = [];
let detailedAnswer = false;

function addNumberToSample() {
  if (inputFeild.value == "") return;
  sample.push(Number(inputFeild.value));
  updateSampleContainer(sample);
  inputFeild.value = "";
}
addNumberBtn.addEventListener("click", addNumberToSample);
inputFeild.addEventListener("keypress", (e) => {
  if (e.key == "Enter") addNumberToSample();
});
function updateSampleContainer(sample) {
  samplesContainer.innerHTML = "";
  for (let value of sample) {
    let div = document.createElement("div");
    let removeBtn = document.createElement("span");
    removeBtn.className = "remove";
    div.className = "value";
    removeBtn.innerHTML = "X";
    div.innerHTML = value;

    removeBtn.addEventListener("click", (e) => {
      let index = sample.indexOf(e.target.innerHTML);
      sample.splice(index, 1);
      updateSampleContainer(sample);
    });
    div.appendChild(removeBtn);
    samplesContainer.appendChild(div);
  }
  // if there are no values show descriptive text

  if (!sample.length) {
    let label = document.createElement("div");
    label.className = "label";
    label.innerHTML = "No Values!!";
    samplesContainer.appendChild(label);
  }
}

for (let type of typesContainer.children) {
  type.addEventListener("click", (e) => {
    selectedType = e.target.dataset.type;
    specificType = e.target.innerHTML;
    console.log(selectedType);
    for (let type of typesContainer.children) {
      type.classList.remove("selected");
    }
    e.target.classList.add("selected");
  });
}

calcBtn.addEventListener("click", () => {
  switch (selectedType) {
    case "Mean":
      {
        let a = new Mean(sample, specificType);
        printResult(a.calcMean(), detailedAnswer);
      }
      break;

    case "median":
      {
        let a = new Median(sample);
        printResult(a.normalMedian(), detailedAnswer);
      }
      break;

    case "mode":
      {
        let a = new Mode(sample);
        let modes = a.normalMode();
        console.log(typeof modes);
        if (typeof modes != "object") {
          printResult(modes, true); //todo have to be fixed
          break;
        }
        let str = "";
        for (let mode of modes) {
          str += mode.value + " , ";
        }
        resultScreen.innerHTML =
          "the Mode is  : " +
          str +
          "and it is repeated " +
          modes[0].quantity +
          " times";
      }
      break;
  }
});

function printResult(result, details = false) {
  if (!details) {
    resultScreen.classList.remove("expanded");
    resultScreen.getElementsByClassName("resultBar")[0].innerHTML =
      result["solution"];
    return;
  }
  resultScreen.classList.add("expanded");
  let finalResult = "";
  for (let res in result) [(finalResult += `${res} : ${result[res]} <br>`)];
  resultScreen.getElementsByClassName("resultBar")[0].innerHTML = finalResult;
}

showDetailsBtn.addEventListener("click", () => {
  detailedAnswer = !detailedAnswer;
  if (detailedAnswer) showDetailsBtn.style.transform = "rotate(180deg)";
  else showDetailsBtn.style.transform = "rotate(0deg)";
  calcBtn.click();
});
