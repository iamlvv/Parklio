import axios from "axios";
import {
  SERVICE_REGISTRATION_API_URL,
  GET_ALL_SERVICES_API_URL,
  GET_TOTAL_SERVICES_API_URL,
} from "../../constants/APIConstants";

// Register a service
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
        plateNumber,
        vehicleOwner,
        vehicleType,
        inputTime,
        serviceCost,
        carWashCost,
        oilChangingCost,
        oilType,
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

// Get all services
const getAllServices = async ({ userInfo, setServiceList }) => {
  try {
    const response = await axios.get(GET_ALL_SERVICES_API_URL, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setServiceList(response.data);
  } catch (error) {
    console.log(error);
  }
};

// Get total service, which is the total number of services, and the total cost of services
const getTotalService = async ({ userInfo, setTotalService }) => {
  try {
    const response = await axios.get(GET_TOTAL_SERVICES_API_URL, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setTotalService(response.data);
  } catch (error) {
    console.log(error);
  }
};
export { registerService, getAllServices, getTotalService };
