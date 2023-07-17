import React, { useEffect, useState } from "react";
import {
  getAllServices,
  getTotalService,
} from "../../../../components/actions/serviceActions";
import { ServiceItems } from "../ItemsPerPage";
import { styles } from "../../../../components/styles";
import Paginate from "../Pagination";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  CHRONOLOGICAL_ORDER,
  INVERSE_CHRONOLOGICAL_ORDER,
} from "../../../../constants/navigationConstants";

function ServiceStatistics({ userInfo, itemsPerPage }) {
  const [serviceList, setServiceList] = useState([]);
  const [timeOrder, setTimeOrder] = useState("newtoold");
  const [totalService, setTotalService] = useState([{}]);
  const tableHeaders = [
    "Plate Number",
    "Owner's name",
    "Vehicle Type",
    "Register Time",
    "Service Type",
    "Oil Type",
    "Cost",
  ];

  // Get all services and total services
  useEffect(() => {
    getAllServices({ userInfo, setServiceList });
    getTotalService({ userInfo, setTotalService });
  }, []);

  const handleOrderNewestToOldest = () => {
    // This function is called when the user clicks on the "Newest to oldest" button
    if (timeOrder === "newtoold") return;
    setTimeOrder("newtoold");
    setServiceList(serviceList.slice().reverse());
  };
  const handleOrderOldestToNewest = () => {
    // This function is called when the user clicks on the "Oldest to newest" button
    if (timeOrder === "oldtonew") return;
    setTimeOrder("oldtonew");
    setServiceList(serviceList.slice().reverse());
  };

  //Create pagination
  var keyCount = Object.keys(serviceList).length;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = serviceList
    .slice()
    .reverse()
    .slice(itemOffset, endOffset);
  const pageCount = Math.ceil(keyCount / itemsPerPage);
  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % keyCount;
    setItemOffset(newOffset);
  };

  return (
    <div className="mb-10">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl">Services tracking</h1>
          <div className="flex flex-row gap-x-9">
            <div
              className="p-2 shadow-md bg-gray-50 rounded-md my-5"
              style={styles.infoBanner}
            >
              <ul>
                <li>
                  {" "}
                  <AiOutlineQuestionCircle className="inline-block mr-2" />
                  The table below helps you keep track all additional services
                  has been registered by vehicle owners when they parked here.
                </li>
                <li>
                  You can click on the filter on the right to change the order
                  chronologically.
                </li>
              </ul>
            </div>
            <div className="p-2 shadow-md bg-gray-50 rounded-md my-5">
              <h1 className="font-bold text-2xl">Total services up to now</h1>
              <h2>
                Total Service Income: ${" "}
                {totalService.length !== 0
                  ? totalService[0].totalCarWashIncome +
                    totalService[0].totalOilChangingIncome
                  : 0}
              </h2>
              <h2>
                Total Car Wash Income: ${" "}
                {totalService.length !== 0
                  ? totalService[0].totalCarWashIncome
                  : 0}
              </h2>
              <h2>
                Total Oil Changing Income: ${" "}
                {totalService.length !== 0
                  ? totalService[0].totalOilChangingIncome
                  : 0}
              </h2>
              <h2>
                Total number of using Car Wash:{" "}
                {totalService.length !== 0
                  ? totalService[0].numberOfCarWash
                  : 0}
              </h2>
              <h2>
                Total number of using Shell Oil:{" "}
                {totalService.length !== 0
                  ? totalService[0].numberOfShellOil
                  : 0}
              </h2>
              <h2>
                Total number of using Pennzoil Oil:{" "}
                {totalService.length !== 0
                  ? totalService[0].numberOfPennzoilOil
                  : 0}
              </h2>
              <h2>
                Total number of using Castrol Oil:{" "}
                {totalService.length !== 0
                  ? totalService[0].numberOfCastrolOil
                  : 0}
              </h2>
              <h2>
                Total number of using Valvoline Oil:{" "}
                {totalService.length !== 0
                  ? totalService[0].numberOfValvolineOil
                  : 0}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row mr-20 justify-between">
        <div></div>
        <div className="flex flex-row gap-x-9">
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
      <table className="mx-auto">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} style={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <ServiceItems currentItems={currentItems} />
        </tbody>
      </table>
    </div>
  );
}

export default ServiceStatistics;
