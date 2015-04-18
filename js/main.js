

$('#nav').affix({
    offset: {     
      top: $('#nav').offset().top + $('.banner').offset().top - 50
      // bottom: ($('footer').outerHeight(true) + $('.application').outerHeight(true)) + 40
    }
});


	function play(i) {
	 var name ='#ytvideo'+i+'';
  	 $(name)[0].src += "&autoplay=1";
  	  ev.preventDefault();
	}

// var tOffset = $(window).width() - $('section').width(); 
var tOffset = Math.floor(($(window).width() / 12) * 2.17); 
console.log(tOffset);

var w = $(window).width(); 
var h = $(window).height(); 

var transtionArray=[];
//number of elements in timeArray
var cutoff,j,k=0;
//time between 4/18 23:59 and 4/18 9:00
var timeArray = ['4/25/2015 23:00:00','4/19/2015 11:00:00','4/19/2015 09:00:00','4/19/2015 07:00:00','4/19/2015 05:00:00','4/19/2015 03:00:00','4/19/2015 01:00:00','4/18/2015 23:00:00','4/18/2015 21:00:00','4/18/2015 19:00:00','4/18/2015 17:00:00','4/18/2015 15:00:00','4/18/2015 13:00:00','4/18/2015 11:00:00','4/18/2015 09:00:00'];
// var timeName = ["11 PM","9 PM","7 PM","5 PM","3 PM","1 PM", "11 AM","9 AM","7 AM"];
var timeName = ["26", "24", "22", "20","18","16","14","12","10","8","6","4","2", "0"];

$(document).ready(function() {
	//source file is https://docs.google.com/a/media.ucla.edu/spreadsheets/d/1rQHDYJIHHKijCQPpxjUaO1r0oZn4fLEryNmNsnfX2Gg/edit?pli=1#gid=0
	$(function() {	
		$.getJSON( "https://spreadsheets.google.com/feeds/list/1rQHDYJIHHKijCQPpxjUaO1r0oZn4fLEryNmNsnfX2Gg/od6/public/values?alt=json", function (data) {	
			$.each(data.feed.entry.reverse(), function(i,entry) {	
				var time = new Date (entry.gsx$datetime.$t);


				if(i==0)
				{
					//find the latest time to start out with
					for(j=1;j<timeArray.length;j++)
					{

						if(time <= new Date(timeArray[j-1]) && time >= new Date(timeArray[j]))
						{
							k=j-1;
							var newLink = ' <li><a href="#anchor'+i+'">'+timeName[k]+'</a></li>'
							$('ul.nav').append(newLink); 
							cutoff=new Date(timeArray[j]);
							k++;j++;
							break;

						}
					}
				}
				else if (time <= cutoff){	

					var newLink = ' <li><a href="#anchor'+i+'">'+timeName[k]+'</a></li>'
					$('ul.nav').append(newLink); 
					cutoff=new Date(timeArray[j]);
					j++;k++;
				}

				if (entry.gsx$type.$t == "transition") {

					// var append = '<section class="transition"><h2>lets put full screen vids here</h2></section>';
					// $('div#content').append(append); 
					var append = '<section class="transition">'
					+'<div id="container" style="height: 100%; overflow:hidden; ">'
       			+'<iframe id="player'+'" style="width:100%; height:100%;" '
       			+'src="https://www.youtube.com/embed/'+entry.gsx$link.$t
       			+'?controls=0&amp;loop=1&amp;showinfo=0&amp;modestbranding=1&amp;disablekb=1&amp;enablejsapi=1"'
           	+'frameborder="0" allowfullscreen></iframe></div></section>';
					$('div#content').append(append); 
					transtionArray.push(i);

				} 		
       		else if (entry.gsx$type.$t == "post") {	
					var append = '<section id="anchor' + i+ '">';
					append += '<div id="t'+i+'"> </div>';
					// append += '<div id="panel' +i+'a" class="info"></div>';
					append += '<p id="panel' +i+'a" class="clearfix info"></p>';
					append += '</section>';
					$('div#content').append(append); 
					var title = '<h2><span class="fa fa-edit"></span> ' + entry.gsx$title.$t + '</h2> ';
					var desc = entry.gsx$content.$t;
					var timeDate = moment(entry.gsx$datetime.$t, "M/DD/YYYY HH:mm:ss").format('dddd, h:mm a');
					$('#t'+i+'').append(title);
					$('#panel'+i+'a').append(timeDate+'<br>');
					$('#panel'+i+'a').append(desc);
				}

				else if (entry.gsx$type.$t == "video") {
		    	var append = '<section id="anchor' + i+ '">';
					append += '<div id="t'+i+'"> </div>';
					append += '<div id="panel'+i+'a"></div>';
					append += '<div id="video'+i+'"></div>';
					append += '</section>';
					$('div#content').append(append); 
					var title = '<h2><span class="fa fa-film"></span> ' + entry.gsx$title.$t + '</h2> ';
					var desc = entry.gsx$content.$t;
					var timeDate = moment(entry.gsx$datetime.$t, "M/DD/YYYY HH:mm:ss").format('dddd, h:mm a');
					var link = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + entry.gsx$link.$t + '" frameborder="0" allowfullscreen></iframe>'
					$('#t'+i+'').append(title);
					$('#panel'+i+'a').append(timeDate+'<br>');
					$('#panel'+i+'a').append(desc);
					$('#video'+i+'').append(link);
				}

				else if (entry.gsx$type.$t == "image") {
		    	var append = '<section id="anchor' + i+ '">';
				  append += '<div id="t'+i+'"> </div>';
					append += '<div id="panel'+i+'a"></div>';
					append += '<div id="pic'+i+'"></div>';
					append += '</li>';
					$('div#content').append(append);
					var title = '<h2><span class="fa fa-camera"></span> ' + entry.gsx$title.$t + '</h2> ';
					var desc = entry.gsx$content.$t;
					var link = ' <img class="img-responsive" src="'+entry.gsx$link.$t+'">'
					var timeDate = moment(entry.gsx$datetime.$t, "M/DD/YYYY HH:mm:ss").format('dddd, h:mm a');
					$('#t'+i+'').append(title);
					$('#panel'+i+'a').append(timeDate+'<br>');
					$('#panel'+i+'a').append(desc);
					$('#pic'+i+'').append(link);
				}


				else if (entry.gsx$type.$t == "interview") {
					var rows = "";
					var check = 1; 

					var count = 0; 
					for (var p in entry) {
						if (count < 11) {
							count++;
							continue; 
						}
						count++;

						if (entry.hasOwnProperty(p)) {
							if (check == 1) {
								rows += "<tr><td>" + entry[p].$t + "</td>";
								check = 2; 
							}
							else if (check == 2) {
								rows += "<td>" + entry[p].$t + "</td></tr>";
								check = 1; 
							}
					  }
					}

		    	var tAppend = '<table class="table table-striped"><tbody id="tbody' + i + '">' + rows + '</tbody></table>';

					var append = '<section id="anchor' + i+ '">';
				  append += '<div id="t'+i+'"> </div>';
					append += '<div class="table-responsive" id="panel'+i+'a">' + tAppend + '</div>';

					$('div#content').append(append);
					var title = '<h2><span class="fa fa-question-circle"></span> ' + entry.gsx$title.$t + '</h2> ';

					var desc = entry.gsx$content.$t;

					var timeDate = moment(entry.gsx$datetime.$t, "M/DD/YYYY HH:mm:ss").format('dddd, h:mm a');
					
					$('#t'+i+'').append(title);
					$('#t'+i+'').append(timeDate);
					$('#t'+i+'').append(desc);


					

				}
				

			});

			$( ".transition" ).each(function(i) {
				var o = tOffset * -1; 
			
			  // $(this).css('left', o); 
			  $(this).css('left', o);

			  $(this).css('width', w); 
			  $(this).css('height', h); 
			});


		});


	  
	});
	
	
});

