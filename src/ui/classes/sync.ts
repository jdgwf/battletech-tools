
import {IBattleMechExport} from '../../classes/battlemech';
import {IASGroupExport} from '../../classes/alpha-strike-group';

export enum SyncLocations {
    localStorage,
    googleDrive,
}

export class SyncData {

    savedMechs: IBattleMechExport[] = [];
    savedASGroups: IASGroupExport[] = [];
}

