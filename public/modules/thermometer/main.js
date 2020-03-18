//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "thermometer";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });
