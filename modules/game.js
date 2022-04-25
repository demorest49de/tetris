import{tetrominoes} from "./tetrominoes"

export const game = {
    previouslyPressedKey: '',
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
        ['o', 'o', 'o', 'o', 'p', 'p', 'o', 'o', 'o', 'x'],
        ['o', 'o', 'o', 'o', 'p', 'p', 'o', 'o', 'x', 'x']
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
        } else {
            this.stopMove()
        }
    },

    checkBorder() {
        if (game.previouslyPressedKey === 'ArrowLeft' &&
            !this.checkOutPosition(this.activeTetrаmino.x, this.activeTetrаmino.y)) {
            this.activeTetrаmino.x += 1
        } else if (game.previouslyPressedKey === 'ArrowRight' &&
            !this.checkOutPosition(this.activeTetrаmino.x, this.activeTetrаmino.y)) {
            this.activeTetrаmino.x -= 1
        }
    },

    rotateTetromino() {
        /*todo сделать проверку для что бы фигура после ротации не попадала
        *  в другую фигуру и не вращалась после того как опустится */

        this.activeTetrаmino.rotationIndex =
            this.activeTetrаmino.rotationIndex < 3 ?
                this.activeTetrаmino.rotationIndex + 1 : 0
        this.activeTetrаmino.block =
            this.activeTetrаmino.rotation[this.activeTetrаmino.rotationIndex]
        this.checkBorder()
    },

    get viewArea() {
        // самый простой способ скопировать объект - черз JSON
        const area = JSON.parse(JSON.stringify(this.area))
        const {x, y, block: tetrаmino} = this.activeTetrаmino

        for (let i = 0; i < tetrаmino.length; i++) {
            const row = tetrаmino[i]
            for (let j = 0; j < row.length; j++) {
                if (row[j] !== 'o') {
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
                if (!this.area[y + i] ||
                    // фигура не уходит слева и справа за границы стакана
                    !this.area[y + i][x + j] ||
                    // фигура не проваливается в фигуру
                    this.area[y + i][x + j] !== 'o'
                ) {
                    return false
                }
            }
        }
        return true
    },

    stopMove() {
        const {x, y, block: tetrаmino} = this.activeTetrаmino

        for (let i = 0; i < tetrаmino.length; i++) {
            const row = tetrаmino[i]
            for (let j = 0; j < row.length; j++) {
                if (row[j] !== 'o') {
                    console.log('')
                    this.area[y + i][x + j] = tetrаmino[i][j]
                }
            }
        }
    }
}