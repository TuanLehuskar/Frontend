import React, { useRef, useState, useEffect } from "react"; // nạp thư viện react
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import { joinCls } from "../../utilities/text.utilities";
import style from "./style.module.css";
import analyticsLogo from "./images/analytics.png";
import { NavLink } from "react-router-dom";
import { MAP_PAGE_PATH } from "../../pages/Map/constant";
import { DASHBOARD_PAGE_PATH } from "../../pages/Dashboard/constant";
import { WARNING_PAGE_PATH } from "../../pages/Warning/constant";
import { DUT_1_PAGE_PATH } from "../../pages/Dashboard/SubPage/DUTPage1/constant";
import { HOME_PAGE_PATH } from "../../pages/Home/constants";

function Navigator() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <input
        type="checkbox"
        id="check"
        checked={isOpen}
        onChange={handleToggle}
      />
      <div
        onClick={handleClickOutside}
        className={joinCls(
          style["navigator-container"],
          isOpen && style["open"]
        )}
      >
        <label htmlFor="check">
          <span
            className={joinCls(
              "fa-regular fa-circle-xmark",
              style["close-icon"]
            )}
            id="times"
          ></span>
          <span
            className={joinCls("fa-solid fa-bars", style["toggle-icon"])}
            id="bars"
          ></span>
        </label>
        <div className={style["menu"]}>Menu</div>
        <ol>
          <li>
            <NavLink className={style["nav-component"]} to={HOME_PAGE_PATH}>
              <i className="fa-solid fa-user me-2"></i>HOME
            </NavLink>
          </li>
          <li>
            <NavLink className={style["nav-component"]} to={MAP_PAGE_PATH}>
              <i className="fa-solid fa-earth-americas me-2"></i>MAP
            </NavLink>
          </li>
          <li>
            <NavLink
              className={style["nav-component"]}
              to={DASHBOARD_PAGE_PATH}
            >
              <i className="fa-solid fa-qrcode me-2"></i>DASHBOARD
            </NavLink>
          </li>
          <li>
            <NavLink className={style["nav-component"]} to={WARNING_PAGE_PATH}>
              <i className="fa-solid fa-triangle-exclamation me-2"></i>WARNING
            </NavLink>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Navigator;
