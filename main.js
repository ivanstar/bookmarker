//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark)

//Save Bookmark
function saveBookmark(e){
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteURL = document.getElementById('siteUrl').value;
    
   if(!validateForm(siteName,siteURL)){
       return false;
   }

    var bookmark = {
        name: siteName,
        url: siteURL,
    }

    //Local storage 

    if(localStorage.getItem('bookmarks') === null){
        //Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Append to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else{
        //Get bookmarks from localStorage
        //JSON.parse back into obj bc getItem will return a string
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark to array
        bookmarks.push(bookmark);
        //Reset back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    //Clear form
    document.getElementById('myForm').reset();

    //Re-fetch bookmarks
    fetchBookmarks();

    //Prevent form from submitting
    e.preventDefault();
   
}
//Delete bookmark
function deleteBookmark(url){
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop thru booknmarks

    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }  
    //Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmarks();
}

 //Fetch bookmarks
 function fetchBookmarks(){
    //Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks)
    //Get output id
    var bookmarkResults = document.getElementById('bookmarkResults');
    //Build output
    bookmarkResults.innerHTML = '';

    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += '<div class="p-3 mb-1 bg-light rounded-1">'+
                                        '<h3>'+name+' '+
                                        '<a style="float:right" onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete </a>'+
                                        '<a style="" class="btn btn-success" target="_blank" href="'+url+'">Visit </a>'+
                                        '</h3>'+
                                        '</div>';
        
    }
}

function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
        alert('Please fill in the form');
        return false;
    }


    //Regulr Exprssion to format URL
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteURL.match(regex)){
        alert('Please use a valid URL. Ex: http://google.com');
        return false;
    }

    return true;
}