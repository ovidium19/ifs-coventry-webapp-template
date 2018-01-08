application.directive("appForm",function($timeout){
    "use strict";
    return{
        restrict: "E",
        templateUrl: "templates/appForm.html",
        scope:{
            chapter: "="
        },
        link: function (scope,elem,attrs,ctrl) {
            var findTogglers = function(){
                var toggleButton  = elem.find(".toggles");
                console.log(toggleButton);
                toggleButton.on("click",function(e){
                    var selectField = $(e.currentTarget).siblings("select");
                    selectField[0].disabled = !selectField[0].disabled;
                    console.log(selectField);
                })
            };
            scope.$on("prepareFields",function(){
                $timeout(function () {
                    findTogglers();
                },0);

            })

        },
        controller: function($scope){
            $scope.typeOptions = [
                "text-paragraph",
                "list-text",
                "text-alert",
                "text-mythfact",
                "text-quote"
            ];

        }
    }
});