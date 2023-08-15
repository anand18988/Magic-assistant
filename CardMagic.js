
const cards = document.getElementById('cards')
const fpath = "images/";

var number, suit, k=0,m=0, st,first;
var big,small,steps,temp,lrg,mid,sml,found=0;
var onceclicked=true;
const cardArr = [], clickedItemArr=[], finalArranged=[], finalDisplay=[];


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
        //const img=document.createElement('img');
       // img.src=fpath+ fileName;
       // img.alt= number+'of'+suit;
       // cards.appendChild(img);
    }
}

const tempArr = cardArr.slice();
// shuffle the cards 
while(tempArr.length!=0){
    m = Math.floor(Math.random()*52);
 if(m<tempArr.length){
    const img=document.createElement('img');
    img.src=fpath+ tempArr[m]+'.png';
    img.alt= tempArr[m];
    //img.id=tempArr[m];
    img.addEventListener('click', imgClicked);
    cards.appendChild(img);
    tempArr.splice(m,1);
 }
}


//img.addEventListener('click', imgClicked);
//console.log(nodeList[6].id);

function imgClicked(){
    var alreadyPresent=false,index;
   // console.log(this.id);
    
    for(let pos=0;pos<clickedItemArr.length;pos++) {
        if(clickedItemArr[pos]===this){
            alreadyPresent = true;
            index=pos;
        }
    }
    if(!alreadyPresent){
        if(clickedItemArr.length<5){
        clickedItemArr.push(this);
        this.style.border = "10px solid yellow";
        }else{
            alert("5 card selected, remember all cards and press submit!!")
        }
    }else {
        this.style.border = "2px solid black";
        clickedItemArr.splice(index,1);
        
    }
    
}

function submitButtonClicked(){
    if(clickedItemArr.length===5){
        //alert("weldone!!")
       // console.log(clickedItemArr[2].alt);

        document.getElementById("heading").innerHTML="You choose these cards:"
        document.getElementById("cards").innerHTML="";
        document.getElementById("press").remove();

        // display 4 out of 5 selected cards
        for (let m=0; m<clickedItemArr.length; m++) 
        {
            const img=document.createElement('img');
            img.src=clickedItemArr[m].src;
            img.alt= clickedItemArr[m].alt;
            
            //console.log(img.alt);
            st = img.alt;
            suit= st.substring(st.length-1,st.length);
            first = st.substring(0,st.length-1);
            img.deno = parseInt(first);
            //console.log(first+" "+suit);
            
            if(suit==='c'){
                img.suitRank=1;
            }else if(suit==='d'){
                img.suitRank=2;
            }else if(suit==='h'){
                img.suitRank=3;
            }else if(suit==='s'){
                img.suitRank=4;
            }
            cards.appendChild(img);
            console.log(img.suitRank+" "+img.deno);
        }

        const nodeList = [].slice.call(document.querySelectorAll('img'));
        for (m=0;m<5 && found===0;m++){
            for(let n=m+1;n<5 && found===0;n++){
                if(nodeList[m].suitRank===nodeList[n].suitRank){
                    
                    big=nodeList[m].deno;
                    small=nodeList[n].deno;
                    finalArranged[0]=nodeList[n];
                    finalArranged[4]=nodeList[m];
                    
                    if(big<small){
                        finalArranged[0]=nodeList[m];
                        finalArranged[4]=nodeList[n];
                    }

                     steps=Math.abs(big-small);
                    if(steps<=6){
                        
                        nodeList.splice(m,1);
                        nodeList.splice(n-1,1);
                       found=1;
                      
                    } else if(big>small){
                        steps=13-big+small;
                        finalArranged[0]=nodeList[m];
                        finalArranged[4]=nodeList[n];
                        nodeList.splice(m,1);
                        nodeList.splice(n-1,1);
                       found=1;
                      } else if(big<small){
                         steps=13-small+big;
                         finalArranged[0]=nodeList[n];
                         finalArranged[4]=nodeList[m];
                         nodeList.splice(m,1);
                         nodeList.splice(n-1,1);
                         found=1;
                       }
                    

                }
            }
        }

        for(m=0;m<3;m++){
            for(n=m+1;n<3;n++){
                if(nodeList[n].deno<nodeList[m].deno){
                    temp=nodeList[m];
                    nodeList[m]=nodeList[n];
                    nodeList[n]=temp;
                }else if(nodeList[n].deno===nodeList[m].deno){
                     if(nodeList[n].suitRank<nodeList[m].suitRank){
                        temp=nodeList[m];
                        nodeList[m]=nodeList[n];
                        nodeList[n]=temp;

                     }
                }
            }
            
        }

        for(m=0;m<3;m++){
            finalArranged[m+1]=nodeList[m];
        }
        
       var s,m,l;
        switch(steps){
            case 1:
                s=1;
                m=2;
                l=3;
                break;
            case 2:
                s=1;
                m=3;
                l=2;
                break;
            case 3:
                s=2;
                m=1;
                l=3;
                break;
            case 4:
                s=2;
                m=3;
                l=1;
                break;
            case 5:
                s=3;
                m=1;
                l=2;
                break;
            case 6:
                s=3;
                m=2;
                l=1;
                break;    
        }
        
        finalDisplay[0]=finalArranged[0];
        finalDisplay[1]=finalArranged[s];
        finalDisplay[2]=finalArranged[m];
        finalDisplay[3]=finalArranged[l];
        finalDisplay[4]=finalArranged[4];

        for(i=0;i<5;i++){
            console.log(finalDisplay[i].src);
          }
          document.getElementById("cards").innerHTML="";

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
        
        var btn=document.createElement('button');
        var text = document.createTextNode("Click to see 5th card");
        btn.appendChild(text);
        btnGen.appendChild(btn);
        btn.addEventListener('click', btnClicked);

        function btnClicked(){
            if(onceclicked){
            const img=document.createElement('img');
              img.src=finalDisplay[4].src;
              img.alt= finalDisplay[4].alt;
              btnGen.appendChild(img);
              onceclicked=false;
            }
        }

    }else{
        alert("select 5 cards!!!");
    }
}