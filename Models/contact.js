const Realm = require('realm');

const ContactSchema = {
  name: 'Contact',
  properties: {
    name:     'string',
    email:    'string',
    phone:     {type: 'string', optional: true},
    picture:  {type: 'data', optional: true}, 
  }
};

let realm = new Realm({schema: [ContactSchema]});

function add(name, email) {
    realm.write(() => {
        let c = realm.create('Contact', {
            name: name,
            email: email,
        });
    });
}

function remove(name) {
    realm.write(() => {
        let c = realm.objects('Contact').filtered("name = " + name);
        realm.delete(c);
    });
}

module.exports = {
    db: realm,
    add: add,
    remove: remove
};
