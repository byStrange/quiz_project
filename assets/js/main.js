const [signup, quiz, results] = [
    document.querySelector("#signup"),
    document.querySelector("#quiz"),
    document.querySelector("#results"),
  ],
  form = document.forms[0],
  phoneRegexp = /^(\+?\d{1,2}\s?)?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/,
  startButton = document.querySelector("#submit"),
  finishButton = document.querySelector("#finish");
var data = {};

fetch("assets/js/questions.json")
  .then((response) => response.json())
  .then((r) => {
    makeQuiz(r.questions)
  })
  .catch((error) => console.log("Error:", error));

function makeQuiz(questions) {
    questions.forEach((question, index, array) => {
        var options = "";
        question.options.forEach(option => {
            var template = `
            <label for="${option.id}">
            <div class="option">
              <input type="radio" name="answer" id="${option.id}" data-point="${option.point}" />
              <span
                >${ option.name }</span
              >
            </div>
          </label>
            `
            options+=template;
        } )
        var template = `
        <div class="col">
        <div class="card">
          <span class="title">${question.question} </span>
          <div class="options">
           ${options}
          </div>
        </div>
      </div>
        `
        console.log(template)
        quiz.querySelector(".row").innerHTML += template;
    })
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
  signup.classList.remove("show");
  signup.classList.add("hide");
  quiz.classList.add("show");
  quiz.classList.remove("hide");
}
