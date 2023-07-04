import axios from "axios";

const getAllFees = async ({ setCarWashCost, setOilChangingCost }) => {
  try {
    const response = await axios.get("http://localhost:5000/api/fees");
    setCarWashCost(response.data[0].carWash.price);
    setOilChangingCost(response.data[0].oilChange.price);
  } catch (error) {
    console.log(error);
  }
};

export { getAllFees };