setTimeout(function() {
          
  $('.info').each(function() {

	  if($(this).innerHeight() > 250){
	      $(this).readmore({
	        moreLink: '<a style="color: black; font-weight: 700;" href="#">Continue Reading</a>',
	  			lessLink: '<a style="color: black; font-weight: 700;" href="#">Close</a>',
	        maxHeight: 228,
	        speed: 200
	      });
	  }


	}) 

	
    
}, 800);

var videos = document.getElementsByTagName("iframe"), fraction = 0.8;

function checkScroll() {

  for(var i = 0; i < videos.length; i++) {
    var video = videos[i];

    var x = 0,
        y = 0,
        w = video.width,
        h = video.height,
        r, //right
        b, //bottom 
        visibleX, visibleY, visible,
        parent;

    
    parent = video;
    while (parent && parent !== document.body) {
      x += parent.offsetLeft;
      y += parent.offsetTop;
      parent = parent.offsetParent;
    }

    r = x + parseInt(w);
    b = y + parseInt(h);
   

    visibleX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, r - window.pageXOffset));
    visibleY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, b - window.pageYOffset));
    

    visible = visibleX * visibleY / (w * h);


    if (visible > fraction) {
      playVideo();
    } else {
      pauseVideo();

    }
  }

};


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
};

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    window.addEventListener('scroll', checkScroll, false);
    window.addEventListener('resize', checkScroll, false);

    //check at least once so you don't have to wait for scrolling for the    video to start
    window.addEventListener('load', checkScroll, false);
};


function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      //console.log("event played");
    } else {
      //console.log("event paused");
    }
};

function stopVideo() {
    player.stopVideo();
};

function playVideo() {
  player.playVideo();
};

function pauseVideo() {
  player.pauseVideo();
};



	
