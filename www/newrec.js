var Client = require('node-rest-client').Client;
    // direct way
    var client = new Client();
   
    var args = {
      data: {"external_ids":["aWJt","aWJt"],"content":"aWJT"},
      headers: { 'Content-Type': 'application/json',
      'factom-provider-token': 'hYddpZgJ8v2YMLADBz12IleUBpdJBVR7UHVqR2qL5dJpMY21' } // request headers
    };

    client.post("https://apiplus-api-sandbox-testnet.factom.com/v1/chains/", args, function (data, response) {
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);
    });
