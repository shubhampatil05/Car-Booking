import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import drivers from "./Drivers";

const Info = () => {
  const [data, setData] = useState();

  // get the data from db
  const getData = async () => {
    const res = await fetch("http://localhost:5200/carInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    getData();
  }, [data]);
  //-----------------------

  const [info, setInfo] = useState({
    pickupDate: "",
    dropDate: "",
    driverType: "",
    pickupTime: "",
    pickupLocation: "",
    dropLocation: "",
  });

  // find the number of days from pickup date to drop date

  let diff =
    new Date(info.dropDate).getTime() - new Date(info.pickupDate).getTime();

  let Journeydays = diff / (1000 * 60 * 60 * 24);

  const pick = info.pickupDate;
  // console.log(pick);

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  // get the item id which is selected by user..

  const id = localStorage.getItem("itemID");

  // Filtering the item which match the id of selected car

  const filteredData = data && data.filter((item) => item._id === id);

  // Disabled Past Date..
  const today = new Date();
  const minDate = today.toISOString().slice(0, 10);

  // ---------
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(info);

    // filtering driver details depending upon Veg/Non-Veg

    const index = Number(
      Math.floor(Math.random() * 1000)
        .toString()
        .split("")
        .slice(0, 1)
        .join()
    );

    const driverDetails = drivers.filter(
      (item) => item.Meal === info.driverType
    )[index];

    // console.log(driverDetails);

    if (
      info.pickupDate !== "" &&
      info.dropDate !== "" &&
      info.driverType !== "" &&
      info.pickupTime !== "" &&
      info.pickupLocation !== "" &&
      info.dropLocation !== ""
    ) {
      localStorage.setItem("info", JSON.stringify(info));
      localStorage.setItem("days", Journeydays + 1);
      localStorage.setItem("driver", JSON.stringify(driverDetails));
      navigate("/bookingInfo");
    } else {
      alert("Fill Out All The Details");
    }
  };

  return (
    <div className="information">
      <div className="box">
        {filteredData &&
          filteredData.map((item) => {
            return (
              <div key={item?._id}>
                <iframe
                  height="200"
                  width="300"
                  title="VIEW360"
                  src={item.carView}
                  style={{
                    borderRadius: "5px",
                    width: "500px",
                    height: "225px",
                  }}
                ></iframe>
              </div>
            );
          })}
        <div className="details mb-3">
          <div className="pick-drop">
            <div className="pickup">
              <label htmlFor="">Pickup Date</label>
              <input
                type="date"
                name="pickupDate"
                value={info.pickupDate}
                min={minDate}
                onChange={handleChange}
              />
            </div>
            <div className="drop">
              <label htmlFor="">Drop Date</label>
              <input
                type="date"
                name="dropDate"
                value={info.dropDate}
                min={pick}
                onChange={handleChange}
                disabled={info.pickupDate === ""}
              />
            </div>
          </div>
          <div className="pickupTime">
            <label htmlFor="">Pickup Time</label>
            <input
              type="time"
              value={info.pickupTime}
              name="pickupTime"
              onChange={handleChange}
            />
          </div>

          <div className="driver-type">
            <label htmlFor="">Driver Type</label>
            <select
              style={{ width: "150px" }}
              onChange={handleChange}
              name="driverType"
              value={info.driverType}
            >
              <option value="" selected disabled>
                Driver Type
              </option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
            </select>
          </div>

          <div className="location pt-3">
            <div className="pickup-location">
              <label htmlFor="">Pickup Location</label>
              <select
                onChange={handleChange}
                value={info.pickupLocation}
                name="pickupLocation"
                placeholder="Pickup Location"
                style={{ width: "130px" }}
              >
                <option value="" selected disabled>
                  Pickup City
                </option>
                <option value="Pune">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Nagpur">Nagpur</option>
                <option value="Banglore">Banglore</option>
                <option value="Nanded">nanded</option>
              </select>
            </div>

            <div className="drop-location">
              <label htmlFor="">Drop Location</label>
              <select
                type="text"
                onChange={handleChange}
                value={info.dropLocation}
                name="dropLocation"
                style={{ width: "130px" }}
              >
                <option value="" selected disabled>
                  Drop City
                </option>
                <option value="Noida">Noida</option>
                <option value="Pratapgarh">Pratapgarh</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Delhi">Delhi</option>
                <option value="Hydrabad">Hydrabad</option>
              </select>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleClick}>
          Proceed
        </button>
      </div>
    </div>
  );
};

export default Info;
