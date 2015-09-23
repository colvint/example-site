Relation = class Relation {
  constructor(collection, selector) {
    this.collection = collection;
    this.selector = selector || {};
  }

  allowedOptions() {
    return this.collection.find(this.selector).fetch();
  }

  allowedIds() {
    return _.pluck(this.allowedOptions(), '_id');
  }

  relatedValue(id) {
    if (!id) return null;

    var relation = this.collection.findOne(id);

    return relation ? relation.name : 'Relation not found';
  }
}
