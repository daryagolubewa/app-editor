import React from 'react';
import styles from './App.module.scss';
import Panel from "./components/Panel";
import ReleaseTable from "./components/ReleaseTable";
import ReleaseChangeTable from "./components/ReleaseChangeTable";
import Editor from "./models/Editor";
import Release from "./models/Release";
import {Provider} from "mobx-react";

const editor = new Editor();


// Тестовый пример.
editor.releases.push(new Release('1.1.1', '2.3.3', new Date()));
editor.releases.push(new Release('1.1.1', '2.3.3', new Date()));
editor.releases.push(new Release('1.1.1', '2.3.3', new Date()));
editor.releases.push(new Release('1.1.1', '2.3.3', new Date()));

const App: React.FC = () => {
    return (
        <Provider editor={editor}>
            <div className={styles.App}>
                <Panel title={'Редактор истории изменений'} flex={1} bodyFlexDirection={"row"}>
                    <Panel title={'Релизы'} flex={1} style={{marginRight: 10}}>
                        <ReleaseTable/>
                    </Panel>
                    <Panel title={'Изменения релиза'} flex={3}>
                        <ReleaseChangeTable/>
                    </Panel>
                </Panel>
            </div>
        </Provider>
    );
};

export default App;
