var videos;
var videosStarter=[
	{
		filename: "bunny.mp4",
		url: "https://github.com/mediaelement/mediaelement-files/raw/master/big_buck_bunny.mp4"
	},
	{
		filename: "oceans.mp4",
		url: "http://vjs.zencdn.net/v/oceans.mp4"
	}];

//if local version, use that, if not, begin with starter
if(localStorage.videos){
	videos=JSON.parse(localStorage.videos);
}
else{
	localStorage.videos=videosStarter;
}


function updateLocal(){
	localStorage.videos=JSON.stringify(videos);
}



function populateButtons(){
	$.each(videos,function(index){
		var localString='';
		var newButton=$('<a href="'+this.url+'" data-index="'+this.index+'" class="btn btn-primary">'+localString+this.filename+'</a>');

		if(this.local){
			newButton.before('LOCAL: ');
			newButton.addClass('local').css('background','red');
		}

		newButton.appendTo('#buttons');
	});
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady(){

	$(document).ready(function(){
		

		


		$('#buttons').on('click','btn',function(){

			var videoBtn=$(this);
			var video=videos[videoBtn.attr('data-index')];

			if(navigator.online){

				requestFileSystem(PERSISTENT, 0, function(fileSystem) {
				    var ft = new FileTransfer();
				    var localURL=fileSystem.root.toURL() + "/" + video.filename;
				    console.log('downloading: '+video.url);

				    ft.download(video.url, localURL, function(entry) {
				    	console.log('downloaded: '+video.url);
				    	video.local=localURL;
				    	
				    	updateLocal();
				        $('#buttons').empty();
				        populateButtons();

				        var videoElement = $('<video controls src="'+loclalURL+'"></video>');
				        $('#video').empty();
				        $('#video').append(videoElement);
				    });
				});
			}
			if(videoBtn.hasClass('local')){
				var videoElement = $('<video controls src="'+video.local+'"></video>');
		        $('#video').empty();
		        $('#video').append(videoElement);
			}
			else{
				alert('not local video');
			}

			return false;
		});

	});

}