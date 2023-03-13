const image = document.getElementById("image");
const typeAButton = document.getElementById("typeA");
const typeBButton = document.getElementById("typeB");
const typeCButton = document.getElementById("typeC");
const nextButton = document.getElementById("next");
const optionButtons = document.querySelectorAll(".options");

const imagePaths = [];
let userScore = 0;
let cnnScore = 0;
let outOf = 0


fetch('./data/images/')
    .then(response => response.text())
    .then(text => {
        const parser = new DOMParser();
        const html = parser.parseFromString(text, 'text/html');
        const images = html.querySelectorAll('a[href$=".jpg"], a[href$=".png"], a[href$=".gif"]');
        outOf = images.length;
        console.log(outOf)
        images.forEach(image => {
            const imagePath = image.getAttribute('href');
            imagePaths.push(imagePath);
        });
        updateScoreDisplay()
    })
    .catch(error => console.error(error));

const actualTypeUrl = './data/actual_results/actual_types.csv';
let actualTypes = [];

const actualTypesPromise = fetch(actualTypeUrl)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.split('\n').slice(1);
    const types = rows[0].split(',')
    actualTypes = types
    console.log(actualTypes)
  })
  .catch(error => console.error(error));

  const cnnTypeUrl = './data/cnn_results/cnn_types.csv';
  let cnnTypes = [];
  
  const cnnTypesPromise = fetch(cnnTypeUrl)
    .then(response => response.text())
    .then(csv => {
      const rows = csv.split('\n').slice(1);
      const types = rows[0].split(',')
      cnnTypes = types
      console.log(cnnTypes)
    })
    .catch(error => console.error(error));
    const typeButtons = {
        'Type A': typeAButton,
        'Type B': typeBButton,
        'Type C': typeCButton
      };
      
      optionButtons.forEach(button => {
        button.addEventListener("click", buttonClickHandler);
      });
      
let currentImageIndex = 0;

nextButton.addEventListener("click", function() {
    // console.log(currentImageIndex);
    currentImageIndex++;
    optionButtons.forEach(button => {
        button.classList.remove('correct')
        button.classList.remove('cnn')
        button.classList.remove('incorrect')
        button.addEventListener('click', buttonClickHandler);
    })
    // console.log(currentImageIndex);
    if (currentImageIndex === imagePaths.length) {
        currentImageIndex = 0;
        nextButton.textContent = "Restart"
    } else {
        nextButton.textContent = "Continue to next image"
    }
    if (currentImageIndex === 1) {
        userScore = 0;
        cnnScore = 0;
        updateScoreDisplay()
    }
    image.src = imagePaths[currentImageIndex];
});

function buttonClickHandler() {
    const actualType = actualTypes[currentImageIndex];
    const cnnType = cnnTypes[currentImageIndex];
    const textContent = this.textContent;
    if ((textContent != actualType) & (textContent != cnnType)) {
        this.classList.add('incorrect')
    }
    if (typeButtons[cnnType]) {
        typeButtons[cnnType].classList.add('cnn');
        if (cnnType === actualType) {
            cnnScore++;
            console.log(cnnScore)
        }
    }
    if (typeButtons[actualType]) {
        typeButtons[actualType].classList.add('correct');
        if (textContent === actualType) {
            userScore++;
            console.log(userScore)
        }
    }
    

    optionButtons.forEach(button => {
        button.removeEventListener('click', buttonClickHandler);
    })
    updateScoreDisplay()
  }

  const userScoreDisplay = document.getElementById("user-score");
  const cnnScoreDisplay = document.getElementById("cnn-score");
  
  function updateScoreDisplay() {
    userScoreDisplay.textContent = `User Score: ${userScore}/${outOf}`;
    cnnScoreDisplay.textContent = `CNN Score: ${cnnScore}/${outOf}`;
  }

