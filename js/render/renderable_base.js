import Renderable from './renderable.js';
export default class RenderableBase extends Renderable {
    /**
     * Constructs a new {@link RenderableBase}.
     */
    constructor() {
        super();
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.positionX = 0;
        this.positionY = 0;
    }

    /**
     * Returns the anchor X coordinate.
     * @return {Number} the anchor X coordinate
     */
    getAnchorX() {
        return this.anchorX;
    }

    /**
     * Returns the anchor Y coordinate.
     * @return {Number} the anchor Y coordinate
     */
    getAnchorY() {
        return this.anchorY;
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
     * Sets the anchor coordinates.
     * @param {Number} anchorX the anchor X coordinate
     * @param {Number} anchorY the anchor Y coordinate
     */ 
    setAnchor(anchorX, anchorY) {
        this.anchorX = Math.max(Math.min(Number(anchorX), 1.0), 0.0);
        this.anchorY = Math.max(Math.min(Number(anchorY), 1.0), 0.0);
    }

    /**
     * Sets the anchor X coordinate.
     * @param {Number} anchorX the anchor X coordinate
     */ 
    setAnchorX(anchorX) {
        this.setAnchor(anchorX, this.setAnchorY);
    }

    /**
     * Sets the anchor Y coordinate.
     * @param {Number} anchorY the anchor Y coordinate
     */ 
    setAnchorY(anchorY) {
        this.setAnchor(this.anchorX, anchorY);
    }
    
    /**
     * Sets the position coordinates.
     * @param {Number} positionX the position X coordinate
     * @param {Number} positionY the position Y coordinate
     */ 
    setPosition(positionX, positionY) {
        this.positionX = Number(positionX);
        this.positionY = Number(positionY);
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
     * Returns a string representing this object.
     * @return {String} a string representation of this object
     */
    toString() {
        return 'RenderableBase { ' +
               'AnchorX=' + this.anchorX + ', ' +
               'AnchorY=' + this.anchorY + ', ' +
               'PositionX=' + this.positionX + ', ' +
               'PositionY=' + this.positionY + ' }';
    }
};