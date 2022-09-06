import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { Button, Loader } from "@mantine/core";
import { IGroup } from "../../interfaces/Entities";
import { useState } from "react";

import SiteHeader from "../../components/SiteHeader";

const MyProfilePage = () => {
  const { data, error, mutate, isValidating } = useSWR<IGroup[], string>(
    `${process.env.REACT_APP_URL}/api/group`,
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

  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<IGroup | null>(null);

  const pageTitleString = "My profile";
  if (error) return <SiteHeader title={pageTitleString} error={error} />;
  if ((!data && !error) || isValidating)
    return (
      <>
        <SiteHeader title={pageTitleString} error={error} />
        <Loader />
      </>
    );

  return (
    <>
      <SiteHeader title={pageTitleString} error={error} />
      {data ? data.length > 0 : null}
    </>
  );
};
export default MyProfilePage;
