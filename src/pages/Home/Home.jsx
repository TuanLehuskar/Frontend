import React, { useState } from "react"; // nạp thư viện react
import { Link } from "react-router-dom";
import style from "./style.module.css";
import { joinCls } from "../../utilities/text.utilities";
import Image from "./images/bg.jpg";
import mapImg from "./images/map.png";
import dashboard from "./images/dashboard.png";
import warning from "./images/server.png";
import { MAP_PAGE_PATH } from "../Map/constant";
import { DASHBOARD_PAGE_PATH } from "../Dashboard/constant";
import { WARNING_PAGE_PATH } from "../Warning/constant";
import TuanImg from "./images/tuan.jpg";
import ThienImg from "./images/thien.jpg";
function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  return (
    <>
      <div className={joinCls("", style["main-bg"])}>
        <div className={joinCls("container", style["introduce-part"])}>
          <div className="text-center">
            <h1 className="pt-5 ">Welcome to</h1>
            <h1 className={joinCls("fw-bold", style["title-text"])}>
              Urban Air Quality Monitoring System
            </h1>
          </div>
          <div className="row my-5">
            <div className="col-6">
              <img
                src={Image}
                className={joinCls("w-100 shadow-lg", style["bg-img"])}
                alt=""
              />
            </div>
            <div className="col-6">
              <div className="row h-100 flex-column justify-content-center align-items-center">
                <a
                  href="#features"
                  className={joinCls("mb-3 text-center", style["about-btn"])}
                >
                  About Features
                </a>
                <a
                  href="#about-us"
                  className={joinCls("mb-3 text-center", style["about-btn"])}
                >
                  About Us
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          id="features"
          className={joinCls("container mb-5", style["features"])}
        >
          <h1 className={joinCls("fw-bold text-center", style["title-text"])}>
            Features
          </h1>
          <div className="row justify-content-between mt-5">
            <div
              className={joinCls(
                "col-3 d-flex p-3 flex-column shadow",
                style["hover-scroll-component"],
                isHovered && style["hovered"]
              )}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              <div className={joinCls("", style["image-container"])}>
                <img src={mapImg} alt="Image" className="w-100" />
              </div>
              <div
                className={joinCls("text-white text-center", style["content"])}
              >
                <h2 className="mb-3">Map</h2>
                <h5 className="mb-4">
                  A map to display and access data for locations within the
                  urban area
                </h5>
                <Link
                  className={joinCls("", style["about-btn"])}
                  to={MAP_PAGE_PATH}
                >
                  Discover
                </Link>
              </div>
            </div>
            <div
              className={joinCls(
                "col-3 d-flex p-3 flex-column shadow",
                style["hover-scroll-component"],
                isHovered && style["hovered"]
              )}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              <div className={joinCls("", style["image-container"])}>
                <img src={dashboard} alt="Image" className="w-100" />
              </div>
              <div
                className={joinCls("text-white text-center", style["content"])}
              >
                <h2 className="mb-3">Dashboard</h2>
                <h5 className="mb-4">
                  Visualization of collected data on air quality
                </h5>
                <Link
                  className={joinCls("", style["about-btn"])}
                  to={DASHBOARD_PAGE_PATH}
                >
                  Discover
                </Link>
              </div>
            </div>
            <div
              className={joinCls(
                "col-3 d-flex p-3 flex-column shadow",
                style["hover-scroll-component"],
                isHovered && style["hovered"]
              )}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              <div className={joinCls("", style["image-container"])}>
                <img src={warning} alt="Image" className="w-100" />
              </div>
              <div
                className={joinCls("text-white text-center", style["content"])}
              >
                <h2 className="mb-3">Warning</h2>
                <h5 className="mb-4">
                  A system for storing areas with air pollution levels harmful
                  to human health
                </h5>
                <Link
                  className={joinCls("", style["about-btn"])}
                  to={WARNING_PAGE_PATH}
                >
                  Discover
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          id="about-us"
          className={joinCls("container mb-5", style["about-us"])}
        >
          <h1 className={joinCls("fw-bold text-center", style["title-text"])}>
            About us
          </h1>
          <div className="row mt-5 justify-content-around align-items-center">
            <div className="col-3">
              <img src={TuanImg} alt="" className={style["intro-img"]} />
            </div>
            <div
              className={joinCls("col-3 text-center", style["about-us-intro"])}
            >
              We are senior students at the University of Science and Technology
              - The University of Danang. This product is our graduation project
              aiming to build a tool to assist the community and support the
              residents.
            </div>
            <div className="col-3">
              <img src={ThienImg} alt="" className={style["intro-img"]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
