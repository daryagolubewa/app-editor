import React, { Component } from 'react';
import Button from '@material-ui/core/Table';
import ReleaseTable from "./ReleaseTable";


export default class ReleaseContainer extends Component {

    render() {
        return (
            <div>
                <div>
                    <h1>Релизы</h1>
                    <div>
                        <Button>Новый релиз</Button>
                        <Button>Удалить</Button>
                    </div>
                    <ReleaseTable/>
                </div>
            </div>
        );
    }
}