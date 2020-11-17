
function getMatrix (column,rows){
    const matrix = []

    let idCounter = 1

    for (let y = 0 ; y < rows;y++){
        const row = []
     
        
         
        for (let x = 0 ; x < column;x++)
        {
            row.push({
                id: idCounter++,
                x:x,
                y:y,
                block:false,
                plused: false,
                level:0
            })
        }
        matrix.push(row)
    }

    for (let i = 0; i < 2;i++)
    {
        const cell = GetFreeSlots(matrix)
        cell.level = Math.floor(Math.random() * Math.floor(2)+1)
    }
    return matrix
}

function ResetMatrix(matrix){
    AfterMove(matrix)
    for(let y= 0 ; y < matrix.length;y++){
        for (let x = 0 ; x < matrix[y].length;x++){
            matrix[y][x].level = 0
        }
    }
    SetNewBlock(matrix)
    SetNewBlock(matrix)
    Points = 0
}
function GetFreeSlots(matrix){
    const FreeSlots= []

    for(let y= 0 ; y < matrix.length;y++){
        for (let x = 0 ; x < matrix[y].length;x++)
        {
           const cell = matrix[y][x]

           if (cell.level === 0){
               FreeSlots.push(cell)
           }
        }
    }

    
    const index = Math.floor(Math.random() * FreeSlots.length)
    return FreeSlots[index]
}
function GetNotFreeSlots(matrix){
    const FreeSlots= []

    for(let y= 0 ; y < matrix.length;y++){
        for (let x = 0 ; x < matrix[y].length;x++)
        {
           const cell = matrix[y][x]

           if (cell.level > 0 && cell.level <10){
               FreeSlots.push(cell)
           }
        }
    }

    
    const index = Math.floor(Math.random() * FreeSlots.length)
    return FreeSlots[index]

}
function SetRandomBox(matrix){
    const cell = GetFreeSlots(matrix)
    cell.level++
}

function GetCell(matrix,x,y){
    if (!matrix[y] || !matrix [y][x]){
        return false
    }

    return matrix[y][x]
}

function Plus(matrix,x1,y1,x2,y2){
    let first = GetCell(matrix,x1,y1)
    let second = GetCell(matrix,x2,y2)
    if (second&& second.level === first.level&& !second.plused && !first.plused){
        second.level+=1
        first.level = 0
        second.plused = true
        Points+=second.level
    }
}

function SetNewBlock(matrix)
{
    const cell = GetFreeSlots(matrix)
    cell.level = Math.floor(Math.random() * Math.floor(2)+1)
}

function StopBlock(matrix){
        const cell = GetNotFreeSlots(matrix)
    if (Math.floor(Math.random)*100 < 20){
        cell.block = true
        alert("Box {" + cell.x + " : " + cell.y + "} is blocked" )
    }
    
}

function AfterMove(matrix)
{
    SetNewBlock(matrix)
    for(let y= 0 ; y < matrix.length;y++){
        for (let x = 0 ; x < matrix[y].length;x++)
        {
           const cell = matrix[y][x]

           cell.plused = false
           }
        }
    }

 
let moved = false;
function Move(x,y,xm,ym,matrix){
    const startcell = GetCell(matrix,x,y)
    const endcell = GetCell(matrix,x+xm,y+ym)
    if (endcell && !startcell.block){
        if (endcell.level===0){
            endcell.level = startcell.level
            startcell.level = 0
            Move(x+xm,y+ym,xm,ym,matrix)
        }
        else{
            Plus(matrix,x,y,x+xm,y+ym)
            Move(x+xm,y+ym,xm,ym,matrix)
        }
    }
}

function Down(matrix){
    for(let y= matrix.length; y >=0;y--){
        for (let x =0 ; x < matrix.length;x++){
            Move(x,y,0,1,matrix)
        }

    }
    AfterMove(matrix)
    StopBlock(matrix)
    update()
}
function Right(matrix){
    for(let y= 0 ; y < matrix.length;y++){
        for (let x = matrix[y].length ; x >=0;x--){
            Move(x,y,1,0,matrix)
        }

    }
    AfterMove(matrix)
    update()
}
function Up(matrix){
    for(let y= 0 ; y < matrix.length;y++){
        for (let x = 0 ; x <matrix[y].length;x++){
            Move(x,y,0,-1,matrix)
        }

    }
    AfterMove(matrix)
    update()
}
function Left(matrix){
    for(let y= 0 ; y < matrix.length;y++){
        for (let x = 0; x < matrix[y].length;x++){
            Move(x,y,-1,0,matrix)
        }

    }
    AfterMove(matrix)
    update()
}
function matrixToHtml(matrix){
    const game_zone = document.createElement('div')//основной блок
   game_zone.classList.add('game_zone')

   const infoBlock = document.createElement('div')//блок с инфой
    infoBlock.classList.add('info')


   const scoreBlock = document.createElement('div')//блок с очками
    scoreBlock.classList.add('score')
    scoreBlock.textContent = 'Score = ' + Points
 
   
  const quetion_mark = document.createElement('img')
  quetion_mark.classList.add('quetion')
quetion_mark.src = "https://img.icons8.com/nolan/96/question-mark.png"
quetion_mark.title ="Управление : WASD or Arrows || Перезапуск игры : Escape"

const quetionBlock = document.createElement('div')
quetionBlock.append(quetion_mark)


const MyFace = document.createElement('img')
MyFace.classList.add('round')
MyFace.src = 'assets/images/MyFace.jpg'
const MyName = document.createElement('p')
MyName.textContent = "Дмитрий Буторин || Dr.Kurpatoff"
const myFaceBlock = document.createElement('div')
myFaceBlock.append(MyFace)
myFaceBlock.append(MyName)

    infoBlock.append(scoreBlock)
    infoBlock.append(quetionBlock)
    infoBlock.append(myFaceBlock)
    game_zone.append(infoBlock)


    const gameElement = document.createElement('div')//блок с игрой
    gameElement.classList.add('main')

    for (let y=  0 ; y < matrix.length;y++){
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')

        for(let x = 0 ; x < matrix[y].length;x++){
            const cell = matrix[y][x]
            const imgElement = document.createElement('img')   
            imgElement.draggable = false
            if (cell.block)
            imgElement.src = './assets/images/block.png'
            else
            imgElement.src = './assets/images/'+cell.level+'.png'
            rowElement.append(imgElement)
        }
        gameElement.append(rowElement)
    }
   
    game_zone.append(gameElement)


    const vk = document.createElement('a')
    vk.href = 'https://vk.com/kurpatof'
    const href = document.createElement('img')
    href.src = "https://img.icons8.com/nolan/256/vk-circled.png"
    vk.append(href)
    const  aBlock = document.createElement('div')
    aBlock.append(vk)

    game_zone.append(aBlock)

    return game_zone
}

let Points = 0
