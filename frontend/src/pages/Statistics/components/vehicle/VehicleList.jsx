import { useEffect, useState } from "react";
import { styles } from "../../../../components/styles";
import {
  GetAllDistinctVehicles,
  GetAllVehicles,
} from "../../../../components/actions/vehicleActions";
import Searchbar from "./Searchbar";
import fourseatCar from "../../../../assets/img/car.png";
import sevenseatCar from "../../../../assets/img/car7.png";
import truck from "../../../../assets/img/truck.png";
import InfoEachVehicle from "./InfoEachVehicle";
import {
  ACTIVE_ITEM_VEHICLE_LIST,
  INACTIVE_ITEM_VEHICLE_LIST,
} from "../../../../constants/vehicleConstants";

function VehicleList({ userInfo }) {
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [activeItem, setActiveItem] = useState("");
  const [vehicleOriginalList, setVehicleOriginalList] = useState([]);

  useEffect(() => {
    // Get all distinct vehicles
    GetAllDistinctVehicles({ userInfo, setVehicleList });
    GetAllVehicles({ userInfo, setVehicleList: setVehicleOriginalList });
  }, []);

  return (
    <div className="mb-10">
      <Searchbar setVehicleList={setVehicleList} userInfo={userInfo} />
      <div className="flex flex-row justify-center gap-x-9 items-center">
        <div
          className="flex flex-col gap-y-5"
          style={styles.distinctVehicleList}
        >
          {vehicleList.length !== 0 ? (
            vehicleList.map((vehicle) => (
              <div
                key={vehicle._id}
                className={
                  activeItem && vehicleInfo._id === vehicle._id
                    ? ACTIVE_ITEM_VEHICLE_LIST
                    : INACTIVE_ITEM_VEHICLE_LIST
                }
                onClick={() => {
                  setVehicleInfo(vehicle);
                  setActiveItem(vehicle._id);
                }}
              >
                <div>
                  {vehicle.vehicleType === "4seatcar" ? (
                    <img src={fourseatCar} alt="4-seat car" />
                  ) : vehicle.vehicleType === "7seatcar" ? (
                    <img src={sevenseatCar} alt="7-seat car" />
                  ) : (
                    <img src={truck} alt="truck" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div>{vehicle._id}</div>
                  <div>
                    {vehicle.vehicleType === "4seatcar"
                      ? "4-seat car"
                      : vehicle.vehicleType === "7seatcar"
                      ? "7-seat car"
                      : "truck"}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div>
          {vehicleInfo._id ? (
            <InfoEachVehicle
              vehicle={vehicleInfo}
              vehicleId={vehicleInfo._id}
              vehicleOriginalList={vehicleOriginalList}
            />
          ) : (
            <div className="border p-5 rounded-md shadow-md">
              Please choose a vehicle
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VehicleList;
