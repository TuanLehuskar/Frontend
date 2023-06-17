import React from "react"; // nạp thư viện react
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import { joinCls } from "../../utilities/text.utilities";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";
import { DUT_1_PAGE_PATH } from "../../pages/Dashboard/SubPage/DUTPage1/constant";
import { DASHBOARD_PAGE_PATH } from "../../pages/Dashboard/constant";
import { DUT_2_PAGE_PATH } from "../../pages/Dashboard/SubPage/DUTPage2/constant";

function SubNav() {
  return (
    <div className={joinCls(style["sub-nav"])}>
      <nav className="w-100">
        <ul>
          <li>
            <NavLink to={DASHBOARD_PAGE_PATH}>DUT-1</NavLink>
          </li>
          <li>
            <NavLink
              className={joinCls("", style["nav-link"])}
              to={DUT_2_PAGE_PATH}
            >
              DUT-2
            </NavLink>
          </li>
          <li>
            <NavLink className={joinCls("", style["nav-link"])} to="/dut-3">
              DUT-3
            </NavLink>
          </li>
          <li>
            <NavLink
              className={joinCls("", style["nav-link"])}
              to="/dut-center"
            >
              DUT-Center
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default SubNav;
