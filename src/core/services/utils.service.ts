export class UtilsService {
  static mapSearchBy(searchBy: object) {
    const _searchBy = {};
    for (const prop in searchBy) {
      if (searchBy[prop] && prop !== 'password') {
        _searchBy[prop] = searchBy[prop];
      }
    }

    return _searchBy;
  }
}
