const image = document.getElementById("image");
const typeAButton = document.getElementById("typeA");
const typeBButton = document.getElementById("typeB");
const typeCButton = document.getElementById("typeC");
const nextButton = document.getElementById("next");
const optionButtons = document.querySelectorAll(".options");

const imagePaths = [];
const typeButtons = {
    'Type A': typeAButton,
    'Type B': typeBButton,
    'Type C': typeCButton
  };

let userScore = 0;
let cnnScore = 0;
let outOf = 10;

// const actualTypeUrl = './data/actual_results/actual_types.csv';
const actualTypes = ['Type B', 'Type C', 'Type A', 'Type A', 'Type C', 'Type B', 'Type B', 'Type C', 'Type C', 'Type C'];
const cnnTypes = ['Type A', 'Type A', 'Type C', 'Type B', 'Type C', 'Type A', 'Type B', 'Type C', 'Type A', 'Type C'];

for (i = 0; i < 10; i++) {
    imagePaths.push(`./data/images/${i+1}.png`)
}

let currentImageIndex = 1;

optionButtons.forEach(button => {
    button.classList.remove('correct')
    button.classList.remove('cnn')
    button.classList.remove('incorrect')
    button.addEventListener('click', buttonClickHandler);
})

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
    const actualType = actualTypes[currentImageIndex - 1];
    const cnnType = cnnTypes[currentImageIndex - 1];
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

updateScoreDisplay()