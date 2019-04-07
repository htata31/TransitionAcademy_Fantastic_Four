/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $http.defaults.headers.post['dataType'] = 'json'
});



myapp.controller('indexctrl', function($scope, $http,$window) {


    $scope.getSearchResult = function() {
        $scope.gamesArray =[];
        console.log($scope.players);
        console.log($scope.time);

        var x=console.log(document.getElementById("interest").value);


        $http.get('http://127.0.0.1:5000/getHackData?keywords='+$scope.players+'!!!'+$scope.time+'@@@'+document.getElementById("interest").value).then(function(d)
            {
                var document=[];
                //console.log("Len is already present"+d.data.length);
                //console.log("val already present"+JSON.stringify({d: d}));
                if(d.data.length!=0) {


                    for (i=0;i<d.data.length;i++)
                    {
                            $http.get('http://127.0.0.1:5000/kg?query=' + d.data[i].game_id).success(function (data) {
                                try {

                                    //console.log(data);
                                    $scope.searchDescription = (data.boardgames.boardgame.description._text).replace(/<br\/>/g,"");
                                    $scope.searchImage = data.boardgames.boardgame.image._text;
                                    $scope.gamedetailsHeader="Game Details";
                                    //console.log($scope.searchDescription);
                                    $scope.gamesArray.push($scope.searchDescription+"^^^"+$scope.searchImage);
                                }
                                catch (err) {
                                }
                            })
                            //document.push($scope.searchDescription);
                    }
                }
                setTimeout(function () {
                    console.log("Document--------------" + $scope.gamesArray);
                },1000);

            },function(err)
            {
                console.log(err);
            }
        )


            }

        })



