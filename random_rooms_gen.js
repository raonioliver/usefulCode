/*********************************************************
       
        COPYRIGHT RAONI OLIVEIRA 2018
        Please don't use my code without mentioning me.
        I can be reached at eu.rao@hotmail.com
 
        The following code is written in JavaScript using p5.js library.
 
*********************************************************/




var gridSize = 10;
var cells = [];
var cols;
var rows;
var rooms = [];
var roomNum = 10;
var roomsSize = 10;



function initRooms(){
    var ok = false;
    while(ok == false){
        rooms[0] = new Room();
        if (rooms[0].inside()){
            ok = true;
        }
        else{
            rooms.pop();
        }
    }
    rooms[0].set();
    
    var roomIndex = 1
    while (rooms.length < roomNum){
            createRoom = function(){
                rooms[roomIndex] = new Room();
                for (var i = 0; i < rooms.length; i++){    
                    if (rooms[roomIndex].collide(rooms[i]) || rooms[i].collide(rooms[roomIndex]) ){
                        rooms.pop();
                        createRoom();
                    }
                }
            }
            createRoom();
            if(rooms[roomIndex].inside()){
                rooms[roomIndex].set();
                roomIndex += 1
            }
            else{
                rooms.pop();
            }
    }
    
}



function setup(){
    createCanvas(640,360);
    cols = width/gridSize;
    rows = height/gridSize;
    for (var i = 0; i< rows; i++){
        cells[i] = new Array(cols);
    }
    for (var i = 0; i < rows; i++){
        for (var j = 0; j < cols; j++){
            cells[i][j] =  new Cell(j, i);
        }
    }
    function Cell(x, y){
    this.x = x;
    this.y = y;
    this.type = 0
    
    this.show = function(){
        if (this.type == 'floor'){
            stroke(0);
            fill(100, 255, 150);
            rect(x*gridSize, y*gridSize, gridSize, gridSize);
        }
    }
}

function Room(){
    this.x = Math.floor(random(0, cols));
    this.y = Math.floor(random(0, rows));
    this.xSize = Math.floor(random(roomsSize/2, roomsSize));
    this.ySize = Math.floor(random(roomsSize/2, roomsSize));
    
    this.collide = function(room){
        if (((this.x > room.x && this.x < room.x+room.xSize) && (this.y > room.y && this.y < room.y+room.ySize)) || ((this.x+this.xSize > room.x && this.x+this.xSize < room.x+room.xSize) && (this.y > room.y && this.y < room.y+room.ySize))){
            return true;
        } 
        else {
            return false;
        }
    }
    
    this.inside = function(){
        if(this.x+this.xSize < cols && this.y+this.ySize < rows){
           return true;
        }
        else {
           return false;
        }
    }
    
    
    this.set = function(){
        for (var j = this.x; j <this.x+this.xSize; j++ ){
            for(var i = this.y; i < this.y+this.ySize; i++){
                cells[i][j].type = 'floor';
            }
        }
    }
    
}

    
    initRooms();
}


