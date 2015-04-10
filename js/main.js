$('#nav').affix({
    offset: {     
      top: $('#nav').offset().top + $('.banner').offset().top - 50
      // bottom: ($('footer').outerHeight(true) + $('.application').outerHeight(true)) + 40
    }
});


$(document).ready(function() {	
	var position = ["top","center","bottom"];
	//source file is https://docs.google.com/a/media.ucla.edu/spreadsheets/d/1rQHDYJIHHKijCQPpxjUaO1r0oZn4fLEryNmNsnfX2Gg/edit?pli=1#gid=0
	$(function showstones() {	
	$.getJSON( "https://spreadsheets.google.com/feeds/list/1rQHDYJIHHKijCQPpxjUaO1r0oZn4fLEryNmNsnfX2Gg/od6/public/values?alt=json",
		function (data) {	
			$.each(data.feed.entry.reverse(), function(i,entry) {	
			if (entry.gsx$type.$t == "post")
	    {
				var append = '<section id="anchor' + i+ '">';
				append += '<div class="post-title" id="t'+i+'"> </div>';
				append += '<div id="panel'+i+'a" class="content stone-desc" id="desc'+i+'"></div>';
				append += '</section>';
				$('div#content').append(append); 
				var title = '<b>' + entry.gsx$title.$t + ':</b> ';
				var desc = entry.gsx$content.$t;
				$('#t'+i+'').append(title);
				$('#panel'+i+'a').append(desc);
			}

			if (entry.gsx$type.$t == "video")
	    {
	    	var append = '<section id="anchor' + i+ '">';
				append += '<div class="post-title" id="t'+i+'"> </div>';
				append += '<div id="panel'+i+'a" class="content stone-desc" id="desc'+i+'"></div>';
				append += '<div id="video"></div>';
				append += '</section>';
				$('div#content').append(append); 
				var title = '<b>' + entry.gsx$title.$t + ':</b> ';
				var desc = entry.gsx$content.$t;
				var link = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + entry.gsx$link.$t + '" frameborder="0" allowfullscreen></iframe>'
				$('#t'+i+'').append(title);
				$('#panel'+i+'a').append(desc);
				$('#video').append(link);
			}

			if (entry.gsx$type.$t == "image")
		    {
					append += '<div class="post-title" id="t'+i+'"> </div>';
					append += '<div id="panel'+i+'a" class="content stone-desc" id="desc'+i+'"></div>';
					append += '<div id="pic"></div>';
					append += '</li>';
					console.log(append);
					$('div#content').append(append);
					var title = '<b>' + entry.gsx$title.$t + ':</b> ';
					var desc = entry.gsx$content.$t;
					var link = ' <img src="'+entry.gsx$link.$t+'">'
					$('#t'+i+'').append(title);
					$('#panel'+i+'a').append(desc);
					$('#pic').append(link);
				}

			});
		});

	  
	});

  

	
});

