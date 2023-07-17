import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/NavigationBar";
import { styles } from "../../components/styles";
import Header from "../../components/Header";
import { getAllFees, updateFees } from "../../components/actions/feeActions";
import {
  ACTIVE_SUBMIT_FORM_BUTTON,
  INPUT_FIELD,
} from "../../constants/formConstants";
import { useNavigate } from "react-router-dom";

function ManagementPage() {
  const [fourseatCarFee, setFourseatCarFee] = useState(0);
  const [sevenseatCarFee, setSevenseatCarFee] = useState(0);
  const [truckFee, setTruckFee] = useState(0);
  const [carWashFee, setCarWashFee] = useState(0);
  const [oilChangingFee, setOilChangingFee] = useState(0);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const navigate = useNavigate();
  useEffect(() => {
    // Get all fees
    if (!userInfo) {
      navigate("/");
    } else {
      getAllFees({
        setFourseatCarFee,
        setSevenseatCarFee,
        setTruckFee,
        setCarWashFee,
        setOilChangingFee,
        userInfo,
      });
    }
  }, []);

  const handleChangeFee = (e) => {
    e.preventDefault();
    const inputData = {
      fourSeatCar: {
        price: fourseatCarFee,
      },
      sevenSeatCar: {
        price: sevenseatCarFee,
      },
      truck: {
        price: truckFee,
      },
      carWash: {
        price: carWashFee,
      },
      oilChange: {
        price: oilChangingFee,
      },
    };
    updateFees({ inputData, userInfo });
  };
  return (
    <div>
      <Header />
      <div>
        <NavigationBar />
      </div>
      <div style={styles.content}>
        <form className="mt-10" onSubmit={handleChangeFee}>
          <div className="grid grid-cols-2">
            <div>
              <h2 className="font-bold text-2xl mb-5">Parking Price</h2>
              <div className="flex flex-row gap-9 items-center mb-5 mr-7">
                <div>
                  <label>4 seat car fee: </label>
                  <input
                    type="number"
                    name="4seatcarfee"
                    className={INPUT_FIELD}
                    value={fourseatCarFee || ""}
                    onChange={(e) => setFourseatCarFee(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>7 seat car fee: </label>
                  <input
                    type="number"
                    name="7seatcarfee"
                    className={INPUT_FIELD}
                    value={sevenseatCarFee || ""}
                    onChange={(e) => setSevenseatCarFee(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Truck fee: </label>
                  <input
                    type="number"
                    name="truckfee"
                    className={INPUT_FIELD}
                    value={truckFee || ""}
                    onChange={(e) => setTruckFee(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-2xl mb-5">Service Price</h2>
              <div className="flex flex-row gap-9 mb-5">
                <div>
                  <label>Car wash price: </label>
                  <div>
                    <input
                      type="number"
                      name="carwashfee"
                      className={INPUT_FIELD}
                      value={carWashFee || ""}
                      onChange={(e) => setCarWashFee(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label>Oil changing price: </label>
                  <div>
                    <input
                      type="number"
                      name="oilchangingfee"
                      className={INPUT_FIELD}
                      value={oilChangingFee || ""}
                      onChange={(e) => setOilChangingFee(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className={ACTIVE_SUBMIT_FORM_BUTTON} type="submit">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ManagementPage;
