// const net = require("buffer");

const net = require("net");
const fs = require("fs");

/** CLIENT PART Not needed anymore
 *  we are using Packet Sender to send file */
const OPTIONS = {
    port: 5003 // IBM FROMFinacle Port
}
const FILEPATH = './fromITG.txt';

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
    console.log("A client IBM just connected. He came from ITG | (Connection Opened)");
    socket.on("data", clientData => {
        // socket.write(`Client sent ${clientData}`)
        // console.log('MESSAGE:\n',clientData);
        // console.log('MESSAGE STRING:\n',clientData.toString());
        // sendResponse(clientData.toString(), socket.remoteAddress, socket.remotePort);
        console.log(socket.remoteAddress, socket.remotePort);
       
        const message = `Hello`;
        socket.write(message);
        console.log('RESPONSE SENT', message)
        // console.log('RESPONSE SENT')
        // sendResponse(clientData.toString(), socket.remoteAddress, socket.remotePort);

        // RESPONSE
        // const filePath = './fromITG.txt';
        //  Read file and send contents to the server
        // fs.readFile(filePath, (err, data) => {
        //     if (err) {
        //          console.error(`Error reading file: ${err}`);
        //     } else {
        //          console.log('Sending Message...', data);
        //          socket.write(data);
        //          socket.end();
        //          console.log('Message Sent...');
        //     }
        // });

        // const message = await readContent();
        // socket.write(message);   
        // try {
        //     console.log(message)
        // } catch (error) {
        //     console.error('Error sending response to client:', error);
        // }
    })

    // socket.on('error', error => {
    //     console.log('error: ',error);
    //     // socket.end();
    // })

    socket.on('end', end => {
        console.log("Goodbye | (Connection Closed)");
        // socket.end();
    })
}).listen(5001) // FINACLE Mock Server Port

const sendResponse = (value)  => {
    const client2 = net.createConnection(OPTIONS, () => {
        console.log('sending the response...');
        // client2.write(Buffer.from(value, "utf-8")); 
        console.log('response sent...');
    });

    // Read file and send contents to the server
    fs.readFile(FILEPATH, (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            client2.end();
        } else {
            console.log('Sending Message...', data);
            client2.write(data);
            client2.end();
            console.log('Message Sent...');
        }
    });
 
}
