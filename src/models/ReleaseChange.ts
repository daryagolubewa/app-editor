
import { observable } from 'mobx'

/**
 * Типы изменения (в перечислении).
 */
export enum EChangeType { Bug, Change, Feature }

/**
 * Модель изменений.
 */
export default class ReleaseChange  {

    /**
     * список возможных значений графы "Тип изменения" в таблице изменений.
     */
    @observable type: EChangeType;

    /**
     * Графа в таблице изменений: номер изменения в Jira
     */
    @observable jiraNumber: string;

    /**
     * Графа в таблице изменений: описание изменения.
     */
    @observable description: string;

    /**
     * Определение вышеперечисленных свойств.
     */
    constructor(type?: EChangeType, jiraNumber?: string, description?: string) {
        this.type = type || EChangeType.Change;
        this.jiraNumber = jiraNumber ||'';
        this.description = description ||'';
    }


}