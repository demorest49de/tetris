import {Game} from "./modules/game.js"

const game = new Game()

game.createTetromino()

const _SIZEBLOCK = 30
export const _COLUMNS = 10
export const _ROWS = 20


// view
const container = document.querySelector('.container')

const colors = {
    2: 'FireBrick',
    J: 'CadetBlue',
    I: 'Gold',
    O: 'SlateBlue',
    L: 'RoyalBlue',
    T: 'Indigo',
    S: 'MediumSeaGreen',
}

const canvas = document.createElement('canvas')
canvas.classList.add('game-area')
container.append(canvas)

canvas.width = _SIZEBLOCK * _COLUMNS
canvas.height = _SIZEBLOCK * _ROWS

const context = canvas.getContext('2d')

const showArea = (area) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let y = 0; y < area.length; y++) {
        const line = area[y]

        for (let x = 0; x < line.length; x++) {
            const block = line[x]
            if (block !== 'o') {
                context.fillStyle = colors[block]
                context.strokeStyle = 'white'
                context.fillRect(x * _SIZEBLOCK,
                    y * _SIZEBLOCK,
                    _SIZEBLOCK,
                    _SIZEBLOCK)
                context.strokeRect(x * _SIZEBLOCK,
                    y * _SIZEBLOCK,
                    _SIZEBLOCK,
                    _SIZEBLOCK)
            }
        }
    }
}
let isEnterPressed = false
window.addEventListener('keyup', e => {
    if (e.code === 'Enter') {
        isEnterPressed = true
        window.removeEventListener('keyup', e)
    }
})

/* controller*/

// window - samiy glavniy object,
// tak kak document vhodit v window
window.addEventListener('keydown', e => {
    const key = e.code
    /*Напишите обработчик события по нажатию на Enter, чтобы начать игру
    Только после нажатия на Enter появляется игровое поле и можно двигать фигуры*/

    if (!isEnterPressed) {
        return
    }

    switch (key) {
        case 'ArrowLeft':
            game.moveLeft()
            showArea(game.viewArea)
            game.previouslyPressedKey = key
            break

        case 'ArrowRight':
            game.moveRight()
            game.previouslyPressedKey = key
            showArea(game.viewArea)
            break

        case 'ArrowDown':
            game.moveDown()
            showArea(game.viewArea)
            break

        case 'ArrowUp':
            game.rotateTetromino()
            showArea(game.viewArea)
            break
    }
})

showArea(game.viewArea)