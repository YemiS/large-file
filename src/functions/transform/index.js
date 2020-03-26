
exports.transform = (event, context, callback) => {
    console.log("In transform", event)
    event['transform'];
    callback(null, event);

}