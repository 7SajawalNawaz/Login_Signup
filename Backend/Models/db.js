const mongoose=require ('mongoose')

const mongo_url=process.env.MONGO_CONN

mongoose.connect(mongo_url)

.then(()=>{
    console.log("Database Connected 🙂‍↔️🙂‍↔️");    
})
.catch((err)=>{
    console.log("Database Not Connected 🔕🔕" , err);
    
})