import React from 'react';
import { BattleMech } from "../../../classes/battlemech";

export default class BattleMechArmorBipedSVG extends React.Component<IBattleMechArmorBipedSVGProps, IBattleMechArmorBipedSVGState> {
    bgColor = "rgb(255,255,255)";
    strokeColor = "rgb(0,0,0)";
    // landscape: boolean = false;
    inPlay: boolean = false;
    docWidth = 2000;
    docHeight = 2600;

    colorTan = "#fdfde3";

    constructor(props: IBattleMechArmorBipedSVGProps) {
        super( props );
    }
}

interface IBattleMechArmorBipedSVGProps {
    bgColor?: string;
    strokeColor?: string;
    mechData: BattleMech;
    inPlay?: boolean;
    // landscape?: boolean;
    // itemIDField
}

interface IBattleMechArmorBipedSVGState {
}