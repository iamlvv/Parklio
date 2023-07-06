import axios from "axios";

const getAllFees = async ({ setCarWashCost, setOilChangingCost }) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/fees`);
    setCarWashCost(response.data[0].carWash.price);
    setOilChangingCost(response.data[0].oilChange.price);
  } catch (error) {
    console.log(error);
  }
};

export { getAllFees };
