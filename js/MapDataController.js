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

    $scope.data = [{
                      "SmsDateTime": "\/Date(1414882920000)\/",
                      Latitude: 59.13438315,
                      Longitude: 9.69306257,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }, {
                      "SmsDateTime": "\/Date(1414796520000)\/",
                      Latitude: 59.13837658,
                      Longitude: 9.65241432,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }, {
                      "SmsDateTime": "\/Date(1414800240000)\/",
                      Latitude: 59.13954382,
                      Longitude: 9.67434061,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }, {
                      "SmsDateTime": "\/Date(1414803960000)\/",
                      Latitude: 59.13261167,
                      Longitude: 9.64432288,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }, {
                      "SmsDateTime": "\/Date(1414807680000)\/",
                      Latitude: 59.14710459,
                      Longitude: 9.66406279,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }, {
                      "SmsDateTime": "\/Date(1414811400000)\/",
                      Latitude: 59.14530085,
                      Longitude: 9.67597591,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }];

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
              else t = parseInt( daysInPrevMonth-i-day );
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

    angular.element(document).ready(function() {
      $.ajax({
          url: 'http://app.jakten.no/home/GetStats',
          type:'post',
          data: {
              days : $scope.dayCount
          },
          success:function( data ){
              $scope.safeApply(function(){
                  $scope.data = data.Campaign[0].Data;
                  console.log($scope.data);
              });
              $scope.formatData.addEmptyDays( $scope.data );
              fillLocations( $scope.fullData );
          }
      }); 
    });

};