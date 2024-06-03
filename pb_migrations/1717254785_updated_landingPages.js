/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bn8hq8ttt0jeg7c")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bn8hq8ttt0jeg7c")

  collection.viewRule = "user = @request.auth.id"

  return dao.saveCollection(collection)
})