import {tetrominoes} from "./tetrominoes.js"
import {_ROWS, _COLUMNS} from "../index.js"

/*model*/
export class Game {
    previouslyPressedKey = ''
    area = [
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
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o'],
        ['o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o']
    ]

    activeTetrаmino = this.createTetromino()

    nextTetramino = this.createTetromino()


    createTetromino() {
        const keys = Object.keys(tetrominoes)
        const randomLetter = keys[Math.floor(Math.random() * keys.length)]
        const rotation = tetrominoes[randomLetter]
        const rotationIndex = Math.floor(Math.random() * rotation.length)
        const block = rotation[rotationIndex]
        return {
            block,
            rotationIndex,
            rotation,
            x: 3,
            y: 0,
        }
    }

    changeTetramino() {

        this.activeTetrаmino = this.nextTetramino

        this.nextTetramino = this.createTetromino()
    }

    moveLeft() {
        /*todo фигура "палка" уходит за пределы стакана если прижать к стене*/
        if (this.checkOutPosition(this.activeTetrаmino.x - 1, this.activeTetrаmino.y)) {
            this.activeTetrаmino.x -= 1
        }
    }

    moveRight() {
        /*todo фигура "палка" уходит за пределы стакана если прижать к стене*/
        if (this.checkOutPosition(this.activeTetrаmino.x + 1, this.activeTetrаmino.y)) {
            this.activeTetrаmino.x += 1
        }
    }

    moveDown() {
        if (this.checkOutPosition(this.activeTetrаmino.x, this.activeTetrаmino.y + 1)) {
            this.activeTetrаmino.y += 1
        } else {
            this.stopMove()
        }
    }

    checkBorder() {
        if (this.previouslyPressedKey === 'ArrowLeft' &&
            !this.checkOutPosition(this.activeTetrаmino.x, this.activeTetrаmino.y)) {
            this.activeTetrаmino.x += 1
        } else if (this.previouslyPressedKey === 'ArrowRight' &&
            !this.checkOutPosition(this.activeTetrаmino.x, this.activeTetrаmino.y)) {
            this.activeTetrаmino.x -= 1
        }
    }

    rotateTetromino() {
        /*todo сделать проверку для что бы фигура после ротации не попадала
        *  в другую фигуру и не вращалась после того как опустится */

        this.activeTetrаmino.rotationIndex =
            this.activeTetrаmino.rotationIndex < 3 ?
                this.activeTetrаmino.rotationIndex + 1 : 0
        this.activeTetrаmino.block =
            this.activeTetrаmino.rotation[this.activeTetrаmino.rotationIndex]
        this.checkBorder()
    }

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
    }

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
    }

    stopMove() {
        const {x, y, block: tetrаmino} = this.activeTetrаmino

        for (let i = 0; i < tetrаmino.length; i++) {
            const row = tetrаmino[i]
            for (let j = 0; j < row.length; j++) {
                if (row[j] !== 'o') {
                    this.area[y + i][x + j] = tetrаmino[i][j]
                }
            }
        }

        this.changeTetramino()
        this.clearRow()
    }

    clearRow() {
        /*строки для удаления*/
        const rows = []

        for (let i = _ROWS - 1; i >= 0; i--) {
            let countBlock = 0
            for (let j = 0; j < _COLUMNS; j++) {
                if(this.area[i][j] !== 'o'){
                    countBlock += 1
                }
            }
            if(!countBlock) break

            if(countBlock === _COLUMNS){
                rows.unshift(i)
            }
        }
        console.log(this.area)
        rows.forEach(i=>{
            console.log(i)
            this.area.splice(i, 1)
            this.area.splice(0,0, (Array(_COLUMNS).fill('o')))
            console.log(this.area)
        })
    }
}