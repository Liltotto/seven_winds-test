import { ChangeEvent, KeyboardEvent } from "react";
import { IOutlay, IOutlayCreate } from "../../models/IOutlay";
import { level_icon } from "../LevelIcon/LevelIcon";

interface IRenderNewRow {
  showEditorCurrentRow: number | undefined;
  showTrashcan: number;
  deleteOutlayRow: any;
  setDataFromApi: React.Dispatch<React.SetStateAction<IOutlay[]>>;
  dataFromApi: IOutlay[];
  setShowTrashcan: React.Dispatch<React.SetStateAction<number>>;
  handleAddChild: (parentId: number) => void;
  formData: IOutlayCreate;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (e: KeyboardEvent<HTMLInputElement>) => Promise<void>;
}

export const renderNewRow = (
  row: Partial<IOutlayCreate>,
  level = 0,
  {
    showEditorCurrentRow,
    showTrashcan,
    deleteOutlayRow,
    setDataFromApi,
    dataFromApi,
    setShowTrashcan,
    handleAddChild,
    formData,
    handleChange,
    handleKeyPress,
  }: IRenderNewRow
) => {
  return (
    <tr>
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
          rowEditorStatus: true,
        })}
      </td>
      <td>
        <input
          name="rowName"
          value={formData.rowName}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </td>
      <td>
        <input
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </td>
      <td>
        <input
          name="equipmentCosts"
          value={formData.equipmentCosts}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </td>
      <td>
        <input
          name="overheads"
          value={formData.overheads}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </td>
      <td>
        <input
          name="estimatedProfit"
          value={formData.estimatedProfit}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </td>
    </tr>
  );
};
