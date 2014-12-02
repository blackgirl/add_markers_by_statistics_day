function MapDataController($scope) {
    $scope.data = [];

    $scope.usersImages = {};
    $scope.iceServerInfo = [];

    $scope.start;
    $scope.end;
    $scope.month;

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

    $scope.data = [
                    [{
                      "SmsDateTime": "\/Date(1414882920000)\/",
                      Latitude: 59.13438315,
                      Longitude: 9.69306257,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1414973040000)\/",
                      Latitude: 59.13837658,
                      Longitude: 9.65241432,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415063160000)\/",
                      Latitude: 59.13954382,
                      Longitude: 9.67434061,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }, {
                      "SmsDateTime": "\/Date(1415063160000)\/",
                      Latitude: 59.13261167,
                      Longitude: 9.64432288,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415153280000)\/",
                      Latitude: 59.14710459,
                      Longitude: 9.66406279,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415243400000)\/",
                      Latitude: 59.14530085,
                      Longitude: 9.67597591,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415333520000)\/",
                      Latitude: 59.13251478,
                      Longitude: 9.68434636,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415423640000)\/",
                      Latitude: 59.13261167,
                      Longitude: 9.64432288,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415513760000)\/",
                      Latitude: 59.12051348,
                      Longitude: 9.64997225,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415603880000)\/",
                      Latitude: 59.15057105,
                      Longitude: 9.65304792,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415694000000)\/",
                      Latitude: 59.13630624,
                      Longitude: 9.69470594,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415784120000)\/",
                      Latitude: 59.12233747,
                      Longitude: 9.66267709,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415874240000)\/",
                      Latitude: 59.11958397,
                      Longitude: 9.64583988,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1415964360000)\/",
                      Latitude: 59.12417328,
                      Longitude: 9.63591251,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1416054480000)\/",
                      Latitude: 59.14048703,
                      Longitude: 9.64068703,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1416144600000)\/",
                      Latitude: 59.13035284,
                      Longitude: 9.64312642,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1416234720000)\/",
                      Latitude: 59.13923814,
                      Longitude: 9.64135541,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1416324840000)\/",
                      Latitude: 59.1485173,
                      Longitude: 9.64419785,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1416414960000)\/",
                      Latitude: 59.12165761,
                      Longitude: 9.68071532,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1416505080000)\/",
                      Latitude: 59.13258561,
                      Longitude: 9.6417023,
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }] , [{
                      "SmsDateTime": "\/Date(1416595200000)\/",
                      "Latitude": "59.14529274",
                      "Longitude": "9.68300565",
                      "City": "Munich",
                      "TransactionId": "0987654321",
                      "LogId": 123
                    }]
                ];

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

            return [day, mon, year];
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
        getLocations: function( d ) {
            var y = [];
            var data = d;
            for(var i in data) {      
                for(var o in data[i]) {
                    var nu = new google.maps.LatLng( data[i][o].Latitude, data[i][o].Longitude );
                    y.push( nu );
                }
            }
            return y;
        },
        getLocation: function( d ) {
          var l = [];
          for( var a in d ) {
            var nu = new google.maps.LatLng( d[a].Latitude, d[a].Longitude );
            l.push( nu );
          }
          return l;
        },
        daysInMonth: function( month, year ) {
            if( !year ) year = new Date().getFullYear();
            return new Date( year, month, 0 ).getDate();
        },
        addEmptyDays: function( d ) {
            var d = d;
            var fullData = []; // [{ dDate: [ d, m, y ], dLoc: [ LatLng, .. ]}, {}, ..]
            
            $scope.formatData.getStartEnd();
            var daysInMonth;
            var month;

            var day = $scope.start[0];
            var year = $scope.start[2];

            var startMonth = $scope.start[1];
            var endMonth = $scope.end[1];
            var isOneMonth = startMonth == endMonth;

            if( isOneMonth ) {
              month = startMonth;
              $scope.month = $scope.formatData.getMonth( month );
              daysInMonth = $scope.formatData.daysInMonth( month, year );
        
              var endDay = $scope.end[0];

              for( var i = 0; i < endDay; i++ ) {
                var t = [ day+i, month, year ];
                fullData.push({ dDate: t, dLoc: null, len: "—" });
              }

              for( var a in d ) {
                var b = $scope.formatData.getNormalDate( d[a][0].SmsDateTime );
                var l = $scope.formatData.getLocation( d[a] );
                var ln = d[a].length;

                for( var i = 0; i < endDay; i++ )
                  if( fullData[ i ].dDate[0] == b[0] ) {
                    fullData[ i ].dLoc = l;
                    fullData[ i ].len = ln;
                    break;
                  }
                
              }
            } else {
              // TODO if period contains different month
            }
            $scope.safeApply( function() {
              $scope.fullData = fullData;
              global.fullData = $scope.fullData;
            });
        },

    };

    angular.element(document).ready(function() {
      $scope.formatData.addEmptyDays( $scope.data );
    });

};