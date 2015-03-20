$(document).addEventListener('deviceready',function(){

	var watchID = navigator.compass.watchHeading(
		function(direction){
			$('#disk').css('transform', 'rotate('+direction.trueHeading+'deg)');
		},
		function(){
			alert('erreur !');
		});
},false);