import useAuth from "../api/useAuth";
import useSWR from "swr";
import { fetcher } from "../api/fetch";
import { PrivateMessageDTO } from "../interfaces/Entities";

const useDataFetcher = () => {
  const { isParent } = useAuth();

  const { data, error } = useSWR(
    isParent
      ? `${process.env.REACT_APP_URL}/api/parent/my-data`
      : `${process.env.REACT_APP_URL}/api/teacher/my-data`,
    fetcher
  );
  //get messages
  const dataMessages: PrivateMessageDTO[] = isParent
    ? data.privateMessages
    : data.privateMessages;

  return { data, error, dataMessages };
};

export default useDataFetcher;
