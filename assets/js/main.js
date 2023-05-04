const CHAT_ID = -724619793,
  BOT_TOKEN = "5418363359:AAE36VenQBinzZh-x9-d7j0aqITdggxKYK8";

const messageText = "Hello,%0This is a new line.\nThis is another new line.";

const [signup, quiz, results] = [
    document.querySelector("#signup"),
    document.querySelector("#quiz"),
    document.querySelector("#results"),
  ],
  form = document.forms[0],
  phoneRegexp = /^(\+?\d{1,2}\s?)?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/,
  startButton = document.querySelector("#submit");
var data = {},
  questions,
  finishButton;

fetch("assets/js/questions.json")
  .then((response) => response.json())
  .then((r) => {
    questions = r.questions;
    makeQuiz(r.questions);
  })
  .catch((error) => console.log("Error:", error));

function makeQuiz(questions) {
  var lastQuestionIndex = questions.length - 1;
  questions.forEach((question, index) => {
    var options = "";
    question.options.forEach((option, i) => {
      option.id = index + "" + i + 1;
      var template = `
            <label for="${option.id}">
            <div class="option">
              <input type="radio" name="answer${index}" id="${option.id}" data-point="${option.point}" />
              <span
                >${option.name}</span
              >
            </div>
          </label>
            `;
      options += template;
    });
    var template = `
        <div class="col">
        <div class="card">
          <span class="title">${question.question} </span>
          <div class="options">
           ${options}
          </div>
          ${
            index == lastQuestionIndex
              ? '<button class="btn" type="button" style="margin-top: 10px" id="finishButton" onclick="checkQuiz()">Tugatish</button>'
              : ""
          }
        </div>
      </div>
        `;
    quiz.querySelector(".row").innerHTML += template;
  });
}

function checkQuiz() {
  var points = 0,
    answers = [];
  quiz.querySelectorAll(".card").forEach((item, index) => {
    try {
      item.classList.remove("error");
      var checked = item.querySelector("input:checked");
      points = points + +checked.dataset.point;
      answers.push(item.querySelector("input:checked ~ span").innerText);
    } catch (er) {
      item.classList.add("error");
      alert(`${index + 1}-savolga javob berilmagan`);
    }
  });
  if (answers.length == questions.length) {
    showResults(points, answers);
  }
}

function showResults(p, a) {
  data["finished_at"] = new Date()
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
  __swap(quiz, results);
  document.querySelector("#result").innerText = p;
  var messageText = `Ism: ${data["name"]}%0AFamiliya: ${data["surname"]}%0ABall: ${p}%0ABoshladi: ${data["started_at"]}%0ATugatdi: ${data["finished_at"]}`;
  const apiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${messageText}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log("Error:", error));
}

function __swap(a, b) {
  a.classList.remove("show");
  a.classList.add("hide");
  b.classList.remove("hide");
  b.classList.add("show");
}

startButton.onclick = function (event) {
  event.preventDefault();
  const [name, surname, number] = [
    form.name.value,
    form.surname.value,
    form.number.value,
  ];
  if (name && surname && number) {
    if (!phoneRegexp.test(number)) {
      alert("Telefon raqam xato");
      return;
    }
    data["name"] = name;
    data["surname"] = surname;
    data["number"] = number;
    startQuiz();
  } else {
    alert();
  }
};

function startQuiz() {
  __swap(signup, quiz);
  data["started_at"] = new Date()
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
}
