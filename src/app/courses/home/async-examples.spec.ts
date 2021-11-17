import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";

describe('Async testing examples', () => {
    it('Assynchronous test example with Jasmine done()', (done: DoneFn) => {
        let test = false;

        setTimeout(() => {
            console.log('Running assertions');
            test = true;
            expect(test).toBeTruthy();
            done();
        }, 1000);
    });

    it('Assynchronous test example with Jasmine - setTimeout()',fakeAsync (() => {
        let test = false;

        setTimeout(() => {
            console.log('Running assertions');
            test = true;
            expect(test).toBeTruthy();
        }, 1000);

        flush();
    }));

    it('Assynchronous test example with Jasmine - plain Promise',fakeAsync(() => {
        let test = false;
        
        Promise.resolve().then(() => {
            return Promise.resolve()
        }).then(() => {
            
            test = true;
        });
        flushMicrotasks();
        expect(test).toBeTruthy();
    }));
});