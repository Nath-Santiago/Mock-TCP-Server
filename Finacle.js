// const net = require("buffer");

const net = require("net");
const fs = require("fs");

/** CLIENT PART Not needed anymore
 *  we are using Packet Sender to send file */
const options = {
    port: 5002 // IBM FROMFinacle Port
}

// const client = net.createConnection(options, () => {
//     console.log('Hello I am Finacle Client. Connecting to IBM TCPIP Server')
//     // client.write('hello\r\n'); // Client magpapadala ng hello kay server... Use FILE (ISO8583)
// });

// client.on('data', data => {
//     console.log(data.toString());
//     client.end();
// })

// SERVER
const mockFinacleServer = net.createServer(socket => {
    console.log("A client IBM just connected. He came from ITG");
    socket.on("data", clientData => {
        // socket.write(`Client sent ${clientData}`)
        console.log(clientData.toString());
        sendResponse(clientData.toString());
        
    })
    socket.on("end", () => {
        console.log('Client left');
    })

    socket.on('connect', connect => {
        console.log(connect);
    })

    socket.on('error', error => {
        console.log('lol: ',error);
        socket.end();
    })
}).listen(5001) // FINACLE Mock Server Port

const sendResponse = (value)  => {
    const client2 = net.createConnection(options, () => {
        console.log('sending the response...');
        // client2.write(Buffer.from(value, "utf-8")); 
        console.log('response sent...');
    });

     //path of the file
     const filePath = './text2.txt';

     // Read file and send contents to the server
     fs.readFile(filePath, (err, data) => {
         if (err) {
             console.error(`Error reading file: ${err}`);
             client2.end();
         } else {
             console.log('Sending Message...');
             client2.write(data);
             client2.end();
             console.log('Message Sent...');
         }
     });

}
