const md5File = require('md5-file')
 
/* Async usage */
md5File('a.file', (err, hash) => {
  if (err) throw err
 
  console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
})
 
/* Sync usage */
const hash = md5File.sync('a.file')
console.log(`The MD5 sum of LICENSE.md is: ${hash}`)
