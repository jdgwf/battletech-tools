import React from 'react';
import { IEquipmentItem } from "../../data/data-interfaces";
import { mechISEquipmentEnergy } from "../../data/mech-is-equipment-weapons-energy";
import { IAppGlobals } from '../app-router';
import InputField from '../components/form_elements/input_field';
import UIPage from '../components/ui-page';
import './equipment-editor.scss';

export default class EquipmentEditor extends React.Component<IEquipmentEditorProps, IEquipmentEditorState> {
    constructor(props: IEquipmentEditorProps) {
        super(props);
        this.state = {
            updated: false,
        }

        this.props.appGlobals.makeDocumentTitle("Equipment Editor");
    }



    render() {
      return (
    <UIPage current="EquipmentEditor" appGlobals={this.props.appGlobals}>
{mechISEquipmentEnergy.map( (
    item: IEquipmentItem,
    itemIndex: number,
) => {
    return (
        <div>
            <InputField
                label="Name"
                value={item.name}
            />
            <InputField
                label="Tag"
                value={item.tag}
            />

            <br />
            {typeof(item.damage) === "number" ? item.damage : item.damage?.short }<br />
            {item.range.min} - {item.range.short}/{item.range.medium}/{item.range.long}/{item.range.exterme}/<br />
            {item.category}<br />
            <hr />
        </div>
    )
})}
    </UIPage>
      );
    }
}

interface IEquipmentEditorProps {
  appGlobals: IAppGlobals;
}

interface IEquipmentEditorState {
    updated: boolean;

}