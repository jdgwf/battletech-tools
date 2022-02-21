import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IEquipmentItem } from "../../data/data-interfaces";
import { mechClanEquipmentEnergy } from '../../data/mech-clan-equipment-weapons-energy';
import { mechISEquipmentBallistic } from '../../data/mech-is-equipment-weapons-ballistic';
import { mechISEquipmentEnergy } from "../../data/mech-is-equipment-weapons-energy";
import { mechISEquipmentMissiles } from '../../data/mech-is-equipment-weapons-missiles';
import { exportCleanJSON } from '../../utils';
import { IAppGlobals } from '../app-router';
import StandardModal from '../components/standard-modal';
import UIPage from '../components/ui-page';
import './equipment-editor.scss';

export default class EquipmentEditor extends React.Component<IEquipmentEditorProps, IEquipmentEditorState> {
    fileDataList: Record<string, IEquipmentItem[]> = {
        "mech-is-equipment-weapons-ballistic": mechISEquipmentBallistic,
        "mech-is-equipment-weapons-energy": mechISEquipmentEnergy,
        "mech-is-equipment-weapons-missiles": mechISEquipmentMissiles,
        "mech-clan-equipment-weapons-energy": mechClanEquipmentEnergy,
    };

    constructor(props: IEquipmentEditorProps) {
        super(props);

        let currentList = "mech-is-equipment-weapons-ballistic";
        let lsCurrentList = localStorage.getItem( "ee-editing-list");
        if( lsCurrentList ) {
            currentList = lsCurrentList;
        }

        let currentListData: IEquipmentItem[] = [];

        if( currentList === null ) {
            currentList = "mech-is-equipment-weapons-ballistic"
        }
        if( !this.fileDataList[currentList] ) {
            currentListData = JSON.parse(JSON.stringify(this.fileDataList["mech-is-equipment-weapons-ballistic"]))
        } else {
            currentListData = JSON.parse(JSON.stringify(this.fileDataList[currentList]))
        }

        this.state = {
            updated: false,
            currentList: currentList,
            currentListData: currentListData,
            showJSON: false,
            editItem: null,
        }

        this.props.appGlobals.makeDocumentTitle("Equipment Editor");
    }

    showJSON = (
        e: React.FormEvent<HTMLButtonElement>
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        this.setState({
            showJSON: true,
        })
    }

    closeJSON = (
        e: React.FormEvent<HTMLButtonElement>
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        this.setState({
            showJSON: true,
        })
    }

    selectList = (
        e: React.FormEvent<HTMLSelectElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        if( this.fileDataList[e.currentTarget.value ]) {

            let currentListData: IEquipmentItem[] = [];

            currentListData = JSON.parse(JSON.stringify(this.fileDataList[e.currentTarget.value]))

            this.setState({
                currentList: e.currentTarget.value,
                currentListData: currentListData,
            });

            localStorage.setItem( "ee-editing-list", e.currentTarget.value)
        }

    }

    _getFileVariable = ( fileN: string): string  => {
        if( fileN === "mech-is-equipment-weapons-ballistic" ) {
            return "mechISEquipmentBallistic";
        }
        if( fileN === "mech-is-equipment-weapons-energy" ) {
            return "mechISEquipmentEnergy";
        }
        if( fileN === "mech-is-equipment-weapons-missiles" ) {
            return "mechISEquipmentMissiles";
        }
        if( fileN === "mech-clan-equipment-weapons-energy" ) {
            return "mechClanEquipmentEnergy";
        }

        return "unknown;"
    }


    _makeJSONText = (): string => {
        let rv = `import { IEquipmentItem } from "./data-interfaces";

/*
* The data here is/may be copyrighted and NOT included in the GPLv3 license.
*/
`

        rv += "export const " + this._getFileVariable( this.state.currentList) + ": IEquipmentItem[] = ";


        rv += exportCleanJSON(
            this.state.currentListData,
        )

        return rv;
    }

    render() {




      return (
    <UIPage current="EquipmentEditor" appGlobals={this.props.appGlobals}>
        <div className="alert alert-warning text-center">
            <p><strong>Developers only!</strong> This area doesn't work yet, but when it does it shouldn't be used by the average user.</p>
            <p className="no-margins">This should make data entry so much easier in the long run</p>
        </div>
{this.state.showJSON ? (
    <StandardModal
        show={true}
        className="modal-xl"
        onClose={this.closeJSON}
        title={"JSON Export for file " + this.state.currentList + ".ts"}
    >
        <div className="alert alert-info">
            <strong>Remember</strong>: editing this page won't make the changes permanent. You'll need top copy/paste the contents below into /src/data/{this.state.currentList + ".ts"}
        </div>
        <textarea
            style={{
                width: "100%",
                height: "73vh",
            }}
            spellCheck={false}
        >
            {this._makeJSONText()}
        </textarea>
    </StandardModal>
) : null}
<button
    className='btn btn-primary btn-sm pull-right'
    onClick={this.showJSON}
>
    Show JSON Export
</button>

<label>
    Select List:&nbsp;
    <select
        value={this.state.currentList}
        onChange={this.selectList}
        className="inline-block width-auto"
    >
        {Object.keys(this.fileDataList).map( (fileName, fileIndex) => {
            return (
                <option key={fileIndex} value={fileName}>{fileName}.ts</option>
            )
        })}
    </select>
</label>
<table className="table">
    <thead>
        <tr>
            <th>
                Name
                <div className="small-text">tag</div>
            </th>
            <th className="min-width text-center no-wrap">Damage</th>
            <th className="min-width text-center no-wrap">Range</th>
            <th className="min-width text-center no-wrap">Crits</th>
            <th className="min-width text-center no-wrap">Mass</th>
            <th
                className="min-width text-right no-wrap"
            >
                <button
                        className="btn btn-sm btn-primary"
                    >
                    <FontAwesomeIcon icon={faPlus} />&nbsp;Add
                </button>
            </th>
        </tr>
    </thead>
{this.state.currentListData.map( (
    item: IEquipmentItem,
    itemIndex: number,
) => {
    return (
        <tbody key={itemIndex}>
            <tr>
                <td>
                    {item.name}<br />
                    <div className="small-text">{item.tag}</div>
                </td>
                <td className="text-center no-wrap">
                    {item.damageClusters ? (
                        <>
                            Clusters: {item.damageClusters}<br />
                            Damage Per: {item.damagePerCluster}<br />
                        </>
                    ) : (
                        <>
                            {typeof(item.damage) == "number" ? (
                                <>{item.damage}</>
                            ) : (
                                <>{console.log(item.name, item.damage)}{item.damage?.short} / {item.damage?.medium} / {item.damage?.long} </>
                            )}
                        </>
                    )}

                </td>
                <td className="text-center no-wrap">
                    {item.range.short} / {item.range.medium} / {item.range.long}
                </td>
                <td className="text-center no-wrap">
                    {item.space.battlemech}<br />
                </td>
                <td className="text-center no-wrap ">
                    {item.weight}<br />
                </td>
                <td className="text-center no-wrap">
                    <button
                        className="btn btn-sm btn-primary"
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </td>
            </tr>
        </tbody>
    )
})}

</table>
    </UIPage>
      );
    }
}

interface IEquipmentEditorProps {
  appGlobals: IAppGlobals;
}

interface IEquipmentEditorState {
    updated: boolean;
    currentList: string;
    currentListData: IEquipmentItem[]
    showJSON: boolean;
    editItem: IEquipmentItem | null;
}

