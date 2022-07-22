import React, { PureComponent } from 'react';
import manifest from '@neos-project/neos-ui-extensibility';
import { $get, $add } from 'plow-js';
import CodeFormating from './codePlugin';
import { IconButton } from '@neos-project/react-ui-components';

class IconButtonComponent extends PureComponent {
    render() {
        const { formattingRule, inlineEditorOptions, i18nRegistry, tooltip, isActive, ...finalProps } = this.props;
        return <IconButton {...finalProps} isActive={Boolean(isActive)} title={tooltip} />;
    }
}

const addPlugin = (Plugin, isEnabled) => (ckEditorConfiguration, options) => {
    // we duplicate editorOptions here so it would be possible to write something like `$get('formatting.sup')`
    if (!isEnabled || isEnabled(options.editorOptions, options)) {
        ckEditorConfiguration.plugins = ckEditorConfiguration.plugins || [];
        return $add('plugins', Plugin, ckEditorConfiguration);
    }
    return ckEditorConfiguration;
};

manifest('main', {}, (globalRegistry) => {
    const ckEditorRegistry = globalRegistry.get('ckEditor5');
    const richtextToolbar = ckEditorRegistry.get('richtextToolbar');
    const config = ckEditorRegistry.get('config');

    config.set('code', addPlugin(CodeFormating, $get('formatting.code')));

    richtextToolbar.set('code', {
        commandName: 'code',
        component: IconButtonComponent,
        callbackPropName: 'onClick',
        icon: 'code',
        hoverStyle: 'brand',
        tooltip: 'Code',
        isVisible: $get('formatting.code'),
        isActive: $get('code'),
    });
});
