describe('test TreeStore', function () {
  describe('getAll', function () {
    it('get all items', function () {
      assert.equal(ts.getAll(), items);
    });
  });

  describe('getItem', function () {
    function makeTest(x, answer) {
      let expected = JSON.stringify(answer);
      it('get item by id ' + x + ' result: ' + expected, function () {
        assert.equal(JSON.stringify(ts.getItem(x)), expected);
      });
    }

    makeTest(7, { id: 7, parent: 4, type: null });
    makeTest(3, { id: 3, parent: 1, type: 'test' });
  });

  describe('getChildren', function () {
    function makeTest(x, answer) {
      let expected = JSON.stringify(answer);
      it('get children by id: ' + x + ' result: ' + expected, function () {
        assert.equal(JSON.stringify(ts.getChildren(x)), expected);
      });
    }

    makeTest(4, [
      { id: 7, parent: 4, type: null },
      { id: 8, parent: 4, type: null },
    ]);
    makeTest(5, []);
    makeTest(2, [
      { id: 4, parent: 2, type: 'test' },
      { id: 5, parent: 2, type: 'test' },
      { id: 6, parent: 2, type: 'test' },
    ]);
  });

  describe('getAllChildren', function () {
    function makeTest(x, answer) {
      let expected = JSON.stringify(answer);
      it('get all children by id: ' + x + ' result: ' + expected, function () {
        assert.equal(JSON.stringify(ts.getAllChildren(x)), expected);
      });
    }

    makeTest(2, [
      [
        {
          id: 4,
          parent: 2,
          type: 'test',
        },
        {
          id: 5,
          parent: 2,
          type: 'test',
        },
        {
          id: 6,
          parent: 2,
          type: 'test',
        },
      ],
      {
        id: 7,
        parent: 4,
        type: null,
      },
      {
        id: 8,
        parent: 4,
        type: null,
      },
    ]);

    makeTest(1, [
      [
        {
          id: 2,
          parent: 1,
          type: 'test',
        },
        {
          id: 3,
          parent: 1,
          type: 'test',
        },
      ],
      {
        id: 4,
        parent: 2,
        type: 'test',
      },
      {
        id: 5,
        parent: 2,
        type: 'test',
      },
      {
        id: 6,
        parent: 2,
        type: 'test',
      },
    ]);
  });

  describe('getAllParents', function () {
    function makeTest(x, answer) {
      let expected = JSON.stringify(answer);
      it('get all parents by id: ' + x + ' result: ' + expected, function () {
        assert.equal(JSON.stringify(ts.getAllParents(x)), expected);
      });
    }

    makeTest(7, [
      {
        id: 4,
        parent: 2,
        type: 'test',
      },
      {
        id: 2,
        parent: 1,
        type: 'test',
      },
      {
        id: 1,
        parent: 'root',
      },
    ]);
    makeTest(2, [
      {
        id: 1,
        parent: 'root',
      },
    ]);
  });
});
