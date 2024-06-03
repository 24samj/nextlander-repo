/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bn8hq8ttt0jeg7c")

  collection.updateRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bn8hq8ttt0jeg7c")

  collection.updateRule = "@request.auth.id != \"\" && user.id = @request.auth.id"

  return dao.saveCollection(collection)
})
