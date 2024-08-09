import { IOutlay, IOutlayRow } from "../../models/IOutlay";
import {
  countItems,
  isTopLevelObject,
} from "../../utils/Array_calculation/Array_calculation";
import { handleDeleteRow } from "../../utils/CUD_operations/CUD_operations_handlers";
import { LineBeforeFile, LineUnderFile } from "../Lines/Lines";
import trashcan from "/src/assets/trashcan.svg";
import file from "/src/assets/file.svg";

interface ILevelIconProps {
  row: Partial<IOutlayRow>;
  showEditorCurrentRow: number | undefined;
  showTrashcan: number;
  deleteOutlayRow: any;
  setDataFromApi: React.Dispatch<React.SetStateAction<IOutlay[]>>;
  dataFromApi: IOutlay[];
  setShowTrashcan: React.Dispatch<React.SetStateAction<number>>;
  handleAddChild: (parentId: number) => void;
  rowEditorStatus?: boolean;
}

export const level_icon = ({
  row,
  showEditorCurrentRow,
  showTrashcan,
  deleteOutlayRow,
  setDataFromApi,
  dataFromApi,
  setShowTrashcan,
  handleAddChild,
  rowEditorStatus = false,
}: ILevelIconProps) => {
  const isTopLevelRow = isTopLevelObject(dataFromApi!, row as IOutlay);

  return (
    <div
      className={`buttons_container ${
        showTrashcan === row.id ? "buttons_container_active" : ""
      }`}
      onMouseEnter={() => setShowTrashcan(row.id!)}
      onMouseLeave={() => setShowTrashcan(0)}
    >
      <button onClick={() => handleAddChild(row.id!)}>
        <div className="file_icon">
          <div className="background_img">
            <img src={file} alt="file" />
          </div>

          {!isTopLevelRow && !rowEditorStatus && <LineBeforeFile />}
          {row.child && row.child.length > 0 && (
            <LineUnderFile
              height={countItems(row as IOutlay) * 73.1}
              top={50}
            />
          )}
        </div>
      </button>
      {showTrashcan === row.id && showEditorCurrentRow !== row.id && (
        <button
          onClick={() =>
            handleDeleteRow(deleteOutlayRow, setDataFromApi, row.id!)
          }
        >
          <img src={trashcan} alt="trashcan" />
        </button>
      )}
    </div>
  );
};
