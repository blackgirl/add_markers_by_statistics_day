function MapDataController($scope) {
    $scope.data = [];
    $scope.period = [];
    $scope.center;
    $scope.month = '';
    $scope.dayCount = 1;

    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    global = new Global();
    global.scopes.formatData = angular.element($('body')).scope();
    global.scopes.map = angular.element($('#map-canvas')).scope();

    $scope.fullData = [];

    $scope.formatData = {

        getTimeStamp: function( d ) {
            return parseInt( d.replace( /\D+/g, "" ));
        },
        getNormalDate: function( d ) {
            var num = new Date( $scope.formatData.getTimeStamp( d ));

            var day  = num.getUTCDate();
            var mon = num.getUTCMonth();
            var year = num.getFullYear();
            var hours = num.getHours();
            var minutes = num.getMinutes();
            var seconds = num.getSeconds();

            return [day, mon, year, hours, minutes, seconds];
        },
        getMonth: function( d ) {
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
        },
        getStartEnd: function() {
            var data = $scope.data;
            $scope.start = $scope.formatData.getNormalDate( data[0][0].SmsDateTime );
            $scope.end = $scope.formatData.getNormalDate( data[data.length-1][0].SmsDateTime );
            return { start: $scope.start, end: $scope.end };
        },
        getLocation: function( la, lo ) {
            return new google.maps.LatLng( la, lo );
        },
        daysInMonth: function( month, year ) {
            if( !year ) year = new Date().getFullYear();
            if( month < 0 ) month = 12;
            if( month == 13 ) month = 1;

            return new Date( year, month, 0 ).getDate();
        },
        addEmptyDays: function( d ) {
            var d = d;
      
            var date = $scope.formatData.getNormalDate(d[0].SmsDateTime);
            var daysInMonth = parseInt( $scope.formatData.daysInMonth( date[1], date[2] ));
            var daysInPrevMonth = $scope.formatData.daysInMonth( parseInt( date[1]-1 ), date[2] );
            var daysInNextMonth = $scope.formatData.daysInMonth( parseInt( date[1]+1 ), date[2] );
            var day = parseInt( date[0] );
            var eachSide = 10;
            var period = [];

            // Add first half
            for( var i = eachSide; i >= 0; i-- ) {
              var t;
              if( day-i > 0 ) t = day-i;
              else t = parseInt( daysInPrevMonth-i+day );
              period.push( t );
            }
            // Add next halt
            for( var i = 1; i <= eachSide; i++ ) {
              var t;
              if( day+i <= daysInMonth ) t = day+i;
              else t = parseInt( day+i-daysInMonth );
              period.push( t );
            }
            $scope.period = period; // period[ eachSide ] == day with data!

            // Added new properties to data object
            var ln = d.length;
            for( var a in d ) {
              d[a].SmsDateTime = $scope.formatData.getNormalDate( d[a].SmsDateTime );
              d[a].Position = $scope.formatData.getLocation( d[a].Latitude, d[a].Longitude );                
            }

            d.days = $scope.dayCount;
            d.countSms = ln;
            d.day = date;

            // Update global data object
            $scope.safeApply( function() {
              $scope.month = $scope.formatData.getMonth( date[1] );
              center = d[0].Position;
              $scope.fullData = d;
              global.fullData = $scope.fullData;
            });
        },
    };

    $scope.requests = {
      getData: function( onSuccess ) {
        $.ajax({
          url: 'http://app.jakten.no/home/GetStats',
          type:'post',
          data: {
              days : 21
              // days : $scope.dayCount
          },
          success: function(data) {
            onSuccess( data );
          }
        });
      },

    };

    angular.element(document).ready(function() {
      $scope.requests.getData( function( data ){
              // $scope.safeApply(function(){
              //     $scope.data = data.Campaign[0].Data;
              // });
              $scope.safeApply(function(){
                $scope.campaign = data.Campaign;
                  $scope.data = data.Campaign[0].Data;
              });
              $scope.formatData.addEmptyDays( $scope.data );
              fillLocations( $scope.fullData );
              // console.log(data);
          }
      );
    });

};