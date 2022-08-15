import { Group } from "./../../interfaces/RecordEntities";
import { ListItemProps } from "./../../interfaces/PagesProps";

type IProps = ListItemProps<Group>;

export const GroupListItem: React.FC<IProps> = ({ record }) => {
  return (
    <>
      <div className="outputjson">
        {JSON.stringify(record, null, 4) || "Unknown"}
      </div>
      {/* <div>
        <div className="groupName">{record.groupName}</div>
        <div className="children">
          {JSON.stringify(record.children, null, 4) || "Unknown"}
        </div>
        <div className="teachers">
          {JSON.stringify(record.teachers, null, 4) || "Unknown"}
        </div>
        <div className="announcements">
          {JSON.stringify(record.announcements, null, 4) || "Unknown"}
        </div>
      </div> */}
    </>
  );
};
