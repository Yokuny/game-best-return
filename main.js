const gameMoneyControl = () => {
  let amount = 500;
  let profitPercentage = 0;
  let profit = 0;
  let chanceToGetMoney = 0;
  let amountToGet = 0;
  let amountPercentage = 0;

  const getProfit = () => {
    profit += 50;
    let profitTotal = profit + profit * (profitPercentage / 100);
    return profitTotal;
  };
  const getProfitPercentage = () => {
    profitPercentage += 5;
    return profitPercentage;
  };
  const getAmountPercentage = () => {
    amountPercentage += 2;
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
  const chance = (chance) => {
    if (100 * Math.random() < chance) {
      return true;
    }
  };
  let getAmount = () => {
    let profitResult = profit + profit * (profitPercentage / 100);
    let amountFinal = amount;
    if (chance(chanceToGetMoney)) {
      amountFinal += amountToGet;
    }
    amountFinal += profitResult;
    amount = amountFinal + amountFinal * (amountPercentage / 100);
    return amount;
  };
  return {
    getProfit,
    getProfitPercentage,
    getAmountPercentage,
    getChanceToGetMoney,
    getAmountToGet,
    getAmount,
  };
};
const aa = gameMoneyControl();
console.log(aa);

const fillingTable = () => {
  const tableLine = document.getElementsByTagName("tr");
  //pegando as linhas agora vou fazer um query selector dentro desse node list
  const upgrades = document.querySelectorAll(".upgrade");
  const profit = document.querySelectorAll(".profit");
  profit.forEach((element) => {
    console.log(element);
  });
};
fillingTable();
