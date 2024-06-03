/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "cp3uc3pptmrc6eq",
    "created": "2024-06-02 10:09:53.311Z",
    "updated": "2024-06-02 10:09:53.311Z",
    "name": "analytics",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "waaqb5ik",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "n6g4hdsplw6mrk1",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "w0om6sfw",
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
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("cp3uc3pptmrc6eq");

  return dao.deleteCollection(collection);
})
