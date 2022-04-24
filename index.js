const _SIZEBLOCK = 30
// todo peremestit' v game
let previouslyPressedKey

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
        ],
        rotationIndex: 0,
        rotation: [
            [
                ['o', 'x', 'o'],
                ['o', 'x', 'o'],
                ['x', 'x', 'o'],
            ],
            [
                ['o', 'o', 'o'],
                ['x', 'x', 'x'],
                ['o', 'o', 'x'],
            ],
            [
                ['o', 'x', 'x'],
                ['o', 'x', 'o'],
                ['o', 'x', 'o'],
            ],
            [
                ['x', 'o', 'o'],
                ['x', 'x', 'x'],
                ['o', 'o', 'o'],
            ],
        ]
    },

    moveLeft() {
        if (this.checkOutPosition(this.activeTetrаmino.x - 1, this.activeTetrаmino.y)) {
            this.activeTetrаmino.x -= 1
        }
    },

    moveRight() {
        if (this.checkOutPosition(this.activeTetrаmino.x + 1, this.activeTetrаmino.y)) {
            this.activeTetrаmino.x += 1
        }
    },

    moveDown() {
        if (this.checkOutPosition(this.activeTetrаmino.x, this.activeTetrаmino.y + 1)) {
            this.activeTetrаmino.y += 1
        }else {
            this.stopMove()
        }
    },

    checkBorder(){
        if (previouslyPressedKey === 'ArrowLeft' &&
            !this.checkOutPosition(this.activeTetrаmino.x, this.activeTetrаmino.y)) {
            this.activeTetrаmino.x += 1
        }
        else if(previouslyPressedKey === 'ArrowRight' &&
            !this.checkOutPosition(this.activeTetrаmino.x, this.activeTetrаmino.y)){
            this.activeTetrаmino.x -= 1
        }
    },

    rotateTetromino() {
        // console.log(previouslyPressedKey)
        this.activeTetrаmino.rotationIndex =
            this.activeTetrаmino.rotationIndex < 3 ?
                this.activeTetrаmino.rotationIndex + 1 : 0
        this.activeTetrаmino.block =
            this.activeTetrаmino.rotation[this.activeTetrаmino.rotationIndex]
        this.checkBorder()
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

    checkOutPosition(x, y) {
        const tetromino = this.activeTetrаmino.block

        for (let i = 0; i < tetromino.length; i++) {
            for (let j = 0; j < tetromino[i].length; j++) {
                // фигура не проваливается в фигуру
                if (tetromino[i][j] === 'o') continue
                // фигура не проваливается в пол
                console.log('x + j', +(x + j))
                if (!this.area[y + i] ||
                    // фигура не уходит слева и справа за границы стакана
                    !this.area[y + i][x + j] ||
                    // фигура не проваливается в фигуру
                    this.area[y + i][x + j] === 'x'
                ) {
                    return false
                }
            }
        }
        return true
    },

    stopMove(){
        const {x,y,block: tetrаmino} = this.activeTetrаmino

        for (let i = 0; i < tetrаmino.length; i++) {
            const row = tetrаmino[i]
            for (let j = 0; j < row.length; j++) {
                if (row[j] === 'x') {
                    this.area[y + i][x + j] = tetrаmino[i][j]
                }
            }
        }
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
    context.clearRect(0, 0, canvas.width, canvas.height)
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
            previouslyPressedKey = key
            break

        case 'ArrowRight':
            game.moveRight()
            previouslyPressedKey = key
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
