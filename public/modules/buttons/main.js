//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "buttons";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });
