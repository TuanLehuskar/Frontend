import React from "react";

class DistrictSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDistrict: "",
      selectedWard: "",
      wards: [],
    };
  }

  handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    this.setState({ selectedDistrict });

    // Lấy danh sách phường/xã tương ứng với quận/huyện được chọn
    const { districts } = this.props;
    const district = districts.find((d) => d.id === selectedDistrict);
    const wards = district ? district.wards : [];
    this.setState({ wards });
  };

  handleWardChange = (event) => {
    const selectedWard = event.target.value;
    this.setState({ selectedWard });
  };

  render() {
    const { selectedDistrict, selectedWard, wards } = this.state;
    const { districts } = this.props;

    return (
      <div className="d-flex">
        <div className="mt-3">
          <label htmlFor="district">Quận/Huyện:</label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={this.handleDistrictChange}
          >
            <option value="">Chọn quận/huyện</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-3 ms-3">
          <label htmlFor="ward">Phường/Xã:</label>
          <select
            id="ward"
            value={selectedWard}
            onChange={this.handleWardChange}
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
