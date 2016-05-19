$(document).ready(function() {

	//set up firebase stuffs
    var Players = new Firebase("https://rps-jrd.firebaseio.com/");
    var Player1 = Players.child("Player1");
    var Player2 = Players.child("Player2");

    var user = 0;   // to use when player reloads page

     
    



// }  end of document ready