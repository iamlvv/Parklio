import axios from "axios";

// Get days in a month
const getDaysInMonth = (month, year) =>
  new Array(31)
    .fill("")
    .map((v, i) => new Date(year, month - 1, i + 1))
    .filter((v) => v.getMonth() === month - 1);

const IncomeDaily = ({ incomeList }) => {
  /* Initialize hours in a day
   * Each hour has 2 properties: name and income
   * For each hour, calculate income by calling calculateIncomeDaily function
   * Push each hour to result array
   * Return result array
   * */
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
  /* Initialize 24 hours in a day
   * Each hour has 2 properties: name and income
   * For each hour, calculate income by calling IncomeDaily function
   * Push each hour to result array
   * Return result array
   * */
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

const getGraphData = async ({ typeOfTime, setGraphData, userInfo }) => {
  /*
   * Get income list from backend
   * Call IncomeMonthly function if typeOfTime is month
   * Call IncomeYearly function if typeOfTime is year
   * Call IncomeDaily function if typeOfTime is day
   * Call IncomeToday function if typeOfTime is today
   * Set graph data to result of each function
   */
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/vehicles/checkedout`,
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
  );
  let incomeList = response.data;
  switch (typeOfTime) {
    case "month":
      setGraphData(
        IncomeMonthly({
          incomeList,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        })
      );
      break;
    case "year":
      setGraphData(
        IncomeYearly({ incomeList, year: new Date().getFullYear() })
      );
      break;
    case "day":
      setGraphData(IncomeDaily({ incomeList }));
      break;
    case "today":
      let today = {
        day: new Date().getUTCDate(),
        month: new Date().getUTCMonth() + 1,
        year: new Date().getUTCFullYear(),
      };
      setGraphData(IncomeToday({ incomeList, today }));
      break;
  }
};

export { IncomeMonthly, IncomeYearly, IncomeDaily, IncomeToday, getGraphData };
