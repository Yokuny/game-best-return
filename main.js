const timmer = document.getElementById("time-display");
const actualAmountElement = document.getElementById("actual-amount");
const moneyEarnings = document.getElementById("coin-per-second");
const gameinfoControl = () => {
  let seconds = 0;
  const getSeconds = () => {
    ++seconds;
    return seconds;
  };
  return {
    getSeconds,
  };
};
const gameMoneyControl = () => {
  let amount = 500;
  let profitPercentage = 0;
  let profit = 0;
  let chanceToGetMoney = 0;
  let amountToGet = 0;
  let amountPercentage = 0;
  const getProfit = () => {
    profit += 50;
    return profit;
  };
  const getProfitPercentage = () => {
    profitPercentage += 5;
    return profitPercentage;
  };
  const getAmountPercentage = () => {
    amountPercentage += 1;
    return amountPercentage;
  };
  const getChanceToGetMoney = () => {
    chanceToGetMoney += 5;
    return chanceToGetMoney;
  };
  const getAmountToGet = () => {
    amountToGet += 150;
    return amountToGet;
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
  return {
    getProfit,
    getProfitPercentage,
    getAmountPercentage,
    getChanceToGetMoney,
    getAmountToGet,
    amountPerSecond,
    getAmount,
  };
};
const state = gameMoneyControl();
const values = gameinfoControl();

const fillingCell = (element, id) => {
  switch (id) {
    case "profitPercentage":
      if (element.className == "upgrade") {
        element.textContent = "-----";
      }
      if (element.className == "profit") {
        element.textContent = `${state.getProfitPercentage()} %`;
      }
      break;
    case "profit":
      if (element.className == "upgrade") {
        element.textContent = "-----";
      }
      if (element.className == "profit") {
        element.textContent = state.getProfit();
      }
      break;
    case "chanceToGetMoney":
      if (element.className == "upgrade") {
        element.textContent = "-----";
      }
      if (element.className == "profit") {
        element.textContent = `${state.getChanceToGetMoney()} %`;
      }
      break;
    case "amountToGet":
      if (element.className == "upgrade") {
        element.textContent = "-----";
      }
      if (element.className == "profit") {
        element.textContent = state.getAmountToGet();
      }
      break;
    case "amountPercentage":
      if (element.className == "upgrade") {
        element.textContent = "-----";
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
const fillingTable = () => {
  const tableLine = document.querySelectorAll("tr");
  tableLine.forEach((element) => {
    fillingCell(element.querySelector(".upgrade"), element.id);
    fillingCell(element.querySelector(".profit"), element.id);
  });
  actualAmountDisplay();
};
const timeDisplay = () => {
  timmer.textContent = values.getSeconds();
  setTimeout(timeDisplay, 100);
};

timeDisplay();
fillingTable();
//
function increase(element) {
  const tableLine = element.parentNode.parentNode;
  fillingCell(tableLine.querySelector(".upgrade"), tableLine.id);
  fillingCell(tableLine.querySelector(".profit"), tableLine.id);
  moneyEarnings.textContent = state.amountPerSecond();
}
