const indexBy = require('./indexBy')

module.exports = function (obj, path, values, key) {
    setValues (obj, path, indexBy(values, key))
}

function setValues (obj, path, valuesIndex) {
    const paths = path.split(' ')

    paths.forEach(path => {
        let currentObject = obj
        const properties = path.split('.')

        while (properties.length) {
            const property = properties.shift()

            if (!currentObject) break

            if (Array.isArray(currentObject)) {
                currentObject.forEach(obj => {
                    setValues (obj, [property, ...properties].join('.'), valuesIndex)
                })

                break
            }


            if (!properties.length) {
                if (Array.isArray(currentObject[property])) {

                    currentObject[property].forEach((value, index) => {
                        currentObject[property][index] = valuesIndex[value]
                    })

                } else {

                    if (valuesIndex[currentObject[property]]) {
                        currentObject[property] = valuesIndex[currentObject[property]]
                    }
                }
            }

            currentObject = currentObject[property]
        }
    })
}
