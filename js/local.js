var Local = function() {
	//游戏对象
    var game;
    var INTERVAL=500;
    var timer=null;
    var timeCount=0;
    var time=0;

    var generataBottomLine=function(linenum){
        var lines=[];
        for(var i=0; i<linenum; i++){
            var line=[];
            for(var j=0; j<10; j++){
                line.push(Math.ceil(Math.random()*2 - 1)); 
            }
            lines.push(line);
        }
        return lines;

    }
    var timeFunc=function(){
        timeCount++;
        if(timeCount==2){
            timeCount=0;
            time++;
            game.setTime(time);
            if(time%5==0){
                game.addTailLines(generataBottomLine(1));
            }
        }
    }
    
    var move=function(){
        timeFunc();
        if(!game.down()){
            game.fixed();
            var line=game.checkClear();
            if(line){
                game.setScore(line);

            }
            var gameOver=game.checkGameOver();
           // var gameOver = game.checkGameOver();
            if(gameOver){
                game.gameover(false);
                stop();
            }else{
            game.performNext(generatorType(),generatorDir());
            }
        }
    }
    // var stop=function(){
    //     if(timer){
    //     clearInterval(timer);
    //     timer=null;
    //     document.onkeydown=null;
    //     }
    // }
    var stop = function() {
		if(timer) {
			clearInterval(timer);
			timer = null;
            document.onkeydown = null;
           
		}
	}
    var generatorDir=function(){
        return Math.ceil(Math.random() * 4) - 1;
    }

    var generatorType=function(){
        return Math.ceil(Math.random() * 7) - 1;
    }
    

    //绑定键盘事件
	var bindKeyEvent = function() {
		document.onkeydown = function(e) {
			var e = window.event || e;
			// 键盘检测中，ie为e.keyCode ，chrome为 e.which
			var keyCode = e.keyCode || e.which;
			if(keyCode == 38) {  // up
				game.rotate();
			} else if(keyCode == 39) {  // right
				game.right();
			} else if(keyCode == 40) {  // down
				game.down();
			} else if(keyCode == 37) {  // left
				game.left();
			} else if(keyCode == 32) {  // space
				game.fall();
			}
		}
    }
    //绑定开始按钮
    var bindStartBtn=function(){
        document.getElementById('startbtn').onclick=function(){
           
            var doms = {
                gameDiv: document.getElementById('local_game'),
                nextDiv: document.getElementById('local_next'),
                timeDiv: document.getElementById('local_time'),
                scoreDiv: document.getElementById('local_score'),
                gameoverDiv: document.getElementById('local_gameover')
                
            };
            game = new Game();
            bindKeyEvent();
            game.init(doms,generatorType(),generatorDir(),); 
           // timer=setInterval(move,INTERVAL);
           game.performNext(generatorType(),generatorDir());
            timer = setInterval(move, INTERVAL);


        }
    }
    // 开始
	var start = function() {
		
        bindStartBtn();       
    }
    // 导出API
    this.start = start;	
}
