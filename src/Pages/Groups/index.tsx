import { Group } from "./../../interfaces/RecordEntities";
import { RecordIndex } from "./../Record";
import { GroupListItem } from "./ListItem";

export const GroupIndex: React.FC = () => {
  const apiOptions = {
    //relations: ["teacher"]
  };

  return (
    <RecordIndex<Group>
      ListItem={GroupListItem}
      apiPath="group"
      apiOptions={apiOptions}
    />
  );
};
