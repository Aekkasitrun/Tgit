var readlineSync = require("readline-sync");
var colors = require("colors");

var net = require("net");
var HOST = "127.0.0.1";
var PORT = 6969;
var client = null;

function OpenConnection() {
    if(client) {
        console.log("--Connection is alread open--".red);
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }

    client = new net.Socket();

    client.on("error", function (err){
        client.destroy();
        client = null;
        console.log("ERROR: Connection could not be opened. Msg: %s".red, err.message);
        setTimeout(function () {
            menu();
        }, 0);
    });

    client.on("data", function (data){
        console.log("Received: %s".cyan, data);
        setTimeout(function () {
            menu();
        }, 0);
    });

    client.connect(PORT, HOST, function (){
        console.log("Connection opend successfully!".green);
        setTimeout(function () {
            menu();
        }, 0);
    });

}


function SendData(data) {
    if(!client) {
        console.log("--Connection is not open or closed--".red);
        setTimeout(function () {
            menu();
        }, 0);
        return;
    }

    client.write(data);
 
}


function CloseConnection() {
    if(!client) {
        console.log("--Connection is not open or closed--".red);
        setTimeout(function() {
            menu();
        }, 0);
        return;
    }

    client.destroy();
    client = null;
    console.log("Connection closed successfully!".yellow);
    setTimeout(function() {
        menu();
    }, 0);

}


function menu() {
    
    console.log("\n\n---------------------------------------------------------\n|\t\t\tChoose Option\t\t\t|");
    console.log("|\tPress 1 to Open Server\t\t\t\t|");
    console.log("|\tPress 2 to Send your command\t\t\t|");
    console.log("|\tPress 3 to Close Server\t\t\t\t|");
    console.log("|\tPress 4 to Quit\t\t\t\t\t|");
    console.log("---------------------------------------------------------\n");
    
    
    var lineRead = readlineSync.question("Your option :");

    switch (lineRead) {
        case "1":
            OpenConnection();
            break;
        case "2":
            var data = readlineSync.question("Enter data to send:");
            SendData(data);
            break;
        case "3":
            CloseConnection();
            break;
        case "4":
            return;
            break;
        default:
            setTimeout(function () {
                menu();
            }, 0);
            break;

    }
}

setTimeout(function () {
    menu();
}, 0);