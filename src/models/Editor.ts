import Release from './Release'
import ReleaseWindow from './ReleaseWindow'
import ReleaseChange from './ReleaseChange'
import ReleaseChangeWindow from "./ReleaseChangeWindow";
import { observable, action } from 'mobx'
import { TMode} from "./BaseModelWindow";

export default class Editor {

    @observable selectedRelease: Release | undefined;
    @observable selectedChange: ReleaseChange | undefined;
    @observable releases: Release[] = [];
    @observable releaseWindow: ReleaseWindow;
    @observable releaseChangeWindow: ReleaseChangeWindow;

    constructor() {
        this.releaseWindow = new ReleaseWindow({
            onSubmit: this.onReleaseWindowSubmit
        });
        this.releaseChangeWindow = new ReleaseChangeWindow({
            onSubmit: this.onReleaseChangeWindowSubmit
        })
    }

    @action newRelease() {
        this.releaseWindow.show('insert', new Release());
    }

    private onReleaseWindowSubmit = (release: Release, mode: TMode, sourceIndex?: number) => {
        switch (mode) {
            case 'insert':
                this.releases.push(release);
                break;
            case 'update':
                // TODO fdd
                break;
        }
    };

    @action changeRelease() {
        if(this.selectedRelease !== undefined) {
            this.releaseWindow.show('update', this.selectedRelease)
        }
    }

    @action deleteRelease() {
        this.releases = this.releases.filter(release => release !== this.selectedRelease);
        this.selectedRelease = undefined;
    }

    @action newReleaseChange() {
            this.releaseChangeWindow.show('insert', new ReleaseChange())
    }

    private onReleaseChangeWindowSubmit = (releaseChange: ReleaseChange, mode: TMode, sourceIndex?: number) => {
        if(this.selectedRelease === undefined) {
            throw new Error('selectedRelease cannot be undefined')
        }

        switch (mode) {
            case 'insert':
                this.selectedRelease.releaseChanges.push(releaseChange);
                break;
            case 'update':
                // TODO fdd
                break;
        }
    }

    @action editRelease() {
        let clonedRelease = new Release();
        if(this.selectedRelease === undefined) {
            throw new Error('selectedRelease cannot be undefined')
        }

        // Клонирование selectedRelease, чтобы изменения происходили сначала в клоне, а потом попадали в оснвную таблицу, а не меняли информацию в таблице напрямую.
        clonedRelease.clientVersion = this.selectedRelease.clientVersion;
        clonedRelease.serverVersion = this.selectedRelease.serverVersion;
        clonedRelease.releaseDate = this.selectedRelease.releaseDate;
        clonedRelease.releaseChanges = this.selectedRelease.releaseChanges;

       let selectedReleaseIndex = this.releases.indexOf(this.selectedRelease);

        this.releaseWindow.show('update', clonedRelease, selectedReleaseIndex);
    }

    @action editReleaseChange() {
        let clonedChange = new ReleaseChange();
        if(this.selectedChange === undefined) {
            throw new Error('selectedChange cannot be undefined')
        }

        // Клонирование selectedChange, чтобы изменения происходили сначала в клоне, а потом попадали в оснвную таблицу, а не меняли информацию в таблице напрямую.
        clonedChange.type = this.selectedChange.type;
        clonedChange.jiraNumber = this.selectedChange.jiraNumber;
        clonedChange.description = this.selectedChange.description;

        if(this.selectedRelease === undefined) {
            throw new Error('selectedRelease cannot be undefined')
        }

        let selectedChangeIndex = this.selectedRelease.releaseChanges.indexOf(this.selectedChange);

        this.releaseChangeWindow.show('update', clonedChange, selectedChangeIndex);

    }

    @action deleteChange() {
        if(this.selectedRelease === undefined) {
            throw new Error('selectedRelease cannot be undefined')
        }
        this.selectedRelease.releaseChanges = this.selectedRelease.releaseChanges.filter(change => change !== this.selectedChange);
        this.selectedChange = undefined;
    }
}
