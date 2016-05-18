$(document).ready(function() {

	//set up firebase stuffs
    var Players = new Firebase("https://rps-jrd.firebaseio.com/");
    var Player1 = Players.child("Player1");
    var Player2 = Players.child("Player2");

    var you = {};  // player 
    
// }  end of document ready