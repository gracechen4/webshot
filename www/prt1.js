var PythonShell = require('python-shell');

PythonShell.run('prt.py', function (err) {
  if (err) throw err;
  console.log('finished');
});
