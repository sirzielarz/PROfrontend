import { Group } from "./../../interfaces/RecordEntities";
import { ListItemProps } from "./../../interfaces/PagesProps";

type IProps = ListItemProps<Group>;

export const GroupListItem: React.FC<IProps> = ({ record }) => {
  return (
    <div>
      <div className="groupName">{record.groupName}</div>
      <div className="children">
        {JSON.stringify(record.children) || "Unknown"}
      </div>
      <div className="teachers">
        {JSON.stringify(record.teachers) || "Unknown"}
      </div>
    </div>
  );
};
