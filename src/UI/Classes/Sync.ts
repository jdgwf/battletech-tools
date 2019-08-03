
import {IBattleMechExport} from '../../Classes/BattleMech';
import {IASGroupExport} from '../../Classes/AlphaStrikeGroup';

export enum SyncLocations {
    localStorage,
    googleDrive,
}

export class SyncData {

    savedMechs: IBattleMechExport[] = [];
    savedASGroups: IASGroupExport[] = [];
}

