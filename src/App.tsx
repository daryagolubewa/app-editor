import React, { Fragment, Component } from 'react';
import styles from './App.module.scss';
import Panel from "./components/Panel";
import ReleaseTable from "./components/ReleaseTable";
import ReleaseChangeTable from "./components/ReleaseChangeTable";
import Editor from "./models/Editor";
import Release from "./models/Release";
import {observer, Provider} from "mobx-react";
import ReleaseChange, {EChangeType} from "./models/ReleaseChange";
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import {FormControl, Input, InputLabel, OutlinedInput, TextField} from "@material-ui/core";
import ModalReleaseWindow from "./components/ModalReleaseWindow/ModalReleaseWindow";
import ModalReleaseChangeWindow from "./components/ModalReleaseChangeWindow/ModalReleaseChangeWindow";

const editor = new Editor();


// Тестовый пример.
const releaseOne = new Release('1.1.1', '2.3.3', new Date());
releaseOne.releaseChanges.push(new ReleaseChange(EChangeType.Bug, '5678', 'Сломалось'));
releaseOne.releaseChanges.push(new ReleaseChange(EChangeType.Change, '0909', 'lvmkfdsgvkfl'));
releaseOne.releaseChanges.push(new ReleaseChange(EChangeType.Feature, '5565', 'bgfklkgfhk'));
editor.releases.push(releaseOne);

editor.releases.push(new Release('1.1.1', '2.3.3', new Date()));
editor.releases.push(new Release('1.1.1', '2.3.3', new Date()));
editor.releases.push(new Release('1.1.1', '2.3.3', new Date()));


@observer
export default class App extends Component {
    render() {

        return (
            <Provider editor={editor}>
                <div className={styles.App}>
                    <Panel title={'Редактор истории изменений'} flex={1} bodyFlexDirection={"row"}>
                        <Panel title={'Релизы'} flex={1} style={{margin: 10}} buttons={
                            <Fragment>
                                <Button variant="outlined" color="primary" onClick={() => editor.newRelease()}>Новый
                                    релиз</Button>
                                <Button variant="outlined" onClick={() => editor.editRelease()} disabled={!editor.selectedRelease}>Редактировать</Button>
                                <Button variant="outlined" color="secondary" disabled={!editor.selectedRelease}>Удалить</Button>
                            </Fragment>
                        }>
                            <ReleaseTable/>
                        </Panel>
                        <Panel title={'Изменения релиза'} flex={3} style={{marginRight: 10}} buttons={
                            <Fragment>
                                <Button variant="outlined" color="primary" disabled={!editor.selectedChange} onClick={ () => editor.newReleaseChange()} > Новое изменение</Button>
                                <Button variant="outlined" disabled={!editor.selectedChange} onClick={() => editor.editReleaseChange() } >Редактировать</Button>
                                <Button variant="outlined" color="secondary" disabled={!editor.selectedChange}>Удалить</Button>
                            </Fragment>
                        }>
                            <ReleaseChangeTable/>
                        </Panel>
                    </Panel>
                </div>

                <ModalReleaseWindow />
                <ModalReleaseChangeWindow/>



                {/*<Modal open={editor.releaseWindow.visible} onClose={ () => editor.releaseWindow.hide()}>*/}
                {/*    <div>Удалить</div>*/}
                {/*</Modal>*/}

            </Provider>
        );
    }
};

