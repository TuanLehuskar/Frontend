import React, { useEffect, useState } from "react"; // nạp thư viện react
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
import BKImg from "./images/logoBK.jpg";
import DienImg from "./images/logoDien.png";
import axios from "axios";

function HomePage() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.HOST}`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
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
            <div className="col-lg-6 col-12">
              <img
                src={Image}
                className={joinCls("w-100 shadow-lg", style["bg-img"])}
                alt=""
              />
            </div>
            <div className="col-lg-6 col-12 mt-lg-0 mt-5">
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
          className={joinCls("container mb-lg-5", style["features"])}
        >
          <h1 className={joinCls("fw-bold text-center", style["title-text"])}>
            Features
          </h1>
          <div className="container">
            <div className="row justify-content-lg-between justify-content-center mt-5">
              <div
                className={joinCls(
                  "col-lg-3 col-10 mb-lg-0 mb-5 d-flex p-3 flex-column shadow",
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
                  className={joinCls(
                    "text-white text-center",
                    style["content"]
                  )}
                >
                  <div
                    className={joinCls("mb-lg-3 mb-0", style["feature-name"])}
                  >
                    Map
                  </div>
                  <div
                    className={joinCls("mb-lg-4 mb-3", style["feature-intro"])}
                  >
                    A map to display and access data for locations within the
                    urban area
                  </div>
                  <Link
                    className={joinCls("", style["discover-btn"])}
                    to={MAP_PAGE_PATH}
                  >
                    Discover
                  </Link>
                </div>
              </div>
              <div
                className={joinCls(
                  "col-lg-3 col-10 mb-lg-0 mb-5 d-flex p-3 flex-column shadow",
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
                  className={joinCls(
                    "text-white text-center",
                    style["content"]
                  )}
                >
                  <div
                    className={joinCls("mb-lg-3 mb-0", style["feature-name"])}
                  >
                    Dashboard
                  </div>
                  <div
                    className={joinCls("mb-lg-4 mb-3", style["feature-intro"])}
                  >
                    Visualization of collected data on air quality
                  </div>
                  <Link
                    className={joinCls("", style["discover-btn"])}
                    to={DASHBOARD_PAGE_PATH}
                  >
                    Discover
                  </Link>
                </div>
              </div>
              <div
                className={joinCls(
                  "col-lg-3 col-10 mb-lg-0 mb-5 d-flex p-3 flex-column shadow",
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
                  className={joinCls(
                    "text-white text-center",
                    style["content"]
                  )}
                >
                  <div className={joinCls("mb-0", style["feature-name"])}>
                    Warning
                  </div>
                  <div className={joinCls("mb-3", style["feature-intro"])}>
                    A system for storing areas with air pollution levels harmful
                    to human health
                  </div>
                  <Link
                    className={joinCls("", style["discover-btn"])}
                    to={WARNING_PAGE_PATH}
                  >
                    Discover
                  </Link>
                </div>
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
          <div className="row mt-3 mt-lg-5 flex-column flex-lg-row justify-content-around align-items-center">
            <div className="col-lg-3 col-12 order-2 order-lg-1 d-flex flex-column align-items-center mt-lg-0 mt-3">
              <img src={TuanImg} alt="" className={style["intro-img"]} />
              <p className={joinCls("mt-3", style["intro-name"])}>
                Le Phuoc Anh Tuan
              </p>
              <p className={joinCls("", style["intro-title"])}>
                Control Engineering & Automation
              </p>
            </div>
            <div
              className={joinCls(
                "col-lg-3 col-12 order-1 order-lg-2",
                style["about-us-intro"]
              )}
            >
              We are senior students at the Faculty of Electrical Engineering in
              University of Science and Technology - The University of Danang.
              This product is our graduation project aimed at building a tool to
              assist the community and support the residents.
            </div>
            <div className="col-lg-3 col-12 order-3 order-lg-3 d-flex flex-column align-items-center">
              <img src={ThienImg} alt="" className={style["intro-img"]} />
              <p className={joinCls("mt-3", style["intro-name"])}>
                Nguyen Hoang Thien
              </p>
              <p className={joinCls("", style["intro-title"])}>
                Control Engineering & Automation
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={joinCls("", style["footer"])}>
        <div className="container py-4 text-white">
          <div className="row">
            <div className="col-lg-6 col-12 justify-content-center">
              <p className="mb-0 text-center">
                <span className="fw-bold d-lg-inline d-block">
                  Supervisor/Advisor:
                </span>{" "}
                Ph.D. Nguyen Thi Thanh Quynh
              </p>
              <div className="row">
                <div className="col-lg-6 col-12 d-flex justify-content-around align-items-center">
                  <img src={DienImg} alt="" className={style["logo-1"]} />
                  <img src={BKImg} alt="" className={style["logo-2"]} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12">
              <p className="text-center fw-bold">CONTACT</p>
              <div className="row text-center text-lg-start">
                <p>
                  <i className="fa-solid fa-square-phone me-2"></i>
                  0935114910 - 0888929846
                </p>
                <p>
                  <i className="fa-solid fa-envelope me-2"></i>{" "}
                  tl28072001@gmail.com - nhthien0984@gmail.com{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
