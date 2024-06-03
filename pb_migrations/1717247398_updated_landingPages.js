/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bn8hq8ttt0jeg7c")

  collection.listRule = "@request.auth.id != \"\" &&\n@collection.landingPages.user ?= id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bn8hq8ttt0jeg7c")

  collection.listRule = ""

  return dao.saveCollection(collection)
})
