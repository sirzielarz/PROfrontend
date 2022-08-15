import { Group } from "./../../interfaces/RecordEntities";
import { RecordIndex } from "./../Record";
import { GroupListItem } from "./ListItem";
import { GroupFormFields } from "./GroupsFormFields";

export const GroupIndex: React.FC = () => {
  const apiOptions = {
    //relations: ["teacher"] @todo check
  };

  const emptyRecord = {
    groupName: "",
    children: [],
    teachers: [],
    announcements: [],
  };

  return (
    <RecordIndex<Group>
      ListItem={GroupListItem}
      apiPath="group"
      apiOptions={apiOptions}
      FormFields={GroupFormFields}
      emptyRecord={emptyRecord}
    />
  );
};
