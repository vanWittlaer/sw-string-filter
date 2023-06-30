import template from './sw-string-filter.html.twig';

const { Component } = Shopware;
const { Criteria } = Shopware.Data;

Component.register('sw-string-filter', {
    template,

    props: {
        filter: {
            type: Object,
            required: true,
        },

        active: {
            type: Boolean,
            required: true,
        },
    },

    computed: {
        value() {
            return this.filter.value;
        },
    },

    methods: {
        updateFilter(newValue) {
            if (!newValue) {
                this.resetFilter();
                return;
            }

            const filterCriteria = [Criteria.equals(this.filter.property, newValue)];

            this.$emit('filter-update', this.filter.name, filterCriteria, newValue);
        },

        resetFilter() {
            this.filter.value = null;
            this.$emit('filter-reset', this.filter.name, this.filter.value);
        },
    },
});
