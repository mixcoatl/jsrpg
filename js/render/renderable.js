export default class Renderable {
    /**
     * Destroys this {@link Renderable}.
     */
    destroy() {
        throw new Error('You must implement the destroy method.');
    }

    /**
     * Renders this {@link Renderable}.
     * @param {CanvasRenderingContext2D} context the rendering context
     */ 
    render(context) {
        throw new Error('You must implement the render method.');
    }

    /**
     * Returns a string representing this object.
     * @return {String} a string representation of this object
     */
    toString() {
        return 'Renderable { }';
    }

    /**
     * Updates this {@link Renderable}.
     * @param {Number} delta the time since the last update
     */ 
    update(delta) {
        throw new Error('You must implement the update method.');
    }
};