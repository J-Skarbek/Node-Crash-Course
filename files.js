const fs = require('fs');

//reading files

//readfile() takes a relative path
//readfile() mehthod is an async function
//readFile() 1st arg is the relative path,
//2nd arg is a callback function that passes err and data params

fs.readFile('./docs/blog1.txt', (err, data) => {
  if (err) {
    console.log(err)
  }
  console.log(data.toString())
})

// console.log('last line');

//writing files

//writeFile() is also async
//Takes three args, the relative path to the file we write to
//2nd, the acutal content we wantt to write
//3rd, callback function to run when async operation is completed
//Note, the writeFile() method overwrites whatever is in the file you
//are targeting, and if the file doens't exist, it will create a new
//corresponding file with your input

fs.writeFile('./docs/blog1.txt', 'This is new text added', () => {
  console.log('file was written')
})

fs.writeFile('./docs/blog2.txt', 'Blog 2 text', () => {
  console.log('file was written')
})

// Directories

// mkdir() takes a relative path + the name of the new directory
// if you try to create a folder that already exists, it will throw
// an error -- good practice is to check if the folder exists with fs.existsSync

// existsSync checks if something exists, and the Sync part means
// the code is non async, and is blocking the main thread 

// .rmdir() is async, takes the relative path as 1st arugment
// then the callback function for 2nd arugment

if (!fs.existsSync('./assets')) {
  fs.mkdir('./assets', (err) => {
    if (err) {
      console.log(err)
    }
    console.log('folder created')
  })
} else {
  fs.rmdir('./assets', err =>  err ? console.log(err) : console.log('folder deleted.'))
}

//Deleteing files
// .unLink is the aync function, takes the relative path for 1st argument
// then the callback function for the second arugment

if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', err => {
    if (err) {
      console.log(err)
    }
    console.log('file deleted')
  })
}


