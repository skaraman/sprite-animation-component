'use strict';

function Framedata() {
    var _this = this;
}

Framedata.prototype.init = function init() {
    var ms = (1/60)*1000 // "ms":ms= 1 frame @ 60FPS
    this.framedata = {
        "test_box": {
            "sequence": {
                "frames" : [
                    {"x":0,"y":0,"ms":ms},
                    {"x":160,"y":0,"ms":ms},
                    {"x":320,"y":0,"ms":ms},
                    {"x":480,"y":0,"ms":ms},
                    {"x":640,"y":0,"ms":ms},
                    {"x":800,"y":0,"ms":ms},
                    {"x":960,"y":0,"ms":ms},
                    {"x":1120,"y":0,"ms":ms},
                    {"x":1280,"y":0,"ms":ms},
                    {"x":1440,"y":0,"ms":ms},
                    {"x":1600,"y":0,"ms":ms},
                    {"x":0,"y":160,"ms":ms},
                    {"x":160,"y":160,"ms":ms},
                    {"x":320,"y":160,"ms":ms},
                    {"x":480,"y":160,"ms":ms},
                    {"x":640,"y":160,"ms":ms},
                    {"x":800,"y":160,"ms":ms},
                    {"x":960,"y":160,"ms":ms},
                    {"x":1120,"y":160,"ms":ms},
                    {"x":1280,"y":160,"ms":ms},
                    {"x":1440,"y":160,"ms":ms},
                    {"x":1600,"y":160,"ms":ms},
                    {"x":0,"y":320,"ms":ms},
                    {"x":160,"y":320,"ms":ms},
                    {"x":320,"y":320,"ms":ms},
                    {"x":480,"y":320,"ms":ms},
                    {"x":640,"y":320,"ms":ms},
                    {"x":800,"y":320,"ms":ms},
                    {"x":960,"y":320,"ms":ms},
                    {"x":1120,"y":320,"ms":ms},
                    {"x":1280,"y":320,"ms":ms},
                    {"x":1440,"y":320,"ms":ms},
                    {"x":1600,"y":320,"ms":ms},
                    {"x":0,"y":480,"ms":ms},
                    {"x":160,"y":480,"ms":ms},
                    {"x":320,"y":480,"ms":ms},
                    {"x":480,"y":480,"ms":ms},
                    {"x":640,"y":480,"ms":ms},
                    {"x":800,"y":480,"ms":ms},
                    {"x":960,"y":480,"ms":ms},
                    {"x":1120,"y":480,"ms":ms},
                    {"x":1280,"y":480,"ms":ms},
                    {"x":1440,"y":480,"ms":ms},
                    {"x":1600,"y":480,"ms":ms},
                    {"x":0,"y":640,"ms":ms},
                    {"x":160,"y":640,"ms":ms},
                    {"x":320,"y":640,"ms":ms},
                    {"x":480,"y":640,"ms":ms},
                    {"x":640,"y":640,"ms":ms},
                    {"x":800,"y":640,"ms":ms},
                    {"x":960,"y":640,"ms":ms},
                    {"x":1120,"y":640,"ms":ms},
                    {"x":1280,"y":640,"ms":ms},
                    {"x":1440,"y":640,"ms":ms},
                    {"x":1600,"y":640,"ms":ms},
                    {"x":0,"y":800,"ms":ms},
                    {"x":160,"y":800,"ms":ms},
                    {"x":320,"y":800,"ms":ms},
                    {"x":480,"y":800,"ms":ms},
                    {"x":640,"y":800,"ms":ms}
                ],
                "frameIterator": 0,
                "msTimer":0
            ,},
            "sequence_timed": {
                "frames" : [
                    {"x":0,"y":0,"ms":10},
                    {"x":160,"y":0,"ms":20},
                    {"x":320,"y":0,"ms":30},
                    {"x":480,"y":0,"ms":40},
                    {"x":640,"y":0,"ms":50},
                    {"x":800,"y":0,"ms":60},
                    {"x":960,"y":0,"ms":70},
                    {"x":1120,"y":0,"ms":80},
                    {"x":1280,"y":0,"ms":90},
                    {"x":1440,"y":0,"ms":100},
                    {"x":1600,"y":0,"ms":10},
                    {"x":0,"y":160,"ms":20},
                    {"x":160,"y":160,"ms":30},
                    {"x":320,"y":160,"ms":40},
                    {"x":480,"y":160,"ms":50},
                    {"x":640,"y":160,"ms":60},
                    {"x":800,"y":160,"ms":70},
                    {"x":960,"y":160,"ms":80},
                    {"x":1120,"y":160,"ms":90},
                    {"x":1280,"y":160,"ms":100},
                    {"x":1440,"y":160,"ms":10},
                    {"x":1600,"y":160,"ms":20},
                    {"x":0,"y":320,"ms":30},
                    {"x":160,"y":320,"ms":40},
                    {"x":320,"y":320,"ms":50},
                    {"x":480,"y":320,"ms":60},
                    {"x":640,"y":320,"ms":70},
                    {"x":800,"y":320,"ms":80},
                    {"x":960,"y":320,"ms":90},
                    {"x":1120,"y":320,"ms":100},
                    {"x":1280,"y":320,"ms":10},
                    {"x":1440,"y":320,"ms":20},
                    {"x":1600,"y":320,"ms":30},
                    {"x":0,"y":480,"ms":40},
                    {"x":160,"y":480,"ms":50},
                    {"x":320,"y":480,"ms":60},
                    {"x":480,"y":480,"ms":70},
                    {"x":640,"y":480,"ms":80},
                    {"x":800,"y":480,"ms":90},
                    {"x":960,"y":480,"ms":100},
                    {"x":1120,"y":480,"ms":10},
                    {"x":1280,"y":480,"ms":20},
                    {"x":1440,"y":480,"ms":30},
                    {"x":1600,"y":480,"ms":40},
                    {"x":0,"y":640,"ms":50},
                    {"x":160,"y":640,"ms":60},
                    {"x":320,"y":640,"ms":70},
                    {"x":480,"y":640,"ms":80},
                    {"x":640,"y":640,"ms":90},
                    {"x":800,"y":640,"ms":100},
                    {"x":960,"y":640,"ms":10},
                    {"x":1120,"y":640,"ms":20},
                    {"x":1280,"y":640,"ms":30},
                    {"x":1440,"y":640,"ms":40},
                    {"x":1600,"y":640,"ms":50},
                    {"x":0,"y":800,"ms":60},
                    {"x":160,"y":800,"ms":70},
                    {"x":320,"y":800,"ms":80},
                    {"x":480,"y":800,"ms":90},
                    {"x":640,"y":800,"ms":100}
                ],
                "frameIterator": 0,
                "msTimer":0
            },
            "reverseSequence": {
                "frames" : [
                    {"x":640,"y":800,"ms":ms},
                    {"x":480,"y":800,"ms":ms},
                    {"x":320,"y":800,"ms":ms},
                    {"x":160,"y":800,"ms":ms},
                    {"x":0,"y":800,"ms":ms},
                    {"x":1600,"y":640,"ms":ms},
                    {"x":1440,"y":640,"ms":ms},
                    {"x":1280,"y":640,"ms":ms},
                    {"x":1120,"y":640,"ms":ms},
                    {"x":960,"y":640,"ms":ms},
                    {"x":800,"y":640,"ms":ms},
                    {"x":640,"y":640,"ms":ms},
                    {"x":480,"y":640,"ms":ms},
                    {"x":320,"y":640,"ms":ms},
                    {"x":160,"y":640,"ms":ms},
                    {"x":0,"y":640,"ms":ms},
                    {"x":1600,"y":480,"ms":ms},
                    {"x":1440,"y":480,"ms":ms},
                    {"x":1280,"y":480,"ms":ms},
                    {"x":1120,"y":480,"ms":ms},
                    {"x":960,"y":480,"ms":ms},
                    {"x":800,"y":480,"ms":ms},
                    {"x":640,"y":480,"ms":ms},
                    {"x":480,"y":480,"ms":ms},
                    {"x":320,"y":480,"ms":ms},
                    {"x":160,"y":480,"ms":ms},
                    {"x":0,"y":480,"ms":ms},
                    {"x":1600,"y":320,"ms":ms},
                    {"x":1440,"y":320,"ms":ms}
                ],
                "frameIterator": 0,
                "msTimer":0
            }
        }
    };
    return this;
};

module.exports = new Framedata();
