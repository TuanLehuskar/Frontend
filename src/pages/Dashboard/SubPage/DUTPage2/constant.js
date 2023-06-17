import { generatePath } from "react-router-dom";
import { DASHBOARD_PAGE_PATH } from "../../constant";

const DASHBOARD_PAGE_PATH_SUB = `${DASHBOARD_PAGE_PATH}/:name`;

export const DUT_2_PAGE_PATH = generatePath(DASHBOARD_PAGE_PATH_SUB, {
  name: "dut_2",
});
