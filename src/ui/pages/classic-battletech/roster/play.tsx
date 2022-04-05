import { FaArrowCircleLeft, FaBars, FaPlay } from "react-icons/fa";
import React from 'react';
import { Link } from 'react-router-dom';
import { IAppGlobals } from '../../../app-router';
import BattleTechLogo from '../../../components/battletech-logo';
import './play.scss';
import BattleMechSVG from "../../../components/svg/battlemech-svg";
import StatBar from "../../../components/stat-bar";
import DieSVG from "../../../components/svg/die-svg";
import { BattleMech } from "../../../../classes/battlemech";
import TextSection from "../../../components/text-section";

export default class ClassicBattleTechRosterPlay extends React.Component<IPlayProps, IPlayState> {
    constructor(props: IPlayProps) {
        super(props);

        this.state = {
            updated: false,
            mechSelectorExpanded: false,
        };

        this.props.appGlobals.makeDocumentTitle("Playing CBT Force");
    }


    selectMech = (
      e: React.FormEvent<HTMLButtonElement>,
      uuid: string
    ) => {
      if( e && e.preventDefault ) {
        e.preventDefault();
      }
      if(this.props.appGlobals.currentCBTForce) {
        this.props.appGlobals.currentCBTForce.setSelectedMech( uuid );
        this.props.appGlobals.saveCurrentCBTForce( this.props.appGlobals.currentCBTForce );
      }
    }


    render = (): React.ReactFragment => {
      if(!this.props.appGlobals.currentCBTForce) {
        return <></>;
      }
      let selectedMech: BattleMech | null = this.props.appGlobals.currentCBTForce.getSelectedMech();
      return (
        <>
          <header className="topmenu">
            <ul className="main-menu">
                <li><Link title="Click here to leave Play Mode (don't worry, you won't lose your current mech statuses)" className="current" to={`${process.env.PUBLIC_URL}/classic-battletech/roster`}><FaArrowCircleLeft /></Link></li>
                {/* <li>
                  <span
                    
                  >
                    <FaBars />
                  </span>
                </li> */}
                                <li className="small-text text-center">
                                <br />
                    No, nothing works here yet (except current selection).<br />
                    This is basically a big mockup using your current force.
                  
                      
                </li>
                <li className="logo">
                    <a
                        href="https://battletech.com"
                        rel="noopener noreferrer"
                        target="_blank"
                        title="Click here to go to the official BattleTech website!"
                    >
                        <BattleTechLogo />
                    </a>
                </li>
            </ul>

          </header>

<div className="postion-relative">

  <div className={this.state.mechSelectorExpanded ? "mech-selector" : "mech-selector expanded"}>
          {this.props.appGlobals.currentCBTForce.groups.map( (group, groupIndex) => {
            if( group.members.length === 0) {
              return (<></>);
            }
            return (
              <React.Fragment key={groupIndex}>
              <div>
                  <div className="lance-name">{group.getName(groupIndex)}</div>
                  <ul className="mech-list">
                  {group.members.map( (unit, unitIndex) => {
                    return (
                        <li key={unitIndex}>
                          <button
                            onClick={(e) => this.selectMech(e, unit.uuid)}
                            className={selectedMech && selectedMech.uuid == unit.uuid ? "btn btn-sm btn-primary full-width" : "btn btn-sm btn-secondary full-width"}
                          >
                            {unit.getName()}

                            <div className="stats">
                              <div 
                                className="move"
                                title="This is the mech's movement status, the color indicates the last movement method, the die pips are the to-hit movement modifiers as a target."
                              >
                                <svg
                                  height={20}
                                  width={20}
                                >
                                  <DieSVG
                                    posX={0}
                                    posY={0}
                                    width={20}
                                    bgColor="red"
                                    pipColor="white"
                                    numberPips={3}
                                  />
                                </svg>
                              </div>
                              <div className="bars">
                                <StatBar 
                                  color="black"
                                  background="#aaa"
                                  currentPercentage={30}
                                  height={8}
                                  title="Current Armor Status"
                                />
                                <StatBar 
                                  color="white"
                                  background="#aaa"
                                  currentPercentage={50}
                                  height={8}
                                  title="Current Internal Structure Status"
                                />
                                <StatBar 
                                  color="red"
                                  background="#aaa"
                                  currentPercentage={80}
                                  height={8}
                                  title="Current Heat Status"
                                />
                              </div>
                            </div>

                          </button>
                        </li>
                    )
                  })}
                  </ul>



              </div>


            </React.Fragment>
            )
          })} 
    </div>
    <div className="selected-mech">
          {selectedMech ? (
              <BattleMechSVG
                mechData={selectedMech}
                inPlay={true}
              />
          ) : (
            <div className="text-center">
              <TextSection>
                (No Selected 'Mech)
              </TextSection>
            </div>
          )}
            </div>
            </div>            
        </>
      );
    }
}

interface IPlayProps {
  appGlobals: IAppGlobals;

}

interface IPlayState {
  updated: boolean;
  mechSelectorExpanded: boolean;
}