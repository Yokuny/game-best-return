const timmer = document.getElementById("time-display");
const actualAmountElement = document.getElementById("actual-amount");
const moneyEarnings = document.getElementById("coin-per-second");

const gameinfoControl = () => {
  let seconds = 0;
  const getSeconds = () => ++seconds;
  const value = 250;
  const additionValue = 75;
  let profitLvl = 0;
  let profitPercentageLvl = 0;
  let amountToGetLvl = 0;
  let chanceToGetAmountLvl = 0;
  let amountPercentageLvl = 0;
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
  const actualPrice = (valueLvl) => {
    console.log(value * valueLvl + additionValue * valueLvl);
    return value * valueLvl + additionValue * valueLvl;
  };
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
    checkPrice,
    improveProfit,
    improveProfitPercentage,
    improveAmountToGet,
    improveChanceToGetAmount,
    improveAmountPercentage,
    checkPrice,
  };
};
const gameMoneyControl = () => {
  let amount = 500;
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
    chanceToGetMoney += 2.5;
    return chanceToGetMoney;
  };
  const getAmountToGet = () => {
    amountToGet += 100;
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
    return amount.toFixed(2);
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
      break;
    case "profitAmount":
      if (element.className == "upgrade") {
        upgradeProgress(element.querySelector(".progress"), values.improveProfit());
      }
      if (element.className == "profit") {
        element.textContent = state.getProfit();
      }
      break;
    case "chanceToGetMoney":
      if (element.className == "upgrade") {
        upgradeProgress(element.querySelector(".progress"), values.improveChanceToGetAmount());
      }
      if (element.className == "profit") {
        element.textContent = `${state.getChanceToGetMoney()} %`;
      }
      break;
    case "amountToGet":
      if (element.className == "upgrade") {
        upgradeProgress(element.querySelector(".progress"), values.improveAmountToGet());
      }
      if (element.className == "profit") {
        element.textContent = state.getAmountToGet();
      }
      break;
    case "amountPercentage":
      if (element.className == "upgrade") {
        upgradeProgress(element.querySelector(".progress"), values.improveAmountPercentage());
      }
      if (element.className == "profit") {
        element.textContent = `${state.getAmountPercentage()} %`;
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
  setTimeout(actualAmountDisplay, 1000);
}
const timeDisplay = () => {
  timmer.textContent = values.getSeconds();
  setTimeout(timeDisplay, 100);
};
const fillingTable = () => {
  const tableLine = document.querySelectorAll("tr");
  tableLine.forEach((element) => {
    fillingCell(element.querySelector(".upgrade"), element.id);
    fillingCell(element.querySelector(".profit"), element.id);
  });
  actualAmountDisplay();
};

timeDisplay();
fillingTable();
//
function increase(element) {
  const tableLine = element.parentNode.parentNode;
  if (state.getAmount() >= values.checkPrice(tableLine.id)) {
    state.payUpgrade(values.checkPrice(tableLine.id));
    fillingCell(tableLine.querySelector(".upgrade"), tableLine.id);
    fillingCell(tableLine.querySelector(".profit"), tableLine.id);
    moneyEarnings.textContent = state.amountPerSecond();
  }
}
