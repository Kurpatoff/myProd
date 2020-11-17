const matrix = getMatrix(10,10)

console.log(matrix)

update()

function update(){
    const gameElement = matrixToHtml(matrix)
    const appElement = document.querySelector('#app')
    appElement.innerHTML=''
    appElement.append(gameElement)

    
}


document.addEventListener('keydown', function(event) {
    if (event.code == 'ArrowDown'||event.code == 'KeyS') {
      Down(matrix)
    }
    if (event.code == 'ArrowUp'||event.code == 'KeyW') {
       Up(matrix)
    }
    if (event.code == 'ArrowRight'||event.code == 'KeyD') {
            Right(matrix)
    }
    if (event.code == 'ArrowLeft'||event.code == 'KeyA') {
                Left(matrix)
    }
    if (event.code == 'Escape') {
        ResetMatrix(matrix)
    update()
} 
    
  });