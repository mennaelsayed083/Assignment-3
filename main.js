// 1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
// • Input Example: "./big.txt"
// • Output Example: log each chunk

const fs=require("fs")


const readstream=fs.createReadStream("./big.txt",{
    encoding: "utf-8",
    highWaterMark: 5*1024
})
readstream.on("data",(chunk)=>{
    console.log(chunk)
})

// 2. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
// • Input Example: "./source.txt", "./dest.txt"
// • Output Example: File copied using streams

const writestream=fs.createWriteStream("copy.txt")

readstream.pipe(writestream)

// readstream.on("data",(chunk)=>{
//     writestream.write(chunk)
// })


// 3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
// • Input Example: "./data.txt", "./data.txt.gz"

const zlib=require("zlib")

const readingstream=fs.createReadStream("./data.txt")
const writingstream=fs.createWriteStream("./data.gz")

const compress=zlib.createGzip()

readingstream.pipe(compress).pipe(writingstream)


