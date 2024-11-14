document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const newGameButton = document.getElementById('new-game');
    const audioPlayer = document.getElementById('audio-player');
    const audioSrc = document.getElementById('audio-src');
    const volumeIcon = document.getElementById('volume-icon');
    const songTitle = document.getElementById('song-title');
    const appInfoToggle = document.getElementById('app-info-toggle');
    const appInfoWindow = document.getElementById('app-info-window');
    const width = 4;
    let highScore = 128;
    let squares = [];
    let musics = [
        {filename: "focus-154291.mp3", title: "Focus"},
        {filename: "chill-night-154287.mp3", title: "Chill Night"},
        {filename: "coding-night-112186.mp3", title: "Coding Night"},
        {filename: "cooking-beats-154289.mp3", title: "Cooking Beats"},
        {filename: "fireplace-179281.mp3", title: "Fireplace"},
        {filename: "good-night-lofi-cozy-chill-music-160166.mp3", title: "Good Night"},
        {filename: "lofi-study-calm-peaceful-chill-hop-112191.mp3", title: "Lofi Study"},
        {filename: "midnight-works-chill-cozy-lofi-199736.mp3", title: "Midnight Works"},
        {filename: "november-chill-fall-autumn-lofi-hip-hop-253484.mp3", title: "November Chill"},
        {filename: "rainy-day-slow-chill-lofi-199734.mp3", title: "Rainy Day"},
        {filename: "satisfying-lofi-for-focus-study-amp-working-242103.mp3", title: "Focus Study"},
        {filename: "take-a-break-cozy-ambient-lofi-199738.mp3", title: "Take a Break"},
    ]

    function loadRandomAudio(){
        let randomIndex = Math.floor(Math.random() * musics.length);
        let randomMusic = musics[randomIndex];
        audioSrc.src = "http://static.alexonsager.net.s3-website-us-west-2.amazonaws.com/2048music/" + randomMusic["filename"]
        audioPlayer.load();
        audioPlayer.play();

        // Update song title
        document.getElementById('song-title').textContent = randomMusic["title"];
    }

    document.getElementById('audio-info').addEventListener('click', function() {
        if (audioPlayer.muted) {
            // Unmute the audio and update the icon
            audioPlayer.muted = false;
            audioPlayer.volume = 0.5;
            audioPlayer.play();
            volumeIcon.src = 'images/volume.png';
            songTitle.style.color = 'white';
        } else {
            // Mute the audio and update the icon
            audioPlayer.muted = true;
            volumeIcon.src = 'images/volume-mute.png';
            songTitle.style.color = 'grey';
        }
    });

    appInfoToggle.addEventListener('click', function() {
        if (appInfoWindow.style.display === 'none' || appInfoWindow.style.display === '') {
            appInfoWindow.style.display = 'block';
        } else {
            appInfoWindow.style.display = 'none';
        }
    });

    //create the playing board
    function createBoard(){
        for(let i= 0; i < width * width; i++){
            const square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
            // console.log(squares);
        }
        generate();
        generate();
        loadRandomAudio();
    }
    //Reset the game
    function newGame(){
        squares.forEach(square => {
            square.innerHTML = 0;
            square.style.backgroundColor = '#afa192';
            square.style.color = 'transparent';
        });

        // Generate new numbers
        highScore = 256;
        generate();
        generate();

        document.removeEventListener('keydown', control);
        document.addEventListener('keydown', control);
    }
    createBoard();


    //generate a new number
    function generate(){
        const randomNumber = Math.floor(Math.random() * squares.length);
        // console.log(randomNumber);
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2;
            addColors();
            checkForGameOver()
        }else generate()
    }

    function moveRight(){
        for(let i = 0; i < 16; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];


                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow);
                // console.log(newRow);
                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    function moveLeft(){
        for(let i = 0; i < 16; i++){
            if(i % 4 === 0){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing  = 4 - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    function moveUp(){
        for(let i = 0; i < 4; i++){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+width].innerHTML;
                let totalThree = squares[i+width*2].innerHTML;
                let totalFour = squares[i+width*3].innerHTML;
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredColumn = column.filter(num => num);
                let missing  = 4 - filteredColumn.length;
                let zeros = Array(missing).fill(0);
                let newColumn = filteredColumn.concat(zeros);

                squares[i].innerHTML = newColumn[0];
                squares[i+width].innerHTML = newColumn[1];
                squares[i+width*2].innerHTML = newColumn[2];
                squares[i+width*3].innerHTML = newColumn[3];
        }
    }

    function moveDown(){
        for(let i = 0; i < 4; i++){
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+width].innerHTML;
                let totalThree = squares[i+width*2].innerHTML;
                let totalFour = squares[i+width*3].innerHTML;
                let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredColumn = column.filter(num => num);
                let missing  = 4 - filteredColumn.length;
                let zeros = Array(missing).fill(0);
                let newColumn = zeros.concat(filteredColumn);

                squares[i].innerHTML = newColumn[0];
                squares[i+width].innerHTML = newColumn[1];
                squares[i+width*2].innerHTML = newColumn[2];
                squares[i+width*3].innerHTML = newColumn[3];
        }
    }

    function combineRow(){
       for(let i = 0; i < 15; i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML && squares[i].innerHTML !== '0'){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = '0';

                let mergingElement = squares[i];
                mergingElement.classList.add('merging');
                //add merging class
                // squares[i].classList.add('merging');
                setTimeout(() =>{
                    mergingElement.classList.remove('merging');

                },300);
                addColors();
                checkHighScore(combinedTotal);
            }
       }
    }

    function combineColumn(){
        for(let i = 0; i < 12; i++){
             if(squares[i].innerHTML === squares[i+width].innerHTML && squares[i].innerHTML !== '0'){
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = '0';

                let mergingElement = squares[i];
                mergingElement.classList.add('merging');

                //add merging class
                // squares[i].classList.add('merging');
                setTimeout(() => {
                    mergingElement.classList.remove('merging');

                },300);
                addColors();
                checkHighScore(combinedTotal);
             }
        }
     }

     function checkHighScore(combinedTotal) {
        if (combinedTotal > highScore) {
            highScore = combinedTotal;
            loadRandomAudio();
        }
     }

     newGameButton.addEventListener('click', newGame);

    // moveRight();
    //assign functions to keys
    function control(e){
        if(e.key === 'ArrowLeft'){
            keyLeft();
        }else if(e.key === 'ArrowRight'){
            keyRight();
        }else if(e.key === 'ArrowUp'){
            keyUp();
        }else if(e.key === 'ArrowDown'){
            keyDown();
        }
    }
    document.addEventListener('keydown', control)

    function keyLeft(){
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyRight(){
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyUp(){
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    function keyDown(){
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    //check if there is no zeros on board to lose
    function checkForGameOver(){
        let zeros = 0;
        for(let i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 0){
                zeros++;
            }

        }
    }



    function clear(){
        clearInterval(myTimer);
    }

    // Touch controls for mobile devices
    let startX, startY, endX, endY;

    // Detect touch start
    gridDisplay.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    // Detect touch move
    gridDisplay.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;

        handleTouch(startX, startY, endX, endY);
    });

    function handleTouch(startX, startY, endX, endY) {
        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (diffX > 0) {
                keyRight();
            } else {
                keyLeft();
            }
        } else {
            // Vertical swipe
            if (diffY > 0) {
                keyDown();
            } else {
                keyUp();
            }
        }
    }
    //add colors
    function addColors(){
        for(let i = 0; i < squares.length; i++){
            if(squares[i].innerHTML == 0){
                squares[i].style.backgroundColor = '#63489650';
                squares[i].style.color = 'transparent';
            }else if(squares[i].innerHTML == 2){
                squares[i].style.backgroundColor = '#674ab3';
                squares[i].style.color = '#ffffff';
            }else if(squares[i].innerHTML == 4){
                squares[i].style.backgroundColor = '#9985cd';
                squares[i].style.color = '#ffffff';
            }else if(squares[i].innerHTML == 8){
                squares[i].style.backgroundColor = '#a348a6';
                squares[i].style.color = '#ffffff';
            }else if(squares[i].innerHTML == 16){
                squares[i].style.backgroundColor = '#c680c8';
                squares[i].style.color = '#ffffff';
            }else if(squares[i].innerHTML == 32){
                squares[i].style.backgroundColor = '#9f63c4';
                squares[i].style.color = '#ffffff';
            }else if(squares[i].innerHTML == 64){
                squares[i].style.backgroundColor = '#bf96d7';
                squares[i].style.color = '#ffffff';
            }else if(squares[i].innerHTML == 128){
                squares[i].style.backgroundColor = '#9075d8';
                squares[i].style.color = '#ffffff';
            }else if(squares[i].innerHTML == 256){
                squares[i].style.backgroundColor = '#b5a3e5';
                squares[i].style.color = '#ffffff';
            }else if(squares[i].innerHTML == 512){
                squares[i].style.backgroundColor = '#cea2d7';
                squares[i].style.color = '#ffffff';
            }else if(squares[i].innerHTML == 1024){
                squares[i].style.backgroundColor = '#d795e4';
                squares[i].style.color = '#ffffff';
                squares[i].style.fontSize = '38px';
                squares[i].style.lineHeight = 2;
            }else if(squares[i].innerHTML == 2048){
                squares[i].style.backgroundColor = '#df88f1';
                squares[i].style.color = '#ffffff';
                squares[i].style.fontSize = '38px';
                squares[i].style.lineHeight = 2;
            }else if(squares[i].innerHTML > 2048){
                squares[i].style.backgroundColor = '#e87aff';
                squares[i].style.color = '#ffffff';
                squares[i].style.fontSize = '38px';
                squares[i].style.lineHeight = 2;
            }
        }
    }
    addColors();

    let myTimer = setInterval(addColors, 50)
})
