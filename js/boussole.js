$(document).ready(function(){
	document.addEventListener("deviceready", onDeviceReady, false);
	$('#debug').html('Document Ready !');
});


// device APIs are available
//
function onDeviceReady() {
	$('#debug').html('deviceReady !');
	var compassSuccess=function(heading) {
		$('#debug').html(heading.magneticHeading);
		$('#disk').css('transform','rotate('+(-1*parseInt(heading.magneticHeading))+'deg)');
		
		setTimeout(getCompass,250);
		
		return;
	};
	var compassError=function(compassError) {
		setTimeout(getCompass,250);
		//alert('Compass error: ' + compassError.code);
		return;
	};



	function getCompass()
	{
		if(navigator.compass) {
			navigator.compass.getCurrentHeading(compassSuccess, compassError);
		}
	}
	getCompass();
}