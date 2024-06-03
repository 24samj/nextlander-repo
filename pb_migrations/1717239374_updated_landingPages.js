/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4pin1ulpbsrz26a")

  // remove
  collection.schema.removeField("hdpmrwkf")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4pin1ulpbsrz26a")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("b4xgl5wu")

  return dao.saveCollection(collection)
})
