import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../../../components/styles";
import ReactPaginate from "react-paginate";
import VehicleStatistics from "./VehicleStatistics";
import ServiceStatistics from "./ServiceStatistics";
import IncomeStatistics from "./IncomeStatistics";

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
      style={styles.pagination}
    />
  );
};

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
          typeOfStatistics={typeOfStatistics}
          typeOfTime={typeOfTime}
          userInfo={userInfo}
          itemsPerPage={10}
        />
      ) : typeOfStatistics === "service" ? (
        <ServiceStatistics
          typeOfStatistics={typeOfStatistics}
          typeOfTime={typeOfTime}
          userInfo={userInfo}
          itemsPerPage={10}
        />
      ) : (
        <IncomeStatistics
          typeOfStatistics={typeOfStatistics}
          typeOfTime={typeOfTime}
          userInfo={userInfo}
        />
      )}
    </div>
  );
}

export { Paginate };
export default StatisticsContent;
