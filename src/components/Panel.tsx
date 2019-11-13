import React, {Component, CSSProperties, ReactNode} from 'react';
import {FlexDirectionProperty} from "csstype";
import Button from '@material-ui/core/Button';
import ReleaseTable from "./ReleaseTable";

interface IBasePanelProps {
    /**
     * Заголовок панели.
     */
    title: string;

    /**
     * Кнопки!; необязательный параметр, т.к.кнопки будут не во всех панелях.
     * Располагаются под заголовком, горизонтально.
     */
    buttons?: ReactNode;

    /**
     * Параметр флекс для корневого дива панели.
     */
    flex?: number;

    /**
     * Див, задающий расположение его дочерних элементов (в ряди или колонку).
     */
    bodyFlexDirection?: FlexDirectionProperty;

    style?: CSSProperties;

}

/**
 * Компонент Панель, состоит из Заголовка, места для кнопок и контентной части, куда позже будут попадать таблицы.
 */
export default class Panel extends Component<IBasePanelProps> {

    render() {

        const { title, buttons, children, flex, bodyFlexDirection, style } = this.props;
        const rootDivStyle = style ? style : {};


        if(flex) {
            rootDivStyle.flex = `${flex} 1 0`;
            rootDivStyle.height = '100%';
        }
        const bodyStyle: CSSProperties = {};
        if (bodyFlexDirection) {
            bodyStyle.flexDirection = bodyFlexDirection;
            bodyStyle.display = 'flex';
            bodyStyle.flex = '1 1 0';
        }
        return (
                <div style={rootDivStyle} >
                    <h1 style={{margin: 10}}>{title}</h1>
                    { buttons && <div>{ buttons }</div>}
                    <div style={bodyStyle}>{ children }</div>
                </div>
        );
    }
}