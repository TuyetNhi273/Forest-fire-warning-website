import { socket } from "../contexts/socket_io"

export const send_socketIo = (stream, direction, header, data, status) =>{
    socket.emit(stream, {
        "direction": direction,
        "header"   : header,
        "data"     : data,
        "status"   : status
    })
}