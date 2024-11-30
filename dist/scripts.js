/*
must run json dB
cd to the Portfolio_Project folder
in terminal run this:
json-server --watch db.json
to stop CTRL-C
*/
const toyurl = "http://localhost:3000/toys/"
const FULL_HEART = '♥'


// retrieve the toy images and send to Redtoyimg function
function gettoyimg(){
      fetch("http://localhost:3000/toys")
      
      .then (response => response.json())
      .then(json => Redtoyimg(json))//console.log(json)/*return(json)*/)
      
   
   
   
    };
/// from Json data create Dom elements and sort by descending order of likes.
function Redtoyimg(timg){
            const main = document.getElementById('toy-collection');
            //console.log(timg)
      ///// sort by descending order    
          timg.sort((a,b)=> b.likes-a.likes);  
             //console.log(timg);
                     
           timg.forEach(timgs => {
/////// Create DOM Elements     
        //DIV Tag
              const div  = document.createElement('div');
              div.setAttribute("class","card");
          main.appendChild(div);
        //H2 tag
              const h2 = document.createElement('h2');
            h2.setAttribute("name", timgs.name);
              h2.innerText = timgs.name;
              div.appendChild(h2);

        //IMG tag
              const img = document.createElement("img")
              img.setAttribute("src",timgs.image);
              img.setAttribute("class", "toy-avatar")
              div.appendChild(img);
              div.img
        //P Tag
              const P = document.createElement("P");
              P.innerText = "LIkes: " + timgs.likes;
              div.appendChild(P);
        //Like Button
              const lbutton = document.createElement("button");
              lbutton.setAttribute("class","like-btn");
              lbutton.setAttribute("id", timgs.id);
              lbutton.innerText = "Likes " + FULL_HEART;
              div.appendChild(lbutton);
            });
            
  
};

// gfetch the Likes with this function
    function getonetoy(turl){
      let toyID = turl.id;
    //console.log(turl);
      
      fetch(toyurl+toyID)
      
      .then (response => response.json())
      .then(json => updatelikes(json)); 
      
 

    };

 // Update Likes function
    function updatelikes(toylike){
        let toyID = toylike.id
        let toylikes = toylike.likes;
          
        //console.log(toyurl+toyID);
        
       fetch(toyurl+toyID,{
            method: "PATCH",
            headers:{
              "Content-Type": "application/json",
             // Accept: "application/json"
          },
            body: JSON.stringify({"likes": toylikes + 1})
           });   
          
    };

//  function to reset likes to zero
  function resetLikes(){
//console.log("reset likes");
    let reset_Likes ="";

// get Likes values
    fetch("http://localhost:3000/toys")
          
          .then (response => response.json())
          .then(json => getID(json));

//// Reset LIkes to zero
    function getID(IdValue){
    for(IdValues of IdValue){
     
 // set the toy id value for the fetch function
      let IdtoyId = IdValues.id;
     // console.log(IdValues.likes);

 //// update db.json with like values      
      fetch(toyurl+IdtoyId,{
        method: "PATCH",
        headers:{
          "Content-Type": "application/json",
         // Accept: "application/json"
        },
        body: JSON.stringify({"likes": IdValues.likes =0})
        }); 


    }

    }



    }


// reload images
      gettoyimg();

// parent element
const addlikes = document.getElementById ("toy-collection");

/// Likes button 
addlikes.addEventListener("click", function(e){getonetoy(e.target)});
