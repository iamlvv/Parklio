import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllVehicles } from "../../../components/actions/vehicleActions";
import { styles } from "../../../components/styles";
import { getAllServices } from "../../../components/actions/serviceActions";
import ReactPaginate from "react-paginate";
import { ServiceItems, VehicleItems } from "./ItemsPerPage";

const Paginate = ({ pageCount, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      breakLabel={"..."}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      previousLinkClassName={"previousBtn"}
      nextLinkClassName={"nextBtn"}
      disabledClassName={"paginationDisabled"}
      activeClassName="font-bold text-2xl"
      pageClassName="py-2 px-3 hover:shadow-md hover:bg-amber-200 transition ease-in rounded-md"
      className="flex justify-center items-center px-5 font-medium rounded-md mb-10 gap-x-5"
      style={styles.pagination}
    />
  );
};
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
      <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
      <table className="mx-auto">
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
    </div>
  );
}

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
function IncomeStatistics({ typeOfStatistics, typeOfTime, userInfo }) {
  return <div>hello World</div>;
}

function StatisticsContent({ typeOfStatistics, typeOfTime }) {
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      {typeOfStatistics === "vehicle" ? (
        <VehicleStatistics
          typeOfStatisctics={typeOfStatistics}
          typeOfTime={typeOfTime}
          userInfo={userInfo}
          itemsPerPage={10}
        />
      ) : typeOfStatistics === "service" ? (
        <ServiceStatistics
          typeOfStatisctics={typeOfStatistics}
          typeOfTime={typeOfTime}
          userInfo={userInfo}
          itemsPerPage={10}
        />
      ) : (
        <IncomeStatistics
          typeOfStatisctics={typeOfStatistics}
          typeOfTime={typeOfTime}
          userInfo={userInfo}
        />
      )}
    </div>
  );
}

export default StatisticsContent;
