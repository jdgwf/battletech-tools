import React from 'react';
import { AlphaStrikeUnit } from '../../../../classes/alpha-strike-unit';
import { IAppGlobals } from '../../../app-router';
import InputCheckbox from '../../../components/form_elements/input_checkbox';
import InputField from '../../../components/form_elements/input_field';
import InputNumeric from '../../../components/form_elements/input_numeric';
import SanitizedHTML from '../../../components/sanitized-html';
import AlphaStrikeUnitSVG from '../../../components/svg/alpha-strike-unit-svg';
import UIPage from '../../../components/ui-page';
import './home.scss';

export default class AlphaStrikeUnitCreatorHome extends React.Component<IHomeProps, IHomeState> {


    constructor(props: IHomeProps) {
        super(props);

        let asUnit = new AlphaStrikeUnit();
        let calcLog = "";
        let lsASUnit = localStorage.getItem("editing_as_unit");
        if( lsASUnit ) {
            console.log("lsASUnit");
            try {

                let unitInfo = JSON.parse( lsASUnit );
                asUnit = new AlphaStrikeUnit();
                asUnit.importUnit( unitInfo );
                calcLog = asUnit.calc();
                console.log("lsASUnit2");
            }
            catch {

            }
        }


        this.state = {
            calcLog: calcLog,
            editingASUnit: asUnit,

        }

        this.props.appGlobals.makeDocumentTitle("Alpha Strike UnitCreator");


    }

    toggleShortMinimal = (e: React.FormEvent<HTMLInputElement>) => {
        let unit = this.state.editingASUnit;
        unit.damage.shortMinimal = e.currentTarget.checked;
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }
    toggleMediumMinimal = (e: React.FormEvent<HTMLInputElement>) => {
        let unit = this.state.editingASUnit;
        unit.damage.mediumMinimal = e.currentTarget.checked;
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }
    toggleLongMinimal = (e: React.FormEvent<HTMLInputElement>) => {
        let unit = this.state.editingASUnit;
        unit.damage.longMinimal = e.currentTarget.checked;
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }
    toggleExtremeMinimal = (e: React.FormEvent<HTMLInputElement>) => {
        let unit = this.state.editingASUnit;
        unit.damage.extremeMinimal = e.currentTarget.checked;
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }

    saveUnit = (
        doNotCalculate: boolean = false,
    ) => {
        if(!doNotCalculate)
            this.state.editingASUnit.calc();
        console.log("saveUnit", JSON.stringify(this.state.editingASUnit.export()) )
        localStorage.setItem("editing_as_unit", JSON.stringify(this.state.editingASUnit.export()));
    }

    updateShortRange = (
        e: React.FormEvent<HTMLInputElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.damage.short = +e.currentTarget.value;
        if( unit.damage.short > 0 ) {
            unit.damage.shortMinimal = false;
        }
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }
    updateMediumRange = (
        e: React.FormEvent<HTMLInputElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.damage.medium = +e.currentTarget.value;
        if( unit.damage.medium > 0 ) {
            unit.damage.mediumMinimal = false;
        }
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }
    updateLongRange = (
        e: React.FormEvent<HTMLInputElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.damage.long = +e.currentTarget.value;
        if( unit.damage.long > 0 ) {
            unit.damage.longMinimal = false;
        }
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }
    updateExtremeRange = (
        e: React.FormEvent<HTMLInputElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.damage.extreme = +e.currentTarget.value;
        if( unit.damage.extreme > 0 ) {
            unit.damage.extremeMinimal = false;
        }
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }

    setName = (
        e: React.FormEvent<HTMLInputElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.name = e.currentTarget.value;
        this.saveUnit(true);
        this.setState({
            editingASUnit: unit,
        })
    }

    setRole = (
        e: React.FormEvent<HTMLInputElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.role = e.currentTarget.value;
        this.saveUnit(true);
        this.setState({
            editingASUnit: unit,
        })
    }

    setType = (
        e: React.FormEvent<HTMLSelectElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.type = e.currentTarget.value;
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }

    updateArmor = (
        e: React.FormEvent<HTMLInputElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.armor = +e.currentTarget.value;
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }

    updateSize = (
        e: React.FormEvent<HTMLInputElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.size = +e.currentTarget.value;
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }

    updateTMM = (
        e: React.FormEvent<HTMLInputElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.tmm = +e.currentTarget.value;
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }

    updateStructure = (
        e: React.FormEvent<HTMLInputElement>,
     ): void => {
        let unit = this.state.editingASUnit;
        unit.structure = +e.currentTarget.value;
        this.saveUnit();
        this.setState({
            editingASUnit: unit,
        })
    }

