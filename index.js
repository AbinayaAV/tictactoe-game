const cells=document.querySelectorAll(".cell")
const statustext=document.querySelector("#statustext")
const restartbutton=document.querySelector("#restartbutton")
const winconditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]]

let options=['','','','','','','','','']
let currentplayer="X"
let running=false

initializegame()
function initializegame(){
    cells.forEach(cell=>{
        cell.addEventListener("click",cellclicked)
     })
     restartbutton.addEventListener("click",restartgame)
     statustext.textContent=`${currentplayer}'s turn`
     running=true
}
function cellclicked(){
    const cellIndex=this.getAttribute("cellIndex")

    if (options[cellIndex]!=""||!running){
        return
    }
    updatecell(this,cellIndex)
    
    checkwinner()
}
function updatecell(cell,index){
    options[index]=currentplayer
    cell.textContent=currentplayer
}
function changeplayer(){
    currentplayer=currentplayer=="X"?"O":"X"
    statustext.textContent=`${currentplayer}'s turn`
}
function checkwinner(){
    let roundwon=false
//win conditions is a 2d array athula till 9 arrays varaku the loop continues;constion kurathu[0,1,2] ipdi arrays la irukura ella combo vu till the length of winconditions continues;options[condition[0]]=options[0];athathu condition oda first index oda value
    for(let i=0;i<winconditions.length;i++){
    const condition = winconditions[i]
    const cellA=options[condition[0]]
    const cellB=options[condition[1]]
    const cellC=options[condition[2]]
    if(cellA==""||cellB==""||cellC==""){
      continue  
    }
    if(cellA==cellB&&cellB==cellC){
        roundwon=true
        break
    }
 
}
    if (roundwon){
        statustext.textContent=`${currentplayer} wins!!`
        running=false
    }
    else if(!options.includes("")){
        statustext.textContent=`DRAW`
        running=false
    }
    else{
        changeplayer()
    }
}
function restartgame(){
    currentplayer="X"
    options=['','','','','','','','','']
    statustext.textContent=`${currentplayer}'s turn`
    cells.forEach(cell=>{
        cell.textContent=" "
        running=true
    })

}
