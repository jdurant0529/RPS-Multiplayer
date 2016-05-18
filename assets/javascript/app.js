$(document).ready(function() {

    // var gameData = new Firebase("https://rps-jrd.firebaseio.com/")
    var Players = new Firebase("https://rps-jrd.firebaseio.com/");
    var Player1 = Players.child("Player1");
    var Player2 = Players.child("Player2");


    var you = {};

    var opponent = {};
    var playerNum = '';

    var gamer1 = {};

    var playersExist = false;
    var player1Exists = false;
    var player2Exists = false;
    var youExist = false;
    var opponentExists = false;

    var gameset = false;

    console.log("you = ")
    console.log(you);

    //game setup
    function gameSetup() {

        console.log(gameset);
        
            console.log("here we need to set the game");
            console.log("you = ")
            console.log(you);

            console.log("playersExist = " + playersExist);
            if (playersExist) {
                if (player1Exists && !player2Exists) {
                    console.log("player1 exists, but not player2");
                    Player2.set(you);

                } else if (player2Exists && !player1Exists) {
                    console.log("player2 exists, but not player1");
                    Player1.set(you);
                } else if (player1Exists && player2Exists) {
                    $('#newPlayer').hide();
                }
            } else {
               	Player1.remove();
                Player2.remove();
            }
            console.log("player1Exists = " + player1Exists);
            console.log("player2Exists = " + player2Exists);
            

        return false;

    } //end of gameSetup

    function newPlayer() {

        console.log("inside newPlayer function")
        var playerName = $('#playerName').val().trim();

        if (playerName != '') {
            if (!playersExist) {
                $('#playerNumber').html("<h3>Hi " + playerName + ", you are player 1</h3>");
                $('#P1').html(playerName)
                $('#playerName').val("");
                $('#newPlayer').hide();
                var you = {
                    name: playerName,
                    choice: '',
                    wins: 0,
                    losses: 0
                }
                Player1.set(you)

            } else if (player1Exists) {
                $('#playerNumber').html("<h3>Hi " + playerName + ", you are player 2</h3>");
                $('#P2').html(playerName)
                $('#playerName').val("");
                $('#newPlayer').hide();
                var you = {
                    name: playerName,
                    choice: '',
                    wins: 0,
                    losses: 0
                }
                Player2.set(you)
            }

        }
        return false;
    }



    Players.on("value", function(snapshot) {
            console.log("-----start of players------")
            console.log("Players exists...")
            console.log(snapshot.exists());
            if (snapshot.exists()) {
                playersExist = true;
            }
            console.log("Players snapshot value")
            console.log(snapshot.val());
            console.log("-----end of players-----")

            Player1.on("value", function(snapshot) {
                    console.log("------start of player1------")
                    console.log("Player1 exists...")
                    console.log(snapshot.exists());
                    if (snapshot.exists()) {
                        player1Exists = true;
                        gamer1 = snapshot.val();
                        console.log(gamer1)
                        $('#P1').html(gamer1.name);
                    }
                    console.log("Player1 snapshot value")
                    console.log(snapshot.val());
                    // console.log(snapshot.val().name);
                    console.log("------end of player1------")

                }) //end of player1 value

            Player2.on("value", function(snapshot) {
                    console.log("------start of player2------")
                    console.log("Player2 exists...")
                    console.log(snapshot.exists());
                    if (snapshot.exists()) {
                        player2Exists = true;
                        gamer2 = snapshot.val();
                        $('#P2').html(gamer2.name);
                    }
                    console.log("Player2 snapshot value")
                    console.log(snapshot.val());
                    console.log("------end of player2------")

                }) //end of player2 value

            gameSetup();
        }) // end of players on value function





    $(document).on('click', '#submit', newPlayer);

    // $( window ).load(function() {
    //         console.log( "window loaded" );
    //     })
})
