import { wrap } from "@girder/core/utilities/PluginUtils";
import { restRequest } from "@girder/core/rest";
import ImageView from "@girder/histomicsui/views/body/ImageView";
import _ from "underscore";
import "../../stylesheets/modal.styl";
import { getAnnotationsBody } from "../../utils/xml-parser";

var parseString = require("xml2js").parseString;

wrap(ImageView, "initialize", function (initialize) {
    initialize.apply(this, _.rest(arguments));
});

wrap(ImageView, "render", function (render) {
    render.call(this);

    const getXmlAsString = (xmlDom) => {
        return typeof XMLSerializer !== "undefined"
            ? new window.XMLSerializer().serializeToString(xmlDom)
            : xmlDom.xml;
    };

    const postAnnotationApiCall = (annotationBody) => {
        console.log("Wha", JSON.stringify(annotationBody));
        return restRequest({
            url: `annotation?itemId=${this.model.id}`,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(annotationBody),
        });
    };

    if (!$("#importAperioXMLFileModal")[0]) {
        $("body").append(`
        <div class="modal fade modal-xl" tabindex="-1" role="dialog" id="importAperioXMLFileModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"><strong>Import Aperio XML File</strong></h5>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                    <label><strong>Click or drag and drop .XML File</strong></label>
                    <div class="custom-file">
                        <input 
                            type="file" 
                            id="aperioFile"
                            name="files[]"
                            multiple class="custom-file-input form-control" >
                        <label class="custom-file-label" for="aperioFile">Choose file</label>
                    </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" id="aperio-convert-btn" class="btn btn-primary">Convert Annotations</button>
              <button type="button" id="aperio-modal-close" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`);

        $('input[type="file"]').on("change", function () {
            let filenames = [];
            let files = this.files;
            if (files.length > 1) {
                filenames.push("Total Files (" + files.length + ")");
            } else {
                for (let i in files) {
                    if (files.hasOwnProperty(i)) {
                        filenames.push(files[i].name);
                    }
                }
            }
            $(this).next(".custom-file-label").html(filenames.join(","));
        });

        $("#aperio-convert-btn").click(function () {
            const regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xml)$/;
            const input = $("#aperioFile")[0];

            if (regex.test($("#aperioFile").val().toLowerCase())) {
                if (input.files && input.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        $.get(e.target.result, function (xml) {
                            const xmlDoc = getXmlAsString(xml);
                            parseString(xmlDoc, function (err, jsonData) {
                                const annotationBodyArray =
                                    getAnnotationsBody(jsonData);

                                Promise.all(
                                    annotationBodyArray.map((item) =>
                                        postAnnotationApiCall(item)
                                    )
                                ).then(() => {
                                    location.reload();
                                });
                            });
                        });
                    };
                    reader.readAsDataURL(input.files[0]);
                }
            } else {
                alert("Please upload a valid XML file!");
            }
        });
    }
});

export default ImageView;
