
const cards = document.getElementById('cards')// getting div as a container for images.
const fpath = "images/";//name of path that contains images.

var number, suit, k=0,m=0, st,first;
var big,small,steps,temp,lrg,mid,sml,found=0;
var onceclickedFrCard=true, onceclickedFrHint=true;
var s,m,l, arrangementOrder;
const cardArr = [], clickedItemArr=[], finalArranged=[], finalDisplay=[];

//for generating file names and storing in an array.
for (let i=1;i<=4;i++){
    for(let j=1;j<=13;j++){
        if (i===1){
            suit= 'c';
        }else if(i===2){
            suit= 'd';
        }else if(i===3){
            suit= 'h';
        }else if(i===4){
            suit= 's';
        }
        number= j;
        const fileName= j+suit;
        cardArr[k]=fileName;
        k++;
       
    }
}
// creating temperoray array and inserting all file name into it.
const tempArr = cardArr.slice();
// shuffle the cards on refresh.
while(tempArr.length!=0){
    m = Math.floor(Math.random()*52);
 if(m<tempArr.length){
    const img=document.createElement('img');
    img.src=fpath+ tempArr[m]+'.png';
    img.alt= tempArr[m];
    img.addEventListener('click', imgClicked);// event listner added on image to select the image.
    cards.appendChild(img);
    tempArr.splice(m,1);// removing the cell once the image is displayed.
 }
}

// when image is clicked below function is called to creat new array of clicked images.
function imgClicked(){
    var alreadyPresent=false,index;
    
    //checks the clicked item is already present in the array
    for(let pos=0;pos<clickedItemArr.length;pos++) {
        if(clickedItemArr[pos]===this){
            alreadyPresent = true;
            index=pos;
        }
    }
    // if clicked image is not already present in array then it is pushed in the array 
    if(!alreadyPresent){
        if(clickedItemArr.length<5){
        clickedItemArr.push(this);
        this.style.border = "10px solid yellow";// changing the border color of selected image.
        }else{
            alert("5 card selected, remember all cards and press submit!!")
        }
    }else {// if already present in array then it will be de-selected and removed from array 
        this.style.border = "2px solid black";
        clickedItemArr.splice(index,1);
        
    }
    
}

