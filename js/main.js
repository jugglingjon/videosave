$(document).ready(function(){
	var videos=[
	{
		filename: "bunny.mp4",
		url: "https://github.com/mediaelement/mediaelement-files/raw/master/big_buck_bunny.mp4"
	},
	{
		filename: "oceans.mp4",
		url: "http://vjs.zencdn.net/v/oceans.mp4"
	}];

	$('.btn-save').click(function(){
		$.each(videos,function(){
			var video=this;

			requestFileSystem(PERSISTENT, 0, function(fileSystem) {
			    var ft = new FileTransfer();
			    ft.download(video.url, fileSystem.root.toURL() + "/" + video.filename, function(entry) {
			    	
			    	localStorage.setItem('videourl',fileSystem.root.toURL() + "/" + video.filename);
			    	console.log('videourl',fileSystem.root.toURL() + "/" + video.filename);
			    	console.log(entry);

			        var videoElement = document.createElement('video');
			        videoElement.controls = 'controls';
			        videoElement.src = localStorage.videourl;
			        document.getElementById("video").appendChild(videoElement);
			    });
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