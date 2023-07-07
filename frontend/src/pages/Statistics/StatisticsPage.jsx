import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import Navigation from "./components/Navigation";
import { styles } from "../../components/styles";
import ReactPaginate from "react-paginate";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import VehicleStatistics from "./components/vehicle/VehicleStatistics";
import ServiceStatistics from "./components/service/ServiceStatistics";
import IncomeStatistics from "./components/income/IncomeStatistics";

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
      activeClassName="font-bold text-2xl cursor-pointer"
      pageClassName="py-2 px-3 hover:shadow-md hover:bg-black hover:text-white bg-white text-black transition ease-in rounded-md cursor-pointer"
      className="flex justify-center items-center px-5 font-medium rounded-md mb-5 gap-x-5"
    />
  );
};

function StatisticsPage() {
  const [typeOfStatistics, setTypeOfStatistics] = useState("vehicle");
  const [typeOfTime, setTypeOfTime] = useState("day");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <NavigationBar />
      <div style={styles.content}>
        <Navigation
          handleTypeOfStatistics={setTypeOfStatistics}
          handleTypeOfTime={setTypeOfTime}
        />
        <div>
          {typeOfStatistics === "vehicle" ? (
            <VehicleStatistics userInfo={userInfo} itemsPerPage={10} />
          ) : typeOfStatistics === "service" ? (
            <ServiceStatistics userInfo={userInfo} itemsPerPage={10} />
          ) : (
            <IncomeStatistics typeOfTime={typeOfTime} userInfo={userInfo} />
          )}
        </div>
      </div>
    </div>
  );
}
export { Paginate };
export default StatisticsPage;
