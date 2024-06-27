import { Fragment } from 'react/jsx-runtime';
import { outlayAPI } from '../../services/OutlayService';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IOutlay, IOutlayCreate } from '../../models/IOutlay';

import file from '/src/assets/file.svg'
import trashcan from '/src/assets/trashcan.svg'

import './mainSection.scss'


interface IOutlayRow extends IOutlay, IOutlayCreate { }

const MainSection = () => {

    const eID = 128694

    const { data: outlay_rows, isLoading, error } = outlayAPI.useGetAllOutlayRowsQuery(eID)

    // eslint-disable-next-line no-empty-pattern
    const [createOutlayRow, { }] = outlayAPI.useCreateOutlayRowMutation()
    // eslint-disable-next-line no-empty-pattern
    const [updateOutlayRow, { }] = outlayAPI.useUpdateOutlayRowMutation()
    // eslint-disable-next-line no-empty-pattern
    const [deleteOutlayRow, { }] = outlayAPI.useDeleteOutlayRowMutation()

    const [showTrashcan, setShowTrashcan] = useState(false);
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
        rowName: '',
        salary: 0,
        supportCosts: 0
    });

    const handleAddChild = (parentId: number) => {
        if (!parentId) {
            setShowEditor(false);
            return
        }

        if (!showEditorCurrentRow) setShowEditor(true);
        setFormData({ ...formData, parentId });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();

            await createOutlayRow({ eID, body: formData }).then(() => {
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
                    rowName: '',
                    salary: 0,
                    supportCosts: 0
                })
            });
        }
    };

    const handleKeyPressUpdate = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await updateOutlayRow({ eID, rID: showEditorCurrentRow!, body: formData }).then(() => {
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
                    rowName: '',
                    salary: 0,
                    supportCosts: 0
                })
            })
        }
    }

    const handleDeleteRow = (rID: number) => {
        deleteOutlayRow({ eID, rID })
    }


    const LineUnderFile = ({ height, top }: { height: number, top: number }) => {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: `${top}%`,
                    left: '50%',
                    width: '1px',
                    height: `${height}px`,
                    backgroundColor: '#ccc',
                    transform: 'translate(-50%)',
                    pointerEvents: 'none',
                }}
            />
        );
    };

    const LineBeforeFile = () => {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '40%',
                    left: '-78%',
                    width: '12.5px',
                    height: '1px',
                    backgroundColor: '#ccc',
                    pointerEvents: 'none',
                }}
            />
        );
    };

    const rowEditor = (row: IOutlayRow, level: number) => {
        return (
            <>
                <td style={level ? { paddingLeft: `${(level * 20) + 12}px` } : {}}>
                    {level_icon(row as IOutlayRow)}
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
        )
    };


    const renderNewRow = (row: IOutlayCreate, level = 0) => {
        return (
            <tr>
                <td style={level ? { paddingLeft: `${(level * 20) + 12}px` } : {}}>
                    {level_icon(row as IOutlayRow, true)}
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


    const isTopLevelObject = (arr : IOutlay[], objToCheck: IOutlay) => {
        const topLevelIds = new Set(arr.map(obj => obj.id));

        function traverse(obj: IOutlay) {
            if (obj.child && obj.child.length > 0) {
                obj.child.forEach(child => {
                    topLevelIds.delete(child.id);
                    traverse(child);
                });
            }
        }

        arr.forEach(obj => traverse(obj));

        return topLevelIds.has(objToCheck.id);
    }

    const countItems = (parentItem : IOutlay) => {
        let count = 0;
      
        for (let i = 0; i < parentItem.child.length; i++) {
          if (i === parentItem.child.length - 1) {
            return count + 1;
          }
          count += countAllItems(parentItem.child[i]);
        }
      
        return count;
      }
      
      function countAllItems(item: IOutlay) {
        let count = 1;
      
        for (const child of item.child) {
          count += countAllItems(child);
        }
      
        return count;
      }


    const level_icon = (row: IOutlayRow, rowEditorStatus: boolean = false) => {

        const isTopLevelRow = isTopLevelObject(outlay_rows!, row)

        return (
            <div
                className={`buttons_container ${showTrashcan ? 'buttons_container_active' : ''}`}
                onMouseEnter={() => setShowTrashcan(true)}
                onMouseLeave={() => setShowTrashcan(false)}>

                <button onClick={() => handleAddChild(row.id)}>
                    <div className="file_icon">
                        <div className="background_img">
                            <img src={file} alt="file" />
                        </div>

                        {!isTopLevelRow && !rowEditorStatus && <LineBeforeFile />}
                        {row.child && row.child.length > 0 && <LineUnderFile height={countItems(row) * 73} top={40} />}
                    </div>

                </button>
                {showTrashcan && row.id && showEditorCurrentRow !== row.id && <button onClick={() => handleDeleteRow(row.id!)}><img src={trashcan} alt="trashcan" /></button>}
            </div>
        )
    }

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
            supportCosts: row.supportCosts
        });
        setShowEditor(false);

    }

    const renderRows = (rows: IOutlay[], level = 0) => {
        return rows.map(row => (
            <Fragment key={row.id}>
                <tr onDoubleClick={() => handlerDoubleClick(row as IOutlayRow)}>
                    {row.id === showEditorCurrentRow ? rowEditor(row as IOutlayRow, level) :
                        <>
                            <td style={level ? { paddingLeft: `${(level * 20) + 12}px` } : {}}>{level_icon(row as IOutlayRow)}</td>
                            <td>{row.rowName}</td>
                            <td>{row.salary}</td>
                            <td>{row.equipmentCosts}</td>
                            <td>{row.overheads}</td>
                            <td>{row.estimatedProfit}</td>
                        </>
                    }
                </tr>

                {row.child && row.child.length > 0 && renderRows(row.child, findNestingLevel(row.id, outlay_rows!) + 1)}
                {showEditor && formData.parentId === row.id && renderNewRow(formData, findNestingLevel(formData.parentId, outlay_rows!) + 1)}
            </Fragment>
        ));
    };

    const findNestingLevel = (parentId: number, Bs: IOutlay[]) => {

        let level = 0;

        function traverse(obj: IOutlay, currentLevel: number) {
            if (parentId === obj.id) {
                level = currentLevel;
                return;
            }

            if (obj.child && obj.child.length > 0) {
                for (const child of obj.child) {
                    traverse(child, currentLevel + 1);
                    if (level > 0) {
                        return;
                    }
                }
            }
        }

        for (const B of Bs) {
            traverse(B, 0);
            if (level > 0) {
                return level;
            }
        }

        return level;
    }



    return (
        <div className="main-section">
            <div className="main-section__title">
                <div className="main-section__title-item">
                    Строительно-монтажные работы
                </div>
                <div className="main-section__title-space"></div>
            </div>

            <main>
                {isLoading && <div style={{ textAlign: 'center', padding: '20px' }}>Идет загрузка...</div>}
                {error && <div style={{ textAlign: 'center', padding: '20px' }}>Произошла ошибка при загрузке</div>}
                {!isLoading && !error &&
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
                                {outlay_rows?.length ? renderRows(outlay_rows) : renderNewRow(formData, 0)}
                            </tbody>
                        </table>
                    </>}

            </main>
        </div>
    );

};

export default MainSection;