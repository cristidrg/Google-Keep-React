import { expect, assert } from 'chai';
import sinon from 'sinon';

import { join } from '../../../src/helpers/';

describe('helpers', () => {
    describe('join', () => {
        it("should return empty function if no arguments given", () => {
            assert.isFunction(join(), 'join returns a function if no args');
        });

        it("result should do nothing if no arguments given", () => {
            expect(join()('a', 1, null)).to.be.undefined;
        });

        it("should call functions in given order", () => {
            let myString = '';
            const addToMyString = sinon.spy(string => myString += 1);
            const addTwiceToMyString = sinon.spy(string => myString += 2);
            const joined = join(addToMyString, addTwiceToMyString);
            
            joined();
            expect(addToMyString.called).to.be.true;
            expect(addTwiceToMyString.called).to.be.true;
            expect(myString).to.be.equal('12');
        });

        it("should call functions with arguments", () => {
            let myString = '';
            const addAllToMyString = sinon.spy((...args) => myString += args.reduce((acc, curr) => acc + curr));
            const addMaxToMyString = sinon.spy((...args) => myString += Math.max(...args));
            const joined = join(addAllToMyString, addMaxToMyString);
            
            joined('0', '5', '3');
            expect(addAllToMyString.called).to.be.true;
            expect(addMaxToMyString.called).to.be.true;
            expect(myString).to.be.equal('0535');
        });
    });
});
  