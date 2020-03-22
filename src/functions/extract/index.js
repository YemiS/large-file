const chunkSize = 500;
exports.handler = (event, context, callback) => {
    var result = event.hasOwnProperty('results') ? event.results : { procesedRows: 0, importedRows:0, errors: [] };
  ...
   // now we take care of chunks and update output param if Eof is reached

   let index =0,
   processed = 0,
   end = true;

   let pipeline = s3.getObject({
       Bucket:'MyBucket',
       Key: 'Mykey'
   }).createReadStream()
   .pipe(es.split(/\r|\r?\n/))
   .pipe(es.mapSync((line) => {
       index++;
       if ((resulst.procesedRows + 1) < index) {//forward processed records
        if (processed < chunkSize) {
            processed++; result.procesedRows++;
            pipeline.pause();
            process(line);
        } else {
            end = false; // we already processed our chunk but no EOF
            pipeline.end();
        }


       }

   })).on('end', () => {
       result.finished = end; //output if EOF reached
   });
   ...

}