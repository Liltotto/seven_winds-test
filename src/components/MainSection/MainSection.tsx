import { Fragment } from "react/jsx-runtime";
import { outlayAPI } from "../../services/OutlayService";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { IOutlay, IOutlayCreate, IOutlayRow } from "../../models/IOutlay";
import { _eID } from "../../constants/eID";
import {
  handleCreateRow,
  handleUpdateRow,
} from "../../utils/CUD_operations/CUD_operations_handlers";
import { level_icon } from "../LevelIcon/LevelIcon";
import { renderNewRow } from "../RowsCreateAndEdit/RowCreate";
import { findNestingLevel } from "../../utils/Array_calculation/Array_calculation";
import { rowEditor } from "../RowsCreateAndEdit/RowEdit";

import "./mainSection.scss";

const MainSection = () => {
  const [dataFromApi, setDataFromApi] = useState<IOutlay[]>([]);

  const {
    data: outlay_rows,
    isLoading,
    error,
  } = outlayAPI.useGetAllOutlayRowsQuery(_eID);

  useEffect(() => {
    if (outlay_rows) {
      setDataFromApi(outlay_rows);
    }
  }, [outlay_rows]);

  const [createOutlayRow] = outlayAPI.useCreateOutlayRowMutation();

  const [updateOutlayRow] = outlayAPI.useUpdateOutlayRowMutation();

  const [deleteOutlayRow] = outlayAPI.useDeleteOutlayRowMutation();

  const [showTrashcan, setShowTrashcan] = useState<number>(0);
  const [showEditor, setShowEditor] = useState(false);
  const [showEditorCurrentRow, setShowEditorCurrentRow] = useState<number>();

  const [formData, setFormData] = useState<IOutlayCreate>({
    equipmentCosts: 0,
    estimatedProfit: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    materials: 0,
    mimExploitation: 0,
    overheads: 0,
    parentId: null,
    rowName: "",
    salary: 0,
    supportCosts: 1,
  });

  useEffect(() => {
    if (!dataFromApi?.length) setFormData({ ...formData, parentId: null });
  }, [dataFromApi?.length]);

  const handleAddChild = (parentId: number) => {
    if (!parentId) {
      setShowEditor(false);
      return;
    }

    if (!showEditorCurrentRow) setShowEditor(true);
    setFormData({ ...formData, parentId });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      await handleCreateRow(createOutlayRow, setDataFromApi, {
        eID: _eID,
        body: formData,
      }).then(() => {
        setShowEditorCurrentRow(undefined);
        setShowEditor(false);
        setFormData({
          equipmentCosts: 0,
          estimatedProfit: 0,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: 0,
          parentId: 0,
          rowName: "",
          salary: 0,
          supportCosts: 1,
        });
      });
    }
  };

  const handleKeyPressUpdate = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleUpdateRow(updateOutlayRow, setDataFromApi, {
        eID: _eID,
        rID: showEditorCurrentRow!,
        body: formData,
      }).then(() => {
        setShowEditorCurrentRow(undefined);
        setShowEditor(false);
        setFormData({
          equipmentCosts: 0,
          estimatedProfit: 0,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          overheads: 0,
          parentId: 0,
          rowName: "",
          salary: 0,
          supportCosts: 1,
        });
      });
    }
  };

  const handlerDoubleClick = (row: IOutlayRow) => {
    setShowEditorCurrentRow(row.id);
    setFormData({
      equipmentCosts: row.equipmentCosts,
      estimatedProfit: row.estimatedProfit,
      machineOperatorSalary: row.machineOperatorSalary,
      mainCosts: row.mainCosts,
      materials: row.materials,
      mimExploitation: row.mimExploitation,
      overheads: row.overheads,
      parentId: row.parentId,
      rowName: row.rowName,
      salary: row.salary,
      supportCosts: row.supportCosts,
    });
    setShowEditor(false);
  };

  const renderRows = (rows: IOutlay[], level = 0) => {
    return rows.map((row) => (
      <Fragment key={row.id}>
        <tr onDoubleClick={() => handlerDoubleClick(row as IOutlayRow)}>
          {row.id === showEditorCurrentRow ? (
            rowEditor({
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
            })
          ) : (
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
              <td>{row.rowName}</td>
              <td>{row.salary}</td>
              <td>{row.equipmentCosts}</td>
              <td>{row.overheads}</td>
              <td>{row.estimatedProfit}</td>
            </>
          )}
        </tr>

        {row.child &&
          row.child.length > 0 &&
          renderRows(row.child, findNestingLevel(row.id, dataFromApi!) + 1)}
        {showEditor &&
          formData.parentId === row.id &&
          renderNewRow(
            formData,
            findNestingLevel(formData.parentId, dataFromApi!) + 1,
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
            }
          )}
      </Fragment>
    ));
  };

  return (
    <div className="main-section">
      <div className="main-section__title">
        <div className="main-section__title-item">
          Строительно-монтажные работы
        </div>
        <div className="main-section__title-space"></div>
      </div>

      <main>
        {isLoading && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Идет загрузка...
          </div>
        )}
        {error && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            Произошла ошибка при загрузке
          </div>
        )}
        {!isLoading && !error && (
          <>
            <table className="main-section__table">
              <thead>
                <tr>
                  <th>Уровень</th>
                  <th>Наименование работ</th>
                  <th>Основная з/п</th>
                  <th>Оборудование</th>
                  <th>Накладные расходы</th>
                  <th>Сметная прибыль</th>
                </tr>
              </thead>
              <tbody>
                {dataFromApi?.length
                  ? renderRows(dataFromApi)
                  : renderNewRow(formData, 0, {
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
                    })}
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  );
};

export default MainSection;
