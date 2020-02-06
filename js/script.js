/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


const studentList = document.querySelector(".student-list").getElementsByTagName("li");
const pageItems = 10;

/*** 
   the showPage function determines which list items will be shown on the page
   based on total number of items per page and the current page number
***/
function showPage(list, page)
{
   let startIndex = (page * pageItems) - pageItems;
   let endIndex = page * pageItems;

   for(let i = 0; i < list.length; i++)
   {
      if(i >= startIndex && i < endIndex)
      {
         list[i].style.display = "block";
      }
      else{
         list[i].style.display = "none";
      }
   }
}



/*** 
   appendPageLinks adds pagination links to the document
***/
function appendPageLinks(list)
{
   const page = document.querySelector(".page");
   const div = document.createElement('div');
   const ul = document.createElement("ul");
   let numLi = Math.floor(list.length / pageItems);
   if((list.length / pageItems) % pageItems != 0 || list.length <= 10)
      numLi++;
   
   div.className = "pagination";
   div.appendChild(ul);

   //append list items to div's ul
   for(let i = 0; i < numLi; i++)
   {
      let li = document.createElement('li');
      
      li.innerHTML = `<a href="#">${i + 1}</a>`;
      ul.appendChild(li);
   }

   const links = div.getElementsByTagName("a");
   
   ul.firstElementChild.className = "active";

   for(let i = 0; i < links.length; i++)
   {
      links[i].addEventListener("click", (event) => {

         //remove active class from all links
         for(let j = 0; j < links.length; j++)
         {
            links[j].classList.remove("active");
         }
         //add active class to clicked link
         event.target.className = "active";
         //call showPage()
         showPage(list, links[i].textContent);
      })
   }

   //if pagination links already exist remove them from the DOM
   if(page.querySelector(".pagination") != null)
   {
      page.removeChild(page.querySelector(".pagination"));
   }

   page.appendChild(div);
}

/** 
 *  appendSearchBar adds an input element and submit
 * button that allow the user to search for a given name
*/
function appendSearchBar()
{
   const pageHeader = document.getElementsByTagName("div")[1];
   const studentSearch = document.createElement("div");

   studentSearch.className = "student-search";
   studentSearch.innerHTML = `
      <input placeholder="Search for students...">
      <button>Search</button>
   `;
   const button = studentSearch.lastElementChild;
   const input = studentSearch.firstElementChild;

   //submit button event listener
   button.addEventListener("click", (event) => {
      event.preventDefault();
      search(input, studentList);
   });

   //input field event listener
   input.addEventListener("keyup", () => {
      search(input, studentList);
   });

   pageHeader.appendChild(studentSearch);
}

//the search fucntion searches through the list of names
//for a given name and modifies the display based on
//results of the search. if the search is empty
//shows the original list
function search(searchInput, names)
{
  let count = 0;
  const page = document.querySelector(".page");
  
  //remove no match message if it exists
  if(page.querySelector(".no-match") != null)
  {
      page.removeChild(page.querySelector(".no-match"));
  }

  //handle empty searchInput
  if(searchInput.value.length == 0)
  {
   showPage(studentList, 1);
   appendPageLinks(studentList);
   return;
  }

  //find matches and hide non matches
  for(let i = 0; i < names.length; i++)
  {
      let currentName = names[i].querySelector("h3").textContent; 
      names[i].classList.remove("match"); 
      
      if(searchInput.value.length != 0 && currentName.toLowerCase().includes(searchInput.value.toLowerCase()))
      {
         names[i].classList.add("match");
         count++;
      }

      if(names[i].classList.contains("match"))
      {
         names[i].style.display = "block";
      }
      else
      {
         names[i].style.display = "none";
      }
  }

  //message for no matches found
  if(count == 0)
  {   
      const message = document.createElement("p");

      message.innerHTML = "No matches were found";
      message.className = "no-match";
      page.appendChild(message);
  }
  
  const matches = document.querySelectorAll(".match");
  
  showPage(matches, 1);
  appendPageLinks(matches);
  
  console.log(`${count} names matched the query "${searchInput.value}"`);
}


// Remember to delete the comments that came with this file, and replace them with your own code comments.
showPage(studentList, 1);
appendPageLinks(studentList);
appendSearchBar();


