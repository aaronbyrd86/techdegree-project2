/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const studentList = document.querySelector(".student-list").getElementsByTagName("li");
const pageItems = 10;
console.log(studentList);
/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
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
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks(list)
{
   const page = document.querySelector(".page");
   const div = document.createElement('div');
   const ul = document.createElement("ul");
   let numLi = Math.floor(list.length / pageItems);
   if((list.length / pageItems) % pageItems != 0 || list.length <= 10)
      numLi++;
   console.log(`create ${numLi} list items`)
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
         console.log(`you clicked on link ${links[i].textContent}`)

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

   pageHeader.appendChild(studentSearch);
}

function search(searchInput, names)
{
  let count = 0;
  const page = document.querySelector(".page");
  
  if(page.querySelector(".no-match") != null)
  {
      page.removeChild(page.querySelector(".no-match"));
  }

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

  if(count == 0)
  {
      //no results fount
      
      const message = document.createElement("p");

      message.innerHTML = "No matches were found";
      message.className = "no-match";
      page.appendChild(message);
  }
  
  const matches = document.querySelectorAll(".match");
  
  showPage(matches, 1);
  appendPageLinks(matches);
  
  console.log(`${count} names matched the query ${searchInput.value}`);
}

// Remember to delete the comments that came with this file, and replace them with your own code comments.
showPage(studentList, 1);
appendPageLinks(studentList);
appendSearchBar();


