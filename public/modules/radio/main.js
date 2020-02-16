//
// ───────────────────────────────────────────────────────── ANCHOR SOCKET IO ─────
//

    const socket = io();
    const _name = "radio";

    socket.on("connect", () =>{
        socket.emit("module:connection:server", _name);
    });
