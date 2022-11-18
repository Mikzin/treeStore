const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },

  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },

  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

class TreeStore {
  constructor(array) {
    this.array = array;
  }

  getAll() {
    return this.array;
  }

  getItem(id) {
    const arrItem = this.array.find((item) => item.id === id);
    if (typeof arrItem === 'undefined') {
      return 'No items found';
    }
    return arrItem;
  }

  getChildren(id) {
    const arrItem = this.array.filter((item) => item.parent === id);
    if (typeof arrItem === 'undefined') {
      return [];
    }
    return arrItem;
  }

  getAllChildren(id) {
    const sortedChildrenArr = [];
    const children = this.getChildren(id);
    sortedChildrenArr.push(children);
    children.forEach((item) => {
      sortedChildrenArr.push(...this.getChildren(item.id));
    });
    return sortedChildrenArr;
  }

  getAllParents(id) {
    const sortedParentsArr = [];
    let item = this.getItem(id);
    if (!item) {
      return [];
    }
    let actualParent = item.parent;

    while (actualParent && actualParent !== 'root') {
      let parentItem = this.getItem(actualParent);
      if (!parentItem) {
        actualParent = null;
        break;
      }
      sortedParentsArr.push(parentItem);
      actualParent = parentItem.parent;
    }

    return sortedParentsArr;
  }
}

const ts = new TreeStore(items);
