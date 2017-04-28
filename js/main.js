$(document).ready(function(){

	$('.btn-save').click(function(){
		var filename = "test.mp4";
		var videoURL = "https://github.com/mediaelement/mediaelement-files/raw/master/big_buck_bunny.mp4";

		requestFileSystem(PERSISTENT, 0, function(fileSystem) {
		    var ft = new FileTransfer();
		    ft.download(videoURL, fileSystem.root.toURL() + "/" + filename, function(entry) {
		    	localStorage.setItem('videourl',fileSystem.root.toURL() + "/" + filename);
		    	console.log('videourl',fileSystem.root.toURL() + "/" + filename);
		    	console.log(entry);

		        var videoElement = document.createElement('video');
		        videoElement.controls = 'controls';
		        videoElement.src = entry;
		        document.getElementById("video").appendChild(videoElement);
		    });
		});
	});

	$('.btn-play').click(function(){
		var videoElement = document.createElement('video');
        videoElement.controls = 'controls';
        videoElement.src = localStorage.videourl;
        document.getElementById("video").appendChild(videoElement);
	})
});