import React, { Component } from 'react';
import Button from '@material-ui/core/Table';
import ReleaseChangeTable from "./ReleaseTable";


export default class ReleaseContainer extends Component {

    render() {
        return (
            <div>
                <div>
                    <h1>Изменения релиза</h1>
                    <div>
                        <Button>Новое изменение</Button>
                        <Button>Удалить</Button>
                    </div>
                    <ReleaseChangeTable/>
                </div>
            </div>
        );
    }
}