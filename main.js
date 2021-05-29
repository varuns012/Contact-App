// Get the modal
var modal = document.getElementById("add_contact_modal");

// Get the button that opens the modal
var btn = document.getElementById("add_contact_Btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var selectedRow = null;
var saveindexContact = "";
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
insertNewRecord();

function onFormSubmit(e) {
  event.preventDefault();

  if (selectedRow === null) {
    readFormData();
    insertNewRecord();
  } else {
    updateRecord();
  }
  resetForm();
}

function readFormData() {
  var formData = {};
  formData["firstname"] = document.getElementById("firstname").value;
  formData["lastname"] = document.getElementById("lastname").value;
  formData["contactnumber"] = document.getElementById("contactnumber").value;

  itemsArray.push(formData);
  localStorage.setItem("items", JSON.stringify(itemsArray));

  modal.style.display = "none";

  return formData;
}

// Create operation
function insertNewRecord() {
  let localTable = localStorage.getItem("items");
  if (localTable == null) {
    itemsArray = [];
  } else {
    itemsArray = JSON.parse(localTable);
  }
  let html = "";
  let addtasklist = document.getElementById("contact-list");

    itemsArray.forEach((item, index) => {
    html += `
        <tr>
        <td>${item.firstname} ${item.lastname}</td>   
        <td>${item.contactnumber}</td>
        <td><i id="open_save_Modal" class="editModal fas fa-pencil-alt" onclick="editcontact(${index})"></i>
        
        <i id="open_delete_Modal" class="deleteModal delete far fa-trash-alt" onclick="onDelete(${index})"></i></td>
        </tr>
        `;
    })
    if(itemsArray <= 0) {
        html += `
        <tr>
        <td class="no_data">No Data</td>
        
        </tr>
        `;
    }
 
  addtasklist.innerHTML = html;
//   console.log(itemsArray.length)
}

// For Edit operation
function editcontact(index) {
  selectedRow = index;
  modal.style.display = "block";
  let localTable = localStorage.getItem("items");
  let contactobj = JSON.parse(localTable);
  document.getElementById("firstname").value = itemsArray[index].firstname;
  document.getElementById("lastname").value = itemsArray[index].lastname;
  document.getElementById("contactnumber").value = itemsArray[index].contactnumber;

  saveindexContact = itemsArray[index];
}

//To update the contact 
function updateRecord() {
  modal.style.display = "none";

  var formData = {};
  formData["firstname"] = document.getElementById("firstname").value;
  formData["lastname"] = document.getElementById("lastname").value;
  formData["contactnumber"] = document.getElementById("contactnumber").value;

  if (formData) {
    itemsArray.splice(itemsArray.indexOf(saveindexContact), 1, formData);
  }

  localStorage.setItem("items", JSON.stringify(itemsArray));

  insertNewRecord();
}

// To delete the data from table
function onDelete(index) {
  if (confirm("Are you sure you want to delete this contact?")) {
    itemsArray.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    insertNewRecord();
    resetForm();
  }
}

// To Reset the data of fill input
function resetForm() {
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("contactnumber").value = "";
  selectedRow = null;
}
