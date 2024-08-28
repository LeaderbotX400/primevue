import { DynamicDialogInstance, DynamicDialogOptions } from 'primevue/dynamicdialogoptions/DynamicDialogOptions';
import { inject } from 'vue';

export const PrimeVueDialogSymbol = Symbol();

export function useDialog() {
    const PrimeVueDialog = inject<{
        open: (content: any, options?: DynamicDialogOptions) => DynamicDialogInstance;
    }>(PrimeVueDialogSymbol);

    if (!PrimeVueDialog) {
        throw new Error('No PrimeVue Dialog provided!');
    }

    return PrimeVueDialog;
}
