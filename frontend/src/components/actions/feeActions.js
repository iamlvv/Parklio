import axios from "axios";
import {
  GET_ALL_FEES_API_URL,
  UPDATE_FEES_API_URL,
} from "../../constants/APIConstants";

const getAllFees = async ({
  setFourseatCarFee,
  setSeventseatCarFee,
  setTruckFee,
  setCarWashFee,
  setOilChangingFee,
  userInfo,
  setOilChangingCost,
  setCarWashCost,
}) => {
  try {
    const response = await axios.get(GET_ALL_FEES_API_URL, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setCarWashCost(response.data[0].carWash.price);
    setOilChangingCost(response.data[0].oilChange.price);
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
    const response = await axios.post(UPDATE_FEES_API_URL, inputData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export { getAllFees, updateFees };
