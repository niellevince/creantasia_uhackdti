const web = (req, res, next) => {
    var data = req.body;
    for (var item in data) {
        var itemData = data[item];
        if (typeof itemData === 'string' || itemData instanceof String) {
            data[item] = itemData.trim()
        } else if (typeof itemData === 'object' && itemData !== null) {
            // console.log('This is an object:', itemData)
        }
        // console.log(`${typeof itemData}:`, itemData)
    }
    console.log('Request Body:', {
        ...req.body,
        ...req.files,
    });
    next()
}

module.exports = web;