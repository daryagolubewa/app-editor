
import { observable } from 'mobx'
import ReleaseChange from './ReleaseChange';

/**
 * Модель релиза.
 */
export default class Release {

    /**
     * Графа в таблице релизов: обозначает версию релиза на клиенте.
     */
    @observable clientVersion: string;

    /**
     * Графа в таблице релизов: обозначает версию релиза на сервере.
     */
    @observable serverVersion: string;

    /**
     * Графа в таблице релизов: обозначает дату релиза.
     */
    @observable releaseDate: Date;

    /**
     * Массив изменений в релизах: все изменения, которые были сделаны.
     */
    @observable releaseChanges: ReleaseChange[] = [];

    /**
     * Определение вышеперечисленных свойств.
     */
    constructor(clientVersion?: string, serverVersion?: string, releaseDate?: Date) {
        this.clientVersion = clientVersion || '';
        this.serverVersion = serverVersion || '';
        this.releaseDate = releaseDate || new Date;
    }


}