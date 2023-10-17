import React, { PureComponent } from 'react';
import {IconButton} from "@neos-project/react-ui-components";

export class IconButtonComponent extends PureComponent {
    render() {
        const { formattingRule, inlineEditorOptions, i18nRegistry, tooltip, isActive, ...finalProps } = this.props;
        return <IconButton {...finalProps} isActive={Boolean(isActive)} title={tooltip} />;
    }
}
