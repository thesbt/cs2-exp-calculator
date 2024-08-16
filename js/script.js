const experiencePoints = document.getElementById("experiencePoints");
const experienceInput = document.getElementById("experienceInput");
const gameModes = document.getElementsByName("gameMode");
const boostOptions = document.getElementsByName("boost");
const result = document.getElementById("levelResult");

function updateSliderValue(value) {
    if (value === '' || isNaN(value)) {
        experienceInput.value = '';
    } else {
        let parsedValue = parseInt(value);
        parsedValue = Math.min(5000, parsedValue);
        experienceInput.value = parsedValue;
    }
}

function updateSliderColor(value) {
    var slider = document.getElementById("experiencePoints");
    var percentage = (value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = 'linear-gradient(to right, #f89e19 ' + percentage + '%, #fff ' + percentage + '%, #fff 100%)';
}

function updateSliderColorAndValue(value) {
    updateSliderColor(value);
    updateSliderValue(value);
}

function updateSliderFromInput(inputElement) {
    var slider = document.getElementById("experiencePoints");
    var inputValue = parseInt(inputElement.value);

    if (inputValue < parseInt(slider.min)) {
        inputValue = parseInt(slider.min);
    } else if (inputValue > parseInt(slider.max)) {
        inputValue = parseInt(slider.max);
    }

    slider.value = inputValue;
    updateSliderColorAndValue(inputValue);
}

//XP CALCULATIONS

function calculateLevel() {
    const experience = parseInt(experiencePoints.value);
    const selectedMode = Array.from(gameModes).find((mode) => mode.checked).value;
    const selectedBoost = Array.from(boostOptions).find((boost) => boost.checked).value;

    let requiredPoints = 0;

    if (selectedMode === "deathmatch") {
        requiredPoints = Math.ceil(calculateDeathmatchXP(experience, selectedBoost));
        result.innerHTML = `Ölüm Maçı ya da Silah Yarışı modunda <nobr class="dynamic-content"> ${requiredPoints}</nobr>  puan kazanarak level atlayabilirsiniz.`;
    } else if (selectedMode === "casual") {
        requiredPoints = Math.ceil(calculateCasualXP(experience, selectedBoost));
        result.innerHTML = `Basit Eğlence modunda <nobr class="dynamic-content"> ${requiredPoints}</nobr> puan kazanarak level atlayabilirsiniz.`;
    } else if (selectedMode === "competitive") {
        requiredPoints = calculateCompetitiveXP(experience, selectedBoost);
        result.innerHTML = `Rekabetçi ya da Seçkin modunda <nobr class="dynamic-content"> ${requiredPoints}</nobr> round kazanarak level atlayabilirsiniz.`;
    } else if (selectedMode === "wingman") {
        requiredPoints = Math.ceil(calculateWingmanXP(experience, selectedBoost));
        result.innerHTML = `Yoldaş modunda <nobr class="dynamic-content"> ${requiredPoints}</nobr> round kazanarak level atlayabilirsiniz.`;
    }

}

function calculateDeathmatchXP(experience, boostType) {
    let xp = 0;
    if (boostType === "1x") {
        xp = (5000 - experience) * 5;
    } else if (boostType === "1x+1x") {
        xp = (5000 - experience) * (5 / 2);
    } else if (boostType === "1x+3x") {
        xp = (5000 - experience) * (5 / 4);
    }
    return xp;
}

function calculateCasualXP(experience, boostType) {
    let xp = 0;
    if (boostType === "1x") {
        xp = (5000 - experience) / 4;
    } else if (boostType === "1x+1x") {
        xp = (5000 - experience) / 8;
    } else if (boostType === "1x+3x") {
        xp = (5000 - experience) / 16;
    }
    return xp;
}

function calculateCompetitiveXP(experience, boostType) {
    let xp = 0;
    if (boostType === "1x") {
        xp = Math.ceil((5000 - experience) / 30);
    } else if (boostType === "1x+1x") {
        xp = Math.ceil((5000 - experience) / 60);
    } else if (boostType === "1x+3x") {
        xp = Math.ceil((5000 - experience) / 120);
    }
    return xp;
}

function calculateWingmanXP(experience, boostType) {
    let xp = 0;
    if (boostType === "1x") {
        xp = (5000 - experience) / 15;
    } else if (boostType === "1x+1x") {
        xp = (5000 - experience) / 30;
    } else if (boostType === "1x+3x") {
        xp = (5000 - experience) / 60;
    }
    return xp;
}

//YILI AL 

const yearSpan = document.querySelector('#currentYear');
const currentYear = new Date();
yearSpan.innerHTML = currentYear.getFullYear();