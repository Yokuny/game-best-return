const timmer = document.getElementById("time-display");
const actualAmountElement = document.getElementById("actual-amount");
const moneyEarnings = document.getElementById("coin-per-second");
const startGame = document.getElementById("startGame");
const endGame = document.getElementById("endGame");
const gameinfoControl = () => {
  let seconds = 0,
    timeAmount = 0;
  let timeKey, refreshKey;
  function breakTimeCount() {
    clearInterval(timeKey);
    clearInterval(refreshKey);
    disableButtons(document.querySelectorAll("button.invest"));
  }
  const setTime = (value) => (timeAmount = value * 10);
  const getSeconds = () => {
    ++seconds;
    if (seconds >= 1000) {
      breakTimeCount();
    }
    return seconds;
  };
  const decreaseSeconds = () => {
    --timeAmount;
    if (timeAmount <= 0) {
      breakTimeCount();
    }
    return timeAmount;
  };
  const saveTimeKey = (key) => (timeKey = key);
  const saveRefreshKey = (key) => (refreshKey = key);
  const value = 250;
  const additionValue = 75;
  let profitLvl = 0,
    profitPercentageLvl = 0,
    amountToGetLvl = 0,
    chanceToGetAmountLvl = 0,
    amountPercentageLvl = 0;
  const improveProfit = () => {
    ++profitLvl;
    return profitLvl * 4.5;
  };
  const improveProfitPercentage = () => {
    ++profitPercentageLvl;
    return profitPercentageLvl * 4.5;
  };
  const improveAmountToGet = () => {
    ++amountToGetLvl;
    return amountToGetLvl * 4.5;
  };
  const improveChanceToGetAmount = () => {
    ++chanceToGetAmountLvl;
    return chanceToGetAmountLvl * 4.5;
  };
  const improveAmountPercentage = () => {
    ++amountPercentageLvl;
    return amountPercentageLvl * 4.5;
  };
  const actualPrice = (valueLvl) => value * valueLvl + additionValue * valueLvl;
  const checkPrice = (id) => {
    switch (id) {
      case "profitAmount":
        return actualPrice(profitLvl);
      case "profitPercentage":
        return actualPrice(profitPercentageLvl);
      case "amountToGet":
        return actualPrice(amountToGetLvl);
      case "chanceToGetMoney":
        return actualPrice(chanceToGetAmountLvl);
      case "amountPercentage":
        return actualPrice(amountPercentageLvl);
      default:
        break;
    }
  };
  const reset = () => {
    breakTimeCount();
    profitLvl = 0;
    profitPercentageLvl = 0;
    amountToGetLvl = 0;
    chanceToGetAmountLvl = 0;
    amountPercentageLvl = 0;
    seconds = 0;
    timeAmount = 0;
    timeKey = 0;
    refreshKey = 0;
  };
  return {
    getSeconds,
    setTime,
    decreaseSeconds,
    saveTimeKey,
    saveRefreshKey,
    improveProfit,
    improveProfitPercentage,
    improveAmountToGet,
    improveChanceToGetAmount,
    improveAmountPercentage,
    checkPrice,
    reset,
  };
};
const gameMoneyControl = () => {
  let amount = 100;
  let profit = 0;
  let profitPercentage = 0;
  let chanceToGetMoney = 0;
  let amountToGet = 0;
  let amountPercentage = 0;
  let gameFinalAmount = 0;
  const getProfit = () => {
    profit += 12.5;
    return profit;
  };
  const getProfitPercentage = () => {
    profitPercentage += 2;
    return profitPercentage;
  };
  const getChanceToGetMoney = () => {
    chanceToGetMoney += 1.25;
    return chanceToGetMoney;
  };
  const getAmountToGet = () => {
    amountToGet += 20;
    return amountToGet;
  };
  const getAmountPercentage = () => {
    amountPercentage += 0.1;
    return amountPercentage.toFixed(1);
  };
  const amountPerSecond = () => {
    let value, finalValue;
    finalValue = profit + profit * (profitPercentage / 100);
    value = getAmount() * (amountPercentage / 100);
    return finalValue.toFixed(0);
  };
  function chance(chance) {
    if (100 * Math.random() < chance) {
      return true;
    }
  }
  const getAmount = () => {
    let profitResult = profit + profit * (profitPercentage / 100);
    let amountFinal = amount;
    if (chance(chanceToGetMoney)) {
      amountFinal += amountToGet;
    }
    amountFinal += profitResult;
    amount = amountFinal + amountFinal * (amountPercentage / 100);
    return amount.toFixed(0);
  };
  const payUpgrade = (value) => {
    gameFinalAmount += amount;
    amount -= value;
  };
  const getFinalAmount = () => {
    gameFinalAmount += amount;
    return gameFinalAmount.toFixed(0);
  };
  const reset = () => {
    amount = 100;
    profit = 0;
    profitPercentage = 0;
    chanceToGetMoney = 0;
    amountToGet = 0;
    amountPercentage = 0;
    gameFinalAmount = 0;
  };
  return {
    getProfit,
    getProfitPercentage,
    getAmountPercentage,
    getChanceToGetMoney,
    getAmountToGet,
    amountPerSecond,
    getAmount,
    payUpgrade,
    getFinalAmount,
    reset,
  };
};
const state = gameMoneyControl();
const values = gameinfoControl();

