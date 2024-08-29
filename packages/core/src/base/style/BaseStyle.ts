import { Theme, dt } from '@primeuix/styled';
import { minifyCSS, resolve } from '@primeuix/utils/object';
import { StyleOptions, useStyle } from '@primevue/core/usestyle';

type DTFunc = (target: string) => string | number;

const theme = ({ dt }: { dt: DTFunc }) => `
* {
    box-sizing: border-box;
}

/* Non vue overlay animations */
.p-connected-overlay {
    opacity: 0;
    transform: scaleY(0.8);
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-visible {
    opacity: 1;
    transform: scaleY(1);
}

.p-connected-overlay-hidden {
    opacity: 0;
    transform: scaleY(1);
    transition: opacity 0.1s linear;
}

/* Vue based overlay animations */
.p-connected-overlay-enter-from {
    opacity: 0;
    transform: scaleY(0.8);
}

.p-connected-overlay-leave-to {
    opacity: 0;
}

.p-connected-overlay-enter-active {
    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),
        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);
}

.p-connected-overlay-leave-active {
    transition: opacity 0.1s linear;
}

/* Toggleable Content */
.p-toggleable-content-enter-from,
.p-toggleable-content-leave-to {
    max-height: 0;
}

.p-toggleable-content-enter-to,
.p-toggleable-content-leave-from {
    max-height: 1000px;
}

.p-toggleable-content-leave-active {
    overflow: hidden;
    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);
}

.p-toggleable-content-enter-active {
    overflow: hidden;
    transition: max-height 1s ease-in-out;
}

.p-disabled,
.p-disabled * {
    cursor: default;
    pointer-events: none;
    user-select: none;
}

.p-disabled,
.p-component:disabled {
    opacity: ${dt('disabled.opacity')};
}

.pi {
    font-size: ${dt('icon.size')};
}

.p-icon {
    width: ${dt('icon.size')};
    height: ${dt('icon.size')};
}

.p-overlay-mask {
    background: ${dt('mask.background')};
    color: ${dt('mask.color')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-mask-enter {
    animation: p-overlay-mask-enter-animation ${dt('mask.transition.duration')} forwards;
}

.p-overlay-mask-leave {
    animation: p-overlay-mask-leave-animation ${dt('mask.transition.duration')} forwards;
}

@keyframes p-overlay-mask-enter-animation {
    from {
        background: transparent;
    }
    to {
        background: ${dt('mask.background')};
    }
}
@keyframes p-overlay-mask-leave-animation {
    from {
        background: ${dt('mask.background')};
    }
    to {
        background: transparent;
    }
}
`;

const css = ({ dt }: { dt: DTFunc }) => `
.p-hidden-accessible {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.p-hidden-accessible input,
.p-hidden-accessible select {
    transform: scale(0);
}

.p-overflow-hidden {
    overflow: hidden;
    padding-right: ${dt('scrollbar.width')};
}
`;

const classes = {};

const inlineStyles = {};

export default {
    name: 'base',
    css,
    theme,
    classes,
    inlineStyles,
    load(style: string | ((params?: any) => string | undefined), options: StyleOptions = {}, transform = (cs: string) => cs) {
        // @ts-expect-error - TODO: Figure out why this could be undefined
        const computedStyle = transform(resolve(style, { dt }));

        // @ts-expect-error - TODO: Figure out why this could be undefined
        return computedStyle ? useStyle(minifyCSS(computedStyle), { name: this.name, ...options }) : {};
    },
    loadCSS(options: StyleOptions = {}) {
        return this.load(this.css, options);
    },
    loadTheme(options: StyleOptions = {}) {
        return this.load(this.theme, options, (computedStyle) => Theme.transformCSS(options.name || this.name, computedStyle));
    },
    getCommonTheme(params: any) {
        return Theme.getCommon(this.name, params);
    },
    getComponentTheme(params: any) {
        return Theme.getComponent(this.name, params);
    },
    getDirectiveTheme(params: any) {
        return Theme.getDirective(this.name, params);
    },
    getPresetTheme(preset: any, selector: string, params: any) {
        return Theme.getCustomPreset(this.name, preset, selector, params);
    },
    getLayerOrderThemeCSS() {
        return Theme.getLayerOrderCSS(this.name);
    },
    getStyleSheet(extendedCSS = '', props = {}) {
        if (this.css) {
            const _css = resolve(this.css, { dt });
            const _style = minifyCSS(`${_css}${extendedCSS}`);
            const _props = Object.entries(props)
                //! This might work better as a reduce
                .map(([k, v]) => `${k}="${v}"`)
                .join(' ');
            // .reduce((acc, [k, v]) => acc.push(`${k}="${v}"`) && acc, [])
            // .join(' ');

            return `<style type="text/css" data-primevue-style-id="${this.name}" ${_props}>${_style}</style>`;
        }

        return '';
    },
    getCommonThemeStyleSheet(params: any, props = {}) {
        return Theme.getCommonStyleSheet(this.name, params, props);
    },
    getThemeStyleSheet(params: any, props = {}) {
        let css = [Theme.getStyleSheet(this.name, params, props)];

        if (this.theme) {
            const name = this.name === 'base' ? 'global-style' : `${this.name}-style`;
            const _css = resolve(this.theme, { dt });
            const _style = minifyCSS(Theme.transformCSS(name, _css));
            const _props = Object.entries(props)
                //! This might work better as a reduce
                .map(([k, v]) => `${k}="${v}"`)
                .join(' ');
            // .reduce((acc, [k, v]) => acc.push(`${k}="${v}"`) && acc, [])
            // .join(' ');

            css.push(`<style type="text/css" data-primevue-style-id="${name}" ${_props}>${_style}</style>`);
        }

        return css.join('');
    },
    extend(style: {}) {
        return { ...this, css: undefined, theme: undefined, ...style };
    }
};
