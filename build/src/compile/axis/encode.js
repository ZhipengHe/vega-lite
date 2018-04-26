"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var channel_1 = require("../../channel");
var fielddef_1 = require("../../fielddef");
var scale_1 = require("../../scale");
var type_1 = require("../../type");
var util_1 = require("../../util");
var common_1 = require("../common");
var config_1 = require("./config");
function labels(model, channel, specifiedLabelsSpec, orient) {
    var fieldDef = model.fieldDef(channel) ||
        (channel === 'x' ? model.fieldDef('x2') :
            channel === 'y' ? model.fieldDef('y2') :
                undefined);
    var axis = model.axis(channel);
    var config = model.config;
    var labelsSpec = {};
    // Text
    if (fielddef_1.isTimeFieldDef(fieldDef)) {
        var isUTCScale = model.getScaleComponent(channel).get('type') === scale_1.ScaleType.UTC;
        labelsSpec.text = {
            signal: common_1.timeFormatExpression('datum.value', fieldDef.timeUnit, axis.format, config.axis.shortTimeLabels, config.timeFormat, isUTCScale)
        };
    }
    // Label Angle
    var angle = config_1.getAxisConfig('labelAngle', model.config, channel, orient, model.getScaleComponent(channel).get('type'));
    if (angle === undefined) {
        angle = labelAngle(axis, channel, fieldDef);
        if (angle) {
            labelsSpec.angle = { value: angle };
        }
    }
    if (angle !== undefined) {
        var align = labelAlign(angle, orient);
        if (align) {
            labelsSpec.align = { value: align };
        }
        labelsSpec.baseline = labelBaseline(angle, orient);
    }
    labelsSpec = tslib_1.__assign({}, labelsSpec, specifiedLabelsSpec);
    return util_1.keys(labelsSpec).length === 0 ? undefined : labelsSpec;
}
exports.labels = labels;
function labelBaseline(angle, orient) {
    if (orient === 'top' || orient === 'bottom') {
        if (angle <= 45 || 315 <= angle) {
            return { value: orient === 'top' ? 'bottom' : 'top' };
        }
        else if (135 <= angle && angle <= 225) {
            return { value: orient === 'top' ? 'top' : 'bottom' };
        }
        else {
            return { value: 'middle' };
        }
    }
    else {
        if ((angle <= 45 || 315 <= angle) || (135 <= angle && angle <= 225)) {
            return { value: 'middle' };
        }
        else if (45 <= angle && angle <= 135) {
            return { value: orient === 'left' ? 'top' : 'bottom' };
        }
        else {
            return { value: orient === 'left' ? 'bottom' : 'top' };
        }
    }
}
exports.labelBaseline = labelBaseline;
function labelAngle(axis, channel, fieldDef) {
    if (axis.labelAngle !== undefined) {
        // Make angle within [0,360)
        return ((axis.labelAngle % 360) + 360) % 360;
    }
    else {
        if (channel === channel_1.X && util_1.contains([type_1.NOMINAL, type_1.ORDINAL], fieldDef.type)) {
            return 270;
        }
    }
    return undefined;
}
exports.labelAngle = labelAngle;
function labelAlign(angle, orient) {
    angle = ((angle % 360) + 360) % 360;
    if (orient === 'top' || orient === 'bottom') {
        if (angle % 180 === 0) {
            return 'center';
        }
        else if (0 < angle && angle < 180) {
            return orient === 'top' ? 'right' : 'left';
        }
        else {
            return orient === 'top' ? 'left' : 'right';
        }
    }
    else {
        if ((angle + 90) % 180 === 0) {
            return 'center';
        }
        else if (90 <= angle && angle < 270) {
            return orient === 'left' ? 'left' : 'right';
        }
        else {
            return orient === 'left' ? 'right' : 'left';
        }
    }
}
exports.labelAlign = labelAlign;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBpbGUvYXhpcy9lbmNvZGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EseUNBQStEO0FBQy9ELDJDQUF3RDtBQUN4RCxxQ0FBc0M7QUFDdEMsbUNBQTRDO0FBQzVDLG1DQUEwQztBQUUxQyxvQ0FBK0M7QUFFL0MsbUNBQXVDO0FBRXZDLGdCQUF1QixLQUFnQixFQUFFLE9BQTZCLEVBQUUsbUJBQXdCLEVBQUUsTUFBa0I7SUFDbEgsSUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7UUFDdEMsQ0FDRSxPQUFPLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDeEMsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxTQUFTLENBQ1YsQ0FBQztJQUNKLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsSUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUU1QixJQUFJLFVBQVUsR0FBUSxFQUFFLENBQUM7SUFFekIsT0FBTztJQUNQLElBQUkseUJBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUM1QixJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLGlCQUFTLENBQUMsR0FBRyxDQUFDO1FBRWxGLFVBQVUsQ0FBQyxJQUFJLEdBQUc7WUFDaEIsTUFBTSxFQUFFLDZCQUFvQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FB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QUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1NBQzdDO0tBQ0Y7QUFDSCxDQUFDO0FBbkJELGdDQW1CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXhpc30gZnJvbSAnLi4vLi4vYXhpcyc7XG5pbXBvcnQge0NoYW5uZWwsIFBvc2l0aW9uU2NhbGVDaGFubmVsLCBYfSBmcm9tICcuLi8uLi9jaGFubmVsJztcbmltcG9ydCB7RmllbGREZWYsIGlzVGltZUZpZWxkRGVmfSBmcm9tICcuLi8uLi9maWVsZGRlZic7XG5pbXBvcnQge1NjYWxlVHlwZX0gZnJvbSAnLi4vLi4vc2NhbGUnO1xuaW1wb3J0IHtOT01JTkFMLCBPUkRJTkFMfSBmcm9tICcuLi8uLi90eXBlJztcbmltcG9ydCB7Y29udGFpbnMsIGtleXN9IGZyb20gJy4uLy4uL3V0aWwnO1xuaW1wb3J0IHtBeGlzT3JpZW50LCBIb3Jpem9udGFsQWxpZ259IGZyb20gJy4uLy4uL3ZlZ2Euc2NoZW1hJztcbmltcG9ydCB7dGltZUZvcm1hdEV4cHJlc3Npb259IGZyb20gJy4uL2NvbW1vbic7XG5pbXBvcnQge1VuaXRNb2RlbH0gZnJvbSAnLi4vdW5pdCc7XG5pbXBvcnQge2dldEF4aXNDb25maWd9IGZyb20gJy4vY29uZmlnJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxhYmVscyhtb2RlbDogVW5pdE1vZGVsLCBjaGFubmVsOiBQb3NpdGlvblNjYWxlQ2hhbm5lbCwgc3BlY2lmaWVkTGFiZWxzU3BlYzogYW55LCBvcmllbnQ6IEF4aXNPcmllbnQpIHtcbiAgY29uc3QgZmllbGREZWYgPSBtb2RlbC5maWVsZERlZihjaGFubmVsKSB8fFxuICAgIChcbiAgICAgIGNoYW5uZWwgPT09ICd4JyA/IG1vZGVsLmZpZWxkRGVmKCd4MicpIDpcbiAgICAgIGNoYW5uZWwgPT09ICd5JyA/IG1vZGVsLmZpZWxkRGVmKCd5MicpIDpcbiAgICAgIHVuZGVmaW5lZFxuICAgICk7XG4gIGNvbnN0IGF4aXMgPSBtb2RlbC5heGlzKGNoYW5uZWwpO1xuICBjb25zdCBjb25maWcgPSBtb2RlbC5jb25maWc7XG5cbiAgbGV0IGxhYmVsc1NwZWM6IGFueSA9IHt9O1xuXG4gIC8vIFRleHRcbiAgaWYgKGlzVGltZUZpZWxkRGVmKGZpZWxkRGVmKSkge1xuICAgIGNvbnN0IGlzVVRDU2NhbGUgPSBtb2RlbC5nZXRTY2FsZUNvbXBvbmVudChjaGFubmVsKS5nZXQoJ3R5cGUnKSA9PT0gU2NhbGVUeXBlLlVUQztcblxuICAgIGxhYmVsc1NwZWMudGV4dCA9IHtcbiAgICAgIHNpZ25hbDogdGltZUZvcm1hdEV4cHJlc3Npb24oJ2RhdHVtLnZhbHVlJywgZmllbGREZWYudGltZVVuaXQsIGF4aXMuZm9ybWF0LCBjb25maWcuYXhpcy5zaG9ydFRpbWVMYWJlbHMsIGNvbmZpZy50aW1lRm9ybWF0LCBpc1VUQ1NjYWxlKVxuICAgIH07XG4gIH1cblxuICAvLyBMYWJlbCBBbmdsZVxuICBsZXQgYW5nbGUgPSBnZXRBeGlzQ29uZmlnKCdsYWJlbEFuZ2xlJywgbW9kZWwuY29uZmlnLCBjaGFubmVsLCBvcmllbnQsIG1vZGVsLmdldFNjYWxlQ29tcG9uZW50KGNoYW5uZWwpLmdldCgndHlwZScpKTtcbiAgaWYgKGFuZ2xlID09PSB1bmRlZmluZWQpIHtcbiAgICBhbmdsZSA9IGxhYmVsQW5nbGUoYXhpcywgY2hhbm5lbCwgZmllbGREZWYpO1xuICAgIGlmIChhbmdsZSkge1xuICAgICAgbGFiZWxzU3BlYy5hbmdsZSA9IHt2YWx1ZTogYW5nbGV9O1xuICAgIH1cbiAgfVxuXG4gIGlmIChhbmdsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgYWxpZ24gPSBsYWJlbEFsaWduKGFuZ2xlLCBvcmllbnQpO1xuICAgIGlmIChhbGlnbikge1xuICAgICAgbGFiZWxzU3BlYy5hbGlnbiA9IHt2YWx1ZTogYWxpZ259O1xuICAgIH1cblxuICAgIGxhYmVsc1NwZWMuYmFzZWxpbmUgPSBsYWJlbEJhc2VsaW5lKGFuZ2xlLCBvcmllbnQpO1xuICB9XG5cbiAgbGFiZWxzU3BlYyA9IHtcbiAgICAuLi5sYWJlbHNTcGVjLFxuICAgIC4uLnNwZWNpZmllZExhYmVsc1NwZWNcbiAgfTtcblxuICByZXR1cm4ga2V5cyhsYWJlbHNTcGVjKS5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBsYWJlbHNTcGVjO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGFiZWxCYXNlbGluZShhbmdsZTogbnVtYmVyLCBvcmllbnQ6IEF4aXNPcmllbnQpIHtcbiAgaWYgKG9yaWVudCA9PT0gJ3RvcCcgfHwgb3JpZW50ID09PSAnYm90dG9tJykge1xuICAgIGlmIChhbmdsZSA8PSA0NSB8fCAzMTUgPD0gYW5nbGUpIHtcbiAgICAgIHJldHVybiB7dmFsdWU6IG9yaWVudCA9PT0gJ3RvcCcgPyAnYm90dG9tJyA6ICd0b3AnfTtcbiAgICB9IGVsc2UgaWYgKDEzNSA8PSBhbmdsZSAmJiBhbmdsZSA8PSAyMjUpIHtcbiAgICAgIHJldHVybiB7dmFsdWU6IG9yaWVudCA9PT0gJ3RvcCcgPyAndG9wJzogJ2JvdHRvbSd9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge3ZhbHVlOiAnbWlkZGxlJ307XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICgoYW5nbGUgPD0gNDUgfHwgMzE1IDw9IGFuZ2xlKSB8fCAoMTM1IDw9IGFuZ2xlICYmIGFuZ2xlIDw9IDIyNSkpIHtcbiAgICAgIHJldHVybiB7dmFsdWU6ICdtaWRkbGUnfTtcbiAgICB9IGVsc2UgaWYgKDQ1IDw9IGFuZ2xlICYmIGFuZ2xlIDw9IDEzNSkge1xuICAgICAgcmV0dXJuIHt2YWx1ZTogb3JpZW50ID09PSAnbGVmdCcgPyAndG9wJyA6ICdib3R0b20nfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHt2YWx1ZTogb3JpZW50ID09PSAnbGVmdCcgPyAnYm90dG9tJyA6ICd0b3AnfTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhYmVsQW5nbGUoYXhpczogQXhpcywgY2hhbm5lbDogQ2hhbm5lbCwgZmllbGREZWY6IEZpZWxkRGVmPHN0cmluZz4pIHtcbiAgaWYgKGF4aXMubGFiZWxBbmdsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gTWFrZSBhbmdsZSB3aXRoaW4gWzAsMzYwKVxuICAgIHJldHVybiAoKGF4aXMubGFiZWxBbmdsZSAlIDM2MCkgKyAzNjApICUgMzYwO1xuICB9IGVsc2Uge1xuICAgIGlmIChjaGFubmVsID09PSBYICYmIGNvbnRhaW5zKFtOT01JTkFMLCBPUkRJTkFMXSwgZmllbGREZWYudHlwZSkpIHtcbiAgICAgIHJldHVybiAyNzA7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsYWJlbEFsaWduKGFuZ2xlOiBudW1iZXIsIG9yaWVudDogQXhpc09yaWVudCk6IEhvcml6b250YWxBbGlnbiB7XG4gIGFuZ2xlID0gKChhbmdsZSAlIDM2MCkgKyAzNjApICUgMzYwO1xuICBpZiAob3JpZW50ID09PSAndG9wJyB8fCBvcmllbnQgPT09ICdib3R0b20nKSB7XG4gICAgaWYgKGFuZ2xlICUgMTgwID09PSAwKSB7XG4gICAgICByZXR1cm4gJ2NlbnRlcic7XG4gICAgfSBlbHNlIGlmICgwIDwgYW5nbGUgJiYgYW5nbGUgPCAxODApIHtcbiAgICAgIHJldHVybiBvcmllbnQgPT09ICd0b3AnID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9yaWVudCA9PT0gJ3RvcCcgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoKGFuZ2xlICsgOTApICUgMTgwID09PSAwKSB7XG4gICAgICByZXR1cm4gJ2NlbnRlcic7XG4gICAgfSBlbHNlIGlmICg5MCA8PSBhbmdsZSAmJiBhbmdsZSA8IDI3MCkge1xuICAgICAgcmV0dXJuIG9yaWVudCA9PT0gJ2xlZnQnID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG9yaWVudCA9PT0gJ2xlZnQnID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICB9XG4gIH1cbn1cblxuIl19