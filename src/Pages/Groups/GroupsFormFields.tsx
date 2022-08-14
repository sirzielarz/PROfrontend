import { useFetch } from "../../hooks/useFetch";
import { FormFieldsProps } from "../../interfaces/PagesProps";
import { Group, Child, Teacher } from "../../interfaces/RecordEntities";

type IProps = FormFieldsProps<Group>;

export const GroupFormFields: React.FC<IProps> = ({
  formState,
  handleChange,
}) => {
  const authorsFetch = useFetch<Group>("groups");

  return (
    <div>
      <div>
        <label>Group name</label>
        <input
          type="text"
          name="groupName"
          value={formState.groupName}
          onChange={handleChange}
        />
      </div>
      <div>
        {/* //https://mantine.dev/core/multi-select/#searchable */}
        <label>Teachers</label>
        <input
          type="select"
          name="teachers"
          //   value={formState.teachers[1]}
          value={[]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Children</label>
        <input
          type="select"
          name="children"
          //   value={formState.teachers[1]}
          value={[]}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label>Teachers</label>
        <select
          name="teachers"
          value={formState.teachers ? formState.teachers.id : ""}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {authorsFetch.records.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div> */}
    </div>
  );
};
