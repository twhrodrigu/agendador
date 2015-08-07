var Actions = require('../actions/Actions'),
    superagent = require('superagent');

describe("People Available Store", function() {
    var _store;

    beforeEach(function() {
        _store = require('../stores/PeopleAvailableStore');
        _store.emitter.removeAllListeners();
        _store.getInitialState();
    });

    it('should set initial state', function () {
        var initialState = _store.getInitialState();
        expect(initialState.selectedDate.getTime() - (new Date()).getTime()).toBeLessThan(10000); // 10 seconds
        expect(initialState.selectedStartTimeIndex).toEqual(0);
        expect(initialState.selectedEndTimeIndex).toEqual(1);
        expect(initialState.selectedRoleIndex).toEqual(0);
        expect(initialState.selectedOfficeIndex).toEqual(0);
        expect(initialState.people).toEqual([]);
    });

    it('should set start time index on selectStartTime action', function (done) {
        _store.listen(function (status) {
            expect(status.selectedStartTimeIndex).toEqual(1);
            done();
        });
        Actions.selectStartTime(null, 1, { text: 'foo' });
    });

    it('should set end time index on selectEndTime action', function (done) {
        _store.listen(function (status) {
            expect(status.selectedEndTimeIndex).toEqual(2);
            done();
        });
        Actions.selectEndTime(null, 2, { text: 'foo' });
    });

    it('should set role index on selectRole action', function (done) {
        _store.listen(function (status) {
            expect(status.selectedRoleIndex).toEqual(3);
            done();
        });
        Actions.selectRole(null, 3, null);
    });

    it('should set office index on selectOffice action', function (done) {
        _store.listen(function (status) {
            expect(status.selectedOfficeIndex).toEqual(4);
            done();
        });
        Actions.selectOffice(null, 4, null);
    });

    it('should send get request on searchRequest', function (done) {
        require('superagent-mock')(superagent, [{
            fixtures: function (match, data) {
                return 'mock response';
            },
            callback: function (match, data) {
                return { ok: true, body: data };
            }
        }]);
        spyOn(_store, 'searchCompleted').and.callFake(function () {
            expect(_store.searchCompleted).toHaveBeenCalled();
            done();
        });
        Actions.searchRequest();
    });
});
