import {describe, it} from 'mocha';
import {expect} from 'chai';
import {isUnique} from './utils';


describe('isUnique', () => {
    it('should return unique items', () => {
        let list = [1, 2, 3, 4];
        let expected = [1, 2, 3, 4];

        let actual = list.filter(isUnique(list));

        expect(actual).to.deep.equal(expected);
    });

    it('should remove duplicates', () => {
        let list = [1, 2, 2, 4];
        let expected = [1, 2, 4];

        let actual = list.filter(isUnique(list));

        expect(actual).to.deep.equal(expected);
    })
});
