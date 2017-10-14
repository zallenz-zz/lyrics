$(document).ready(function() {
    $("#submit").click(function(event){
        event.preventDefault();
        if($("#person").val() == "" || $("#genre_select").val() == ""){
           console.log("one of the fields are not filled in");
            $("#inputModal").effect("shake");
            return;
        }
        $("#inputModal").modal("hide");
        var person = $("#person").val();
        var genre = $("#genre_select").val();
        $("#person").val("");
        $("#genre_select").val("");
        
        start(person, genre);    
    });
});

function start(person, genre){
    console.log(person + " " + genre);
    random_song(genre);
    get_portrait(person);
}

function update_display(){
    $("#myimage").attr("src", link);
    $("#quote").text(refrain);
    
    console.log(pos.x * 100 + "%");
    console.log(pos.y * 100 + "%");
    
    $("#quote").css("top", pos.y * 100 + "%");
    $("#quote").css("left", pos.x * 100 + "%");
}