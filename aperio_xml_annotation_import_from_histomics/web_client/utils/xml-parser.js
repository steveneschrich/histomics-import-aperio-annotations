import {
    isCircle,
    getYMinorAxis,
    getDistanceBetween2Points,
    getCenterCoordinates,
    getRGBFromDecimal,
} from "./utils";

const shapeType = {
    CIRCLE: "circle",
    POLYLINE: "polyline",
    ARROW: "arrow",
    ELLIPSE: "ellipse",
};

const randomStr = () => require("crypto").randomBytes(32).toString("hex");

const parseRegion = (region, lineColor) => {
    console.log("region: ", region);
    const vertexArray = region.Vertices[0].Vertex;
    let element = {
        fillColor: "rgba(0,0,0,0)",
        lineColor: lineColor,
        lineWidth: 2,
        id: randomStr().slice(0, 24),
    };

    /**
     * Polygons && Polyline
     */
    if (region.$.Type === "0" || region.$.Type === "1") {
        element.type = shapeType.POLYLINE;
        element.closed = region.$.Type === "1";
        element.points = vertexArray.map((point) => [
            parseFloat(point.$.X),
            parseFloat(point.$.Y),
            parseFloat(point.$.Z),
        ]);

        return element;
    }

    /**
     * Circles and ellipses
     */
    if (region.$.Type === "2") {
        const x1 = parseFloat(vertexArray[0].$.X);
        const y1 = parseFloat(vertexArray[0].$.Y);
        const x2 = parseFloat(vertexArray[1].$.X);
        const y2 = parseFloat(vertexArray[1].$.Y);
        const area = region.$.Area;
        let height, width;
        const midpoint = getCenterCoordinates(x1, y1, x2, y2);
        const isHorizontal = x2 - x1 > y2 - y1;

        width = getDistanceBetween2Points(x1, y1, x2, y2);
        const minorXAxis = width / 2;
        const minorYAxis = getYMinorAxis(area, minorXAxis);
        height = minorYAxis * 2;

        const _isCircle = isCircle(minorXAxis, height);

        element.center = [midpoint.x, midpoint.y, 0];
        if (_isCircle) {
            element.type = shapeType.CIRCLE;
            element.radius = minorXAxis;
        } else {
            if (!isHorizontal) {
                const temp = width;
                width = height;
                height = temp;
            }
            element.type = shapeType.ELLIPSE;
            element.rotation = 0;
            element.width = width;
            element.height = height;
            element.normal = [0, 0, 1];
        }

        return element;
    }
};

export const getAnnotationsBody = (jsonData) => {
    let annotation = jsonData.Annotations.Annotation;

    annotation = Array.isArray(annotation) ? annotation : [annotation];

    let resultJSONArray = [];

    annotation.forEach((annotation) => {
        const attributes = annotation.Attributes[0].Attribute[0];
        console.log("Attribute", attributes);
        let regions = annotation.Regions[0].Region;

        if (regions === undefined) {
            return;
        }

        const lineColor = getRGBFromDecimal(annotation.$.LineColor);

        console.log(regions, lineColor, attributes.$.Name);

        let resultJSON = {
            description: "",
            elements: [],
            name: attributes.$.Name !== undefined ? attributes.$.Name : "",
        };

        regions = Array.isArray(regions) ? regions : [regions];

        regions.forEach((region) => {
            resultJSON.elements.push(parseRegion(region, lineColor));
        });

        resultJSONArray.push(resultJSON);
    });
    return resultJSONArray;
};
