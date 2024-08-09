import { IOutlay } from "../../models/IOutlay";

export const isTopLevelObject = (arr: IOutlay[], objToCheck: IOutlay) => {
  const topLevelIds = new Set(arr.map((obj) => obj.id));

  function traverse(obj: IOutlay) {
    if (obj.child && obj.child.length > 0) {
      obj.child.forEach((child) => {
        topLevelIds.delete(child.id);
        traverse(child);
      });
    }
  }

  arr.forEach((obj) => traverse(obj));

  return topLevelIds.has(objToCheck.id);
};

function countAllItems(item: IOutlay) {
  let count = 1;

  for (const child of item.child) {
    count += countAllItems(child);
  }

  return count;
}

export const countItems = (parentItem: IOutlay) => {
  let count = 0;

  for (let i = 0; i < parentItem.child.length; i++) {
    if (i === parentItem.child.length - 1) {
      return count + 1;
    }
    count += countAllItems(parentItem.child[i]);
  }

  return count;
};

export const findNestingLevel = (parentId: number, Bs: IOutlay[]) => {
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
};
