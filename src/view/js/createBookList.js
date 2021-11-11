var table_body = document.querySelector("tbody");

function BookList () {
    this.createRow = function () {

        const init = {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        };
        
        url = 'localhost:3000/book';

        const request = new Request(url, init);
        
        fetch(request).then( response => {
            return response.json();
        })
        .then( data => {
        const { book_name } = data.name;
        const { author } = data.author;
        const { description } = data.description;
            
        var text_nome = document.createTextNode(book_name);
        var text_author = document.createTextNode(author);
        var text_description = document.createTextNode(description);

        var row = document.createElement("tr");
        var book_name_row = document.createElement("td");
        var author_row = document.createElement("td");
        var description_row = document.createElement("td");

            //campo.className = "class"

        book_name_row.appendChild(text_nome);
        author_row.appendChild(text_author);
        description_row.appendChild(text_description);
        row.appendChild(book_name_row);
        row.appendChild(author_row);
        row.appendChild(description_row);

            table_body.appendChild(row);
        })
        .then( data => {
        console.log(data);
        });
    }        
};


function addBookList(event) {
    book_list = new BookList();
    book_list.createRow();
}