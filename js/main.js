$('#nav').affix({
    offset: {     
      top: $('#nav').offset().top + $('.banner').offset().top - 50
      // bottom: ($('footer').outerHeight(true) + $('.application').outerHeight(true)) + 40
    }
});


var tOffset = $(window).width() - $('section').width(); 
var w = $(window).width(); 
var h = $(window).height(); 

//number of elements in timeArray
var cutoff,j,k=0;
//time between 4/18 23:59 and 4/18 9:00
var timeArray = ['4/19/2015 23:00:00','4/18/2015 23:00:00','4/18/2015 21:00:00','4/18/2015 19:00:00','4/18/2015 17:00:00','4/18/2015 15:00:00','4/18/2015 13:00:00','4/18/2015 11:00:00','4/18/2015 09:00:00'];
// var timeName = ["11 PM","9 PM","7 PM","5 PM","3 PM","1 PM", "11 AM","9 AM","7 AM"];
var timeName = ["18","16","14","12","10","8","6","4","2"];

$(document).ready(function() {	

	var position = ["top","center","bottom"];
	//source file is https://docs.google.com/a/media.ucla.edu/spreadsheets/d/1rQHDYJIHHKijCQPpxjUaO1r0oZn4fLEryNmNsnfX2Gg/edit?pli=1#gid=0
	$(function showstones() {	
	$.getJSON( "https://spreadsheets.google.com/feeds/list/1rQHDYJIHHKijCQPpxjUaO1r0oZn4fLEryNmNsnfX2Gg/od6/public/values?alt=json",
		function (data) {	
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

					var append = '<section class="transition"><h2>lets put full screen vids here</h2></section>';
					$('div#content').append(append); 


				} 		

			else if (entry.gsx$type.$t == "post") {	
				var append = '<section id="anchor' + i+ '">';
				append += '<div class="post-title" id="t'+i+'"> </div>';
				append += '<div id="panel'+i+'a" class="content stone-desc" id="desc'+i+'"></div>';
				append += '</section>';
				$('div#content').append(append); 
				var title = '<h2><span class="fa fa-edit"></span> ' + entry.gsx$title.$t + ':</h2> ';
				var desc = entry.gsx$content.$t;
				var timeDate = entry.gsx$datetime.$t;
				$('#t'+i+'').append(title);
				$('#panel'+i+'a').append(timeDate+'<br>');
				$('#panel'+i+'a').append(desc);
				
			}

			else if (entry.gsx$type.$t == "video") {
	    	var append = '<section id="anchor' + i+ '">';
				append += '<div class="post-title" id="t'+i+'"> </div>';
				append += '<div id="panel'+i+'a" class="content stone-desc" id="desc'+i+'"></div>';
				append += '<div id="video'+i+'"></div>';
				append += '</section>';
				$('div#content').append(append); 
				var title = '<h2><span class="fa fa-film"></span> ' + entry.gsx$title.$t + ':</h2> ';
				var desc = entry.gsx$content.$t;
				var timeDate = entry.gsx$datetime.$t;
				var link = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + entry.gsx$link.$t + '" frameborder="0" allowfullscreen></iframe>'
				$('#t'+i+'').append(title);
				$('#panel'+i+'a').append(timeDate+'<br>');
				$('#panel'+i+'a').append(desc);
				$('#video'+i+'').append(link);
			}

			else if (entry.gsx$type.$t == "image") {
	    	var append = '<section id="anchor' + i+ '">';
			    append += '<div class="post-title" id="t'+i+'"> </div>';
				append += '<div id="panel'+i+'a" class="content stone-desc" id="desc'+i+'"></div>';
				append += '<div id="pic'+i+'"></div>';
				append += '</li>';
				$('div#content').append(append);
				var title = '<h2><span class="fa fa-camera"></span> ' + entry.gsx$title.$t + ':</h2> ';
				var desc = entry.gsx$content.$t;
				var link = ' <img src="'+entry.gsx$link.$t+'">'
				var timeDate = entry.gsx$datetime.$t;
				$('#t'+i+'').append(title);
				$('#panel'+i+'a').append(timeDate+'<br>');
				$('#panel'+i+'a').append(desc);
				$('#pic'+i+'').append(link);
			}

		});

		$( ".transition" ).each(function(i) {
			var o = tOffset * -1; 
			console.log(tOffset);
			console.log(o);
		  $(this).css('left', '-120px'); 

		  $(this).css('width', w); 
		  $(this).css('height', h); 
		});


	});

  
});

  

	
});

