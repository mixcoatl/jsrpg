export default class Camera {
    /**
     * Constructs a new {@link Camera}.
     * @param {CanvasRenderingContext2D} context the rendering context
     */
    constructor(context) {
        console.assert(context != null, 'context is null');
        console.assert(context instanceof CanvasRenderingContext2D, 'context is not CanvasRenderingContext2D');
        this.context = context;
        this.context.save();
        this.setPosition(
            this.context.canvas.width / 2.0,
            this.context.canvas.height / 2.0);
        this.setSpeed(0.0, 0.0);
    }

    /**
     * Destroys this {@link Camera}.
     */
    destroy() {
        if (this.context) {
            this.context.restore();
            this.context = null;
        }
    }

    /**
     * Returns the position X coordinate.
     * @return {Number} the position X coordinate
     */
    getPositionX() {
        return this.positionX;
    }

    /**
     * Returns the position Y coordinate.
     * @return {Number} the position Y coordinate
     */ 
    getPositionY() {
        return this.positionY;
    }

    /**
     * Returns the speed X coordinate.
     * @return {Number} the speed X coordinate
     */
    getSpeedX() {
        return this.speedX;
    }

    /**
     * Returns the speed Y coordinate.
     * @return {Number} the speed Y coordinate
     */ 
    getSpeedY() {
        return this.speedY;
    }

    /**
     * Sets the position coordinates.
     * @param {Number} positionX the position X coordinate
     * @param {Number} positionY the position Y coordinate
     */ 
    setPosition(positionX, positionY) {
        this.positionX = Number(positionX);
        this.positionY = Number(positionY);
        this.context.setTransform(
            /* Horizontal scale */          1.0,
            /* Vertical skewing */          0.0,
            /* Horizontal skewing */        0.0,
            /* Vertical scale */            1.0,
            /* Horizontal translation */    this.positionX,
            /* Vertical translation */      this.positionY);
    }

    /**
     * Sets the position X coordinate.
     * @param {Number} positionX the position X coordinate
     */
    setPositionX(positionX) {
        this.setPosition(positionX, this.setPositionY);
    }

    /**
     * Sets the position Y coordinate.
     * @param {Number} positionY the position Y coordinate
     */ 
    setPositionY(positionY) {
        this.setPosition(this.positionX, positionY);
    }

    /**
     * Sets the speed coordinates.
     * @param {Number} speedX the speed X coordinate
     * @param {Number} speedY the speed Y coordinate
     */ 
    setSpeed(speedX, speedY) {
        this.speedX = Number(speedX);
        this.speedY = Number(speedY);
    }

    /**
     * Sets the speed X coordinate.
     * @param {Number} speedX the speed X coordinate
     */
    setSpeedX(speedX) {
        this.setSpeed(speedX, this.setSpeedY);
    }

    /**
     * Sets the speed Y coordinate.
     * @param {Number} speedY the speed Y coordinate
     */ 
    setSpeedY(speedY) {
        this.setSpeed(this.speedX, speedY);
    }

    /**
     * Returns a string representing this object.
     * @return {String} a string representation of this object
     */
    toString() {
        return 'Camera { ' +
               'Context=' + this.context + ', ' +
               'PositionX=' + this.positionX + ', ' +
               'PositionY=' + this.positionY + ', ' +
               'SpeedX=' + this.speedX + ', ' +
               'SpeedY=' + this.speedY + ' }';
    }

    /**
     * Updates this {@link Camera}.
     * @param {Number} delta the time since the last update
     */
    update(delta) {
        if (this.speedX || this.speedY) {
            this.setPosition(
                this.positionX + Number(delta) * this.speedX,
                this.positionY + Number(delta) * this.speedY);
        }
    }
}