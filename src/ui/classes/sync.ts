
import { IASGroupExport } from '../../classes/alpha-strike-group';
import { IBattleMechExport } from '../../classes/battlemech';

export enum SyncLocations {
    localStorage,
    googleDrive,
}

export class SyncData {

    savedMechs: IBattleMechExport[] = [];
    savedASGroups: IASGroupExport[] = [];
}

