/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "bn8hq8ttt0jeg7c",
    "created": "2024-06-01 10:59:35.646Z",
    "updated": "2024-06-01 10:59:35.646Z",
    "name": "landingPages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "8zoqcaua",
        "name": "user",
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
      },
      {
        "system": false,
        "id": "5lgkvbvj",
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
  const collection = dao.findCollectionByNameOrId("bn8hq8ttt0jeg7c");

  return dao.deleteCollection(collection);
})
