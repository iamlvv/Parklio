import React, { useEffect, useState } from "react";
import { styles } from "../../../components/styles";
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

const registerVehicle = async ({
  userInfo,
  plateNumber,
  vehicleOwner,
  vehicleType,
  inputTime,
  parkingType,
  serviceCost,
  oilChanging,
  oilType,
  carWashCost,
  oilChangingCost,
}) => {
  try {
    console.log(userInfo);
    const response = await axios.post(
      "http://localhost:5000/api/vehicles/checkin",
      {
        plateNumber: plateNumber,
        vehicleOwner: vehicleOwner,
        vehicleType: vehicleType,
        inputTime: inputTime,
        parkingType: parkingType,
        serviceCost: serviceCost,
        oilChanging: oilChanging,
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
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

const registerService = async ({
  userInfo,
  plateNumber,
  vehicleOwner,
  vehicleType,
  inputTime,
  parkingType,
  serviceCost,
  oilChanging,
  oilType,
  carWashCost,
  oilChangingCost,
}) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/vehicles/addService",
      {
        plateNumber: plateNumber,
        vehicleOwner: vehicleOwner,
        vehicleType: vehicleType,
        inputTime: inputTime,
        parkingType: parkingType,
        serviceCost: serviceCost,
        oilChanging: oilChanging,
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
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
function CheckInForm({ userInfo }) {
  const patternPlate = /[1-9][0-9][A-Z][0-9][0-9][0-9][0-9][0-9]?/;
  const [errorPlate, setErrorPlate] = useState("");
  const [plate, setPlate] = useState("");
  const [owner, setOwner] = useState("");
  const [inputTime, setInputTime] = useState("");
  const [parkingType, setParkingType] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [serviceCost, setServiceCost] = useState(0);
  const [carWash, setCarWash] = useState(false);
  const [oilChanging, setOilChanging] = useState(false);
  const [oilType, setOilType] = useState("pennzoil");
  const [carWashCost, setCarWashCost] = useState(0);
  const [oilChangingCost, setOilChangingCost] = useState(0);
  const isValidPlate = (plate) => {
    return patternPlate.test(plate);
  };
  const handleChangePlate = (e) => {
    if (!isValidPlate(e.target.value)) {
      setErrorPlate("Invalid plate number");
    } else setErrorPlate(null);
    setPlate(e.target.value);
  };

  useEffect(() => {
    getAllFees({ setCarWashCost, setOilChangingCost });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setInputTime(new Date().toLocaleString());
    console.log(inputTime);
    const inputData = {
      userInfo: userInfo,
      plateNumber: plate,
      vehicleOwner: owner,
      inputTime: inputTime,
      parkingType: parkingType,
      vehicleType: vehicleType,
      serviceCost: serviceCost,
      oilChanging: oilChanging,
      oilType: oilType,
      carWashCost: carWash ? carWashCost : 0,
      oilChangingCost: oilChanging ? oilChangingCost : 0,
    };
    console.log(inputData);
    registerVehicle(inputData);
    if (carWash || oilChanging) {
      registerService(inputData);
    }
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleRegister} className="grid grid-cols-2 gap-9">
        <div>
          <h2 className="font-bold text-2xl">Parking Registration</h2>
          <div className="flex flex-row justify-center gap-x-40 mt-10 items-center">
            <div className="flex flex-col gap-y-10">
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Plate Number"
                  value={plate || ""}
                  onChange={handleChangePlate}
                  style={styles.backgroundInputField}
                  className="p-4 rounded-xl drop-shadow-md"
                  maxLength={8}
                  required
                />
                {errorPlate && <h2 style={{ color: "red" }}>{errorPlate}</h2>}
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Vehice Owner"
                  value={owner || ""}
                  onChange={(e) => setOwner(e.target.value)}
                  style={styles.backgroundInputField}
                  className="p-4 rounded-xl drop-shadow-md"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-y-10">
              <div
                className="flex flex-row gap-x-9 mb-5 p-4 rounded-xl drop-shadow-md"
                style={styles.backgroundInputField}
              >
                <h2>Type of parking:</h2>
                <div
                  className="flex flex-row items-center gap-5"
                  onChange={(e) => setParkingType(e.target.value)}
                >
                  <input type="radio" name="parking" value="daily" required />
                  <label>Daily</label>
                  <input type="radio" name="parking" value="monthly" />
                  <label>Monthly</label>
                </div>
              </div>
              <div
                className="flex flex-row gap-x-9 p-4 rounded-xl drop-shadow-md"
                style={styles.backgroundInputField}
              >
                <h2>Type of vehicle:</h2>
                <div
                  className="flex flex-row items-center gap-5"
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <input
                    type="radio"
                    name="vehicle"
                    value="4seatcar"
                    required
                  />
                  <label>4 seat car</label>
                  <input type="radio" name="vehicle" value="7seatcar" />
                  <label>7 seat car</label>
                  <input type="radio" name="vehicle" value="truck" />
                  <label>Truck</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h2 className="font-bold text-2xl">Service Included</h2>
          <div className="grid grid-cols-3 mt-10">
            <div className="flex flex-row gap-5">
              <div>
                <input
                  type="checkbox"
                  name="service"
                  value={carWash}
                  onChange={(e) => {
                    setCarWash(!carWash);
                    if (carWash) {
                      setServiceCost(serviceCost - carWashCost);
                    } else {
                      setServiceCost(serviceCost + carWashCost);
                    }
                  }}
                  className="border border-black w-5 h-5 rounded-xl"
                />
              </div>
              <label>Car Wash</label>
            </div>
            <div className="">
              <div className="flex flex-row gap-5 mb-5">
                <div>
                  <input
                    type="checkbox"
                    name="service"
                    value={oilChanging}
                    onChange={(e) => {
                      setOilChanging(!oilChanging);
                      if (oilChanging) {
                        setServiceCost(serviceCost - oilChangingCost);
                      }
                      if (!oilChanging) {
                        setServiceCost(serviceCost + oilChangingCost);
                      }
                    }}
                    className="border border-black w-5 h-5 rounded-xl"
                  />
                </div>
                <label>Oil Changing</label>
              </div>
              <select
                className="rounded-md p-2"
                style={styles.backgroundInputCost}
                disabled={!oilChanging}
                onChange={(e) => setOilType(e.target.value)}
              >
                <option value="pennzoil">Pennzoil</option>
                <option value="shell">Shell</option>
                <option value="castrol">Castrol</option>
                <option value="valvoline">Valvoline</option>
              </select>
            </div>
          </div>
          <h1 className="my-10 font-bold">Service cost: {serviceCost || 0}</h1>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="rounded-2xl p-4 font-bold hover:bg-yellow-500 transition bg-yellow-300 ease-in-out drop-shadow-lg"
          >
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckInForm;
/* <div className="">
              <div className="flex flex-row gap-5 mb-5">
                <input
                  type="checkbox"
                  name="service"
                  value={fuelFilling}
                  onChange={(e) => setFuelFilling(!fuelFilling)}
                  className="border border-black w-5 h-5 rounded-xl"
                />
                <label>Fuel Changing</label>
              </div>
              <select
                className="rounded-md p-2"
                style={styles.backgroundInputCost}
                disabled={!fuelFilling}
                onChange={(e) => setFuelType(e.target.value)}
              >
                <option value="ron95">Ron 95</option>
                <option value="ron92">Ron 92</option>
              </select>
              <div className="mt-5">
                <input
                  type="number"
                  placeholder="Cost"
                  style={styles.backgroundInputCost}
                  className="p-2 rounded-xl"
                  disabled={!fuelFilling}
                  value={fuelFillingCost || ""}
                  onChange={(e) => setFuelFillingCost(e.target.value)}
                  required={fuelFilling ? true : false}
                />
              </div>
            </div> */
