const Ws = require("ws");

((Ws) => {
    const server = new Ws.Server({ port: 3000 });

    const init = () => {
        bindEvent();
    };

    function bindEvent(){
        server.on("open",handleOpen);
        server.on("close",handleClose);
        server.on("error",handleError);
        server.on("connection",(ws) => {
            console.log(`[SERVER] connection`);
            ws.on("message",handleMessage)
        });
    }

    function handleOpen(){
        console.log(`[SERVER] open`);
    }
    function handleClose(){
        console.log(`[SERVER] close`);
        this.reconnect()
    }
    function handleError(){
        console.log(`[SERVER] error`);
        this.reconnect()
    }
    function handleMessage(message){
        console.log(`[SERVER] Received: ${message}`);
        server.clients.forEach((c)=>{
            c.send(`ECHO: ${message}`, (err) => {
                if (err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            });
        })
    }
    init()
    
})(Ws);