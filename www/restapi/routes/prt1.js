var PythonShell = require('python-shell');

var options = {
	args: ['http://google.com', 'file']
};

PythonShell.run('prt.py',options, function (err) {
  if (err) throw err;
  console.log('finished');
});
