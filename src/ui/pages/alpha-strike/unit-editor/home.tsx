import React from 'react';
import { AlphaStrikeUnit } from '../../../../classes/alpha-strike-unit';
import { IAppGlobals } from '../../../app-router';
import InputNumeric from '../../../components/form_elements/input_numeric';
import AlphaStrikeUnitSVG from '../../../components/svg/alpha-strike-unit-svg';
import UIPage from '../../../components/ui-page';
import './home.scss';

export default class AlphaStrikeUnitEditorHome extends React.Component<IHomeProps, IHomeState> {


    constructor(props: IHomeProps) {
        super(props);

        let asUnit = new AlphaStrikeUnit();

        let lsASUnit = localStorage.getItem("editing_as_unit");
        if( lsASUnit ) {
            console.log("lsASUnit");
            try {

                let unitInfo = JSON.parse( lsASUnit );
                asUnit = new AlphaStrikeUnit();
                asUnit.importUnit( unitInfo );
                console.log("lsASUnit2");
            }
            catch {

            }
        }


        this.state = {

            editingASUnit: asUnit,

        }

        this.props.appGlobals.makeDocumentTitle("Alpha Strike UnitEditor");


    }

    saveUnit = () => {
        console.log("saveUnit", JSON.stringify(this.state.editingASUnit.export()) )
        localStorage.setItem("editing_as_unit", JSON.stringify(this.state.editingASUnit.export()));
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


            <UIPage current="alpha-strike-unit-editor" appGlobals={this.props.appGlobals}>
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
                        <InputNumeric
                            label="Structure"
                            step={1}
                            min={0}
                            max={16}
                            value={this.state.editingASUnit.structure}
                            onChange={this.updateStructure}
                        />
                    </div>
                    <div className="col-md-6">

                        <AlphaStrikeUnitSVG
                            asUnit={this.state.editingASUnit}
                            appGlobals={this.props.appGlobals}
                            measurementsInHexes={false}
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

  editingASUnit: AlphaStrikeUnit;
}