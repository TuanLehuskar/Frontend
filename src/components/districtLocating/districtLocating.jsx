import React from "react";
import style from "./style.module.css";
import { joinCls } from "../../utilities/text.utilities";

class DistrictSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDistrict: "",
      selectedWard: "",
      wards: [],
    };
  }

  render() {
    const { districts, selectedDistrict, selectedWard } = this.props;
    const district = districts.find((d) => d.id === selectedDistrict);
    const wards = district ? district.wards : [];

    return (
      <div className="d-flex row">
        <div className="col-lg-5 col-12">
          <label
            className={joinCls("me-1", style["label-1"])}
            htmlFor="district"
          >
            Quận/Huyện:
          </label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={this.props.onChangeDistrict}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-lg-5 col-12 mt-lg-0 mt-2">
          <label className={joinCls("me-3", style["label-1"])} htmlFor="ward">
            Phường/Xã:
          </label>
          <select
            id="ward"
            value={selectedWard}
            onChange={this.props.onChangeWard}
          >
            <option value="">Chọn phường/xã</option>
            {wards.map((ward) => (
              <option key={ward.id} value={ward.id}>
                {ward.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default DistrictSelector;
