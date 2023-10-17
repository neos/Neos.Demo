import manifest from '@neos-project/neos-ui-extensibility';
import CodeFormatting from './codePlugin';
import {IconButtonComponent} from "./IconButtonComponent";

const addPlugin = (Plugin, isEnabled) => (ckEditorConfiguration, options) => {
    // we duplicate editorOptions here so it would be possible to write something like `$get('formatting.sup')`
    if (!isEnabled || isEnabled(options.editorOptions, options)) {
        return {
            ...ckEditorConfiguration,
            plugins: [
                ...(ckEditorConfiguration?.plugins ?? []),
                Plugin
            ]
        };
    }
    return ckEditorConfiguration;
};

manifest('main', {}, (globalRegistry) => {
    const ckEditorRegistry = globalRegistry.get('ckEditor5');
    const richtextToolbar = ckEditorRegistry.get('richtextToolbar');
    const config = ckEditorRegistry.get('config');

    config.set('code', addPlugin(CodeFormatting, (editorOptions) => editorOptions?.formatting?.code));

    richtextToolbar.set('code', {
        commandName: 'code',
        component: IconButtonComponent,
        callbackPropName: 'onClick',
        icon: 'code',
        hoverStyle: 'brand',
        tooltip: 'Code',
        isVisible: (editorOptions) => editorOptions?.formatting?.code,
        isActive: (editorOptions) => editorOptions?.code,
    });
});
