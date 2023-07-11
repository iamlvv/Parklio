import React, { useEffect, useState } from "react";
import { GetAllVehicles } from "../../../../components/actions/vehicleActions";
import { VehicleItems } from "../ItemsPerPage";
import { styles } from "../../../../components/styles";
import VehicleList from "./VehicleList";
import Paginate from "../Pagination";
import {
  CHRONOLOGICAL_ORDER,
  INVERSE_CHRONOLOGICAL_ORDER,
} from "../../../../constants/navigationConstants";
import { AiOutlineQuestionCircle } from "react-icons/ai";

function VehicleStatistics({ userInfo, itemsPerPage }) {
  const [vehicleList, setVehicleList] = useState([]);
  const [timeOrder, setTimeOrder] = useState("newtoold");
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

  useEffect(() => {
    GetAllVehicles({ userInfo, setVehicleList });
  }, []);

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
  const handleOrderNewestToOldest = () => {
    if (timeOrder === "newtoold") return;
    setTimeOrder("newtoold");
    setVehicleList(vehicleList.slice().reverse());
  };
  const handleOrderOldestToNewest = () => {
    if (timeOrder === "oldtonew") return;
    setTimeOrder("oldtonew");
    setVehicleList(vehicleList.slice().reverse());
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Check in/ Check out tracking</h1>
          <div
            className="p-2 shadow-md bg-gray-50 rounded-md my-5"
            style={styles.infoBanner}
          >
            <ul>
              <li>
                {" "}
                <AiOutlineQuestionCircle className="inline-block mr-2" />
                The table below helps you keep track all vehicles has been
                registered, check out and total cost that vehicle owners have to
                pay.
              </li>
              <li>
                You can click on the filter on the right to change the order
                chronologically.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row gap-x-9 mr-20">
          <button
            className={
              timeOrder === "newtoold"
                ? CHRONOLOGICAL_ORDER
                : INVERSE_CHRONOLOGICAL_ORDER
            }
            onClick={handleOrderNewestToOldest}
          >
            Newest to oldest
          </button>
          <button
            className={
              timeOrder === "oldtonew"
                ? CHRONOLOGICAL_ORDER
                : INVERSE_CHRONOLOGICAL_ORDER
            }
            onClick={handleOrderOldestToNewest}
          >
            Oldest to newest
          </button>
        </div>
      </div>

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
      <div
        className="p-2 shadow-md bg-gray-50 rounded-md my-5"
        style={styles.infoBanner}
      >
        <ul>
          <li>
            {" "}
            <AiOutlineQuestionCircle className="inline-block mr-2" />
            The list below shows all vehicles that have been registered in the
            parking lot.
          </li>
          <li>
            You can search for a specific vehicle by entering the plate number
            in the search box.
          </li>
        </ul>
      </div>
      <VehicleList userInfo={userInfo} />
    </div>
  );
}

export default VehicleStatistics;
