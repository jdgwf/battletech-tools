import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { IEquipmentItem } from "../../data/data-interfaces";
import { mechClanEquipmentEnergy } from '../../data/mech-clan-equipment-weapons-energy';
import { mechISEquipmentBallistic } from '../../data/mech-is-equipment-weapons-ballistic';
import { mechISEquipmentEnergy } from "../../data/mech-is-equipment-weapons-energy";
import { mechISEquipmentMissiles } from '../../data/mech-is-equipment-weapons-missiles';
import { mechISEquipmentMisc } from '../../data/mech-is-equipment-weapons-misc';

import { exportCleanJSON } from '../../utils';
import { IAppGlobals } from '../app-router';
import StandardModal from '../components/standard-modal';
import UIPage from '../components/ui-page';
import './equipment-editor.scss';
import EquipmentEditForm from '../components/equipment-edit-form';

export default class EquipmentEditor extends React.Component<IEquipmentEditorProps, IEquipmentEditorState> {
    fileDataList: Record<string, IEquipmentItem[]> = {
        "mech-is-equipment-weapons-ballistic": mechISEquipmentBallistic,
        "mech-is-equipment-weapons-energy": mechISEquipmentEnergy,
        "mech-is-equipment-weapons-missiles": mechISEquipmentMissiles,
        "mech-is-equipment-weapons-misc": mechISEquipmentMisc,
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
            isDirty: false,
            updated: false,
            currentList: currentList,
            currentListData: currentListData,
            showJSON: false,
            editItem: null,
            editItemIndex: -1,
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

            if( this.state.isDirty ) {
                this.props.appGlobals.openConfirmDialog(
                    "Your data has been changed",
                    "If you change your list, all your work on the older list will be lost - be sure to make sure you've saved your changed into the appropriate JSON file!",
                    "Proceed",
                    "Cancel",
                    () => {
                        let currentListData: IEquipmentItem[] = [];

                        currentListData = JSON.parse(JSON.stringify(this.fileDataList[e.currentTarget.value]))

                        this.setState({
                            currentList: e.currentTarget.value,
                            currentListData: currentListData,
                        });

                        localStorage.setItem( "ee-editing-list", e.currentTarget.value)
                    }
                )
            } else {
                let currentListData: IEquipmentItem[] = [];

                currentListData = JSON.parse(JSON.stringify(this.fileDataList[e.currentTarget.value]))

                this.setState({
                    currentList: e.currentTarget.value,
                    currentListData: currentListData,
                });

                localStorage.setItem( "ee-editing-list", e.currentTarget.value)
            }


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
        if( fileN === "mech-clan-equipment-weapons-misc" ) {
            return "mechISEquipmentMisc";
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

    closeEditItem = (
        e: React.FormEvent<HTMLButtonElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        this.setState({
            editItem: null,
            editItemIndex: -1,
        })
    }

    editItemOnChange = ( nv: IEquipmentItem): void => {
        this.setState({
            editItem: nv,
        })
    }

    editItem = (
        e: React.FormEvent<HTMLButtonElement>,
        item: IEquipmentItem,
        itemIndex: number,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        this.setState({
            editItem: JSON.parse(JSON.stringify(item)),
            editItemIndex: itemIndex,
        })
    }

    addItem = (
        e: React.FormEvent<HTMLButtonElement>,
    ) => {
        if( e && e.preventDefault ) {
            e.preventDefault();
        }
        let item: IEquipmentItem = {
            uuid: "",
            count: 0,
            name: "",
            alternameName: "",
            tag: "",
            sort: "",
            category: "",
            damage: 0,
            damageAero: 0,
            damagePerCluster: 0,
            damageClusters: 0,
            accuracyModifier: 0,
            ammoBattleValue: 0,
            accuracyModifiier: 0,
            cbills: 0,
            cbillsOneShot: 0,
            introduced: 0,
            extinct: 0,
            reintroduced: 0,
            battleValue: 0,
            battleValueOneShot: 0,
            heat: 0,
            weight: 0,
            range: {
                min: 0,
                short: 0,
                medium: 0,
                long: 0,
                exterme: 0,
            },
            space: {
                battlemech: 0,
                protomech: 0,
                combatVehicle: 0,
                supportVehicle: 0,
                aerospaceFighter: 0,
                smallCraft: 0,
                dropShip: 0,
            },
            ammoPerTon: 0,
            minAmmoTons: 0,
            explosive: false,
            gauss: false,
            weaponType: [],
            techRating: "",
            unique: false,
            book: "",
            page: 0,
            alphaStrike: {
                heat: 0,
                rangeShort: 0,
                rangeMedium: 0,
                rangeLong: 0,
                rangeExtreme: 0,
                tc: 0,
                notes: [],
            },
            battleValuePerItemDamage: 0,
            requiresHandActuator: false,

            weightDivisor: 0,
            damageDivisior: 0,
            criticalsDivisor: 0,

            variableSize: false,
            isMelee: false,
            costPerItemTon: 0,
            location: "",
            rear: false,
            criticals: 0,
            available: false,
        }

        this.setState({
            editItem: item,
            editItemIndex: -1,
        })
    }

    saveItem = () => {
        let currentListData = this.state.currentListData;
        if( this.state.editItem !== null ) {
            if( this.state.editItemIndex > - 1 ) {
                if( this.state.editItemIndex < currentListData.length ) {
                    currentListData[this.state.editItemIndex] = this.state.editItem;
                }
            } else {
                currentListData.push( this.state.editItem );
            }

            this.setState({
                currentListData: currentListData,
                editItem: null,
                editItemIndex: -1,
            })
        }
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

{this.state.editItem ? (
    <StandardModal
        show={true}
        className="modal-xl"
        onClose={this.closeEditItem}
        onSave={this.state.editItemIndex > -1 ? this.saveItem : undefined}
        onAdd={this.state.editItemIndex == -1 ? this.saveItem : undefined}
        title={this.state.editItemIndex > -1 ? "Editing Item" : "Adding Item"}
    >
        <EquipmentEditForm
            editingItem={this.state.editItem}
            onChange={this.editItemOnChange}
        />
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

            <th className="min-width text-center no-wrap">Heat</th>
            <th className="min-width text-center no-wrap">BV</th>

            <th className="min-width text-center no-wrap">Active</th>


            <th
                className="min-width text-right no-wrap"
            >
                <button
                    className="btn btn-sm btn-primary"
                    onClick={this.addItem}
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
                                <>{item.damage?.short} / {item.damage?.medium} / {item.damage?.long} </>
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

                <td className="text-center no-wrap ">
                    {item.heat}<br />
                </td>
                <td className="text-center no-wrap ">
                    {item.battleValue}<br />
                </td>


                <td className="text-center no-wrap ">
                    {item.introduced}-{item.extinct > 0 ? item.extinct : "current"}<br />
                    {item.reintroduced > 0 ? (
                        <div>{item.reintroduced}</div>
                    ): null}
                </td>

                <td className="text-center no-wrap">
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={(e) => this.editItem( e, item, itemIndex)}
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
    isDirty: boolean;
    updated: boolean;
    currentList: string;
    currentListData: IEquipmentItem[]
    showJSON: boolean;
    editItem: IEquipmentItem | null;
    editItemIndex: number;
}

