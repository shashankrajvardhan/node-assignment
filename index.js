var https = require('follow-redirects').https;

var options = {
  'method': 'GET',
  'hostname': 'api.dictionaryapi.dev',
  'path': '/api/v2/entries/en/gold',
  'headers': {
    'Content-Type': 'application/json',
  },
  'maxRediracts': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    const word = JSON.parse(body.toString());

    if (word.length > 0) {
      const meanings = word[0].meanings;
      
      meanings.forEach((meaning) => {
        meaning.definitions.forEach((definition) => {
           console.log(`Meaning: ${definition.definition}`);
        });
        if (meaning.synonyms && meaning.synonyms.length > 0){
          console.log(`Synonyms: ${meaning.synonyms.join(', ')}`);
        } else {
          console.log(`No Synonyms.`);
        }
      //  print in table form  
      //  console.table(word); 
        console.log('---');
      });
    } else {
      console.log('No entries found for the word "man".');
    }
  });
  
  res.on("error", function (error) {
    console.error(error);
   });
  });

req.end();