import { EventBus } from '@primeuix/utils/eventbus';

/**
 * [Live Demo](https://www.primevue.org/terminal/)
 *
 * @module terminalservice
 *
 */
/**
 * Confirmation Service methods.
 *
 * @group Model
 *
 */
export interface TerminalServiceOptions {
    /**
     * Displays the terminal using the action options.
     */
    on(action: 'command' | 'response' | undefined, fn: any): void;
    /**
     * Emits the terminal using the action options.
     */
    emit(action: 'command' | 'response' | undefined, params?: any): void;
    /**
     * Closes the terminal using the action options.
     */
    off(action: 'command' | 'response' | undefined, fn: any): void;
}

export default EventBus() as TerminalServiceOptions;
