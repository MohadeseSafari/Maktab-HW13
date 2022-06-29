const URL_API = "https://62ab6beda62365888bdc2f11.mockapi.io/Hw13";
let info = [];
let siteIdArray = [];
let projectIdArray = [];


//eventListener for call function when DOM loaded
document.addEventListener("DOMContentLoaded", readInformation());

//Call API
function readInformation() {
    fetch(`${URL_API}`)
        .then((res) => res.json())
        .then((data) => {
           // create array of SiteId & ProjectId & Target
            data.forEach((el) => {
                info.push({
                    SiteId: el.SiteId,
                    ProjectId: el.ProjectId,
                    Target: el.Target,
                });
            });
            
            //create array of SiteId and sort that
            info.forEach((obj) => {
                siteIdArray.push(obj.SiteId);
            });
            let sortSiteArray = [...new Set(siteIdArray)].sort();
          
            //create array of ProjectId and sort that
            info.forEach((obj) => {
                projectIdArray.push(obj.ProjectId);
            });
            let sortProjectArray = [...new Set(projectIdArray)].sort();
         
            //call create Table
            createTable(sortSiteArray, sortProjectArray);
        });
};



function createTable(sortSiteArray, sortProjectArray) {
    //Select Elements
    let projectIdTable = document.querySelector("#bodyTable");
    let thead = document.getElementById("headRow");
    let trHead = document.createElement("tr");
    thead.appendChild(trHead);

     //create Header row
    let siteArr = [`Site/Project`].concat(sortSiteArray);
    for (let i = 0; i <= siteArr.length - 1; i++) { //7 times
        let thHeaderRow = document.createElement("th");
        thHeaderRow.textContent = siteArr[i];
        trHead.appendChild(thHeaderRow);
    }
     // create Header column
    for (let i = 0; i < sortProjectArray.length; i++) { //3 times

        let tr = document.createElement("tr");
         tr.id = sortProjectArray[i];
         //set column in th tag
         tr.innerHTML =`<th>${sortProjectArray[i]}</th>`;

        // create td in tbody for set Target
        for (let j = 0; j < sortSiteArray.length; j++) { //7 times
            let td = document.createElement("td");
            tr.appendChild(td);
        // set class for select element and set Target on theme
            td.classList.add(`element${sortProjectArray[i]}-${sortSiteArray[j]}`)
        }

        projectIdTable.appendChild(tr);
    }
   callTarget(info);
   
};


function callTarget(info){
  info.forEach((obj) => {
            document.querySelector(`.element${obj.ProjectId}-${obj.SiteId}`).textContent = obj.Target;
        })
}










