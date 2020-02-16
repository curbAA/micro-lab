//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "accelerometer";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });
