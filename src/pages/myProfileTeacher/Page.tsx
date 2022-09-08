import { Loader } from "@mantine/core";
import { useState } from "react";
import useAuth from "../../api/useAuth";

import useSWR from "swr";
import { ITeacher } from "../../interfaces/Entities";
import DetailsModal from "./DetailsModal";
import SiteHeader from "../../components/SiteHeader";
import { fetcher } from "../../api/fetch";
import EditModal from "./EditModal";
import ResetPasswordModal from "./ResetPasswordModal";

const ProfilePage = () => {
  const [editingItem, setEditingItem] = useState<ITeacher | null>(null);
  const [detailsItem, setDetailsItem] = useState<ITeacher | null>(null);
  const [passwordItem, setPasswordItem] = useState<ITeacher | null>(null);

  const { isParent } = useAuth();

  //fetch data
  const { data, error, isValidating, mutate } = useSWR(
    !isParent ? `${process.env.REACT_APP_URL}/api/teacher/my-data` : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
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
      {!data ? null : (
        <>
          <SiteHeader title={pageTitleString} error={error} />

          {editingItem && (
            <EditModal
              item={data}
              mutate={mutate}
              handleClose={() => setEditingItem(null)}
            />
          )}

          {passwordItem && (
            <ResetPasswordModal
              item={data}
              mutate={mutate}
              handleClose={() => setPasswordItem(null)}
            />
          )}

          <DetailsModal
            item={data}
            mutate={mutate}
            handleEdit={() => setEditingItem(data)}
            handlePassword={() => setPasswordItem(data)}
            handleClose={() => setDetailsItem(null)}
          />
        </>
      )}
    </>
  );
};
export default ProfilePage;
