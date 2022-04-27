import {_SIZEBLOCK, _COLUMNS, _ROWS} from "../index.js"

export class View {
    constructor(container) {
        this.container = container
    }

    colors = {
        2: 'FireBrick',
        J: 'CadetBlue',
        I: 'Gold',
        O: 'SlateBlue',
        L: 'RoyalBlue',
        T: 'Indigo',
        S: 'MediumSeaGreen',
    }

    canvas = document.createElement('canvas')

    init() {

        this.canvas.classList.add('game-area')
        this.container.append(this.canvas)

        this.canvas.width = _SIZEBLOCK * _COLUMNS
        this.canvas.height = _SIZEBLOCK * _ROWS
    }


    context = this.canvas.getContext('2d')

    showArea(area) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        for (let y = 0; y < area.length; y++) {
            const line = area[y]

            for (let x = 0; x < line.length; x++) {
                const block = line[x]
                if (block !== 'o') {
                    this.context.fillStyle = this.colors[block]
                    this.context.strokeStyle = 'white'
                    this.context.fillRect(x * _SIZEBLOCK,
                        y * _SIZEBLOCK,
                        _SIZEBLOCK,
                        _SIZEBLOCK)
                    this.context.strokeRect(x * _SIZEBLOCK,
                        y * _SIZEBLOCK,
                        _SIZEBLOCK,
                        _SIZEBLOCK)
                }
            }
        }
    }
}