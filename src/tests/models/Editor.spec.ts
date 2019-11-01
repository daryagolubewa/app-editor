import Editor from "../../models/Editor";
import Release from "../../models/Release";
import ReleaseChange from "../../models/ReleaseChange";
import { TMode } from "../../models/BaseModelWindow";
import { describe, it } from 'mocha';
import { assert } from 'chai';

describe('editor', () => {

    it('test constructor', () => {
        let editor = new Editor();
        assert.isUndefined<Release | undefined>(editor.selectedRelease);
        assert.isUndefined<ReleaseChange | undefined>(editor.selectedChange);
        assert.isArray<Release[]>(editor.releases);
        assert.deepEqual<Release[]>(editor.releases, []);
    });

    it('test action newRelease()', () => {
        let editor = new Editor();
        editor.newRelease();
        assert.equal<boolean>(editor.releaseWindow.visible, true);
        assert.equal<TMode | undefined>(editor.releaseWindow.mode, 'insert')
    })


});