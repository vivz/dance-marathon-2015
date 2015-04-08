$(document).ready(function() {	
var position = ["top","center","bottom"];
//source file is https://docs.google.com/spreadsheet/ccc?key=0Ak0qDiMLT3XddHlNempadUs1djdkQ0tFLWF6ci1rUUE	
$(function showstones() {	
$.getJSON( "https://spreadsheets.google.com/feeds/list/1rQHDYJIHHKijCQPpxjUaO1r0oZn4fLEryNmNsnfX2Gg/od6/public/values?alt=json",
	function (data) {	
		$.each(data.feed.entry.reverse(), function(i,entry) {	
		//if (entry.gsx$date.$t && entry.gsx$copystatus.$t)
	//	{
			var append = '<li class="accordion-navigation stone s'+(i%3+1)+'">';
			append += '<a href="#panel'+i+'a" class="stone-title" id="t'+i+'"></a>';
			append += '<div id="panel'+i+'a" class="content stone-desc" id="desc'+i+'"></div>';
			append += '</li>';
			$('ul#stonewall').append(append);
			var title = '<b>' + entry.gsx$type.$t + ':</b> ' + entry.gsx$title.$t;
			var desc = entry.gsx$content.$t;
			$('#t'+i+'').append(title);
			$('#panel'+i+'a').append(desc);
	//	}
			});
		});
  
	});
	
});