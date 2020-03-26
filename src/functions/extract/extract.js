
import AWS from 'aws-sdk';
import * as csv from 'csvtojson';
const chunkSize = 500;


const getData = async (params) => {
    const s3 = new AWS.S3();
    let s3stream = s3.getObject(params).createReadStream();
s3stream.on('error', (err) => {
    throw new Error(err);
})
return csv().fromStream(s3stream);
}


exports.handler = async (event, context, callback) => {
    let index =0,
    processed = 0,
    end = true;
    try {
    var result = event.hasOwnProperty('results') ? event.results : { procesedRows: 0, importedRows:0, errors: [] };
  console.log(result);
   // now we take care of chunks and update output param if Eof is reached

   

   const params = {
	Bucket: 'yemcsvs',
	Key: 'DataQueryTool_8379_20200318T142443118.csv',
};

const lineItems = await getData(params);
console.log('Lines', lineItems.length);

   event['extract'] = { 'results': 
   { 'finished': end,
   'length': lineItems.length } };
   console.log('my event', event);
    callback(null, event)
} catch (err) {
    console.log('Error stopped progress', err);
    event['extract'] = { 'results': 
    { 'finished': end,
    'length': 1 } };
    callback(null, event)
}
}