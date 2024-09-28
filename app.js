$(document).ready(function(){

    // Initialize the score to 0
    const WINNING_VALUE = 2048;

    // Initialize the score to 0
    let score = 0;
    
    // Start the the game by showing two cells
    showNewCell();
    showNewCell();

    // Re-start a new game when the button is clicked
    $("button").on("click", function(event){
        $(".cell").text("");
        updateColors();
        score = 0;
        $("#score").text(score);
        showNewCell();
        showNewCell();
    })

    /* Listen to the key, and move right, left, up or down. 
    Then: display the score, check if 2048 is reached, and check if the game is over */
    $(document).on("keyup", function(event) {
        switch (event.key) {
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowUp":
                moveUp();
                break;
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowDown":
                moveDown();
                break;
            default:
                break;
        }  

        // update the colors
        updateColors();

        // display the score
        $("#score").text(score); 

        // check if the game is over
        if (isGameOver()){
            setTimeout( function(){
                alert("Game over!")
            }, 1000);
        } 
    });


    /**
     * Function allows to select randomly an empty cell, and displays "2" or "4" in it 
     */
        
    function showNewCell(){

        // initialize the array that will contain the IDs (#) of all the empty cells
        let emptyCells=[];

        // loop through the grid, and add the empty cells to the array
        for (let row=1;row<=4;row++){
            for (let col=1;col<=4;col++){
                let cellValue = $("#"+row+"-"+col).text();

                if (!cellValue){
                    emptyCells.push("#"+row+"-"+col);
                }
            }
        }

        // select an empty cell randomly in the array  
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let randomCell = emptyCells[randomIndex];

        // assign a value to the selected cell (the value is "2" 90% of the time, and "4" 10% of the time)
        let newCellValue = randInteger(10) < 9 ? 2 : 4;
        $(randomCell).text(newCellValue);
    }


    /**
     * Function returns an integer between 0 and (upperBound-1) 
     * @param {integer} upperBound 
     * @returns {integer} integer between 0 and (upperBound-1)
     */
    function randInteger(upperBound) {
        return Math.floor(Math.random() * upperBound);
    }


    /**
     * Function checks if the user won the game
     * @returns {boolean} boolean indicating if user reached the winning value
     */
    function isGameWon(val){
        if (val*2 == WINNING_VALUE){
            setTimeout( function(){
                alert("Congratulations... You won!!!")
            }, 1000);
        }
    }

    /**
     * Function checks if the game is over 
     * @returns {boolean} boolean indicating if the game is over
     */

    function isGameOver(){

        for (let row=1;row<=4;row++){
            for (let col=1;col<=4;col++){
                let cellValue = $("#"+row+"-"+col).text();

                // check if a cell is empty
                if (!cellValue) {
                    return false;
                } 

                // check if the cell on the right has the same value
                if (row < 4 && cellValue == $("#" + (row + 1) + "-" + col).text()) {
                    return false; 
                }

                // check if the cell below has the same value
                if (col < 4 && cellValue == $("#" + row + "-" + (col + 1)).text()) {
                    return false; 
                }

            }
        }

        return true;
    }

    // update the colors depending on the value of the cells
    function updateColors(){
        for (let row=1;row<=4;row++){
            for (let col=1;col<=4;col++){
                let cell = $("#"+row+"-"+col);
                switch (cell.text()) {
                    case "":
                        cell.css("backgroundColor", "#e6dace");
                        break;
                    case "2":
                        cell.css("backgroundColor", "#EEE4DA");
                        break;
                    case "4":
                        cell.css("backgroundColor", "#EDE0C8");
                        break;
                    case "8":
                        cell.css("backgroundColor", "#F2B179");
                        break;
                    case "16":
                        cell.css("backgroundColor", "#F59563");
                        break;
                    case "32":
                        cell.css("backgroundColor", "#F67C5F");
                        break;
                    case "64":
                        cell.css("backgroundColor", "#F65E3B");
                        break;
                    case "128":
                        cell.css("backgroundColor", "#EDCF72");
                        break;
                    case "256":
                        cell.css("backgroundColor", "#EDCC61");
                        break;
                    case "512":
                        cell.css("backgroundColor", "#EDC850");
                        break;
                    case "1024":
                        cell.css("backgroundColor", "#EDC53F");
                        break;
                    case "2048":
                        cell.css("backgroundColor", "#EDC22E");
                        break;
                    default:
                        break;
                }
            } 
        }
        
    }


});

