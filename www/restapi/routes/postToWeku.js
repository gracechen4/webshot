
var crypto = require('crypto');

function postToWeKu(title,body){ //return new Promise(resolve => {
    
    var steem = require('steem');
    //var uuidv1 = require('uuid/v1');

    steem.api.setOptions({ url: 'wss://deals.weku.io:8190' }); // <- update url if necessary
    steem.config.set('address_prefix', 'WKA');
    steem.config.set('chain_id','b24e09256ee14bab6d58bfa3a4e47b0474a73ef4d6c47eeea007848195fa085e');

    var author='webshot';
    var privateKey = 'P5JtUADA3BsPXXXXXXXXXXXXXXXXXXXXX';

    
    var wif = steem.auth.toWif(author, privateKey, 'posting');
    console.log('wif-posting: ' + wif);

    var parentAuthor = '';
    var parentPermlink = 'community-one';
   
    var permlink = crypto.createHash('md5').update(title).digest('hex');

    var jsonMetadata = '{"tags":["webshot"],"app":"steemit/0.1","format":"markdown"}';
     
    console.log('in posting weku...'+permlink);
  
    steem.broadcast.comment(wif, parentAuthor, parentPermlink, author, permlink,
        title, body, jsonMetadata,  function(err, result) {
       
        console.log('dddddddddddd');
        console.log(err, result);
        
        
    });
    
    
    console.log('after calling broadcase...' );
    
 // }); //resolve 
  
                                
}