const upgradeProgress = (bar, progress) => {
  bar.style.width = `${progress}%`;
};
const fillingCell = (element, id) => {
  switch (id) {
    case "profitPercentage":
      if (element.className == "upgrade") {
        upgradeProgress(element.querySelector(".progress"), values.improveProfitPercentage());
      }
      if (element.className == "profit") {
        element.textContent = `${state.getProfitPercentage()} %`;
      }
      if (element.className == "upgradeCost") {
        element.textContent = `${values.checkPrice(id)}`;
      }
      break;
    case "profitAmount":
      if (element.className == "upgrade") {
        upgradeProgress(element.querySelector(".progress"), values.improveProfit());
      }
      if (element.className == "profit") {
        element.textContent = state.getProfit();
      }
      if (element.className == "upgradeCost") {
        element.textContent = `${values.checkPrice(id)}`;
      }
      break;
    case "chanceToGetMoney":
      if (element.className == "upgrade") {
        upgradeProgress(element.querySelector(".progress"), values.improveChanceToGetAmount());
      }
      if (element.className == "profit") {
        element.textContent = `${state.getChanceToGetMoney()} %`;
      }
      if (element.className == "upgradeCost") {
        element.textContent = `${values.checkPrice(id)}`;
      }
      break;
    case "amountToGet":
      if (element.className == "upgrade") {
        upgradeProgress(element.querySelector(".progress"), values.improveAmountToGet());
      }
      if (element.className == "profit") {
        element.textContent = state.getAmountToGet();
      }
      if (element.className == "upgradeCost") {
        element.textContent = `${values.checkPrice(id)}`;
      }
      break;
    case "amountPercentage":
      if (element.className == "upgrade") {
        upgradeProgress(element.querySelector(".progress"), values.improveAmountPercentage());
      }
      if (element.className == "profit") {
        element.textContent = `${state.getAmountPercentage()} %`;
      }
      if (element.className == "upgradeCost") {
        element.textContent = `${values.checkPrice(id)}`;
      }
      break;
    default:
      element.textContent = "error on render";
      break;
  }
};
function actualAmountDisplay() {
  actualAmountElement.textContent = state.getAmount();
  moneyEarnings.textContent = state.amountPerSecond();
  actualAmountElement.style.color = "#000";
}
const fillingTable = () => {
  const tableLine = document.querySelectorAll("tr");
  enableButtons(document.querySelectorAll("button.invest"));
  tableLine.forEach((element) => {
    fillingCell(element.querySelector(".upgrade"), element.id);
    fillingCell(element.querySelector(".profit"), element.id);
    fillingCell(element.querySelector(".upgradeCost"), element.id);
  });
  values.saveRefreshKey(setInterval(actualAmountDisplay, 1000));
};
const finalAmount = () => {
  actualAmountElement.textContent = `${state.getFinalAmount()}`;
  actualAmountElement.style.color = "#6495ed";
};
const enableButtons = (buttonsActivation) => {
  buttonsActivation.forEach((button) => {
    button.disabled = false;
  });
};
const disableButtons = (buttonsActivation) => {
  buttonsActivation.forEach((button) => {
    button.disabled = true;
  });
  finalAmount();
};
const switchToResetBtn = () => {
  startGame.style.display = "none";
  endGame.style.display = "flex";
};
const switchToStartBtn = () => {
  startGame.style.display = "flex";
  endGame.style.display = "none";
};
const timeDisplay = () => (timmer.textContent = values.decreaseSeconds());
const noTimeDisplay = () => (timmer.textContent = values.getSeconds());
// funções externas
function increase(element) {
  const tableLine = element.parentNode.parentNode;
  if (state.getAmount() >= values.checkPrice(tableLine.id)) {
    state.payUpgrade(values.checkPrice(tableLine.id));
    fillingCell(tableLine.querySelector(".upgrade"), tableLine.id);
    fillingCell(tableLine.querySelector(".profit"), tableLine.id);
    fillingCell(tableLine.querySelector(".upgradeCost"), tableLine.id);
    moneyEarnings.textContent = state.amountPerSecond();
    actualAmountElement.style.color = "#9acd32";
  } else {
    actualAmountElement.style.color = "#dc143c";
  }
}
startGame.addEventListener("submit", (e) => {
  e.preventDefault();
  if (document.getElementById("timeAmount").value > 0) {
    values.setTime(document.getElementById("timeAmount").value);
    values.saveTimeKey(setInterval(timeDisplay, 100));
  } else {
    values.saveTimeKey(setInterval(noTimeDisplay, 100));
  }
  fillingTable();
  switchToResetBtn();
});
endGame.addEventListener("submit", (e) => {
  e.preventDefault();
  disableButtons(document.querySelectorAll("button.invest"));
  switchToStartBtn();
  state.reset();
  values.reset();
});
