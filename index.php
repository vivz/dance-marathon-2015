

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Dance Marathon 2015</title>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>

</head> 

<body>
	<div id="stonewall-wrap">
		<div id="title"><h2 class="animated fadeInDown">Dance Marathon</h2>
			<h3>From the Daily Bruin</h3></div>
		<div id="blurb"><p>For 96 years, the Daily Bruin has strived to hold UCLA accountable to the community it serves. We take that responsibility seriously. And when the Bruin is unjustly thwarted in its efforts to inform students, we believe you have a right to know. Each time our reporters are stonewalled in their attempts to inform readers, we will record that here, stone by stone. No stonewalling that week, no new stone. Below, you can click each stone to read about why it's there.  </p></div>
		<ul id="stonewall" class="accordion" data-accordion> </ul> 
	</div>
</body>
</html>

<script type="text/javascript"> 
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
</script>
