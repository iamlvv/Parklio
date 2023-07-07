import axios from "axios";

const getAllFees = async ({
  setCarWashCost,
  setOilChangingCost,
  setFourseatCarFee,
  setSevenseatCarFee,
  setTruckFee,
}) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/fees`);
    setCarWashCost(response.data[0].carWash.price);
    setOilChangingCost(response.data[0].oilChange.price);
    setFourseatCarFee(response.data[0].fourSeatCar.price);
    setSevenseatCarFee(response.data[0].sevenSeatCar.price);
    setTruckFee(response.data[0].truck.price);
  } catch (error) {
    console.log(error);
  }
};

export { getAllFees };
