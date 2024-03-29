import { Injectable } from "@angular/core";
@Injectable()
export class MapStyles {
    public purple = [
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "hue": "#6600ff"
                },
                {
                    "saturation": -11
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "hue": "#6600ff"
                },
                {
                    "saturation": -78
                },
                {
                    "lightness": -47
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "stylers": [
                {
                    "hue": "#5e00ff"
                },
                {
                    "saturation": -79
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "lightness": 30
                },
                {
                    "weight": 1.3
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "hue": "#5e00ff"
                },
                {
                    "saturation": -16
                },
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "transit.line",
            "stylers": [
                {
                    "saturation": -72
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "hue": "#1900ff"
                },
                {
                    "saturation": -65
                },
                {
                    "lightness": 8
                }
            ]
        }
    ]

}