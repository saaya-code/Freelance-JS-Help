HTMLElement.prototype.appendFirst = function(childNode) {
    if (this.firstChild) {
        this.insertBefore(childNode, this.firstChild);
    }
    else {
        this.appendChild(childNode);
    }
}

function getSelectedRadioButtons() {
    var selectedRadioButtons = [];
    var radioButtons = document.querySelectorAll('input[type="radio"]:checked');

    radioButtons.forEach(function(radioButton) {
        selectedRadioButtons.push(radioButton.value);
    });

    return selectedRadioButtons;
}

// Example usage:
var selectedRadios = getSelectedRadioButtons();
console.log(selectedRadios);

function getRadioButtons() {
    var radioButtons = document.querySelectorAll('input[type="radio"]');
    var radioButtonDict = {};

    radioButtons.forEach(function(radioButton) {
        var name = radioButton.name;
        if (!radioButtonDict[name]) {
            radioButtonDict[name] = [];
        }
        radioButtonDict[name].push(radioButton);
    });

    return radioButtonDict;
}
function addAnswer() {
    // Code to add answer options dynamically
    var answerOptionsDiv = document.getElementById("answerOptions");
    var answerInput = document.createElement("input");
    answerInput.type = "text";
    answerInput.className = "answer";
    var addAnswerButton = document.getElementById("addAnswers");
    addAnswerButton.disabled = false;
    
    var answerFormat = document.getElementById("answerFormat").value;
    
    if (answerFormat === "single" || answerFormat === "multi") {
        var correctInput = document.createElement("input");
        if (answerFormat === "single") {
            answerInput.placeholder = "Enter answer option";
            correctInput.type = "radio";
            correctInput.name = "correctAnswer";
        } else if (answerFormat === "multi") {
            correctInput.type = "checkbox";
            correctInput.name = "correctAnswer";
        }
        correctInput.value = answerInput.value;

        answerOptionsDiv.appendChild(answerInput);
        answerOptionsDiv.appendChild(correctInput);

        // Clear the input field after adding an answer
        answerInput.value = "";
    } else if (answerFormat === "field") {
        answerInput.placeholder = "Enter the correct answer";
        answerInput.id = "fieldAnswer";
        addAnswerButton.disabled = true;
        answerOptionsDiv.appendChild(answerInput);
    } else if (answerFormat === "select") {
        //add a text saying select <number of the select menu>
        var selectNumber = document.getElementsByClassName("answer").length + 1;
        // create a label 
        // create a button so when user clicks it it add a radio button it's value is the value of the selectInput
        var selectLabel = document.createElement("label");
        selectLabel.innerHTML = "<b>Select " + selectNumber + " : <b/>";
        selectLabel.className = "answer";
        answerOptionsDiv.appendChild(selectLabel);
        //create a text input
        if(!document.getElementById("addSelectOption")){
            var selectButton = document.createElement("button");
            selectButton.innerText = "Add option";
            selectButton.className = "answer_button";
            selectButton.type = "button";
            selectButton.id = "addSelectOption";
            document.getElementById("btns").appendFirst(selectButton);
        }else{
            selectButton = document.getElementById("addSelectOption");
        }
        if(!document.getElementById("selectInput_option")){
        var selectInput = document.createElement("input");
        selectInput.type = "text";
        selectInput.className = "answer_input";
        selectInput.placeholder = "Enter new option";
        selectInput.id = "selectInput_option";
        answerOptionsDiv.appendChild(selectInput);
        }else{
            selectInput = document.getElementById("selectInput_option");
        }


        selectButton.onclick = function (event) {
            var selectRadio = document.createElement("input");
            selectRadio.type = "radio";
            selectRadio.name = "answer"+document.getElementsByClassName("answer").length;
            selectRadio.value = selectInput.value;
            var optionLabel = document.createElement("label");
            optionLabel.innerText = selectInput.value;
            optionLabel.className = "answer_label";
            answerOptionsDiv.appendChild(optionLabel);
            answerOptionsDiv.appendChild(selectRadio);
            selectInput.value = "";
        }

        
    }
}

