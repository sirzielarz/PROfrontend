import { Grid, Loader } from "@mantine/core";
import React, { useEffect, useState } from "react";
import useAuth from "../../api/useAuth";
import { ChildrenList } from "./ChildrenList";
import { ChildData } from "./ChildData";
import SiteHeader from "../../components/SiteHeader";
import {
  ChildMyDataDTO,
  IPerson,
  ParentMyData,
} from "../../interfaces/Entities";
import useSWR from "swr";
import { fetcher } from "../../api/fetch";
import { sortPersons } from "../../helpers/utils";

function MyChildrenPage() {
  const { isParent } = useAuth();
  const [childSelected, setChildSelected] = useState("");

  //const [showAddItem, setShowAddItem] = useState(false);

  useEffect(() => {
    return () => {
      if (childSelected) {
        setChildSelected(childSelected);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, error, isValidating, mutate } = useSWR<ParentMyData, string>(
    isParent ? `${process.env.REACT_APP_URL}/api/parent/my-data` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      // revalidateOnReconnect: false,
      // refreshWhenOffline: false,
      // refreshWhenHidden: false,
    }
  );
  const pageTitleString = "My Children";

  if (error) return <SiteHeader title={pageTitleString} error={error} />;
  if (isValidating || !data)
    return (
      <>
        <SiteHeader title={pageTitleString} error={error} />
        <Loader />
      </>
    );
  // console.log("retrieving parentMyData:", data);
  //IPerson data
  const childrenArray: IPerson[] = [];
  data?.children.map((c) => childrenArray.push(c.child));
  childrenArray.sort(sortPersons);
  //ChildMyDataDTO data
  const childrenData: ChildMyDataDTO[] = [];
  data?.children.map((c) => childrenData.push(c.child));
  childrenData.sort(sortPersons);

  return (
    <>
      <SiteHeader title={pageTitleString} error={error} />
      <>
        <Grid>
          <Grid.Col md={12}>
            <ChildrenList
              childSelected={childSelected}
              setChildSelected={setChildSelected}
              listOfChildren={childrenArray}
            />
          </Grid.Col>
          {childSelected && (
            <Grid.Col md={12}>
              <ChildData
                childSelected={childSelected}
                setChildSelected={setChildSelected}
                mutate={mutate}
                childrenData={childrenData}
              />
            </Grid.Col>
          )}
        </Grid>
      </>
    </>
  );
}

export default MyChildrenPage;
