import { ChangeEvent, KeyboardEvent } from "react";
import { IOutlay, IOutlayCreate, IOutlayRow } from "../../models/IOutlay";
import { level_icon } from "../LevelIcon/LevelIcon";

interface IRowEditor {
  row: Partial<IOutlayRow>;
  level: number;
  showEditorCurrentRow: number | undefined;
  showTrashcan: number;
  deleteOutlayRow: any;
  setDataFromApi: React.Dispatch<React.SetStateAction<IOutlay[]>>;
  dataFromApi: IOutlay[];
  setShowTrashcan: React.Dispatch<React.SetStateAction<number>>;
  handleAddChild: (parentId: number) => void;
  formData: IOutlayCreate;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPressUpdate: (e: KeyboardEvent<HTMLInputElement>) => Promise<void>;
}

export const rowEditor = ({
  row,
  level,
  showEditorCurrentRow,
  showTrashcan,
  deleteOutlayRow,
  setDataFromApi,
  dataFromApi,
  setShowTrashcan,
  handleAddChild,
  formData,
  handleChange,
  handleKeyPressUpdate,
}: IRowEditor) => {
  return (
    <>
      <td style={level ? { paddingLeft: `${level * 20 + 12}px` } : {}}>
        {level_icon({
          row,
          showEditorCurrentRow,
          showTrashcan,
          deleteOutlayRow,
          setDataFromApi,
          dataFromApi,
          setShowTrashcan,
          handleAddChild,
        })}
      </td>
      <td>
        <input
          name="rowName"
          value={formData.rowName}
          onChange={handleChange}
          onKeyDown={handleKeyPressUpdate}
        />
      </td>
      <td>
        <input
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          onKeyDown={handleKeyPressUpdate}
        />
      </td>
      <td>
        <input
          name="equipmentCosts"
          value={formData.equipmentCosts}
          onChange={handleChange}
          onKeyDown={handleKeyPressUpdate}
        />
      </td>
      <td>
        <input
          name="overheads"
          value={formData.overheads}
          onChange={handleChange}
          onKeyDown={handleKeyPressUpdate}
        />
      </td>
      <td>
        <input
          name="estimatedProfit"
          value={formData.estimatedProfit}
          onChange={handleChange}
          onKeyDown={handleKeyPressUpdate}
        />
      </td>
    </>
  );
};