    render = (): JSX.Element => {

      return (
        <>


            <UIPage current="alpha-strike-unit-creator" appGlobals={this.props.appGlobals}>
                <div className="alert alert-warning">
                    This is a work in progress! Nothing works :)
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <fieldset className="fieldset">
                        <div className="row">
                                <div className="col-md-12">
                                    <InputField
                                        label="Name"
                                        value={this.state.editingASUnit.name}
                                        onChange={this.setName}
                                    />
                                </div>
                            </div>

                        </fieldset>

                        <fieldset className="fieldset">
                        <div className="row">

                            <div className="col-md-3">
                                <label>
                                    Type:<br />
                                    <select
                                        onChange={this.setType}
                                        value={this.state.editingASUnit.type}
                                    >
                                        <option value="BM">BattleMech</option>
                                        <option value="PM">ProtoMech</option>
                                        <option value="CV">Combat Vehicle</option>
                                        <option value="AS">Aerospace</option>
                                    </select>
                                    </label>
                            </div>
                            <div className="col-md-2">
                                <InputNumeric
                                    label="Size"
                                    step={1}
                                    min={0}
                                    max={6}
                                    value={this.state.editingASUnit.size}
                                    onChange={this.updateSize}
                                />

                            </div>
                            <div className="col-md-2">
                                <InputNumeric
                                    label="TMM"
                                    step={1}
                                    min={0}
                                    max={8}
                                    value={this.state.editingASUnit.tmm}
                                    onChange={this.updateTMM}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-9">
                                <InputField
                                    label="Role"
                                    value={this.state.editingASUnit.role}
                                    onChange={this.setRole}
                                />
                            </div>

                        </div>
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend>Damage</legend>
                        <div className="row">
                            <div className="col-md-3">
                                <InputNumeric
                                    label="Short"
                                    step={1}
                                    min={0}
                                    max={8}
                                    value={this.state.editingASUnit.damage.short}
                                    onChange={this.updateShortRange}
                                />
                                <InputCheckbox
                                    label="Minimal"
                                    checked={this.state.editingASUnit.damage.shortMinimal ? true : false}
                                    onChange={this.toggleShortMinimal}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputNumeric
                                    label="Medium"
                                    step={1}
                                    min={0}
                                    max={8}
                                    value={this.state.editingASUnit.damage.medium}
                                    onChange={this.updateMediumRange}
                                />
                                <InputCheckbox
                                    label="Minimal"
                                    checked={this.state.editingASUnit.damage.mediumMinimal ? true : false}
                                    onChange={this.toggleMediumMinimal}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputNumeric
                                    label="Long"
                                    step={1}
                                    min={0}
                                    max={8}
                                    value={this.state.editingASUnit.damage.long}
                                    onChange={this.updateLongRange}
                                />
                                <InputCheckbox
                                    label="Minimal"
                                    checked={this.state.editingASUnit.damage.longMinimal ? true : false}
                                    onChange={this.toggleLongMinimal}
                                />
                            </div>
                            <div className="col-md-3">
                                <InputNumeric
                                    label="Extreme"
                                    step={1}
                                    min={0}
                                    max={8}
                                    value={this.state.editingASUnit.damage.extreme}
                                    onChange={this.updateExtremeRange}
                                />
                                <InputCheckbox
                                    label="Minimal"
                                    checked={this.state.editingASUnit.damage.extremeMinimal ? true : false}
                                    onChange={this.toggleExtremeMinimal}
                                />
                            </div>
                        </div>
                        </fieldset>
                        <fieldset className="fieldset">
                        <legend>Armor &amp; Structure</legend>
                        <div className="row">

                            <div className="col-md-6">
                                <InputNumeric
                                    label="Armor"
                                    step={1}
                                    min={0}
                                    max={32}
                                    value={this.state.editingASUnit.armor}
                                    onChange={this.updateArmor}
                                />
                            </div>
                            <div className="col-md-6">
                                <InputNumeric
                                    label="Structure"
                                    step={1}
                                    min={1}
                                    max={16}
                                    value={this.state.editingASUnit.structure}
                                    onChange={this.updateStructure}
                                />

                            </div>
                        </div>
                        </fieldset>

                    </div>
                    <div className="col-md-6">

                        <AlphaStrikeUnitSVG
                            asUnit={this.state.editingASUnit}
                            appGlobals={this.props.appGlobals}
                            measurementsInHexes={false}
                        />

                        <SanitizedHTML
                            raw={true}
                            html={this.state.calcLog}
                        />
                    </div>
                </div>
            </UIPage>
        </>
      );
    }
}

interface IHomeProps {
  appGlobals: IAppGlobals;

}

interface IHomeState {
    calcLog: string;
    editingASUnit: AlphaStrikeUnit;
}