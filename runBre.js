
class FollowMouse {
    constructor(elem) {
        this.el = elem
        this.x = 10
        this.y = 0
        this.velX = 7
        this.velY = 7
        this.status = "running"
        const style = elem.style
        style.top = `${this.y}px`
        style.left = `${this.x}px`
        style.position = 'fixed'
        style['z-index'] = 99
        style['pointer-events'] = 'none'

        this.mouseX = 1000
        this.mouseY = 1000
        document.onmousemove = e => {
            runningBre.setMousePos(e.clientX, e.clientY)
        }
    }

    setMousePos(x, y) {
        this.mouseX = x
        this.mouseY = y
    }

    checkMouseCollision() {
        if (
            (Math.abs(this.x - this.mouseX + 20) < 10) && (Math.abs(this.y - this.mouseY + 20) < 10)
        ) {
            this.status = 'collided'
        } else {
            this.status = 'running'
        }
    }

    update() {
        if (this.x < this.mouseX - 20) {
            this.x += this.velX
            this.el.style.transform = 'scaleX(-1)'
        } else {
            this.x -= this.velX
            this.el.style.transform = 'scaleX(1)'
        }
        if (this.y < this.mouseY - 20) {
            this.y += this.velY
        } else {
            this.y -= this.velY
        }
        this.checkMouseCollision()
    }

    draw() {
        this.el.style.top = `${this.y}px`
        this.el.style.left = `${this.x}px`
    }

    followMouse() {
        this.interval = setInterval(() => {
            this.update()
            this.draw()
        }, 100)
    }
}

function main() {
    runningBre = document.querySelector('#bre-run')
    runningBre = new FollowMouse(runningBre)
    runningBre.followMouse()
}

main()
