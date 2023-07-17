import React, { useEffect, useState } from "react";
import { GetAllDistinctVehicles } from "../../../../components/actions/vehicleActions";
import { GrClose } from "react-icons/gr";
import { INPUT_FIELD } from "../../../../constants/formConstants";
function Searchbar({ setVehicleList, userInfo }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [initialdata, setInitialData] = useState([]);

  useEffect(() => {
    // Get all distinct vehicles
    GetAllDistinctVehicles({ userInfo, setVehicleList: setInitialData });
    setVehicleList(initialdata);
  }, []);

  const handleSearch = (e) => {
    // Filtering result, search by plate number
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
    setVehicleList(initialdata);
  };

  return (
    <div className="text-center my-5 flex flex-row justify-center gap-x-5 items-center">
      <input
        type="text"
        placeholder="Search plate number"
        className={INPUT_FIELD}
        value={wordEntered || ""}
        onChange={handleSearch}
      />
      {wordEntered !== "" && (
        <div
          className="cursor-pointer p-2 bg-yellow-700 rounded-md text-white"
          onClick={clearInput}
        >
          {/* Clear the input field */}
          <GrClose className="font-bold text-white" />
        </div>
      )}
    </div>
  );
}

export default Searchbar;
