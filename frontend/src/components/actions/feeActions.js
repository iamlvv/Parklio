import axios from "axios";

const getAllFees = async ({
  setFourseatCarFee,
  setSeventseatCarFee,
  setTruckFee,
  setCarWashFee,
  setOilChangingFee,
  userInfo,
}) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/fees`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setCarWashFee(response.data[0].carWash.price);
    setOilChangingFee(response.data[0].oilChange.price);
    setFourseatCarFee(response.data[0].fourSeatCar.price);
    setSeventseatCarFee(response.data[0].sevenSeatCar.price);
    setTruckFee(response.data[0].truck.price);
  } catch (error) {
    console.log(error);
  }
};

const updateFees = async ({ inputData, userInfo }) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/fees/updatefee`,
      inputData,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export { getAllFees, updateFees };
