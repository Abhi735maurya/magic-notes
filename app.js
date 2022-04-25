// if user add a note add in local storage
showNotes();
let addBtn = document.getElementById('AddBtn');
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById("addTxt");

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = " ";
    showNotes();
});
// function to set update elements in local storage
let updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener('click', function updateTxt() {

    let addTxtValue = document.getElementById("addTxt").value;
    notesObj.splice(editindex, 1, addTxtValue);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = " ";
    showNotes();


});
// function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = " ";
    notesObj.forEach(function (element, index) {
        html += ` <div class="noteCard card my-2 mx-4" style="width: 18rem;">
      <div class="card-body" >
          <h5 class="card-title">Note${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="editNote(this.id)" class="btn btn-primary ">Edit Note</button>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary mx-2">Delete Note</button>
      </div>
  </div>`
    });
    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;

    } else {
        notesElem.innerHTML = `Nothing to show !`;
    }

}
// function to delete note

function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
// function to edit note
function editNote(index) {

    document.getElementById("addTxt").value = notesObj[index];
    editindex = index;
}
// function for search element
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {

        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})
