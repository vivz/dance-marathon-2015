$(document).ready(function() {	
var position = ["top","center","bottom"];
//source file is https://docs.google.com/spreadsheet/ccc?key=0Ak0qDiMLT3XddHlNempadUs1djdkQ0tFLWF6ci1rUUE	
$(function showstones() {	
$.getJSON( "https://spreadsheets.google.com/feeds/list/1rQHDYJIHHKijCQPpxjUaO1r0oZn4fLEryNmNsnfX2Gg/od6/public/values?alt=json",
	function (data) {	
		$.each(data.feed.entry.reverse(), function(i,entry) {	
		if (entry.gsx$type.$t == "post")
	    {
			var append = '<li class="accordion-navigation stone s'+(i%3+1)+'">';
			append += '<div class="stone-title" id="t'+i+'"> </div>';
			append += '<div id="panel'+i+'a" class="content stone-desc" id="desc'+i+'"></div>';
			append += '</li>';
			$('ul#stonewall').append(append);
			var title = '<b>' + entry.gsx$title.$t + ':</b> ';
			var desc = entry.gsx$content.$t;
			$('#t'+i+'').append(title);
			$('#panel'+i+'a').append(desc);
		}

		if (entry.gsx$type.$t == "video")
	    {
			var append = '<li class="accordion-navigation stone s'+(i%3+1)+'">';
			append += '<div class="stone-title" id="t'+i+'"> </div>';
			append += '<div id="panel'+i+'a" class="content stone-desc" id="desc'+i+'"></div>';
			append += '<div id="video"></div>';
			append += '</li>';
			$('ul#stonewall').append(append);
			var title = '<b>' + entry.gsx$title.$t + ':</b> ';
			var desc = entry.gsx$content.$t;
			var link = '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + entry.gsx$link.$t + '" frameborder="0" allowfullscreen></iframe>'
			$('#t'+i+'').append(title);
			$('#panel'+i+'a').append(desc);
			$('#video').append(link);
			console.log(link);
		}

			});
		});
  
	});
	
});