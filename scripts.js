//Only support english genres at this stage
var genres = {
    "Country": 6,
    "Electronic": 7,
    "Holiday": 8,
    "Opera": 9,
    "Singer/Songwriter": 10,
    "Pop": 14,
    "Soul": 15,
    "Rap": 18,
    "Alternative": 20,
    "Rock": 21,
    "Christian": 22
};


random_song("Pop");

function random_song(genre){
    console.log(genres[genre]);
    $.ajax({
        url: "https://api.musixmatch.com/ws/1.1/track.search?" + 
             "format=jsonp" + 
             "&callback=callback" + 
             "&f_music_genre_id=" + genres[genre] +
             "&f_lyrics_language=en" +
             "&quorum_factor=1" + 
             "&apikey=d23874bb4f6bfa8022a7df0b9a229425", 
        dataType: "jsonp",
        success: function(data){
            console.log(data);
            var random_track = Math.floor(Math.random() * 10);
            var track = data.message.body.track_list[random_track].track;
            
            var track_name = track.track_name; 
            var artist = track.artist_name;
            var track_id = track.track_id;
            
            console.log(track_id + " " + track_name + " " + artist);
            get_lyrics(track_id);        
        }
    });
    console.log("done");
}

function get_lyrics(track_id){
    $.ajax({
        url: "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp" +
             "&callback=callback" +
             "&track_id=" + track_id +
             "&apikey=d23874bb4f6bfa8022a7df0b9a229425", 
        dataType: "jsonp",
        success: function(data){
            console.log("get lyrics");
            console.log(data);        
            
            var lyrics = (data.message.body.lyrics.lyrics_body).split("\n");
            //should remove copyright info
            lyrics.pop();
            lyrics.pop();
            lyrics.pop();
            
            console.log(lyrics);
            find_refrains(lyrics);
        }
    });
}

//might not work as effectively as desired realistically
//no multi line support at this point
function find_refrains(lyrics){
    //calculating frequency of each line of lyrics
    //might want additional selection parameters, such as exceeding average length
    //or around the middle of the song
    var counts = {};
    for (var i = 0; i < lyrics.length; i++) {
        var num = lyrics[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    
    var max = 0;
    var max_index = 0;
    var longest_index = 0;
    var longest_length = 0;
    for(var i = 0; i < lyrics.length; i++){
        if(counts[lyrics[i]] > max_index && lyrics[i] != ""){
            max = counts[lyrics[i]];
            max_index = i;
        }
        if(lyrics[i].length > longest_length){
            longest_index = i;
            longest_length = lyrics[i].length;
        }
    }
    console.log(max + " " + max_index);
    console.log(longest_length + " " + longest_index);
    
    var refrain;
    if(max == 1){
        refrain = lyrics[longest_index];
    }else{
        refrain = lyrics[max_index]; 
    }
    
    print_quote(refrain);
}