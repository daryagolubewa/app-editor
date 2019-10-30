import Release from "../../models/Release";
import { describe, it } from 'mocha';
import { assert } from 'chai';

describe('release', () => {

    it('test clientVersion', () => {
        let release = new Release();
        release.clientVersion = '1.2.3';
        assert.equal<string>(release.clientVersion, '1.2.3')
    })

});