const chunkSize = 500;
exports.handler = (event, context) => {
    var result = event.hasOwnProperty('results') ? event.results : { procesedRows: 0, importedRows:0, errors: [] };
  console.log(result);
   // now we take care of chunks and update output param if Eof is reached

   let index =0,
   processed = 0,
   end = true;
   

  /* let pipeline = s3.getObject({
       Bucket:'MyBucket',
       Key: 'Mykey'
   });*/

  
    return  event['result']['finished'] = end;


}