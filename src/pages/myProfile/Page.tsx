import { Loader } from "@mantine/core";

import { useState } from "react";

import SiteHeader from "../../components/SiteHeader";
import useAuth from "../../api/useAuth";
import useDataFetcher from "../../helpers/useDataFetcher";

const MyProfilePage = () => {
  const { isParent } = useAuth();
  const [recipientSelected, setRecipientSelected] = useState("");
  const [showAddItem, setShowAddItem] = useState(false);
  //fetch data
  const { data, error, isValidating, mutate } = useDataFetcher();
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
