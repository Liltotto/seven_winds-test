import { _eID } from "../../constants/eID";
import { IOutlay, IOutlayCreate } from "../../models/IOutlay";
import {
  createRowFromApi,
  deleteRowFromApi,
  updateDataFromApi,
} from "./CUD_local_operations";

export const handleUpdateRow = async (
  updateOutlayRow: any,
  setDataFromApi: React.Dispatch<React.SetStateAction<IOutlay[]>>,
  { eID, rID, body }: { eID: number; rID: number; body: IOutlayCreate }
) => {
  try {
    const response = await updateOutlayRow({ eID, rID: rID, body }).unwrap();
    updateDataFromApi(setDataFromApi, response.current, response.changed);
  } catch (error) {
    console.error("Error updating row:", error);
  }
};

export const handleDeleteRow = async (
  deleteOutlayRow: any,
  setDataFromApi: React.Dispatch<React.SetStateAction<IOutlay[]>>,
  rID: number
) => {
  try {
    const response = await deleteOutlayRow({ eID: _eID, rID }).unwrap();
    deleteRowFromApi(setDataFromApi, rID, response.changed);
  } catch (error) {
    console.error("Error deleting row:", error);
  }
};

export const handleCreateRow = async (
  createOutlayRow: any,
  setDataFromApi: React.Dispatch<React.SetStateAction<IOutlay[]>>,
  { eID, body }: { eID: number; body: IOutlayCreate }
) => {
  try {
    const response = await createOutlayRow({ eID, body }).unwrap();
    createRowFromApi(setDataFromApi, response.current, response.changed);
  } catch (error) {
    console.error("Error creating row:", error);
  }
};
