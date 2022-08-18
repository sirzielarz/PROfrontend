import useSWR from "swr";
import { fetcher } from "./fetch";

interface DataPaylaod<T> {
  [key: string]: T;
}

interface DataResponse<T> {
  data: T;
  isLoading: boolean;
  isError: any;
}

function useRequest<T>(url: string, key: string): DataResponse<T | undefined> {
  const { data: payload, error } = useSWR<DataPaylaod<T>>(url, fetcher);
  const data = payload ? payload[key] : undefined;
  return {
    data,
    isLoading: !data && !error,
    isError: error,
  };
}

export default useRequest;
