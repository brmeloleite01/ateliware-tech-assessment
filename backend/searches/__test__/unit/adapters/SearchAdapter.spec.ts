import { Timestamp } from "firebase-admin/firestore";
import { Search } from "../../../src/types/Search";
import { SearchDocument } from "../../../src/types/SearchDocument";
import { SearchAdapter } from "../../../src/adapters/SearchAdapter";


describe('SearchAdapter', () => {
    const search: Search = {
        drone: 'A1',
        start: 'A4',
        end: 'A6',
        date: new Date(),
        result: {
            pathes: [['A1', 'A2', 'A3', 'A4'], ['A5', 'A6', 'A7']],
            time: 3.4,
        },
    };

    const searchDocument: SearchDocument = {
        drone: 'A1',
        start: 'A4',
        end: 'A6',
        date: Timestamp.now(),
        result: {
            firstPath: ['A1', 'A2', 'A3', 'A4'],
            secondPath: ['A5', 'A6', 'A7'],
            time: 3.4,
        },
    };

    describe('toSearch', () => {
        it('should adapt SearchDocument to Search', () => {
            const adaptedSearch = SearchAdapter.toSearch(searchDocument);
            expect(adaptedSearch).toEqual(search);
        });

    });

    describe('toDocument', () => {

        it('should adapt Search to SearchDocument', () => {
            const adaptedSearchDocument = SearchAdapter.toDocument(search);
            expect(adaptedSearchDocument).toEqual(searchDocument);
        });
    });


});