/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4pin1ulpbsrz26a");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "4pin1ulpbsrz26a",
    "created": "2024-06-01 07:28:21.088Z",
    "updated": "2024-06-01 10:56:14.739Z",
    "name": "landingPages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "b4xgl5wu",
        "name": "data",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "hen54mhi02s72at",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
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
})
