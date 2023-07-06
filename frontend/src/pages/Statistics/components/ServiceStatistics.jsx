import React, { useEffect, useState } from "react";
import { getAllServices } from "../../../components/actions/serviceActions";
import { Paginate } from "./StatisticsContent";
import { ServiceItems } from "./ItemsPerPage";
import { styles } from "../../../components/styles";

function ServiceStatistics({
  typeOfStatistics,
  typeOfTime,
  userInfo,
  itemsPerPage,
}) {
  const [serviceList, setServiceList] = useState([]);
  const headers = [
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
      <p>
        The table below helps us track which service has been used by our
        customers.
      </p>
      <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
      <table className="mx-auto">
        <thead>
          {headers.map((header) => (
            <th key={header} style={styles.th}>
              {header}
            </th>
          ))}
        </thead>
        <tbody>
          <ServiceItems currentItems={currentItems} />
        </tbody>
      </table>
    </div>
  );
}

export default ServiceStatistics;
