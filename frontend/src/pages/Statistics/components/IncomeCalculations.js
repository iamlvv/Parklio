const getDaysInMonth = (month, year) =>
  new Array(31)
    .fill("")
    .map((v, i) => new Date(year, month - 1, i + 1))
    .filter((v) => v.getMonth() === month - 1);

const calculateIncomeDaily = ({ date, data }) => {
  const vehicle = data;
  const result = [];
  console.log("parameter date: ", date);
  let income = 0;
  for (let i = 0; i < vehicle.length; i++) {
    const date1 = new Date(vehicle[i].outputTime).toLocaleDateString();
    console.log(date1);
    if (date1 === date) {
      result.push(vehicle[i]);
    }
  }
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    income += result[i].totalCost;
  }
  console.log(income);
  return income;
};

const calculateIncomeEachMonth = ({ month, data }) => {
  let income = 0;
  for (let i = 0; i < data.length; i++) {
    income += data[i].income;
  }
  return income;
};
const IncomeMonthly = ({ incomeList, month, year }) => {
  const result = [];
  const daysInMonth = getDaysInMonth(month, year);
  for (let i = 0; i < daysInMonth.length; i++) {
    let income = calculateIncomeDaily({
      date: daysInMonth[i].toLocaleDateString(),
      data: incomeList,
    });
    result.push({
      name: daysInMonth[i].toLocaleDateString(),
      income: income,
    });
  }
  return result;
};

const IncomeYearly = ({ incomeList, year }) => {
  const monthsInYear = [];
  for (let i = 0; i < 12; i++) {
    monthsInYear.push({
      name: (i + 1).toString(),
      income: 0,
    });
    console.log(monthsInYear);
  }
  for (let i = 0; i < monthsInYear.length; i++) {
    const income = calculateIncomeEachMonth({
      month: i + 1,
      data: IncomeMonthly({ incomeList, month: (i + 1).toString(), year }),
    });
    monthsInYear[i].income = income;
  }
  return monthsInYear;
};

export { IncomeMonthly, IncomeYearly, calculateIncomeDaily };
