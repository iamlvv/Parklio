import React, { useEffect, useState } from "react";
import { getAllServices } from "../../../../components/actions/serviceActions";
import { ServiceItems } from "../ItemsPerPage";
import { styles } from "../../../../components/styles";
import Paginate from "../Pagination";
import { CHRONOLOGICAL_ORDER, INVERSE_CHRONOLOGICAL_ORDER } from "../../../../constants/navigationConstants";

function ServiceStatistics({ userInfo, itemsPerPage }) {
  const [serviceList, setServiceList] = useState([]);
  const [timeOrder, setTimeOrder] = useState("newtoold");
  const tableHeaders = [
    "Plate Number",
    "Owner's name",
    "Vehicle Type",
    "Register Time",
    "Service Type",
    "Oil Type",
    "Cost",
  ];
  useEffect(() => {
    getAllServices({ userInfo, setServiceList });
  }, []);

  const handleOrderNewestToOldest = () => {
    if (timeOrder === "newtoold") return;
    setTimeOrder("newtoold");
    setServiceList(serviceList.slice().reverse());
  };
  const handleOrderOldestToNewest = () => {
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
    <div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl invisible">
            Check in/ Check out status
          </h1>
          <p>
            The table below helps us track which service has been used by our
            customers.
          </p>
        </div>
        <div className="flex flex-row gap-x-9 mr-20">
          <button
            className={
              timeOrder === "newtoold" ? CHRONOLOGICAL_ORDER : INVERSE_CHRONOLOGICAL_ORDER
            }
            onClick={handleOrderNewestToOldest}
          >
            Newest to oldest
          </button>
          <button
            className={
              timeOrder === "oldtonew" ? CHRONOLOGICAL_ORDER : INVERSE_CHRONOLOGICAL_ORDER
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
