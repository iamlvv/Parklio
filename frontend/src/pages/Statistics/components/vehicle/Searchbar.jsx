import React, { useEffect, useState } from "react";
import { GetAllDistinctVehicles } from "../../../../components/actions/vehicleActions";
import { GrClose } from "react-icons/gr";
function Searchbar({ setVehicleList, userInfo }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [initialdata, setInitialData] = useState([]);
  useEffect(() => {
    GetAllDistinctVehicles({ userInfo, setVehicleList: setInitialData });
    setVehicleList(initialdata);
  }, []);
  const handleFilter = (e) => {
    const searchword = e.target.value;
    setWordEntered(searchword);
    const newFilter = initialdata.filter((value) => {
      return value._id.toLowerCase().includes(searchword.toLowerCase());
    });
    if (searchword !== "") {
      setFilteredData(newFilter);
      setVehicleList(newFilter);
    } else {
      setFilteredData([]);
      setVehicleList(initialdata);
    }
  };
  //End of filtering result
  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };
  return (
    <div className="text-center my-5 flex flex-row justify-center gap-x-5 items-center">
      <input
        type="text"
        placeholder="Search plate number"
        className="border p-2 drop-shadow-md rounded-md"
        value={wordEntered || ""}
        onChange={handleFilter}
      />
      {wordEntered !== "" && (
        <div
          className="cursor-pointer p-2 bg-yellow-700 rounded-md text-white"
          onClick={clearInput}
        >
          <GrClose className="font-bold text-white" />
        </div>
      )}
    </div>
  );
}

export default Searchbar;
