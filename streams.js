const fs = require('fs');

// .createReadStream 1st arugment is the relative path of file
// we want to pull info from. 2nd argument lets you add
// an option object where you can specifiy things like 
// encoding so you don't need to use mehtods like toString()
const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8'});

// This works similiar to the .createReadStream
const writeStream = fs.createWriteStream('./docs/blog4.txt')

// .on() is a node event listener, which has 2 arugments
// it listens for 'data,' and when we receive a chunk of data,
// the callback function fires and we get access to the data

readStream.on('data', (chunk) => {
  console.log('new chunk:')
  console.log(chunk)
  writeStream.write('\nNEW CHUNK\n');
  writeStream.write(chunk);
  // console.log(chunk.toString());
})

//This pipe method takes the place of the .on() code above
readStream.pipe(writeStream)