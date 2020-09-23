import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  setCookieLocationInfo,
  getCookieLocationInfo,
} from "../../utils/jscookies";

const FabSearchService = ({ setRes, id }) => {
  const [locationInfo, setlocationInfo] = useState();

  let autocomplete = useRef();

  console.log("location info", getCookieLocationInfo);
  return <div>h</div>;
};

export default FabSearchService;
