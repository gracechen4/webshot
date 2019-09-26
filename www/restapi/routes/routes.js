const md5File = require('md5-file');

var appRouter = function (app) {

  app.get("/new", function(req, res) {
    
    var factrul = req.query.url;
   
    console.log("url= ");   
    console.log(factrul);
      
    res.setHeader("Access-Control-Allow-Origin", "*");
                                 

    var PythonShell = require('python-shell');
    var num = Math.floor((Math.random() * 10000000) + 10000000);  
    console.log(factrul);
    var options = {
            args: [factrul, num]
    };

    PythonShell.run('prt.py',options, function (err) {
      if (err)
         console.log(err); 
         //throw err;
      console.log('finished');

      var img_url ="https://webshot.weku.io/"+num+".png";
      var myDate = new Date().toUTCString();
       
      // publish to weku chain
      var post_body = "**Timestamp**: " + myDate + "<br> **Orignal URL** = " + factrul + " **Screenshot:**![]("+ img_url + ")";
      postToWeKu("Screenshot powered by webshot.weku.io", post_body);

      res.status(200).send(""+num);

    });

 
  
  });

	  
   app.get("/get", function(req, res) {
    
   var chainid= req.query.chainId;
   console.log(chainid);
   res.setHeader("Access-Control-Allow-Origin", "*");
   var img_url ="https://webshot.weku.io/"+chainid+".png";
   res.status(200).send(img_url);
  

   
  
  });

  app.get("/search", function(req, res) {
    
    var mytag= req.query.tag;
    console.log(mytag);
    
    res.status(200).send("Welcome to our restful API" );
  });

}

module.exports = appRouter;

function md5(filename){
  var hash = md5File.sync(filename);
      
    console.log(`The MD5 sum of ${filename} is: ${hash}`)
   return hash;
}



var crypto = require('crypto');

function postToWeKu(title,body){ //return new Promise(resolve => {
    
    var steem = require('steem');
    //var uuidv1 = require('uuid/v1');

    steem.api.setOptions({ url: 'wss://standby.weku.io:8190' }); // <- update url if necessary
    steem.config.set('address_prefix', 'WKA');
    steem.config.set('chain_id','b24e09256ee14bab6d58bfa3a4e47b0474a73ef4d6c47eeea007848195fa085e');

     //id: tom1 var privateKey = 'P5JwAf556RVydNyZSvUBvwvumxHPiNS1KXWJv1Ab3QLoMw8DMqNa';
    var author='webshot';
    var privateKey = 'P5JtUADA3BsP74DUmdPwMd91218epsKZNXGeoTngcbx9sBs4RcJf';
    
    var wif = steem.auth.toWif(author, privateKey, 'posting');
    console.log('wif-posting: ' + wif);

    var parentAuthor = '';
    var parentPermlink = 'community-deals';
   
    var permlink = crypto.createHash('md5').update(title).digest('hex');

    var jsonMetadata = '{"tags":["community-deals","webshot"],"app":"steemit/0.1","format":"markdown"}';
     
    console.log('in posting weku...'+permlink);
  
    steem.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink,
        title, body, jsonMetadata,  function(err, result) {
       
        console.log('dddddddddddd');
        console.log(err, result);
        
        
    });
    
    
    console.log('after calling broadcase...' );
    
 // }); //resolve 
  
                                
}








