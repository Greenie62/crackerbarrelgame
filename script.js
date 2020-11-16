var gameArea = document.querySelector(".gamearea")
var scoreDOM = document.querySelector(".score")
var pegsDOM = document.querySelector(".pegsCount")

addEventListener("DOMContentLoaded",(e)=>{
    document.body.style.backgroundColor='lemonchiffon'
})


var triangleArr=[1,2,3,4,5];
var coords =[];
var indexArr =[];
var idx=0;
var score=0;
var totalPegs = 14
var messageDOM = document.querySelector(".message")

scoreDOM.innerHTML= score;
pegsDOM.innerHTML=totalPegs


let html=""
triangleArr.forEach(num=>{
    let x=num;
    for(let i=0;i<num;i++){
        let y = i;
        coords.push({x,y})
        if(num == 4 && i === 1){
            html += `<div id=${idx} draggable=true class='empty hole slot'></div>`

        }
    else{
        html += `<div id=${idx} draggable=true class='peg hole slot'></div>`
    }
    indexArr.push(idx)
    idx++
    }
    html += "<br/>"
})

gameArea.innerHTML = html;
console.log(indexArr)


var pegs = document.querySelectorAll(".peg")
var slots = document.querySelectorAll(".slot")
var startIdx=0;
var endIdx=0;




slots.forEach((peg,idx)=>{
    peg.ondragstart=(e)=>dragStart(e,idx)
    peg.ondragend=dragEnd
    peg.ondragover=dragOver
    peg.ondragenter=dragEnter
    peg.ondragleave=dragLeave
    peg.ondrop=drop
})





function dragStart(e,idx){
    // e.preventDefault()
    if(!e.target.classList.contains('peg')){
        console.log("invalid move!")
        return;
    }

    console.log("FED IDX:  " + idx)
    console.log('dragStart')
    console.log(e.target)
    startIdx = e.target.id

    setTimeout(()=>{e.target.classList.remove('peg')
                    e.target.classList.add('empty')
});

}

function dragEnd(){
    // console.log('dragEnd')
}

function dragOver(e){
    e.preventDefault()
    // console.log('dragOver')
}

function dragEnter(e){
    e.preventDefault()
    // console.log('dragEnter')
}

function dragLeave(e){
    e.preventDefault()
    // console.log('dragleave')
}

function drop(e){
    console.log('drooop!!')
    // if(!e.target.classList.contains('empty')){
    //     console.log("invalid move!")
    //     return;
    // }
    endIdx = e.target.id;

    checkMove(startIdx,endIdx)

    startIdx=0;
    endIdx=0
}


var acceptableMoves=[
    {start:0, end:[3,5],pull:[1,2]},
    {start:1, end:[6,8],pull:[3,4]},
    {start:2, end:[7,9],pull:[4,5]},
    {start:3, end:[0,5,12],pull:[1,4,7]},
    {start:4, end:[11,13],pull:[7,8]},
    {start:5, end:[0,3,12],pull:[2,4,8]},
    {start:6, end:[1,8],pull:[4,7]},
    {start:7, end:[2,9],pull:[4,8]},
    {start:8, end:[1,6],pull:[4,7]},
    {start:9, end:[2,7],pull:[5,8]},
    {start:10, end:[3,12],pull:[6,11]},
    {start:11, end:[4,13],pull:[7,12]},
    {start:12, end:[3,5,10,14],pull:[7,8,11,13]},
    {start:13, end:[4,11],pull:[8,12]},
    {start:14, end:[5,12],pull:[9,13]},
]


function checkMove(start,endNum){
    console.log("Start: " + start + " End: " + endNum)

    console.log(acceptableMoves[start].end)
    let pullIdx = acceptableMoves[start].end.indexOf(+endNum)

    if(pullIdx !== -1){
        console.log("its a good move")
        if(!slots[acceptableMoves[start].pull[pullIdx]].classList.contains("peg")){
            console.log("bad move, no peg to jump!")
            slots[startIdx].classList.add("empty")
            slots[startIdx].classList.add("peg")
            flashMessage("You can jump/move that way! :(")

        }
            else{
                slots[acceptableMoves[start].pull[pullIdx]].classList.remove("peg")
                slots[acceptableMoves[start].pull[pullIdx]].classList.add("empty")
                slots[acceptableMoves[start].pull[pullIdx]].id= acceptableMoves[start].pull[pullIdx]
                slots[endNum].classList.add('peg')
                score+=100;
                scoreDOM.innerHTML=score;
                totalPegs--;
                pegsDOM.innerHTML=totalPegs;
                var expressions = ['awesome!!', 'nice!!', 'ohh slick! 😎']
                flashMessage(expressions[Math.random() * expressions.length | 0])

            }
        }
   
    else{
        console.log("bad move, invalid jump logic!")
        slots[startIdx].classList.add("empty")
        slots[startIdx].classList.add("peg")
        flashMessage("You can jump/move that way! :(")

    }

   

  
}


function flashMessage(msg){

    messageDOM.innerHTML= msg;
    setTimeout(()=>{
        messageDOM.innerHTML = ""
    },2000)
}