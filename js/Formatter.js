var content = '';
var data;

function getTimeStamp( d ) {
	return parseInt( d.replace( /\D+/g, "" ));
};

function getNormalDate( d ) {
  var num = new Date( getTimeStamp( d ));

  var day  = num.getUTCDate();
  var mon = num.getUTCMonth();
  var year = num.getFullYear();

  return [day, mon, year];
}

function getMonth( d ) {
  var m = [];

  m[0] = "January";
  m[1] = "February";
  m[2] = "March";
  m[3] = "April";
  m[4] = "May";
  m[5] = "June";
  m[6] = "July";
  m[7] = "August";
  m[8] = "September";
  m[9] = "October";
  m[10] = "November";
  m[11] = "December";

  return m[d];
};

function getDaysContent() {

	for( var d in data ) {
		var l = getTimeStamp(data[d][0].SmsDateTime);
	    var n = getNormalDate( data[d][0].SmsDateTime );
	    n[1]++;

	    content += '<div class="days '+l+'"><span class="day">';
	    content += n[0];
	    content += '</span><div class="statistic"><span class="icon-small user-icon-small">';
	    content += data[d].length;
	    content += '</span><span class="visit-counter"></span></div></div>';

	}

  return content;
};

function setContent(da) {
  data = da;

  var start = getNormalDate( data[0][0].SmsDateTime );
  var end = getNormalDate( data[data.length-1][0].SmsDateTime );

  var tmp = getMonth( start[1] );
  if( start[1] != end[1] ) tmp += " — "+getMonth(end[1]);
  $('.panel-title.month').html( tmp );
  $('.panel-top-statistic').html( getDaysContent() );

};