import { IOutlay, IOutlayReturnItem } from "../../models/IOutlay";

const createRow = (
  prevData: IOutlay[],
  current: IOutlayReturnItem | null,
  changed: IOutlayReturnItem[]
): IOutlay[] => {
  if (!current) {
    console.error("Invalid input for createRow", { current, changed });
    return prevData;
  }

  const addChildToParent = (data: IOutlay[], parentId: number): IOutlay[] => {
    return data.map((row) => {
      if (row.id === parentId) {
        return {
          ...row,
          child: row.child
            ? [...row.child, { ...current, child: [] }]
            : [{ ...current, child: [] }],
        };
      }
      if (row.child && row.child.length > 0) {
        return {
          ...row,
          child: addChildToParent(row.child, parentId),
        };
      }
      return row;
    });
  };

  let newData = [...prevData];

  if (changed.length === 0) {
    newData.push({ ...current, child: [] });
    return newData;
  } else {
    newData = addChildToParent(newData, changed[0].id);
  }

  // Обновление родительских элементов
  changed.forEach((changedRow) => {
    const updateParent = (data: IOutlay[]): IOutlay[] => {
      return data.map((row) => {
        if (row.id === changedRow.id) {
          return { ...row, ...changedRow };
        }
        if (row.child && row.child.length > 0) {
          return {
            ...row,
            child: updateParent(row.child),
          };
        }
        return row;
      });
    };
    newData = updateParent(newData);
  });

  return newData;
};

// Функция обновления строки
const updateData = (
  prevData: IOutlay[],
  current: IOutlayReturnItem | null,
  changed: IOutlayReturnItem[]
): IOutlay[] => {
  const updateRecursively = (data: IOutlay[]): IOutlay[] => {
    return data.map((row) => {
      let updatedRow = { ...row };

      if (current && updatedRow.id === current.id) {
        updatedRow = { ...updatedRow, ...current };
      }

      changed.forEach((changedRow) => {
        if (updatedRow.id === changedRow.id) {
          updatedRow = { ...updatedRow, ...changedRow };
        }
      });

      if (updatedRow.child && updatedRow.child.length > 0) {
        updatedRow.child = updateRecursively(updatedRow.child);
      }

      return updatedRow;
    });
  };

  return updateRecursively(prevData);
};

// Функция удаления строки
const deleteRow = (
  prevData: IOutlay[],
  currentId: number,
  changed: IOutlayReturnItem[]
): IOutlay[] => {
  const deleteRecursively = (data: IOutlay[]): IOutlay[] => {
    return data
      .map((row) => {
        let updatedRow = { ...row };

        if (updatedRow.child && updatedRow.child.length > 0) {
          updatedRow.child = deleteRecursively(updatedRow.child);
        }

        return updatedRow;
      })
      .filter((row) => row.id !== currentId);
  };

  let newData = deleteRecursively([...prevData]);

  // Обновление родительских элементов
  changed.forEach((changedRow) => {
    const updateParent = (data: IOutlay[]): IOutlay[] => {
      return data.map((row) => {
        if (row.id === changedRow.id) {
          return { ...row, ...changedRow };
        }
        if (row.child && row.child.length > 0) {
          return {
            ...row,
            child: updateParent(row.child),
          };
        }
        return row;
      });
    };
    newData = updateParent(newData);
  });

  return newData;
};

export const createRowFromApi = (
  setDataFromApi: React.Dispatch<React.SetStateAction<IOutlay[]>>,
  current: IOutlayReturnItem | null,
  changed: IOutlayReturnItem[]
) => {
  setDataFromApi((prevData) => {
    return createRow(prevData, current, changed);
  });
};

export const updateDataFromApi = (
  setDataFromApi: React.Dispatch<React.SetStateAction<IOutlay[]>>,
  current: IOutlayReturnItem | null,
  changed: IOutlayReturnItem[]
) => {
  setDataFromApi((prevData) => {
    return updateData(prevData, current, changed);
  });
};

export const deleteRowFromApi = (
  setDataFromApi: React.Dispatch<React.SetStateAction<IOutlay[]>>,
  currentId: number,
  changed: IOutlayReturnItem[]
) => {
  setDataFromApi((prevData) => {
    return deleteRow(prevData, currentId, changed);
  });
};
