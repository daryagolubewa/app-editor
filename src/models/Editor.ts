import Release from './Release'
import ReleaseWindow from './ReleaseWindow'
import ReleaseChange from './ReleaseChange'
import ReleaseChangeWindow from "./ReleaseChangeWindow";
import {observable, action, reaction} from 'mobx'
import { TMode} from "./BaseModelWindow";

/**
 * Корневая модель.
 */
export default class Editor {

    /**
     * Выбранный релиз в таблице. Если равен undefined, это значит, что ни один релиз в таблице не выбран.
     * selectedRelease.releases - массив изменений, который отображается в правой таблице.
     */
    @observable selectedRelease: Release | undefined;

    /**
     * Выбранное изменение в таблице изменений (для редактирования или удаления). Если равен undefined, это значит, что ни одно изменение в таблице не выбрано.
     */
    @observable selectedChange: ReleaseChange | undefined;

    /**
     * Коллекция релизов: все существующие релизы в таблице в Виде.
     *
     */
    @observable releases: Release[] = [];

    /**
     * Экземпляр окна редактирования/создания релиза
     */
    @observable releaseWindow: ReleaseWindow;

    /**
     * Экземпляр окна редактирования/создания изменения
     */
    @observable releaseChangeWindow: ReleaseChangeWindow;

    /**
     * Окна создаются один раз. После создания регулируются в режиме visible (скрывается или показывается в зависимоти от выбранного режима).
     */
    constructor() {
        this.releaseWindow = new ReleaseWindow({
            onSubmit: this.onReleaseWindowSubmit
        });
        this.releaseChangeWindow = new ReleaseChangeWindow({
            onSubmit: this.onReleaseChangeWindowSubmit
        })

        reaction( () => this.selectedRelease, () => this.selectedChange = undefined)
    }

    /**
     * Запускает процедуру создания нового релиза; делает окно для ввода информации видимым.
     */
    @action newRelease() {
        this.releaseWindow.show('insert', new Release());
    }

    /**
     * Обработчик завершения ввода информации в окно редактирования релиза
     * @param release ссылка на новый релиз/обновленный релиз
     * @param mode режим окна (insert/update)
     * @param sourceIndex порядковый номер релиза в массиве релизов (this.releases). Равен undefined, если insert
     */
    @action onReleaseWindowSubmit = (release: Release, mode: TMode, sourceIndex?: number) => {
        switch (mode) {
            case 'insert':
                this.releases.push(release);
                break;
            case 'update':
                if(sourceIndex === undefined) {
                    throw new Error('sourceIndex cannot be undefined')
                }
                if(this.releases[sourceIndex] === undefined) {
                    throw new Error(`Элемент с порядковым номером ${sourceIndex} не найден в массиве this.releases`)
                }

                this.releases[sourceIndex].clientVersion = release.clientVersion;
                this.releases[sourceIndex].releaseChanges = release.releaseChanges;
                this.releases[sourceIndex].releaseDate = release.releaseDate;
                this.releases[sourceIndex].serverVersion = release.serverVersion;

                break;
        }
        this.releaseWindow.hide();
    };

    /**
     * Удаляет выбранный релиз.
     */
    @action deleteRelease() {
        this.releases = this.releases.filter(release => release !== this.selectedRelease);
        this.selectedRelease = undefined;
    }

    /**
     * Запускает процедуру создания нового изменения; делает окно ввода инфмаорции видимым.
     * Созданное изменение попадает в selectedRelease.
     */
    @action newReleaseChange() {
            this.releaseChangeWindow.show('insert', new ReleaseChange())
    }

    /**
     * Обработчик завершения ввода информации в окно редактирования изменения (сохранение введенной информации).
     * @param releaseChange ссылка на новое/обновленное изменение
     * @param mode режим окна (insert/update)
     * @param sourceIndex порядковый номер релиза в массиве изменений (this.selectedRelease.releaseChanges). Равен undefined, если insert
     */
    @action onReleaseChangeWindowSubmit = (releaseChange: ReleaseChange, mode: TMode, sourceIndex?: number) => {
        if(this.selectedRelease === undefined) {
            throw new Error('selectedRelease cannot be undefined')
        }

        switch (mode) {
            case 'insert':
                this.selectedRelease.releaseChanges.push(releaseChange);
                break;
            case 'update':
                if(sourceIndex === undefined) {
                    throw new Error('sourceIndex cannot be undefined')
                }
                if(this.selectedRelease.releaseChanges[sourceIndex] === undefined) {
                    throw new Error(`Элемент с порядковым номером ${sourceIndex} не найден в массиве this.selectedRelease.releaseChanges`)
                }

                this.selectedRelease.releaseChanges[sourceIndex].description = releaseChange.description;
                this.selectedRelease.releaseChanges[sourceIndex].jiraNumber = releaseChange.jiraNumber;
                this.selectedRelease.releaseChanges[sourceIndex].type = releaseChange.type;

                break;
        }
        this.releaseChangeWindow.hide();
    };

    /**
     * Запускает процедуру редактирования выбранного релиза (релиз берется из selectedChanges)
     */
    @action editRelease() {
        let clonedRelease = new Release();
        if(this.selectedRelease === undefined) {
            throw new Error('selectedRelease cannot be undefined')
        }

        // Клонирование selectedRelease, чтобы изменения происходили сначала в клоне, а потом попадали в основную таблицу, а не меняли информацию в таблице напрямую.
        clonedRelease.clientVersion = this.selectedRelease.clientVersion;
        clonedRelease.serverVersion = this.selectedRelease.serverVersion;
        clonedRelease.releaseDate = this.selectedRelease.releaseDate;
        clonedRelease.releaseChanges = this.selectedRelease.releaseChanges;

       let selectedReleaseIndex = this.releases.indexOf(this.selectedRelease);

        this.releaseWindow.show('update', clonedRelease, selectedReleaseIndex);
    }

    /**
     * Запускает процедуру редактирования выбранного изменения
     */
    @action editReleaseChange() {
        let clonedChange = new ReleaseChange();
        if(this.selectedChange === undefined) {
            throw new Error('selectedChange cannot be undefined')
        }

        // Клонирование selectedChange, чтобы изменения происходили сначала в клоне, а потом попадали в основную таблицу, а не меняли информацию в таблице напрямую.
        clonedChange.type = this.selectedChange.type;
        clonedChange.jiraNumber = this.selectedChange.jiraNumber;
        clonedChange.description = this.selectedChange.description;

        if(this.selectedRelease === undefined) {
            throw new Error('selectedRelease cannot be undefined')
        }

        let selectedChangeIndex = this.selectedRelease.releaseChanges.indexOf(this.selectedChange);

        this.releaseChangeWindow.show('update', clonedChange, selectedChangeIndex);

    }

    /**
     * Удаление выбранное изменение
     */
    @action deleteReleaseChange() {
        if(this.selectedRelease === undefined) {
            throw new Error('selectedRelease cannot be undefined')
        }
        this.selectedRelease.releaseChanges = this.selectedRelease.releaseChanges.filter(change => change !== this.selectedChange);
        this.selectedChange = undefined;
    }
}
