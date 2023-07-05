import axios from "axios";
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
      "http://localhost:5000/api/services/addService",
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
    const response = await axios.get("http://localhost:5000/api/services/", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    setServiceList(response.data);
  } catch (error) {
    console.log(error);
  }
};
export { registerService, getAllServices };
