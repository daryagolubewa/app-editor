import {action, observable} from 'mobx';

/**
 * TMode - режим работы окна (создание или редактирование)
 */
export type TMode = 'insert' | 'update';

/**
 * Обработчик события submit у окна. Submit возникает при нажатии кнопки "Сохранить" в Виде.
 */
type TOnSubmitHandler<R> = (record: R, mode: TMode, sourceIndex?: number) => void;

/**
 * Параметры конструктора класса ReleaseWindow.
 */
interface IWindowParams<R> {
    onSubmit: TOnSubmitHandler<R>;
}

/**
 * ReleaseWindow - модель окна, которая используется для создания записи и редактирования записи.
 * Это окно создается один раз при запуске программы и в течение работы программы скрывается, либо показывается по необходимости.
 */
export default class BaseModelWindow<R> {

    /**
     * Порядковый номер для поиска записи в соответствующей коллекции (релиз/изменение).
     */
    @observable sourceIndex: number | undefined;

    /**
     * Содержит экземляр класса Release (запись). Его поля используются в форме, все изменения в полях формы переносятся в эту запись.
     */
    @observable record: R | undefined;

    /**
     * Режим работы окна.
     */
    @observable mode: TMode | undefined;

    /**
     * Режим видимости окна.
     */
    @observable visible: boolean = false;

    /**
     * Место хранения обработчика события Submit, которое передано со стороны пользователя.
     */
    private onSubmit: TOnSubmitHandler<R>;

    /**
     * Конструктор.
     * Сохранение обработчика события Submit.
     */
    constructor(params: IWindowParams<R>) {
        this.onSubmit = params.onSubmit;
    }

    /**
     * Действие: открыть окно. При запуске действия передаются режим окна и текущая запись.
     */
    @action show(mode: TMode, record: R, sourceIndex?: number) {

        if(mode === 'insert' && sourceIndex !== undefined) {
            throw new Error('in case of operation type insert, sourceIndex should not be used')
        }

        if(mode === 'update' && sourceIndex === undefined) {
            throw new Error('in case of operation type update, sourceIndex should not be used')
        }

        this.mode = mode;
        this.record = record;
        this.visible = true;
        this.sourceIndex = sourceIndex;
    }

    /**
     * Действие: завершение ввода данных в поля окна.
     */
    @action submit() {
        if (this.record && this.mode) {
            this.onSubmit(this.record, this.mode, this.sourceIndex);
        }
    }

    /**
     * Действие: скрыть окно.
     */
    @action hide() {
        this.visible = false;
    }
}
