import Release from './Release'
import ReleaseWindow from './ReleaseWindow'
import { observable, action } from 'mobx'
import { TMode } from './ReleaseWindow'

export default class Editor {

    @observable selectedRelease: Release | undefined;
@observable clonedSelectedRelease: Release | undefined;
@observable releases: Release[] = [];

@observable releaseWindow: ReleaseWindow;

constructor() {
    this.releaseWindow = new ReleaseWindow({
        onSubmit: this.onReleaseWindowSubmit
    });
}

@action newRelease() {
    this.releaseWindow.show('insert', new Release());
}

private onReleaseWindowSubmit = (release: Release, mode: TMode) => {
    switch (mode) {
        case 'insert':
            this.releases.push(release);
            break;
        case 'update':
            break;
    }
};

}
