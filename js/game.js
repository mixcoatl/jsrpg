import Camera from './render/camera.js';
import Renderer from './render/renderer.js';
export default class Game {
    /**
     * Constructs a new {@link Game}.
     * @param {CanvasRenderingContext2D} context the rendering context
     */
    constructor(context) {
        console.assert(context != null, 'context is null');
        console.assert(context instanceof CanvasRenderingContext2D, 'context is not CanvasRenderingContext2D');
        this.context = context;
        this.renderer = new Renderer(context);
    }
};