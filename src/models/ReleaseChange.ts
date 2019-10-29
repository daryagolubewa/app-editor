
import { observable } from 'mobx'

enum EChangeType { Bug, Change, Feature }

export default class ReleaseChange  {

    @observable type: EChangeType;
    @observable jiraNumber: string;
    @observable description: string;

    constructor(type?: EChangeType, jiraNumber?: string, description?: string) {
        this.type = type || EChangeType.Change;
        this.jiraNumber = jiraNumber ||'';
        this.description = description ||'';
    }


}