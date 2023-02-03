const timmer = document.getElementById("time-display");
const actualAmountElement = document.getElementById("actual-amount");
const moneyEarnings = document.getElementById("coin-per-second");
const startGame = document.getElementById("startGame");
const endGame = document.getElementById("endGame");
const gameinfoControl = () => {
  let seconds = 0,
    timeAmount = 0,
    timeKey = 0,
    refreshKey = 0;
  const getSeconds = () => ++seconds;
  const breakTimeCount = () => {
    clearInterval(timeKey);
    clearInterval(refreshKey);
  };
  const setTime = (value) => (timeAmount = value * 10);
  const decreaseSeconds = () => {
    --timeAmount;
    if (timeAmount <= 0) {
      clearInterval(timeKey);
      clearInterval(refreshKey);
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
  return {
    getSeconds,
    setTime,
    decreaseSeconds,
    saveTimeKey,
    saveRefreshKey,
    breakTimeCount,
    checkPrice,
    improveProfit,
    improveProfitPercentage,
    improveAmountToGet,
    improveChanceToGetAmount,
    improveAmountPercentage,
  };
};
const gameMoneyControl = () => {
  let amount = 100;
  let profit = 0;
  let profitPercentage = 0;
  let chanceToGetMoney = 0;
  let amountToGet = 0;
  let amountPercentage = 0;
  const getProfit = () => {
    profit += 20;
    return profit;
  };
  const getProfitPercentage = () => {
    profitPercentage += 7.5;
    return profitPercentage;
  };
  const getChanceToGetMoney = () => {
    chanceToGetMoney += 2;
    return chanceToGetMoney;
  };
  const getAmountToGet = () => {
    amountToGet += 50;
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
    finalValue += value;
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
  const payUpgrade = (value) => (amount -= value);
  return {
    getProfit,
    getProfitPercentage,
    getAmountPercentage,
    getChanceToGetMoney,
    getAmountToGet,
    amountPerSecond,
    getAmount,
    payUpgrade,
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
  tableLine.forEach((element) => {
    fillingCell(element.querySelector(".upgrade"), element.id);
    fillingCell(element.querySelector(".profit"), element.id);
    fillingCell(element.querySelector(".upgradeCost"), element.id);
  });
  values.saveRefreshKey = setInterval(actualAmountDisplay, 1000);
};
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

const timeDisplay = () => (timmer.textContent = values.decreaseSeconds());
const noTimeDisplay = () => (timmer.textContent = values.getSeconds());
startGame.addEventListener("submit", (e) => {
  e.preventDefault();
  if (document.getElementById("timeAmount").value > 0) {
    values.setTime(document.getElementById("timeAmount").value);
    values.saveTimeKey = setInterval(timeDisplay, 100);
  } else {
    values.saveTimeKey = setInterval(noTimeDisplay, 100);
  }
  fillingTable();
  startGame.style.display = "none";
  endGame.style.display = "flex";
});
endGame.addEventListener("submit", (e) => {
  e.preventDefault();
  let answer = prompt(`Deseja reiniciar ?\ns ou n`);
  if (answer == "s" || answer == "S" || answer == "sim" || answer == "Sim" || answer == "SIM") {
    console.log(answer);
    location.reload();
  }
});
