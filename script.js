const addBtn = document.querySelector("#button");
const container = document.querySelector("#container");

const saveNotes = () =>{
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        }
    )
    if(data.length === 0){
        localStorage.removeItem("notes")
    }else{
   localStorage.setItem("notes", JSON.stringify(data))
    }
}

addBtn.addEventListener(
    "click"
    ,function() {
        AddNote()
    }
)




const AddNote = (text = " ") =>{
    const note = document.createElement("div");
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
            <i class="save fa-regular fa-floppy-disk"></i>
            <i class="trash fa-solid fa-trash"></i>
        </div>
        <textarea>${text}</textarea>
            `;

     note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove()
            saveNotes()
        }
    )

    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes()
        }
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes()
        }
    )
    container.appendChild(note);
    saveNotes()
}

(
    function(){
        const lsnotes = JSON.parse(localStorage.getItem("notes"));
        if(lsnotes === null ){
            AddNote()
        }else{
        lsnotes.forEach(
            (lsNote) =>{
               
              AddNote(lsNote)
            }
        )
    }
}
)()