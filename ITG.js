// const net = require("buffer");

const net = require("net");
const fs = require("fs");


/** CLIENT PART Not needed anymore
 *  we are using Packet Sender to send file */
// const options = {
//     port: 5000 // IBM FROMITG Port
// }

// const client = net.createConnection(options, () => {
//     console.log('Hello I am ITG Client. Connecting to IBM TCPIP Server')
//     // client.write('hello\r\n'); // Client magpapadala ng hello kay server... Use FILE (ISO8583)

//     //path of the file
//     const filePath = './text.txt';

//     fs.readFile(filePath, (err, data) => {
//         if (err) {
//             console.error(`Error reading file: ${err}`);
//             client.end();
//         } else {
//             console.log('Sending Message...');
//             client.write(data);
//             client.end();
//             console.log('Message Sent...');
//         }
//     });

// });
// client.on('data', data => {
//     console.log(data.toString());
//     client.end();
// })


// SERVER
const mockITGServer = net.createServer(socket => {
    console.log("A client from IBM just connected. He came from Finacle");

    socket.on("data", clientData => {
        // socket.write(`Client sent ${clientData}`)
        // console.log('sample message',clientData.toString());
        // console.log(clientData.toString());
        // console.log('message received...');

        const message = `Hi`;
        socket.write(message);
        console.log('RESPONSE SENT', message)
    })
    socket.on('end', end => {
        console.log("Goodbye | (Connection Closed)");
        socket.end();
    });

    socket.on('error', error => {
        console.log('lol: ', error);
        socket.end();
    })
}).listen(5003) // ITG Mock Server Port


const sendResponse = (value)  => {
    // const client2 = net.createConnection(options, () => {
    //     console.log('sending the response...');
    //     client2.write(Buffer.from(value, "utf-8")); 
    //     console.log('response sent...');
    // });

     //path of the file
     const filePath = './fromFinacle.txt';

     // Read file and send contents to the server
     fs.readFile(filePath, (err, data) => {
         if (err) {
             console.error(`Error reading file: ${err}`);
             client.end();
         } else {
             console.log('Sending Message...');
             client.write(data);
             client.end();
             console.log('Message Sent...');
         }
     });

}