function generateCodeSelect() {
    var question = document.getElementById("question").value;
    var syllabus = document.getElementById("syllabus").value;
    var syllabusLink = document.getElementById("syllabus-link").value;
    var answerFormat = document.getElementById("answerFormat").value;
    let answers = getRadioButtons();
    let correctAnswers = getSelectedRadioButtons();

    var generatedCode =
        '<div data-syllabus="' +
        syllabus +
        '" data-syllabus-link="' +
        syllabusLink +
        '" class="question__box"';
        for (var i = 0; i < correctAnswers.length; i++) {
            generatedCode += " data-correct-" + (i + 1) + '="' + correctAnswers[i] + '"';
        }


    generatedCode += '>\n';
    generatedCode += '  <div class="question__progress">Quesion 3 of 10</div>\n';
    generatedCode += '  <h2 class="question__title">\n    ' + question + '\n  </h2>\n';
    generatedCode += '  <ul class="question__select-list">\n';

    var answerOptions = document.getElementsByClassName("answer");
    console.log(answers["answer1"])

    for (var i = 0; i < answerOptions.length; i++) {
        generatedCode += '    <li>\n';
        generatedCode += '      ' + (i + 1) + '.\n';
        generatedCode += '      <select class="question__select">\n';
        generatedCode += '        <option value="" selected disabled>Select an option</option>\n';
        answers["answer"+(i+1)].forEach(function (answer) {
            generatedCode += '        <option value="' + answer.value + '">' + answer.value + '</option>\n';
        });

        generatedCode += '      </select>\n';
        generatedCode += '    </li>\n';
    }

    generatedCode += '  </ul>\n</div>';

    return generatedCode;
}

function generateCodeField() {
    var question = document.getElementById("question").value;
    var syllabus = document.getElementById("syllabus").value;
    var syllabusLink = document.getElementById("syllabus-link").value;
    var generatedCode =
        '<div data-syllabus="' +
        syllabus +
        '" data-syllabus-link="' +
        syllabusLink +
        '" class="question__box"' +
        ' data-correct-1="' + document.getElementById("fieldAnswer").value + '"';


    generatedCode += '>\n';
    generatedCode += '  <div class="question__progress"></div>\n';
    generatedCode += '  <h2 class="question__title">\n    ' + question + '\n  </h2>\n';
    generatedCode += '  <ul class="question__select-list">\n';
    generatedCode += '    <li>\n';
    generatedCode += '      1.\n';
    generatedCode += '      <input class="question__textbox" type="text" />\n';
    generatedCode += '    </li>\n';
    generatedCode += '  </ul>\n</div>';

    return generatedCode;
}

function generateCode() {
    var answerFormat = document.getElementById("answerFormat").value;
    if (answerFormat === "single" || answerFormat === "multi") {
        // Code for single or multi format
        var question = document.getElementById("question").value;
        var syllabus = document.getElementById("syllabus").value;
        var syllabusLink = document.getElementById("syllabus-link").value;
        var showImage = document.getElementById("image").checked;
        var imageLink = document.getElementById("image-path").value;
        var answerOptions = document.getElementsByClassName("answer");
        var correctAnswers = [];

        // Find the selected correct answers
        var correctInputs = document.getElementsByName("correctAnswer");
        for (var i = 0; i < correctInputs.length; i++) {
            if (correctInputs[i].checked) {
                correctAnswers.push(answerOptions[i].value);
            }
        }

        // Code generation logic based on selected answer format
        var generatedCode =
            '<div data-syllabus="' +
            syllabus +
            '" data-syllabus-link="' +
            syllabusLink +
            '" class="question__box"';

        // Assign correct answers to data attributes
        if (answerFormat === "single") {
            generatedCode += ' data-correct-1="' + correctAnswers[0] + '"';
        } else if (answerFormat === "multi") {
            for (var i = 0; i < correctAnswers.length; i++) {
                generatedCode +=
                    " data-correct-" + (i + 1) + '="' + correctAnswers[i] + '"';
            }
        }

        generatedCode += ">\n";
        generatedCode += '  <div class="question__progress">Quesion 3 of 10</div>\n';
        generatedCode += '  <h2 class="question__title">\n    ' + question + '\n  </h2>\n';
        generatedCode += '  <div class="question__questions">\n';

        if (showImage && imageLink.trim() !== "") {
            generatedCode +=
                '  <div class="question__image-wrap">\n' +
                '    <img class="question__image" src="' +
                imageLink +
                '" alt="" />\n' +
                '    <button class="close-image-js exam__popup-close"></button>\n' +
                "  </div>\n";
        }

        for (var i = 0; i < answerOptions.length; i++) {
            generatedCode += "    <label>\n";
            generatedCode +=
                '      <input class="question__' +
                (answerFormat === "single" ? "radio" : "checkbox") +
                '" type="' +
                (answerFormat === "single" ? "radio" : "checkbox") +
                '" />\n';
            generatedCode +=
                "      <span>" + answerOptions[i].value + "</span>\n";
            generatedCode += "    </label>\n";
        }

        generatedCode += "  </div>\n</div>";

        // Display the generated code
        document.getElementById("generatedCode").innerText = generatedCode;
    } else if (answerFormat === "field") {
        var generatedCodeField = generateCodeField();
        document.getElementById("generatedCode").innerText = generatedCodeField;
    } else if (answerFormat === "select") {
        var generatedCodeSelect = generateCodeSelect();
        document.getElementById("generatedCode").innerText = generatedCodeSelect;
    }
}
