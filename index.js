import {Game} from "./modules/game.js"
import {View} from "./modules/view.js"
import {Controller} from "./modules/controller.js"

export const _SIZEBLOCK = 30
export const _COLUMNS = 10
export const _ROWS = 20

const game = new Game()
const view = new View(document.querySelector('.container'))
const controller = new Controller(game, view)

controller.init('Enter')