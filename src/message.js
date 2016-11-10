import Symbol from 'es6-symbol';
import composeClass from 'compose-class';
import DisposableMixin from 'disposable-mixin';
import disposableDecorator from 'disposable-decorator';
import { requires } from './utils/assertions';

const FIELDS = {
    evt: Symbol('evt'),
    id: Symbol('id'),
    type: Symbol('type'),
    payload: Symbol('payload'),
    callback: Symbol('callback')
};

const Message = composeClass({
    mixins: [
        DisposableMixin([
            FIELDS.evt,
            FIELDS.id,
            FIELDS.type,
            FIELDS.payload,
            FIELDS.callback
        ])
    ],

    decorators: [
        disposableDecorator
    ],

    constructor(evt, id, type, payload, callback) {
        requires('evt', evt);
        requires('id', id);
        requires('type', type);
        requires('callback', callback);

        this[FIELDS.evt] = evt;
        this[FIELDS.id] = id;
        this[FIELDS.type] = type;
        this[FIELDS.payload] = payload;
        this[FIELDS.callback] = callback;
    },

    type() {
        return this[FIELDS.type];
    },

    data() {
        return this[FIELDS.payload];
    },

    reply(payload) {
        this[FIELDS.callback](
            this[FIELDS.evt],
            this[FIELDS.id],
            payload
        );

        this.dispose();
    }
});

export default function create() {
    return new Message(...arguments);
}
