import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { getCordinateToAddress } from "../../../utils/axios/location";
import Icofont from "react-icofont";

const LocateMe = (props) => {
  const { setLocationInfo, address, setalert } = props;

  const [locateMeLoad, setlocateMeLoad] = useState(false);

  const handleLocateMe = async () => {
    setlocateMeLoad(true);
    const newAddress = await getCordinateToAddress();
    setlocateMeLoad(false);
    let type = typeof newAddress;
    if (type === "object") {
      setLocationInfo(newAddress);
    } else {
      setalert({ variant: "danger", text: newAddress });
    }
  };

  const handleClear = () => {
    setLocationInfo(null);
  };

  return (
    <React.Fragment>
      {address ? (
        <button type="button" className="locate-me" onClick={handleClear}>
          Clear &nbsp;
          {locateMeLoad && <Spinner animation="border" size="sm" />}
        </button>
      ) : (
        <button type="button" className="locate-me" onClick={handleLocateMe}>
          <Icofont icon="ui-pointer" /> Locate Me &nbsp;
          {locateMeLoad && <Spinner animation="border" size="sm" />}
        </button>
      )}
    </React.Fragment>
  );
};

export default LocateMe;
