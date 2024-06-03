/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4pin1ulpbsrz26a",
    "created": "2024-06-01 07:28:21.088Z",
    "updated": "2024-06-01 07:28:21.088Z",
    "name": "landingPages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "hdpmrwkf",
        "name": "data",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4pin1ulpbsrz26a");

  return dao.deleteCollection(collection);
})
