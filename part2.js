const http = require("http");
const fs = require("fs");


let users = JSON.parse(fs.readFileSync("./users.json"));

const server = http.createServer((req, res) => {
    console.log("server is running")

    let { url, method } = req

    if (url == "/user" && method == "POST") {
        let data = "";
        let id;
        req.on("data", (chunk) => {
            data += chunk;
        })
        req.on("end", () => {
            data = JSON.parse(data)
            console.log(data);
            let { name, age, mail } = data
            let findemail = users.find(user => user.mail === mail)

            if (findemail) {
                res.end("Email is actually exist")
            } else {
                id = users.length + 1
                users.push({ id, name, age, mail })
                fs.writeFileSync("./users.json", JSON.stringify(users))
                res.end("user is added successfully");
            }
        })
    }


   else if(url.startsWith("/user/") && method=="PATCH"){
    let data, id
    id =  Number(url.replace("/user/", ""))
    req.on("data",(chunk)=>{
        data = JSON.parse(chunk);
    })
    req.on("end",()=>{
        let updatedData = users.find(user => user.id == id)
        console.log(updatedData)
       
             if(!updatedData){
            return res.end("user not found");
        }
         let {name,age,mail} = data
       if (data.name) {
    updatedData.name = data.name;
    console.log("Name updated to:", data.name);
}

if (data.age) {
    updatedData.age = data.age;
    console.log("Age updated to:", data.age);
}

if (data.mail) {
    updatedData.mail = data.mail;
    console.log("Mail updated to:", data.mail);
}
        fs.writeFileSync("users.json", JSON.stringify(users))

        res.end("user updated");
    })
}
   
    else if(url.startsWith("/user/")&&method=="DELETE"){
        let id =Number(url.replace("/user/",""))
        let data
        req.on("data",(chunk)=>{
            data= JSON.parse(chunk)
        })
        req.on("end",()=>{
            let index= users.findIndex(user => user.id==id)
            if(index==-1){
                res.end("User not found")
            }else{
                users.splice(index,1)
                fs.writeFileSync("users.json",JSON.stringify(users))
                res.end("user is deleted")
            } 
        })
    }
    else if(url=="/users"&&method=="GET"){
        let getallusers=(fs.readFileSync("./users.json", "utf-8"))
        res.end(getallusers)
    }
    else if(url.startsWith("/user/")&&method=="GET"){
        let id=Number(url.replace("/user/",""))
      
       
            let finduserbyid= users.find(user =>user.id==id)
            if(finduserbyid){
               
                 res.end(JSON.stringify(finduserbyid))
            }else{
                res.end("user not found")
            }
       
    }
})

server.listen(3002, () => {
    console.log("server is listening on port 3002");
})
