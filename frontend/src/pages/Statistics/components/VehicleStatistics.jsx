import React, { useEffect, useState } from "react";
import {
  GetAllDistinctVehicles,
  GetAllVehicles,
} from "../../../components/actions/vehicleActions";
import { Paginate } from "./StatisticsContent";
import { VehicleItems } from "./ItemsPerPage";
import { styles } from "../../../components/styles";
import fourseatCar from "../../../assets/img/car.png";
import sevenseatCar from "../../../assets/img/car7.png";
import truck from "../../../assets/img/truck.png";

function VehicleList({ userInfo }) {
  const [vehicleList, setVehicleList] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState({});
  const [activeItem, setActiveItem] = useState("");
  useEffect(() => {
    GetAllDistinctVehicles({ userInfo, setVehicleList });
  }, []);
  const active =
    "bg-gray-100 transition ease-in-out rounded-md py-5 pl-2 flex flex-row gap-x-5 cursor-pointer items-center";
  const inactive =
    "hover:bg-gray-100 transition ease-in-out rounded-md py-5 pl-2 cursor-pointer flex flex-row gap-x-5 items-center";
  return (
    <div className="my-10">
      <div className="flex flex-row justify-center gap-x-9">
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
                    ? active
                    : inactive
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
            <InfoEachVehicle vehicle={vehicleInfo} />
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

function InfoEachVehicle({ vehicle }) {
  return (
    <div className="border p-5 rounded-md shadow-md">
      <h1 className="font-bold text-2xl">Vehicle Information</h1>
      <div className="grid grid-cols-2 gap-x-5">
        <div>
          <h2>Plate Number</h2>
          <h2>Vehicle Owner</h2>
          <h2>Vehicle Type</h2>
          <h2>Number of input Time up to now</h2>
          <h2>Number of output Time up to now</h2>
          <h2>Total cost has been purchased up to now</h2>
        </div>
        <div>
          <h2>{vehicle._id}</h2>
          <h2>{vehicle.vehicleOwner}</h2>
          <h2>
            {vehicle.vehicleType === "4seatcar"
              ? "4 seat car"
              : vehicle.vehicleType === "7seatcar"
              ? "7 seat car"
              : "truck"}
          </h2>
          <h2>{vehicle.inputTime}</h2>
          <h2>{vehicle.outputTime}</h2>
          <h2>{vehicle.totalCost}</h2>
        </div>
      </div>
    </div>
  );
}
function VehicleStatistics({
  typeOfStatistics,
  typeOfTime,
  userInfo,
  itemsPerPage,
}) {
  const [vehicleList, setVehicleList] = useState([]);
  useEffect(() => {
    GetAllVehicles({ userInfo, setVehicleList });
  }, []);

  const headers = [
    "Plate Number",
    "Owner's name",
    "Vehicle Type",
    "Check In Time",
    "Check Out Time",
    "Type of parking",
    "Car Wash Cost",
    "Oil Cost",
    "Oil Type",
    "Service Cost",
    "Total Cost",
  ];

  //Create pagination
  var keyCount = Object.keys(vehicleList).length;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = vehicleList
    .slice()
    .reverse()
    .slice(itemOffset, endOffset);
  const pageCount = Math.ceil(keyCount / itemsPerPage);
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % keyCount;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">Check in/ Check out status</h1>
      <p>
        The table below helps us track which vehicle checks in/ check out of our
        system
      </p>
      <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
      <table className="mx-auto mb-10">
        <thead>
          <tr>
            {headers.map((header) => (
              <th style={styles.th} key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <VehicleItems currentItems={currentItems} />
        </tbody>
      </table>
      <h1 className="font-bold text-2xl">Specific vehicles</h1>
      <p>
        The list below is about all vehicles have used our car park. You can
        click on each vehicle to see more information about it.
      </p>
      <VehicleList userInfo={userInfo} />
    </div>
  );
}

export default VehicleStatistics;
