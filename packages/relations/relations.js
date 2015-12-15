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

  relatedValues(idList) {
    var relations = this.collection.find({_id: {$in: idList}}).fetch();

    return _.map(relations, (relation) => {
      return relation.label();
    }).join(', ');
  }
}
