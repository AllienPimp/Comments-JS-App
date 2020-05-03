var sectionElement = document.querySelector(".comments");
var searchButton = document.querySelector(".search-button");
var searchBar = document.querySelector(".search input");
var dataFromDB = [];

fetch('https://jsonplaceholder.typicode.com/comments?_limit=20&fbclid=IwAR3iPkzSGNMK5p6M6_I6wfsb6UChKCH-YoMiD0Nf5rSQIRlJKhLexFzrzyA', {
        method: 'GET'
    })
    .then(function(resp) {
        // console.log(resp);
        return resp.json();
    })
    .then(function(data) {
        dataFromDB = data;
        // console.dir(data[0]);
        return data;

    })
    .then(function(eee) {
        executePage();
    })

function createArticle(id, title, body, author) {

    var articleElement = document.createElement("article");
    articleElement.setAttribute("id", id);

    var headerElement = document.createElement("header");
    articleElement.appendChild(headerElement);
    headerElement.innerHTML = title;

    var pElement = document.createElement("p");
    articleElement.appendChild(pElement);
    pElement.innerHTML = body;

    var footerElement = document.createElement("footer");
    articleElement.appendChild(footerElement);
    footerElement.innerHTML = author;

    var divElement = document.createElement("div");
    divElement.classList.add("like");
    articleElement.appendChild(divElement);

    var a = document.createElement("a");
    var linkText = document.createTextNode("Like!");
    a.appendChild(linkText);
    a.href = "#";
    divElement.appendChild(a);

    var deleteButton = document.createElement("button");
    articleElement.appendChild(deleteButton);
    deleteButton.innerText = "Delete comment";



    return articleElement;
}

function addDataOnPage() {
    for (var i = 0; i < dataFromDB.length; i++) {
        var newCreatedArticle = createArticle(dataFromDB[i].id, dataFromDB[i].name, dataFromDB[i].body, dataFromDB[i].email);
        sectionElement.appendChild(newCreatedArticle);
    }
}

function addNewComment(event) {
    event.preventDefault();
    var nextID = dataFromDB.length + 1;
    var inputTitle = document.querySelector(".input-comment input[name=title]").value;
    var inputComment = document.querySelector(".input-comment textarea[name=comment]").value;
    var inputName = document.querySelector(".input-comment input[name=author]").value;

    console.log(nextID);

    var newArticle = createArticle(nextID, inputTitle, inputComment, inputName);

    sectionElement.appendChild(newArticle);

    var newObject = {
        id: nextID,
        title: inputTitle,
        body: inputComment,
        author: inputName
    }

    dataFromDB.push(newObject);
    console.log(dataFromDB);

    var deleteCommentButton = document.querySelectorAll(".comments button");
    console.log(deleteCommentButton);
    for (var i = 0; i < deleteCommentButton.length; i++) {
        deleteCommentButton[i].addEventListener("click", deleteThisComment);

    }

}

function deleteThisComment() {
    // console.log(this);
    var articleToDelete = this.parentElement;
    // console.log(articleToDelete);
    articleToDelete.remove(this);

}

function displaySearch() {
    console.log(searchBar.value);
}

function clickOnLike(event) {
    event.preventDefault();
    var likedDiv = this.parentElement;
    var likedArticle = likedDiv.parentElement;
    var titleArticle = likedArticle.querySelector("header").innerHTML;
    console.log("You liked the article: " + titleArticle);
}

function executePage() {
    console.log("Page is loaded");

    addDataOnPage();

    var submitButton = document.querySelector(".input-comment button[type=submit]");
    submitButton.addEventListener("click", addNewComment);

    var reloadButton = document.querySelector(".reload");
    reloadButton.addEventListener("click", addDataOnPage);

    var deleteCommentButton = document.querySelectorAll(".comments button");
    for (var i = 0; i < deleteCommentButton.length; i++) {
        deleteCommentButton[i].addEventListener("click", deleteThisComment);
    }

    searchButton.addEventListener("click", displaySearch);
    searchBar.addEventListener("input", displaySearch);

    var likeButton = document.querySelectorAll(".like a");
    for (var i = 0; i < likeButton.length; i++) {
        likeButton[i].addEventListener("click", clickOnLike);
    }

}



// document.addEventListener("DOMContentLoaded", executePage);