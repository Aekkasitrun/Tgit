var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;

var db = {}
net.createServer(function(sock){
    var state = 0 //idle
    var current_key = null
    sock.on('data', function(data){
        switch(state){
            case 0:
                if(data == 'HELLO'){
                    sock.write('"type you name"')
                    state = 1 //wait for key
                }
                else{
                    sock.write("What is this command? Please type HELLO.")
                    state = 0
                }
                break
            case 1:
                current_key = data
                sock.write("Hello " + current_key + "\nWhat do you want ?")
                state = 2 //wait for key
                break
            
            case 2:
                if(data == 'MENU'){
                    sock.write('"MENU"\n""type m for steamed rice topped with chicken price : 35\n""type p for fried rice price : 50\n""type k for Spicy fried chicken with basil leaves price : 50\n""type e for Omelet price : 30\n""type s to confirm your menu"')
                    state = 3 //wait for key
                }
                else{
                    sock.write("What is this command? Please type MENU.")
                    state = 2
                }
                break
                

            case 3:
                if(data == 's' || data == 'S'){
                    try{
                        if(!db[current_key]){
                            db[current_key] = 0
                        }
                        sock.write("Your Price: " + db[current_key] + "\nThank you.")
                    }catch(e){
                        sock.write('INVALID')
                    }
                    sock.close()
                    state = 4 //end
                }
                else if(data == 'k' || data == 'K'){
                    try{
                        if(!db[current_key]){
                            db[current_key] = 0
                        }
                        db[current_key] += 50
                        sock.write("All Price: " + db[current_key])
                    }catch(e){
                        sock.write('INVALID')
                    }
                }
                else if(data == 'p' || data == 'P'){
                    try{
                        if(!db[current_key]){
                            db[current_key] = 0
                        }
                        db[current_key] += 50
                        sock.write("All Price: " + db[current_key])
                    }catch(e){
                        sock.write('INVALID')
                    }
                }
                else if(data == 'm' || data == 'M'){
                    try{
                        if(!db[current_key]){
                            db[current_key] = 0
                        }
                        db[current_key] += 35
                        sock.write("All Price: " + db[current_key])
                    }catch(e){
                        sock.write('INVALID')
                    }
                }
                else if(data == 'e' || data == 'E'){
                    try{
                        if(!db[current_key]){
                            db[current_key] = 0
                        }
                        db[current_key] += 30
                        sock.write("All Price: " + db[current_key])
                    }catch(e){
                        sock.write('INVALID')
                    }
                }
                else{
                    sock.write('"Please type the characters specified"')
                }
                    
        }
    });
}).listen(PORT , HOST);
console.log('Server listening on ' + HOST +':'+ PORT);