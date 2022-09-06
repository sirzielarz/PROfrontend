import useAuth from "../api/useAuth";
import useSWR from "swr";
import { fetcher } from "../api/fetch";
import { IPerson, PrivateMessageDTO } from "../interfaces/Entities";
import { SWR_getParents } from "../api/parent";
import { IPVersion } from "net";

const useDataFetcher = () => {
  const { isParent } = useAuth();

  function getPotencialRecipients(): IPerson[] {
    const prData: IPerson[] = [];
    if (isParent) {
      //get all parents
      const allParentData = SWR_getParents();
      console.log(allParentData);
    } else {
      //get teachers from myData
    }

    return prData;
  }

  const {
    data: myData,
    error,
    isValidating,
    mutate,
  } = useSWR(
    isParent
      ? `${process.env.REACT_APP_URL}/api/parent/my-data`
      : `${process.env.REACT_APP_URL}/api/teacher/my-data`,
    fetcher,
    {
      revalidateOnFocus: false,
      // revalidateOnReconnect: false,
      // refreshWhenOffline: false,
      // refreshWhenHidden: false,
    }
  );

  //get messages
  const dataMessages: PrivateMessageDTO[] = myData
    ? isParent
      ? myData.privateMessages
      : myData.privateMessages
    : null;

  return { data: myData, error, dataMessages, isValidating, mutate };
};

export default useDataFetcher;
