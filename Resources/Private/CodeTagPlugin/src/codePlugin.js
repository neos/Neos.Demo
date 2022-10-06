import { Plugin } from 'ckeditor5-exports';
import AttributeCommand from '@ckeditor/ckeditor5-basic-styles/src/attributecommand';

const CODE = 'code';

export default class CodeFormating extends Plugin {
    static get pluginName() {
        return 'CodeFormating';
    }
    init() {
        this.editor.model.schema.extend('$text', { allowAttributes: CODE });
        this.editor.conversion.attributeToElement({
            model: CODE,
            view: CODE,
        });
        this.editor.commands.add(CODE, new AttributeCommand(this.editor, CODE));
    }
}
