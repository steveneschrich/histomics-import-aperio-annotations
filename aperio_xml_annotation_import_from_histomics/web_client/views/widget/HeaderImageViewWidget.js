import { wrap } from "@girder/core/utilities/PluginUtils";
import HeaderImageView from "@girder/histomicsui/views/layout/HeaderImageView";
import _ from "underscore";

wrap(HeaderImageView, "initialize", function (initialize) {
    initialize.apply(this, _.rest(arguments));
});

wrap(HeaderImageView, "render", function (render) {
    render.call(this);
    $(
        `<button type="button" class="btn btn-default  h-open-tma-grid" data-toggle="modal" data-target="#importAperioXMLFileModal"><i class="icon-upload"></i> Import Aperio Annotation File...</button>`
    ).insertBefore(this.$(".h-open-image"));
});
