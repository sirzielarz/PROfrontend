import useAuth from "../api/useAuth";
import useSWR from "swr";
import { fetcher } from "../api/fetch";
import { PrivateMessageDTO } from "../interfaces/Entities";

const useDataFetcher = () => {
  const { isParent } = useAuth();

  const {
    data: myData,
    error,
    isValidating,
  } = useSWR(
    isParent
      ? `${process.env.REACT_APP_URL}/api/parent/my-data`
      : `${process.env.REACT_APP_URL}/api/teacher/my-data`,
    fetcher,
    {
      revalidateOnFocus: false,
      // revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  //get messages
  const dataMessages: PrivateMessageDTO[] = myData
    ? isParent
      ? myData.privateMessages
      : myData.privateMessages
    : null;

  return { data: myData, error, dataMessages, isValidating };
};

export default useDataFetcher;
