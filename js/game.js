var Game = function() {
	// dom元素
	var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    var resultDiv;
    var score=0;
    var gameoverDiv;
    // 游戏矩阵
	var gameData = [  //20*10
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
    ];
    // divs
	var nextDivs = [];
    var gameDivs = [];
    // 当前方块
	var cur;
	// 下一个方块
	var next;
    //初始化div
	var initDiv = function(container, data, divs) {		
		for(var i=0; i<data.length; i++) {
			var div = [];				
			for(var j=0; j<data[0].length; j++) {
				var newNode = document.createElement('div');
				newNode.className = 'none';
				newNode.style.top = (i*20) + 'px';
				newNode.style.left = (j*20) + 'px';
				container.appendChild(newNode);
				div.push(newNode);
			}
			divs.push(div);
		}
	}
	// 刷新Div
	var refreshDiv = function(data, divs) {		
		for(var i=0; i<data.length; i++) {			
			for(var j=0; j< data[0].length; j++) {
				if(data[i][j] == 0) {
					divs[i][j].className ='none';
				} else if(data[i][j] == 1) {
					divs[i][j].className ='done';
				} else if(data[i][j] == 2) {
					divs[i][j].className ='current';
				}
			}
		}
    }
    // 清除数据
	var clearData = function() {
		for(var i=0; i<cur.data.length; i++) {
			for(var j=0; j<cur.data[0].length; j++) {
				if(check(cur.origin, i, j)) {
					gameData[cur.origin.x + i][cur.origin.y + j] = 0;
				}
			}
		}
	}	
    // 设置数据
	var setData = function() {
		for(var i=0; i<cur.data.length; i++) {
			for(var j=0; j<cur.data[0].length; j++) {
				if(check(cur.origin, i, j)) {
					gameData[cur.origin.x + i][cur.origin.y + j] = cur.data[i][j];
				}
			}
		}
    }
    // 检测点是否合法
	var check = function(pos, x, y) {
		// 超出上边界、下边界、左边界、右边界或当前位置已经存在落下的方块
		if((pos.x + x < 0) || (pos.x + x >= gameData.length) || (pos.y + y < 0) || (pos.y + y >= gameData[0].length) || (gameData[pos.x + x][pos.y + y] == 1)) {
			return false;
		} else {
			return true;
		}
    }
    // 检测数据是否合法
	var isValid = function(pos, data) {
		for(var i=0; i<data.length; i++) {
			for(var j=0; j<data[0].length; j++) {	
				if(data[i][j] != 0) {
					if(!check(pos, i, j)) {
						return false;
					}
				}
			}
		}	
		return true;
    }
    //下落
    var fall=function(){
        while(down());
    }
    //左移
    var left=function(){
        if(cur.canLeft(isValid)){
            clearData();
			cur.left();
			setData();
			refreshDiv(gameData, gameDivs);
			return true;
        }
    }
    //右移
    var right=function(){
        if(cur.canRight(isValid)){
            clearData();
			cur.right();
			setData();
			refreshDiv(gameData, gameDivs);
			return true;
        }
    }
    //旋转
    var rotate=function(){
        if(cur.canRotate(isValid)){
            clearData();
			cur.rotate();
			setData();
			refreshDiv(gameData, gameDivs);
			return true;
        }
    }
    // 下移
	var down = function () {
        if(cur.canDown(isValid)) {
			clearData();
			cur.down();
			setData();
			refreshDiv(gameData, gameDivs);
			return true;
        }
        return false;
    }

    var fixed =function() {
		for(var i=0; i<cur.data.length; i++) {
			for(var j=0; j<cur.data[0].length; j++) {
				if(check(cur.origin, i ,j)) {
					if(gameData[cur.origin.x + i][cur.origin.y + j] == 2) {
						gameData[cur.origin.x + i][cur.origin.y + j] = 1;
					}
				}
			}
		}
		refreshDiv(gameData, gameDivs);
    }
    var performNext=function(type,dir){
        cur=next;
        next=SquareFactory.prototype.make(type,dir);
        setData();
        refreshDiv(gameData, gameDivs);     
        refreshDiv(next.data, nextDivs);

    }
    // var checkClear=function(){
    //     for(var i=gameData.length-1; i>0; i--){
    //         var clear=true;
    //         for(var j=0;j<=gameData[0].length;j++){
    //             if(gameData[i][j]!==1){
    //                 clear=false;
    //             }
    //             break;
    //         }
    //         for(var n=i; n>0; n--){
    //             for(var m=0; m<=gameData.length;m++){
    //                 gameData[n][m]=gameData[n-1][m];
    //             }
    //         }
    //         for(var p=0; p<=gameData.length;p++){
    //             gameData[0][p]=0;
    //         }
    //         i++;
    //     }
    // }

    var checkClear = function() {		
		var line = 0;
		for(var i=gameData.length - 1; i >= 0; i--) {
			var clear = true;
			for(var j=0; j < gameData[0].length; j++) {
				if(gameData[i][j] != 1) {
					clear = false;
					break;
				}
			}
			if(clear) {
				line += 1;
				for(var m = i; m > 0; m--) {
					for(var n = 0; n < gameData[0].length; n++) {
						gameData[m][n] = gameData[m-1][n];
					}
				}
				for(var n = 0; n < gameData[0].length; n++) {
					gameData[0][n] = 0;
				}
				i++;
			}
		}
		return line;
    }
    var setScore=function(ss){
        var s=0;
        switch(ss){
        case 1:
            s=10;
            break;
        case 2:
            s=30;
            break;
        case 3:
            s=60;
            break;
        case 4:
            s=100;
            break;
        default:
            break;
        }
        score+=s;
        scoreDiv.innerHTML=score;

    }
    var checkGameOver=function(){
        var gameOver=false;
        for(var i=0; i<gameData[0].length; i++){
            if(gameData[1][i]==1){
                gameOver=true;
            }
        }
        return gameOver;
    }
    
    // var setTime=function(t){
    //     timeDiv.innerHTML=t;
    // }
    var setTime = function(time) {
		timeDiv.innerHTML = time;
    }
    var gameover=function(win){
        if(win){
            gameoverDiv.innerHTML='you win';
        }else{
            gameoverDiv.innerHTML='you lose';
        }

    }
    var addTailLines=function(lines){
        for(var i=0; i<gameData.length-lines.length;i++){
            gameData[i]=gameData[i+lines.length];
        }
        for(var j=0; j<lines.length; j++){
            gameData[gameData.length-lines.length+j]=lines[j]; 
        }
        cur.origin.x=cur.origin.x-lines.length;
        if(cur.origin.x<0){
            cur.origin.x=0;
        }
        refreshDiv(gameData,gameDivs);
    }
    var init = function(doms,type,dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv; 
        timeDiv= doms.timeDiv; 
        scoreDiv= doms.scoreDiv;
        gameoverDiv= doms.gameoverDiv;                
        next = SquareFactory.prototype.make(type,dir);    		
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);          
                
         
        refreshDiv(next.data, nextDivs);
    }
    // 导出API
    this.init = init;
    this.down=down;
    this.fall=fall;
    this.left=left;
    this.right=right;
    this.rotate=rotate;
    this.fixed=fixed;
    this.performNext=performNext;
    this.checkClear=checkClear;
    this.checkGameOver=checkGameOver;
    this.setTime=setTime;
    this.setScore=setScore;
    this.gameover=gameover;
    this.addTailLines=addTailLines;
}
