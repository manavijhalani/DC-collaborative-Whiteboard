const http=require('http')
const {Server}=require('socket.io')

const server = http.createServer();

const io=new Server(server,{
    cors:{
        origin:"*",
        methods:['GET','POST']
    }
})

io.on('connection',(socket)=>{
    console.log("user connected :",socket.id)


socket.on('message',(data)=>{
    console.log("Message received: ",data);
    //socket.emit('servermessage',`Message received sucesfully from ${socket.id}`);

    socket.broadcast.emit('messagefromothers',data);
})

socket.on('join-room',(data)=>{
    console.log(`${data.username} joined ${data.roomid}`)
})
socket.on('disconnect',()=>{
    console.log('User disconnected');
})


})
const PORT=3001
server.listen(PORT,()=>{
    console.log('server listening at : ',PORT)
})
