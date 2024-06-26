import { useState } from "react";
import pic1 from "../assets/pic1.jpg";
import pic2 from "../assets/pic2.jpg";
import pic3 from "../assets/pic3.jpg";
import pic4 from "../assets/pic4.jpg";
import infop1 from "../assets/infop1.png";
import infop2 from "../assets/infop2.jpg";
import house from "../assets/house.jpg";

// import SearchBar from "../components/SearchBar"
// import infop1 from "../assets/infop1.png";
// import infop2 from "../assets/infop2.jpg";
// import SearchBar from "../components/SearchBar";
import { useEffect } from "react";

import LOGO1 from "../assets/LOGO4.png";
// import homep2 from "../assets/homep2.png";

// import home1 from "../assets/homep1.png"
// import LOGO4 from "../assets/LOGO4.png"
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userid = localStorage.getItem("userid");
    if (!userid) {
      navigate("/login");
    }
  }, []);

  const data = ["UC Irvine", "UCLA", "USC"];
  return (
    <div>
      <div className="top-halfp1">
        <div className="format-logop1">
          <img src={house} alt="lite" className="logo fadeInBottom cssanimation" />
        </div>

        <div className="title-align flex justify-between w-full px-20 ">
          {/* <img src={LOGO1} alt="lite" className="logo-home" /> */}
          <h1 className="text-big fadeInBottom cssanimation delay-2">CAMPUS NEST</h1>
          <h1 className="text-small fadeInBottom cssanimation delay-4">
            CampusNest is your trusted partner in your pursuit of housing
          </h1>
        </div>

        {/* <div className="search-func"> */}

        {/* <div className='format-logo'>
            <img src={LOGO1} alt="lite" className="logo" />
          </div> */}

        {/* </div> */}
      </div>

      <div className="top-halfp2 fadeInBottom cssanimation delay-6">
        <div className="search-top">
          {/* <h2 className="subheader font-semibold">Listings</h2> */}

          {/* <div className="main-search">
            <SearchBar data={data}></SearchBar>
          </div> */}
        </div>
      </div>

      <div className="image-container">
        <div className=" fadeInBottom cssanimation delay-1">
          <a href="/listing/STb2paKL2QaqF4vPo0Iu">
            <img
              src={pic1}
              alt="lite"
              className="flyyy card"
            />
          </a>
        </div>
        <div className="  fadeInBottom cssanimation delay-2	">
          <a href="/listing/STb2paKL2QaqF4vPo0Iu">
            <img
              src={pic2}
              alt="lite"
              className="flyyy card"
            />
          </a>
        </div>

        <div className="  fadeInBottom cssanimation delay-3	">
          <a href="/listing/STb2paKL2QaqF4vPo0Iu">
            <img
              src={pic3}
              alt="lite"
              className="flyyy card"
            />
          </a>
        </div>

        <div className="  fadeInBottom cssanimation transition delay-4">
          <a href="/listing/STb2paKL2QaqF4vPo0Iu">
            <img
              src={pic4}
              alt="lite"
              className="flyyy card"
            />
          </a>
        </div>
      </div>

      <div className="bottom-half">
        <div className="informational-1">
          <div className="info-pic">
            <img src={infop1} alt="lite" className="white-pic rounded-lg" />
          </div>

          <div className="text text-end">
            <h2 className="text-3xl font-bold my-8">
              What Makes Us Different:
            </h2>
            <h2 className="text-2xl my-4">Find the housing that suits you.</h2>
            <h2 className="text-2xl my-4">
              No more posting on social media or worrying about lease offers.
            </h2>
          </div>
        </div>

        <div className="informational-2">
          <div className="text">
            <h2 className="text-3xl font-bold my-8 ">Our Features:</h2>
            <h2 className="text-2xl my-4">
              All you have to do is search your school and look for your
              preferences.{" "}
            </h2>
            <h2 className="text-2xl my-4">
              CampusNet will make finding housing stress-free.
            </h2>
          </div>

          <div className="info-pic">
            <img src={infop2} alt="lite" className="white-pic rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
