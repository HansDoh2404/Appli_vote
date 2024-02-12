const io = require('socket.io')(8800,{
    cors: {origin: 'http://192.168.110.34:3000', rejectUnauthorized: false}
})

let listConnect = []
let userVoted = []


io.on('connection', (socket)=>{

    socket.on('newAddUser', (infoUser)=>{
        const idUser = infoUser
        if(!(listConnect.some((user)=> user.userId === idUser))){
            listConnect.push({userId: idUser, socketId: socket.id})
        }
        console.log(listConnect);
        io.emit('userConnected', listConnect)
    })

    socket.on('disconnect', ()=>{
        listConnect = listConnect.filter((user)=> user.socketId != socket.id)
        io.emit('userConnected', listConnect)
    })

    socket.on('clickDisconnect', (idUser)=>{
        listConnect = listConnect.filter((user)=> user.userId != idUser)
        io.emit('userConnected', listConnect)
    })

    socket.on('Voted', (idUser)=>{
        if(!userVoted.some((user)=> user.userId === idUser)){
            userVoted.push({userId: idUser, socketId: socket.id})
        }
        console.log(userVoted);
        io.emit('useVoted', userVoted)
    })

})

