export class Controller {
    constructor(game, view) {
        this.game = game
        this.view = view
    }

    init(codeKey){
        window.addEventListener('keydown', event =>{
            if(event.code === codeKey){
                this.removePreview()
                this.view.init()
                this.start()
            }
        })
    }

    removePreview(){
        const parent = document.querySelector('.container')
        const child = document.querySelector('.preview')
        parent.removeChild(child)
    }

    start(){
        this.view.showArea(this.game.viewArea)

        setInterval(()=> {
            this.game.moveDown()
            this.view.showArea(this.game.viewArea)
        }, 1000)

        window.addEventListener('keydown', e => {
            const key = e.code

            switch (key) {
                case 'ArrowLeft':
                    this.game.moveLeft()
                    this.view.showArea(this.game.viewArea)
                    this.game.previouslyPressedKey = key
                    break

                case 'ArrowRight':
                    this.game.moveRight()
                    this.game.previouslyPressedKey = key
                    this.view.showArea(this.game.viewArea)
                    break

                case 'ArrowDown':
                    this.game.moveDown()
                    this.view.showArea(this.game.viewArea)
                    break

                case 'ArrowUp':
                    this.game.rotateTetromino()
                    this.view.showArea(this.game.viewArea)
                    break
            }
        })
    }
}