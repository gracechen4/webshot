console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))



var json = '{"result":true, "count":42}';
obj = JSON.parse(json);

console.log(obj.count);
// expected output: 42

console.log(obj.result);
// expected output: true
//
//
