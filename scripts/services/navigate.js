application.factory("navigate",function($location){
    "use strict";
    var data;
    var current_bl_index,current_ch_index;
    return{
        urlIsValid:function(routeParams){
            if (routeParams.hasOwnProperty("chaptername")) {


                var bl_name = routeParams.blockname;
                var ch_name = routeParams.chaptername;
                console.log(data);
                current_bl_index = data.findIndex(function (elem) {
                    return elem.name === bl_name;
                });
                if (current_bl_index > -1)
                    current_ch_index = data[current_bl_index].chapters.findIndex(function (elem) {
                        return elem.name === ch_name;
                    });
                console.log(current_bl_index + " " + current_ch_index);
                return (!(current_bl_index === -1 || current_ch_index === -1));
            }
            else if(routeParams.hasOwnProperty("blockname")){
                var bl_name=routeParams.blockname;
                console.log("url: "+"blocks/"+bl_name);
                current_bl_index = data.findIndex(function (elem) {
                    return elem.name === bl_name;
                });
                current_ch_index=-1;
                return current_bl_index!==-1;
            }
         },
        errorPage: function(){
            current_bl_index=-1;
            current_ch_index=-1;
            $location.path("/404");
        },
        setData: function(fullData){
            data = fullData;
            current_bl_index=0;
            current_ch_index=-1;
        },
        getBlockByIndex: function(index,ch_index){
            if (ch_index){
                current_ch_index = ch_index;

            }
            current_bl_index = index;
            return data[index];
        },
        goTo : function(bl_name,ch_name){
            if (ch_name)
                $location.path("/blocks/"+bl_name+"/chapter/"+ch_name);
            else
                $location.path("/blocks/"+bl_name);
        },
        lowEnd: function(){
            return (current_bl_index===0 && current_ch_index<=-1) || ( current_bl_index===-1 && current_ch_index===-1)
        },
        highEnd: function(){
            return (current_bl_index===data.length-1 && current_ch_index===data[data.length-1].chapters.length-1) || (current_bl_index===-1)
        },
        goToNext: function(){
            var bl_name,ch_name;
            if (current_ch_index===-1){

                bl_name = data[current_bl_index].name;
                ch_name = data[current_bl_index].chapters[current_ch_index+1].name;
                console.log(ch_name);
                $location.path("/blocks/"+bl_name+"/chapter/"+ch_name);
            }
            else if (current_ch_index<data[current_bl_index].chapters.length-1){

                bl_name = data[current_bl_index].name;
                ch_name = data[current_bl_index].chapters[current_ch_index+1].name;
                $location.path("/blocks/"+bl_name+"/chapter/"+ch_name);
            }
            else if (current_ch_index === data[current_bl_index].chapters.length-1){
                bl_name = data[current_bl_index+1].name;
                $location.path("/blocks/"+bl_name);
            }
        },
        goToPrevious: function(){
            var bl_name,ch_name;
            if (current_ch_index>0){
                current_ch_index--;
                bl_name = data[current_bl_index].name;
                ch_name = data[current_bl_index].chapters[current_ch_index].name;
                $location.path("/blocks/"+bl_name+"/chapter/"+ch_name);
            }
            else if(current_ch_index===0){
                bl_name = data[current_bl_index].name;
                $location.path("/blocks/"+bl_name);
            }
            else{
                current_bl_index--;
                bl_name = data[current_bl_index].name;
                current_ch_index = data[current_bl_index].chapters.length-1;
                ch_name = data[current_bl_index].chapters[current_ch_index].name;
                $location.path("/blocks/"+bl_name+"/chapter/"+ch_name);
            }
        },
        getDataBlock: function(name){
            console.log(data);
            return data.find(function(elem){
                return elem.name===name;
            });
        }
    }
});