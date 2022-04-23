const _SIZEBLOCK = 30


// mehanika

const game = {
    area: [
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'x'],
        ['o', 'o', 'o', 'o', 'x', 'x', 'o', 'o', 'o', 'x'],
        ['o', 'o', 'o', 'o', 'x', 'x', 'o', 'o', 'x', 'x']
    ],

    activeTetrаmino: {
        x: 4,
        y: 0,
        block: [
            ['o', 'x', 'o'],
            ['o', 'x', 'o'],
            ['x', 'x', 'o'],
        ]
    },

    moveLeft() {
        this.activeTetrаmino.x -= 1
    },

    moveRight() {
        this.activeTetrаmino.x += 1
    },

    moveDown() {
        this.activeTetrаmino.y += 1
    },

    rotateTetromino() {

    },

    get viewArea() {
        const area = JSON.parse(JSON.stringify(this.area))
        const {x, y, block: tetrаmino} = this.activeTetrаmino

        for (let i = 0; i < tetrаmino.length; i++) {
            const row = tetrаmino[i]
            for (let j = 0; j < row.length; j++) {
                if (row[j] === 'x') {
                    area[y + i][x + j] = tetrаmino[i][j]
                }
            }
        }
        return area
    },

    checkOutPosition(x,y){
        
    }
}

// otrisovka
const container = document.querySelector('.container')

const canvas = document.createElement('canvas')
canvas.classList.add('game-area')
container.append(canvas)

canvas.width = _SIZEBLOCK * 10
canvas.height = _SIZEBLOCK * 20

const context = canvas.getContext('2d')

const showArea = (area) => {
    context.clearRect(0,0,canvas.width, canvas.height)
    for (let y = 0; y < area.length; y++) {
        const line = area[y]

        for (let x = 0; x < line.length; x++) {
            const block = line[x]
            if (block === 'x') {
                context.fillStyle = 'cyan'
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

// window - samiy glavniy object
// tak kak document vhodit v window
window.addEventListener('keydown', e => {
    const key = e.code
    switch (key) {
        case 'ArrowLeft':
            game.moveLeft()
            showArea(game.viewArea)
            break

        case 'ArrowRight':
            game.moveRight()
            showArea(game.viewArea)
            break

        case 'ArrowDown':
            game.moveDown()
            showArea(game.viewArea)
            break

        case 'Space':
            game.rotateTetromino()
            showArea(game.viewArea)
            break
    }
})

showArea(game.viewArea)
