$(document).ready(function() {

    // var gameData = new Firebase("https://rps-jrd.firebaseio.com/")
    var Players = new Firebase("https://rps-jrd.firebaseio.com/");
    var Player1 = Players.child("Player1");
    var Player2 = Players.child("Player2");

    var user = 0;

    var playersExist = false;

    var player1Exists = false;
    var Player1Data = {};
    var player2Exists = false;
    var Player2Data = {};
    var gameset = false;

    //game setup
    function gameSetup() {

        console.log(gameset);

        console.log("here we need to set the game");
        console.log("you = ")


        console.log("playersExist = " + playersExist);
        if (!gameset) {
            if (playersExist) {
                if (player1Exists && !player2Exists) {
                    console.log("player1 exists, but not player2");
                    Player2.set(Player2Data);
                    user = 1;


                } else if (player2Exists && !player1Exists) {
                    console.log("player2 exists, but not player1");
                    Player1.set(Player1Data);
                    user = 2;
                } else if (player1Exists && player2Exists) {
                    $('#newPlayer').hide();
                }
            }
            console.log("player1Exists = " + player1Exists);
            console.log("player2Exists = " + player2Exists);
            gameset = true;
        }

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
                you = {
                    name: playerName,
                    choice: '',
                    wins: 0,
                    losses: 0,
               
                }
                Player1.set(you)
                user = 1;

            } else if (player1Exists) {
                $('#playerNumber').html("<h3>Hi " + playerName + ", you are player 2</h3>");
                $('#P2').html(playerName)
                $('#playerName').val("");
                $('#newPlayer').hide();
                you = {
                    name: playerName,
                    choice: '',
                    wins: 0,
                    losses: 0
                }
                Player2.set(you)
                user = 2;
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
                        Player1Data = snapshot.val();
                        $('#P1').html(Player1Data.name);
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
                        Player2Data = snapshot.val();
                        $('#P2').html(Player2Data.name);
                    }
                    console.log("Player2 snapshot value")
                    console.log(snapshot.val());
                    console.log("------end of player2------")

                }) //end of player2 value

            gameSetup();
        }) // end of players on value function

    $(window).unload(function() {
        console.log('start of page unload.');
        console.log('user = ' + user);

        if (user == 1) {
            console.log("you were player 1.  Player 1 has left the game").
            Player1.remove();
        } else if (user == 2) {
            console.log("you were player 2.  player 2 has left the game.")
            Player2.remove();
        }
        console.log('end of page unload');
    });



    $(document).on('click', '#submit', newPlayer);
})
