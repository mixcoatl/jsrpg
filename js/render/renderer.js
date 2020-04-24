import Camera from './camera.js';
import Renderable from './renderable.js';
export default class Renderer {
    /**
     * Constructs a new {@link Renderer}.
     * @param {CanvasRenderingContext2D} context the rendering context
     */
    constructor(context) {
        console.assert(context != null, 'context is null');
        console.assert(context instanceof CanvasRenderingContext2D, 'context is not CanvasRenderingContext2D');
        this.camera = new Camera(context);
        this.context = context;
        this.lastRender = window.performance.now();
        this.pendingAdditions = new Array();
        this.pendingRemovals = new Array();
        this.renderables = new Array();
        this.requestId = window.requestAnimationFrame(this.callback.bind(this));
    }

    /**
     * Called by {@link Window#requestAnimationFrame()}.
     * @param {DOMHighResTimeStamp} timestamp a timestamp that indicates
     *      when this callback began to fire
     */
    callback(timestamp) {
        // How much time has passed since last update().
        this.update(timestamp - this.lastRender);
        this.render();
        this.lastRender = timestamp;
        this.requestId = window.requestAnimationFrame(this.callback.bind(this));
    }

    /**
     * Clears the rendering context.
     */
    clear() {
        if (this.context) {
            this.context.save();
            this.context.fillStyle = '#777';
            this.context.fillRect(
                /* Rect X */        -this.camera.getPositionX(),
                /* Rect Y */        -this.camera.getPositionY(),
                /* Rect Width */    this.context.canvas.width,
                /* Rect Height */   this.context.canvas.height);
            this.context.restore();
        }
    }

    /**
     * Clears {@link Renderable} objects.
     */
    clearRenderables() {
        this.renderables = new Array();
    }

    /**
     * Destroys this {@link Renderer}.
     */
    destroy() {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = 0;
        }
        if (this.camera) {
            this.camera.destroy();
            this.camera = null;
        }
        if (this.context) {
            this.context = null;
        }
    }

    /**
     * Returns the {@link Camera}.
     * @return {Camera} the {@link Camera}
     */
    getCamera() {
        return this.camera;
    }

    /**
     * Returns the {@link Renderable} objects.
     * @return {Array} an {@link Array} of {@link Renderable} objects
     */
    getRenderables() {
        return this.renderables;
    }

    /**
     * Inserts a {@link Renderable} object.
     * @param {Renderable} renderable the {@link Renderable} object to insert
     */
    pushRenderable(renderable) {
        if (renderable instanceof Renderable)
            this.pendingAdditions.push(renderable);
    }

    /**
     * Removes a {@link Renderable} object.
     * @param {Renderable} renderable the {@link Renderable} object to remove
     */
    removeRenderable(renderable) {
        if (renderable instanceof Renderable)
            this.pendingRemovals.push(renderable);
    }

    /**
     * Renders this {@link Renderer}.
     */ 
    render() {
        if (this.context) {
            this.clear();
            for (var renderable of this.renderables) {
                renderable.render(this.context);
            }
        }
    }

    /**
     * Returns a string representing this object.
     * @return {String} a string representation of this object
     */
    toString() {
        return 'Renderer { ' +
               'Camera=' + this.camera + ', ' +
               'Context=' + this.context + ', ' +
               'LastRender=' + this.lastRender + ', ' +
               'PendingAdditions=[' + this.pendingAdditions + '], ' +
               'PendingRemovals=[' + this.pendingRemovals + '], ' +
               'Renderables=[' + this.renderables + '], ' +
               'RequestId=' + this.requestId + ' }';
    }

    /**
     * Updates this {@link Renderer}.
     * @param {Number} delta the time since the last update
     */ 
    update(delta) {
        // Insert pending insertions.
        for (var renderable of this.pendingAdditions) {
            if (this.renderables.indexOf(renderable) < 0) {
                this.renderables.push(renderable);
            }
        }

        // Remove pending removals.
        for (var renderable of this.pendingRemovals) {
            var index;
            if ((index = this.renderables.indexOf(renderable)) != -1) {
                this.renderables.splice(index, 1);
            }
        }

        // Cleanup.
        this.pendingAdditions.length = 0;
        this.pendingRemovals.length = 0;

        // Update camera.
        if (this.camera)
            this.camera.update(delta);
                
        // Update renderable objects.
        for (var renderable of this.renderables) {
            renderable.update(delta);
        }
    }
};