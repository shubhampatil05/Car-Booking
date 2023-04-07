import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();

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

  // using useNavigate..

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [data]);

  const handleClick = (id) => {
    localStorage.setItem("itemID", id);
    navigate("/info");
  };

  return (
    <div className="Home">
      {data &&
        data.map((item) => {
          return (
            <div className="cards" key={item._id}>
              <h6>Company : {item.company}</h6>
              <h6>Model : {item.carModel}</h6>
              <h6>Capacity : {item.capacity}</h6>
              <h6>FuelType : {item.fuelType}</h6>
              <h6>Insurance : {item.insurance}</h6>
              <h6>Mileage : {item.mileage}</h6>
              <h6>Comfort : {item.comfort}</h6>
              <img
                src={item.carImg}
                alt="car-poster"
                width="300px"
                height="200px"
                style={{
                  borderRadius: "10px",
                  marginBottom: "5px",
                }}
              />
              <br />

              <button
                className="btn btn-success"
                style={{ width: "300px" }}
                onClick={() => handleClick(item._id)}
              >
                Book Your Ride
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
