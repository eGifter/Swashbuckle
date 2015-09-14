(function () {
    var DiscoveryUrlSelector = Backbone.View.extend({
        render: function () {
            var that = this;
            // Don't re-render on subsequent reloads
            var defaultVal = that.$el.val();
            if (that.$el.prop('tagName') != 'SELECT') {
                var select = $('<select id="input_baseUrl" name="baseUrl"></select>');
                select
                    .css('margin', '0')
                    .css('border', '1px solid gray')
                    .css('padding', '3px')
                    .css('width', '80%')
                    .css('font-size', '0.9em');

                var rootUrl = that.options.rootUrl;
                _.each(that.options.discoveryPaths, function (path) {
                    var option = $('<option value="' + path + '">' + path.replace('/swagger', '') + '</option>');
                    select.append(option);
                });

                var versionIndex = window.location.search.match(/versionIndex=([^&]*)/);
                if (versionIndex != null)
                    select.val(that.options.discoveryPaths[versionIndex[1]]);
                else
                    select.val(defaultVal);
                that.$el.replaceWith(select);

                $('#input_baseUrl').on('change', function () {
                    //console.log('selected index: ' + that.options.discoveryPaths.indexOf($(this).val()));
                    setGetParameter('versionIndex', that.options.discoveryPaths.indexOf($(this).val()));
                });
            }
            return this;
        }
    });

    new DiscoveryUrlSelector({
        el: $('#input_baseUrl'),
        rootUrl: swashbuckleConfig.rootUrl,
        discoveryPaths: swashbuckleConfig.discoveryPaths
    }).render();
})();
