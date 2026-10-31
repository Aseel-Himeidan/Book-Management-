function validateForm(){
    var title= document.getElementById ("title").value;
    var author= document.getElementById ("author").value;
    var year= document.getElementById ("year").value;
    var genre= document.getElementById ("genre").value;

    if(title==""){
        alert("Book title is required.")
        return false;
    }
    if(author==""){
        alert("Book author is required.")
        return false;
    }
    if(year==""){
        alert("Publication year is required.")
        return false;
    } else if( year>2026 || year<1){
        alert("Enter a valid publication year")
        return false;
    }
    if(genre==""){
        alert("Book genre is required.")
        return false;
    }
    return true;
}

//function to display data from local storage 
    function showData(){
        var booklist;
        if(localStorage.getItem("booklist")==null){
            //Defining the object 
            booklist= [
                { "title": "The Productive Muslim", "author": "Mohammed Faris","genre": "Islamic Lifestyle", "year": "2016" },
            
                { "title": "We Hunt the Flame", "author": "Hafsah Faizal", "genre": "High Fantasy", "year": "2019" },
            
                { "title": "We Free the Stars", "author": "Hafsah Faizal", "genre": "Fantasy Fiction" , "year": "2021"}, 
            
                { "title": "Show Up","author": "Na'ima B. Robert", "genre": "Self-Help", "year": "2021" },
            
                { "title": "Digital Minimalisim", "author": "Cal Newport", "genre": "Self-Help", "year": "2019" },
            
                { "title": "Lord of The Rings", "author": "John Ronals Reuel Tolkien","genre": "High Fantasy", "year": "1954" },
            
                { "title": "The Green Mile", "author": "Stephen King","genre": "Horror Fiction" , "year": "1996" },
            
                { "title": "The Famous Five Five on a Treasure Island", "author": "Enid Blyton", "genre": "Mystery","year": "1942" },
            
                { "title": "Al-Mukhtasar fi Tafseer al-Qur'an al-Karim", "author": "Tafsir Center for Qur'anic Studies", "genre": "Qur'anic Exegesis/ Tafsir", "year": "2015" }
            ];
            //saving objects to the table
            localStorage.setItem("booklist", JSON.stringify(booklist));
        }
        else{
            booklist= JSON.parse(localStorage.getItem("booklist"));
        }
    
    var html= "";

        booklist.forEach(function(element, index){
            html += "<tr>";
            html += "<td>" + element.title + "</td>";
            html += "<td>" + element.author + "</td>";
            html += "<td>" + element.genre + "</td>";
            html += "<td>" + element.year + "</td>";
            html += 
            '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button>' +
            '<button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>'; 
            html += "</tr>"; 

        });

    document.querySelector("#crudTable tbody").innerHTML = html
}

//loads alls data from local storage when page is loaded or reloaded
window.onload = function() {
    showData();
};

//function to add data to local storage
function AddData(){
    //if the form's inputs have been correctly validated and accepted
    if(validateForm()==true){
        var title= document.getElementById("title").value;
        var author= document.getElementById("author").value;
        var year= document.getElementById("year").value;
        var genre= document.getElementById("genre").value;

        var booklist;
        if(localStorage.getItem("booklist")==null){
            booklist= [];
        }
        else{
            booklist= JSON.parse(localStorage.getItem("booklist"))
        }
        booklist.push({
            title: title,
            author: author,
            year: year,
            genre: genre,
        })

        localStorage.setItem("booklist", JSON.stringify (booklist));
        showData();
        document.getElementById("title").value ="";
        document.getElementById("author").value ="";
        document.getElementById("year").value ="";
        document.getElementById("genre").value ="";
    }
}

//function to delete data from local storage 
function deleteData(index){
    var booklist;
        if (localStorage.getItem("booklist") == null) {
            booklist = [];
        } else {
            booklist = JSON.parse(localStorage.getItem("booklist"));
        }

    booklist.splice(index, 1);
    localStorage.setItem("booklist", JSON.stringify (booklist));
    showData();
}

//function to update/edit data on local storage 
//when user clicks on the Edit button, the submit button is hidden and the update button is shown
function updateData(index ){

    document.getElementById("Submit").style.display="none";
    document.getElementById("Update").style.display="block";

    var booklist;
        if (localStorage.getItem("booklist") == null) {
            booklist = [];
        } else {
            booklist = JSON.parse(localStorage.getItem("booklist"));
        }

    document.getElementById("title").value= booklist [index].title;
    document.getElementById("author").value= booklist [index].author;
    document.getElementById("year").value= booklist [index].year;
    document.getElementById("genre").value= booklist [index].genre;

    document.querySelector("#Update").onclick = function (){
        if(validateForm()==true){
            booklist[index].title=document.getElementById ("title").value;
            booklist[index].author=document.getElementById ("author").value;
            booklist[index].year=document.getElementById ("year").value;
            booklist[index].genre=document.getElementById ("genre").value;

            localStorage.setItem ("booklist", JSON.stringify (booklist));

            showData();

            document.getElementById("title").value ="";
            document.getElementById("author").value ="";
            document.getElementById("year").value ="";
            document.getElementById("genre").value ="";

            document.getElementById("Submit").style.display="block";
            document.getElementById("Update").style.display="none";
        }
    }
}