var API_key = "AIzaSyBa-Awy-4I_WCifa1S875-u1DCF0zOqTcg";
    
get_portrait("trump");
//get_headbox("http://assets.nydailynews.com/polopoly_fs/1.2553575.1457136358!/img/httpImage/image.jpg_gen/derivatives/article_750/conflead6f-3-web.jpg");

//TODO a overall function to start random songs and image searches


function get_portrait(keyword){
    var API_key = "AIzaSyBa-Awy-4I_WCifa1S875-u1DCF0zOqTcg";
    var cx = "016854997568258619646:agnr4_rzpmy";
    $.ajax({
        url: "https://www.googleapis.com/customsearch/v1?key=" + API_key +
            "&searchType=image&imgSize=xlarge&num=6" + 
            "&cx=" + cx + "&q=" + keyword, 
        dataType: "jsonp",
        success: function(data){
            //maybe restrict image to be wider?
            //currently using random image from result
            var index = Math.floor(Math.random() * 6);
            console.log(index);
            
            var link = data.items[index].link;
            var image = data.items[index].image;
//            console.log(data)
//            console.log(link + "\n" + image.width + " " + image.height)
            get_headbox(link, image.width, image.height);
        }
    });
}

function get_headbox(link, width, height){    
     var request = {
      "requests":[
        {
          "image":{
            "source":{
              "imageUri":link
            }
          },
          "features":[
            {
              "type":"FACE_DETECTION",
              "maxResults":1
            }
          ]
        }
      ]
    };
    console.log(link);
    $.ajax({
        url: "https://vision.googleapis.com/v1/images:annotate?key=" + API_key,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(request),
        processData: false,
        success: function (response) {
            var headbox = response.responses[0].faceAnnotations[0].boundingPoly.vertices;
            text_location(headbox, width, height);
        },
        error: function(error){
            console.error("ERROR: " + error.responseText);
        }
    });
}

function text_location(avoid, width, height){
    console.log(avoid[0]);
    var head_center = avg_coord(avg_coord(avoid[0], avoid[1]),
                                avg_coord(avoid[2], avoid[3]));
    console.log(head_center);
    console.log(width + " " + height);
    var text_center = {x: width-head_center.x, y: height-head_center.y};
    console.log(text_center);
    place_text(text_center);
}

function place_text(text_coord){
    console.log("refrain: " + refrain);
    random_song("Pop");
    setTimeout(function(){
        if(refrain != null){
            console.log("refrain: " + refrain);
            return;
        }
        console.log("waiting on refrain");
    }, 300)
    if(refrain == null){
        console.error("something is terribly wrong her=");
    }
}
    


//returns midpoint of 2 points a and b in 2d space
function avg_coord(a, b){
    avg_x = (a.x + b.x) / 2;
    avg_y = (a.y + b.y) / 2;
    return {x: avg_x, y: avg_y};
}