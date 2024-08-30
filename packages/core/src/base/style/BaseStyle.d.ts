//! TO BE REMOVED

/**
 *
 * [Live Demo](https://primevue.org/)
 *
 * @module basestyle
 *
 */
import type { Style, StyleOptions } from '@primevue/core/usestyle';

export enum BaseClasses {}

export declare interface BaseStyle {
    name?: string;
    css?: string;
    classes?: object;
    inlineStyles?: object;
    load?: (style: string | ((params?: any) => string), options?: StyleOptions) => Style | object;
    getStyleSheet?: (extendedCSS?: string, props?: any) => string | undefined;
}
