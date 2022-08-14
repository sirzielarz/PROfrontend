// require("dotenv").config();

import axios from "axios";
import { useState, useEffect } from "react";
import { Configuration } from "../api/Configuration";
import { Record } from "./../interfaces/RecordEntities";

export const useFetch = <T extends Record>(path: string, options?: {}) => {
  const [records, setRecords] = useState<T[]>([]);

  const url = `${process.env.REACT_APP_API}/${path}`;

  const token = Configuration.getInstance().getToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["Content-Type"] =
      "application/x-www-form-urlencoded";
  }
  console.log(options);
  useEffect(() => {
    const callFetchFunction = async () => {
      const res = await axios.get<T[]>(url, { params: options });
      console.log(res);
      setRecords(res.data);
    };
    callFetchFunction();
  }, [url, options]);

  return { records };
};
