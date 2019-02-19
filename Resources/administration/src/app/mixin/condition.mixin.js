import { Mixin } from 'src/core/shopware';

/**
 * @module app/mixin/condition
 */
Mixin.register('condition', {
    props: {
        condition: {
            type: Object,
            required: false,
            default: null
        },
        entityAssociationStore: {
            type: Object,
            required: true
        },
        conditionStore: {
            type: Object,
            required: true
        },
        config: {
            type: Object,
            required: true
        },
        level: {
            type: Number,
            required: true
        },
        parentDisabledDelete: {
            type: Boolean,
            required: false,
            default: false
        }
    }
});