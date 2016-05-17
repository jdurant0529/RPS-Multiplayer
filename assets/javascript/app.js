$(document).ready(function() {

    var gameData = new Firebase("https://rps-jrd.firebaseio.com/")


    var Player = {}

    $('#submit').on("click", function() {

        var playerName = $('#playerName').val().trim();
        if (playerName != '') {

            $('#playerNumber').html("<h3>Hi " + playerName + ", you are player 1</h3>");
            $('#P1').html(playerName)
            $('#playerName').val("");
            $('#newPlayer').hide();

            Player = {
                name: playerName,
                choice: '',
                wins: 0,
                losses: 0
            }

            console.log(Player.name);
            console.log(Player);


            return false;
        }

        


    })
})
