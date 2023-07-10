import axios from "axios";
import { SERVICE_REGISTRATION_API_URL, GET_ALL_SERVICES_API_URL } from "../../constants/APIConstants";
const registerService = async ({
  userInfo,
  plateNumber,
  vehicleOwner,
  vehicleType,
  inputTime,
  serviceCost,
  oilType,
  carWashCost,
  oilChangingCost,
}) => {
  try {
    const response = await axios.post(
      SERVICE_REGISTRATION_API_URL,
      {
        plateNumber: plateNumber,
        vehicleOwner: vehicleOwner,
        vehicleType: vehicleType,
        inputTime: inputTime,
        serviceCost: serviceCost,
        carWashCost: carWashCost,
        oilChangingCost: oilChangingCost,
        oilType: oilType,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const getAllServices = async ({ userInfo, setServiceList }) => {
  try {
    const response = await axios.get(
      GET_ALL_SERVICES_API_URL,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    setServiceList(response.data);
  } catch (error) {
    console.log(error);
  }
};
export { registerService, getAllServices };