// when submit button is clicked this function is called.
function submitButtonClicked(){
    if(clickedItemArr.length===5){// when all 5 cards are selected then only below action will happen.
       

        document.getElementById("heading").innerHTML="You choose these cards:"// heading will be changed.
        document.getElementById("cards").innerHTML="";// all previous images will be removed.
        document.getElementById("press").remove();// button will be removed.

        // display 5 selected cards
        const ndList=[];
        for (let m=0; m<clickedItemArr.length; m++) 
        {
            const img=document.createElement('img');
            img.src=clickedItemArr[m].src;
            img.alt= clickedItemArr[m].alt;
            
            //breaking file name into two parts - suit and denomination. for ranking purpose.
            st = img.alt;
            suit= st.substring(st.length-1,st.length);
            first = st.substring(0,st.length-1);
            img.deno = parseInt(first);
            //changing suit name into numbers for ranking.
            if(suit==='c'){
                img.suitRank=1;
            }else if(suit==='d'){
                img.suitRank=2;
            }else if(suit==='h'){
                img.suitRank=3;
            }else if(suit==='s'){
                img.suitRank=4;
            }
            ndList.push(img);//stored in new array.
            
        }
      
        
        // finding 2 cards of equal suit. A checking how many steps is difference between these cards, and storing in finalArranged array 0th and 4th cell in order.Then removing these 2 cards from nodlist array.
        for (m=0;m<5 && found===0;m++){
            for(let n=m+1;n<5 && found===0;n++){
                if(ndList[m].suitRank===ndList[n].suitRank){
                    
                    big=ndList[m].deno;
                    small=ndList[n].deno;
                    finalArranged[0]=ndList[n];
                    finalArranged[4]=ndList[m];
                    
                    if(big<small){
                        finalArranged[0]=ndList[m];
                        finalArranged[4]=ndList[n];
                    }

                     steps=Math.abs(big-small);
                    if(steps<=6){
                        
                        ndList.splice(m,1);
                        ndList.splice(n-1,1);
                       found=1;
                      
                    } else if(big>small){
                        steps=13-big+small;
                        finalArranged[0]=ndList[m];
                        finalArranged[4]=ndList[n];
                        ndList.splice(m,1);
                        ndList.splice(n-1,1);
                       found=1;
                      } else if(big<small){
                         steps=13-small+big;
                         finalArranged[0]=ndList[n];
                         finalArranged[4]=ndList[m];
                         ndList.splice(m,1);
                         ndList.splice(n-1,1);
                         found=1;
                       }
                    

                }
            }
        }
        
        // arranging remaining cards in ndList in assending order
        for(m=0;m<3;m++){
            for(n=m+1;n<3;n++){
                if(ndList[n].deno<ndList[m].deno){
                    temp=ndList[m];
                    ndList[m]=ndList[n];
                    ndList[n]=temp;
                }else if(ndList[n].deno===ndList[m].deno){
                     if(ndList[n].suitRank<ndList[m].suitRank){
                        temp=ndList[m];
                        ndList[m]=ndList[n];
                        ndList[n]=temp;

                     }
                }
            }
            
        }
        // storing remaining cards arranged in assending order, in cell 1,2,3 of the finalArranged array.
        for(m=0;m<3;m++){
            finalArranged[m+1]=ndList[m];
        }
       
        // according to the step difference(1-6) s,m,l will be assigned cell number.
       
        switch(steps){
            case 1:
                s=1;
                m=2;
                l=3;
                arrangementOrder="small, medium, large"
                break;
            case 2:
                s=1;
                m=3;
                l=2;
                arrangementOrder="small, large, medium"
                break;
            case 3:
                s=2;
                m=1;
                l=3;
                arrangementOrder="medium, small, large"
                break;
            case 4:
                s=2;
                m=3;
                l=1;
                arrangementOrder="medium, large, small"
                break;
            case 5:
                s=3;
                m=1;
                l=2;
                arrangementOrder="large, small, medium"
                break;
            case 6:
                s=3;
                m=2;
                l=1;
                arrangementOrder="large, medium, small"
                break;    
        }
        
        // making final array which will be displayed in desired arrangement.
        finalDisplay[0]=finalArranged[0];
        finalDisplay[1]=finalArranged[s];
        finalDisplay[2]=finalArranged[m];
        finalDisplay[3]=finalArranged[l];
        finalDisplay[4]=finalArranged[4];

        for(i=0;i<5;i++){
            console.log(finalDisplay[i].src);
          }
         
          // displaying 4 cards in required arrangement
          for (let i=0; i<finalDisplay.length-1; i++) 
          {
              const img=document.createElement('img');
              img.src=finalDisplay[i].src;
              img.alt= finalDisplay[i].alt;
              cards.appendChild(img);
              
          }

        //new h1 tag
        const h1= document.createElement("H1");
        const textNode = document.createTextNode("And the remaining card is....");
        h1.appendChild(textNode);
        headGen.appendChild(h1);

        //button to generate hint for 5th card
        var butn=document.createElement('button');
        var txt = document.createTextNode("click to see hint");
        butn.appendChild(txt);
        hintBtn.appendChild(butn);
        butn.addEventListener('click', hintBtnClicked);

        function hintBtnClicked(){
            if(onceclickedFrHint){  //generating image of 5th card only once.
            //generating hint here
            const p= document.createElement("p");
            let strng ="-> 5th card and 1st is of same suit.<br>-> And 5th card will be "+ steps+" steps ahead of 1st card.<br>-> Arrangement of 2nd 3rd 4th card is in ("+arrangementOrder+") order which means "+ steps+" steps ahead<br><b><--------Order of 2nd,3rd and 4th card and their 'steps-value' representation-----------></b><br>->small, medium, large=1 <br>-> small, large, medium=2 <br>-> medium, small, large=3 <br>-> medium, large, small=4 <br>-> large, small, medium=5 <br>-> large, medium, small= 6"
            p.innerHTML=strng;
            hint.appendChild(p);      
            onceclickedFrHint=false;
            }
        }


        //generating button to display 5th card when clicked.
        var btn=document.createElement('button');
        var text = document.createTextNode("Click to see 5th card");
        btn.appendChild(text);
        btnGen.appendChild(btn);
        btn.addEventListener('click', btnClicked);

        function btnClicked(){
            if(onceclickedFrCard){  //generating image of 5th card only once.
            const img=document.createElement('img');
              img.src=finalDisplay[4].src;
              img.alt= finalDisplay[4].alt;
              btnGen.appendChild(img);
              onceclickedFrCard=false;
            }
        }

    }else{
        alert("select 5 cards!!!");
    }
}