import {Timestamp} from "firebase-admin/firestore";
import {SearchDocument} from "../types/SearchDocument";
import {Search} from "../types/Search";

function getTimestamp(date: Date | string | Timestamp): Timestamp {
  if (date instanceof Timestamp) {
    return date;
  }

  return Timestamp.fromDate(new Date(date));
}

export class SearchAdapter {
  static toDocument(search: Search): SearchDocument {
    const adaptedSearch: SearchDocument = {
      drone: search.drone,
      start: search.start,
      end: search.end,
      date: getTimestamp(search.date),
      result: {
        firstPath: search.result.pathes[0] || [],
        secondPath: search.result.pathes[1] || [],
        time: search.result.time,
      },
    };

    return adaptedSearch;
  }

  static toSearch(searchDocument: SearchDocument): Search {
    const adaptedSearch: Search = {
      drone: searchDocument.drone,
      start: searchDocument.start,
      end: searchDocument.end,
      date: searchDocument.date.toDate(),
      result: {
        pathes: [
          searchDocument.result.firstPath,
          searchDocument.result.secondPath,
        ],
        time: searchDocument.result.time,
      },
    };

    return adaptedSearch;
  }
}

