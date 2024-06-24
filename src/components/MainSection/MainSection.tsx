import { Fragment } from 'react/jsx-runtime';
import { outlayAPI } from '../../services/OutlayService';

import file from '/src/assets/file.svg'
import trashcan from '/src/assets/trashcan.svg'

import './mainSection.scss'
import { useState } from 'react';
import { IOutlay, IOutlayCreate } from '../../models/IOutlay';


interface IOutlayNewRow extends Partial<IOutlay> {
    parentId: number;
    level: number;
}

const MainSection = () => {

    const eID = 128694

    const { data: outlay_rows, isLoading, error } = outlayAPI.useGetAllOutlayRowsQuery(eID)

    const [createOutlayRow, {}] = outlayAPI.useCreateOutlayRowMutation()
    const [updateOutlayRow, {}] = outlayAPI.useUpdateOutlayRowMutation()
    const [deleteOutlayRow, {}] = outlayAPI.useDeleteOutlayRowMutation()

    const [showTrashcan, setShowTrashcan] = useState(false);

    const [newRow, setNewRow] = useState<IOutlayNewRow>({
        parentId: 0,
        level: 0,
        rowName: '',
        salary: 0,
        equipmentCosts: 0,
        overheads: 0,
        estimatedProfit: 0
    });
    
    const [formData, setFormData] = useState<IOutlayCreate>({
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
    });

    const handleAddChild = (parentId: number, level: number) => {
        console.log(level);
        setFormData({ ...formData, parentId });
        setNewRow({ ...newRow, parentId, level });
    };

    const handleSaveRow = (newRow) => {
        // Здесь нужно сделать запрос к серверу для сохранения новых данных
        // Например:
        // outlayAPI.addOutlayRow(newRow);

        // После успешного сохранения обновите состояние
        // setOutlayRows(prevRows => {
        //     const addChild = (rows, parentId, newRow) => {
        //         return rows.map(row => {
        //             if (row.id === parentId) {
        //                 return { ...row, child: [...row.child, newRow] };
        //             } else if (row.child && row.child.length > 0) {
        //                 return { ...row, child: addChild(row.child, parentId, newRow) };
        //             }
        //             return row;
        //         });
        //     };
        //     return addChild(prevRows, newRow.parentId, newRow);
        // });
        // setNewRow(newRow.filter(row => row.id !== newRow.id));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            await createOutlayRow({ eID, body: formData });
        }
    };

    // const save = async (e) => {

    //     e.preventDefault();
    //     await createOutlayRow({ eID, body: formData });

    //     console.log(formData);

    // };


    const renderNewRow = (row: IOutlayNewRow, level: number) => {
        
        //.log(level)
        return (
            <tr>
                <td style={{ paddingLeft: `${level * 40}px` }}>
                    {level_icon(row)}
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
                {/* <td>
                    <button onClick={save}>Сохранить</button>
                </td> */}
            </tr>
        );
    };


    const level_icon = (row: IOutlay | IOutlayNewRow) => {
        return (
            <div
                className={`buttons_container ${showTrashcan ? 'buttons_container_active' : ''}`}
                onMouseEnter={() => setShowTrashcan(true)}
                onMouseLeave={() => setShowTrashcan(false)}>
                <button onClick={() => handleAddChild(row.id, findNestingLevel(row.id, outlay_rows!) + 1)}><img src={file} alt="file" /></button>
                {showTrashcan && row.id && <button><img src={trashcan} alt="trashcan" /></button>}
            </div>
        )
    }


    const renderRows = (rows, level = 0) => {
        return rows.map(row => (
            <Fragment key={row.id}>
                <tr>
                    <td style={level ? { paddingLeft: `${level * 40}px` } : {}}>{level_icon(row)}</td>
                    <td>{row.rowName}</td>
                    <td>{row.salary}</td>
                    <td>{row.equipmentCosts}</td>
                    <td>{row.overheads}</td>
                    <td>{row.estimatedProfit}</td>
                </tr>
                {row.child && row.child.length > 0 && renderRows(row.child, findNestingLevel(row.id, outlay_rows!) + 1)}
                {newRow.parentId === row.id && renderNewRow(newRow, findNestingLevel(newRow.parentId, outlay_rows!) + 1)}
            </Fragment>
        ));
    };

    // const getLevel = (id) => {
    //     let level = 0;
    //     let current = outlay_rows?.find(row => row.id === id);
    //     while (current) {

    //         current = current.child?.find(child => child.id === current.id);

    //         if (current) level++;
    //     }
    //     return level;
    // };

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

    // const findNestingLevel2 = (parentId: number, B: IOutlay) => {
    //     console.log(B);
    //     let level = 0;

    //     function traverse(obj: IOutlay, currentLevel: number) {
    //         if (parentId === obj.id) {
    //             console.log(currentLevel);
    //             level = currentLevel;
    //             return;
    //         }

    //         if (obj.child && obj.child.length > 0) {
    //             console.log(obj.child);

    //             for (const child of obj.child) {
    //                 console.log(level);
    //                 traverse(child, currentLevel + 1);
    //                 if (level > 0) {
    //                     return;
    //                 }
    //             }
    //         }
    //     }

    //     traverse(B, 0);
    //     return level;
    // }

    //   const getLevel2 = (row) => {
    //     let level = 0;

    //     let current row

    //     let current = outlay_rows?.find(row => row.id === id);
    //     while (current) {
    //         console.log(current);
    //       current = current.child?.find(child => child.id === current.id);
    //       console.log(current);
    //       if(current) level++;
    //     }
    //     return level;
    //   };

    const getNewRow = (id) => {
        const findNewRow = (rows) => {
            for (const row of rows) {
                if (row.id === id) {
                    if (newRow.parentId === row.id) {
                        return newRow;
                    }
                    if (row.child && row.child.length > 0) {
                        const result = findNewRow(row.child);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
            return null;
        };
        return findNewRow(outlay_rows);
    };

    // const renderRows = (rows, level = 0) => {
    //     // console.log(level);
    //     return rows.map(row => (
    //         <Fragment key={row.id}>
    //             <tr>
    //                 <td style={level ? { paddingLeft: `${level * 40}px` } : {}}>{level_icon(row, level)}</td>
    //                 <td>{row.rowName}</td>
    //                 <td>{row.salary}</td>
    //                 <td>{row.equipmentCosts}</td>
    //                 <td>{row.overheads}</td>
    //                 <td>{row.estimatedProfit}</td>
    //             </tr>
    //             {/* {newRow.filter(newRow => newRow.parentId === row.id).map(newRow => renderNewRow(newRow, getLevel(row.id) + 1))} */}
    //             {row.child && row.child.length > 0 && renderRows(row.child, getLevel(row.id) + 1)}
    //             {newRow.parentId === row.id && renderNewRow(newRow, getLevel(row.id) + 1)}
    //         </Fragment>
    //     ));
    // };

    // const getLevel = (id) => {
    //     let level = 0;
    //     let current = outlay_rows?.find(row => row.id === id);
    //     while (current) {

    //         current = outlay_rows?.find(row => row.child && row.child.find(child => child.id === current?.id));
    //         if (current) level++;
    //     }
    //     return level;
    // };

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
                                {outlay_rows && renderRows(outlay_rows)}
                            </tbody>
                        </table>
                    </>}

            </main>
        </div>
    );

};

export default MainSection;