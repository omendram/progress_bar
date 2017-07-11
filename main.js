define(function (require, exports, module) {
    'use strict';

    var Marionette      = require('marionette');
    var Backbone = require('backbone');

    /**
      * The Progress Bar control object
      *
      * @class Dashboard.Views.Controls.ProgressBar
      *
      * @augments Marionette.ItemView
      *
      * @constructs ProgressBar
      */
    var ProgressBar = Marionette.ItemView.extend({
        /**
         * HTML template
         */
        template: require('hbs!./template'),

        /**
         * HTML tag to wrap the content
         */
        tagName: 'div',

        /**
         * Class Name
         */
        className: 'bar-div col-md-12',

        /**
         * UI Elements
         */
        ui: {
            'bar': '#bar',
            'notify': 'input[name="notify"]',
            'clear': '.clear-bar-button'
        },

        /**
         * UI Events
         */
        events: {
            'click @ui.clear': 'resetCount'
        },

        /**
         * Object Initializer
         *
         * Creates a new collection to contain the crumbs
         */
        initialize: function(options) {
            this.model = new Backbone.Model(options);

            this.model.bind('change', _.bind(this.updateProgressBar, this));
        },

        /**
         * Reset everything to zero
         */
        resetCount: function() {
            this.model.set('currentCount', 0);
            this.trigger('cleared');
            this.ui.clear.hide();
        },

        /**
         * update the models
         */
        updateModel: function(options) {
            this.model.set(options);
        },

        /**
         * update progress bar
         */
        updateProgressBar: function() {
            var widthPercentage = 0;

            if ((this.model.get('currentCount') <= this.model.get('maximumCount')) && this.model.get('currentCount') > 0 && this.model.get('currentCount')) {
                widthPercentage = (this.model.get('currentCount') / this.model.get('maximumCount'))*100;
            }

            this.ui.bar.css({ width: widthPercentage + '%'});
            // this.ui.bar.text(widthPercentage + '%');

            if (this.model.get('notify') && this.ui.notify.prop('checked') && (widthPercentage >= this.model.get('notifyPercentage'))) {
                var notifyAction =  this.model.get('notifyAction');

                notifyAction();
            }

            if (widthPercentage >= 100) {
                this.trigger('count-full');
                this.ui.clear.show();
            }
        },

        /**
         * Post render activity
         */
        onRender: function() {
            this.ui.clear.hide();
            this.bindUIElements();
        }
    });

    module.exports = ProgressBar;
});
