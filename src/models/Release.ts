
import { observable } from 'mobx'
import ReleaseChange from './ReleaseChange';


export default class Release {

    @observable clientVersion: string;
    @observable serverVersion: string;
    @observable releaseDate: Date;
    @observable releaseChanges: ReleaseChange[] = [];

    constructor(clientVersion?: string, serverVersion?: string, releaseDate?: Date) {
        this.clientVersion = clientVersion || '';
        this.serverVersion = serverVersion || '';
        this.releaseDate = releaseDate || new Date;
    }


}