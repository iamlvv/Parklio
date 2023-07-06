const getDaysInMonth = (month, year) =>
  new Array(31)
    .fill("")
    .map((v, i) => new Date(year, month - 1, i + 1))
    .filter((v) => v.getMonth() === month - 1);

const IncomeDaily = ({ incomeList }) => {
  const result = [];
  for (let i = 0; i < 24; i++) {
    result.push({
      name: i.toString(),
      income: 0,
    });
  }
  for (let i = 0; i < incomeList.length; i++) {
    result[incomeList[i].outputHour].income += incomeList[i].totalCost;
  }
  return result;
};

const IncomeToday = ({ incomeList, today }) => {
  const result = [];
  for (let i = 0; i < 24; i++) {
    result.push({
      name: i.toString(),
      income: 0,
    });
  }
  for (let i = 0; i < incomeList.length; i++) {
    if (
      incomeList[i].outputDate === today.day &&
      incomeList[i].outputMonth === today.month &&
      incomeList[i].outputYear === today.year
    ) {
      result[incomeList[i].outputHour].income += incomeList[i].totalCost;
    }
  }
  return result;
};
const IncomeMonthly = ({ incomeList, month, year }) => {
  /* Initialize days in a month
   * Each day has 2 properties: name and income
   * For each day, calculate income by calling calculateIncomeDaily function
   * Push each day to result array
   * Return result array
   * */
  const result = [];
  const daysInMonth = getDaysInMonth(month, year);
  for (let i = 0; i < daysInMonth.length; i++) {
    result.push({
      name: daysInMonth[i].getDate().toString(),
      income: 0,
    });
  }
  for (let i = 0; i < incomeList.length; i++) {
    result[incomeList[i].outputDate - 1].income += incomeList[i].totalCost;
  }
  return result;
};

const IncomeYearly = ({ incomeList }) => {
  /* Initialize 12 months in a year
   * Each month has 2 properties: name and income
   * For each month, calculate income by calling IncomeMonthly function
   * Push each month to monthsInYear array
   * Return monthsInYear array
   */
  const monthsInYear = [];
  for (let i = 0; i < 12; i++) {
    monthsInYear.push({
      name: (i + 1).toString(),
      income: 0,
    });
  }
  for (let i = 0; i < incomeList.length; i++) {
    monthsInYear[incomeList[i].outputMonth - 1].income +=
      incomeList[i].totalCost;
  }
  return monthsInYear;
};

export { IncomeMonthly, IncomeYearly, IncomeDaily, IncomeToday };
