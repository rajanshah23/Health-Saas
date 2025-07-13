import app from "./src/app";
import envconfig from "./src/config/config";
import "./src/database/connection";
function startServer(){
    const port=envconfig.portNumber
    app.listen(port,()=>{
        console.log(`server has stared at port http://localhost:${port}`)
    })
}

startServer()