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
   console.log(`showPage() called with a page value of ${page}`);
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
   if((list.length / pageItems) % pageItems != 0)
      numLi++;
   //console.log(`create ${numLi} list items`)
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
         //console.log(`you clicked on link ${links[i].textContent}`)

         //remove active class from all links
         for(let j = 0; i < links.length; j++)
         {
            links[i].className = "";
         }
         //add active class to clicked link
         event.target.className = "active";
         //call showPage()
         showPage(studentList, links[i].textContent);
      })
   }

   page.appendChild(div);
}




// Remember to delete the comments that came with this file, and replace them with your own code comments.
appendPageLinks(studentList);