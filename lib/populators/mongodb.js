const getValues = require('../util/getValues')
const setValues = require('../util/setValues')
const ObjectId = require('mongodb').ObjectId

module.exports = async function populate ({docs, from, localField, foreignField, select = {}, db}) {

    const values = await db.collection(from).find({
        [foreignField]: {
            $in: getValues(docs, localField).map(id =>  ObjectId(id))
        }
    }, select).toArray()

    setValues(docs, localField, values, foreignField)

    return docs
}
